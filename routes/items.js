import express from "express";
import { getMany, postMany, getFew, deleteMany, patchMany } from "../controller/items.js";
const router = express.Router();

router.route("/")
  .get(getMany)
  .post(postMany);

router.route("/:id")
  .get(getFew)
  .delete(deleteMany)
  .patch(patchMany);

export default router;
