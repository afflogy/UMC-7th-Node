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
            name: { type: "string", example: "서브웨이" },
            storeNum: { type: "string", example: "02-436-0000" },
            region: { type: "string", example: "서울" },
            storeAddress: { type: "string", example: "노해로 654-2" } }
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
                name: { type: "string", example: "서브웨이" },
                storeNum: { type: "string", example: "02-436-0000" },
                region: { type: "string", example: "서울" },
                storeAddress: { type: "string", example: "노해로 654-2" } }
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
