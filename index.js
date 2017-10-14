import winston from 'winston';

import events from './src/events';
import ArgumentsParser from './src/arguments-parser';
import TraceEventsLoader from './src/trace-events-loader';
import StatisticsGenerator from './src/statistics-generator';

const args = ArgumentsParser.parse(process.argv);
const traceEvents = TraceEventsLoader.load(args.path);

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

const deltas = [];

for (let index = 0; index < timestamps.length; index++) {
    if(index === 0) {
        continue;
    }

    const delta = (timestamps[index] - timestamps[index - 1]) / 1000;

    if(delta < 0) {
        continue;
    }

    deltas.push(delta);
}

const fps = deltas.map((delta) => {
    return 1000 / delta;
});

winston.info({
    deltas: StatisticsGenerator.generate(deltas),
    fps: StatisticsGenerator.generate(fps)
});