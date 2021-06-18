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
      const { data } = await JsonPlaceholder.getPhotos(+_limit, +_start);
      return res.json({ data });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static count: RequestHandler = async (_, res) => {
    try {
      const { data } = await JsonPlaceholder.getPhotos();
      return res.json({ count: data.length });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default PostsController;
