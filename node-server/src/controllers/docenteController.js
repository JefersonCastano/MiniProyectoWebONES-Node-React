const docenteService = require('../services/docenteServiceFacade');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const create = async (req, res, next) => {
    try {
        const newDocente = req.body;
        const createdDocente = await createDocente(newDocente);
        res.status(201).json(createdDocente);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const docenteId = req.params.id;
        const docenteChanges = req.body;
        const updatedDocente = await updateDocente(docenteId, docenteChanges);
        res.json(updatedDocente);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const docenteId = req.params.id;
        const deletedDocente = await deleteDocente(docenteId);
        res.json(deletedDocente);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const docenteId = req.params.id;
        const docente = await getDocenteById(docenteId);
        res.json(docente);
    } catch (error) {
        next(error);
    }
};

module.exports = { create, update, remove, getById };
