import { addReview, getReviewById, getUserReview } from "../repositories/review.repository.js";
import { responseFromReview, responseFromReviewList } from "../dtos/review.dto.js";

// 특정 가게 리뷰 작성
export const addReviewService = async (data) => {
  const reviewId = await addReview({
    userId: data.userId,
    storeId: data.storeId,
    title: data.title,
    content: data.content,
    score: data.score,
    image: data.image,
  });

  const review = await getReviewById(reviewId);
  return responseFromReview({ review });
};

// 사용자 리뷰 리스트 조회
export const getUserReviewService = async (userId) => {
  const reviews = await getUserReview(userId);
  return responseFromReviewList({ reviews });
};