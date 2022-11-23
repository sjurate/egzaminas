import { useContext } from "react";
import CategoriesContext from "../../Contexts/CategoriesContext";
import LineC from "./LineC";

function ListC() {
  const { categories } = useContext(CategoriesContext);

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Stories:</h5>
        <div className="card-body">
          <ul className="list-group">
            {categories?.map((c) => (
              <LineC key={c.id} category={c} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ListC;
