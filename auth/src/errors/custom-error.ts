export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);   // this message is for logging purposes
        // make sure instanceof works during compilation
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    // {errors: {message: string, field?: string}[]}
    abstract serializeErrors(): { message: string; field?: string }[];
}