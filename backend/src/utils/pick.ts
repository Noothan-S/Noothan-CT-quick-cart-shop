const pick = <T extends Record<string, unknown>, k extends keyof T>(obj: T, keys: k[]): Partial<T> => {
    const finalObj: Partial<T> = {}; // Initializing an empty object to store selected key-value pairs

    for (const key of keys) {
        // Check if the object contains the key and is not undefined or null
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key]; // Assign the value of the selected key to the result object
        }
    }

    console.log(finalObj); // Logging the final object for debugging
    return finalObj; // Returning the object with only the selected key-value pairs
}

export default pick;
