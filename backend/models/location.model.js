const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({

    geometry: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
        },

        coordinates: [[[
            Number
        ]]]

    },

    properties: {
        location_name: {type: "string"},
        village_ward_code_2011: { type: "string" },
        state_name_2011: { type: "string" },
        district_name_2011: { type: "string" },
        sub_district_name_2011: { type: "string" },
        locationEntryType: {
            type: String,
            enum: ["Village", "Panchayat", "Ward", "Municipality", "Block", "Taluka"] 
        },
        country: { type: "string", default: "India" },
    },

    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = Location = mongoose.model("locations", LocationSchema);