/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do CRUD de idioma no Banco de Dados MySQL
 * Data: 21/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import da biblioteca do @prisma/client
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os Gêneros no DB
const getSelectAllLanguage = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_idioma order by id desc`;

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
const getSelectByIdLanguage = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_idioma where id = ${id}`;

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

const getSelectLastIdLanguage = async () => {
    try {
        //Script SQL
        let sql = `SELECT id_idioma FROM tbl_idioma ORDER BY id_idioma DESC LIMIT 1`;

        //Executa no DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        //Validação para identificar se o retorno do DB é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].id_idioma);
        else
            return false;

    } catch (error) {
        //console.log(error);
        return false;
    }
}

//Insere um filme no DB
const setInsertLanguage = async (language) => {
    try {
        let sql = `INSERT INTO tbl_idioma(idioma)
                    VALUES (
                        '${language.idioma}'
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
const setUpdateLanguage = async (language) => {
    try {
        let sql = `UPDATE tbl_idioma SET 
                        idioma                =   '${language.idioma}'
                    WHERE id_idioma = ${language.id}`;

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
const setDeleteLanguage = async (id) => {
    try {
        let sql = `DELETE FROM tbl_idioma WHERE id_idioma = ${id}`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
         else 
            return false;
    } catch (error) {
        return false;
    }
};

module.exports ={
    getSelectAllLanguage,
    getSelectByIdLanguage,
    getSelectLastIdLanguage,
    setInsertLanguage,
    setUpdateLanguage,
    setDeleteLanguage
}