export const bodyToUser = ( body ) => {
    return {
      name: body.name,
      phoneNum: body.phoneNum,
      email: body.email,
      password: body.password,
      gender : body.gender,
      birthDate : body.birthDate,
      address : body.address || "",
      preference: body.preference,
    };
  };


// 사용자 선호 카테고리 반환
export const getUserPreferenceByUserId = async (userId) => {
  const preferences = await prisma.userCategory.findMany({
    where: { userId: userId },
    include: {
      category: true,
    },
    orderBy: { categoryId: "asc" },
  });

  return preferences;
};

