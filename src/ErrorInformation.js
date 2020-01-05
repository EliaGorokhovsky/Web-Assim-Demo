import React, { Component } from 'react';
import Select from './Select';

export default class ErrorInformation extends Component {

    render() {
        return (<div>
            Time: 
            <h4 style={{margin: "2px"}}>{this.props.system.time.toFixed(3)}</h4>

            RMSE in <Select 
            options={this.props.system.variables} 
            id="rmseVarSelector" 
            />: <br /> 
            
            <h4 style={{margin: "2px"}}>{document.getElementById("rmseVarSelector") == null? "0e+0" : Number(Math.sqrt(this.props.system.mseVars[document.getElementById("rmseVarSelector").value]).toPrecision(4)).toExponential()}</h4>

            Forecast Error in <Select 
            options={this.props.system.variables} 
            id="obsRmseVarSelector" 
            />: <br /> 
            
            <h4 style={{margin: "2px"}}>{document.getElementById("rmseVarSelector") == null? "0e+0" : Number(Math.sqrt(this.props.system.mseObs[document.getElementById("obsRmseVarSelector").value]).toPrecision(4)).toExponential()}</h4>

            RMSE:
            <h4 style={{margin: "2px"}}>
            { 
                Number(
                Math.sqrt(
                    this.props.system.mseVars.reduce((a, b) => a + b)
                )
                .toPrecision(4)
                )
                .toExponential()
            }
            </h4>

            Forecast Error:
            <h4 style={{margin: "2px"}}>
            {
                Number(
                Math.sqrt(
                    this.props.system.mseObs.reduce((a, b) => a + b)
                )
                .toPrecision(4)
                )
                .toExponential()
            }
            </h4>
        </div>);
    }

}