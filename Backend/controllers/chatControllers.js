const { response } = require("express");
const chatModel = require("../models/chatModel");
const chatServices = require("../Services/chatServices");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

module.exports.createChat = async (req, res, next) => {
  const { message, chatId, userId } = req.body;
  let chat;
  if (!chatId) {
    chat = await chatModel.create({
      messages: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    const user = await userModel.findById(userId);

    user.chats.push(chat._id);

    await user.save();
  } else {
    chat = await chatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    chat.messages.push({
      role: "user",
      parts: [{ text: message }],
    });
    chat.save();
  }

  // console.log(chat.messages[0]);

  const botResponce = await chatServices.getBotResponse(chat.messages,message);

  chat.messages.push({
    role: "model",
    parts: [{ text: botResponce }],
  });

  chat.save();

  res.status(200).json({
    response: botResponce,
    chatId: chat._id,
  });
};

module.exports.loadChat = async (req, res, next) => {
  const chatId = req.params.id;

  // ✅ Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(400).json({ message: "Invalid Chat ID" });
  }

  try {
    const chat = await chatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.getChatSummary = async (req, res, next) => {
  const { chatIds } = req.body;

  // ✅ Validate input
  if (!Array.isArray(chatIds) || chatIds.length === 0) {
    return res
      .status(400)
      .json({ message: "chatIds must be a non-empty array" });
  }

  // ✅ Filter out invalid Mongo IDs
  const validIds = chatIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
  if (validIds.length === 0) {
    return res.status(400).json({ message: "No valid chat IDs provided" });
  }

  try {
    // ✅ Fetch all valid chats in one query
    const chats = await chatModel.find({ _id: { $in: validIds } });

    const summaries = {};

    // ✅ Process each chat
    await Promise.all(
      chats.map(async (chat) => {
        try {
          const summary = await chatServices.getSummary(chat.messages);
          summaries[chat._id] = summary || "NA";
        } catch (err) {
          console.error(`Failed to summarize chat ${chat._id}:`, err);
          summaries[chat._id] = "Error";
        }
      })
    );

    res.status(200).json(summaries);
  } catch (err) {
    console.error("Bulk summary error:", err);
    res.status(500).json({ message: "Server error during bulk summarization" });
  }
};
