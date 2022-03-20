const mongoose = require('mongoose');
module.exports = mongoose.model("Stop", new mongoose.Schema({
    id: { type: String, },
    name: { type: String, },
    latitude: { type: String, },
    longitude: { type: String, },
}));