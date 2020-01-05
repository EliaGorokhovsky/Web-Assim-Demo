import * as math from 'mathjs';

export const ensembleMean = (ensemble) => {
    let out = ensemble[0].map(a => 0);
    ensemble.forEach(point => {
        out = out.map((element, index) => element + point[index]);
    });
    return out.map(element => element / ensemble.length);
}

export const ensembleDeviation = (ensemble, ddof) => {
    let out = ensemble[0].map(a => 0);
    let mean = ensembleMean(ensemble);
    ensemble.forEach(point => {
        out = out.map((element, index) => element + (point[index] - mean[index]) * (point[index] - mean[index]));
    });
    return out.map(element => math.sqrt(element / (ensemble.length - ddof)));
}

export const transposeEnsemble = (ensemble) => {
    let lists = ensemble[0].map(a => []);
    ensemble.forEach((point) => {
        point.forEach((element, index) => {
            lists[index].push(element);
        });
    });
    return lists;
}