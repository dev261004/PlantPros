// routes/plantRoutes.js
import express from 'express';
import { addPlant ,getPlantsByNursery,getAllPlants,getPlantById} from '../controllers/plantController.js';
import { addPlants } from '../controllers/plant.controller.js';
//import multer from 'multer'; // For handling file uploads
import { verifyJWT } from '../middlewares/auth.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();


router.post('/add-plant', verifyJWT,upload.single('image'), addPlant); // Handling single file upload for 'image'
router.post('/add-plant', upload.single('image'), addPlants); // Handling single file upload for 'image'
router.get('/my-plants', verifyJWT, getPlantsByNursery);
router.get('/all-plants', getAllPlants);
router.get('/:plantId', getPlantById);
export default router;
