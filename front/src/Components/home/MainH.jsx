import { useState, useEffect, useRef } from "react";
import axios from "axios";
import HomeContext from "../../Contexts/HomeContext";
import ListH from "./ListH";
import { authConfig } from "../../Functions/auth";

function MainH() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [stories, setStories] = useState(null);
  const [amountData, setAmountData] = useState(null);
  const [donation, setDonation] = useState(null);

  const reList = (data) => {
    const d = new Map();
    data.forEach((line) => {
      if (d.has(line.title)) {
        d.set(line.title, [...d.get(line.title), line]);
      } else {
        d.set(line.title, [line]);
      }
    });
    return [...d];
  };

  // READ for list of stories with donations

  useEffect(() => {
    axios
      .get("http://localhost:3003/home/stories-hp", authConfig())
      .then((res) => {
        console.log(reList(res.data));
        setStories(reList(res.data));
      });
  }, [lastUpdate]);

  /// CREATE donation

  useEffect(() => {
    if (null === donation) {
      return;
    }
    axios
      .post("http://localhost:3003/home/donations", donation, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [donation]);

  // UPDATE STORIE

  useEffect(() => {
    if (null === amountData) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/stories-donation/" + amountData.id,
        amountData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [amountData]);

  return (
    <HomeContext.Provider
      value={{
        setDonation,
        stories,
        setAmountData,
        setStories,
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
