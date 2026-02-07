import { Router } from "express";
import Store from "./store.api";
import Auth from "./auth.api";

const router = Router();

router.use("/stores", Store);
router.use("/auth", Auth);

export default router;