import { useContext } from "react";
//import DataContext from "../../Contexts/DataContext";
import HomeContext from "../../Contexts/HomeContext";

function LineH({ book }) {
  const { setStatusData } = useContext(HomeContext);
  // const { setMsg } = useContext(DataContext);

  const reserve = () => {
    setStatusData({
      id: book.id,
      status: 1,
    });
  };

  return (
    <li className="list-group-item">
      <div className="li-content-one">
        <h2 className="li-content-one-title">{book.name}</h2>
        <div className="li-content-one-main">
          <div className="li-content-one-img">
            {book.image ? (
              <div className="img-bin li-content-details">
                <img src={book.image} alt={book.name}></img>
              </div>
            ) : (
              <div className="no-image">No image</div>
            )}
          </div>
          <div className="li-content-one-info">
            <div className="li-content-details">Author: {book.author}</div>
            <div className="li-content-details">
              Category: {book.categoryTitle}
            </div>
            <div
              className="li-content-details"
              style={{ color: book.status ? "crimson" : "green" }}
            >
              {book.status === 1
                ? "Unavailable at the moment"
                : "You can reserve this book"}
            </div>
          </div>
          {book.status === 0 ? (
            <button
              onClick={reserve}
              type="button"
              className="btn btn-outline-success reserve-btn"
            >
              Reserve
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default LineH;
