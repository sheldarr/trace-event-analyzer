class SeparatedValuesToArray {
    static transform(values, separator) {
        return values
            .replace(' ', '')
            .split(separator)
            .filter((value) => {
                return value !== '';
            });
    }
}

export default SeparatedValuesToArray;