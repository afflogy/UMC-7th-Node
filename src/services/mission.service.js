import { setOngoingMission, checkMissionOngoing } from "../repositories/mission.repository.js";
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

  //미션 도전중으로 변경 API
export const makeMissionOngoingService = async (storeId, missionId) => {
  const isOngoing = await checkMissionOngoing(storeId, missionId);
  if (isOngoing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const mission = await setOngoingMission(storeId, missionId);
  if (!mission) {
    throw new Error("미션을 도전 중 상태로 설정할 수 없습니다.");
  }

  return responseFromMission(mission);
};
