const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/userModels');
// import User from "../models/userModels";

const findWithId = async (Model, id, options = {}) => {
    try {
        const options = { password: 0 };
        const item = await Model.findById(id, options)

        if (!item) {
            throw createError(404, `${Model.modelName} does not exits  with this id `);
        }
        return item;
    } catch (error) {
        if (error instanceof mongoose.Error) {
            throw createError(400, 'invalid item id')
        }
        throw error;
    }
};

module.exports = { findWithId };





