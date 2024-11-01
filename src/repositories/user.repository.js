import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.user_id;
};

export const getUserById = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { user_id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, categoryId) => {
  await prisma.userCategory.create({
    data: {
      user_Id: userId,
      category_Id: categoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferenceByUserId = async (userId) => {
  const preferences = await prisma.userCategory.findMany({
    select: {
      user_Id: true,
      category_Id: true,
    },
    where: { user_Id: userId },
    orderBy: { category_Id: "asc" },
  });

  return preferences;
};
