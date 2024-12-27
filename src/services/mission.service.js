import { addMission,
         getMissionById,
         setOngoingMission,
         getStoreMission,
         getUserOngoingMissions } from "../repositories/mission.repository.js";
         
import { responseFromMission,
         responseFromStoreMission,
         responseFromUserMissionList,
         responseFromMissionState } from "../dtos/mission.dto.js";

import { InvalidMission } from "../errors.js"

// 미션 생성 API
export const addMissionService = async (data) => {
  const missionId = await addMission({
      storeId: data.storeId,
      content: data.content,
      mAmount: data.mAmount,
      mPoint: data.mPoint,
  });

  if(!missionId || missionId === null) {
    throw new InvalidMission("미션을 생성할 수 없습니다.", data);
  }

  const missions = await getMissionById(missionId);
  return responseFromMission({ missions });
};


//미션 도전중으로 변경 API
export const makeMissionOngoingService = async (userId, missionId) => {
    const missions = await setOngoingMission(userId, missionId);

    if (!missions) {
      throw new InvalidMission("미션을 이미 도전하고 있습니다.", { userId, missionId });
    }

    return responseFromMissionState({ missions });
};


// 미션 목록 조회
export const getStoreMissionService = async (storeId, cursor, limit) => {
    const missions = await getStoreMission(storeId);

    if(missions.length === 0){
      throw new InvalidMission ("미션이 없습니다.");
    }

  return responseFromStoreMission({ missions });
};

// 진행 중인 미션 조회
export const getUserOngoingMissionService = async(userId, state, cursor, limit) => {
  const ongoingMissions = await getUserOngoingMissions(userId, state);

  if(ongoingMissions.length === 0){
    throw new InvalidMission ("진행 중인 미션이 존재하지 않습니다.");
  }
  return responseFromUserMissionList({ missions: ongoingMissions });
};