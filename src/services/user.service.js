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
    phoneNum: data.phoneNum,
    email: data.email,
    password: data.password,
    gender : data.gender,
    birthDate : data.birthDate,
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

// 사용자 리뷰 리스트 조회
export const getUserReview = async (userId) => {

  const reviews = await prisma.review.findMany({
    where: {
      user_id: userId
    },
    include: {
      store: {
        select: {
          name: true,
          store_address: true
        }
      },
      user: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return reviews;
}
