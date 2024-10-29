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
        content: mission.content,
        m_amount: mission.m_amount,
        m_point: mission.m_point,
    }
};
