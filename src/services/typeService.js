import typeRepository from "../repositories/typeRepository.js";
import FailedResponse from "../utils/enumResponse";

class TypeService {
  createType = async (typeData) => {
    const newType = await typeRepository.insert(typeData);
    return newType;
  };

  getTypeById = async (id) => {
    const type = await typeRepository.selectById(id);
    if (!type) {
      return FailedResponse.NOT_FOUND;
    }
    return type;
  };

  getAllTypes = async () => {
    return await typeRepository.selectAllTypes();
  };
}

export default new TypeService();
