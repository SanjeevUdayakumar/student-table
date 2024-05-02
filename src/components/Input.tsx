import { connect, useDispatch } from "react-redux";
import { TDispatch, TRootState } from "../models";
import { StudentData } from "../models/studentData";
import { store } from "../store/store";
interface Props{
    style:any,
    type?:string,
    rowIndex:number,
    colIndex:number,
    propName:any,
    data:StudentData
}
const Input = ({style,type="text",rowIndex,colIndex,propName,data}:Props) => {
    const dispatch = useDispatch<TDispatch>()
    const key: keyof StudentData = propName;
   
    // find config by reversing it to know the latest added config
    // Made an copy of config from rematch store while we can't reverse the immutable state
   const find = [...store.getState().inputConfig].reverse().find(val =>{ 
    if(val.name == 'row'){            
      return val.id == rowIndex
    }  
    if(val.name == 'col'){      
      return val.id == colIndex
    }  
    if(typeof val.id === "object" && !Number.isInteger(val.id) && val.id !=null){
      const [row,col] = val.id
      return row === rowIndex && col === colIndex
    } 
    });

    const styleClass = find ? `${find.style}` : '';
 
    return ( 
        <input
        type={type}
        style={styleClass!== ''?{...style,backgroundColor:styleClass}:{...style,backgroundColor:"white"}}
        onBlur={(e) =>
            dispatch.studentData.handleInputChange({
              id: data.id,
              propName: propName,
              value: e.target.value,
            })}
        className={`px-5 border-2 outline-none border-blue-500 ${styleClass}`}
        defaultValue={data[key]}
        onClick={()=>dispatch.selectField.updateSelectedField({cell:[rowIndex,colIndex]})}
      />
     );
}
const mapState = (state: TRootState) => ({
    studentData: state.studentData,
    inputConfig: state.inputConfig
  });
  
   const mapDispatch = (dispatch: TDispatch) => ({
    updateStudentData: dispatch.studentData.handleInputChange,
    updateSelectField: dispatch.selectField.updateSelectedField
  });
export default connect(mapState,mapDispatch)(Input);