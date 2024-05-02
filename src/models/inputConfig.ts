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
            const find = state.findIndex(val =>{              
                if(Number.isInteger(payload.id)){
                    return val.id === payload.id
                }
                else if(typeof val.id === "object" && !Number.isInteger(payload.id)){
                    const [row,col] = val.id
                    const [row1,col1] = payload.id
                    
                    return row === row1 && col === col1
                  }   
               
            })
            let temp = state;
            if(find >=0){
                 temp = temp.filter((val,index) =>{
                    console.log(find,index);
                    return index !== find
                    
                  })    
            }
            temp.push(payload)                 

            // find >=0 ? temp[find] = payload  :  temp.push(payload)

            // console.log(find);
            // console.log(temp);
            
            return temp
        }
    }
});
