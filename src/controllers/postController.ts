import { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (req: Request | any, res: Response) => {
  try {
    const post = new Post({ ...req.body, author: req.user._id });
    await post.save();
    res.send("Post created");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) return res.status(404).send("Post not found");
    res.json(post);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const updatePost = async (req: any, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    // if (post?.author.toString() !== req.user._id && req.user.role !== "admin") {
    //   return res.status(403).send("Access denied");
    // }
    if (post?.author.toString() !== req.user._id) {
      return res.status(403).send("Access denied");
    }
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.send("Post updated");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const deletePost = async (req: any, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post?.author.toString() !== req.user._id);
    // if (post?.author.toString() !== req.user._id && req.user.role !== "admin") {
    //   return res.status(403).send("Access denied");
    // }
    if (post?.author.toString() !== req.user._id) {
      return res.status(403).send("Access denied");
    }
    await Post.findByIdAndDelete(req.params.id);
    res.send("Post deleted");
  } catch (error) {
    res.status(500).send("Server error");
  }
};
