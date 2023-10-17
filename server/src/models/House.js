import { Schema } from "mongoose";

export const HouseSchema = new Schema({
    bedrooms: { type: Number, required: true, min: 1, max: 30 },
    bathrooms: { type: Number, required: true, min: 1, max: 20 },
    year: { type: Number, required: true, min: 1800, max: 2024 },
    price: { type: Number, required: true, min: 0, max: 8000000 },
    imgUrl: { type: String, required: true, minLength: 20, maxLength: 500, default: '//placehold.it/300x300' },
    description: { type: String, minLength: 3, maxLength: 500 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
}

)

