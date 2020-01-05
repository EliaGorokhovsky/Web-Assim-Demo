// Standard Normal variate using Box-Muller transform.
// See https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve 
export const gaussianRandom = (mean, stdev) => {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return mean + stdev * Math.sqrt( -2.0 * Math.log(u) ) * Math.cos(2.0 * Math.PI * v);
}