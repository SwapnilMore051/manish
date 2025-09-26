export const classNames = (...classes: (string | false | null | undefined | Record<string, boolean>)[]): string => {
    return classes
        .flatMap((cls) => {
            if (typeof cls === 'string') return cls; // Keep valid class names
            if (typeof cls === 'object' && cls !== null) {
                return Object.entries(cls)
                    .filter(([_, value]) => value) // Keep only truthy values
                    .map(([key]) => key);
            }
            return []; // Filter out false, null, undefined
        })
        .join(' ');
};
