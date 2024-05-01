import { createModel } from "@rematch/core";
import { RootModel } from ".";
interface Config {
  id:number | number[],
  name?:string,
  style:string
}



export const inputConfig = createModel<RootModel>()({
    name:"inputConfig",
    state:[] as Config[],
    reducers:{
        addConfig:(state,payload) => {  
            console.log(payload);
                      
            const find = state.findIndex(val =>{              
                if(Number.isInteger(payload.id)){
                    return val.id === payload.id
                }
                else if(typeof val.id === "object"){
                    const [row,col] = val.id
                    const [row1,col1] = payload.id
                    
                    return row === row1 && col === col1
                  }   
               
            })
            const temp  = state;            
            find >=0 ? temp[find] = payload  :  temp.push(payload)

            // console.log(find);
            // console.log(temp);
            
            return temp
        }
    }
});
