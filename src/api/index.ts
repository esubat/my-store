import { Router } from "express";
import Store from "./store.api"

const router = Router();

router.use("/stores", Store);

export default router;