import { useState, useContext } from "react";
import DataContext from "../../Contexts/DataContext";
import CategoriesContext from "../../Contexts/CategoriesContext";

function CreateC() {
  const [title, setTitle] = useState("");

  const { setCreateData, currentUserId } = useContext(CategoriesContext);
  const { setMsg } = useContext(DataContext);

  const add = () => {
    if (title === "") {
      setMsg("Category's title can't be empty");
      return;
    }
    if (title.length < 3 || title.length > 50) {
      setMsg("Title must be longer than 2 and shorter than 50 symbols");
      return;
    }
    setCreateData({
      title,
      user_id: Number(currentUserId),
    });
    setTitle("");
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">New Category</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
    </div>
  );
}

export default CreateC;
