import { ensembleMean, ensembleDeviation, transposeEnsemble } from '../helpers/EnsembleMetrics';
import { standardDeviation } from '../helpers/Stats';
import * as math from 'mathjs';

export const getEAKFPosterior = (ensemble, observation, likelihood) => {
    //Posterior standard deviation is the square root of the inverse of the
    //sum of the inverse squares of the prior and likelihood
    //i.e. post = 1 / √((1/(prior^2)) + (1/(lik^2)))
    //in other words, the variance of the posterior is half the harmonic mean 
    //of the prior and likelihood variances
    //If either the likelihood or the prior standard deviation is zero then
    //the ensemble or the observation is 100% sure and then
    //the posterior should also have 0 variance
    let ensembleStandardDeviation = ensembleDeviation(ensemble, 0);
    let ensembleMeanPoint = ensembleMean(ensemble);
    let standardDeviations = ensembleStandardDeviation.map((element, index) => 
        element == 0 || likelihood[index] == 0 ? 
            0 : math.sqrt(1 / (math.pow(element, -2) + math.pow(likelihood[index], -2)))
    );
    //The mean is the posterior variance times 
    //priorMean / priorStd^2 + obs / lik^2
    //There are several ugly ternary operators here:
    //If the prior standard deviation is zero then don't change it
    //If the likelihood standard deviation is zero just set the prior to it
    //If both are zero there's something wrong, so I don't change the ensemble
    let means = ensemble[0].map((element, i) =>
        ensembleStandardDeviation[i] == 0 ? ensembleMeanPoint[i] : likelihood[i] == 0 ? observation[i] :
            math.pow(standardDeviations[i], 2) * ((ensembleMeanPoint[i] * math.pow(ensembleStandardDeviation[i], -2)) + (observation[i] * math.pow(likelihood[i], -2)))
    );
    return [means, standardDeviations];
}

/**
 * Gets increments for one variable
 */
export const getEAKFIncrements = (ensembleValues, posteriorMean, posteriorDeviation) => {
    let meanDifference = posteriorMean - math.mean(ensembleValues);
    let spreadRatio = 1;
    //Get the ratio of the standard deviations of the ensemble members
    if (standardDeviation(ensembleValues, 0) == posteriorDeviation) {
        //This may look useless, but it only occurs when the prior values standard deviation is 0
        spreadRatio = 1;
    } else {
        spreadRatio = posteriorDeviation / standardDeviation(ensembleValues, 0);
    }
    //Adjust the ensemble
    return ensembleValues.map(
        //linear shift and stretch to equate prior distribution to posterior      
        a => posteriorMean + spreadRatio * (a - math.mean(ensembleValues)) - a
    );
}

export const EAKF = (ensemble, observation, likelihood) => {
    let posteriors = getEAKFPosterior(ensemble, observation, likelihood);
    let transposed = transposeEnsemble(ensemble);
    let increments = transposed.map((list, index) => getEAKFIncrements(list, posteriors[0][index], posteriors[1][index]));
    let newEnsemble = transposed.map((list, i) => 
        list.map((element, j) =>
            element + increments[i][j]
        )
    )
    return transposeEnsemble(newEnsemble);
}
