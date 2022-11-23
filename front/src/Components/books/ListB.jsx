import { useContext } from "react";
import BooksContext from "../../Contexts/BooksContext";
import LineB from "./LineB";

function ListB() {
  const { books } = useContext(BooksContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Books List</h5>
      <div className="card-body">
        <ul className="list-group">
          {books?.map((b) => (
            <LineB key={b.id} book={b} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListB;
