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
                'default-separator': DEFAULT_SEPARATOR,
                paths: '',
                output: false
            }
        });
        
        return args;
    }
}

export default ArgumentsParser;