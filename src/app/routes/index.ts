import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { BikeRoutes } from '../modules/bike/bike.route';
import { RentRoutes } from '../modules/rent/rent.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: RentRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
