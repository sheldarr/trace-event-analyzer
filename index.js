import chalk from 'chalk';
import percentile from 'percentile';
import * as statistics from 'simple-statistics';
import winston from 'winston';

import events from './src/events';
import TraceEventsLoader from './src/trace-events-loader';

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
});

const drawFrameEvents = traceEvents.filter((traceEvent) => {
    return traceEvent.name === events.DRAW_FRAME;
});

const timestamps = drawFrameEvents.map((event) => {
    return event.ts;
});

const diffs = [];

for (let index = 0; index < timestamps.length; index++) {
    if(index === 0) {
        continue;
    }

    const diff = (timestamps[index] - timestamps[index - 1]) / 1000;

    if(diff < 0) {
        continue;
    }

    diffs.push(diff);
}

const fps = diffs.map((diff) => {
    return 1000 / diff;
});

winston.info({
    diffs: {
        min: statistics.min(diffs),
        max: statistics.max(diffs),
        mean: statistics.mean(diffs),
        median: statistics.median(diffs),
        standardDeviation: statistics.standardDeviation(diffs),
        variance: statistics.variance(diffs),
        p90: percentile(90, diffs)
    },
    fps: {
        min: statistics.min(fps),
        max: statistics.max(fps),
        mean: statistics.mean(fps),
        median: statistics.median(fps),
        standardDeviation: statistics.standardDeviation(fps),
        variance: statistics.variance(fps),
        p90: percentile(90, fps)
    }
});