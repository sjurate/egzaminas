import { useState, useEffect, useContext } from "react";
import axios from "axios";
import StoriesUserContext from "../../Contexts/StoriesUserContext";
import DataContext from "../../Contexts/DataContext";
import CreateS from "./CreateS";
import ListS from "./ListS";
import EditS from "./EditS";
import { authConfig } from "../../Functions/auth";

function MainS() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [stories, setStories] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  const { currentUser } = useContext(DataContext);
  const currentUserId = currentUser[0]?.id;

  // READ for list
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3003/home/stories", authConfig())
  //     .then((res) => {
  //       setStories(res.data);
  //     });
  // }, [lastUpdate]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/home/stories/" + currentUserId, authConfig())
      .then((res) => {
        setStories(res.data);
      });
  }, [currentUserId, lastUpdate]);

  // CREATE STORIE for user

  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios
      .post("http://localhost:3003/home/stories", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // DELETE STORIE for user

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

  // EDIT STORIE for user

  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/stories/" + editData.id,
        editData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  return (
    <StoriesUserContext.Provider
      value={{
        setCreateData,
        stories,
        setDeleteData,
        modalData,
        setModalData,
        setEditData,
        currentUserId,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-4 col-md-12">
            <CreateS />
          </div>
          <div className="col col-lg-8 col-md-12">
            <ListS />
          </div>
        </div>
      </div>
      <EditS />
    </StoriesUserContext.Provider>
  );
}

export default MainS;
