import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext(null);

const checkLoginStatus = () => {
  if (localStorage.getItem("login")) {
    let parsedData = JSON.parse(localStorage.getItem("login"));
    return parsedData;
  } else {
    return false;
  }
};



export const DataContextProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState(checkLoginStatus());
  const [symbols, setSymbols] = useState([]);
  const [symbolsData, setSymbolsData] = useState([]);
  const [detailsPair, setDetailsPair] = useState();

  useEffect(() => {
    const urlSymbols = "http://localhost:3001/api/symbols";

    fetch(urlSymbols)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const arrayOfFive = data.slice(0, 5);
        setSymbols(arrayOfFive);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

    socket.onopen = (event) => {
      console.log("WebSocket connection opened:", event);

      const subscriptionMessages = [];

      for (let i = 0; i < 5; i++) {
        const subMessage = JSON.stringify({
          event: "subscribe",
          channel: "ticker",
          symbol: "t" + (symbols[i] ? symbols[i].toUpperCase() : ""),
        });
        subscriptionMessages.push(subMessage);
      }

      // Send all subscription messages in the array
      subscriptionMessages.forEach((subMessage) => {
        socket.send(subMessage);
      });
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("response: ", data);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);

      if (event.code === 1000) {
        console.log("WebSocket connection closed gracefully");
      } else {
        console.error("WebSocket connection closed with an error:", event);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [symbols]);

  const fetchSymbolData = (symbol) => {
    if (!symbol) {
      console.error("Symbol is undefined or invalid:", symbol);
      return;
    }

    const urlOneSymbol = `http://localhost:3001/api/pubticker/${symbol}`;
    console.log("Fetching data for symbol:", symbol);

    fetch(urlOneSymbol)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSymbolsData((prevSymbolsData) => {
          const existingIndex = prevSymbolsData.findIndex(
            (item) => item.symb === symbol
          );

          if (existingIndex !== -1) {
            // If the symbol exists, update it
            const updatedData = [...prevSymbolsData];
            updatedData[existingIndex] = {
              symb: symbol,
              data: data,
              favorite: false,
            };
            return updatedData;
          } else {
            // If the symbol doesn't exist, add it
            return [...prevSymbolsData, { symb: symbol, data: data }];
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (symbols.length !== 0) {
      symbols.forEach((symb) => {
        fetchSymbolData(symb);
      });
    }
  }, [symbols]);

  const changeLoginStatus = () => {
    setLoginStatus(true);
  };

  const changeDetailsPair = (pair) => {
    setDetailsPair(pair);
  };

  const changeFavoriteStatus = (pair) => {
    const copySymbolsData = [...symbolsData];
    const pairPosition = symbolsData.map((symbol) => symbol.symb).indexOf(pair.symb);

    if (pairPosition !== -1) {
      copySymbolsData[pairPosition] = pair;
      setSymbolsData(copySymbolsData);
    }
  };

  useEffect(() => {
    window.localStorage.setItem("login", JSON.stringify(loginStatus));
  }, [loginStatus]);

  const contextValue = {
    changeLoginStatus,
    loginStatus,
    symbols,
    symbolsData,
    changeDetailsPair,
    detailsPair,
    changeFavoriteStatus,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};
