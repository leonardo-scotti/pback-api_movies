/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do CRUD de filme no Banco de Dados MySQL
 * Data: 01/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

/*******************************************************************************************
 * Dependências do node para DB relacionais:
 *      Sequelize   -> Foi uma biblioteca para acesso a DB;
 *      Prisma      -> É uma biblioteca atual para acesso e manipulação de dados, utilizando
 *                      SQL ou ORM (MySQL, PostgreSQL, SQLServer, Oracle);
 *      Knex        -> É uma biblioteca atual para acesso e manipulação de dados, utilizando
 *                      SQL (MySQL).
 * 
 * Dependências do node para DB não relacionais:
 *      Mongoose    -> É uma biblioteca para acesso a DB não relacional (MongoDB);
 * 
 * 
 * Instalação do Prisma:
*       npm install prisma         --save   -> Realiza a conexão com o DB
 *      npm install @prisma/client --save   -> Permite executar scripts SQL no DB
 *      npx prisma init            --save   -> Inicializador do prisma no projeto (.env , prisma)
 *      npx prisma migrate dev     --save   -> Permite sincronizar o Prisma com o DB, Modelar o
 *                                              DB conforme as configurações do ORM.
 *                                              CUIDADO: Esse comando faz um reset no DB.
 *      npx prisma migrate reset   --save   -> Realiza o reset do DB.
 *      npx prisma generate        --save   -> Realiza apenas o sincronismo com o DB
 * 
 *  ========================================================================================
 *  $queryRawUnsafe()   -> Permite executar apenas scripts SQL que retornam dados do DB
 *                          (SELECT), permite também executar um script SQL através de uma
 *                          variável;
 * 
 *  $exeuteRawUnsafe()  -> Permite executar scripts SQL que NÃO retornam dados do DB
 *                          (INSERT, UPDATE, DELETE);
 * 
 *  $queryRaw()         -> Permite executar apenas scripts SQL que retornam dados do DB
 *                          (SELECT), permite APENAS executar um script SQL direto no método.
 *                          Permite também aplicar segurança contra SQL Injection.
 * 
 *  $executeRaw()       ->Permite executar scripts SQL que NÃO retornam dados do DB
 *                          (INSERT, UPDATE, DELETE). Permite também aplicar segurança 
 *                          contra SQL Injection.
 ******************************************************************************************/

//Import da biblioteca do @prisma/client
//const { PrismaClient } = require('@prisma/client');
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os filmes do DB
const getSelectAllFilms = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_filme order by id desc`;

        //Executa no DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) {
            return result;
        } else {
            return false;
            //{
            //     "status": false,
            //     "statuscode": 200,
            //     "developer": "Leonardo Scotti"
            // };
        };
    } catch (error) {
        console.log(error);
        return false;
    }
};

//Retorna um filme filtrando pelo ID do DB
const getSelectByIdFilms = async (id) => {

};

//Insere um filme no DB
const setInsertFilms = async (filme) => {

};

//Atualiza um filme existente no DB filtrando pelo ID
const setUpdateFilms = async (filme) => {

};

//Deleta um filme existente no DB filtrando pelo ID
const setDeleteFilms = async (id) => {

};

module.exports = {
    getSelectAllFilms
}