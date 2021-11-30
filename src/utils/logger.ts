import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: `${JSON.stringify(dayjs().format())}`,
    },
  },
  base: {
    pid: false,
  },
});

export default log;
