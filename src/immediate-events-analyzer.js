import chalk from 'chalk';
import winston from 'winston';

const IMMEDIATE_EVENT_TYPE = 'I';

class ImmediateEventsAnalyzer{
    static analyze(events, eventName) {
        winston.info(`${chalk.green('Analysing immediate event')} ${chalk.cyan(eventName)}`)
        if(!this.verify(events, eventName)) {
            return;
        }

        const filteredEvents = events.filter((event) => {
            return event.name === eventName;
        })

        const deltas = [];
        
        for (let index = 0; index < filteredEvents.length; index++) {
            if(index === 0) {
                continue;
            }
        
            const delta = (filteredEvents[index].ts - filteredEvents[index - 1].ts) / 1000;

            if(delta < 0) {
                winston.warn(chalk.yellow('Detected delta < 0!'));
                continue;
            }
        
            deltas.push(delta);
        }
        
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
            return event.name === eventName;
        })

        winston.info(`${chalk.green('Found')} ${chalk.cyan(filteredEvents.length)} ${chalk.green('events')}`)

        if(filteredEvents.length === 0) {
            return false;
        }

        if(filteredEvents.some((event) => {
            return event.name === eventName && event.ph !== IMMEDIATE_EVENT_TYPE;
        })) {
            winston.warn(`${chalk.yellow('Found not immediate')} ${chalk.cyan(eventName)} ${chalk.yellow('event!')}`);
            return false;
        }

        return true;
    }
}

export default ImmediateEventsAnalyzer;