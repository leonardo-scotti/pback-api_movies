/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 04/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const characterDAO = require('../../model/DAO/personagem.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

const listCharacters = async () => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função do DAO que lista os personagens do DB
        let result = await characterDAO.getSelectAllCharacter();
        if (result) {
            //Verifica se há dados no DB
            if (result.length > 0) {
                //Guarda a quantidade em uma variável
                let amount = result.length;

                //Monta a mensagem
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status;
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code;
                MESSAGE.HEADER.response.characters_amount = amount;
                MESSAGE.HEADER.response.characters = result;

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

const searchCharacterById = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do ID
        if (id != '' && id != null && id != undefined && id > 0) {
            //Chama a função do DAO que busca um personagem fltrando pelo ID
            let result = await characterDAO.getSelectByIdCharacter(id);
            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status;
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code;
                    MESSAGE.HEADER.response = result;

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
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

const insertCharacter = async (character, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função que valida os dados do objeto personagem
            let validarDadosCharacter = validarDados(character);
            if (!validarDadosCharacter) {
                //Chama a função do DAO que insere um personagem no DB
                let result = await characterDAO.setInsertCharacter(character);
                if (result) {
                    //Chama a função do DAO que busca o último ID do DB
                    let lastIdCharacter = await characterDAO.getSelectLastIdCharacter();

                    //Cria um objeto do personagem com o ID sendo o primeiro atributo
                    let characterInserted = {
                        "id": lastIdCharacter,
                        ...character
                    }

                    MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status;
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code;
                    MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message;
                    MESSAGE.HEADER.response = characterInserted;

                    return MESSAGE.HEADER;
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            } else {
                return validarDadosCharacter; //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

const updateCharacter = async (character, id, contentType) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função que valida os dados do objeto personagem
            let validarDadosCharacter = validarDados(character);
            if (!validarDadosCharacter) {
                //Validação do ID
                let validarID = await searchCharacterById(id);
                console.log(validarID);
                if (validarID.status_code == 200) {
                    //Cria o objeto do personagem com o ID em primeiro
                    let characterUpdated = {
                        "id": id,
                        ...character
                    }

                    //Chama a função do DAO que atualiza o personagem no DB
                    let result = await characterDAO.setUpdateCharacter(characterUpdated);
                    if (result) {

                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATED_ITEM.status;
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATED_ITEM.status_code;
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATED_ITEM.message;
                        MESSAGE.HEADER.response = characterUpdated;

                        return MESSAGE.HEADER; //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido!'

                    return MESSAGE.ERROR_REQUIRED_FIELDS; //400
                }
            } else {
                return validarDadosCharacter; //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

const deleteCharacter = async (id) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função do DAO que deleta um personagem do DB
        let result = await characterDAO.setDeleteCharacter(id);
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
const validarDados = (character) => {
    //Cópia do objeto MESSAGE_DEFAULT
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    if (character.nome == '' || character.nome == null || character.nome == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!'

        return MESSAGE.ERROR_REQUIRED_FIELDS;
    } else if (character.data_nascimento == '' || character.data_nascimento == null || character.data_nascimento == undefined || character.data_nascimento.length < 10 || character.data_nascimento.length > 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA_NASCIMENTO] inválido!'

        return MESSAGE.ERROR_REQUIRED_FIELDS;
    }else if (character.raca == '' || character.raca == null || character.raca == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [RACA] inválido!'

        return MESSAGE.ERROR_REQUIRED_FIELDS;
    } else if (character.descricao == '' || character.descricao == null || character.descricao == undefined || !isNaN(character.descricao)) {

    } else if (isNaN(character.altura) || character.altura == '' || character.altura == null || character.altura == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ALTURA] inválido!'

        return MESSAGE.ERROR_REQUIRED_FIELDS;
    } else if (isNaN(character.peso) || character.peso == '' || character.peso == null || character.peso == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [PESO] inválido!'

        return MESSAGE.ERROR_REQUIRED_FIELDS;
    } else {
        return false;
    }
}

module.exports = {
    listCharacters,
    searchCharacterById,
    insertCharacter,
    updateCharacter,
    deleteCharacter
};