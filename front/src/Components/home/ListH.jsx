import { useState, useEffect, useContext } from "react";
import HomeContext from "../../Contexts/HomeContext";
import LineH from "./LineH";

function ListH() {
  const { books, setBooks, filterOn, filterWhat, categories } =
    useContext(HomeContext);

  const [categoryId, setCategoryId] = useState(0);
  const [searchBy, setSearchBy] = useState("");

  useEffect(() => {
    setBooks((prevBooks) =>
      prevBooks?.map((b) =>
        Number(b.category_id) === Number(categoryId) || Number(categoryId) === 0
          ? { ...b, show: true }
          : { ...b, show: false }
      )
    );
  }, [categoryId, setBooks]);

  const filterBySearch = () => {
    setBooks((prevBooks) =>
      prevBooks?.map((b) =>
        b.name.toLowerCase().includes(searchBy.toLocaleLowerCase())
          ? { ...b, show: true }
          : { ...b, show: false }
      )
    );
    setSearchBy("");
  };

  const resetFilter = () => {
    setBooks((prevBooks) => prevBooks.map((b) => ({ ...b, show: true })));
    filterOn.current = false;
    filterWhat.current = null;
  };

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Filter by:</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">By category</label>
            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value={0}>All categories</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Search by:</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Enter title of the book:</label>
            <input
              type="text"
              className="form-control"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            ></input>
          </div>
          <button className="btn btn-outline-success" onClick={filterBySearch}>
            Search
          </button>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Books in the library:</h5>
        <small
          onClick={resetFilter}
          className="click-link reset-filter show-all"
        >
          Show all books
        </small>
        <div className="card-body">
          <ul className="list-group">
            {books?.map((b) => (b.show ? <LineH key={b.id} book={b} /> : null))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ListH;
