import { Models, RematchDispatch, RematchRootState } from "@rematch/core";
import { studentData } from "./studentData";
import { scrollMatch } from "./scrollChange";


export interface RootModel extends Models<RootModel> {
  studentData: typeof studentData;
  scrollMatch: typeof scrollMatch;
}

export const models: RootModel = { studentData, scrollMatch };
export type TRootState = RematchRootState<RootModel>
export type TDispatch = RematchDispatch<RootModel>