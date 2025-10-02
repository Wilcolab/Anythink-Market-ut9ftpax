
/**
 * @file Comments API routes
 * @module routes/api/comments
 *
 * Provides endpoints for retrieving and deleting comments.
 */

const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

/**
 * GET /post/:postId
 * @summary Get all comments for a specific post
 * @param {string} postId - The ID of the post
 * @returns {Array<Comment>} 200 - List of comments
 * @returns {object} 500 - Error message
 */
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

/**
 * GET /:commentId
 * @summary Get a comment by its ID
 * @param {string} commentId - The ID of the comment
 * @returns {Comment} 200 - The comment object
 * @returns {object} 404 - Comment not found
 * @returns {object} 500 - Error message
 */
router.get("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comment" });
  }
});

/**
 * DELETE /:commentId
 * @summary Delete a comment by its ID
 * @param {string} commentId - The ID of the comment
 * @returns {object} 200 - Success message
 * @returns {object} 404 - Comment not found
 * @returns {object} 500 - Error message
 */
router.delete("/:commentId", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});