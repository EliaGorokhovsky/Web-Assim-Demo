import React, { Component } from 'react';
import Select from './Select';

export default class ObsForm extends Component {

    render() {
        return (
            <div>
               Observation Frequency: <input 
                    type="number" 
                    min={0.1} 
                    step={0.1} 
                    precision={3} 
                    onBlur={() => 
                    this.props.app.setState({
                        observationFrequency: Number(document.getElementById("obsFrequencyInput").value)
                    })} 
                    id="obsFrequencyInput" 
                    style={{
                    width: 3 + "rem"
                    }}
                />
                <br />
                Error in <Select 
                    options={this.props.app.state.system.variables} 
                    id="errorVarSelector" 
                    onChange={() => 
                    document.getElementById("errorVarEditor").value = this.props.app.state.system.observationError[document.getElementById("errorVarSelector").value]
                    }
                />: <input
                    type="number"
                    min={0}
                    step={0.01}
                    precision={4}
                    onBlur={() => 
                    this.props.app.state.system.observationError[document.getElementById("errorVarSelector").value] = document.getElementById("errorVarEditor").value
                    }
                    id="errorVarEditor"
                    style={{
                    width: 3 + "rem"
                    }}
                /> <br />
            </div>
        );
    }

}