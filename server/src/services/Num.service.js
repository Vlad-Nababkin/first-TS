const { Num, User } = require('../db/models')

class NumService {
	static async getAll() {
		return await Num.findAll()
	}

	static async getById(id) {
		return await Num.findOne({
			where: { id },
			include: [{ model: User }],
		})
	}

	static async create(data) {
		return await Num.create(data)
	}

	static async update(id, updates) {
		try {
			const num = await Num.findByPk(id)
			if (!num) throw new Error('Num Not found')
			await num.update(updates)
			return num
		} catch (error) {
			console.error('Error in update:', error)
			throw error
		}
	}

	static async delete(id) {
		const num = await this.getById(id)
		if (num) await num.destroy()
		return num
	}
}

module.exports = NumService
