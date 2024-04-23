
import mongoose from 'mongoose';

 async function connectToDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/interview');
        console.log('Connect Database Is Successfully!!!');
    } catch (error: any) {
        console.log('Connect to db is failured');
    }
} 

export default connectToDB;