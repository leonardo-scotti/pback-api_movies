/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 07/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const filmeDAO = require('../../model/DAO/filme.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

//Retorna uma lista de filmes
const listarFilmes = async () => {
    //Chama a função do DAO para retornar a lista de filmes
    let result = await filmeDAO.getSelectAllFilms();

    if(result) {
        if(result.length > 0) {
            MESSAGE_DEFAULT.MESSAGE_HEADER.status = MESSAGE_DEFAULT.MESSAGE_REQUEST_SUCESS.status;
            MESSAGE_DEFAULT.MESSAGE_HEADER.status_code = MESSAGE_DEFAULT.MESSAGE_REQUEST_SUCESS.status_code;
            MESSAGE_DEFAULT.MESSAGE_HEADER.response.films = result; 

            return MESSAGE_DEFAULT.MESSAGE_HEADER;
        }
    }
};

//Retorna um filme filtrando pelo ID
const buscarFilmeId = async (id) => {

};

//Insere um novo filme
const inserirFilme = async (filme) => {
    
};

//Atualiza um filme filtrando pelo ID
const atualizarFilme = async (filme, id) => {
    
};

//Exclui um filme filtrando pelo ID
const excluirFilme = async (id) => {

};


module.exports = {
    listarFilmes
}