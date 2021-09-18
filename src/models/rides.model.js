import mongoose from 'mongoose';

const {Schema} = mongoose;

// TASK-004 - Define rides model
const schema = new Schema(
    {
      start: {
        lat: Number,
        long: Number,
      },
      end: {
        lat: Number,
        long: Number,
      },
      driver: {
        name: {
          type: String,
          default: '',
        },
        vehicleNumber: {
          type: String,
          default: '',
        },
        vehicleType: {
          type: String,
          enum: ['CAR', 'BIKE'],
        },
      },
      customers: [
        {
          name: String,
        },
      ],
    },
    {
      timestamps: true,
    },
);

export const Ride = mongoose.model('rides', schema, 'rides');
