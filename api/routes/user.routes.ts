import express, { Express, Router } from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import User, { UserModel } from '../models/User';

const userRouter: express.IRouter = express.Router();
const dir: string = `./public/images`;
console.log(dir);

//Setup storage directory for the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, `${uuidv4()}-${filename}`);
    }
});

//Set multer file filter
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only png, jpg or jpeg formats allowed!'));
        }
    }
});

// POST: /api/upload
// Send the images
userRouter.post('/upload', upload.array('imgCollection', 6) , (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`;
    
    const getBodyFileName = (file: Express.Multer.File): string => file.filename;

    //TODO: Check how to remove the any, map can be bugged for not be able to make sure the array will be always a Multer File
    const reqFiles: string[] = (req.files as any[]).map(getBodyFileName);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        imgCollection: reqFiles
    });

    user.save().then(result => {
        res.status(200).json({
            message: "Done Upload!",
            userCreated: {
                _id: result._id,
                imgCollection: result.imgCollection
            }
        })
    }).catch(error => {
        console.error(error);
        res.send(500).json({
            error: 'Problem with Database'
        });
    });
});

// GET: /api
//Get the images for all the users
userRouter.get('/', (req, res) => {
    User.find().then(data => {
        res.status(200).json({
            message: "Users list",
            data: data
        });
    }).catch(error => {
        console.log(error);
        res.send(500).json({
            error: `Something went wrong: ${error}`
        });
    });
})

export default userRouter;