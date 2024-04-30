import { createModel } from "@rematch/core";
import { RootModel } from ".";
interface Config {
  id:number | number[],
  style:string
}



export const inputConfig = createModel<RootModel>()({
    name:"inputConfig",
    state:[] as Config[],
    reducers:{
        addConfig:(state,payload) => {            
            const find = state.findIndex(val =>{
                if(typeof val.id === "object"){
                    const [row,col] = val.id
                    const [row1,col1] = payload.id
                    return row === row1 && col === col1
                  }   
                return val.id === payload.id
            })
            const temp  = state;            
            find >=0 ? temp[find] = payload  :  temp.push(payload)

            // console.log(find);
            // console.log(temp);
            
            return temp
        }
    }
});
