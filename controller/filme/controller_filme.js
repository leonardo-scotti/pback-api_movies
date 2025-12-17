/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 07/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const filmeDAO = require('../../model/DAO/filme.js');

//Import da controller da tabela filme_genero
const controllerFilmGenrer = require('./controller_filme_genero.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')


//=========================== FUNÇÕES C.R.U.D ===========================
//Retorna uma lista de filmes
const listarFilmes = async () => {

    //Realiza uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções.
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função do DAO para retornar a lista de filmes
        let result = await filmeDAO.getSelectAllFilms();

        if (result) {
            if (result.length > 0) {
                let amount = result.length;

                //processamento para adicionar os gêneros em cada filme
                for (filme of result) {
                    let genrersFilm = await controllerFilmGenrer.listGenrersByIdFilm(filme.id);

                    if (genrersFilm.status_code == 200) {
                        filme.genrer = genrersFilm.response.genrers;
                    } else {
                        filme.genrer = []
                    }
                }

                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status;
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code;
                MESSAGE.HEADER.response.movies_amount = amount;
                MESSAGE.HEADER.response.movies = result;

                return MESSAGE.HEADER; //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; //404
            };
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
        };

    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Retorna um filme filtrando pelo ID
const buscarFilmeId = async (id) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            //Preserva o argumento e o transforma em inteiro
            let idInt = parseInt(id);

            //Guarda o resultado da função que filtra pelo ID
            let result = await filmeDAO.getSelectByIdFilms(idInt);

            if (result) {

                if (result.length > 0) {
                    let genresFilme = await controllerFilmGenrer.listGenrersByIdFilm(result[0].id);

                    if (genresFilme.status_code == 200)
                        result[0].genrers = genresFilme.response.genrers

                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.HEADER.response.movie = result;

                    return MESSAGE.HEADER; //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; //404
                }

            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Aributo [ID] inválido!';
            return MESSAGE.ERROR_REQUIRED_FIELDS; //400
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Insere um novo filme
const inserirFilme = async (filme, contentType) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarDados = await validarDadosFilme(filme)

            if (!validarDados) {
                //Chama a função do DAO para inserir um novo filme
                let result = await filmeDAO.setInsertFilms(filme);
                if (result) {
                    //Chama a função para receber o ID gerado no DB
                    let lastIdFilm = await filmeDAO.getSelectLastIdFilm();

                    if (lastIdFilm) {
                        //Processamento para inserir dados na tabela de 
                        //relação entre filme e gênero

                        //Repetição para pegar cada gênero e enviar para
                        //o DAO
                        //filme.genrer.forEach(async (genrer) => {
                        for (genrer of filme.genrer) {
                            let filmGenrer = { filme_id: lastIdFilm, genero_id: genrer.id };
                            console.log(filmGenrer)
                            let resultFilmGenrer = await controllerFilmGenrer.insertFilmGenrer(filmGenrer, contentType);
                            console.log(resultFilmGenrer)
                            if (resultFilmGenrer.status_code != 201) {
                                return MESSAGE.ERROR_RELATION_TABLE; //200, porém com problemas na tabela de relação
                            }
                        };

                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status;
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code;
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message;

                        //Processamento para trazer dados dos generos cadastrados ma tabela de ralação
                        delete filme.genrer;

                        //Pesquisa no DB quais os generos e os seus dados que foram inseridos na tabela de relação
                        let resulGenerosFilme = await controllerFilmGenrer.listGenrersByIdFilm(lastIdFilm);

                        //Adiciona novamente o atributo genero com todas as informações do genero
                        filme.genrer = resulGenerosFilme.response.genrers;

                        filmeInserido = {
                            "id": lastIdFilm,
                            ...filme
                        }

                        MESSAGE.HEADER.response = filmeInserido;

                        return MESSAGE.HEADER; //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            } else {
                return validarDados; //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415

        }
    } catch (error) {
        // console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Atualiza um filme filtrando pelo ID
const atualizarFilme = async (filme, id, contentType) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilme(filme)
            if (!validarDados) {

                //Chama a função para validar a consistência do ID e verificar se existe no DB
                let validarID = await buscarFilmeId(id);

                //Verifica se o ID exite no DB, caso exista teremos o status_code 200
                if (validarID.status_code == 200) {
                    //Adicionando o ID no JSON com os dados do filme
                    filme.id = parseInt(id);

                    //Chama a função do DAO para atualizar um filme
                    let result = await filmeDAO.setUpdateFilms(filme);
                    if (result) {

                        for (genero of filme.genrers) {
                            let filmeGenero = { filme_id: filme.id, genero_id: genero.id };

                            let resultGeneroFilme = await controllerFilmGenrer.insertFilmGenrer(filmeGenero, contentType)

                            if (resultGeneroFilme.status_code != 201) {
                                return MESSAGE.ERROR_RELATION_TABLE;
                            }
                        }

                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status;
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code;
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message;

                        //Processamento para trazer dados dos generos cadastrados ma tabela de ralação
                        delete filme.genrers;

                        //Pesquisa no DB quais os generos e os seus dados que foram inseridos na tabela de relação
                        let resulGenerosFilme = await controllerFilmGenrer.listGenrersByIdFilm(filme.id);

                        //Adiciona novamente o atributo genero com todas as informações do genero
                        filme.genrer = resulGenerosFilme.response.genrers;

                        filmeAtualizado = {
                            "id": filme.id,
                            ...filme
                        }

                        MESSAGE.HEADER.response = filmeAtualizado;
                        // MESSAGE.HEADER.response = filme;

                        return MESSAGE.HEADER; //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return validarID; //400 - 404 - 500
                }
            } else {
                return validarDados; //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415

        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Exclui um filme filtrando pelo ID
const excluirFilme = async (id) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        let validarID = await buscarFilmeId(id);

        if (validarID.status_code == 200) {
            let idFilme = parseInt(id)

            let result = await filmeDAO.setDeleteFilms(idFilme);

            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status;
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code;
                MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message;
                delete MESSAGE.HEADER.response;

                return MESSAGE.HEADER;
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            return validarID; //400 - 404 - 500
        }
    } catch (error) {
        //console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};
//====================================================================

//===================== FUNÇÕES DA CONTROLLER_FILME =====================
//Validar dados do cadastro de um filme
const validarDadosFilme = async (filme) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Aributo [NOME] inválido!';
        return MESSAGE.ERROR_REQUIRED_FIELDS; //400

    } else if (filme.sinopse == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Aributo [SINOPSE] inválido!';
        return MESSAGE.ERROR_REQUIRED_FIELDS; //400

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Aributo [DATA LANÇAMENTO] inválido!';
        return MESSAGE.ERROR_REQUIRED_FIELDS; //400

    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length > 8) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Aributo [DURAÇÃO] inválido!';
        return MESSAGE.ERROR_REQUIRED_FIELDS; //400

    } else if (filme.orcamento == '' || filme.orcamento == null || filme.orcamento == undefined || typeof (filme.orcamento) != 'number') {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Aributo [ORÇAMENTO] inválido!';
        return MESSAGE.ERROR_REQUIRED_FIELDS; //400

    } else if (filme.trailer == undefined || filme.trailer.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Aributo [TRAILER] inválido!';
        return MESSAGE.ERROR_REQUIRED_FIELDS; //400

    } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Aributo [CAPA] inválido!';
        return MESSAGE.ERROR_REQUIRED_FIELDS; //400

    } else {
        return false;
    }
}
//=======================================================================
module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}