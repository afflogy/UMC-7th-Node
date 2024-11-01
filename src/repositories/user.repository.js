import { pool } from "../db.config.js";

export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      data.email
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [userResult] = await pool.query(
      `INSERT INTO user (name, phone_num, email, password, gender, birth_date, address) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.name,
        data.phone_num,
        data.email,
        data.password,
        data.gender,
        data.birth_date,
        data.address,
      ]
    );

    return userResult.insultId;
  } catch (err) {
    console.error('Error in addUser:', err);
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};


export const getUserById = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM user WHERE user_id = ?;`, [userId]);

    console.log(user);

    if (user.length == 0) {
      return null;
    }

    return user;
  } catch (err) {
      console.error('Error in getUser:', err);
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
      [
        userId,
        categoryId
      ]
    );

    return;
  } catch (err) {
    console.error('Error in setPreference:', err);
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};



export const getUserPreferencByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preference] = await pool.query(
      "SELECT uc.user_id, uc.category_id, c.group " +
      "FROM usercategory uc JOIN category c on uc.category_id = c.category_id " +
      "WHERE uc.user_id = ? ORDER BY uc.category_id ASC;",
      [userId]
    );

    return preference;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
