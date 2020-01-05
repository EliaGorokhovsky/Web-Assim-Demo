import React, { Component } from 'react';
import Select from './Select';

export default class LogisticMapForm extends Component {

    state = {
        model: "lmap",
        r: 3.5,
        initialPosition: 0.7,
    }

    componentDidMount() {
        document.getElementById("lmapParamInput").value = this.state.r;
        document.getElementById("lmapInitialInput").value = this.state.initialPosition;
    }

    render() {
        return (
            <div>
                Parameter: <input 
                    type="number" 
                    onBlur={() => {
                        this.setState({
                            r: Number(document.getElementById("lmapParamInput").value)
                        });
                    }}
                    id="lmapParamInput" 
                    style={{
                        width: 3 + "rem"
                    }}
                /> <br /> 
                Initial position: <input 
                    type="number" 
                    onBlur={() => {
                        this.setState({
                            initialPosition: Number(document.getElementById("lmapInitialInput").value)
                        });
                    }}   
                    placeholder={this.state.initialPosition}                     
                    id="lmapInitialInput"
                    style={{
                        width: 3 + "rem"
                    }}
                /> <br />
            <button onClick={() => {this.props.onSubmit(this.state)}}>Restart!</button>
            </div>
        );
    }

}