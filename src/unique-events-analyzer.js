import chalk from 'chalk';
import winston from 'winston';

class UniqueEventsAnalyzer{
    static analyze(events) {
        winston.info(chalk.green('Analysing unique events'));

        let uniqueEvents = [];
        
        events.forEach((event) => {
            if (!event.name) {
                winston.warn(chalk.yellow('Detected event with no name!'));
                return;
            }

            if(uniqueEvents.some((uniqueEvent) => {
                return uniqueEvent.name === event.name && uniqueEvent.ph === event.ph;
            })) {
                return;
            }

            uniqueEvents.push({
                name: event.name,
                ph: event.ph
            });
        });

        uniqueEvents.sort(UniqueEventsAnalyzer.sortByName);

        return uniqueEvents.map((event) => {
            return `${event.name}__${event.ph}`;
        })
    }

    static sortByName(a, b) {
        if(a.name < b.name) {
            return -1;
        }

        if(a.name > b.name) {
            return 1;
        }

        return 0;
    }
}

export default UniqueEventsAnalyzer;