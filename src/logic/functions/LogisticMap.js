import System from './System';
import { gaussianRandom } from '../helpers/Random';
import { ensembleMean } from '../helpers/EnsembleMetrics';

export default class LogisticMap extends System {

    value = [0];
    r = 0;
    time = 0;
    dt = 1;
    variables = [{name:"y", value:0}]
    mseVars = [0]
    mseObs = [0]

    constructor(r, initial, ensemble) {
        super();
        this.r = r;
        this.value[0]= initial;
        this.ensemble = [[initial + 0.01], [initial - 0.01], [initial - 0.02], [initial + 0.02]];
    }

    getPoint() {
        return {
            time: this.time,
            state: this.value[0]
        };
    }
    
    
    getEnsemble() {
        return {
            time: this.time,
            ensembles: this.ensemble.map(a => a[0])
        }
    }

    timestep() {
        this.value[0] = 
            this.r 
            * this.value[0]
            * (1 - this.value[0]);
        this.ensemble = this.ensemble.map(point =>
            [this.r 
            * point[0] 
            * (1 - point[0])]
        )
        this.time += this.dt;
        this.mseVars = this.mseVars.map((current, index) => 
            (current * (this.time - this.dt) / this.dt + Math.pow(ensembleMean(this.ensemble)[index] - this.value[index], 2)) * this.dt / this.time
        );
    }

    observe() {
        return {
            time: this.time,
            state: [gaussianRandom(this.value[0], this.observationError)]
        }
    }

}