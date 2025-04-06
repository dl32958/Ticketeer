// import { Request, Response, NextFunction } from 'express';
// import { CustomError } from '../errors/custom-error';

// export const errorHandler = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     // {errors: {message: string, field?: string}[]}
//     if (err instanceof CustomError) {
//       return res.status(err.statusCode).send({ errors: err.serializeErrors() });
//     }
  
//     res.status(400).send({
//       errors: [{ message: 'Something went wrong' }]
//     });
//   };
  
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler: ErrorRequestHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    // {errors: {message: string, field?: string}[]}
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors() });
        return;
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    });
};