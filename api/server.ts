import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

//MongoDB Connection
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

const app: express.Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

//Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.get('/public', express.static('public'));

//User API router
app.use("/api", userRouter);

//Listen to port
app.listen(port, () => {
    console.log(`Listening app in port ${port}`);
});
