const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema ({
    name:String,
    bio: String,
    courses: [{type: Schema.Types.ObjectId, ref:'Courses'}],
    role: {
        type: String,
        enum:['BOSS', 'DEVELOPER', 'TA', 'STUDENT']
    }
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;