import { Router } from "express";
import Store from "./store.api"

const router = Router();

router.use("/store", Store);

export default router;