import { useState, useEffect } from "react";
import axios from "axios";
import CategoriesContext from "../../Contexts/CategoriesContext";
import ListC from "./ListC";
import { authConfig } from "../../Functions/auth";

function MainC() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [deleteData, setDeleteData] = useState(null);
  //const [editData, setEditData] = useState(null);
  const [categories, setCategories] = useState(null);

  // READ for list of categories
  useEffect(() => {
    axios
      .get("http://localhost:3003/home/categories", authConfig())
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      });
  }, [lastUpdate]);

  /// DELETE category

  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    axios
      .delete(
        "http://localhost:3003/home/categories/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // UPDATE category

  // useEffect(() => {
  //   if (null === editData) {
  //     return;
  //   }
  //   axios
  //     .put(
  //       "http://localhost:3003/home/categories/" + editData.id,
  //       editData,
  //       authConfig()
  //     )
  //     .then((res) => {
  //       setLastUpdate(Date.now());
  //     });
  // }, [editData]);

  return (
    <CategoriesContext.Provider
      value={{
        setCategories,
        categories,
        // editData,
        // setEditData,
        deleteData,
        setDeleteData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ListC />
          </div>
        </div>
      </div>
    </CategoriesContext.Provider>
  );
}

export default MainC;
