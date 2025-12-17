/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do relacionamento entre filme e personagem
 *           no Banco de Dados MySQL.
 * Data: 17/12/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import da biblioteca do @prisma/client
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os Filmes e Personagens no DB
const getSelectAllFilmsCharacter = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_personagem order by id desc`;

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

//Retorna um filmePersonagem filtrando pelo ID do DB
const getSelectByIdFilmCharacter = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_personagem where id = ${id}`;

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

//Retorna o último ID gerado no DB
const getSelectLastId = async () => {
    try {
        //Script SQL
        let sql = `SELECT id FROM tbl_filme_personagem ORDER BY id DESC LIMIT 1`;

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

//Retorna os personagens filtrando pelo ID do filme do DB
const getSelectCharactersByIdFilm = async (idFilm) => {
    try {
        //Script SQL
        let sql = `select tbl_personagem.*
                     from tbl_filme
                            join tbl_filme_personagem
                                on tbl_filme.id = tbl_filme_personagem.filme_id
                            join tbl_personagem
                                on tbl_personagem.id_personagem = tbl_filme_personagem.personagem_id 
                     where tbl_filme.id = ${idFilm}`;

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

//Retorna os filmes filtrando pelo ID do personagem do DB
const getSelectFilmsByIdCharacter = async (idCharacter) => {
    try {
        //Script SQL
        let sql = `select tbl_filme.*
                     from tbl_filme
                            join tbl_filme_personagem
                                on tbl_filme.id = tbl_filme_personagem.filme_id
                            join tbl_personagem
                                on tbl_personagem.id_personagem = tbl_filme_personagem.personagem_id 
                     where tbl_personagem.id_personagem = ${idCharacter}`;

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

//Insere um FilmePersonagem no DB
const setInsertFilmCharacter = async (filmCharacter) => {
    try {
        let sql = `INSERT INTO tbl_filme_personagem(filme_id, personagem_id)
                    VALUES (
                        ${filmCharacter.filme_id},
                        ${filmCharacter.personagem_id}
                    );`;

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    };
};

//Atualiza um FilmePersonagem existente no DB filtrando pelo ID
const setUpdateFilmCharacter = async (filmCharacter) => {
    try {
        let sql = `UPDATE tbl_filme_personagem SET 
                        filme_id        =   ${filmCharacter.filme_id},
                        personagem_id       =   ${filmCharacter.personagem_id}
                    WHERE id = ${filmCharacter.id}`;

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

//Deleta um FilmeCharacter existente no DB filtrando pelo ID
const setDeleteFilmCharacter = async (id) => {
    try {
        let sql = `DELETE FROM tbl_filme_personagem WHERE id = ${id}`;

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
    getSelectAllFilmsCharacter,
    getSelectByIdFilmCharacter,
    getSelectLastId,
    getSelectCharactersByIdFilm,
    getSelectFilmsByIdCharacter,
    setInsertFilmCharacter,
    setUpdateFilmCharacter,
    setDeleteFilmCharacter
}