import { useState, useEffect } from "react";
import axios from "axios";
import StoriesAdminContext from "../../Contexts/StoriesAdminContext";
import ListSA from "./ListSA";
import { authConfig } from "../../Functions/auth";

function MainSA() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [stories, setStories] = useState(null);

  // READ for list of stories
  useEffect(() => {
    axios
      .get("http://localhost:3003/home/stories-admin", authConfig())
      .then((res) => {
        console.log(res.data);
        setStories(res.data);
      });
  }, [lastUpdate]);

  /// DELETE storie

  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    axios
      .delete(
        "http://localhost:3003/home/stories/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // UPDATE storie

  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/stories-admin/" + editData.id,
        editData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  return (
    <StoriesAdminContext.Provider
      value={{
        setStories,
        stories,
        editData,
        setEditData,
        deleteData,
        setDeleteData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ListSA />
          </div>
        </div>
      </div>
    </StoriesAdminContext.Provider>
  );
}

export default MainSA;
