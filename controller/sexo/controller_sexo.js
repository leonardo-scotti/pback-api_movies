/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 22/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const sexDAO = require('../../model/DAO/sexo.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

// ==================== FUNÇÕES C.R.U.D ====================
const listSex = async () => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Guada o resultado da função do DAO que lista os sexos
        let result = await sexDAO.getSelectAllSex();

        if (result) {
            if (result.length > 0) {
                let amount = result.length;

                MESSAGE.HEADER.status                   = MESSAGE.SUCESS_REQUEST.status;
                MESSAGE.HEADER.status_code              = MESSAGE.SUCESS_REQUEST.status_code;
                MESSAGE.HEADER.response.sexs_amount  = amount;
                MESSAGE.HEADER.response.sexs        = result;

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

const searchSexById = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do campo obrigatório [ID]
        if(id > 0 && id != '' && id != null && id != undefined) {
            //Preserva o argumento e tranforma em INT
            let idInt = parseInt(id);

            //Guarda o resultado da função do DAO que filtra um sexo por ID
            let result = await sexDAO.getSelectByIdSex(idInt);

            //Verifica se a função do DAO deu certo
            if(result) {
                //Verifica se há o filme
                if(result.length > 0) {
                    MESSAGE.HEADER.status       = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code  = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.HEADER.response            = result;

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

const insertSex = async (sex, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Verifica se o tipo de dado enviado é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função que valida os dados
            let validarDadosSexo = validarDados(sex);
            if(!validarDadosSexo) {
                //Chama a função do DAO que insere o sexo no DB
                let result = await sexDAO.setInsertSex(sex);

                //Verifica se a função do DAO deu certo
                if(result) {
                    //Chama a função do DAO que retorna o ID do último sexo do DB
                    let lastIdSex = await sexDAO.getSelectLastIdSex();

                    //Verifica se a função deu certo
                    if(lastIdSex) {
                        //Cria o objeto do sexo inserido, com o ID no começo
                        let sexInserted = {
                            "id": lastIdSex,
                            ...sex
                        }

                        MESSAGE.HEADER.status       = MESSAGE.SUCESS_CREATED_ITEM.status;
                        MESSAGE.HEADER.status_code  = MESSAGE.SUCESS_CREATED_ITEM.status_code;
                        MESSAGE.HEADER.message      = MESSAGE.SUCESS_CREATED_ITEM.message;
                        MESSAGE.HEADER.response     = sexInserted;

                        return MESSAGE.HEADER; //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            } else {
                return validarDadosSexo;
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

const updateSex = async (sex, id, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Verifica se o tipo de dado enviado é um JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função que valida os dados
            let validarDadosSex = validarDados(sex)
            if(!validarDadosSex) {
                //Chama a função para validar a consistência do ID e verificar se ele existe no DB
                let validarID = await searchSexById(id);

                //Verifica se o ID existe no DB
                if(validarID.status_code == 200) {
                    //Cria o objeto do sexo com o ID em primeiro
                    let sexUpdated = {
                        "id": parseInt(id),
                        ...sex
                    }
                    
                    //Chama a função do DAO que atualiza um sexo no DB
                    let result = await sexDAO.setUpdateSex(sexUpdated);

                    //Verifica se a função deu certo
                    if(result) {
                        MESSAGE.HEADER.status       = MESSAGE.SUCESS_UPDATED_ITEM.status;
                        MESSAGE.HEADER.status_code  = MESSAGE.SUCESS_UPDATED_ITEM.status_code;
                        MESSAGE.HEADER.message      = MESSAGE.SUCESS_UPDATED_ITEM.message;
                        MESSAGE.HEADER.response     = sexUpdated;

                        return MESSAGE.HEADER; //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return validarID; //400 - 404 - 500
                }
            } else {
                return validarDadosSex;
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

const deleteSex = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função que busca um sexo por ID para verificar a consistência
        let validarID = await searchSexById(id);

        if(validarID.status_code == 200) {
            //Preserva o argumento e transforma em inteiro
            let idSex = parseInt(id);

            //Chama a função do DAO que exclui um sexo do DB
            let result = await sexDAO.setDeleteSex(idSex);

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
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

// ==================== FUNÇÕES CONTROLLER ===================
const validarDados = (sex) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    if(sex.sexo == '' || sex.sexo == null || sex.sexo == undefined || sex.sexo.length > 20) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SEXO] inválido!';

        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else {
        return false;
    }
}
module.exports = {
    listSex,
    searchSexById,
    insertSex,
    updateSex,
    deleteSex
}