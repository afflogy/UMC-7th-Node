import { StatusCodes } from "http-status-codes";
import { addMissionService } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

export const handleAddMission = async (req, res, next) => {
    console.log("body:", req.body);
    
    try{
        const{ storeId } = req.params;
        const missionData = bodyToMission(req.body, storeId);
        const mission = await addMissionService(missionData);
        res.status(StatusCodes.OK).json({ result: mission });
    } catch (error) {
        console.error("Error in handleAddMission:", error);
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
}

export const handleOngoingMission = async (req, res) => {
    const { store_id, mission_id } = req.params;
  
    try {
      const mission = await makeMissionOngoingService(store_id, mission_id);
      res.status(StatusCodes.OK).json({ result: mission });
    } catch (error) {
      console.error("Error in handleMakeMissionOngoing:", error);
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };