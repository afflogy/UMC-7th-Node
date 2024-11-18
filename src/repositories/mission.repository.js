import { prisma } from "../db.config.js";

// 미션 생성 API
export const addMission = async (data) => {
  const stores = await prisma.store.findFirst({where: {id: data.storeId}});

  if(stores){
    return null;
  }

  const created = await prisma.mission.create({
    data: {
      storeId: stores.id,
      content: data.content,
      mAmount: data.mAmount,
      mPoint: data.mPoint
    }
  });
  return created.id;
};

export const getMissionById = async (missionId) => {
  const missions = await prisma.mission.findFirstOrThrow({where: {id: missionId}})
  return missions;
};

//도전 중인 미션 변경 API
export const setOngoingMission = async (userId, missionId) => {
  const existingMission = await prisma.missionState.findFirst({
    where: { userId: userId, missionId: missionId, missionState: false },
  });

  if (!existingMission) {
    const createdMission = await prisma.missionState.create({
      data: { userId, missionId, missionState: true },
    });
    return createdMission;
  } else {
    return existingMission;
  }
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