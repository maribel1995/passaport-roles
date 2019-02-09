const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name:String,
    bio: String,
    email: {type:String, unique:true },
    password: String,
    facebookId: String,
    courses: [{type: Schema.Types.ObjectId, ref:'Course'}],
    role: {
        type: String,
        enum:['BOSS', 'DEVELOPER', 'TA', 'STUDENT']
    },
    picture: String
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const user = mongoose.model('User', userSchema);
module.exports = user;