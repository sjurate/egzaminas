import { useContext } from "react";
import StoriesUserContext from "../../Contexts/StoriesUserContext";

function LineS({ storie }) {
  const { setDeleteData, setModalData } = useContext(StoriesUserContext);

  return (
    <li className="list-group-item">
      <div className="li-content-one">
        <div className="li-content-one-main">
          <div className="li-content-one-img">
            {storie.image ? (
              <div className="img-bin">
                <img src={storie.image} alt={storie.title}></img>
              </div>
            ) : (
              <div className="no-image">No image</div>
            )}
          </div>
          <div className="li-content-one-info">
            <div className="li-content-details">
              My story title: {storie.title}
            </div>
            <div className="li-content-details">
              My story description: {storie.info}
            </div>
            <div className="li-content-details">
              Amount wanted: {storie.amount_wanted}
            </div>
          </div>
        </div>
      </div>
      <div className="li-btn-box">
        <button
          onClick={() => setModalData(storie)}
          type="button"
          className="btn btn-outline-success"
        >
          Edit
        </button>
        <button
          onClick={() => setDeleteData(storie)}
          type="button"
          className="btn btn-outline-danger"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default LineS;
