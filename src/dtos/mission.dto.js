export const bodyToMission = (body, store_id) => {
    return{
        content: body.content,
        mAmount: body.mAmount,
        mPoint: body.mPoint
    }
};


export const responseFromMission = ({ mission }) => {
    return{
        missionId: mission.missionId,
        storeId: mission.store_Id,
        content: mission.content,
        mAmount: mission.mAmount,
        mAoint: mission.mPoint,
        createdAt: mission.createdAt,
        updatedAt: mission.updatedAt,
        missionState: mission.missionState,
    }
};