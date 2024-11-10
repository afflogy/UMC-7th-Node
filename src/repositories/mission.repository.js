import { prisma } from "../db.config.js";

// 미션 생성 API
export const addMission = async (data) => {
  const store = await prisma.store.findFirst({where: {id: data.storeId}});
  if(!store){
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  const created = await prisma.mission.create({
    data: {
      storeId: store.id,
      content: data.content,
      mAmount: data.mAmount,
      mPoint: data.mPoint
    }
  });
  return created.mission_id;
};

export const getMissionById = async (missionId) => {
  const mission = await prisma.mission.findFirstOrThrow({where: {mission_id: missionId}})
  return mission;
};

//도전 중인 미션 변경 API
export const setOngoingMission = async (userId, missionId) => {
  const existingMission = await prisma.missionState.findFirst({where: {userId: userId, missionId: missionId, missionState: true}});
  
  if (existingMission) {
    return true;
  }

  const updatedMission = await prisma.missionState.update({where: {userId_missionId: {userId: userId, missionId: missionId}}, data: {missionState: true}});
  return updatedMission;
};


// 미션 목록 조회
export const getStoreMission = async (storeId) => {
  const missions = await prisma.mission.findMany({
    where: {
      storeId: storeId
    },
    include: {
      store: {
        select: {
          name: true,
          storeAddress: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return missions;
};

// 사용자가 진행 중인 미션 조회
export const getUserOngoingMissions = async (userId, state) => {
  const missions = await prisma.missionState.findMany({
    where: {
      userId: userId,
      missionState: state
    },
    include: {
      mission: {
        include: {
          store: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      userId: 'desc'
    }
  });

  return missions;
};