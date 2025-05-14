export const makeClassName = (baseClass: string, addClasses: string[]): string => {
    let resClasses = [baseClass];
    if (addClasses) {
        resClasses.push(...addClasses);
    }

    return resClasses.join(" ");
}