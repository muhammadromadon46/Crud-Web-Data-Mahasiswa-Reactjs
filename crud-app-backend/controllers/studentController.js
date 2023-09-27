const { response } = require("express");
const studentModel = require("../models/studentModel");
const userModel = require("../models/userModel");
const { responseDefault } = require("../utils/responseMessage");
const { createValidation, loginValidation } = require("../validation/studentValidation"); 

// Add Data
const addData = async (req,res) => {
    try {

        //Data Exist
        const dataExist = await studentModel.findOne({
            npm : req.body.npm
        });
        if (dataExist) {
            return res.status(400).json({
                message : responseDefault.DATA_EXIST,
            })
        }


        // Validation
        const { error} = await createValidation(req.body);
        if (error) {
            return res.status(400).json({
                message : error.details[0].message,
            });
            
        }

        const response = await studentModel.create(req.body);
        res.status(201).json({
            message: responseDefault.CREATED_DATA,
            data: response,
        });
    } catch (error) {
        console.log(error);
        
    }
};

// Get Data 
const getData = async (req, res) => {
    try {
        const response = await studentModel.find();
        res.status(200).json({
            data: response,
        });
    } catch (error) {
        console.log(error);
    }

};

// GET DATA BY ID

const getDataById = async (req, res) => {
    try {
        // Get Id Not Found 
        const ID = await studentModel.findOne({
            _id: req.params.id
        });

        if (!ID) {
            return res.status(400).json({
                message : responseDefault.ID_NOT_FOUND,
            });
            
        }


        const response = await studentModel.findById(req.params.id);
        res.status(200).json({
            data : response,
        });

    } catch (error) {
        console.log(error);
        
    }
};


// GET DATA BY ID and UPDATE 

const updateData = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        // Get Id Not Found 
        const ID = await studentModel.findOne({
            _id: req.params.id
        });

        if (!ID) {
            return res.status(400).json({
                message : responseDefault.ID_NOT_FOUND,
            });
            
        }

        await studentModel.findByIdAndUpdate({_id:id},{$set : body});

        res.status(200).json({
            message: responseDefault.DATA_UPDATED,
        });
        
    } catch (error) {
        console.log();
    }
};

// GET DATA BY ID and DELETE

const deleteData = async (req, res) => {
    try {
        await studentModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message : responseDefault.DATA_DELETED,
        });
    } catch (error) {
        console.log(error);
    }

}



module.exports = {
    addData,
    getData,
    getDataById,
    updateData,
    deleteData,
    
};
