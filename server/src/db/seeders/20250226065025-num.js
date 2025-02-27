'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Nums',
			[
				{
					name: 'Tatarin CO',
					number: '7(962)565-71-21',
          user_id: 1,
				},
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Nums', null, {})
	},
}
