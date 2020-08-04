import { config } from 'dotenv/types';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const connectionString: string = process.env.MONGO_URI
    ? process.env.MONGO_URI
    : "";

    console.log(connectionString);
const mongoConnection = mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(`Database could not connect: ${error}`));

export default mongoConnection;