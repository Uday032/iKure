import React, { Component } from 'react'

//Third party components
import Select from 'react-select'


export default class ReactSelect extends Component {
    render() {
        return (
            <Select
                value={this.props.selectedOption}
                onChange={this.props.handleChange}
                options={this.props.options}
            />
        )
    }
}
