import { useState, useEffect } from "react";
import axios from "axios";
import CategoriesContext from "../../Contexts/CategoriesContext";
import ListC from "./ListC";
import CreateC from "./CreateC";
import { authConfig } from "../../Functions/auth";

function MainC() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  //const [editData, setEditData] = useState(null);
  const [categories, setCategories] = useState(null);

  // CREATE category

  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios
      .post("http://localhost:3003/home/categories", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createData]);

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
        setCreateData,
        // editData,
        // setEditData,
        deleteData,
        setDeleteData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-4 col-md-12">
            <CreateC />
          </div>
          <div className="col col-lg-8 col-md-12">
            <ListC />
          </div>
        </div>
      </div>
    </CategoriesContext.Provider>
  );
}

export default MainC;
