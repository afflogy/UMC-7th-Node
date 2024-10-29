import { pool } from "../db.config.js";

export const addStoreWithRegion = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [mapResult] = await conn.query(
      `SELECT map_id FROM map WHERE region = ?;`,
      [data.region]
    );

    let mapId;

    if (mapResult.length === 0) {
      const [insertMapResult] = await conn.query(
        `INSERT INTO map (region, created_at) VALUES (?, NOW());`,
        [data.region]
      );
      mapId = insertMapResult.insertId;
    } else {

      mapId = mapResult[0].map_id;
    }


    const [storeCheck] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM store WHERE name = ?) AS isExistStore;`,
      [data.name]
    );

    if (storeCheck[0].isExistStore) {
      return null;
    }

    const [storeResult] = await conn.query(
      `INSERT INTO store (map_id, name, store_address, store_num, created_at) VALUES (?, ?, ?, ?, NOW());`,
      [
        mapId, 
        data.name, 
        data.store_address, 
        data.store_num
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
