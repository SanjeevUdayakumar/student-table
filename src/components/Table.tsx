import { VariableSizeGrid } from "react-window";
import { connect, useDispatch } from "react-redux";
import {  TDispatch, TRootState } from "../models/index";
import TableHeader from "./TableHeader";
import { useRef } from "react";
import Input from "./Input";
const Table  = (props:TRootState) => {
  
  const rows = props.studentData;
  const columnWidth = 180;
  const columnCount = 6; // Number of columns in your grid
  const rowHeight = 50;
  const rowCount = rows.length; // Number of rows in your grid
  const dispatch = useDispatch<TDispatch>();


  const itemRenderer = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: any;
  }) => {
    const data = rows[rowIndex];
    const key = `${columnIndex}-${rowIndex}`;
    // Render each cell based on the column index
    switch (columnIndex) {
      case 0:
        return (
          <div
            key={key}
            style={style}
            className="px-5 border-2 outline-none bg-white border-blue-500"
          >{rowIndex + 1}</div>
        );
      case 1:
        return (
          <Input style={style} propName={"name"} key={key} data={data}/>
          // <input
          //   type="text"
          //   key={key}
          //   style={style}
          //   onBlur={(e) =>
          //       dispatch.studentData.handleInputChange({
          //         id: data.id,
          //         propName: "name",
          //         value: e.target.value,
          //       })}
          //   className="px-5 border-2 outline-none border-blue-500"
          //   defaultValue={data.name}
          // />
        );
      case 2:
        return (
          <Input style={style} type={"number"} propName={"rollNo"} key={key} data={data}/>

          // <input
          //   type="number"
          //   key={key}
          //   style={style}
          //   onBlur={(e) =>
          //     dispatch.studentData.handleInputChange({
          //       id: data.id,
          //       propName: "rollNo",
          //       value: e.target.value,
          //     })
          //   }
          //   className="px-5 border-2 outline-none border-blue-500"
          //   defaultValue={data.rollNo}
          // />
        );
      case 3:
        return (
          <Input style={style} propName={"stuClass"} key={key} data={data}/>

        //   <input
        //     type="text"
        //     key={key}
        //     style={style}
        //     onBlur={(e) =>
        //       dispatch.studentData.handleInputChange({
        //         id: data.id,
        //         propName: "stuClass",
        //         value: e.target.value,
        //       })
        //     }
        //     className="px-5 border-2 outline-none border-blue-500"
        //     defaultValue={data.stuClass}
        //   />
        );
      case 4:
        return (
          <Input style={style} type={"number"} propName={"height"} key={key} data={data}/>

          // <input
          //   type="number"
          //   key={key}
          //   style={style}
          //   onBlur={(e) =>
          //     dispatch.studentData.handleInputChange({
          //       id: data.id,
          //       propName: "height",
          //       value: e.target.value,
          //     })
          //   }
          //   className="px-5 border-2 outline-none border-blue-500"
          //   defaultValue={data.height}
          // />
        );
      case 5:
        return (
          <Input style={style} type={"number"} propName={"weight"} key={key} data={data}/>

          // <input
          //   type="number"
          //   key={key}
          //   style={style}
          //   onBlur={(e) =>
          //     dispatch.studentData.handleInputChange({
          //       id: data.id,
          //       propName: "weight",
          //       value: e.target.value,
          //     })
          //   }
          //   className="px-5 border-2 outline-none border-blue-500"
          //   defaultValue={data.weight}
          // />
        );
      default:
        return null;
    }
  };
  const gridRef = useRef<VariableSizeGrid>(null);

  // Function to scroll to a specific position
  const scrollToPosition = (scrollLeft: number) => {
    if (gridRef.current) {
      gridRef.current.scrollTo({scrollLeft});
    }
  }; 
  scrollToPosition(props.scrollMatch);
  return (
    <div>
      <TableHeader />
    <VariableSizeGrid
      ref={gridRef}
      columnCount={columnCount}
      columnWidth={() => columnWidth}
      rowCount={rowCount}
      rowHeight={() => rowHeight}
      height={300} // Height of your grid
      width={800} // Width of your grid
      onScroll={(e)=>dispatch.scrollMatch.handleScrollChange(e.scrollLeft)}
      >
      {itemRenderer}
    </VariableSizeGrid>
      </div>
  );
};
const mapState = (state: TRootState) => ({
  studentData: state.studentData,
  scrollMatch: state.scrollMatch
});

 const mapDispatch = (dispatch: TDispatch) => ({
  updateScrollChange: dispatch.scrollMatch.handleScrollChange
});
export default connect(mapState,mapDispatch)(Table);
