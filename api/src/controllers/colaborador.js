const { PrismaClient } = require('@prisma/cliente');
const prisma = new PrismaClient();
const Middleware = require('./src/middleware/midddleware')

const login = async (req, res) => {
    const { matricula, pin } = req.body;
    const colaborador = await prisma.colaborador.findfist{{
        
    }}
}

module.exports = {};