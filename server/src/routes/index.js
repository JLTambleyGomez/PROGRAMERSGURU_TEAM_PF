//Router:
const router = require("express").Router();

//Controllers:
const { PostUser } = require("../controllers/User/postUser");
const { Login } = require("../controllers/User/login");
const technologyRouter = require('./technologyRouter');
const courseRouter = require('./courseRouter');
//__________________________________________________

router.use('/technology', technologyRouter);

router.use('/course', courseRouter);

router.get("/login", Login);

router.post("/login", PostUser);



module.exports = router;