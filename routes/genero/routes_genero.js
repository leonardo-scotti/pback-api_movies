/*******************************************************************************************
 * Objetivo: Arquivo respnsável por guardar todas as rotas do CRUD de gêneros.
 * Data: 04/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import das bibliotecas para criar a API
const express    = require('express');

// ========== IMPORT'S CONTROLLER'S ==========
//Controller Filme
const controllerGenrer = require('../../controller/genero/controller_genero.js');

//Import do Router
const router = express.Router();

// ========== ENDPOINTS CRUD GÊNERO ==========
//EndPoint que lista todos os Gêneros
router.get('/', async (request, response) => {
    let genrers = await controllerGenrer.listGenrer()

    response.status(genrers.status_code);
    response.json(genrers);
})

//EndPoint que retorna um Gênero filtrando por ID
router.get('/:id', async (request, response) => {
    let idGenrer = request.params.id

    let genrer = await controllerGenrer.searchGenrerById(idGenrer);

    response.status(genrer.status_code);
    response.json(genrer);
})

//EndPoint que adiciona um Gênero no DB
router.post('/', async (request, response) => {
    let genrerBody = request.body;
    let contentType = request.headers['content-type'];

    let genrerInserted = await controllerGenrer.insertGenrer(genrerBody, contentType);

    response.status(genrerInserted.status_code);
    response.json(genrerInserted);
})

//EndPoint que atualiza um Gênero já existente no DB
router.put('/:id', async (request, response) => {
    let idGenrer = request.params.id
    let genrerBody = request.body;
    let contentType = request.headers['content-type'];

    let genrerUpdated = await controllerGenrer.updateGenrer(genrerBody, idGenrer, contentType);

    response.status(genrerUpdated.status_code);
    response.json(genrerUpdated);
})

//EndPoint que deleta um Gênero no DB
router.delete('/:id', async (request, response) => {
    let idGenrer = request.params.id;

    let genrerDeleted = await controllerGenrer.deleteGenrer(idGenrer);

    response.status(genrerDeleted.status_code);
    response.json(genrerDeleted);
})
// ==========================================

module.exports = router