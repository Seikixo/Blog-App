const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        },
    ],
    dislikes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        }
    ]
},{ 
    timestamps: true 
}
);

postSchema.index({ user: 1 });
postSchema.index({ createdAt: -1 });
module.exports = mongoose.model('Post', postSchema);
