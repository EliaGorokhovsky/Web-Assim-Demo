import React, { Component } from 'react';
import Select from './Select';

export default class Lorenz63Form extends Component {

    state = {
        model: "l63",
        rho: 28,
        sigma: 10,
        beta: 2.66667,
        initialPosition: [1, 1, 1],
        varToReport: 0
    }

    componentDidMount() {
        document.getElementById("lorenzRhoInput").value = this.state.rho;
        document.getElementById("lorenzSigmaInput").value = this.state.sigma;
        document.getElementById("lorenzBetaInput").value = this.state.beta;
        document.getElementById("lorenzInitialInputX").value = this.state.initialPosition[0];
        document.getElementById("lorenzInitialInputY").value = this.state.initialPosition[1];
        document.getElementById("lorenzInitialInputZ").value = this.state.initialPosition[2];
    }

    render() {
        return (
            <div>
                Rho: <input 
                    type="number"
                    onBlur={() => {
                        this.setState({
                            rho: Number(document.getElementById("lorenzRhoInput").value)
                        });
                    }}
                    id="lorenzRhoInput" 
                    style={{
                        width: 3 + "rem"
                    }}
                />
                Sigma: <input 
                    type="number"
                    onBlur={() => {
                        this.setState({
                            sigma: Number(document.getElementById("lorenzSigmaInput").value)
                        });
                    }}
                    id="lorenzSigmaInput"  
                    style={{
                        width: 3 + "rem"
                    }}
                />
                Beta: <input 
                    type="number" 
                    onBlur={() => {
                        this.setState({
                            beta: Number(document.getElementById("lorenzBetaInput").value)
                        });
                    }}
                    id="lorenzBetaInput" 
                    style={{
                        width: 3 + "rem"
                    }}
                /> 
                <br />
                Initial position: (
                    <input 
                        type="number" 
                        onBlur={() => {
                            this.setState({
                                initialPosition: [
                                    Number(document.getElementById("lorenzInitialInputX").value),
                                    this.state.initialPosition[1],
                                    this.state.initialPosition[2]
                                ]
                            });
                        }}
                        id="lorenzInitialInputX"
                        style={{
                            width: 2 + "rem"
                        }}
                    />,
                    <input 
                        type="number" 
                        onBlur={() => {
                            this.setState({
                                initialPosition: [
                                    this.state.initialPosition[0],
                                    Number(document.getElementById("lorenzInitialInputY").value),
                                    this.state.initialPosition[2]
                                ]
                            });
                        }}
                        id="lorenzInitialInputY"
                        style={{
                            width: 2 + "rem"
                        }}
                    />,
                    <input 
                        type="number" 
                        onBlur={() => {
                            this.setState({
                                initialPosition: [
                                    this.state.initialPosition[0],
                                    this.state.initialPosition[1],
                                    Number(document.getElementById("lorenzInitialInputZ").value)
                                ]
                            });
                        }}
                        id="lorenzInitialInputZ"
                        style={{
                            width: 2 + "rem"
                        }}
                    />
                ) <br />
                Variable to report: <Select
                    options={[
                        {name:"x", value:0},
                        {name:"y", value:1},
                        {name:"z", value:2}
                    ]}
                    id="lorenzVarSelector"
                    onChange={() => {
                        this.setState({
                            varToReport: document.getElementById("lorenzVarSelector").value
                        });
                    }}
                /> <br />
            <button onClick={() => {this.props.onSubmit(this.state)}}>Restart!</button>
            </div>
        );
    }

}