import { useContext, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import HomeContext from "../../Contexts/HomeContext";

function LineH({ book }) {
  const { setStatusData } = useContext(HomeContext);
  const { setMsg } = useContext(DataContext);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

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
              Category: {book.category_id}
            </div>
            <div className="li-content-details">
              {book.status === 1 ? "Unavailable at the moment" : null}
            </div>
          </div>
          {book.status === 0 ? (
            <button
              onClick={reserve}
              type="button"
              className="btn btn-outline-success"
            >
              Reserve
            </button>
          ) : null}
        </div>
      </div>
      {/* <div className="li-content-many">
        <h4>Already helped us:</h4>
        <ul className="list-group">
          {storie[1]?.map((d) =>
            d.did !== null ? (
              <li key={d.did} className="list-group-item">
                <div className="li-content-details">
                  {d.name} already donated:
                </div>
                <div className="li-content-details">
                  {d.amount_donating} Eur
                </div>
              </li>
            ) : null
          )}
        </ul>
        <div className="mb-3">
          <h4 className="form-label">Donate for this story:</h4>
          <label className="input-label">Your name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="input-label">
            Amount you are willing to donate:{" "}
          </label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button onClick={add} type="button" className="btn btn-outline-success">
          Donate
        </button>
      </div> */}
    </li>
  );
}

export default LineH;
