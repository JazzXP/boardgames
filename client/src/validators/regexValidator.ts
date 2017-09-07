export default function (options: any): (input:string) => true | string {
    return (input: string) => {
        if (!options || !options.error || !options.regex) {
            return "Invalid options passed to validator";
        }
        if (options.regex.test(input)) {
            return true;
        }
        return options.error;
    }
}