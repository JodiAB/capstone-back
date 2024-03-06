import express from 'express';
import controller from '../controller/items.js';
const router = express.Router();


router
      .route('/')
                .get( controller.getMany)     
                .post(controller.postMany) 

router
        .route('/:id')
                    .get()
                       .get(controller.getFew)

                           .delete(controller.deleteMany)
                           .patch(controller.patchMany)


// router.patch('/friends/:id', async (req, res) => {
//     const {name,age} = req.body
//     const id = req.params.id; 
//     const up = await upFriend(id, name, age)
//     res.send(await getFriends())
// });
    

export default router;