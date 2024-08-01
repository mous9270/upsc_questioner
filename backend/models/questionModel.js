import mongoose from "mongoose"


const questionSchema = mongoose.Schema(
    {
        question:{type: String, required: true},
        answer:{type: String, required: true},
        publishYear:{type: Number, required: true}
    },
    {
        timestamps: true
    }
);

export const Question = mongoose.model('questions', questionSchema)
