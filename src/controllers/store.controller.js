import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStoreService } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
/*
  #swagger.summary = '가게 추가 API';
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
    };
  #swagger.responses[201] = {
    description: "가게 추가 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "CREATE" },
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
    };
  #swagger.responses[400] = {
    description: "가게 추가 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "400_S001" },
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

  console.log("가게 추가를 요청했습니다!");
  console.log("body:", req.body);

  const store = await addStoreService(bodyToStore(req.body));
  res.status(StatusCodes.CREATED).create(store)

};
