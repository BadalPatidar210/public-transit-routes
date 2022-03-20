const mongoose = require('mongoose');

module.exports = mongoose.model("Route", new mongoose.Schema({
    name: { type: String, },
    direction: { type: String, },
    id: { type: String, },
    status: { type: String, },
    stops: { type: Array, }
}));