import app from './app';
import { config } from '@config/env';
import { logger } from '@utils/index';
import prisma from '@config/database';

const PORT = config.server.port;

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connection successful');

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Swagger documentation available at http://localhost:${PORT}/api/docs`);
      logger.info(`Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
startServer();
