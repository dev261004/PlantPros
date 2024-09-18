import {addressModel} from '../models/address.model.js'; // Ensure correct model import
import mongoose from "mongoose";

export async function addAddress(req, res, next) {
    const session = await mongoose.startSession();  // Corrected session initiation
    try {
        session.startTransaction(); //^ Transaction Started 
        console.log(req.body);  
        //? Remove the default shipping address and set new default shipping address
        if (req.body.setAsDefault) {
            await addressModel.updateMany({ user: req.user, setAsDefault: true }, {
                $set: { setAsDefault: false }
            }, { session });
        }

        //* Add new address
        const newAddress = new addressModel(req.body);
        await newAddress.save({ session });
        await session.commitTransaction(); //* Commit transaction

        const info = {
            status: true,
            message: "New Address Added Successfully",
            result: newAddress
        };
        res.status(200).send(info);

    } catch (error) {
        await session.abortTransaction(); //! Abort transaction
        next(error);
    } finally {
        session.endSession(); //& Close session
    }
}

export async function getAddressList(req, res, next) {
    try {
        //* Get: List of addresses
        const result = await addressModel.find({ user: req.user });

        //! Address not found
        if (!result || result.length === 0) {
            const error = new Error("No Address Found.");
            error.statusCode = 404;
            throw error;
        }

        //* Sort result so that the default address is at index 0
        result.sort((a, b) => (a.setAsDefault ? -1 : b.setAsDefault ? 1 : 0));

        const info = {
            status: true,
            message: "List of addresses",
            result
        };
        res.status(200).send(info);

    } catch (error) {
        next(error);
    }
}

export async function getAddressById(req, res, next) {
    try {
        //* Get: Address by ID
        const address = await addressModel.findOne({ _id: req.params.id, user: req.user });

        //! Address not found
        if (!address) {
            const error = new Error("Address not found");
            error.statusCode = 404;
            throw error;
        }

        const info = {
            status: true,
            message: "Address retrieved successfully",
            result: address
        };

        res.status(200).send(info);

    } catch (error) {
        next(error);
    }
}

export async function updateAddress(req, res, next) {
    const session = await mongoose.startSession();  // Corrected session initiation

    try {
        session.startTransaction(); //^ Transaction Started

        if (req.body.setAsDefault === true) {
            await addressModel.updateMany({ user: req.user, setAsDefault: true }, {
                $set: { setAsDefault: false }
            }, { session });
        }

        //* Update: Address
        const result = await addressModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            session
        });

        //! Address not found
        if (!result) {
            const error = new Error("Address not found");
            error.statusCode = 404;
            throw error;
        }

        await session.commitTransaction(); //* Transaction committed
        const info = {
            status: true,
            message: "Address updated successfully",
            result
        };

        res.status(200).send(info);

    } catch (error) {
        await session.abortTransaction(); //! Transaction Aborted
        next(error);
    } finally {
        session.endSession(); //& Session Closed
    }
}

export async function deleteAddress(req, res, next) {
    try {
        //* Delete address
        const result = await addressModel.findByIdAndDelete(req.params.id);

        //! Address not found
        if (!result) {
            const error = new Error("Address not found");
            error.statusCode = 404;
            throw error;
        }

        const info = {
            status: true,
            message: "Address deleted successfully",
            result
        };
        res.status(200).send(info);
    } catch (error) {
        next(error);
    }
}

export async function getDefaultAddress(req, res, next) {
    try {
        //* Get all addresses
        const addresses = await addressModel.find({ user: req.user });

        //! Address not found
        if (!addresses || addresses.length === 0) {
            const error = new Error("Address not found");
            error.statusCode = 404;
            throw error;
        }

        //* Find default address
        const defaultAddress = addresses.find(address => address.setAsDefault === true);

        const info = {
            status: true,
            message: "Default or last used address.",
            result: defaultAddress ? defaultAddress : addresses[addresses.length - 1] || [] //* If default address is present, else recent address
        };

        res.status(200).send(info);

    } catch (error) {
        next(error);
    }
}
