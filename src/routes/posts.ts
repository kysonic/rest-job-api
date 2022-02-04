import Router from '@koa/router';
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '@controllers/posts';
import authMiddleware from '@middlewares/auth';

const router = new Router({
  prefix: '/api/v1/post',
});

router.use(authMiddleware).get('/', getPosts).post('/', createPost);
router
  .use(authMiddleware)
  .get('/:id', getPost)
  .patch('/:id', updatePost)
  .delete('/:id', deletePost);

export default router;
