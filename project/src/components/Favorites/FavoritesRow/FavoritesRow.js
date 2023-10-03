import React, { useContext } from "react";
import { DataContext } from "../../../context/DataContextProvider";
import { Link } from "react-router-dom";

const FavoritesRow = (props) => {
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
      <td className="text-end">{data.high}</td>
      <td className="text-end">{data.low}</td>
    </tr>
  );
};

export default FavoritesRow;
