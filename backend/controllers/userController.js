const { prisma } = require('../config/passport');

async function getUsers(req, res) {

    const users = await prisma.user.findMany();

    res.json(users);

}

module.exports = {
    getUsers,
};