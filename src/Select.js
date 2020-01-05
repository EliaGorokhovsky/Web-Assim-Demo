import React, { Component } from 'react';

export default class Select extends Component {

    render() {
        return(
        <select id={this.props.id} onChange={this.props.onChange}>
            {
                this.props.options.map(option => 
                    <option value={option.value}>{option.name}</option>
                )
            }
        </select>
        );
    }

}