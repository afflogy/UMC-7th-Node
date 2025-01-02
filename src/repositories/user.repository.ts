import { User, Category, UserCategory } from "@prisma/client";
import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data: {
  email: string;
  password: string;
  name: string;
  gender: number;
  birthDate: string;
  address: string;
}): Promise<number | null> => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

export const getUserById = async (userId: number): Promise<User> => {
  return prisma.user.findFirstOrThrow({ where: { id: userId } });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, categoryId: number): Promise<UserCategory> => {
  const category = await prisma.category.findFirst({ where: {id:categoryId}});

  if (!category) {
    throw new Error(`Category with ID ${categoryId} does not exist.`);
  }

  const uc = await prisma.userCategory.create({data: {userId: userId,categoryId: category.id} });
  return uc;
};

// 사용자 선호 카테고리 반환
export const getUserPreferenceByUserId = async (
  userId: number
): Promise<{ categoryId: number }[]> => {
  const preferences = await prisma.userCategory.findMany({
    where: { userId: userId },
    include: {
      category: true,
    },
    orderBy: { categoryId: "asc" },
  });

  return preferences;
};
