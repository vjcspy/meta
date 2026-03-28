export function deepMerge(target: any, source: any): any {
    const result = { ...target };

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const sourceValue = source[key];
            const targetValue = result[key];

            if (
                sourceValue &&  typeof sourceValue === 'object' &&
                !Array.isArray(sourceValue) &&
                targetValue &&  typeof targetValue === 'object' &&
                !Array.isArray(targetValue)
            ) { result[key] = deepMerge(targetValue, sourceValue);
            } else if (sourceValue !== undefined) {
                result[key] = sourceValue; } } }
    return result;
}