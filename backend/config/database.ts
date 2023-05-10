import mongoose from "mongoose";

const URI: string = process.env.MONGOOSE_URI as string;

mongoose.set('sanitizeFilter', true);

const database = () => {mongoose.connect(URI).then(() => {
    console.log('aein-admin database connected successfully');
})}
export default database;