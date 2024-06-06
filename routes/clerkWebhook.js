import { Router } from "express";
import bodyParser from "body-parser";
import { clerkWebhookHandler } from "../handlers/clerkWebhookHandler.js";

const clerkWebhookRouter = Router();

clerkWebhookRouter.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async function (req, res) {
    try {
      const payload = req.body.toString();
      const headers = req.headers;

      clerkWebhookHandler(payload, headers);

      res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

export default clerkWebhookRouter;
