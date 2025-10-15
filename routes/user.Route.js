import express from "express"
import { superUserLogin, superUserRegister, userLogin, userRegister, whistlerLogin } from "../controller/userController.js"

const router = express.Router()

router.route("/whistler-login").post(whistlerLogin);
router.route("/user-register").post(userRegister);
router.route("/user-login").post(userLogin);
router.route("/super-user-register").post(superUserRegister);
router.route("/super-user-login").post(superUserLogin);

export default router