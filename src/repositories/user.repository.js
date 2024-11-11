import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

export const getUserById = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, categoryId) => {
  const category = await prisma.category.findFirst({ where: {id:categoryId}});

  const uc = await prisma.userCategory.create({data: {userId: userId,categoryId: category.id} });
  return uc;
};

// 사용자 선호 카테고리 반환
export const getUserPreferenceByUserId = async (userId) => {
  const preferences = await prisma.userCategory.findMany({
    select: {
      userId: true,
      categoryId: true,
    },
    where: { userId: userId },
    orderBy: { categoryId: "asc" }
  });

  return preferences;
};
