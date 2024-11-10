import { StatusCodes } from "http-status-codes";
import { addMissionService,
         makeMissionOngoingService,
         getStoreMissionService,
         getUserOngoingMissionService } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

// 가게에 미션 생성
export const handleAddMission = async (req, res, next) => {
    console.log("body:", req.body);
    
    try{
        const storeId = parseInt(req.params.storeId, 10);
        const missionData = bodyToMission(req.body, storeId);
        const mission = await addMissionService(missionData);
        res.status(StatusCodes.OK).json({ result: mission });
    } catch (error) {
        console.error("Error in handleAddMission:", error);
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

// 미션을 도전중으로 변경
export const handleOngoingMission = async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const missionId = parseInt(req.params.missionId, 10);
      const mission = await makeMissionOngoingService(userId, missionId);
      res.status(StatusCodes.OK).json({ result: mission });
    } catch (error) {
      console.error("Error in handleMakeMissionOngoing:", error);
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// 특정 가게 미션 조회
export const handleGetStoreMission = async (req, res) => {
  try{
    const storeId = parseInt(req.params.storeId, 10);
    const result = await getStoreMissionService(storeId);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Error in handleGetStoreMission:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}


// 사용자 진행 중 미션 조회
export const handleGetUserOngoingMission = async (req, res) => {
  try{
    const userId = parseInt(req.params.userId, 10);
    const state = req.params.state === 'true' || req.params.state === '1';
    const result = await getUserOngoingMissionService(userId, state);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error("Error in handleGetUserOngoingMission:", error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.message
    });
  }
};