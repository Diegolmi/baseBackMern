const router = require('express').Router();
const { getAllusers, getUser, registerUser, loginUser, updateUser, deleteUser } = require('../controllers/userControllers');


router.get("/users", getAllusers);
router.get("/users/:id", getUser);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);