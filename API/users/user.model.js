
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const ROLES={
    USER: 101,
    STUDENT: 102,
    TEACHER: 103,
    RESOURCE_MANAGER: 104,
    SUB_ADMIN: 105,
    ADMIN: 106
}
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    roles: {
        type: [String],
        default: [ROLES.USER],
        enum: Object.values(ROLES)
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    picture: String,
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});
// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.validatePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error;
    }
}


// format data if needed
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // custom field replace _id from id
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password

    }
})

const User = mongoose.model('User', userSchema);
export default User;
