import * as math from 'mathjs';

export const standardDeviation = (set, ddof) => {
    return math.sqrt(variance(set, ddof));
}


export const variance = (set, ddof)  => {
    return set.reduce((a, b) => a + math.pow(b - math.mean(set), 2) / (set.length - ddof), 0);
}