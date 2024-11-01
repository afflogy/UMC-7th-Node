import { pool } from "../db.config.js";

export const checkStoreExists = async (storeId) => {
    const conn = await pool.getConnection();
  
    try {
      const [result] = await conn.query(
        `SELECT EXISTS(SELECT 1 FROM store WHERE store_id = ?) AS isExistStore;`,
        [storeId]
      );
  
      return result[0].isExistStore;
    } catch (err) {
      console.error("Error in checkStoreExists:", err);
      throw new Error(`가게 확인 중 오류가 발생했습니다: (${err})`);
    } finally {
      conn.release();
    }
  };

  export const addMission = async (data) => {
    const conn = await pool.getConnection();

    try {
      const [result] = await conn.query(
        `INSERT INTO mission (store_id, content, m_amount, m_point, created_at) VALUES (?, ?, ?, ?, ?, NOW());`,
        [
          data.store_id,
          data.content,
          data.m_amount,
          data.m_point,
        ]
      );
  
      return result.insertId;
    } catch (err) {
      console.error("Error in addReview:", err);
      throw new Error(`미션 추가 중 오류가 발생했습니다: (${err})`);
    } finally {
      conn.release();
    }
  };

//도전 중인 미션으로 변경 API
export const checkMissionOngoing = async (storeId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT mission_state FROM missionstate WHERE store_id = ? AND mission_id = ? AND mission_state = 1;`,
      [storeId, missionId]
    );
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const setOngoingMission = async (storeId, missionId) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `UPDATE missionstate SET mission_state = 1 WHERE store_id = ? AND mission_id = ?;`,
      [storeId, missionId]
    );

    const [updatedMission] = await conn.query(
      `SELECT * FROM missionstate WHERE store_id = ? AND mission_id = ?;`,
      [storeId, missionId]
    );
    return updatedMission[0];
  } finally {
    conn.release();
  }
};
