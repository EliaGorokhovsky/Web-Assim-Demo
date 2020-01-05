import React, { Component } from 'react';
import Select from './Select';
import Lorenz63Form from './Lorenz63Form';
import LogisticMapForm from './LogisticMapForm';

export default class AssimForm extends Component {

    state = {
        assimilator: null,
        ensembleSize: 0,
        knownError: []
    }

    render() {
        return (
            <div>
                Known error in <Select 
                    options={this.props.system.variables} 
                    id="knownErrorVarSelector" 
                    onChange={() => 
                    document.getElementById("knownErrorVarEditor").value = this.props.system.knownObservationError[document.getElementById("knownErrorVarSelector").value]
                    }
                />: <input
                    type="number"
                    min={0}
                    step={0.01}
                    precision={4}
                    onBlur={() => 
                    this.props.system.knownObservationError[document.getElementById("knownErrorVarSelector").value] = document.getElementById("knownErrorVarEditor").value
                    }
                    id="knownErrorVarEditor"
                    style={{
                    width: 3 + "rem"
                    }}
                /> 
            </div>
        );
    }

}