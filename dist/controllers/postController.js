"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new Post_1.default(Object.assign(Object.assign({}, req.body), { author: req.user._id }));
        yield post.save();
        res.send("Post created");
    }
    catch (error) {
        res.status(500).send("Server error");
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find().populate("author", "username");
        res.json(posts);
    }
    catch (error) {
        res.status(500).send("Server error");
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id).populate("author", "username");
        if (!post)
            return res.status(404).send("Post not found");
        res.json(post);
    }
    catch (error) {
        res.status(500).send("Server error");
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        // if (post?.author.toString() !== req.user._id && req.user.role !== "admin") {
        //   return res.status(403).send("Access denied");
        // }
        if ((post === null || post === void 0 ? void 0 : post.author.toString()) !== req.user._id) {
            return res.status(403).send("Access denied");
        }
        yield Post_1.default.findByIdAndUpdate(req.params.id, req.body);
        res.send("Post updated");
    }
    catch (error) {
        res.status(500).send("Server error");
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        console.log((post === null || post === void 0 ? void 0 : post.author.toString()) !== req.user._id);
        // if (post?.author.toString() !== req.user._id && req.user.role !== "admin") {
        //   return res.status(403).send("Access denied");
        // }
        if ((post === null || post === void 0 ? void 0 : post.author.toString()) !== req.user._id) {
            return res.status(403).send("Access denied");
        }
        yield Post_1.default.findByIdAndDelete(req.params.id);
        res.send("Post deleted");
    }
    catch (error) {
        res.status(500).send("Server error");
    }
});
exports.deletePost = deletePost;
