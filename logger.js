import winston from 'winston';

const logFormat = winston.format.printf(({ level, message,spanId, timestamp, httpRequest}) => {
    return JSON.stringify({
      timestamp: timestamp,
      severity: level.toUpperCase(),
      message,
      spanId,
      httpRequest
    })
  });
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    new winston.transports.File({ filename: './app.log' }),
    new winston.transports.Console(),
  ],
});

logger.on('error', (err) => {
    console.error('Winston error:', err);
  });

export default logger