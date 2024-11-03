
import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  commentonPost,
  deleteComment,
  deletePost,
  editCaption,
  getAllPosts,
  likeUnlikePost,
  newPost,
} from "../controllers/postControl.js";
import uploadFile from "../middleware/multer.js";

const router = express.Router();

router.post("/new", isAuth, uploadFile, newPost);

router.put("/:id", isAuth, editCaption);
router.delete("/:id", isAuth, deletePost);

router.get("/all", isAuth, getAllPosts);

router.post("/like/:id", isAuth, likeUnlikePost);

router.post("/comment/:id", isAuth, commentonPost);
router.delete("/comment/:id", isAuth, deleteComment);

export default router;
