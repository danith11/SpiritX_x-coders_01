import mongoose from 'mongoose';
import 'dotenv/config'

const MONGODB_URI = process.env.NEXT_MONGO_URI;
if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined');

let cached = global.mongoose;
if (!cached) cached = global.mongoose = {conn: null, promise: null};

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;