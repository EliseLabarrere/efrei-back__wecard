const router = require('express').Router();
const wewardController = require('../controllers/weward');
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Weward Chapters
 *   description: API for managing Weward chapters and user progress
 */

/**
 * @swagger
 * /api/weward/user-chapters/{userId}:
 *   get:
 *     summary: Get all user_weward_chapters for any user by ID
 *     tags:
 *       - Weward Chapters
 *     security: [] 
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID of the user to fetch chapters for
 *     responses:
 *       200:
 *         description: List of user_weward_chapters for the user
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   idUser: 1
 *                   idWewardChapter: 1
 *                   card1: 0
 *                   card2: 0
 *                   card3: 0
 *                   card4: 0
 *                   card5: 0
 *                   card6: 0
 *                   card7: 0
 *                   card8: 0
 *                   card9: 0
 *                   WewardChapter:
 *                     id: 1
 *                     en: "Chapter EN"
 *                     fr: "Chapitre FR"
 *                     isVintage: false
 *                     isEphemeral: false
 */
router.get('/user-chapters/:userId', wewardController.getUserChapters);

/**
 * @swagger
 * /api/weward/chapters:
 *   get:
 *     summary: Get all Weward chapters
 *     tags:
 *       - Weward Chapters
 *     security: [] 
 *     responses:
 *       200:
 *         description: List of all Weward chapters
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   en: "Chapter EN"
 *                   fr: "Chapitre FR"
 *                   isVintage: false
 *                   isEphemeral: false
 *                 - id: 2
 *                   en: "Another EN"
 *                   fr: "Autre FR"
 *                   isVintage: true
 *                   isEphemeral: false
 */
router.get('/chapters', wewardController.getAllChapters);


/**
 * @swagger
 * /api/weward/my-chapters:
 *   post:
 *     summary: Update user's cards for a Weward chapter
 *     tags:
 *       - Weward Chapters
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idWewardChapter
 *               - cards
 *             properties:
 *               idWewardChapter:
 *                 type: integer
 *                 example: 1
 *               cards:
 *                 type: object
 *                 example:
 *                   card1: 1
 *                   card2: 0
 *                   card3: 1
 *                   card4: 0
 *                   card5: 0
 *                   card6: 0
 *                   card7: 0
 *                   card8: 0
 *                   card9: 0
 *     responses:
 *       200:
 *         description: Updated user_weward_chapter
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 idUser: 1
 *                 idWewardChapter: 1
 *                 card1: 1
 *                 card2: 0
 *                 card3: 1
 *                 card4: 0
 *                 card5: 0
 *                 card6: 0
 *                 card7: 0
 *                 card8: 0
 *                 card9: 0
 */
router.post('/my-chapters', authMiddleware, wewardController.updateUserChapter);

/**
 * @swagger
 * /api/weward/add-chapter:
 *   post:
 *     summary: Admin adds a new Weward chapter and initializes it for all users
 *     tags:
 *       - Weward Chapters
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - en
 *               - fr
 *             properties:
 *               en:
 *                 type: string
 *                 example: "Chapter EN"
 *               fr:
 *                 type: string
 *                 example: "Chapitre FR"
 *               isVintage:
 *                 type: boolean
 *                 example: false
 *               isEphemeral:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Chapter created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 2
 *                 en: "Chapter EN"
 *                 fr: "Chapitre FR"
 *                 isVintage: false
 *                 isEphemeral: false
 */
router.post('/add-chapter', authMiddleware, wewardController.addWewardChapter);

/**
 * @swagger
 * /api/weward/update-chapter/{id}:
 *   post:
 *     summary: Admin updates a Weward chapter by ID (en/fr)
 *     tags:
 *       - Weward Chapters
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the chapter to update
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               en:
 *                 type: string
 *                 example: "Updated Chapter EN"
 *               fr:
 *                 type: string
 *                 example: "Chapitre FR mis à jour"
 *     responses:
 *       200:
 *         description: Chapter updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 en: "Updated Chapter EN"
 *                 fr: "Chapitre FR mis à jour"
 *                 isVintage: false
 *                 isEphemeral: false
 */
router.post('/update-chapter/:id', authMiddleware, wewardController.updateWewardChapter);

/**
 * @swagger
 * /api/weward/users-collection:
 *   get:
 *     summary: Get collection stats of 9 random users
 *     tags:
 *       - Weward Chapters
 *     security: []
 *     responses:
 *       200:
 *         description: Random user stats
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - idUser: 1
 *                   firstname: "John"
 *                   totalCards: 27
 *                   ownedCards: 15
 *                   totalChapter: 3
 *                   ownedCompletedChapter: 1
 */
router.get('/users-collection', wewardController.getRandomUserCollections);

/**
 * @swagger
 * /api/weward/user-collection/{userId}:
 *   get:
 *     summary: Get collection stats of a user by ID
 *     tags:
 *       - Weward Chapters
 *     security: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User stats
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 idUser: 1
 *                 firstname: "John"
 *                 totalCards: 27
 *                 ownedCards: 15
 *                 totalChapter: 3
 *                 ownedCompletedChapter: 1
 */
router.get('/user-collection/:userId', wewardController.getUserCollectionById);

module.exports = router;
