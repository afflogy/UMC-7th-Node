import { StatusCodes } from "http-status-codes";
import { addReviewService, getUserReviewService } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

// 가게에 리뷰 생성
export const handleAddReview = async (req, res, next) => {
  console.log("body:", req.body);
  
  try {
    const { storeId } = req.params;
    const reviewData = bodyToReview(req.body, storeId);
    const review = await addReviewService(reviewData);
    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    console.error("Error in handleAddReview:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};


// 사용자 리뷰 리스트 조회
export const handleGetUserReview = async (req, res, next) => {
  console.log("body:", req.body);

  try{
    const { userId } = req.params;
    const result = await getUserReviewService(userId);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Error in handleGetUserReview:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}