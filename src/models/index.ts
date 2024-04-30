import { Models, RematchDispatch, RematchRootState } from "@rematch/core";
import { studentData } from "./studentData";
import { scrollMatch } from "./scrollChange";
import { selectField } from "./selectField";
import { inputConfig } from "./inputConfig";


export interface RootModel extends Models<RootModel> {
  studentData: typeof studentData,
  scrollMatch: typeof scrollMatch,
  selectField: typeof selectField,
  inputConfig: typeof inputConfig
}

export const models: RootModel = { studentData, scrollMatch, selectField,inputConfig };
export type TRootState = RematchRootState<RootModel>
export type TDispatch = RematchDispatch<RootModel>