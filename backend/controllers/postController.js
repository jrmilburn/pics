const { prisma } = require('../config/passport');

async function getAllPosts(req, res) {

    try {

        const posts = await prisma.post.findMany({
            take: 20,
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              author: true,
              likes: true,
              comments: {
                take: 5,
                orderBy: {
                  createdAt: 'desc',
                },
                include: {
                  author: true,
                  likes: true,
                },
              },
            },
          });
          

        res.json(posts);

    } catch(error) {
        return res.status(500).json({message: 'Internal server error'});
    }

}

module.exports = {
    getAllPosts
}