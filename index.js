import chalk from 'chalk';
import winston from 'winston';
import TraceEventsLoader from './src/trace-events-loader';
import events from './src/events';

const argv = require('minimist')(process.argv);

if (!argv.path) {
    winston.info(chalk.red('You must pass path argument e.g. --path=./trace.json'));
    process.exit(0);
}
    
const traceEvents = TraceEventsLoader.load(argv.path);

let uniqueEventsNames = [];

traceEvents.forEach((traceEvent) => {
    if(uniqueEventsNames.includes(traceEvent.name)) {
        return;
    }

    uniqueEventsNames.push(traceEvent.name);
    winston.info(traceEvent.name);
});

const drawFrameEvents = traceEvents.filter((traceEvent) => {
    return traceEvent.name === events.DRAW_FRAME;
});

for (let index = 0; index < drawFrameEvents.length; index++) {
    if(index === 0) {
        continue;
    }

    const diff = drawFrameEvents[index].ts - drawFrameEvents[index - 1].ts

    winston.info(diff / 1000);
}