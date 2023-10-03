import React, { useContext } from "react";
import FavoritesRow from "./FavoritesRow/FavoritesRow";
import { DataContext } from "../../context/DataContextProvider";

const Favorites = () => {
const {symbolsData} = useContext(DataContext)

  return (
    <div>
      <div className="container">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-end">Last</th>
                <th className="text-end">High</th>
                <th className="text-end">Low</th>
              </tr>
            </thead>
            <tbody>
              {symbolsData.length === 5
                ? symbolsData.map((symbol, index) =>
                    symbol.favorite ? (
                      <FavoritesRow data={symbol} key={index} />
                    ) : null
                  )
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
