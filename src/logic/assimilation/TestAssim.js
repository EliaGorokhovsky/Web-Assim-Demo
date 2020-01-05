import { gaussianRandom } from '../helpers/Random';

export const TestAssim = (ensemble, observation, likelihood) => {
    return ensemble.map(element => observation.map(a => a + gaussianRandom(a, 0.1)));
}

