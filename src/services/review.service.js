import { checkStoreExists, addReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const addReviewService = async (data) => {
  const storeExists = await checkStoreExists(data.store_id);
  if (!storeExists) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const reviewId = await addReview({
    user_id: data.user_id,
    store_id: data.store_id,
    title: data.title,
    content: data.content,
    score: data.score,
    image: data.image,
  });

  return responseFromReview({ data });
};
