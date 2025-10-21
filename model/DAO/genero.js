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
const getSelectAllGender = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_genero order by id desc`;

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

//Retorna um filme filtrando pelo ID do DB
const getSelectByIdGender = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_genero where id = ${id}`;

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

const getSelectLastIdGender = async () => {
    try {
        //Script SQL
        let sql = `SELECT id FROM tbl_genero ORDER BY id DESC LIMIT 1`;

        //Executa no DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        //Validação para identificar se o retorno do DB é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].id);
        else
            return false;

    } catch (error) {
        //console.log(error);
        return false;
    }
}

//Insere um filme no DB
const setInsertGender = async (gender) => {
    try {
        let sql = `INSERT INTO tbl_genero(nome)
                    VALUES (
                        '${gender.nome}'
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

//Atualiza um filme existente no DB filtrando pelo ID
const setUpdateGender = async (gender) => {
    try {
        let sql = `UPDATE tbl_genero SET 
                        nome                =   '${gender.nome}'
                    WHERE id = ${gender.id}`;

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

//Deleta um filme existente no DB filtrando pelo ID
const setDeleteGender = async (id) => {
    try {
        let sql = `DELETE FROM tbl_genero WHERE id = ${id}`;

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
    getSelectAllGender,
    getSelectByIdGender,
    getSelectLastIdGender,
    setInsertGender,
    setUpdateGender,
    setDeleteGender
}