# trace-event-analyzer

Analyze events in [Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/edit)

## Parameters

* `--paths` (default `''`) - separated paths to Trace Event Format json files
* `--default-separator` (default `','`) - separator which will be used to separate other params
* `--decimal-places` (default `4`) - number of decimal places of output statistics
* `--output` (default `false`) - outputs summary to json file for each provided path: `[pathFileName].summary.json`
* `--silent` (default `false`) - disables output to console
* `--verbose` (default `false`) - enables verbose output
* `--unique-events` (default `false`) - runs unique events analyzer which creates list of all unique events in json file
* `--complete-events` (default `''`) - names of complete events to analyze
* `--duration-events` (default `''`) - names of duration events to analyze
* `--immediate-events` (default `''`) - names of immediate events to analyze
* `--duration-events` (default `''`) - names of duration events to analyze

## Example

```
yarn install

node build/main.js
    --paths='/path/to/trace/event/format/json'
    --complete-events='Paint'
    --duration-events='Layout'
    --immediate-events='DrawFrame'
    --output
```

## License

MIT