/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 29/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const directorDAO = require('../../model/DAO/diretor.js');

//Import da controller filmeDiretor
const controllerFilmDirector = require('../filme/controller_filme_diretor.js');

//Import da controller filme
const controllerFilme = require('../filme/controller_filme.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

const listDirector = async () => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função do DAO que lista os diretores do DB
        let result = await directorDAO.getSelectAllDirector();

        if (result) {
            //Verifica se há dados no DB
            if (result.length > 0) {
                //Guarda a quantidade em uma variável
                let amount = result.length;

                //processamento para adicionar os gêneros em cada filme
                for (director of result) {
                    let directorFilm = await controllerFilmDirector.listFilmsByIdDirector(director.id_diretor);

                    director.movies = []
                    if (directorFilm.status_code == 200) {
                        for (filme of directorFilm.response.movies) {
                            let filmeGenero = await controllerFilme.buscarFilmeId(filme.id)

                            director.movies.push(filmeGenero.response.movie[0]);
                        }
                    } else {
                        director.movies = []
                    }
                }

                //Monta a mensagem
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status;
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code;
                MESSAGE.HEADER.response.directors_amount = amount;
                MESSAGE.HEADER.response.directors = result;

                return MESSAGE.HEADER;
            } else {
                return MESSAGE.ERROR_NOT_FOUND; //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

const searchDirectorById = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do ID
        if (id != '' && id != null && id != undefined && id > 0) {
            //Chama a função do DAO que busca um Diretor fltrando pelo ID
            let result = await directorDAO.getSelectByIdDirector(id);
            if (result) {
                if (result.length > 0) {

                    let directorFilm = await controllerFilmDirector.listFilmsByIdDirector(result[0].id_diretor);
                    if (directorFilm.status_code == 200) {
                        result[0].movies = []
                        for (filme of directorFilm.response.movies) {
                            let filmeGenero = await controllerFilme.buscarFilmeId(filme.id)

                            result[0].movies.push(filmeGenero.response.movie[0]);
                        }
                    } else {
                        director.movies = []
                    }

                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.HEADER.response.director = result;

                    return MESSAGE.HEADER;
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido!';

            return MESSAGE.ERROR_REQUIRED_FIELDS; //400
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

const insertDirector = async (director, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função que valida os dados do objeto diretor
            let validarDadosDiretor = validarDados(director);
            if (!validarDadosDiretor) {
                //Chama a função do DAO que insere um diretor no DB
                let result = await directorDAO.setInsertDirector(director);
                if (result) {
                    //Chama a função do DAO que busca o último ID do DB
                    let lastIdDirector = await directorDAO.getSelectLastIdDirector();

                    if (lastIdDirector) {
                        
                        //Cria um objeto do diretor com o ID sendo o primeiro atributo
                        let directorInserted = {
                            "id": lastIdDirector,
                            ...director
                        }

                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status;
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code;
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message;
                        MESSAGE.HEADER.response = directorInserted;

                        return MESSAGE.HEADER;
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            } else {
                return validarDadosDiretor; //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

const updateDirector = async (director, id, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função que valida os dados do objeto diretor
            let validarDadosDiretor = validarDados(director);
            if (!validarDadosDiretor) {
                //Validação do ID
                let validarID = searchDirectorById(id)
                if (validarID.status_code == 200) {
                    //Cria o objeto do diretor com o ID em primeiro
                    let directorUpdated = {
                        "id": id,
                        ...director
                    }

                    //Chama a função do DAO que atualiza o diretor no DB
                    let result = await directorDAO.setUpdateDirector(directorUpdated);
                    if (result) {

                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status;
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code;
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message;
                        MESSAGE.HEADER.response = directorUpdated;

                        return MESSAGE.HEADER; //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido!'

                    return MESSAGE.ERROR_REQUIRED_FIELDS; //400
                }
            } else {
                return validarDadosDiretor; //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

const deleteDirector = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função do DAO que deleta um diretor do DB
        let result = await directorDAO.setDeleteDirector(id);
        if (result) {
            //Monta a mensagem
            MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status;
            MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message;
            delete MESSAGE.HEADER.response

            return MESSAGE.HEADER; //200
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

// ==================== FUNÇÕES CONTROLLER ===================
const validarDados = (director) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    if (director.nome == '' || director.nome == null || director.nome == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'

        return MESSAGE.ERROR_REQUIRED_FIELDS;
    } else if (director.data_nascimento == '' || director.data_nascimento == null || director.data_nascimento == undefined || director.data_nascimento.length < 10 || director.data_nascimento.length > 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA_NASCIMENTO] inválido!'

        return MESSAGE.ERROR_REQUIRED_FIELDS;
    } else if (isNaN(director.altura) || director.altura == '' || director.altura == null || director.altura == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ALTURA] inválido!'

        return MESSAGE.ERROR_REQUIRED_FIELDS;
    } else if (isNaN(director.peso) || director.peso == '' || director.peso == null || director.peso == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [PESO] inválido!'

        return MESSAGE.ERROR_REQUIRED_FIELDS;
    } else if (isNaN(director.patrimonio_liquido) || director.patrimonio_liquido == '' || director.patrimonio_liquido == null || director.patrimonio_liquido == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [PATRIMONIO_LIQUIDO] inválido!'

        return MESSAGE.ERROR_REQUIRED_FIELDS;
    } else {
        return false;
    }
}

module.exports = {
    listDirector,
    searchDirectorById,
    insertDirector,
    updateDirector,
    deleteDirector
};