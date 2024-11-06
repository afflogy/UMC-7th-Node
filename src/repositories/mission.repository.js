import { prisma } from "../db.config.js";

// 미션 생성 API
export const addMission = async (data) => {
  const store = await prisma.store.findFirst({where: {data: data.store_id}});

  const created = await prisma.mission.create({data: data});
  return result.create.mission_id;

};

//도전 중인 미션 변경 API
export const setOngoingMission = async (storeId, missionId) => {
  const existingMission = await prisma.missionstate.findFirst({where: {store_id: storeId, mission_id: missionId, mission_state: 1}});
  
  if (existingMission) {
    return true;
  }

  const updatedMission = await prisma.missionstate.update({where: {store_id_mission_id: {store_id: storeId, mission_id: missionId}}, data: {mission_state: 1}});
  return updatedMission;
};
