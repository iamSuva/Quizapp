const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    option: {
        type: [String],
        required: true,
        
    },
    correct: {
        type: String,
        required: true,
        enum: ['a', 'b', 'c', 'd']
    }
});
const questionModel=new mongoose.model("ques",questionSchema);
module.exports=questionModel;