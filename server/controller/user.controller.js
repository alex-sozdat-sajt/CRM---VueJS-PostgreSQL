const db = require('../db')
class UserController {
    async createUser(req, res) {
        console.log('req.body', req.body)
        const { name, surname } = req.body
        console.log(name, surname)
        const newPerson = await db.query(`INSERT INTO person (name, surname) VALUES($1, $2) RETURNING *`, [name, surname])
        res.json(newPerson.rows[0])

    }
    async getUsers(req, res) {
        const users = await db.query(`SELECT * FROM person`)
        res.json(users.rows)

    }
    async getOneUser(req, res) {
        const userId = req.params.id
        const user = await db.query(`SELECT * FROM person WHERE id = $1`, [userId])
        res.json(user.rows[0])

    }
    async updateUser(req, res) {
        const { id, name, surname } = req.body
        const user = await db.query(`UPDATE person set name = $1, surname = $2 WHERE id = $3 RETURNING *`, [name, surname, id])
        res.json(user.rows[0])
    }
    async deleteUser(req, res) {
        const userId = req.params.id
        const user = await db.query(`DELETE  FROM person WHERE id = $1`, [userId])
        res.json(user.rows[0])

    }

}
module.exports = new UserController()