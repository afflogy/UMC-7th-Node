import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUserById,
  getUserPreferenceByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userRegister = async (data) => {
  const joinUserId = await addUser({
    name: data.name,
    phone_num: data.phone_num,
    email: data.email,
    password: data.password,
    gender : data.gender,
    birth_date : data.birth_date,
    address : data.address,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  if (data.preferences && Array.isArray(data.preferences)) {
    for (const preference of data.preferences) {
      await setPreference(joinUserId, preference);
  }

  const user = await getUserById(joinUserId);
  const preference = await getUserPreferenceByUserId(joinUserId);

  return responseFromUser({ user, preference });
  }
};