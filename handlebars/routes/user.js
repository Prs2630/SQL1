const express=require("express");

const router=express.Router();  //router object
const {homePage}=require("../controllers/user.controllers");

router.get("/home",homePage);


module.exports=router;