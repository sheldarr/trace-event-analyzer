import chalk from 'chalk';
import winston from 'winston';

const COMPLETE_EVENT_TYPE = 'X';

class CompleteEventsAnalyzer{
    static analyze(events, eventName) {
        winston.info(`${chalk.green('Analysing complete event')} ${chalk.cyan(eventName)}`)
        if(!this.verify(events, eventName)) {
            return;
        }

        const filteredEvents = events.filter((event) => {
            return event.name === eventName;
        })

        const deltas = filteredEvents
            .filter((event) => {
                return event.dur;
            })
            .map((event) => {
                return event.dur;
            });
        
        return {
            deltas,
            eps: deltas.map((delta) => {
                return 1000 / delta;
            })
        }
    }

    static verify(events, eventName) {
        winston.info(chalk.green('Verification'));

        const filteredEvents = events.filter((event) => {
            return event.name === eventName && event.ph === COMPLETE_EVENT_TYPE;
        })

        winston.info(`${chalk.green('Found')} ${chalk.cyan(filteredEvents.length)} ${chalk.green('events')}`)

        if(filteredEvents.length === 0) {
            return false;
        }

        return true;
    }
}

export default CompleteEventsAnalyzer;