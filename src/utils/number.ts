
export const extractNumbers = (str: string): string[]  => {
    const string = str + "";
    return string.match(/\d+/g);
}