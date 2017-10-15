import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import winston from 'winston';

import ArgumentsParser from './src/arguments-parser';
import CompleteEventsAnalyzer from './src/complete-events-analyzer';
import DurationEventsAnalyzer from './src/duration-events-analyzer';
import ImmediateEventsAnalyzer from './src/immediate-events-analyzer';
import SeparatedValuesToArray from './src/separated-values-to-array';
import StatisticsGenerator from './src/statistics-generator';
import TraceEventsLoader from './src/trace-events-loader';
import UniqueEventsAnalyzer from './src/unique-events-analyzer';

const args = ArgumentsParser.parse(process.argv.slice(2));

winston.info(`${chalk.green('Provided args')} ${JSON.stringify(args, null, '\t')}`);

const paths = SeparatedValuesToArray.transform(args.paths, args['default-separator']);

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
    
    const decimalPlaces = args['decimal-places'];
    const completeEvents = SeparatedValuesToArray.transform(args['complete-events'], args['default-separator']);
    completeEvents.forEach((completeEvent) => {
        const analysisSummary = CompleteEventsAnalyzer.analyze(events, completeEvent);
        
            if(analysisSummary) {
                if(!summary.completeEvents) {
                    summary.completeEvents = {};
                }

                summary.completeEvents[completeEvent] = {
                    deltas: StatisticsGenerator.generate(analysisSummary.deltas, decimalPlaces),
                    eps: StatisticsGenerator.generate(analysisSummary.eps, decimalPlaces)
                };
            }
    });

    const durationEvents = SeparatedValuesToArray.transform(args['duration-events'], args['default-separator']);
    durationEvents.forEach((durationEvent) => {
        const analysisSummary = DurationEventsAnalyzer.analyze(events, durationEvent);
        
            if(analysisSummary) {
                if(!summary.durationEvents) {
                    summary.durationEvents = {};
                }

                summary.durationEvents[durationEvent] = {
                    deltas: StatisticsGenerator.generate(analysisSummary.deltas, decimalPlaces),
                    eps: StatisticsGenerator.generate(analysisSummary.eps, decimalPlaces)
                };
            }
    });

    const immediateEvents = SeparatedValuesToArray.transform(args['immediate-events'], args['default-separator']);
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