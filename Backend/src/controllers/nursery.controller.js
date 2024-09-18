import mongoose from "mongoose";
import { User } from '../models/user.model.js';
import { nursery as nurseryModel } from '../models/nursery.model.js';

import { plant } from '../models/plants.model.js';
// import { deleteMany as _deleteMany } from '../models/nurseryStore.model.js';
// import { deleteFolder, deleteResourcesByPrefix, uploadImage } from '../utils/uploadImages';

export async function createNurseryProfile(req, res, next) {
    const session = await mongoose.startSession(); // Correct session initiation
    try {
        session.startTransaction();
        console.log("User roles:", req.role);

        // Fallback for req.role in case it's undefined
        const userRole = req.role || [];

        // Check if the user is already a seller or nursery exists
        if (req.nursery || userRole.includes('seller')) {
            const error = new Error("Nursery already registered");
            error.statusCode = 403;
            throw error;
        }

        // Create a new nursery entry
        const addNursery = new nurseryModel(req.body);

        // Update the user's role to include 'seller'
        const updateUserRole = await User.findByIdAndUpdate(req.user, {
            $push: {
                role: "seller"
            }, $set: {
                nursery: addNursery._id // Ensure nursery ID is saved
            }
        }, {
            new: true,
            session
        });

        if (!updateUserRole || !updateUserRole.role.includes("seller")) {
            const error = new Error("Nursery Listing Failure");
            error.statusCode = 400;
            throw error;
        }

        await addNursery.save({ session });
        await session.commitTransaction();

        const info = {
            status: true,
            message: "Nursery Listed Successfully.",
            result: addNursery
        };

        res.status(200).send(info);
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
}

export async function getNurseryDetail(req, res, next) {
    try {
        console.log('Request Nursery:', req.nursery); // Log the nursery value
        console.log('Request User:', req.user); // Log user to ensure it's the correct user

        // Ensure req.nursery and req.role are defined
        if (!req.nursery || !req.role.includes('seller')) {
            const error = new Error("You Are Not Allowed to access this route");
            error.statusCode = 401;
            throw error;
        }

        const result = await nurseryModel.findOne({ user: req.user._id, _id: req.nursery }).select("-avatarList -coverList");

        if (!result) {
            const error = new Error("Nursery detail not found.");
            error.statusCode = 404;
            throw error;
        }

        const info = {
            status: true,
            message: "Nursery detail retrieved.",
            result
        };

        res.status(200).send(info);
    } catch (error) {
        next(error);
    }
}



export async function updateNurseryDetail(req, res, next) {
    try {
        if (!req.nursery || !req.role.includes('seller')) {
            const error = new Error("You Are Not Allowed to access this route");
            error.statusCode = 401;
            throw error;
        }

        if(req.body.nurseryEmail || req.body.nurseryPhone || req.body.nurseryOwnerName) {
            const error = new Error("You Are Not Allowed to edit this field");
            error.statusCode = 403;
            throw error;
        }

        const result = await findOneAndUpdate({ user: req.user, _id: req.nursery }, req.body, {
            new: true
        });

        if (!result) {
            const error = new Error("Nursery detail not found.");
            error.statusCode = 404;
            throw error;
        }

        const info = {
            status: true,
            message: "Nursery detail Updated.",
            result
        };

        res.status(200).send(info);
    } catch (error) {
        next(error);
    }
}
