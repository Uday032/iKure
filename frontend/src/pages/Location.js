import React, { Component } from 'react'

//Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Components
import ReactSelect from '../components/ReactSelect'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default class Location extends Component {

    state = {
        selectedOption: null,
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
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
                                    selectedOption = {this.state.selectedOption}
                                    handleChange={this.handleChange}
                                    options = {options}
                                />
                            </div>

                            <div className="mb-3">
                                <p>Select District: </p>
                                <ReactSelect
                                    selectedOption = {this.state.selectedOption}
                                    handleChange={this.handleChange}
                                    options = {options}
                                />
                            </div>

                            <div className="mb-3">
                                <p>Select Sub District: </p>
                                <ReactSelect
                                    selectedOption = {this.state.selectedOption}
                                    handleChange={this.handleChange}
                                    options = {options}
                                />
                            </div>

                            <div className="mb-3">
                                <p>Select Village Name: </p>
                                <ReactSelect
                                    selectedOption = {this.state.selectedOption}
                                    handleChange={this.handleChange}
                                    options = {options}
                                />
                            </div>

                            
                        </Col>
                        <Col md="8">
                            Map
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}
