import { FixedSizeList, FixedSizeList as List } from "react-window";
import { TDispatch, TRootState } from "../models";
import { connect, useDispatch } from "react-redux";
import { useRef } from "react";

const TableHeader = (props: TRootState) => {
  const rows = ["S.no", "Student Name", "Roll No", "Class", "Height", "weight"];

  const Column = ({ index, style }: { index: number; style: any }) => (
    <div style={style} className="table-th">
      {rows[index]}
    </div>
  );
  const dispatch = useDispatch<TDispatch>();
  const listRef = useRef<FixedSizeList>(null);

  // Function to scroll to a specific position
  const scrollToPosition = (scrollOffset: number) => {
    if (listRef.current) {
      listRef.current.scrollTo(scrollOffset);
    }
  };
  scrollToPosition(props.scrollMatch);
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
});

const mapDispatch = (dispatch: TDispatch) => ({
  updateScrollChange: dispatch.scrollMatch.handleScrollChange,
});

export default connect(mapState, mapDispatch)(TableHeader);
