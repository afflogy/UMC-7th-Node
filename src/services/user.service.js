import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userRegister = async (data) => {
  const joinUserId = await addUser({
    user_id: data.user_id,
    name: data.name,
    password: data.password,
    phone_num: data.phone_num,
    email: data.email,
    gender : data.gender,
    address : data.address,
    birth_date : data.birth_date
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  if (data.preferences && Array.isArray(data.preferences)) {
    for (const preference of data.preferences) {
      await setPreference(joinUserId, preference);
    }
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};