import mongoose from 'mongoose';

const stationSchema = mongoose.Schema(
    {
        title:  {
            type: String,
            required: true,
        },
        stationType: { 
            type: String,
            required: true,
        },
        elevatorAccessible: { 
            type: Boolean,
            required: true,
        },
        wheelChairAccessible: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Station = mongoose.model('Station', stationSchema);