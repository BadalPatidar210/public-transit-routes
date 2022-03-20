
const express = require('express');
const StopModel = require('./models/stop')
const RouteModel = require('./models/route')

const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
// const { useJsApiLoader } = require('@react-google-maps/api');

const COMMON = {
    PORT: 9010,
    MONGO_URL: 'mongodb+srv://badal:badal@cluster0.8qdyv.mongodb.net/chaloDb?retryWrites=true&w=majority',
}

//middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//db
mongoose.connect(COMMON.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => console.log("\n****\nMongoDB connected\n****\n")).catch((error) => console.log(error));

//apis
app.get("/api/v1/stops", (req, res) => {
    StopModel.find().then((data) => {
        res.send(data)
    });
})

app.get("/api/v1/routes", (req, res) => {
    RouteModel.find().then((data) => {
        res.send(data)
    });
})

app.post("/api/v1/stop/create", (request, response) => {
    const stopDTO = request.body;
    const tempStop = new StopModel({
        id: `stop-${Date.now()}`,
        name: stopDTO.name,
        latitude: stopDTO.latitude,
        longitude: stopDTO.longitude
    });
    tempStop.save().then((data) => {
        response.status(200).send(data)
    }).catch((err) => {
        console.log('Error while saving data', stopDTO, err);
    })
})

app.post("/api/v1/route/create", async (req, res) => {
    const routeDTO = req.body;
    const isEdit = req.query.isEdit ? true : false;
    if (isEdit) {
        const filter = { id: routeDTO.id }
        RouteModel.updateOne(filter, { ...routeDTO }).then((data) => {
            res.send(data);
        }).catch((err) => {
            console.log('Error while updating data', routeDTO, err);
        })
        return;
    } else {
        const tempRoute = new RouteModel({
            id: `route-${Date.now()}`,
            name: routeDTO.name,
            status: routeDTO.status,
            direction: routeDTO.direction,
            stops: routeDTO.stops,
        });
        tempRoute.save().then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log('Error while saving data', routeDTO, err);
        })
    }
})


app.delete("/api/v1/route/delete/:id", (req, res) => {
    const id = req.params;
    RouteModel.deleteOne(id).then((data) => res.status(200).send({ data, status: "Success" }))
        .catch((err) => {
            console.log('Error while delete data', err);
        })
})

app.listen(COMMON.PORT, () => console.log(`Dev Server is running on port: ${COMMON.PORT}`));