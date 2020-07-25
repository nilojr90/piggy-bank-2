import AppError from '../errors/AppError';

import { getRepository } from 'typeorm';
import Category from '../models/Category';


class CreateCategoryService {
  public async execute(title: string): Promise<Category> {

    const categoryRepository = getRepository(Category);
    let categoryExist = await categoryRepository.findOne(
      { title }
    );

    if (!categoryExist) {
      const newCategory = await categoryRepository.create({
        title
      });
      categoryRepository.save(newCategory);
      categoryExist = newCategory;
    }
      return categoryExist;
  }
}

export default CreateCategoryService;
