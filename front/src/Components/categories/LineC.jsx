import { useContext } from "react";
import CategoriesContext from "../../Contexts/CategoriesContext";

function LineC({ category }) {
  const { setDeleteData } = useContext(CategoriesContext);

  const remove = () => {
    setDeleteData({ id: category.id });
  };

  // const approve = () => {
  //   setEditData({ id: category.id, status: 1 });
  // };

  return (
    <li className="list-group-item">
      <div className="li-content-one">
        <div className="li-content-one-main">
          <div className="li-content-one-info">
            <div className="li-content-details">{category.title}</div>
          </div>
        </div>
      </div>
      <div className="li-btn-box">
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

export default LineC;
