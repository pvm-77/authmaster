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


const User = mongoose.model('User', userSchema);
export default User;
