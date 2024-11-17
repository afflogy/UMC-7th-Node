import { StatusCodes } from "http-status-codes";
import { addReviewService, getUserReviewService } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

// 가게에 리뷰 생성 API
export const handleAddReview = async (req, res, next) => {
  /*
  #swagger.summary = '리뷰 생성 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: { type: "string", example: "맛있어요." },
            content: { type: "string", example: "별점 5점" },
            score: { type: "number", example: 4.5 } }
          } 
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "회원 가입 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                title: {type: "string" },
                content: { type: "string" },
                score: { type: "number" } }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "리뷰 생성 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U003" },
                reason: { type: "string" },
                data: { type: "object" }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
*/
  console.log("body:", req.body);

    const storeId  = parseInt(req.params.storeId, 10);
    const userId  = parseInt(req.params.userId, 10);
    const reviewData = bodyToReview(req.body, storeId, userId);
    const review = await addReviewService(reviewData);
    res.status(StatusCodes.CREATED).create({ result: review });
};


// 사용자 리뷰 리스트 조회 API
export const handleGetUserReview = async (req, res, next) => {
    /*
    #swagger.summary = '사용자 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "사용자 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        reviewId: { type: "number" },
                        store: { type: "object", properties: { name: { type: "string" }, storeAddress: {type: "string"} } },
                        user: { type: "object", properties: { name: { type: "string" } } },
                        title: { type: "string" },
                        content: { type: "string" },
                        score: { type: "number"}
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */

  const userId = parseInt(req.params.userId, 10);
  const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : null;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  const result = await getUserReviewService(userId, cursor, limit);
  res.status(StatusCodes.OK).success(result);
};