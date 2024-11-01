export const bodyToUser = (body) => {
    const birth_date = new Date(body.birth_date); //생일은 Date로 파싱해서 변환 가능
    
    return {
      name: body.name,
      phone_num: body.phone_num,
      email: body.email,
      password: body.password,
      gender : body.gender,
      birth_date,
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
