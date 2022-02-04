import Router from '@koa/router';
import { register, login } from '@controllers/auth';

const router = new Router({
  prefix: '/api/v1/auth',
});

router.post('/register', register);
router.post('/login', login);

export default router;
