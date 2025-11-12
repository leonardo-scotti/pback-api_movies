/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do relacionamento entre filme e diretor
 *           no Banco de Dados MySQL.
 * Data: 12/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import da biblioteca do @prisma/client
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os Filmes e Diretores no DB
const getSelectAllFilmsDirectors = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_diretor order by id desc`;

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

//Retorna um filmeDiretor filtrando pelo ID do DB
const getSelectByIdFilmDirector = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_diretor where id = ${id}`;

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
        let sql = `SELECT id FROM tbl_filme_diretor ORDER BY id DESC LIMIT 1`;

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

//Retorna os diretores filtrando pelo ID do filme do DB
const getSelectDirectorsByIdFilm = async (idFilm) => {
    try {
        //Script SQL
        let sql = `select tbl_diretor.id_diretor, tbl_diretor.nome
                     from tbl_filme
                            join tbl_filme_diretor
                                on tbl_filme.id = tbl_filme_diretor.filme_id
                            join tbl_diretor
                                on tbl_diretor.id_diretor = tbl_filme_diretor.diretor_id 
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

//Retorna os filmes filtrando pelo ID do filme do DB
const getSelectFilmsByIdDirector = async (idDirector) => {
    try {
        //Script SQL
        let sql = `select tbl_filme.*
                    from tbl_filme
                        join tbl_filme_diretor
                                on tbl_filme.id = tbl_filme_diretor.filme_id
                        join tbl_diretor
                                on tbl_diretor.id_diretor = tbl_filme_diretor.diretor_id 
                    where tbl_diretor.id_diretor = ${idDirector}`;

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

//Insere um FilmeDiretor no DB
const setInsertFilmDirector = async (filmDirector) => {
    try {
        let sql = `INSERT INTO tbl_filme_diretor(filme_id, diretor_id)
                    VALUES (
                        ${filmDirector.filme_id},
                        ${filmDirector.diretor_id}
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

//Atualiza um FilmeDiretor existente no DB filtrando pelo ID
const setUpdateFilmDirector = async (filmDirector) => {
    try {
        let sql = `UPDATE tbl_filme_diretor SET 
                        filme_id        =   ${filmDirector.filme_id},
                        diretor_id       =   ${filmDirector.diretor_id}
                    WHERE id = ${filmDirector.id}`;

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

//Deleta um FilmeDiretor existente no DB filtrando pelo ID
const setDeleteFilmDirector = async (id) => {
    try {
        let sql = `DELETE FROM tbl_filme_diretor WHERE id = ${id}`;

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
    getSelectAllFilmsDirectors,
    getSelectByIdFilmDirector,
    getSelectLastId,
    getSelectDirectorsByIdFilm,
    getSelectFilmsByIdDirector,
    setInsertFilmDirector,
    setUpdateFilmDirector,
    setDeleteFilmDirector
}