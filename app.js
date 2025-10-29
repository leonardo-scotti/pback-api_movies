/*******************************************************************************************
 * Objetivo: Arquivo respnsável pelas requisições da API do projeto da locadora de filmes.
 * Data: 07/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import das bibliotecas para criar a API
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');

// ========== IMPORT'S CONTROLLER'S ==========
//Controller Filme
const controllerFilme = require('./controller/filme/controller_filme.js');

//Controller Gênero
const controllerGenrer = require('./controller/genero/controller_genero.js');

//Controller Idioma
const controllerLanguage = require('./controller/idioma/controller_idioma.js');
// ===========================================

//Cria um objeto especialista no formato JSON para receber os dados no body (POST e PUT)
const bodyParserJSON = bodyParser.json();

//Porta
const PORT = process.PORT || 8080;

//Cria o objeto APP para criar a API
const app = express();

//cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    app.use(cors());
    next();
})

// ========== ENDPOINTS CRUD FILME ==========
//EndPoint que retorna a lista de filmes
app.get('/v1/locadora/filme', cors(), async (request, response) => {
    let filmes = await controllerFilme.listarFilmes();

    response.status(filmes.status_code);
    response.json(filmes);
});

//EndPoint que retorna um filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async (request, response) => {
    let id = request.params.id;

    let filme = await controllerFilme.buscarFilmeId(id);

    response.status(filme.status_code);
    response.json(filme);
});

//EndPoint que insere um filme no DB
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async (request, response) => {
    let filmeBody = request.body;

    let contentType = request.headers['content-type'];

    let setFilme = await controllerFilme.inserirFilme(filmeBody, contentType);

    response.status(setFilme.status_code);
    response.json(setFilme);
})

//EndPoint que atualiza um filme no DB
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async (request, response) => {
    let idFilme     = request.params.id;
    let filmeBody   = request.body;
    let contentType = request.headers['content-type'];

    updatedFilme = await controllerFilme.atualizarFilme(filmeBody, idFilme, contentType);

    response.status(updatedFilme.status_code);
    response.json(updatedFilme);
})

app.delete('/v1/locadora/filme/:id', cors(), async (request, response) => {
    let idFilme = request.params.id;

    let deletedFilme = await controllerFilme.excluirFilme(idFilme);

    response.status(deletedFilme.status_code);
    response.json(deletedFilme);
})
// ==========================================

// ========== ENDPOINTS CRUD GÊNERO ==========
//EndPoint que lista todos os Gêneros
app.get('/v1/locadora/genero', cors(), async (request, response) => {
    let genrers = await controllerGenrer.listGenrer()

    response.status(genrers.status_code);
    response.json(genrers);
})

//EndPoint que retorna um Gênero filtrando por ID
app.get('/v1/locadora/genero/:id', cors(), async (request, response) => {
    let idGenrer = request.params.id

    let genrer = await controllerGenrer.searchGenrerById(idGenrer);

    response.status(genrer.status_code);
    response.json(genrer);
})

//EndPoint que adiciona um Gênero no DB
app.post('/v1/locadora/genero', cors(), bodyParserJSON, async (request, response) => {
    let genrerBody = request.body;
    let contentType = request.headers['content-type'];

    let genrerInserted = await controllerGenrer.insertGenrer(genrerBody, contentType);

    response.status(genrerInserted.status_code);
    response.json(genrerInserted);
})

//EndPoint que atualiza um Gênero já existente no DB
app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async (request, response) => {
    let idGenrer = request.params.id
    let genrerBody = request.body;
    let contentType = request.headers['content-type'];

    let genrerUpdated = await controllerGenrer.updateGenrer(genrerBody, idGenrer, contentType);

    response.status(genrerUpdated.status_code);
    response.json(genrerUpdated);
})

//EndPoint que deleta um Gênero no DB
app.delete('/v1/locadora/genero/:id', cors(), async (request, response) => {
    let idGenrer = request.params.id;

    let genrerDeleted = await controllerGenrer.deleteGenrer(idGenrer);

    response.status(genrerDeleted.status_code);
    response.json(genrerDeleted);
})
// ===========================================

// ========== ENDPOINTS CRUD IDIOMA ==========
//EndPoint que lista tudo do DB
app.get('/v1/locadora/idioma', cors(), async (request, response) => {
    let languages = await controllerLanguage.listLanguage();

    response.status(languages.status_code);
    response.json(languages);
})

//EndPoint que retorna a linguagem por ID
app.get('/v1/locadora/idioma/:id', cors(), async (request, response) => {
    let idLanguage = request.params.id;

    let language = await controllerLanguage.searchLanguageById(idLanguage);

    response.status(language.status_code);
    response.json(language);
})

//EndPoint que insere uma linguagem no DB
app.post('/v1/locadora/idioma', cors(), bodyParserJSON, async (request, response) => {
    let languageBody = request.body;
    let contentType = request.headers['content-type'];

    let languageInserted = await controllerLanguage.insertLanguage(languageBody, contentType);
    console.log(languageInserted)

    response.status(languageInserted.status_code);
    response.json(languageInserted);
})

//EndPoint que atualiza uma lingaugem no DB
app.put('/v1/locadora/idioma/:id', cors(), bodyParserJSON, async (request, response) => {
    let idLanguage = request.params.id;
    let languageBody = request.body
    let contentType = request.headers['content-type'];

    let languageUpdated = await controllerLanguage.updateLanguage(languageBody, idLanguage, contentType);

    response.status(languageUpdated.status_code);
    response.json(languageUpdated);
})

//EndPoint que deleta uma linguagem no DB
app.delete('/v1/locadora/idioma/:id', cors(), async (request, response) => {
    let idLanguage = request.params.id;

    let languageDeleted = await controllerLanguage.deleteLanguage(idLanguage);

    response.status(languageDeleted.status_code);
    response.json(languageDeleted);
})
// ===========================================

app.listen(PORT, () => {
    console.log('API aguardando requisições...')
});
