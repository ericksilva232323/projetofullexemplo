const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    const { matricula, pin } = req.body;
    const comentario = await prisma.comentario.findFirst({
        where: {
            matricula: matricula,
            pin: pin
        }
    });
    if (comentario) {
        const token = await jwt.sign({ matricula: comentario.matricula }, process.env.KEY, {
            //expira em uma hora ou 3600 segundcomentario
            expiresIn: 3600
        });
        comentario.token = token;
        return res.json(comentario);
    } else {
        return res.status(401).json({ message: 'Matrícula ou pin inválidcomentario' });
    }
};

const create = async (req, res) => {
    try {
        const { matricula, nome, cargo, setor, pin } = req.body;
        const comentario = await prisma.comentario.create({
            data: {
                matricula: matricula,
                nome: nome,
                cargo: cargo,
                setor: setor,
                pin: pin
            }
        });
        return res.status(201).json(comentario);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const read = async (req, res) => {
    if (req.params.matricula !== undefined) {
        const comentario = await prisma.comentario.findUnique({
            where: {
                matricula: req.params.matricula
            }
        });
        return res.json(comentario);
    } else {
        const comentarioes = await prisma.comentario.findMany();
        return res.json(comentarioes);
    }
};

const update = async (req, res) => {
    try {
        const comentario = await prisma.comentario.update({
            where: {
                matricula: req.body.matricula
            },
            data: req.body
        });
        return res.status(202).json(comentario);
    } catch (error) {
        return res.status(404).json({ message: "comentario não encontrado" });
    }
};

const del = async (req, res) => {
    try {
        const comentario = await prisma.comentario.delete({
            where: {
                matricula: req.params.matricula
            }
        });
        return res.status(204).json(comentario);
    } catch (error) {
        return res.status(404).json({ message: "comentario não encontrado" });
    }
}

module.exports = {
    login,
    create,
    read,
    update,
    del
};