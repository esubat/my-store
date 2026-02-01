import { Router } from "express";
import { getStore, getStores, registerStore } from "../controllers/store.controller";


const router = Router();


/**
 * @swagger
 * /api/stores/register:
 *   post:
 *     summary: Register a new store
 *     tags: [Store]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   password:
 *                     type: string
 *               store:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *     responses:
 *       201:
 *         description: Store created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/register", registerStore);


/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Get all stores
 *     tags: [Store]
 *     responses:
 *       200:
 *         description: Stores retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", getStores);

/**
 * @swagger
 * /api/stores/{id}:
 *   get:
 *     summary: Get a store by ID
 *     tags: [Store]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the store to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store retrieved successfully
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getStore);

export default router;