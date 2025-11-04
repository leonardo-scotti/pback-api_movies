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

// ========== IMPORT'S ROUTES ==========
//Filmes
const moviesRoutes = require('./routes/filme/routes_filme.js');

//Gênero
const genrersRoutes = require('./routes/genero/routes_genero.js');

//Idioma
const languageRoutes = require('./routes/idioma/routes_idioma.js');

//Diretor
const directorRoutes = require('./routes/diretor/routes_diretor.js');
// =====================================

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

// ======================== ROTAS ==============================
//FILME
app.use('/v1/locadora/filme', cors(), bodyParserJSON, moviesRoutes);

//GÊNERO
app.use('/v1/locadora/genero', cors(), bodyParserJSON, genrersRoutes);

//IDIOMA
app.use('/v1/locadora/idioma', cors(), bodyParserJSON, languageRoutes);

//DIRETOR
app.use('/v1/locadora/diretor', cors(), bodyParserJSON, directorRoutes);
// =============================================================


app.listen(PORT, () => {
    console.log('API aguardando requisições...')
});
