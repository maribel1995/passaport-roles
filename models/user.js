const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name:String,
    bio: String,
    courses: [{type: Schema.Types.ObjectId, ref:'Course'}],
    role: {
        type: String,
        enum:['BOSS', 'DEVELOPER', 'TA', 'STUDENT']
    },
    picture
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const user = mongoose.model('User', userSchema);
module.exports = user;