const { prisma } = require('../config/passport');

async function getFollowing(req, res) {



}

async function getNotFollowing(req, res) {
    
    try {

        const userId = req.user.id;

        const notFollowing = await prisma.userFollow.findMany({
            where: {
                OR: [
                    { fromUserId: userId },
                    { toUserId: userId }
                ]
            },
            select: {
                fromUserId: true,
                toUserId: true
            }
        });

        const followingIds = notFollowing.map((follow) => {
            return follow.toUserId
        });

        const excludeIds = followingIds.concat(userId);

        const users = await prisma.user.findMany({
            where: {
                id: {
                    notIn: excludeIds
                }
            }
        })

        return res.json(users)
    } catch (error) {
        console.error('Error getting not following users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }



}

module.exports = {
    getFollowing,
    getNotFollowing
}