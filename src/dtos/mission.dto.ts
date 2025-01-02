import { Store, Mission, User, MissionState } from "@prisma/client";

export const bodyToMission = (body: any, storeId: Store) => {
    return{
        storeId: storeId,
        content: body.content,
        mAmount: body.mAmount,
        mPoint: body.mPoint
    }
};


export const responseFromMission = ({ missions }: { missions: Mission }) => {
    return{
        missionId: missions.id,
        storeId: missions.storeId,
        content: missions.content,
        mAmount: missions.mAmount,
        mPoint: missions.mPoint
    }
};

// 미션을 도전으로 변경 API 반환값
export const responseFromMissionState = ({ missions }: { missions: { missionId: Mission, userId: User, missionState: MissionState }}) => {
    return{
        missionId: missions.missionId,
        userId : missions.userId,
        missionState : missions.missionState
    }
}

// 가게 미션 목록 조회
type MissionWithStore = Mission & {
  store: Store;
};

export const responseFromStoreMission = ({ missions }: { missions: MissionWithStore[] }) => {
    return missions.map(mission => ({
        missionId: mission.id,
        content: mission.content,
        mAmount: mission.mAmount,
        mPoint: mission.mPoint,
        createdAt: mission.createdAt,
        store: {
          name: mission.store.name,
          storeAddress: mission.store.storeAddress
        }
    }));
};

// 사용자 진행미션 조회
type MissionWithAllRelations = Mission & {
    store: Store;
    user: User;
    missionState: MissionState;
  };

export const responseFromUserMissionList = ({ missions }: { missions: MissionWithAllRelations[];
}) => {
    return missions.map(mission => ({
        missionId: mission.id,
        userId: mission.user.id,
        store: {
          name: mission.store.name,
        },
        content: mission.content,
        mAmount: mission.mAmount,
        mPoint: mission.mPoint,
        missionState: mission.missionState,
        createdAt: mission.createdAt,
        updatedAt: mission.updatedAt,
    }));
};
