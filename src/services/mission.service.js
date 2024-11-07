import { addMission,
         setOngoingMission } from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

// 미션 생성 API
export const addMissionService = async (data) => {
    const missionId = await addMission({
        content: data.content,
        mAmount: data.mAmount,
        mPoint: data.mPoint,
    });
  
    const mission = await getMissionById(missionId);
    return responseFromMission({ mission });
  };

  //미션 도전중으로 변경 API
export const makeMissionOngoingService = async (storeId, missionId) => {
  const mission = await setOngoingMission(storeId, missionId);
  if (!mission) {
    throw new Error("미션을 도전 중 상태로 설정할 수 없습니다.");
  }

  return responseFromMission(mission);
};
