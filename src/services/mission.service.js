import { addMission,
         getMissionById,
         setOngoingMission,
         getStoreMission,
         getUserOngoingMissions } from "../repositories/mission.repository.js";
         
import { responseFromMission,
         responseFromStoreMission,
         responseFromUserMissionList } from "../dtos/mission.dto.js";

import { InvalidMission } from "../errors.js"

// 미션 생성 API
export const addMissionService = async (data) => {
  try{
    const missionId = await addMission({
        storeId: data.storeId,
        content: data.content,
        mAmount: data.mAmount,
        mPoint: data.mPoint,
    });

    if(!missionId) {
      throw new InvalidMission("미션을 생성할 수 없습니다.", data);
    }

    const mission = await getMissionById(missionId);
    return responseFromMission({ mission });
  } catch(error) {
    console.error(error);
    throw error;
  }
};

  //미션 도전중으로 변경 API
export const makeMissionOngoingService = async (userId, missionId) => {
  try {
    const mission = await setOngoingMission(userId, missionId);

    if (!mission) {
      throw new InvalidMission("미션을 도전 중 상태로 설정할 수 없습니다.", { userId, missionId });
    }

    return responseFromMission({ mission });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// 미션 목록 조회
export const getStoreMissionService = async (storeId) => {
  try {
    const missions = await getStoreMission(storeId);

    if(!missions || missions.length === 0){
      throw new InvalidMission ("미션이 없습니다.");
    }

  return responseFromStoreMission({ missions });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 진행 중인 미션 조회
export const getUserOngoingMissionService = async(userId, state) => {
  try{
    const ongoingMissions = await getUserOngoingMissions(userId, state);

    if(!ongoingMissions || ongoingMissions.length === 0){
      throw new InvalidMission ("진행 중인 미션이 존재하지 않습니다.");
    }
  return responseFromUserMissionList({ missions: ongoingMissions });
  } catch (error) {
    console.error(error);
    throw error;
  }
};