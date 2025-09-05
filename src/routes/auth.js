const router = require('express').Router();
const authController = require('../controllers/auth');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided details.
 *     security: [] 
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Test-123
 *               confirmPassword:
 *                 type: string
 *                 example: Test-123
 *               secretQuestion:
 *                 type: string
 *                 example: Quelle est votre couleur préférée ?
 *               secretAnswer:
 *                 type: string
 *                 example: Orange
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request - Invalid input or missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Logs in a user and returns a JWT token.
 *     security: [] 
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Test-123
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *       401:
 *         description: Unauthorized - Email or password incorrect.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', authController.login);

module.exports = router;
