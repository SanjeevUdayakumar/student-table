import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { isNumeric } from "../helpers/checkIsNum";
export interface StudentData {
  id: number;
  name: string;
  rollNo: number;
  stuClass: string;
  height: number;
  weight: number;
}
const temp: StudentData[] = [
  {
    id: 0,
    name: "vignesh",
    rollNo: 1,
    stuClass: "12",
    height: 180,
    weight: 50,
  },
  {
    id: 1,
    name: "shriram",
    rollNo: 2,
    stuClass: "12",
    height: 200,
    weight: 60,
  },
  {
    id: 2,
    name: "monish",
    rollNo: 3,
    stuClass: "12",
    height: 180,
    weight: 50,
  },
  {
    id: 3,
    name: "ram",
    rollNo: 4,
    stuClass: "12",
    height: 170,
    weight: 60,
  },
  {
    id: 4,
    name: "karthik",
    rollNo: 5,
    stuClass: "12",
    height: 230,
    weight: 50,
  },
  {
    id: 6,
    name: "shriram",
    rollNo: 6,
    stuClass: "12",
    height: 210,
    weight: 60,
  },
];
const addRow: StudentData = {
  id: temp[temp.length-1].id + 1,
  name: '',
  rollNo: temp[temp.length-1].rollNo + 1,
  stuClass: '',
  height: 0,
  weight: 0,
};
export const studentData = createModel<RootModel>()({
  name: "studentData",
  state: temp as StudentData[], // initial state
  reducers: {
    addRow: (state) => {
      return [...state, addRow];
    },
    handleInputChange: (state, action) => {
      // console.log(state, action);

      const temp = [...state];

      if (isNumeric(action.value)) {
        temp[action.id] = {
          ...state[action.id],
          [action.propName]: parseInt(action.value),
        };
      } else {

        temp[action.id] = {
          ...state[action.id],
          [action.propName]: action.value,
        };
      }

      return temp;
    }
  },
});
