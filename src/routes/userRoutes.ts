import { Router } from 'express';
import { updateUser, deleteUser, getUser, listUsers } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { roles } from '../utils/roles';

const router = Router();

// router.post('/users', authMiddleware, roleMiddleware([...roles.GENERAL_ADMIN]), createUser);

// router.put('/users/:id', authMiddleware, roleMiddleware([...roles.GENERAL_ADMIN, ...roles.NON_GENERAL_ADMIN]), updateUser);
router.put('/users/:id', updateUser);

// router.delete('/users/:id', authMiddleware, roleMiddleware([...roles.GENERAL_ADMIN]), deleteUser);
router.delete('/users/:id', deleteUser);

// router.get('/users/:id', authMiddleware, getUser);
router.get('/users/:id', getUser);

// router.get('/users',authMiddleware, listUsers);
router.get('/users', listUsers);

export default router;
 