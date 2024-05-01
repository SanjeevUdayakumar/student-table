import { store } from "../store/store";

export const find = (index:number,field:string):any => {
    return store.getState().inputConfig.find(val =>{  
        if(val.name == field && val){          
           return val.id == index
         }     
         });
}