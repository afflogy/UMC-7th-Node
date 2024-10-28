import { pool } from "../db.config.js";

export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE user_id = ?) as isExistID;`,
      data.user_id
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO user (user_id, user_name, password, phone_num, email) VALUES (?, ?, ?, ?, ?);`,
      [
        data.user_id,
        data.user_name,
        data.password,
        data.phone_num,
        data.email,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};



export const getUser = async (user_Id) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM user WHERE user_id = ?;`, user_Id);

    console.log(user);

    if (user.length == 0) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const setPreference = async (userId, categoryId) => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO usercategory (user_id, category_id) VALUES (?, ?);`,
      [userId, categoryId]
    );

    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};



export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query(
      "SELECT uc.user_id, uc.category_id, c.group " +
      "FROM user_category uc JOIN category c on uc.category_id = c.category_id " +
      "WHERE uc.user_id = ? ORDER BY uc.category_id ASC;",
      userId
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
