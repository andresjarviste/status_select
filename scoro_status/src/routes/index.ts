import express, {Request, Response} from "express";
import StatusController from "../controllers/status";

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/status', async (req: Request, res: Response) => {
    const controller = new StatusController();
    const response = await controller.getStatusData(<string>req.query.filter);
    return res.send(response)
})

export default router
