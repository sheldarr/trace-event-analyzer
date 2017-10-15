import chalk from 'chalk';
import fs from 'fs';
import winston from 'winston';

class TraceEventFormatLoader {
    static load(path) {
        winston.info(chalk.green(`Loading ${chalk.cyan(path)}`));
        
        if (!fs.existsSync(path)) {
            winston.error(chalk.red(`${path} does not exist!`))
            return;
        }

        const file = fs.readFileSync(path);

        try {
            return JSON.parse(file).sort(TraceEventFormatLoader.sortByTimeStamp)
        } catch(error) {
            winston.error(error);
            return;
        }
    }

    static sortByTimeStamp(a, b) {
        return a.ts - b.ts;
    }
}

export default TraceEventFormatLoader;