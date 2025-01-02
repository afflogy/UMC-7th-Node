import { addReview, getReviewById, getUserReview } from "../repositories/review.repository.js";
import { responseFromReview, responseFromReviewList } from "../dtos/review.dto.js";
import { InvalidReview } from "../errors.js"

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

  if (!reviewId) {
    throw new InvalidReview("리뷰 생성에 실패했습니다.", data);
  }

  const review = await getReviewById(reviewId);
  return responseFromReview({ review });
};

// 사용자 리뷰 리스트 조회
export const getUserReviewService = async (userId, cursor, limit) => {
    const reviews = await getUserReview(userId, cursor, limit);

    if (!reviews || reviews.length === 0) {
      throw new Error("리뷰가 없습니다.");
    }

    return responseFromReviewList({ reviews });
};