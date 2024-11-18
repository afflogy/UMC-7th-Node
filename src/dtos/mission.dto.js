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

// 가게 미션 목록 조회
export const responseFromStoreMission = ({ missions }) => {
    return{
        missionId: missions.id,
        content: missions.content,
        mAmount: missions.mAmount,
        mPoint: missions.mPoint,
        createdAt: missions.createdAt
    };
    
}

// 사용자 진행미션 조회
export const responseFromUserMissionList = ({ missions }) => {
    return{
        missionStateId: missions.id,
        missionId: missions.missionId,
        state: missions.missionState,
    };
};
