import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../context/DataContextProvider";

const TableRow = (props) => {
  const { symb, data } = props.data;
  const { changeDetailsPair } = useContext(DataContext);

  return (
    <tr>
      <td>
        <Link
          to={`/${symb}`}
          onClick={() => {
            changeDetailsPair(props.data);
          }}
        >
          {symb.toUpperCase()}
        </Link>
      </td>
      <td className="text-end">{data.last_price}</td>
      <td className="text-end">null</td>
      <td className="text-end">null</td>
      <td className="text-end">{data.high}</td>
      <td className="text-end">{data.low}</td>
    </tr>
  );
};

export default TableRow;
