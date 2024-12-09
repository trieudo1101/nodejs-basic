import typeService from "../services/typeService.js";

const postType = async (req, res, next) => {
  try {
    const result = await typeService.createType(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getTypes = async (req, res, next) => {
  try {
    const result = await typeService.getTypes();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { postType, getTypes };
