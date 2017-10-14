import percentile from 'percentile';
import * as statistics from 'simple-statistics';

class StatisticsGenerator {
    static generate(data) {
        return {
            min: statistics.min(data),
            mean: statistics.mean(data),
            median: statistics.median(data),
            percentiles: {
                50: percentile(50, data),
                66: percentile(66, data),
                75: percentile(75, data),
                80: percentile(80, data),
                90: percentile(90, data),
                95: percentile(95, data),
                98: percentile(98, data),
                99: percentile(99, data),
                100: percentile(100, data)
            },
            standardDeviation: statistics.standardDeviation(data),
            variance: statistics.variance(data)
        }
    }
}

export default StatisticsGenerator

50%     14
66%     15
75%     15
80%     19
90%     59
95%     59
98%     59
99%     59
