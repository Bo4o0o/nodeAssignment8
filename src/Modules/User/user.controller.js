import {Router} from "express";
import * as userService from "./user.service.js";

const router = Router();

router.post("/signup",userService.signUp);
router.post("/login",userService.login);
router.patch("/:id",userService.updateUserInfo);
router.delete("/",userService.deleteUser);
router.get("/",userService.getUserById);

export default router;