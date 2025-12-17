/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do relacionamento entre filme e gênero
 *           no Banco de Dados MySQL.
 * Data: 05/11/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import da biblioteca do @prisma/client
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os Filmes e Gêneros no DB
const getSelectAllFilmsGenrers = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_genero order by id desc`;

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

//Retorna um filmeGenero filtrando pelo ID do DB
const getSelectByIdFilmGenrer = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_genero where id = ${id}`;

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
        let sql = `SELECT id FROM tbl_filme_genero ORDER BY id DESC LIMIT 1`;

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

//Retorna os gêneros filtrando pelo ID do filme do DB
const getSelectGenrersByIdFilm = async (idFilm) => {
    try {
        //Script SQL
        let sql = `select tbl_genero.id_genero, tbl_genero.nome
                     from tbl_filme
                            join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.filme_id
                            join tbl_genero
                                on tbl_genero.id_genero = tbl_filme_genero.genero_id 
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
const getSelectFilmsByIdGenrer = async (idGenrer) => {
    try {
        //Script SQL
        let sql = `select tbl_filme.id_filme, tbl_filme.nome
                     from tbl_filme
                            join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.filme.id
                            join tbl_genero
                                on tbl_genero.id_genero = tbl_filme_genero.genero_id 
                     where tbl_genero.id = ${idGenrer}`;

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

//Insere um FilmeGenero no DB
const setInsertFilmGenrer = async (filmGenrer) => {
    try {
        let sql = `INSERT INTO tbl_filme_genero(filme_id, genero_id)
                    VALUES (
                        ${filmGenrer.filme_id},
                        ${filmGenrer.genero_id}
                    );`;
        console.log(sql)
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

//Atualiza um FilmeGenero existente no DB filtrando pelo ID
const setUpdateFilmGenrer = async (filmGenrer) => {
    try {
        let sql = `UPDATE tbl_filme_genero SET 
                        filme_id        =   ${filmGenrer.filme_id},
                        genero_id       =   ${filmGenrer.genero_id}
                    WHERE id = ${filmGenrer.id}`;

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

//Deleta um FilmeGenero existente no DB filtrando pelo ID
const setDeleteFilmGenrer = async (id) => {
    try {
        let sql = `DELETE FROM tbl_filme_genero WHERE id = ${id}`;

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
    getSelectAllFilmsGenrers,
    getSelectByIdFilmGenrer,
    getSelectLastId,
    getSelectGenrersByIdFilm,
    getSelectFilmsByIdGenrer,
    setInsertFilmGenrer,
    setUpdateFilmGenrer,
    setDeleteFilmGenrer
}