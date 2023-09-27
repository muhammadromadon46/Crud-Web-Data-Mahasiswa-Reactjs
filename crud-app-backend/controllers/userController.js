const { response } = require("express");
const userModel = require("../models/userModel");
const { responseDefault } = require("../utils/responseMessage");
const { loginValidation } = require("../validation/studentValidation"); 


// Tambah User
const tambahUser = async (req,res) => {
    try {

        //Data Exist
        const dataExist = await userModel.findOne({
            email : req.body.email
        });
        if (dataExist) {
            return res.status(400).json({
                message : responseDefault.DATA_EXIST,
            })
        }


        // Validation
        const { error} = await loginValidation(req.body);
        if (error) {
            return res.status(400).json({
                message : error.details[0].message,
            });
            
        }

        // Create User 
        const response = await userModel.create(req.body);
        res.status(201).json({
            message: responseDefault.CREATED_DATA,
            data: response,
        });
    } catch (error) {
        console.log(error);
        
    }
};



// Get User 
const getUser = async (req, res) => {
    try {
        const response = await userModel.find();
        res.status(200).json({
            data: response,
        });
    } catch (error) {
        console.log(error);
    }

};

// GET DATA BY ID

const getUserById = async (req, res) => {
    try {
        // Get Id Not Found 
        const ID = await userModel.findOne({
            _id: req.params.id
        });

        if (!ID) {
            return res.status(400).json({
                message : responseDefault.ID_NOT_FOUND,
            });
            
        }


        const response = await userModel.findById(req.params.id);
        res.status(200).json({
            data : response,
        });

    } catch (error) {
        console.log(error);
        
    }
};


// GET DATA BY ID and UPDATE 

const updateUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        // Get Id Not Found 
        const ID = await userModel.findOne({
            _id: req.params.id
        });

        if (!ID) {
            return res.status(400).json({
                message : responseDefault.ID_NOT_FOUND,
            });
            
        }

        await userModel.findByIdAndUpdate({_id:id},{$set : body});

        res.status(200).json({
            message: responseDefault.DATA_UPDATED,
        });
        
    } catch (error) {
        console.log();
    }
};

// GET DATA BY ID and DELETE

const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message : responseDefault.DATA_DELETED,
        });
    } catch (error) {
        console.log(error);
    }

}



module.exports = {
    
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    tambahUser,
};
