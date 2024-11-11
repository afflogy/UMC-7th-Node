import { prisma } from "../db.config.js";

export const addStoreWithRegion = async (data) => {
    const map = await prisma.map.findFirst({where: {region: data.region}});

    if (!map) {
      throw new Error("입력한 region에 해당하는 map_id를 찾을 수 없습니다.");
    }

    const store = await prisma.store.findFirst({where: {name: data.name}});

    if (store) {
      return null;
    }

    const created = await prisma.store.create({
      data: {
        name: data.name,
        storeNum: data.storeNum,
        storeAddress: data.storeAddress,
        mapId: map.id
      }});
    return created.id;
};


export const getStoreById = async (storeId) => {
  const store = await prisma.store.findFirstOrThrow({where: {id: storeId}})
  return store;
};

