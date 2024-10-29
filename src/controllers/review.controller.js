import { StatusCodes } from "http-status-codes";
import { addReviewService } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const handleAddReview = async (req, res, next) => {
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
