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

async function createPost(req, res) {

  const userId = req.user.id;
  const { caption } = req.body;

  try {
    
    const post = await prisma.post.create({
      data: {
        caption,
        authorId: userId,
      },
    });

    res.json(post);

  } catch(error) {
    return res.status(500).json({message: 'Internal server error'});
  }
}

async function editPost(req, res) {

  const { caption } = req.body;
  const { postId } = req.params;

  try {
    
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        caption,
      },
    });

    res.json(post);

  } catch(error) {
    return res.status(500).json({message: 'Internal server error'});
  }

}

async function deletePost(req, res) {
  
  const { postId } = req.params;

  try {
    
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.json({message: 'Post deleted'});

  } catch(error) {
    return res.status(500).json({message: 'Internal server error'});
  }

}

module.exports = {
    getAllPosts,
    createPost,
    editPost
}