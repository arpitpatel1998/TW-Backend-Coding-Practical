import mongoose from 'mongoose';
export async function connectToDatabase() {
  // TASK-002 Connect to Database.
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('DB connected');
  }).catch((err) => console.log('DB connection Err', err));
}
