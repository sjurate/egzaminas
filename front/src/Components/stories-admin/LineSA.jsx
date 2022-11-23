import { useContext } from "react";
import StoriesAdminContext from "../../Contexts/StoriesAdminContext";

function LineSA({ storie }) {
  const { setEditData, setDeleteData } = useContext(StoriesAdminContext);

  const remove = () => {
    setDeleteData({ id: storie.id });
  };

  const approve = () => {
    setEditData({ id: storie.id, status: 1 });
  };

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
              Story title: {storie.title}
            </div>
            <div className="li-content-details">
              Story description: {storie.info}
            </div>
            <div className="li-content-details">
              Amount wanted: {storie.amount_wanted}
            </div>
            <div className="li-content-details">
              Status: {storie.status ? "Approved" : "Not approved"}
            </div>
          </div>
        </div>
      </div>
      <div className="li-btn-box">
        <button
          onClick={approve}
          type="button"
          className="btn btn-outline-success"
        >
          Approve
        </button>
        <button
          onClick={remove}
          type="button"
          className="btn btn-outline-danger"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default LineSA;
