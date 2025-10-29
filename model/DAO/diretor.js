/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do CRUD de diretor no Banco de Dados MySQL
 * Data: 21/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import da biblioteca do @prisma/client
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os Gêneros no DB
const getSelectAllDirector = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_diretor order by id_diretor desc`;

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
const getSelectByIdDirector = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_diretor where id_diretor = ${id}`;

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

const getSelectLastIdDirector = async () => {
    try {
        //Script SQL
        let sql = `SELECT id_diretor FROM tbl_diretor ORDER BY id_diretor DESC LIMIT 1`;

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
const setInsertDirector = async (director) => {
    try {
        let sql = `INSERT INTO tbl_diretor(nome, data_nascimento, altura, peso, patrimonio_liquido)
                    VALUES (
                        '${director.nome}',
                        '${director.data_nascimento}',
                        ${director.altura},
                        ${director.peso},
                        ${director.patrimonio_liquido}
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
const setUpdateDirector = async (director) => {
    try {
        let sql = `UPDATE tbl_diretor SET
                        nome                =   '${director.nome}'
                        data_nascimento     =   '${director.data_nascimento}'
                        altura              =   ${director.altura}
                        peso                =   ${director.peso}
                        patrimonio_liquido  =   ${director.patrimonio_liquido}
                    WHERE id_diretor = ${director.id};`;

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
const setDeleteDirector = async (id) => {
    try {
        let sql = `DELETE FROM tbl_diretor WHERE id_diretor = ${id}`;

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
    getSelectAllDirector,
    getSelectByIdDirector,
    getSelectLastIdDirector,
    setInsertDirector,
    setUpdateDirector,
    setDeleteDirector
}