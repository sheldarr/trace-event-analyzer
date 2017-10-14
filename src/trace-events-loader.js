import chalk from 'chalk';
import fs from 'fs';
import winston from 'winston';

class TraceEventsLoader {
    static load(path) {
        if (!fs.existsSync(path)) {
            winston.error(chalk.red(`${path} does not exist!`))
            process.exit(0);
        }
    }
}

export default TraceEventsLoader;