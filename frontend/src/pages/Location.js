import React, { Component } from 'react'

//Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Components
import ReactSelect from '../components/ReactSelect'

//axios api
import instance from '../axios';

//third party libraries
import { MapContainer, TileLayer, Polygon, GeoJSON } from 'react-leaflet'

const center = [85.324, 20.267]

const purpleOptions = { color: 'purple' }

export default class Location extends Component {

    constructor(){
        super();
        this.state = {
            selectedstate: '',
            selecteddistrict: '',
            selectedsub_district: '',
            selectedvillage_name: '',
            showdistrict: 0,
            showsub_district: 0,
            showvillage_name: 0,
            state: [],
            district: [],
            sub_district: [],
            village_name: [],
            village_coordinates: [],
            geometrytype: '',
            villageid: ''
        };
    }

    componentDidMount(){

        let stateurl = '/maps/getstate'
        instance.get(stateurl)
            .then(response => {
                console.log(response.data);
                this.setState({
                    state: response.data.map(function(states){
                        return {
                            value: states,
                            label: states
                        }
                    })
                })
            })
    }

    handlestateChange = selectedstate => {
        this.setState({ selectedstate });
        let districturl = "maps/getdistrict?state="+selectedstate.value;
        // console.log(districturl);
        instance.get(districturl)
            .then(response => {
                console.log(response.data);
                this.setState({
                    district: response.data.map(function(states){
                        return {
                            value: states,
                            label: states
                        }
                    }),
                    showdistrict: 1
                })
            })
        // console.log(this.state.showdistrict+" "+selectedstate);
    };

    handledistrictChange = selecteddistrict => {
        this.setState({ selecteddistrict });
        let subdistricturl = "maps/getsubdistrict?state="+this.state.selectedstate.value+"&district="+selecteddistrict.value;
        instance.get(subdistricturl)
            .then(response => {
                console.log(response.data);
                this.setState({
                    sub_district: response.data.map(function(states){
                        return {
                            value: states,
                            label: states
                        }
                    }),
                    showsub_district: 1
                })
            })
        // console.log(`Option selected:`, selecteddistrict);
    };

    handlesub_districtChange = selectedsub_district => {
        this.setState({ selectedsub_district });
        let villagenameurl = "maps/getlocationname?state="+this.state.selectedstate.value+"&district="+this.state.selecteddistrict.value+
                            "&subdistrict="+selectedsub_district.value;
        instance.get(villagenameurl)
            .then(response => {
                console.log(response.data);
                this.setState({
                    village_name: response.data.map(function(states){
                        return {
                            value: states,
                            label: states
                        }
                    }),
                    showvillage_name: 1
                })
            })
        // console.log(`Option selected:`, selectedsub_district);
    };

    handlevillage_nameChange = selectedvillage_name => {
        this.setState({ selectedvillage_name });
        let coordinates = "maps/getcoordinates?state="+this.state.selectedstate.value+"&district="+this.state.selecteddistrict.value+
                            "&subdistrict="+this.state.selectedsub_district.value+"&location_name="+selectedvillage_name.value;
        instance.get(coordinates)
            .then(response => {
                console.log(response.data);
                this.setState({
                    village_coordinates: response.data[0].geometry.coordinates,
                    geometrytype: response.data[0].geometry.type,
                    villageid: response.data[0].properties.village_ward_code_2011
                })
            })
        console.log(this.state.village_coordinates);
        // console.log(`Option selected:`, selectedvillage_name);
    };


    render() {
        return (
            <section>
                <Container>
                    <Row>
                        <Col md="4">
                            <div className="mb-3">
                                <p>Select State: </p>
                                <ReactSelect
                                    selectedOption = {this.state.selectedstate}
                                    handleChange={this.handlestateChange}
                                    options = {this.state.state}
                                />
                            </div>
                            
                            <div className="mb-3" style={{ display: this.state.showdistrict ? "block" : "none" }}>
                                <p>Select District: </p>
                                <ReactSelect
                                    selectedOption = {this.state.selecteddistrict}
                                    handleChange={this.handledistrictChange}
                                    options = {this.state.district}
                                />
                            </div>

                            <div className="mb-3" style={{ display: this.state.showsub_district ? "block" : "none" }}>
                                <p>Select Sub District: </p>
                                <ReactSelect
                                    selectedOption = {this.state.selectedsub_district}
                                    handleChange={this.handlesub_districtChange}
                                    options = {this.state.sub_district}
                                />
                            </div>

                            <div className="mb-3" style={{ display: this.state.showvillage_name ? "block" : "none" }}>
                                <p>Select Village Name: </p>
                                <ReactSelect
                                    selectedOption = {this.state.selectedvillage_name}
                                    handleChange={this.handlevillage_nameChange}
                                    options = {this.state.village_name}
                                />
                            </div>

                            {this.state.geometrytype}
                            <div className="mb-3 col-md-3" style={{ display: this.state.showvillage_name ? "block" : "none" }}>
                                Coordinates: Please check console to see coordinates
                            </div>
                        </Col>
                        <Col md="8">
                            {/* <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <GeoJSON
                                    attribution="Capa de Hospitales de ESRI"
                                    data={coords}
                                />

                            </MapContainer> */}
                            {/* <MapContainer center={center} zoom={13}>
                                <FeatureGroup>
                                     <GeoJSON data={coords} style={this.myStyle}></GeoJSON>
                                </FeatureGroup>
                            </MapContainer> */}

                            <MapContainer zoom={13} center={center} scrollWheelZoom={true}>
                                <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {/* <FeatureGroup> */}
                                     <GeoJSON data={this.state.village_coordinates} style={this.myStyle}></GeoJSON>
                                {/* </FeatureGroup> */}
                                <Polygon pathOptions={purpleOptions} positions={this.state.village_coordinates} />
                            </MapContainer>
                            {/* {this.state.village_coordinates} */}
                            {console.log(this.state.village_coordinates)}
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}
