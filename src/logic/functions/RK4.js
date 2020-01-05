export const rk4 = (state, dt, changeFunction) => {
    let k1 = changeFunction(state).map(a => a * dt);
    let k2 = changeFunction(
        state.map((x, index) => x + 0.5 * k1[index])
    ).map(a => a * dt);
    let k3 = changeFunction(
        state.map((x, index) => x + 0.5 * k2[index])
    ).map(a => a * dt);
    let k4 = changeFunction(
        state.map((x, index) => x + k3[index])
    ).map(a => a * dt);
    return state.map((x, index) =>
        x + k1[index] / 6.0 + k2[index] / 3.0 + k3[index] / 3.0 + k4[index] / 6.0
    );
}