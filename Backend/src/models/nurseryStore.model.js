import { Schema, model } from 'mongoose';

const nurseryStoreSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "user",
        required: [true, "User Id is required."],
        immutable: true
    },
    nursery: {
        type: Schema.ObjectId,
        ref: "nursery",
        required: [true, "Nursery Id is required."],
        immutable: true
    },
    tabName: {
        type: String,
        required: [true, "Tab Name is required."]
    },
    status: {
        type: String,
        required: [true, "Status is required."],
        default: "draft"
    },
    renders: [
        {
            templateId: {
                type: String,
                required: [true, "Template Id is required."]
            },
            href: {
                type: String,
                required: [true, "href is required."]
            },
            images: [
                {
                    public_id: {
                        type: String,
                        default: ""
                    },
                    url: {
                        type: String,
                        default: ""
                    }
                }
            ]
        }
    ]
});

const nurseryStores = new model('nurseryStore', nurseryStoreSchema);

export default nurseryStores;