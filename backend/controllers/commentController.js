async function createComment(req, res) {
    const { text, postId } = req.body;
    console.log(req.user);
    const userId = req.user.id;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }

        const comment = await prisma.comment.create({
            data: {
                text,
                post: {
                    connect: {
                        id: postId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
            }
        }});

        res.json(comment);

    } catch(error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    createComment
}