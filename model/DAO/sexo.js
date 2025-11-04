/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do CRUD de sexo no Banco de Dados MySQL
 * Data: 04/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import da biblioteca do @prisma/client
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os Sexos no DB
const getSelectAllSex = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_sexo order by id_sexo desc`;

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

//Retorna um Sexo filtrando pelo ID do DB
const getSelectByIdSex = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_sexo where id_sexo = ${id}`;

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

const getSelectLastIdSex = async () => {
    try {
        //Script SQL
        let sql = `SELECT id_sexo FROM tbl_sexo ORDER BY id_sexo DESC LIMIT 1`;

        //Executa no DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        //Validação para identificar se o retorno do DB é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].id_sexo);
        else
            return false;

    } catch (error) {
        //console.log(error);
        return false;
    }
}

//Insere um Sexo no DB
const setInsertSex = async (sex) => {
    try {
        let sql = `INSERT INTO tbl_sexo(sexo)
                    VALUES (
                        '${sex.sexo}'
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

//Atualiza um Sexo existente no DB filtrando pelo ID
const setUpdateSex = async (sex) => {
    try {
        let sql = `UPDATE tbl_sexo SET 
                        sexo                =   '${sex.sexo}'
                    WHERE id_sexo = ${sex.id}`;

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

//Deleta um sexo existente no DB filtrando pelo ID
const setDeleteSex = async (id) => {
    try {
        let sql = `DELETE FROM tbl_sexo WHERE id_sexo = ${id}`;

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
    getSelectAllSex,
    getSelectByIdSex,
    getSelectLastIdSex,
    setInsertSex,
    setUpdateSex,
    setDeleteSex
}