import mongoose from 'mongoose';

const stationSchema = mongoose.Schema(
    {
        title:  {
            type: String,
            required: true,
        },
        stationType: { 
            type: [String],
            required: [true, "Atleast one station type is required."],
            enum: ["train", "bus", "metro", "tram"],
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