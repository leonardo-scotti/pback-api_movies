/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 22/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const languageDAO = require('../../model/DAO/idioma.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

// ==================== FUNÇÕES C.R.U.D ====================
const listLanguage = async () => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função do DAO que lista os idiomas
        let result = await languageDAO.getSelectAllLanguage();

        //Verifica se a função deu certo
        if(result) {
            //Verifica se há dados no DB
            if(result.length > 0) {
                let amount = result.length;

                MESSAGE.HEADER.status                       = MESSAGE.SUCESS_REQUEST.status;
                MESSAGE.HEADER.status_code                  = MESSAGE.SUCESS_REQUEST.status_code;
                MESSAGE.HEADER.response.languages_amount    = amount;
                MESSAGE.HEADER.response.languages           = result;

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

const searchLanguageById = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do ID
        if(id != '' && id != null && id != undefined && id > 0) {
            //Preservando o argumento
            let idInt = parseInt(id);

            //Chama a função do DAO
            let result = await languageDAO.getSelectByIdLanguage(idInt);

            //Verifica se a função deu certo
            if(result) {
                //Verifica se há dados
                if(result.length > 0) {
                    MESSAGE.HEADER.status       = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code  = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.HEADER.response     = result;

                    return MESSAGE.HEADER;
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; //500
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido!';
            return MESSAGE.REQUIRED_FIELDS; //400
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
}

const insertLanguage = async (language, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if(!isNaN(language.idioma)) {

            } else {
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [IDIOMA] inválido!'
                
                return MESSAGE.ERROR_REQUIRED_FIELDS;
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        
    }
}

const updateLanguage = async (language, id, contentType) => {

}

const deleteLanguage = async (id) => {

}

module.exports = {
    listLanguage,
    searchLanguageById
}