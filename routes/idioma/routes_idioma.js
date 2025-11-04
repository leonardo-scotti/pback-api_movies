/*******************************************************************************************
 * Objetivo: Arquivo respnsável por guardar todas as rotas do CRUD de idioma.
 * Data: 04/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import das bibliotecas para criar a API
const express    = require('express');

// ========== IMPORT'S CONTROLLER'S ==========
//Controller Filme
const controllerLanguage = require('../../controller/idioma/controller_idioma.js');

//Import do Router
const router = express.Router();

// ========== ENDPOINTS CRUD GÊNERO ==========
//EndPoint que lista tudo do DB
router.get('/', async (request, response) => {
    let languages = await controllerLanguage.listLanguage();

    response.status(languages.status_code);
    response.json(languages);
})

//EndPoint que retorna a linguagem por ID
router.get('/:id', async (request, response) => {
    let idLanguage = request.params.id;

    let language = await controllerLanguage.searchLanguageById(idLanguage);

    response.status(language.status_code);
    response.json(language);
})

//EndPoint que insere uma linguagem no DB
router.post('/', async (request, response) => {
    let languageBody = request.body;
    let contentType = request.headers['content-type'];

    let languageInserted = await controllerLanguage.insertLanguage(languageBody, contentType);
    console.log(languageInserted)

    response.status(languageInserted.status_code);
    response.json(languageInserted);
})

//EndPoint que atualiza uma lingaugem no DB
router.put('/:id', async (request, response) => {
    let idLanguage = request.params.id;
    let languageBody = request.body
    let contentType = request.headers['content-type'];

    let languageUpdated = await controllerLanguage.updateLanguage(languageBody, idLanguage, contentType);

    response.status(languageUpdated.status_code);
    response.json(languageUpdated);
})

//EndPoint que deleta uma linguagem no DB
router.delete('/:id', async (request, response) => {
    let idLanguage = request.params.id;

    let languageDeleted = await controllerLanguage.deleteLanguage(idLanguage);

    response.status(languageDeleted.status_code);
    response.json(languageDeleted);
})
// ==========================================

module.exports = router