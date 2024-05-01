import { VariableSizeGrid } from "react-window";
import { connect, useDispatch } from "react-redux";
import { TDispatch, TRootState } from "../models/index";
import TableHeader from "./TableHeader";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import { find } from "../helpers/findInputInStore";
const Table = (props: TRootState) => {
  // handling color
  const [bgColor, setBgColor] = useState("#f0f0ff");

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
    let styleClass = '';
    
    //get the style of particular element    
    if(props.inputConfig.length > 0){      
         const findData = find(rowIndex,'row')   
         styleClass = findData ? `${findData.style}` : '';                  
    }    
    // Render each cell based on the column index
    switch (columnIndex) {
      case 0:
        return (
          <div
            key={key}
            style={styleClass!== ''?{...style,backgroundColor:styleClass}:{...style,backgroundColor:"white"}}
            onClick={() =>
              dispatch.selectField.updateSelectedField({ row: rowIndex })
            }
            className={`px-5 cursor-pointer border-2 outline-none bg-white border-blue-500 ${styleClass}`}
          >
            {rowIndex + 1}
          </div>
        );
      case 1:
        return (
          <Input
            rowIndex={rowIndex}
            colIndex={columnIndex}
            style={style}
            propName={"name"}
            key={key}
            data={data}
          />
        );
      case 2:
        return (
          <Input
            rowIndex={rowIndex}
            colIndex={columnIndex}
            style={style}
            type={"number"}
            propName={"rollNo"}
            key={key}
            data={data}
          />
        );
      case 3:
        return (
          <Input
            rowIndex={rowIndex}
            colIndex={columnIndex}
            style={style}
            propName={"stuClass"}
            key={key}
            data={data}
          />
        );
      case 4:
        return (
          <Input
            rowIndex={rowIndex}
            colIndex={columnIndex}
            style={style}
            type={"number"}
            propName={"height"}
            key={key}
            data={data}
          />
        );
      case 5:
        return (
          <Input
            rowIndex={rowIndex}
            colIndex={columnIndex}
            style={style}
            type={"number"}
            propName={"weight"}
            key={key}
            data={data}
          />
        );
      default:
        return null;
    }
  };
  const gridRef = useRef<VariableSizeGrid>(null);

  // Function to scroll to a specific position
  useEffect(() => {
    scrollToPosition(props.scrollMatch);
  }, [props.scrollMatch]);

  const scrollToPosition = (scrollLeft:number) => {
    if (gridRef.current) {
      gridRef.current.scrollTo({ scrollLeft });
    }
  };


  // handleAddColor
  const handleAddColor = () =>{
        const {row, col, cell}:{row:number | null,col:number | null,cell:number[] | null} = props.selectField;
        Number.isInteger(row) ? dispatch.inputConfig.addConfig({id:row,name:'row',style:bgColor}):
        Number.isInteger(col) ? dispatch.inputConfig.addConfig({id:col,name:'col',style:bgColor}):
        dispatch.inputConfig.addConfig({id:cell,style:bgColor})
        
  }
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
        onScroll={(e) => dispatch.scrollMatch.handleScrollChange(e.scrollLeft)}
      >
        {itemRenderer}
      </VariableSizeGrid>
      {/* Display the selected field  */}
      <input type="text" style={{backgroundColor:bgColor}} />
      <div className="flex space-x-10 p-10">
        <div className="p-5">
          <div className="text-white text-2xl">
            Selected Row: {props.selectField.row}
          </div>
          <div className="text-white text-2xl">
            Selected Col: {props.selectField.col}
          </div>
          <div className="text-white text-2xl">
            Selected Cell: {props.selectField.cell}
          </div>
        </div>
        <div>
          <input
            type="color"
            defaultValue={bgColor}
            onBlur={(e: any) => setBgColor(e.target.value)}
          />
          <button onClick={handleAddColor} className="px-4 py-2 bg-blue-300 rounded mx-4">
            Add color
          </button>
        </div>
      </div>
    </div>
  );
};
const mapState = (state: TRootState) => ({
  studentData: state.studentData,
  scrollMatch: state.scrollMatch,
  selectField: state.selectField,
  inputConfig: state.inputConfig,
});

const mapDispatch = (dispatch: TDispatch) => ({
  updateScrollChange: dispatch.scrollMatch.handleScrollChange,
  updateSelectedField: dispatch.selectField.updateSelectedField,
  updateInputConif: dispatch.inputConfig.addConfig,
});
export default connect(mapState, mapDispatch)(Table);
