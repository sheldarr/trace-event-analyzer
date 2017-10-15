import chalk from 'chalk';
import winston from 'winston';

const DURATION_EVENT_TYPE_BEGIN = 'B';
const DURATION_EVENT_TYPE_END = 'E';

class DurationEventsAnalyzer{
    static analyze(events, eventName) {
        winston.info(`${chalk.green('Analysing duration event')} ${chalk.cyan(eventName)}`)

        const extractedeEvents = DurationEventsAnalyzer.extract(events, eventName);

        if(!this.verify(extractedeEvents.begin, extractedeEvents.end)) {
            return;
        }

        const durationEvents = [];

        for (let index = 0; index < extractedeEvents.begin.length; index++) {
            durationEvents.push({
                begin: extractedeEvents.begin[index],
                end: extractedeEvents.end[index]
            });
        }

        const deltas = durationEvents.map((event) => {
            return (event.end.ts - event.begin.ts) / 1000;
        })

        return {
            deltas,
            eps: deltas.map((delta) => {
                return 1000 / delta;
            })
        };
    }

    static extract(events, eventName) {
        winston.info(chalk.green('Extraction'));

        const beginEvents = events.filter((event) => {
            return event.name === eventName
                && event.ph === DURATION_EVENT_TYPE_BEGIN;
        });

        const endEvents = events.filter((event) => {
            return event.name === eventName
                && event.ph === DURATION_EVENT_TYPE_END;
        });

        return {
             begin: beginEvents,
             end: endEvents
        };
    }

    static verify(beginEvents, endEvents) {
        winston.info(chalk.green('Verification'));

        if(beginEvents.length !== endEvents.length) {
            winston.error('Number of begin events not equals number of end events!');
            return false;
        }

        return true;
    }
}

export default DurationEventsAnalyzer;