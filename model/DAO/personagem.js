/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do CRUD de personagem no Banco de Dados MySQL
 * Data: 21/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import da biblioteca do @prisma/client
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os Gêneros no DB
const getSelectAllCharacter = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_personagem order by id desc`;

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
const getSelectByIdCharacter = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_personagem where id = ${id}`;

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

const getSelectLastIdCharacter = async () => {
    try {
        //Script SQL
        let sql = `SELECT id FROM tbl_personagem ORDER BY id DESC LIMIT 1`;

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
const setInsertCharacter = async (character) => {
    try {
        let sql = `INSERT INTO tbl_personagem(nome, data_nascimento, raca, descricao, altura, peso)
                    VALUES (
                        '${character.nome}',
                        '${character.data_nascimento}',
                        '${character.raca}',
                        '${character.descricao}',
                        ${character.altura},
                        ${character.peso}
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
const setUpdateCharacter = async (character) => {
    try {
        let sql = `UPDATE tbl_personagem SET
                        nome                =   '${character.nome}'
                        data_nascimento     =   '${character.data_nascimento}'
                        raca                =   '${character.raca}'
                        descricao           =   '${character.descricao}'
                        altura              =   '${character.altura}'
                        peso                =   '${character.peso}'
                    WHERE id = ${character.id};`;

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
const setDeleteCharacter = async (id) => {
    try {
        let sql = `DELETE FROM tbl_personagem WHERE id = ${id}`;

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
    getSelectAllCharacter,
    getSelectByIdCharacter,
    getSelectLastIdCharacter,
    setInsertCharacter,
    setUpdateCharacter,
    setDeleteCharacter
}