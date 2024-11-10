import { addMission,
         getMissionById,
         setOngoingMission,
         getStoreMission } from "../repositories/mission.repository.js";
import { responseFromMission, responseFromMissionList } from "../dtos/mission.dto.js";

// 미션 생성 API
export const addMissionService = async (data) => {
    const missionId = await addMission({
        storeId: data.storeId,
        content: data.content,
        mAmount: data.mAmount,
        mPoint: data.mPoint,
    });
  
    const mission = await getMissionById(missionId);
    return responseFromMission({ mission });
  };

  //미션 도전중으로 변경 API
export const makeMissionOngoingService = async (userId, missionId) => {
  const mission = await setOngoingMission(userId, missionId);
  if (!mission) {
    throw new Error("미션을 도전 중 상태로 설정할 수 없습니다.");
  }

  return responseFromMission({ mission });
};


// 미션 목록 조회
export const getStoreMissionService = async (storeId) => {
  const missions = await getStoreMission(storeId);
  return responseFromMissionList({ missions });
}