export const bodyToUser = (body) => {
    //const birth = new Date(body.birth); 생일은 Date로 파싱해서 변환 가능
    
    return {
      user_id: body.user_id,
      user_name: body.user_name,
      password: body.password,
      phone_num: body.phone_num,
      email: body.email,
    };
  };


export const responseFromUser = ({ user, preferences }) => {
  return {
    user_id: user.user_id,
    user_name: user.user_name,
    email: user.email,
    phone_num: user.phone_num,
    preferences: preferences.map((category) => ({
      category_id: category.category_id,
      group: category.group,
    })),
  };
};
