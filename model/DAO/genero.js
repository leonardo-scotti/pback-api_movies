/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do CRUD de genero no Banco de Dados MySQL
 * Data: 21/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import da biblioteca do @prisma/client
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os Gêneros no DB
const getSelectAllGenrer = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_genero order by id_genero desc`;

        //Executa no DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        //Validação para identificar se o retorno do DB é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        //console.log(error);
        return false;
    }
};

//Retorna um gênero filtrando pelo ID do DB
const getSelectByIdGenrer = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_genero where id_genero = ${id}`;

        //Executa no DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        //Validação para identificar se o retorno do DB é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        //console.log(error);
        return false;
    }
};

const getSelectLastIdGenrer = async () => {
    try {
        //Script SQL
        let sql = `SELECT id_genero FROM tbl_genero ORDER BY id_genero DESC LIMIT 1`;

        //Executa no DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        //Validação para identificar se o retorno do DB é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].id_genero);
        else
            return false;

    } catch (error) {
        //console.log(error);
        return false;
    }
}

//Insere um gênero no DB
const setInsertGenrer = async (genrer) => {
    try {
        let sql = `INSERT INTO tbl_genero(nome, descricao)
                    VALUES (
                        '${genrer.nome}',
                        '${genrer.descricao}'
                    )`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    };
};

//Atualiza um gênero existente no DB filtrando pelo ID
const setUpdateGenrer = async (genrer) => {
    try {
        let sql = `UPDATE tbl_genero SET 
                        nome                =   '${genrer.nome}',
                        descricao           =   '${genrer.descricao}'
                    WHERE id_genero = ${genrer.id}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    };
};

//Deleta um gênero existente no DB filtrando pelo ID
const setDeleteGenrer = async (id) => {
    try {
        let sql = `DELETE FROM tbl_genero WHERE id_genero = ${id}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
         else 
            return false;
    } catch (error) {
        return false;
    }
};

module.exports = {
    getSelectAllGenrer,
    getSelectByIdGenrer,
    getSelectLastIdGenrer,
    setInsertGenrer,
    setUpdateGenrer,
    setDeleteGenrer
}