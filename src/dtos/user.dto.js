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
export const responseFromUser = async ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (pref) => pref.category.group
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};

