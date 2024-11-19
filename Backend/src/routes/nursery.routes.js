// const mongoose = require('mongoose');
import { Router } from 'express';

import {verifyJWT} from '../middlewares/auth.js';
import { createNurseryProfile,verifyNurseryEmail,getNurseryDetail } from '../controllers/nursery.controller.js';
const router = Router();


router.post('/profile', verifyJWT,createNurseryProfile);
router.route('/profile/:id')
    .get(getNurseryDetail)
router.post('/verify-nursery-email', verifyNurseryEmail);
    // .patch(updateNurseryDetail)



export default router;