import typeService from "../services/typeService.js";

class TypeController {
  postType = async (req, res, next) => {
    try {
      const result = await typeService.createType(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default new TypeController();
