import { createModel } from "@rematch/core";
import { RootModel } from ".";



export const scrollMatch = createModel<RootModel>()({
  name: "scrollMatch",
  state: 0, 
  reducers: {
    handleScrollChange: (state,payload) => {
      return payload
    },
    
  },
});
