import { FixedSizeList, FixedSizeList as List } from "react-window";
import { TDispatch, TRootState } from "../models";
import { connect, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { store } from "../store/store";
import { find } from "../helpers/findInputInStore";

const TableHeader = (props: TRootState) => {
  const rows = ["S.no", "Student Name", "Roll No", "Class", "Height", "weight"];

  const Column = ({ index, style }: { index: number; style: any }) => {
    let styleClass = 'bg-white';
    //get the style of particular element
    if(store.getState().inputConfig.length > 0){      
         const findData = find(index,'col')
        //  styleClass = findData ? `bg-[${findData.style}] bg-blue-400` : 'bg-white';         
         styleClass = findData ? `${findData.style}` : '';         
    }    
    
   return (
      <div
        style={styleClass!== ''?{...style,backgroundColor:styleClass}:{...style,backgroundColor:"white"}}
        onClick={() =>
          dispatch.selectField.updateSelectedField({ col: index })
        }
        className={`table-th cursor-pointer ${styleClass}`}
      >
        {rows[index]}
      </div>
    );
  }
  const dispatch = useDispatch<TDispatch>();
  const listRef = useRef<FixedSizeList>(null);

  // Function to scroll to a specific position
  const scrollToPosition = (scrollOffset: number) => {
    if (listRef.current) {
      listRef.current.scrollTo(scrollOffset);
    }
  };
    useEffect(() => {
      scrollToPosition(props.scrollMatch);
    }, [props.scrollMatch]);
  
   
  return (
    <div>
      <List
        ref={listRef}
        height={60}
        itemCount={rows.length}
        itemSize={180}
        layout="horizontal"
        width={800}
        onScroll={(e) =>
          dispatch.scrollMatch.handleScrollChange(e.scrollOffset)
        }
      >
        {Column}
      </List>
    </div>
  );
};
const mapState = (state: TRootState) => ({
  scrollMatch: state.scrollMatch,
  inputConfig: state.inputConfig
});

const mapDispatch = (dispatch: TDispatch) => ({
  updateScrollChange: dispatch.scrollMatch.handleScrollChange,
  updateSelectedField: dispatch.selectField.updateSelectedField,
});

export default connect(mapState, mapDispatch)(TableHeader);
