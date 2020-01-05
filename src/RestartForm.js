import React, { Component } from 'react';
import Select from './Select';
import Lorenz63Form from './Lorenz63Form';
import LogisticMapForm from './LogisticMapForm';

export default class RestartForm extends Component {

    state = {
        system: null,
        systemForm: -1
    }

    render() {
        return (
            <div>
            <Select 
                id="systemSelect"
                onChange={() => {
                    this.setState({
                        systemForm: document.getElementById("systemSelect").value
                    });
                }}
                options={[
                    {value:-1, name:"select a model"},
                    {value:0, name:"Lorenz '63"},
                    {value:1, name:"Logistic Map"}
                ]}
            /> <br />
            {
                [
                    <Lorenz63Form onSubmit={(state) => this.props.onSubmit(state)}/>, 
                    <LogisticMapForm onSubmit={(state) => this.props.onSubmit(state)}/>
                ]
                [this.state.systemForm]
            }
            </div>
        );
    }

}