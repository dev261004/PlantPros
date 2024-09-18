import { Router } from "express";
const router = Router();
import {verifyJWT} from '../middlewares/auth.js';

import { addAddress, getAddressList, getAddressById, updateAddress, deleteAddress, getDefaultAddress } from '../controllers/address.controller.js';

router.use(verifyJWT); //* Auth middleware

//* Route /address
router.route('/address')
    .post(addAddress)
    .get(getAddressList);

//* Route /address/:id
router.route('/address/:id')
    .get(getAddressById)
    .patch(updateAddress)
    .delete(deleteAddress);

//* Route /default/address
router.get('/default/address', getDefaultAddress);

export default router;