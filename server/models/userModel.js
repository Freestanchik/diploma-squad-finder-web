import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, "Please add an email"],
        },
        login: {
            type: String,
            unique: true,
            required: [true, "Please add a login"],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
        discordNickname: {
            type: String,
            required: [true, "Please add your Discord nickname"],
        },
        sex: {
            type: String,
            required: [true, "Please add your sex"],
        },
        dateOfBirth: {
            type: Date,
            required: [true, "Please add your date of birth"],
        },
        favouriteGenre: {
            type: String,
            required: [true, "Please add your favourite game genre"],
        },
        additionalInfo: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);



