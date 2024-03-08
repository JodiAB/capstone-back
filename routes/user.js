import express from "express";
import controller from "../controller/user.js";
const router = express.Router();

router.route("/").get(controller.getUs)
                .post(controller.postUser);

router
  .route("/:id")
  .get()
  .get(controller.getUser)

  .delete(controller.deletePerson)
  .patch(controller.patchPer);

// router.patch('/friends/:id', async (req, res) => {
//     const {name,age} = req.body
//     const id = req.params.id;
//     const up = await upFriend(id, name, age)
//     res.send(await getFriends())
// });

export default router;
