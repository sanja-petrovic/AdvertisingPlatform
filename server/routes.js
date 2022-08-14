import 'dotenv/config';
import express from "express";
import UserController from "./controllers/UserController.js";
import AdvertisementController from "./controllers/AdvertisementController.js";
import JwtService from "./services/JwtService.js";

const router = express.Router();
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
router.get('/api/users', UserController.getAll);

router.get('/api/users/:id', UserController.getById);

router.get('/api/usernames/:username', UserController.getByUsername);

router.get('/api/advertisements', AdvertisementController.getAll);

router.get('/api/advertisements/:id', AdvertisementController.getById);

router.post('/api/users', UserController.create);

router.post('/api/advertisements', JwtService.authenticateToken, AdvertisementController.create);

router.post('/api/login', UserController.logIn);

router.delete('/api/advertisements/:id', JwtService.authenticateToken, AdvertisementController.remove);

router.put('/api/advertisements/:id', JwtService.authenticateToken, AdvertisementController.update);

export default router;