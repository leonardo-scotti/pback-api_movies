/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela padronização de todas as mensagens da API do Projeto de
 *              Filmes.
 * Data: 07/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

const dataAtual = new Date();

/*************************** MENSAGENS DE PADRONIZAÇÃO DO PROJETO ***************************/
const MESSAGE_HEADER = {
    status: Boolean,
    status_code: Number,
    developer: 'Leonardo Scotti',
    api_description: 'API para manipular dados da locadora de filmes.',
    version: '1.0.10.25',
    request_date: dataAtual.toLocaleDateString(),
    response: {}
}

/******************************* MENSAGENS DE ERRO DO PROJETO *******************************/



/***************************** MENSAGENS DE SUCESSO DO PROJETO ******************************/
const MESSAGE_REQUEST_SUCESS = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!'
}

module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCESS
}