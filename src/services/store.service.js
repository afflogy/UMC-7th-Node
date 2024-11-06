import { responseFromStore, responseFromReview } from "../dtos/store.dto.js";
import { addStoreWithRegion,getStoreById } from "../repositories/store.repository.js";

export const addStoreService = async (data) => {
  const addedStoreId = await addStoreWithRegion({
    name: data.name,
    store_address: data.store_address,
    store_num: data.store_num,
    region: data.region,
  });

  if (addedStoreId === null) {
    throw new Error("이미 등록된 가게입니다.");
  }

  const store = await getStoreById(addedStoreId);
  return responseFromStore({ store });
};
