import System from './System';
import { rk4 } from './RK4';
import { gaussianRandom } from '../helpers/Random';
import { ensembleMean } from '../helpers/EnsembleMetrics';

export default class Lorenz63 extends System {

    value = [];
    rho = 0;
    beta = 0;
    sigma = 0;
    dt = 0.01;
    time = 0;
    observationError = [1, 1, 1];
    knownObservationError = [1, 1, 1];
    variables = [
        {name:"x", value:0},
        {name:"y", value:1},
        {name:"z", value:2}
    ];
    varToReport = 0;
    mseVars = [0, 0, 0];
    mseObs = [0, 0, 0];
    obsQuantity = 0;

    constructor(rho, beta, sigma, initial, ensemble, varToReport = 0) {
        super();
        this.rho = rho;
        this.beta = beta;
        this.sigma = sigma;
        this.varToReport = varToReport;
        this.value = initial;
        this.ensemble = [initial.map(a => a + 0.01), initial.map(a => a - 0.01),  initial.map(a => a - 0.02),  initial.map(a => a + 0.02)];
    }

    getPoint() {
        return {
            time: this.time,
            state: this.value[this.varToReport]
        };
    }
    
    getEnsemble() {
        return {
            time: this.time,
            ensembles: this.ensemble.map(a => a[this.varToReport])
        }
    }

    changeFunction = (state, dt) => {
        return [
            this.sigma * (state[1] - state[0]),
            state[0] * (this.rho - state[2]) - state[1],
            state[0] * state[1] - this.beta * state[2]
        ];
    }

    timestep() {
        this.value = rk4(this.value, this.dt, this.changeFunction);
        this.ensemble = this.integrateEnsemble();
        this.time += this.dt;
        this.mseVars = this.mseVars.map((current, index) => 
            (current * (this.time - this.dt) 
            / this.dt + Math.pow(ensembleMean(this.ensemble)[index] - this.value[index], 2)) 
            * this.dt / this.time
        );
    }

    integrateEnsemble() {
        return this.ensemble.map(point => rk4(point, this.dt, this.changeFunction));
    }

    updateObsRMSE() {
        this.mseObs = this.mseObs.map((current, index) => 
            (current * (this.obsQuantity) + Math.pow(ensembleMean(this.ensemble)[index] - this.value[index], 2)) / (++this.obsQuantity)
        );
    }

    observe() {
        return {
            time: this.time,
            state: this.value.map((dim, index) => gaussianRandom(dim, this.observationError[index]))
        }
    }

}