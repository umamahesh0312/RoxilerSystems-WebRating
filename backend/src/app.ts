import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { config } from '@config/env';
import { errorHandler } from '@middleware/index';
import { logger } from '@utils/index';
import routes from '@routes/index';

const app: Express = express();

app.use(helmet());

app.use(
cors({
origin: config.cors.origin,
credentials: true,
})
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

app.use(
morgan('combined', {
stream: {
write: (message) => logger.info(message.trim()),
},
})
);

const swaggerOptions = {
definition: {
openapi: '3.0.0',
info: {
title: 'RoxSys Store Rating Platform API',
version: '1.0.0',
description: 'Backend API for the Store Rating Platform',
},
servers: [
{
url: `http://localhost:${config.server.port}/api`,
description: 'Development Server',
},
],
components: {
securitySchemes: {
bearerAuth: {
type: 'http',
scheme: 'bearer',
bearerFormat: 'JWT',
},
},
},
},
apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/health', (_req: Request, res: Response) => {
res.status(200).json({
success: true,
message: 'Server is running',
timestamp: new Date().toISOString(),
});
});

app.use('/api', routes);

app.use((_req: Request, res: Response) => {
res.status(404).json({
success: false,
message: 'Route not found',
});
});

app.use(errorHandler);

export default app;
