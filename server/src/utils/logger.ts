import { createLogger, format, transports, remove } from 'winston';
import morgan from 'morgan';

remove(transports.Console);

const customFormat = format.printf(function (info: any) {
  return `${
    info.level
  }: ${JSON.stringify(info.message || info.reason?.message || info, null, 4)}\n`;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), customFormat),
    }),
  ],
});

const loggerMdl = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message: string) => logger.info(message.trim()),
    },
  }
);

export { logger, loggerMdl };
