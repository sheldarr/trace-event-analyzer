import chalk from 'chalk';
import fs from 'fs';
import winston from 'winston';

class TraceEventsLoader {
    static load(path) {
        if (!fs.existsSync(path)) {
            winston.error(chalk.red(`${path} does not exist!`))
            process.exit(0);
        }

        const file = fs.readFileSync(path);

        try {
            return JSON.parse(file).sort(TraceEventsLoader.sortByTimeStamp)
        } catch(error) {
            winston.error(error);
            process.exit(0);
        }
    }

    static sortByTimeStamp(a, b) {
        return a.ts - b.ts;
    }
}

export default TraceEventsLoader;