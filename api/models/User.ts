import { Schema, Document, Model, model } from 'mongoose';

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    imgCollection: {
        type: Array
    }
});

export interface UserModel extends Document {
    _id: string,
    imgCollection: string[];
}

const User: Model<UserModel> = model('user', UserSchema);

export default User;