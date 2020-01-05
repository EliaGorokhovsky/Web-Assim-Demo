import { gaussianRandom } from '../helpers/Random'
/**
 * A system is a construct that evolves over time
 */
export default class System {

    value = [0];
    ensemble = [];
    time = 0;
    dt = 0.01;
    observationError = [0];
    knownObservationError = [0];
    variables = [{name:"default", value:0}];
    mseVars = [0];
    mseObs = [0];
    //varToReport = 0;

    //A system needs to be able to serve its state to the main loop
    getPoint(){}

    //A system needs to be able to serve the state of its ensemble to the main loop
    getEnsemble(){
        return [[]]
    }

    //A system needs to evolve its state
    timestep(){}

    //A system needs to be able to observe state
    observe(){
        return {time: 0, state: [0]}
    }

    //A system needs to be able to update its forecast skill measurement
    updateObsRMSE(){}

}