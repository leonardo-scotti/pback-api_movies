/*******************************************************************************************
 * Objetivo: Arquivo respnsável por guardar todas as rotas do CRUD de filmes.
 * Data: 29/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import das bibliotecas para criar a API
const express    = require('express');

// ========== IMPORT'S CONTROLLER'S ==========
//Controller Filme
const controllerFilme = require('../../controller/filme/controller_filme.js');

//Import do Router
const router = express.Router();

// ========== ENDPOINTS CRUD FILME ==========
//EndPoint que retorna a lista de filmes
router.get('/', async (request, response) => {
    let filmes = await controllerFilme.listarFilmes();

    response.status(filmes.status_code);
    response.json(filmes);
});

//EndPoint que retorna um filme filtrando pelo ID
router.get('/:id', async (request, response) => {
    let id = request.params.id;

    let filme = await controllerFilme.buscarFilmeId(id);

    response.status(filme.status_code);
    response.json(filme);
});

//EndPoint que insere um filme no DB
router.post('/', async (request, response) => {
    let filmeBody = request.body;

    let contentType = request.headers['content-type'];

    let setFilme = await controllerFilme.inserirFilme(filmeBody, contentType);

    response.status(setFilme.status_code);
    response.json(setFilme);
})

//EndPoint que atualiza um filme no DB
router.put('/:id', async (request, response) => {
    let idFilme     = request.params.id;
    let filmeBody   = request.body;
    let contentType = request.headers['content-type'];

    updatedFilme = await controllerFilme.atualizarFilme(filmeBody, idFilme, contentType);

    response.status(updatedFilme.status_code);
    response.json(updatedFilme);
})

router.delete('/:id', async (request, response) => {
    let idFilme = request.params.id;

    let deletedFilme = await controllerFilme.excluirFilme(idFilme);

    response.status(deletedFilme.status_code);
    response.json(deletedFilme);
})
// ==========================================
module.exports = router