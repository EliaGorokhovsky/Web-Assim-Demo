import { gaussianRandom } from '../helpers/Random'
import System from './System'
/**
 * A system is a construct that evolves over time
 */
export default class Test extends System {

    value = [0];
    ensemble = [[0.01], [-0.01], [0]];
    time = 0;
    dt = 0.01;
    observationError = [0];
    knownObservationError = [0];
    variables = [{name:"default", value:0}];

    //A system needs to be able to serve its state to the main loop
    getPoint(){
        return {
            time: this.time,
            state: this.value[0]
        };
    }

    //A system needs to be able to serve the state of its ensemble to the main loop
    getEnsemble(){
        return {
            time: this.time,
            ensembles: this.ensemble.map(a => a[0])
        };
    }

    //A system needs to evolve its state
    timestep(){
        this.value[0] = this.value[0] + gaussianRandom(0, 0.1);
        this.ensemble = this.ensemble.map(a => [a[0] + gaussianRandom(0, 0.1)]);
        this.time += this.dt;
    }

    //A system needs to be able to observe state
    observe(){
        let newstate = [gaussianRandom(this.value[0], this.observationError[0])];
        return {
            time: this.time, 
            state: newstate
        };
    }

    //A system needs to be able to update its forecast skill measurement
    updateObsRMSE(){}

}