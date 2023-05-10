import mongoose from "mongoose";
const URI = process.env.MONGOOSE_URI;
mongoose.set('sanitizeFilter', true);
const database = () => {
    mongoose.connect(URI).then(() => {
        console.log('aein-admin database connected successfully');
    });
};
export default database;
