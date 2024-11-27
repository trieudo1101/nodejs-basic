import typeRepository from "../repositories/typeRepository.js";

class TypeService {
    createType = async (typeData) => {
        const newType = await typeRepository.insert(typeData);
        return newType;
    }
}

export default new TypeService;