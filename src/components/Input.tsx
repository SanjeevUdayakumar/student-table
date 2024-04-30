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
   
   const find = store.getState().inputConfig.find(val =>{ 
    if(typeof val.id === "object"){
      const [row,col] = val.id
      return row === rowIndex && col === colIndex
    }     
      return val.id == rowIndex || val.id == colIndex
    });
    
    const styleClass = find ? `bg-[${find.style}]` : '';
if(find && styleClass){
  console.log(find,styleClass);
  
}    
    return ( 
        <input
        type={type}
        style={style}
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
    studentData: state.studentData
  });
  
   const mapDispatch = (dispatch: TDispatch) => ({
    updateStudentData: dispatch.studentData.handleInputChange,
    updateSelectField: dispatch.selectField.updateSelectedField
  });
export default connect(mapState,mapDispatch)(Input);