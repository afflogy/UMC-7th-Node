import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUserById,
  getUserPreferencByUserId,
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

  if (data.preference && Array.isArray(data.preference)) {
    for (const preference of data.preference) {
      await setPreference(joinUserId, preference);
  }

  const user = await getUserById(joinUserId);
  const preference = await getUserPreferencByUserId(joinUserId);

  return responseFromUser({ user, preference });
  }
};