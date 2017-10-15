import minimist from 'minimist';

const DEFAULT_DECIMAL_PLACES = 4;
const DEFAULT_SEPARATOR = ',';

class ArgumentsParser {
    static parse(argv) {
        const args = minimist(argv, {
            default: {
                'complete-events': '',
                'duration-events': '',
                'immediate-events': '',
                'unique-events': false,
                'decimal-places': DEFAULT_DECIMAL_PLACES,
                paths: '',
                output: false,
                silent: false,
                separator: DEFAULT_SEPARATOR
            }
        });
        
        return args;
    }
}

export default ArgumentsParser;