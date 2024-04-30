import { createModel } from "@rematch/core";
import { RootModel } from ".";


export interface SelectField{
    row:null | number,
    col:null | number,
    cell:null | number[],
  }
export const selectField = createModel<RootModel>()({
  name: "selectField",
  state: {
    row:null,
    col:null,
    cell:null,
  }, 
  reducers: {
    updateSelectedField: (state,payload) => {        
      return {row:null,col:null,cell:null,...payload}
    },
    
  },
});