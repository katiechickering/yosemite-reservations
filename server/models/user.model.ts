import mongoose, { Schema, model, Document, Types } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id: Types.ObjectId;
    userName: string;
    password: string;
    confirmPassword?: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

interface IUserMethods {
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser, {}, IUserMethods>({
    userName: {
        type: String,
        required: [true, 'User name is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, `Passwords must be at least eight characters long, though 20 would be better.`]
    }
}, { timestamps: true });

userSchema.virtual('confirmPassword')
    .get(function (this: any) {
        return this._confirmPassword;
    })
    .set(function (this: any, value: string) {
        this._confirmPassword = value;
    });

userSchema.pre('validate', function (this: any, next) {
    if (this.isModified('password') && this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match');
    }
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = model<IUser, mongoose.Model<IUser, {}, IUserMethods>>('User', userSchema);

export default User;
