import { pool } from "../db.config.js";

export const addStoreWithRegion = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [mapResult] = await conn.query(
      `SELECT map_id FROM map WHERE region = ?;`,
      [data.region]
    );

    if (mapResult.length === 0) {
      throw new Error("입력한 region에 해당하는 map_id를 찾을 수 없습니다.")
    }
    const mapId = mapResult[0].map_id;

    const [storeCheck] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM store WHERE name = ?) AS isExistStore;`,
      [data.name]
    );

    if (storeCheck[0].isExistStore) {
      return null;
    }

    const [storeResult] = await conn.query(
      `INSERT INTO store (map_id, name, store_num, region, store_address) VALUES (?, ?, ?, ?, ?);`,
      [
        mapId, 
        data.name,
        data.store_num,
        data.region,
        data.store_address, 
      ]
    );

    return storeResult.insertId;
  } catch (err) {
    console.error("Error in addStoreWithRegion:", err);
    throw new Error(`가게 추가 중 오류가 발생했습니다: (${err})`);
  } finally {
    conn.release();
  }
};



export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE store_id = ?;`, [storeId]);

    console.log(store);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
      console.error('Error in getStoreById:', err);
      throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
