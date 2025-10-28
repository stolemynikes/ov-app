import express from 'express';

const router = express.Router();

//import model

import { Station } from '../models/stationsModel.js';

router.post('/', async (req, res) => {
    try {

        const {title, stationType, elevatorAccessible, wheelChairAccessible} = req.body;    

        if (
            title === undefined ||
            stationType === undefined ||
            elevatorAccessible === undefined ||
            wheelChairAccessible === undefined
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, stationTYpe, elevatorAccessible, wheelChairAccessible',
            });
        }

        const stationTypeArray = Array.isArray(stationType) ? stationType : [stationType];

        const newStation = {
            title,
            stationType: stationTypeArray,
            elevatorAccessible,
            wheelChairAccessible,
        };

        const stations = await Station.create(newStation);
        return res.status(201).send(stations);

    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

//get all stations

router.get('/', async (req, res) => {
    try {
        const stations = await Station.find({})

        return res.status(200).json({
            count: stations.length,
            data: stations
        });
    } catch (error) {
        console.log(error.message);
        res.status(500);
    }
})

export default router;