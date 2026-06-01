import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  getAllChats,
  createNewChat,
  deleteChat,
  sendMessage,
  getAllMessages,
  renameChat,
} from "../controllers/chatsController.js";

const router = express.Router();

// get all chats by user
router.get("/", verifyToken, getAllChats);

// create a chat
router.post("/", verifyToken, createNewChat);

// delete a chat
router.delete("/:id", verifyToken, deleteChat);

// rename a chat
router.patch("/:id", renameChat);

// send a message
// send a message
router.post("/:id/message", verifyToken, sendMessage);

// get all message by chat id
router.get("/:id/messages", verifyToken, getAllMessages);

export default router;
