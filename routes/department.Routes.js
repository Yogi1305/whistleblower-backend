import { Router } from "express";
import { createDepartment, getalldepart } from "../controller/deparmentController";

const router = Router();

router.route("/").post(createDepartment)
.get(getalldepart);

export default router;