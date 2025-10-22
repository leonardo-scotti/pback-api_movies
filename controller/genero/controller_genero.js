/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 22/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const genrerDAO = require('../../model/DAO/genero.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

// ==================== FUNÇÕES C.R.U.D ====================
const listGenrer = async () => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Guada o resultado da função do DAO que lista os Gêneros
        let result = await genrerDAO.getSelectAllGenrer();

        if (result) {
            if (result.length > 0) {
                let amount = result.length;

                MESSAGE.HEADER.status                   = MESSAGE.SUCESS_REQUEST.status;
                MESSAGE.HEADER.status_code              = MESSAGE.SUCESS_REQUEST.status_code;
                MESSAGE.HEADER.response.genrers.amount  = amount;
                MESSAGE.HEADER.response.genrers         = result;

                return MESSAGE.HEADER; //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500    
    }
}

const searchGenrerById = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do campo obrigatório [ID]
        if(id > 0 && id != '' && id != null && id != undefined) {
            //Preserva o argumento e tranforma em INT
            let idInt = parseInt(id);

            //Guarda o resultado da função do DAO que filtra um Gênero por ID
            let result = await genrerDAO.getSelectByIdGenrer(idInt);

            //Verifica se a função do DAO deu certo
            if(result) {
                //Verifica se há o filme
                if(result.length > 0) {
                    MESSAGE.HEADER.status       = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code  = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.response            = result;

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

const insertGenrer = async (genrer, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Verifica se o tipo de dado enviado é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Verifica se o gênero foi enviado de forma correta
            if(genrer.nome != '' && genrer.nome != undefined && genrer.nome != null) {
                //Chama a função do DAO que insere o gênero no DB
                let result = await genrerDAO.setInsertGenrer(genrer);

                //Verifica se a função do DAO deu certo
                if(result) {
                    //Chama a função do DAO que retorna o ID do último gênero do DB
                    let lastIdGenrer = await genrerDAO.getSelectLastIdGenrer();

                    //Verifica se a função deu certo
                    if(lastIdGenrer) {
                        //Cria o objeto do gênero inserido, com o ID no começo
                        let genrerInserted = {
                            "id": lastIdGenrer,
                            ...genrer
                        }

                        MESSAGE.HEADER.status       = MESSAGE.SUCESS_CREATED_ITEM.status;
                        MESSAGE.HEADER.status_code  = MESSAGE.SUCESS_CREATED_ITEM.status_code;
                        MESSAGE.HEADER.message      = MESSAGE.SUCESS_CREATED_ITEM.message;
                        MESSAGE.HEADER.response     = genrerInserted;

                        return MESSAGE.HEADER; //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            } else {
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'
                return MESSAGE.ERROR_REQUIRED_FIELDS; //400
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

const updateGenrer = async (genrer, id, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Verifica se o tipo de dado enviado é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Verifica se o gênero foi enviado de forma correta
            if(genrer.nome != '' && genrer.nome != undefined && genrer.nome != null) {
                //Chama a função para validar a consistência do ID e verificar se ele existe no DB
                let validarID = await searchGenrerById(id);

                //Verifica se o ID existe no DB
                if(validarID.status_code == 200) {
                    //Cria o objeto do gênero com o ID em primeiro
                    let genrerUpdated = {
                        "id": parseInt(id),
                        ...genrer
                    }
                    
                    //Chama a função do DAO que atualiza um gênero no DB
                    let result = await genrerDAO.setUpdateGenrer(genrerUpdated);

                    //Verifica se a função deu certo
                    if(result) {
                        MESSAGE.HEADER.status       = MESSAGE.SUCESS_UPDATED_ITEM.status;
                        MESSAGE.HEADER.status_code  = MESSAGE.SUCESS_UPDATED_ITEM.status_code;
                        MESSAGE.HEADER.message      = MESSAGE.SUCESS_UPDATED_ITEM.message;
                        MESSAGE.HEADER.response     = genrerUpdated;

                        return MESSAGE.HEADER; //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return validarID; //400 - 404 - 500
                }
            } else {
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'
                return MESSAGE.ERROR_REQUIRED_FIELDS; //400
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

const deleteGenrer = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função que busca um gênero por ID para verificar a consistência
        let validarID = await searchGenrerById(id);

        if(validarID.status_code == 200) {
            //Preserva o argumento e transforma em inteiro
            let idGenrer = parseInt(id);

            //Chama a função do DAO que exclui um gênero do DB
            let result = await genrerDAO.deleteGenrer();

            //Verifica se a função deu certo
            if(result) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status;
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code;
                MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETED_ITEM.message;
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

module.exports = {
    listGenrer,
    searchGenrerById,
    insertGenrer,
    updateGenrer,
    deleteGenrer
}