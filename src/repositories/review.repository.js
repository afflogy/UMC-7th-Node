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

export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO review (user_id, store_id, title, content, score, image, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW());`,
      [
        data.user_id,
        data.store_id,
        data.title,
        data.content,
        data.score,
        data.image,
      ]
    );

    return result.insertId;
  } catch (err) {
    console.error("Error in addReview:", err);
    throw new Error(`리뷰 추가 중 오류가 발생했습니다: (${err})`);
  } finally {
    conn.release();
  }
};
