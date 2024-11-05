export const bodyToUser = (body) => {
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


export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.category.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};
