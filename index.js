import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import winston from 'winston';

import ArgumentsParser from './src/arguments-parser';
import ImmediateEventsAnalyzer from './src/immediate-events-analyzer';
import StatisticsGenerator from './src/statistics-generator';
import TraceEventsLoader from './src/trace-events-loader';
import UniqueEventsAnalyzer from './src/unique-events-analyzer';

const DEFAULT_DECIMAL_PLACES = 4;
const DEFAULT_SEPARATOR = ',';

const args = ArgumentsParser.parse(process.argv.slice(2));

winston.info(`${chalk.green('Provided args')} ${JSON.stringify(args, null, '\t')}`);

const paths = args.paths.replace(' ', '').split(DEFAULT_SEPARATOR);

paths.forEach((eventsPath) => {
    const summary = {};
    const events = TraceEventsLoader.load(eventsPath);

    if (!events) {
        return;
    }
    
    const uniqueEvents = args['unique-events'];
    if (uniqueEvents) {
        summary.uniqueEvents = UniqueEventsAnalyzer.analyze(events);
    }
    
    const decimalPlaces = args['decimal-places'] || DEFAULT_DECIMAL_PLACES;
    const immediateEvents = args['immediate-events'].replace(' ', '').split(DEFAULT_SEPARATOR);
    immediateEvents.forEach((immediateEvent) => {
        const analysisSummary = ImmediateEventsAnalyzer.analyze(events, immediateEvent);
        
            if(analysisSummary) {
                if(!summary.immediateEvents) {
                    summary.immediateEvents = {};
                }

                summary.immediateEvents[immediateEvent] = {
                    deltas: StatisticsGenerator.generate(analysisSummary.deltas, decimalPlaces),
                    eps: StatisticsGenerator.generate(analysisSummary.eps, decimalPlaces)
                };
            }
    });

    const stringifiedSummary = JSON.stringify(summary, null, '\t');
    winston.info(stringifiedSummary);

    if(args.output) {
        fs.writeFileSync(`./${path.basename(eventsPath).split('.')[0]}.summary.json`, stringifiedSummary, 'utf-8');
    }
});