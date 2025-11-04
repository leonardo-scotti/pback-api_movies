/*******************************************************************************************
 * Objetivo: Arquivo respnsável por guardar todas as rotas do CRUD de sexos.
 * Data: 04/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import das bibliotecas para criar a API
const express    = require('express');

// ========== IMPORT'S CONTROLLER'S ==========
//Controller Filme
const controllerSex = require('../../controller/sexo/controller_sexo');

//Import do Router
const router = express.Router();

// ========== ENDPOINTS CRUD SEXO ==========
//EndPoint que lista todos os sexos
router.get('/', async (request, response) => {
    let sexs = await controllerSex.listSex()

    response.status(sexs.status_code);
    response.json(sexs);
})

//EndPoint que retorna um sexo filtrando por ID
router.get('/:id', async (request, response) => {
    let idSex = request.params.id

    let sex = await controllerSex.searchSexById(idSex);

    response.status(sex.status_code);
    response.json(sex);
})

//EndPoint que adiciona um sexo no DB
router.post('/', async (request, response) => {
    let sexBody = request.body;
    let contentType = request.headers['content-type'];

    let sexInserted = await controllerSex.insertSex(sexBody, contentType);

    response.status(sexInserted.status_code);
    response.json(sexInserted);
})

//EndPoint que atualiza um sexo já existente no DB
router.put('/:id', async (request, response) => {
    let idSex = request.params.id
    let sexBody = request.body;
    let contentType = request.headers['content-type'];

    let sexUpdated = await controllerSex.updateSex(sexBody, idSex, contentType);

    response.status(sexUpdated.status_code);
    response.json(sexUpdated);
})

//EndPoint que deleta um sexo no DB
router.delete('/:id', async (request, response) => {
    let idSex = request.params.id;

    let sexDeleted = await controllerSex.deleteSex(idSex);

    response.status(sexDeleted.status_code);
    response.json(sexDeleted);
})
// ==========================================

module.exports = router