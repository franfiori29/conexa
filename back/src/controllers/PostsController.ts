import { RequestHandler } from "express";
import JsonplaceholderService from '../services/JsonplaceholderService';
const JsonPlaceholder = new JsonplaceholderService();

class PostsController {
  static list: RequestHandler = async (req, res) => {
    try {
      const { _limit = 10, _start = 0 } = req.query;
      if (isNaN(+_limit) || isNaN(+_start)) {
        return res.sendStatus(400);
      };
      const { data } = await JsonPlaceholder.getPosts(+_limit, +_start);
      return res.json({ data });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static count: RequestHandler = async (_, res) => {
    try {
      const { data } = await JsonPlaceholder.getPosts();
      return res.json({ count: data.length });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static comments: RequestHandler = async (req, res) => {
    try {
      const { postId } = req.query;

      if (!postId || isNaN(+postId)) {
        return res.sendStatus(400);
      };
      const { data } = await JsonPlaceholder.getPostComments(+postId);
      return res.json({ data });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default PostsController;
