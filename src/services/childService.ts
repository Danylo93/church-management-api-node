import { getChildrenByParentId } from '../models/childModel';

export const listChildrenByParent = async (parentId: number) => {
  if (!parentId) {
    throw new Error('O ID do responsável é obrigatório.');
  }

  const children = await getChildrenByParentId(parentId);
  return children;
};
