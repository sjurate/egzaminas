import { useContext } from "react";
import StoriesUserContext from "../../Contexts/StoriesUserContext";
import LineS from "./LineS";

function ListS() {
  const { stories } = useContext(StoriesUserContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Stories List</h5>
      <div className="card-body">
        <ul className="list-group">
          {stories?.map((s) => (
            <LineS key={s.id} storie={s} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListS;
