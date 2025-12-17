/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 12/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
//const filmeDirectorDAO = require('../../model/DAO/filme_diretor.js');
const filmeDirectorDAO = require('../../model/DAO/filme_diretor.js');

const controllerFilmGenrer = require('./controller_filme_genero.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

// ==================== FUNÇÕES C.R.U.D ====================
//Retorna uma lista de filmDirector
const listFilmDirector = async () => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Guada o resultado da função do DAO que lista os Gêneros
        let result = await filmeDirectorDAO.getSelectAllFilmsDirectors();

        if (result) {
            if (result.length > 0) {
                let amount = result.length;

                MESSAGE.HEADER.status                               = MESSAGE.SUCESS_REQUEST.status;
                MESSAGE.HEADER.status_code                          = MESSAGE.SUCESS_REQUEST.status_code;
                MESSAGE.HEADER.response.movies_directors_amount     = amount;
                MESSAGE.HEADER.response.movies_directors            = result;

                return MESSAGE.HEADER; //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
        }
    } catch (error) {
        // console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500    
    }
}

//Retorna um filmeGênero filtrando pelo ID
const searchFilmDirectorById = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do campo obrigatório [ID]
        if(id > 0 && id != '' && id != null && id != undefined) {
            //Preserva o argumento e tranforma em INT
            let idInt = parseInt(id);

            //Guarda o resultado da função do DAO que filtra um filmeDiretor por ID
            let result = await filmeDirectorDAO.getSelectByIdFilmDirector(idInt);

            //Verifica se a função do DAO deu certo
            if(result) {
                //Verifica se há o filmeDiretor
                if(result.length > 0) {
                    MESSAGE.HEADER.status                           = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code                      = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.HEADER.response.movie_director          = result;

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido!';
            return MESSAGE.REQUIRED_FIELDS; //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

//Retorna os diretores filtrando pelo ID do filme
const listDirectorsByIdFilm = async (idFilm) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do campo obrigatório [ID]
        if(idFilm > 0 && idFilm != '' && idFilm != null && idFilm != undefined) {
            //Preserva o argumento e tranforma em INT
            let idInt = parseInt(idFilm);

            //Guarda o resultado da função do DAO que filtra os diretores pelo ID do filme
            let result = await filmeDirectorDAO.getSelectDirectorsByIdFilm(idInt);
            
            //Verifica se a função do DAO deu certo
            if(result) {
                //Verifica se há o filme
                if(result.length > 0) {
                    MESSAGE.HEADER.status                           = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code                      = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.HEADER.response.director               = result;

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FILME_ID] inválido!';
            return MESSAGE.REQUIRED_FIELDS; //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

//Retorna os filmes filtrando pelo ID do gênero
const listFilmsByIdDirector = async (idDirector) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do campo obrigatório [ID]
        if(idDirector > 0 && idDirector != '' && idDirector != null && idDirector != undefined) {
            //Preserva o argumento e tranforma em INT
            let idInt = parseInt(idDirector);
    
            //Guarda o resultado da função do DAO que filtra os filmes filtrando pelo ID do diretor
            let result = await filmeDirectorDAO.getSelectFilmsByIdDirector(idInt);
            
            //Verifica se a função do DAO deu certo
            if(result) {
                //Verifica se há o filme
                if(result.length > 0) {
                    //processamento para adicionar os gêneros em cada filme
                    for(filme of result) {
                        let genrersFilm = await controllerFilmGenrer.listGenrersByIdFilm(filme.id);
    
                        if(genrersFilm.status_code == 200){
                            filme.genrer = genrersFilm.response.genrers;
                        } else {
                            filme.genrer = []
                        }
                    }

                    MESSAGE.HEADER.status           = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code      = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.HEADER.response.movies  = result;

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [GENERO_ID] inválido!';
            return MESSAGE.REQUIRED_FIELDS; //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

//Insere um filmeGenero no DB
const insertFilmDirector = async (filmDirector, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Verifica se o tipo de dado enviado é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função que valida os dados
            let validarDadosFilmDirector = validarDados(filmDirector);
            if(!validarDadosFilmDirector) {
                //Chama a função do DAO que insere o gênero no DB
                let result = await filmeDirectorDAO.setInsertFilmDirector(filmDirector);
                
                //Verifica se a função do DAO deu certo
                if(result) {
                    //Chama a função do DAO que retorna o ID do último gênero do DB
                    let lastIdFilmGenrer = await filmeDirectorDAO.getSelectLastId();

                    //Verifica se a função deu certo
                    if(lastIdFilmGenrer) {
                        //Cria o objeto do gênero inserido, com o ID no começo
                        let filmGenrerInserted = {
                            "id": lastIdFilmGenrer,
                            ...filmDirector
                        }

                        MESSAGE.HEADER.status           = MESSAGE.SUCESS_CREATED_ITEM.status;
                        MESSAGE.HEADER.status_code      = MESSAGE.SUCESS_CREATED_ITEM.status_code;
                        MESSAGE.HEADER.message          = MESSAGE.SUCESS_CREATED_ITEM.message;
                        MESSAGE.HEADER.response.movie   = filmGenrerInserted;

                        return MESSAGE.HEADER; //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            } else {
                return validarDadosFilmDirector;
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

//Atualiza um filmeGenero no DB
const updateFilmDirector = async (filmDirector, id, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Verifica se o tipo de dado enviado é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função que valida os dados
            let validarDadosFilmGenrer = validarDados(filmDirector)
            if(!validarDadosFilmGenrer) {
                //Chama a função para validar a consistência do ID e verificar se ele existe no DB
                let validarID = await searchFilmDirectorById(id);

                //Verifica se o ID existe no DB
                if(validarID.status_code == 200) {
                    //Cria o objeto do gênero com o ID em primeiro
                    let filmDirectorUpdated = {
                        "id": parseInt(id),
                        ...filmDirector
                    }
                    
                    //Chama a função do DAO que atualiza um gênero no DB
                    let result = await filmeDirectorDAO.setUpdateFilmDirector(filmDirectorUpdated);

                    //Verifica se a função deu certo
                    if(result) {
                        MESSAGE.HEADER.status       = MESSAGE.SUCESS_UPDATED_ITEM.status;
                        MESSAGE.HEADER.status_code  = MESSAGE.SUCESS_UPDATED_ITEM.status_code;
                        MESSAGE.HEADER.message      = MESSAGE.SUCESS_UPDATED_ITEM.message;
                        MESSAGE.HEADER.response     = filmGenrerUpdated;

                        return MESSAGE.HEADER; //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return validarID; //400 - 404 - 500
                }
            } else {
                return validarDadosFilmDirector;
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

const deleteFilmDirector = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função que busca um gênero por ID para verificar a consistência
        let validarID = await searchFilmDirectorById(parseInt(id));

        if(validarID.status_code == 200) {
            //Preserva o argumento e transforma em inteiro
            let idFilmDirector = parseInt(id);

            //Chama a função do DAO que exclui um filmeDiretor do DB
            let result = await filmeDirectorDAO.setDeleteFilmDirector(idFilmDirector);

            //Verifica se a função deu certo
            if(result) {
                MESSAGE.HEADER.status       = MESSAGE.SUCESS_DELETED_ITEM.status;
                MESSAGE.HEADER.status_code  = MESSAGE.SUCESS_DELETED_ITEM.status_code;
                MESSAGE.HEADER.message      = MESSAGE.SUCESS_DELETED_ITEM.message;
                delete MESSAGE.HEADER.response;

                return MESSAGE.HEADER; //200
            } else {    
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            return validarID; //400 - 404 - 500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

// ==================== FUNÇÕES CONTROLLER ===================
const validarDados = (filmDirector) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    if(filmDirector.filme_id == '' || filmDirector.filme_id == null || filmDirector.filme_id == undefined || filmDirector.filme_id <= 0 || isNaN(filmDirector.filme_id)) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FILME_ID] inválido!';

        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if(filmDirector.diretor_id == '' || filmDirector.diretor_id == null || filmDirector.diretor_id == undefined || filmDirector.diretor_id <= 0 || isNaN(filmDirector.diretor_id)) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DIRETOR_ID] inválido!';

        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else {
        return false;
    }
}

module.exports = {
    listFilmDirector,
    searchFilmDirectorById,
    listDirectorsByIdFilm,
    listFilmsByIdDirector,
    insertFilmDirector,
    updateFilmDirector,
    deleteFilmDirector
}