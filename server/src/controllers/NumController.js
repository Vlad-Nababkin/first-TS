const NumService = require("../services/Num.service")
const formatResponse = require("../utils/formatResponse")
const isValidId = require("../utils/isValidId")
const NumValidator = require("../utils/NumValidator")
const reformatId = require("../utils/reformatId")

class NumController {
	static async getAllNums(req, res) {
		try {
			const data = await NumService.getAll()
			res.status(200).json(formatResponse(200, 'Successful', data))
		} catch ({ message }) {
			console.error(message)
			res
				.status(500)
				.json(
					formatResponse(
						500,
						'NumController === Internal server error',
						null,
						message
					)
				)
		}
	}

	static async getNumsById(req, res) {
		const { id } = req.params

		if (!isValidId(id)) {
			return res
				.status(400)
				.json(formatResponse(400, 'NumController === Invalid Num ID'))
		}

		try {
			const num = NumService.getById(id)

			if (!num) {
				return res
					.status(404)
					.json(formatResponse(404, `Num with ${id} not found`))
			}
			res.status(200).json(formatResponse(200, 'Success', num))
		} catch ({ message }) {
			res
				.status(500)
				.json(
					formatResponse(
						500,
						'NumController === Internal server error',
						null,
						message
					)
				)
		}
	}

	static async createNum(req, res) {
		const { id } = res.locals.user
		const { name, number } = req.body

		const { isValid, error } = NumValidator.validate({
			name,
			number,
		})

		if (!isValid) {
			res
				.status(400)
				.json(
					formatResponse(400, 'NumController === Validation error', null, error)
				)
		}

		try {
			const newNum = await NumService.create({
				name,
				number,
				user_id: id,
			})

			if (!newNum) {
				return res
					.status(400)
					.json(
						formatResponse(400, `NumController === Failed to create new Num`)
					)
			}

			res.status(201).json(formatResponse(201, 'success', newNum))
		} catch ({ message }) {
			res
				.status(500)
				.json(
					formatResponse(
						500,
						'NumController === Internal server error',
						null,
						message
					)
				)
		}
	}

	static async updateNum(req, res) {
		const { user } = res.locals
		const { id } = req.params
		const { name, number } = req.body

		if (!isValidId(id)) {
			return res
				.status(400)
				.json(formatResponse(400, 'NumController === Invalid Num ID'))
		}

		const { isValid, error } = NumValidator.validate({
			name,
			number,
		})
		if (!isValid) {
			res
				.status(400)
				.json(
					formatResponse(400, 'NumController === Validation error', null, error)
				)
		}

		try {
			const NumUpdate = await NumService.getById(+id)

			if (NumUpdate.user_id !== user.id) {
				return res
					.status(400)
					.json(
						formatResponse(
							400,
							`No rights to update Num with id ${id}`,
							null,
							`No rights to update Num with id ${id}`
						)
					)
			}

			const updateNum = await NumService.update(+id, {
				name,
				number,
				user_id: user.id,
			})
			res.status(200).json(formatResponse(200, 'Updated', updateNum))
		} catch ({ message }) {
			res
				.status(500)
				.json(
					formatResponse(
						500,
						'NumController === Internal server error',
						null,
						message
					)
				)
		}
	}

	static async deleteNum(req, res) {
		const { id } = req.params
		const { user } = res.locals

		if (!isValidId(id)) {
			return res.status(400).json(formatResponse(400, 'Invalid Num ID'))
		}
		try {
			const NumDelete = await NumService.getById(+id)

			if (NumDelete.user_id !== user.id) {
				return res
					.status(400)
					.json(
						formatResponse(
							400,
							`No rights to delete Num with id ${id}`,
							null,
							`No rights to delete Num with id ${id}`
						)
					)
			}

			const deleteNum = await NumService.delete(reformatId(id))

			if (!deleteNum) {
				return res
					.status(404)
					.json(formatResponse(404, `Num with id ${id} not found`))
			}
			res
				.status(200)
				.json(formatResponse(200, `Num successfully deleted`, deleteNum))
		} catch ({ message }) {
			res
				.status(500)
				.json(
					formatResponse(
						500,
						'NumController === Internal server error',
						null,
						message
					)
				)
		}
	}
}

module.exports = NumController