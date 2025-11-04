/*******************************************************************************************
 * Objetivo: Arquivo respnsável por guardar todas as rotas do CRUD de personagem.
 * Data: 04/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import das bibliotecas para criar a API
const express    = require('express');

// ========== IMPORT'S CONTROLLER'S ==========
//Controller Filme
const controllerCharacter = require('../../controller/personagem/controller_personagem.js');

//Import do Router
const router = express.Router();

// ========== ENDPOINTS CRUD PERSONAGEM ==========
//EndPoint que retorna todos os personagens do DB
router.get('/', async (request, response) => {
    let characters = await controllerCharacter.listCharacters();

    response.status(characters.status_code);
    response.json(characters);
})

//EndPoint que retorna um personagem filtrando pelo ID
router.get('/:id', async (request, response) => {
    let idCharacter = request.params.id;

    let character = await controllerCharacter.searchCharacterById(idCharacter);

    response.status(character.status_code);
    response.json(character);
})

//EndPoint que  insere um personagem no DB
router.post('/', async (request, response) => {
    let characterBody = request.body;
    let contentType = request.headers['content-type'];

    let characterInserted = await controllerCharacter.insertCharacter(characterBody, contentType);

    response.status(characterInserted.status_code);
    response.json(characterInserted);
})

//EndPoint que atualiza um personagem no DB
router.put('/:id', async (request, response) => {
    let idCharacter = request.params.id;
    let characterBody = request.body;
    let contentType = request.headers['content-type'];

    let characterUpdated = await controllerCharacter.updateCharacter(characterBody, idCharacter, contentType);
    
    response.status(characterUpdated.status_code);
    response.json(characterUpdated);
})

//EndPoint que deleta um personagem do DB
router.delete('/:id', async (request, response) => {
    let idCharacter = request.params.id;

    let characterDeleted = await controllerCharacter.deleteCharacter(idCharacter);
    
    response.status(characterDeleted.status_code);
    response.json(characterDeleted);
})
// ============================================

module.exports = router