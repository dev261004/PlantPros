import { Schema, model } from 'mongoose';
import pkg from 'validator';
const { isMobilePhone, isPostalCode } = pkg;  // Correctly import functions


const addressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User Id is required"],
        immutable: true
    },
    name: {
        type: String,
        required: [true, "Person Name in address is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: function (phone) {
                return isMobilePhone(phone, 'en-IN'); // Validate phone number format
            },
            message: "Invalid Phone"
        }
    },
    pinCode: {
        type: String,
        required: [true, "Pin Code is required"],
        validate: {
            validator: function (pinCode) {
                return isPostalCode(pinCode, 'IN'); // Validate Indian postal code
            },
            message: "Invalid Pin Code"
        }
    },
    address: {
        type: String,
        required: [true, "Address Filed is required"]
    },
    landmark: {
        type: String,
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    setAsDefault: {
        type: Boolean,
        default: false
    }
});

export const addressModel = model('Address', addressSchema);
