import { model, Schema } from "mongoose";
import mongoose from 'mongoose';

const comicSchema = new  mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    description:{
        type: String,
        require:true
    },
    price:{
        type: Number,
        require:true
    },  
    pageCount:{
        type: Number
    },
    rating:{
        type: Number,
        default: 3
    },
    image:{
        type:String
    },
    language:{
        type: String
    },
    numReviews:{
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        default: 0
    },
    reviews:[{type: mongoose.Schema.Types.ObjectId,ref:"Review",}]
},{
    timestamps: false,
    versionKey:false
})

export default model('Comic', comicSchema);