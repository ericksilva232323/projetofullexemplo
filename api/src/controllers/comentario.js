const { PrismaClient } = require('@prisma/client');
const { read, create, update, del } = require('./comentario');
const prisma = new PrismaClient();

    const read = async (req, res) => {
        if (req.params.id !== undefined){
            const comentario = await prisma.comentario.findUnique({
                where: {
                    id: req.params.matricula
                }
            });
            return res.json(comentario);
        } else {
            const comentario = await prisma.colaborador.findMany();
            return res.json(comentario)
        }
    };

module.exports = {
    read,
    create,
    update,
    del
};