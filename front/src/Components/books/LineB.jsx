import { useContext } from "react";
import BooksContext from "../../Contexts/BooksContext";

function LineB({ book }) {
  const { setDeleteData, setModalData } = useContext(BooksContext);

  return (
    <li className="list-group-item">
      <div className="li-content-one">
        <div className="li-content-one-main">
          <div className="li-content-one-img">
            {book.image ? (
              <div className="img-bin">
                <img src={book.image} alt={book.name}></img>
              </div>
            ) : (
              <div className="no-image">No image</div>
            )}
          </div>
          <div className="li-content-one-info">
            <div className="li-content-details">Title: {book.name}</div>
            <div className="li-content-details">Author: {book.author}</div>
            <div className="li-content-details">
              Category: {book.categoryTitle}
            </div>
            <div className="li-content-details">
              Status: {book.status ? "Reserved" : "Not Reserved"}
            </div>
          </div>
        </div>
      </div>
      <div className="li-btn-box">
        <button
          onClick={() => setModalData(book)}
          type="button"
          className="btn btn-outline-success"
        >
          Edit
        </button>
        <button
          onClick={() => setDeleteData(book)}
          type="button"
          className="btn btn-outline-danger"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default LineB;
