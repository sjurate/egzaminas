import { useContext } from "react";
import StoriesAdminContext from "../../Contexts/StoriesAdminContext";
import LineSA from "./LineSA";

function ListSA() {
  const { stories } = useContext(StoriesAdminContext);

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Stories:</h5>
        <div className="card-body">
          <ul className="list-group">
            {stories?.map((s) => (
              <LineSA key={s.id} storie={s} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ListSA;
