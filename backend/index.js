import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import { Chat } from "./models/ChatModel.js";
import { isAuth } from "./middleware/isAuth.js";
import { User } from "./models/userModel.js";
import { app, server } from "./socket/socket.js";
import path from "path";
import axios from 'axios';

const url = `https://mern-social-3e3m.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(reloadWebsite, interval);

// Load environment variables
dotenv.config();

// Log the values of important environment variables for debugging
console.log("JWT_SEC:", process.env.JWT_SEC); // Log the JWT Secret
console.log("Cloudinary Cloud Name:", process.env.Cloudinary_Cloud_Name); // Log Cloudinary Cloud Name
console.log("Cloudinary API Key:", process.env.Cloudinary_Api); // Log Cloudinary API Key
console.log("Cloudinary Secret:", process.env.Cloudinary_Secret); // Log Cloudinary Secret

cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_Cloud_Name,
  api_key: process.env.Cloudinary_Api,
  api_secret: process.env.Cloudinary_Secret,
});

// Using middlewares
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

// To get all chats of user
app.get("/api/messages/chats", isAuth, async (req, res) => {
  try {
    const chats = await Chat.find({
      users: req.user._id,
    }).populate({
      path: "users",
      select: "name profilePic",
    });

    chats.forEach((e) => {
      e.users = e.users.filter(
        (user) => user._id.toString() !== req.user._id.toString()
      );
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// To get all users
app.get("/api/user/all", isAuth, async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      name: {
        $regex: search,
        $options: "i",
      },
      _id: { $ne: req.user._id },
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Importing routes
import userRoutes from "./routes/userRouter.js";
import authRoutes from "./routes/authRouters.js";
import postRoutes from "./routes/postRouters.js";
import messageRoutes from "./routes/messageRoutes.js";

// Using routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/messages", messageRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
