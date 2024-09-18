// const mongoose = require('mongoose');
import { Router } from 'express';
const router = Router();
import {verifyJWT} from '../middlewares/auth.js';
import { createNurseryProfile, getNurseryDetail, updateNurseryDetail} from '../controllers/nursery.controller.js';

router.use(verifyJWT);

router.post('/profile', createNurseryProfile);
router.route('/profile')
    .get(getNurseryDetail)
    .patch(updateNurseryDetail)
    // .delete(deleteNurseryDetail);

// router.route('/profile/images')
//     .post(uploadNurseryImage)
//     .get(getNurseryImages) // todo:  need to work on 
//     .patch(updateNurseryImages) // todo:  need to work on 
//     .delete(deleteNurseryImage) // todo:  need to work on 


export default router;