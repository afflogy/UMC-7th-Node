import { StatusCodes } from "http-status-codes";
import { addMissionService,
         makeMissionOngoingService,
         getStoreMissionService,
         getUserOngoingMissionService } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

// 가게에 미션 생성
export const handleAddMission = async (req, res, next) => {
    /*
  #swagger.summary = '미션 생성 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            content: { type: "string", example: "서브웨이에서 1만원이상 결제" },
            mPoint: { type: "number", example: 500 },
            mAmount: { type: "number", example: 10000 } }
          } 
        }
      }
    };
  #swagger.responses[201] = {
    description: "미션 생성 성공 응답",
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
    description: "미션 생성 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "400_R001" },
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

  try{
    console.log("body:", req.body);
    
    const storeId = parseInt(req.params.storeId, 10);
    const missionData = bodyToMission(req.body, storeId);
    const mission = await addMissionService(missionData);
    res.status(StatusCodes.CREATED).create({ result: mission });
  } catch (err) {
    next(err);
  }
}

// 미션을 도전중으로 변경
export const handleOngoingMission = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const missionId = parseInt(req.params.missionId, 10);
  const mission = await makeMissionOngoingService(userId, missionId);
  res.status(StatusCodes.OK).success({ result: mission });
};

// 특정 가게 미션 조회
export const handleGetStoreMission = async (req, res) => {
  const storeId = parseInt(req.params.storeId, 10);
  const result = await getStoreMissionService(storeId);
  res.status(StatusCodes.OK).success(result);
}


// 사용자 진행 중 미션 조회
export const handleGetUserOngoingMission = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const state = req.params.state === 'true' || req.params.state === '1';
    const result = await getUserOngoingMissionService(userId, state);
    res.status(StatusCodes.OK).success(result);
};