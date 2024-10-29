export const bodyToUser = (body) => {
    const birth_date = new Date(body.birth_date); //생일은 Date로 파싱해서 변환 가능
    
    return {
      user_id: body.user_id,
      name: body.name,
      password: body.password,
      phone_num: body.phone_num,
      email: body.email,
      gender : body.gender,
      address : body.address || "",
      birth_date,
      preferences: body.preferences,
    };
  };


export const responseFromUser = ({ user, preferences }) => {

  const userData = user[0];

  // preferences의 category_id를 한글 카테고리명으로 매핑
  const categoryMapping = {
    1: "한식",
    2: "중식",
    3: "일식",
    4: "양식",
    5: "치킨",
    6: "피자",
    7: "분식",
    8: "디저트",
    9: "족발/보쌈",
    10: "야식"
  };

  const preferCategory = preferences.map(pref => categoryMapping[pref.category_id]);

  return {
    result: {
      email: userData.email,
      name: userData.name,
      phone_num: userData.phone_num,
      gender: userData.gender,
      address: userData.address,
      birth_date: userData.birth_date,
      preferCategory
    }
  };
};
