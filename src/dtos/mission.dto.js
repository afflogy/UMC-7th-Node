export const bodyToMission = (body, storeId) => {
    return{
        storeId: storeId,
        content: body.content,
        mAmount: body.mAmount,
        mPoint: body.mPoint
    }
};


export const responseFromMission = ({ missions }) => {
    return{
        missionId: missions.id,
        storeId: missions.storeId,
        content: missions.content,
        mAmount: missions.mAmount,
        mPoint: missions.mPoint
    }
};

// 미션을 도전으로 변경 API 반환값
export const responseFromMissionState = ({ missions }) => {
    return{
        missionId: missions.missionId,
        userId : missions.userId,
        missionState : missions.missionState
    }
}

// 가게 미션 목록 조회
export const responseFromStoreMission = ({ missions }) => {
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
export const responseFromUserMissionList = ({ missions }) => {
    return missions.map(mission => ({
        missionId: mission.missionId,
        userId: mission.userId,
        store: {
          name: mission.mission.store.name,
        },
        content: mission.mission.content,
        mAmount: mission.mission.mAmount,
        mPoint: mission.mission.mPoint,
        missionState: mission.missionState,
        createdAt: mission.createdAt,
        updatedAt: mission.updatedAt,
    }));
};
