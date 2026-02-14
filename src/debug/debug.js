
let debug = true;

export const debugLog = (message) => {
    if (debug)
        console.log(message);
}

export const debugErrorLog = (message) => {
    if (debug) {
        console.error(message);
    }
}