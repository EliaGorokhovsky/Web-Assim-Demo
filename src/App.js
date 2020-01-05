import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './Graph';
import System from './logic/functions/System';
import LogisticMap from './logic/functions/LogisticMap';
import Lorenz63 from './logic/functions/Lorenz63';
import { EAKF } from './logic/assimilation/EAKF';
import { TestAssim } from './logic/assimilation/TestAssim';
import Select from './Select';
import RestartForm from './RestartForm';
import ObsForm from './ObsForm';
import AssimForm from './AssimForm';
import ErrorInformation from './ErrorInformation';
import Test from './logic/functions/Test';

class App extends Component {

  state = {
    system: new Lorenz63(28, 8/3, 10, [1, 1, 1], 0),
    stylePath: "./App.css",
    assimilator: EAKF,
    truth: [],
    ensembles: [],
    observations: [],
    observationFrequency: 1,
    timeDilation: 1,
    timescale: [-10, 5],
    domain: [0, 1],
    pause: true,
    observing: false,
    assimilating: false
  }

  componentDidMount() {
    document.getElementById("timestepInput").value = this.state.system.dt;
    document.getElementById("obsFrequencyInput").value = this.state.observationFrequency;
    document.getElementById("errorVarEditor").value = this.state.system.observationError[document.getElementById("errorVarSelector").value]
    document.getElementById("knownErrorVarEditor").value = this.state.system.observationError[document.getElementById("knownErrorVarSelector").value]
    setInterval(() => {
      if (!this.state.pause) {
        this.state.system.timestep();
        let observations = this.state.observations;
        if (this.state.system.time % this.state.observationFrequency < this.state.system.dt && this.state.observing) {
          let observation = this.state.system.observe(this.state.observationError);
          observations.push({
            time: observation.time, 
            state: observation.state[this.state.system.varToReport]
          });
          this.state.system.updateObsRMSE();
          if (this.state.assimilating) {
            this.state.system.ensemble = this.state.assimilator(this.state.system.ensemble, observation.state, this.state.system.knownObservationError);
          }
        }
        observations = observations.filter(a => (a.time - this.state.timescale[0]) * (this.state.timescale[1] - a.time) > 0);
        let truth = [...this.state.truth, this.state.system.getPoint()].filter(a => (a.time - this.state.timescale[0]) * (this.state.timescale[1] - a.time) > 0);
        let ensembles = [...this.state.ensembles, this.state.system.getEnsemble()].filter(a => (a.time - this.state.timescale[0]) * (this.state.timescale[1] - a.time) > 0);
        let domain = this.state.domain;
        if (truth[truth.length - 1].state < this.state.domain[0]) {
          domain[0] = truth[truth.length - 1].state;
        } else if (truth[truth.length - 1].state > this.state.domain[1]) {
          domain[1] = truth[truth.length - 1].state;
        }
        this.setState({
          observations,
          truth,
          ensembles,
          timescale: [this.state.timescale[0] + this.state.system.dt, this.state.timescale[1] + this.state.system.dt],
          domain
        });
      }
    }, this.state.system.dt * this.state.timeDilation * 1000);
  }

  pause() {
    this.setState({
      pause: !this.state.pause
    });
  }

  restart(state) {
    switch (state.model) {
      case "l63":
        this.setState({
          system: new Lorenz63(state.rho, state.beta, state.sigma, state.initialPosition, state.varToReport),
          truth: [],
          ensembles: [],
          observations: [],
          observationFrequency: 1,
          timescale: [-10, 5],
          timeDilation: 1,
          domain: [0, 0],
          pause: true,
          observing: false,
          assimilating: false
        });
        break;
  
      case "lmap":
        this.setState({
          system: new LogisticMap(state.r, state.initialPosition),
          truth: [],
          ensembles: [],
          observations: [],
          observationFrequency: 10,
          timescale: [-10, 5],
          timeDilation: 100,
          domain: [0, 1],
          pause: true,
          observing: false,
          assimilating: false
        });
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div>
      <head> 
        <link rel="stylesheet" type="text/css" href={this.state.stylePath}/>
      </head>
      <body>
        <div style={{
          width: this.props.width,
          height: this.props.height,
        }} class="AssimDemoFrame">
        <h3 style={{
          margin: "0px",
          textAlign: "center"
        }}>
          Assimilation Demo
        </h3>
        <div style={{
          float: "right"
        }}>
          <ErrorInformation {...this.state} />
          <button onClick={() => this.pause()}>{this.state.pause? "Resume!" : "Pause!"}</button> <br />

          <input 
            type="checkbox" 
            onClick={() => {
              this.setState({
                observing: document.getElementById("observationCheckbox").checked
              });
              if (this.state.observing) {
                this.setState({
                  assimilating: false
                });
              }
            }}
            id="observationCheckbox"
            checked={this.state.observing}
          /> Observing <br />

          <input 
            type="checkbox" 
            onClick={() => {
              this.setState({
                assimilating: document.getElementById("assimilationCheckbox").checked
              });
              if (!this.state.assimilating) {
                this.setState({
                  observing: true
                });
              }
            }} 
            id="assimilationCheckbox"
            checked={this.state.assimilating}
          /> Assimilating <br />
        </div>

        <Graph 
          width={this.props.width * 0.7}
          height={this.props.height * 0.7}
          margin={this.props.margin}
          {...this.state}
        /><br/>

        <div style={{
          width: this.props.width * 0.5,
          float: "right",
        }}> 
          <RestartForm onSubmit={(state) => {this.restart(state); this.componentDidMount()}}/> 
        </div>

        Timestep: <input 
          type="number" 
          min={0.001} 
          max={0.01} 
          step={0.001} 
          precision={3} 
          onBlur={() => 
            this.state.system.dt = Number(document.getElementById("timestepInput").value)
          } 
          id="timestepInput" 
          style={{
            width: "3rem"
          }}
        /> <br />
        
        <ObsForm app={this} />
        <AssimForm {...this.state}/>
        </div>
      </body>
      </div>
    );
  }
}

export default App;
