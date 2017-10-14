import percentile from 'percentile';
import * as statistics from 'simple-statistics';

class StatisticsGenerator {
    static generate(data) {
        return {
            min: statistics.min(data),
            max: statistics.max(data),
            mean: statistics.mean(data),
            median: statistics.median(data),
            standardDeviation: statistics.standardDeviation(data),
            variance: statistics.variance(data),
            p90: percentile(90, data)
        }
    }
}

export default StatisticsGenerator