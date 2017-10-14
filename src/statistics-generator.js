import percentile from 'percentile';
import * as statistics from 'simple-statistics';

class StatisticsGenerator {
    static generate(data, decimalPlaces) {
        return {
            min: statistics.min(data).toFixed(decimalPlaces),
            mean: statistics.mean(data).toFixed(decimalPlaces),
            percentiles: {
                50: percentile(50, data).toFixed(decimalPlaces),
                66: percentile(66, data).toFixed(decimalPlaces),
                75: percentile(75, data).toFixed(decimalPlaces),
                80: percentile(80, data).toFixed(decimalPlaces),
                90: percentile(90, data).toFixed(decimalPlaces),
                95: percentile(95, data).toFixed(decimalPlaces),
                98: percentile(98, data).toFixed(decimalPlaces),
                99: percentile(99, data).toFixed(decimalPlaces),
                100: percentile(100, data).toFixed(decimalPlaces)
            },
            standardDeviation: statistics.standardDeviation(data).toFixed(decimalPlaces),
            variance: statistics.variance(data).toFixed(decimalPlaces)
        }
    }
}

export default StatisticsGenerator;