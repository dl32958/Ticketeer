import express from 'express';
import 'express-async-errors'; // for async error handling
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@dlticketeer/common';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true); // make express trust the proxy (ingress-nginx)
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser); // add current user middleware

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res, next)=>{
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };