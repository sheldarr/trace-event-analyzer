import chalk from 'chalk';
import winston from 'winston';
import TraceEventsLoader from './src/trace-events-loader';

const argv = require('minimist')(process.argv);

if (!argv.path) {
    winston.info(chalk.red('You must pass path argument e.g. --path=./trace.json'));
    process.exit(0);
}

const traceEvents = TraceEventsLoader.load(argv.path);

console.log(traceEvents);