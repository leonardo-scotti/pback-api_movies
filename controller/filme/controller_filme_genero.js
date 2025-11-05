/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 05/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const filmGenrerDAO = require('../../model/DAO/filme_genero.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

// ==================== FUNÇÕES C.R.U.D ====================
//Retorna uma lista de filmGenero
const listFilmGenrer = async () => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Guada o resultado da função do DAO que lista os Gêneros
        let result = await filmGenrerDAO.getSelectAllFilmsGenrers();

        if (result) {
            if (result.length > 0) {
                let amount = result.length;

                MESSAGE.HEADER.status                           = MESSAGE.SUCESS_REQUEST.status;
                MESSAGE.HEADER.status_code                      = MESSAGE.SUCESS_REQUEST.status_code;
                MESSAGE.HEADER.response.movies_genrers_amount   = amount;
                MESSAGE.HEADER.response.movies_genrers          = result;

                return MESSAGE.HEADER; //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500    
    }
}

//Retorna um filmeGênero filtrando pelo ID
const searchFilmGenrerById = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do campo obrigatório [ID]
        if(id > 0 && id != '' && id != null && id != undefined) {
            //Preserva o argumento e tranforma em INT
            let idInt = parseInt(id);

            //Guarda o resultado da função do DAO que filtra um Gênero por ID
            let result = await filmGenrerDAO.getSelectByIdFilmGenrer(idInt);

            //Verifica se a função do DAO deu certo
            if(result) {
                //Verifica se há o filme
                if(result.length > 0) {
                    MESSAGE.HEADER.status                           = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code                      = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.HEADER.response.movie_genrer            = result;

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

//Retorna os gêneros filtrando pelo ID do filme
const listGenrersByIdFilm = async (idFilm) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do campo obrigatório [ID]
        if(idFilm > 0 && idFilm != '' && idFilm != null && idFilm != undefined) {
            //Preserva o argumento e tranforma em INT
            let idInt = parseInt(idFilm);

            //Guarda o resultado da função do DAO que filtra um Gênero por ID
            let result = await filmGenrerDAO.getSelectGenrersByIdFilm(idInt);

            //Verifica se a função do DAO deu certo
            if(result) {
                //Verifica se há o filme
                if(result.length > 0) {
                    MESSAGE.HEADER.status                           = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code                      = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.HEADER.response.genrers            = result;

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
const listFilmsByIdGenrer = async (idGenrer) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do campo obrigatório [ID]
        if(idGenrer > 0 && idGenrer != '' && idGenrer != null && idGenrer != undefined) {
            //Preserva o argumento e tranforma em INT
            let idInt = parseInt(idGenrer);

            //Guarda o resultado da função do DAO que filtra um Gênero por ID
            let result = await filmGenrerDAO.getSelectFilmsByIdGenrer(idInt);

            //Verifica se a função do DAO deu certo
            if(result) {
                //Verifica se há o filme
                if(result.length > 0) {
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
const insertFilmGenrer = async (filmGenrer, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Verifica se o tipo de dado enviado é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função que valida os dados
            let validarDadosGenrer = validarDados(filmGenrer);
            if(!validarDadosGenrer) {
                //Chama a função do DAO que insere o gênero no DB
                let result = await filmGenrerDAO.setInsertFilmGenrer(filmGenrer);

                //Verifica se a função do DAO deu certo
                if(result) {
                    //Chama a função do DAO que retorna o ID do último gênero do DB
                    let lastIdFilmGenrer = await filmGenrerDAO.getSelectLastId();

                    //Verifica se a função deu certo
                    if(lastIdFilmGenrer) {
                        //Cria o objeto do gênero inserido, com o ID no começo
                        let filmGenrerInserted = {
                            "id": lastIdFilmGenrer,
                            ...filmGenrer
                        }

                        MESSAGE.HEADER.status       = MESSAGE.SUCESS_CREATED_ITEM.status;
                        MESSAGE.HEADER.status_code  = MESSAGE.SUCESS_CREATED_ITEM.status_code;
                        MESSAGE.HEADER.message      = MESSAGE.SUCESS_CREATED_ITEM.message;
                        MESSAGE.HEADER.response     = filmGenrerInserted;

                        return MESSAGE.HEADER; //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            } else {
                return validarDadosGenrer;
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

//Atualiza um filmeGenero no DB
const updateFilmGenrer = async (filmGenrer, id, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Verifica se o tipo de dado enviado é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função que valida os dados
            let validarDadosFilmGenrer = validarDados(filmGenrer)
            if(!validarDadosFilmGenrer) {
                //Chama a função para validar a consistência do ID e verificar se ele existe no DB
                let validarID = await searchFilmGenrerById(id);

                //Verifica se o ID existe no DB
                if(validarID.status_code == 200) {
                    //Cria o objeto do gênero com o ID em primeiro
                    let filmGenrerUpdated = {
                        "id": parseInt(id),
                        ...filmGenrer
                    }
                    
                    //Chama a função do DAO que atualiza um gênero no DB
                    let result = await filmGenrerDAO.setUpdateFilmGenrer(filmGenrerUpdated);

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
                return validarDadosGenrer;
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

const deleteFilmGenrer = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função que busca um gênero por ID para verificar a consistência
        let validarID = await searchFilmGenrerById(id);

        if(validarID.status_code == 200) {
            //Preserva o argumento e transforma em inteiro
            let idFilmGenrer = parseInt(id);

            //Chama a função do DAO que exclui um gênero do DB
            let result = await filmGenrerDAO.setDeleteFilmGenrer(idFilmGenrer);

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
const validarDados = (filmGenrer) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    if(filmGenrer.filme_id == '' || filmGenrer.filme_id == null || filmGenrer.filme_id == undefined || filmGenrer.filme_id <= 0 || isNaN(filmGenrer.filme_id)) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FILME_ID] inválido!';

        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if(filmGenrer.genero_id == '' || filmGenrer.genero_id == null || filmGenrer.genero_id == undefined || filmGenrer.genero_id <= 0 || isNaN(filmGenrer.genero_id)) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [GENERO_ID] inválido!';

        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else {
        return false;
    }
}

module.exports = {
    listFilmGenrer,
    searchFilmGenrerById,
    listGenrersByIdFilm,
    listFilmsByIdGenrer,
    insertFilmGenrer,
    updateFilmGenrer,
    deleteFilmGenrer
}