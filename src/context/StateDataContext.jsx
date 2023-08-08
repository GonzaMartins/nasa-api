import { useState } from "react";
import { dataContext } from "./dataContext";

export default function StateDataContext({ children }) {
  const [data, setData] = useState();

  const newData = (data) => {
    setData(data);
  };
  return (
    <dataContext.Provider value={{ data, newData }}>
      {children}
    </dataContext.Provider>
  );
}
