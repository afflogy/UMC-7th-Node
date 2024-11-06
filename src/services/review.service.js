import { addReview, getReviewById } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const addReviewService = async (data) => {
  const reviewId = await addReview({
    user_id: data.user_id,
    store_id: data.store_id,
    title: data.title,
    content: data.content,
    score: data.score,
    image: data.image,
  });

  const review = await getReviewById(reviewId);
  return responseFromReview({ review });
};
