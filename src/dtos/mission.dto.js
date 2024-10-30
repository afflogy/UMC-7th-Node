export const bodyToMission = (body, store_id) => {
    return{
        store_id: store_id,
        content: body.content,
        m_amount: body.m_amount,
        m_point: body.m_point
    }
};


export const responseFromMission = ({ mission }) => {
    return{
        mission_id: mission.mission_id,
        store_id: mission.store_id,
        content: mission.content,
        m_amount: mission.m_amount,
        m_point: mission.m_point,
        created_at: mission.created_at,
        updated_at: mission.updated_at,
        mission_state: mission.mission_state,
    }
};