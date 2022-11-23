import { useState, useEffect, useRef } from "react";
import axios from "axios";
import HomeContext from "../../Contexts/HomeContext";
import ListH from "./ListH";
import { authConfig } from "../../Functions/auth";

function MainH() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [books, setBooks] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const filterOn = useRef(false);
  const filterWhat = useRef(null);

  // const reList = (data) => {
  //   const d = new Map();
  //   data.forEach((line) => {
  //     if (d.has(line.title)) {
  //       d.set(line.title, [...d.get(line.title), line]);
  //     } else {
  //       d.set(line.title, [line]);
  //     }
  //   });
  //   return [...d];
  // };

  // READ for list of books

  useEffect(() => {
    axios.get("http://localhost:3003/home/books", authConfig()).then((res) => {
      if (filterOn.current) {
        setBooks(
          res.data.map((d, i) =>
            filterWhat.current === d.cat_id
              ? { ...d, show: true, row: i }
              : { ...d, show: false, row: i }
          )
        );
      } else {
        setBooks(res.data.map((d, i) => ({ ...d, show: true, row: i })));
      }
    });
  }, [lastUpdate]);

  // UPDATE books

  useEffect(() => {
    if (statusData === null) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/books/" + statusData.id,
        statusData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [statusData]);

  return (
    <HomeContext.Provider
      value={{
        books,
        setBooks,
        setStatusData,
        filterOn,
        filterWhat,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ListH />
          </div>
        </div>
      </div>
    </HomeContext.Provider>
  );
}

export default MainH;
