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
                content: { type: "string", example: "서브웨이에서 1만원이상 결제" },
                mPoint: { type: "number", example: 500 },
                mAmount: { type: "number", example: 10000 } }
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
                errorCode: { type: "string", example: "400_M001" },
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
    
    const storeId = parseInt(req.params.storeId, 10);
    const missionData = bodyToMission(req.body, storeId);
    const mission = await addMissionService(missionData);
    res.status(StatusCodes.CREATED).create({ result: mission });
};

// 미션을 도전중으로 변경
export const handleOngoingMission = async (req, res) => {
      /*
  #swagger.summary = '미션 도전중으로 변경 API';
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            userId: { type: "number", example: 1 },
            missionState: { type: "boolean", example: true }
          } 
        }
      }
    };
  #swagger.responses[200] = {
    description: "미션 도전중으로 변경 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "Success" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object"
              }
            }
          }
        }
      }
    };
  #swagger.responses[400] = {
    description: "미션 도전중으로 변경 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "400_M001" },
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
 
  const userId = parseInt(req.params.userId, 10);
  const missionId = parseInt(req.params.missionId, 10);
  const mission = await makeMissionOngoingService(userId, missionId);
  res.status(StatusCodes.OK).success({ result: mission });
};

// 특정 가게 미션 조회
export const handleGetStoreMission = async (req, res) => {
/*
  #swagger.summary = '특정 가게 미션 조회 API';
  #swagger.responses[200] = {
    description: "특정 가게 미션 조회 성공 응답",
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
                      missionId: { type: "number", example: 1 },
                      content: { type: "string", example: "Complete a task" },
                      mAmount: { type: "number", example: 10 },
                      mPoint: { type: "number", example: 50 },
                      createdAt: { type: "string", format: "date-time", example: "2024-11-07T12:34:56Z" },
                      store: {
                        type: "object",
                        properties: {
                          name: { type: "string", example: "Example Store" },
                          storeAddress: { type: "string", example: "123 Main St" }
                        }
                      }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", nullable: true, example: null }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
*/

  const storeId = parseInt(req.params.storeId, 10);
  const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : null;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  const result = await getStoreMissionService(storeId, cursor, limit);
  res.status(StatusCodes.OK).success(result);
};


// 사용자 진행 중 미션 조회
export const handleGetUserOngoingMission = async (req, res) => {
/*
  #swagger.summary = '사용자 진행 중 미션 조회 API';
  #swagger.responses[200] = {
    description: "사용자 진행 중 미션 조회 성공 응답",
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
                      missionId: { type: "number", example: 1 },
                      userId: { type: "number", example: 42 },
                      store: { 
                        type: "object", 
                        properties: { 
                          name: { type: "string", example: "Example Store" } 
                        } 
                      },
                      content: { type: "string", example: "Complete 5 purchases" },
                      mAmount: { type: "number", example: 5 },
                      mPoint: { type: "number", example: 50 },
                      missionState: { type: "boolean", example: true },
                      createdAt: { type: "string", example: "2024-11-07T12:34:56Z" },
                      updatedAt: { type: "string", example: "2024-11-07T14:12:45Z" }
                    }
                  }
                },
                pagination: { 
                  type: "object", 
                  properties: { 
                    cursor: { type: "number", nullable: true, example: null } 
                  } 
                }
              }
            }
          }
        }
      }
    }
  };
*/

  const userId = parseInt(req.params.userId, 10);
  const state = req.params.state === 'true' || req.params.state === '1';
  const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : null;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  const result = await getUserOngoingMissionService(userId, state, cursor, limit);
  res.status(StatusCodes.OK).success(result);
};