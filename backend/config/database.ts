import mongoose from "mongoose";

const URI = 'mongodb://localhost:27017/aein-admin';

mongoose.set('sanitizeFilter', true);

const database = () => {mongoose.connect(URI).then(() => {
    console.log('aein-admin database connected successfully');
})}
export default database;