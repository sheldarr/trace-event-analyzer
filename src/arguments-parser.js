import chalk from 'chalk';
import winston from 'winston';

class ArgumentsParser {
    static parse(argv) {
        const args = require('minimist')(argv);
        
        if (!args.paths) {
            winston.info(chalk.red('You must pass paths argument e.g. --paths="./trace-event.json"'));
            process.exit(0);
        }

        return args;
    }
}

export default ArgumentsParser;