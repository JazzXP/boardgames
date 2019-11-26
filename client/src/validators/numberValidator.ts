import regexValidator from './regexValidator';

export default function (options: any): (input:string) => true | string {
    return regexValidator({...options, regex: /^\d+$/});
}