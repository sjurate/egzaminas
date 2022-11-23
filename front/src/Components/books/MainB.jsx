import { useState, useEffect } from "react";
import axios from "axios";
import BooksContext from "../../Contexts/BooksContext";
//import DataContext from "../../Contexts/DataContext";
import CreateB from "./CreateB";
import ListB from "./ListB";
import EditB from "./EditB";
import { authConfig } from "../../Functions/auth";

function MainB() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [books, setBooks] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  // const { currentUser } = useContext(DataContext);
  // const currentUserId = currentUser[0]?.id;

  // READ for list of categories for select

  useEffect(() => {
    axios
      .get("http://localhost:3003/home/categories", authConfig())
      .then((res) => {
        setCategories(res.data);
      });
  }, [lastUpdate]);

  // READ for list of books

  useEffect(() => {
    axios.get("http://localhost:3003/home/books", authConfig()).then((res) => {
      setBooks(res.data);
    });
  }, [lastUpdate]);

  // CREATE book

  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios
      .post("http://localhost:3003/home/books", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // DELETE book

  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    axios
      .delete("http://localhost:3003/home/books/" + deleteData.id, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // EDIT book

  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/home/books/" + editData.id,
        editData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  return (
    <BooksContext.Provider
      value={{
        setCreateData,
        categories,
        books,
        setDeleteData,
        modalData,
        setModalData,
        setEditData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-4 col-md-12">
            <CreateB />
          </div>
          <div className="col col-lg-8 col-md-12">
            <ListB />
          </div>
        </div>
      </div>
      <EditB />
    </BooksContext.Provider>
  );
}

export default MainB;
