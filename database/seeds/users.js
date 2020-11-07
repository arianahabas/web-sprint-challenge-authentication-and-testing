exports.seed = async function(knex) {
	await knex("users").truncate()
	await knex("users").insert([
		{ username: "nick", password:'password' },
		{ username: "ben", password:'password' },
		{ username: "kaylie" , password:'password'},
		{ username: "devon" , password:'password'},
	])
}
