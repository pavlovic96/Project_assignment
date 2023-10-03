import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context/DataContextProvider";

import "./DetailsPage.css";

const DetailsPage = () => {
  const { detailsPair,loginStatus , changeFavoriteStatus} = useContext(DataContext);
  const [favoritesBtn, setBtn] = useState(loginStatus ? "block" : "none");
  const [btnContent, setBtnContent] = useState("");
  const [currentPair, setCurrentPair] = useState('');


  useEffect(() => {
    if (loginStatus === false) {
      setBtn("none");
    } else {
      setBtn("block");
    }
  }, [loginStatus]);

  useEffect(() => {
    setCurrentPair(detailsPair);
  }, []);



  useEffect(() => {
    if (currentPair.favorite) {
      setBtnContent("Remove from favorites");
    } else {
      setBtnContent("Add to favorites");
    }
    changeFavoriteStatus(currentPair)
  }, [currentPair]);

  const toggleFavoriteBtn = () => {
    setCurrentPair((prev) => ({
      ...prev,
      favorite: !prev.favorite,
    }));
  };

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
              <tr>
                <td>{currentPair ? currentPair.symb.toUpperCase():null}</td>
                <td className="text-end">{currentPair ? currentPair.data.last_price:null}</td>
                <td className="text-end">{currentPair ? currentPair.data.high:null}</td>
                <td className="text-end">{currentPair ? currentPair.data.low:null}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className={currentPair.favorite ? 'btnFav remove' : 'btnFav add'} style={{ display: favoritesBtn }} onClick={toggleFavoriteBtn}>
          {btnContent}
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
