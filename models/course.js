const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema ({
    title: String,
    description: String,
    level: String,
    hours: String,
    price: String,
    image: String,
    users: [{type: Schema.Types.ObjectId, ref:'User'}],
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const course = mongoose.model('Course', courseSchema);
module.exports = course;