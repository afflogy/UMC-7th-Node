import { responseFromUser } from "./user.dto";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userRegister = async (data) => {
  const joinUserId = await addUser({
    user_id: data.user_id,
    user_name: data.user_name,
    password: data.password,
    phone_num: data.phone_num,
    email: data.email,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 아이디입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};