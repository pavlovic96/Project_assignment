import React, { useContext } from "react";
import { DataContext } from "../../context/DataContextProvider";
import "./Home.css";
import TableRow from "./TableRow/TableRow";

const Home = () => {
  const { symbolsData } = useContext(DataContext);

  return (
    <div>
      <div className="container">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-end">Last</th>
                <th className="text-end">Change</th>
                <th className="text-end">Change Percent</th>
                <th className="text-end">High</th>
                <th className="text-end">Low</th>
              </tr>
            </thead>
            <tbody>
              {
              symbolsData ? ( symbolsData.length === 5
                ? symbolsData.map((symbol, index) => (
                    <TableRow data={symbol} key={index} />
                  ))
                : null) :null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
