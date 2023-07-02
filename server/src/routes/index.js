const { Router } = require("express");
const  PostUser = require("../controllers/postUser"); //ejemplo
const Login = require("../controllers/login")


const router = Router();


router.get("/login",Login);

router.post("/login" , (req,res)=>{
    PostUser (req,res);
    })







    
module.exports = router;
