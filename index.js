import chalk from 'chalk';
import winston from 'winston';

import ArgumentsParser from './src/arguments-parser';
import ImmediateEventsAnalyzer from './src/immediate-events-analyzer';
import StatisticsGenerator from './src/statistics-generator';
import TraceEventsLoader from './src/trace-events-loader';
import UniqueEventsAnalyzer from './src/unique-events-analyzer';

const DEFAULT_DECIMAL_PLACES = 4;
const DEFAULT_SEPARATOR = ',';

const args = ArgumentsParser.parse(process.argv.slice(2));
const events = TraceEventsLoader.load(args.path);

winston.info(`${chalk.green('Provided args')} ${JSON.stringify(args, null, '\t')}`);

const uniqueEvents = args['unique-events'];
if (uniqueEvents) {
    const analysisSummary = UniqueEventsAnalyzer.analyze(events);

    winston.info(JSON.stringify(analysisSummary, null, '\t'));
}

const decimalPlaces = args['decimal-places'] || DEFAULT_DECIMAL_PLACES;
const immediateEvents = args['immediate-events'].replace(' ', '').split(DEFAULT_SEPARATOR);

immediateEvents.forEach((immediateEvent) => {
    const analysisSummary = ImmediateEventsAnalyzer.analyze(events, immediateEvent);
    
        if(analysisSummary) {
            winston.info(JSON.stringify({
                deltas: StatisticsGenerator.generate(analysisSummary.deltas, decimalPlaces),
                eps: StatisticsGenerator.generate(analysisSummary.eps, decimalPlaces)
            }, null, '\t'));
        }
});
