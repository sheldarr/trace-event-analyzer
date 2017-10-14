import chalk from 'chalk';
import winston from 'winston';

class ArgumentsParser {
    static parse(argv) {
        const args = require('minimist')(argv);
        
        if (!args.path) {
            winston.info(chalk.red('You must pass path argument e.g. --path=./trace.json'));
            process.exit(0);
        }

        return args;
    }
}

export default ArgumentsParser;