class NumValidator {
	static validate(data) {
		const { name, number } = data

		if (!name || typeof name !== 'string' || name.trim() === '') {
			return {
				isValid: false,
				error: 'Name не должно быть пустым или не строкой.',
			}
		}

		if (!number || typeof number !== 'string' || number.trim() === '') {
			return {
				isValid: false,
				error: 'Number не должен быть пустой или не строкой.',
			}
		}
		return { isValid: true, error: null }
	}
}

module.exports = NumValidator
