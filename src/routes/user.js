const router = require('express').Router();
const userController = require('../controllers/user');
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing user information
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get the current user's information
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.get('/me', authMiddleware, userController.getMyInfos);

/**
 * @swagger
 * /api/user:
 *   put:
 *     summary: Edit the current user's profile (no password change)
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               email:
 *                 type: string
 *                 example: jane.smith@example.com
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/', authMiddleware, userController.editProfile);

/**
 * @swagger
 * /api/user/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: If email sending is enabled, an email is sent. Otherwise, returns the secret question.
 *       404:
 *         description: User not found or no secret question set.
 *       500:
 *         description: Internal server error.
 */
router.post('/forgot-password', userController.forgotPassword);

/**
 * @swagger
 * /api/user/reset-password/{token}:
 *   post:
 *     summary: Reset password via email token
 *     tags:
 *       - User
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmPassword
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewPassword123
 *               confirmPassword:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Invalid token or password mismatch.
 *       500:
 *         description: Internal server error.
 */
router.post('/reset-password/:token', userController.resetPasswordByMail);

/**
 * @swagger
 * /api/user/reset-password-by-secret-question:
 *   post:
 *     summary: Reset password via secret question
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - answer
 *               - password
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               answer:
 *                 type: string
 *                 example: Rex
 *               password:
 *                 type: string
 *                 example: NewPassword123
 *               confirmPassword:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       403:
 *         description: Wrong answer to secret question.
 *       404:
 *         description: User not found.
 *       400:
 *         description: Passwords do not match.
 *       500:
 *         description: Internal server error.
 */
router.post('/reset-password-by-secret-question', userController.resetPasswordBySecretQuestion);

module.exports = router;

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user account (self or admin only)
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User and related data deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User and related data deleted successfully
 *       403:
 *         description: Forbidden - You can only delete your own account unless you are an admin.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authMiddleware, userController.deleteProfile);
