import Table from "./components/Table";
import { TDispatch } from "./models";
import { connect, useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch<TDispatch>();

  return (
    <>
      <h1 className="text-center text-4xl p-5 text-white">Student Table</h1>
     
      <div className="flex w-fit mx-auto mt-20 space-x-10">
        <Table />
        <button
          onClick={() => dispatch.studentData.addRow()}
          className="px-4 py-2 h-fit bg-blue-400 text-white rounded"
        >
          add row
        </button>
      </div>
    </>
  );
}

const mapDispatch = (dispatch: TDispatch) => ({
  addStudentData: dispatch.studentData.addRow,
});
export default connect(mapDispatch)(App);
