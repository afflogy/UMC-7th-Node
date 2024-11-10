export const bodyToMission = (body, storeId) => {
    return{
        storeId: storeId,
        content: body.content,
        mAmount: body.mAmount,
        mPoint: body.mPoint
    }
};


export const responseFromMission = ({ mission }) => {
    return{
        missionId: mission.id,
        missionState: mission.missionState,
        userId: mission.userId,
        completedAt: mission.completedAt
    }
};

export const responseFromMissionList = ({ missions }) => {
    if (!missions || missions.length === 0) {
        return {
          success: true,
          message: "가게에 미션이 없습니다.",
          data: []
        };
    }
    
    const formattedMissions = missions.map(mission => ({
        missionId: mission.id,
        name: mission.store.name,
        content: mission.content,
        mAmount: mission.mAmount,
        mPoint: mission.mPoint,
        createdAt: mission.createdAt
    }));
    
    return {
        success: true,
        message: "리뷰 목록을 성공적으로 불러왔습니다.",
        data: formattedMissions
    };
}