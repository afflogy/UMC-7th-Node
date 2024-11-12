import { addReview, getReviewById, getUserReview } from "../repositories/review.repository.js";
import { responseFromReview, responseFromReviewList } from "../dtos/review.dto.js";
import { InvalidReview } from "../errors.js"

// 특정 가게 리뷰 작성
export const addReviewService = async (data) => {
  try {
    const reviewId = await addReview({
      userId: data.userId,
      storeId: data.storeId,
      title: data.title,
      content: data.content,
      score: data.score,
      image: data.image,
    });

    if (!reviewId) {
      throw new Error("리뷰를 생성할 수 없습니다.");
    }

    const review = await getReviewById(reviewId);
    return responseFromReview({ review });
  } catch (error) {
    console.error(error);
    throw new InvalidReview("리뷰 생성에 실패했습니다.", data);
  }
};

// 사용자 리뷰 리스트 조회
export const getUserReviewService = async (userId) => {
  try{
    const reviews = await getUserReview(userId);

    if(reviews === null){
      throw new Error("리뷰가 없습니다.");
    }
    return responseFromReviewList({ reviews });
  } catch (error) {
    console.error(error);
    throw new InvalidReview("리뷰가 존재하지 않습니다.");
  }
};