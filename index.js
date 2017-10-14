import chalk from 'chalk';
import winston from 'winston';

import ArgumentsParser from './src/arguments-parser';
import ImmediateEventsAnalyzer from './src/immediate-events-analyzer';
import StatisticsGenerator from './src/statistics-generator';
import TraceEventsLoader from './src/trace-events-loader';
import UniqueEventsAnalyzer from './src/unique-events-analyzer';

const DEFAULT_DECIMAL_PLACES = 4;

const args = ArgumentsParser.parse(process.argv);
const events = TraceEventsLoader.load(args.path);

winston.info(`${chalk.green('Provided args')} ${JSON.stringify(args, null, '\t')}`);

const uniqueEvents = args['unique-events'];
if (uniqueEvents) {
    const analysisSummary = UniqueEventsAnalyzer.analyze(events);

    winston.info(JSON.stringify(analysisSummary, null, '\t'));
}

const immediateEvent = args['immediate-event'];
const decimalPlaces = args['decimal-places'] || DEFAULT_DECIMAL_PLACES;
if (immediateEvent) {
    const analysisSummary = ImmediateEventsAnalyzer.analyze(events, immediateEvent);

    if(analysisSummary) {
        winston.info(JSON.stringify({
            deltas: StatisticsGenerator.generate(analysisSummary.deltas, decimalPlaces),
            eps: StatisticsGenerator.generate(analysisSummary.eps, decimalPlaces)
        }, null, '\t'));
    }
}
