import { StatusCodes } from "http-status-codes";
import { addReviewService, getUserReviewService } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

// 가게에 리뷰 생성
export const handleAddReview = async (req, res, next) => {
  console.log("body:", req.body);

    const storeId  = parseInt(req.params.storeId, 10);
    const userId  = parseInt(req.params.userId, 10);
    const reviewData = bodyToReview(req.body, storeId, userId);
    const review = await addReviewService(reviewData);
    res.status(StatusCodes.CREATED).create({ result: review });
};


// 사용자 리뷰 리스트 조회
export const handleGetUserReview = async (req, res, next) => {

  const userId = parseInt(req.params.userId, 10);
  const result = await getUserReviewService(userId);
  res.status(StatusCodes.OK).success(result);
};