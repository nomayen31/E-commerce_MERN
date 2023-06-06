const createError = require('http-errors');
const User = require('../models/userModels');
const findItem = require('../services/findItem');
const { successResponse } = require('./responseController');
const fs = require('fs').promises;
const { error } = require('console');
const deleteImage = require('../helper/deleteImage');
const { createJsonWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey } = require('../secret');

const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp('.*' + search + ".*", 'i');

        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } }
            ]
        };

        const options = { password: 0 }
        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit)
        const count = await User.find(filter).countDocuments();

        if (!users) throw createError(404, "no user found");


        return successResponse(res, {
            statusCode: 200,
            message: 'Users were is returned successfully',
            payload: {
                users,
                pagination: {
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                }
            }
        })

    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {

        const id = req.params.id;
        const options = { password: 0 };
        const user = await findItem.findWithId(User, id, options)


        return successResponse(res, {
            statusCode: 200,
            message: 'User were is returned successfully',
            payload: { user },
        });

    } catch (error) {

        next(error);
    }
};


const deleteUserById = async (req, res, next) => {
    try {

        const id = req.params.id;
        const options = { password: 0 };
        const user = await findItem.findWithId(User, id, options);

        const userImagePath = user.image;


        deleteImage(userImagePath);

        await User.findByIdAndDelete({ _id: id, isAdmin: false })


        return successResponse(res, {
            statusCode: 200,
            message: 'User was is delete successfully',
        });

    } catch (error) {

        next(error);
    }
};


const processRegister = async (req, res, next) => {
    try {

        const { name, phone, password, email, address } = req.body;

        const userExist = await User.exists({ email: email })
        if (userExist) {
            throw createError(409, 'user with this email already exits.... please sign in')
        }

        // jwt 
        const token =  createJsonWebToken(
            { name, phone, password, email, address },jwtActivationKey, '10m' )
        console.log(token);
    
        return successResponse(res, {
            statusCode: 200,
            message: 'User was created successfully',
            payload: { token }
        });

    } catch (error) {

        next(error);
    }
};

module.exports = { getUsers, getUserById, deleteUserById, processRegister }