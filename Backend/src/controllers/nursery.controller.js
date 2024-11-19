import mongoose from 'mongoose';
import Nursery from '../models/nursery.model.js';
import {User} from '../models/user.model.js';




export async function createNurseryProfile(req, res, next) {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        //console.log(req.body )
        // Validate unique email
        const existingNursery = await Nursery.findOne({ email: req.body.email });
        if (existingNursery) {
            return res.status(400).json({
                message: "A nursery with this email already exists. Please use a different email.",
            });
        }
       

        const newNursery = new Nursery({
            ...req.body,
            user: req.user._id,
        });

        await newNursery.save({ session });

        const updateUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { role: 'seller' },
                $set: { nursery: newNursery._id },
            },
            { new: true, session }
        );

        if (!updateUser || !updateUser.role.includes('seller')) {
            throw new Error("Nursery Listing Failure");
        }

        await session.commitTransaction();
        res.status(200).json({ status: true, message: "Nursery Listed Successfully", result: newNursery });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
}

export async function getNurseryDetail(req, res, next) {
    try {
        // Ensure the user has the 'seller' role and has a nursery profile
        // console.log("req.role : ",req.role);
        // if (!req.role.includes('seller')) {
        //     return res.status(403).json({ status: false, message: "You are not authorized to view this information" });
        // }

        // Fetch nursery details for the authenticated user
        const nursery = await Nursery.findById(req.params.id).populate('user')
        //const nursery = await Nursery.findOne({ user: req.user._id }).select('-__v');

        if (!nursery) {
            return res.status(404).json({ status: false, message: "Nursery detail not found" });
        }

        res.status(200).json({ status: true, message: "Nursery details retrieved successfully", result: nursery });
    } catch (error) {
        next(error);  // Pass error to the next middleware
    }
}


export async function updateNurseryDetail(req, res, next) {
    try {
        // Check if user has permission to update the nursery details
        if (!req.nursery || !req.role.includes('seller')) {
            return res.status(401).json({ status: false, message: "You Are Not Allowed to access this route" });
        }

        // Restrict specific fields from being updated
        const restrictedFields = ['email', 'phone', 'name'];
        for (const field of restrictedFields) {
            if (req.body[field]) {
                return res.status(403).json({ status: false, message: `Editing ${field} is not allowed` });
            }
        }

        // Update the nursery profile
        const updatedNursery = await Nursery.findOneAndUpdate(
            { user: req.user._id, _id: req.nursery },
            req.body,
            { new: true }
        );

        if (!updatedNursery) {
            return res.status(404).json({ status: false, message: "Nursery detail not found" });
        }

        res.status(200).json({ status: true, message: "Nursery detail updated", result: updatedNursery });
    } catch (error) {
        next(error);
    }
}


// Controller function to check if the email exists in the database
const verifyNurseryEmail = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email, and check if the user has a nursery
        const user = await User.findOne({ email });

        if (user && user.nursery) {
            return res.status(200).json({
                success: true,
                exists: true, // Nursery exists for this email
            });
        }

        return res.status(200).json({
            success: true,
            exists: false, // Nursery does not exist for this email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error',
        });
    }
};

export { verifyNurseryEmail };
