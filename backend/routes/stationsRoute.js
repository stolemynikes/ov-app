import express from 'express';

const router = express.Router();

//import model

import { Station } from '../models/stationsModel.js';

router.post('/', async (req, res) => {
    try {
        if (
            req.body.title === undefined ||
            req.body.stationType === undefined ||
            req.body.elevatorAccessible === undefined ||
            req.body.wheelChairAccessible === undefined
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, stationTYpe, elevatorAccessible, wheelChairAccessible',
            });
        }

        const newStation = {
            title: req.body.title,
            stationType: req.body.stationType,
            elevatorAccessible: req.body.elevatorAccessible,
            wheelChairAccessible: req.body.wheelChairAccessible,
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