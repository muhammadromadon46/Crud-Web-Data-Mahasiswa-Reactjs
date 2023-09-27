const express = require("express");
const route = express.Router();
const {addData, getData, getDataById, updateData, deleteData} = require("../controllers/studentController");
const {tambahUser, getUser, getUserById, updateUser, deleteUser} = require("../controllers/userController");
const { deleteModel } = require("mongoose");


route.post("/addData", addData);
route.get("/getData", getData);
route.get("/getData/:id", getDataById);
route.put("/editData/:id", updateData);
route.delete("/deleteData/:id", deleteData);


route.post("/tambahUser", tambahUser);
route.get("/getUser", getUser);
route.get("/getUser/:id", getUserById);
route.put("/editUser/:id", updateUser);
route.delete("/deleteUser/:id", deleteUser);



module.exports = route;


