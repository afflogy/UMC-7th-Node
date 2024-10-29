import { checkStoreExists, addMission } from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

export const addMissionService = async (data) => {
    const storeExists = await checkStoreExists(data.store_id);
    if (!storeExists) {
      throw new Error("존재하지 않는 가게입니다.");
    }
  
    const missionId = await addMission({
        content: data.content,
        m_amount: data.m_amount,
        m_point: data.m_point,
    });
  
    const mission = await getMissionById(missionId);
    return responseFromMission({ mission });
  };