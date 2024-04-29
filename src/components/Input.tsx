import { connect, useDispatch } from "react-redux";
import { TDispatch, TRootState } from "../models";
import { StudentData } from "../models/studentData";
interface Props{
    style:any,
    type?:string,
    propName:any,
    data:StudentData
}
const Input = ({style,type="text",propName,data}:Props) => {
    const dispatch = useDispatch()
    const key: keyof StudentData = propName;
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
        className="px-5 border-2 outline-none border-blue-500"
        defaultValue={data[key]}
      />
     );
}
const mapState = (state: TRootState) => ({
    studentData: state.studentData
  });
  
   const mapDispatch = (dispatch: TDispatch) => ({
    updateStudentData: dispatch.studentData.handleInputChange
  });
export default connect(mapState,mapDispatch)(Input);