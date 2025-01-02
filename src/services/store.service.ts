import { responseFromStore } from "../dtos/store.dto.js";
import { DuplicateStoreError } from "../errors.js"
import { addStoreWithRegion, getStoreById } from "../repositories/store.repository.js";

// 가게 생성 API
export const addStoreService = async (data) => {
  const addedStoreId = await addStoreWithRegion({
    name: data.name,
    storeNum: data.storeNum,
    region: data.region,
    storeAddress: data.storeAddress,
  });

  if (addedStoreId === null) {
    throw new DuplicateStoreError("이미 등록된 가게입니다.");
  }

  const store = await getStoreById(addedStoreId);
  return responseFromStore({ store });
};
