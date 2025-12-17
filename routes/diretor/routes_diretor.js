/*******************************************************************************************
 * Objetivo: Arquivo respnsável por guardar todas as rotas do CRUD de diretor.
 * Data: 04/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import das bibliotecas para criar a API
const express    = require('express');

// ========== IMPORT'S CONTROLLER'S ==========
//Controller Filme
const controllerDirector = require('../../controller/diretor/controller_diretor.js');

//Import do Router
const router = express.Router();

// ========== ENDPOINTS CRUD DIRETOR ==========
//EndPoint que retorna todos os diretores do DB
router.get('/', async (request, response) => {
    let directors = await controllerDirector.listDirector();

    response.status(directors.status_code);
    response.json(directors);
})

//EndPoint que retorna um diretor filtrando pelo ID
router.get('/:id', async (request, response) => {
    let idDirector = request.params.id;

    let director = await controllerDirector.searchDirectorById(idDirector);

    response.status(director.status_code);
    response.json(director);
})

//EndPoint que  insere um diretor no DB
router.post('/', async (request, response) => {
    let directorBody = request.body;
    let contentType = request.headers['content-type'];

    let directorInserted = await controllerDirector.insertDirector(directorBody, contentType);
    
    response.status(directorInserted.status_code);
    response.json(directorInserted);
})

//EndPoint que atualiza um diretor no DB
router.put('/:id', async (request, response) => {
    let idDirector = request.params.id;
    let directorBody = request.body;
    let contentType = request.headers['content-type'];

    let directorUpdated = await controllerDirector.updateDirector(directorBody, idDirector, contentType);
    
    response.status(directorUpdated.status_code);
    response.json(directorUpdated);
})

//EndPoint que deleta um diretor do DB
router.delete('/:id', async (request, response) => {
    let idDirector = request.params.id;

    let directorDeleted = await controllerDirector.deleteDirector(idDirector);
    
    response.status(directorDeleted.status_code);
    response.json(directorDeleted);
})
// ============================================

module.exports = router