const router = require('express').Router();
const axios = require('axios');
// var async = require("async"); 

let Location = require('../models/location.model');

function insertlocation(villagelocation) { 
    let locationgeometry = villagelocation.geometry;
        
    var geometrytype =  locationgeometry.type;
    var geometrycoordinates = locationgeometry.coordinates;

    var subdistrict = villagelocation.properties.SUB_DIST;
    var district = villagelocation.properties.DISTRICT;
    var state = villagelocation.properties.STATE;
    var Name = villagelocation.properties.NAME;
    var Code = villagelocation.properties.CEN_2001;
    var type = villagelocation.properties.TYPE;

    const newlocation = new Location({
                                        geometry: {
                                            type: geometrytype, 
                                            coordinates: geometrycoordinates
                                        },
                                        properties: {
                                            location_name: Name, 
                                            village_ward_code_2011: 
                                            Code, state_name_2011: state, 
                                            district_name_2011: district, 
                                            sub_district_name_2011: subdistrict, 
                                            locationEntryType: type
                                        }
                                    });

    newlocation.save()
    .then(() => console.log("Added"))
    .catch(err => res.status(400).json('Error: ' + err));
} 

router.route('/').get((req, res) => {
  Location.find()
    .then(Locations => res.json(Locations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addlocation').get((req, res) => {
    axios.get('https://raw.githubusercontent.com/datameet/indian_village_boundaries/master/or/or1.geojson')
    .then(function (response) {
        // onSuccess(response)
        // let villagelocation =  response.data.features[0];
        for(var i = 0;i<50;i++) {
            console.log(i);
            // insertlocation(response.data.features[i]);
        }
        res.send("Sucess");
    })
    .catch(function (error) {
        console.log(error);
    });
    
});

router.route('/getstate').get((req, res) => {
    Location.distinct("properties.state_name_2011")
        .then(states => res.json(states))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getdistrict').get((req, res) => {
    Location.find({"properties.state_name_2011": req.query.state}).distinct("properties.district_name_2011")
        .then(district => res.json(district))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getsubdistrict').get((req, res) => {
    Location.find(
            {
                "properties.state_name_2011":req.query.state, 
                "properties.district_name_2011": req.query.district
            }).distinct("properties.sub_district_name_2011")
        .then(subdistrict => res.json(subdistrict))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getlocationname').get((req, res) => {
    Location.find(
            {
                "properties.state_name_2011": req.query.state, 
                "properties.district_name_2011": req.query.district,
                "properties.sub_district_name_2011": req.query.subdistrict
            }).distinct("properties.location_name")
        .then(locationsname => res.json(locationsname))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getcoordinates').get((req, res) => {
    Location.find(
            {
                "properties.state_name_2011": req.query.state, 
                "properties.district_name_2011": req.query.district,
                "properties.sub_district_name_2011": req.query.subdistrict,
                "properties.location_name": req.query.location_name
            })
        .then(coordinates => res.json(coordinates))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;