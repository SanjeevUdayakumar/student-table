import { useRef } from "react";
import { FixedSizeList as List } from "react-window";

const TableHeader = () => {
  const rows = ["S.no", "Student Name", "Roll No", "weight", "Height"];

  const Column = ({ index, style }: { index: number; style: any }) => (
    <div style={style} className="table-th">
      {" "}
      {rows[index]}
    </div>
  );
  const listRef = useRef<List>(null);

  return (
    <div>
      <List
        height={60}
        itemCount={rows.length}
        itemSize={180}
        layout="horizontal"
        width={800}
        onScroll={(e)=>console.log(e)
        }
      >
        {Column}
      </List>
    </div>
  );
};

export default TableHeader;
