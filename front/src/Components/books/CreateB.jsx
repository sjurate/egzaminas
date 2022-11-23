import { useState, useContext, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import BooksContext from "../../Contexts/BooksContext";
import getBase64 from "../../Functions/getBase64";

function CreateB() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  // const [status, setStatus] = useState("");
  // const [term, setTerm] = useState("");
  // const [term_count, setTerm_count] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();
  const [cat, setCat] = useState(0);

  const { setCreateData, categories } = useContext(BooksContext);
  const { setMsg } = useContext(DataContext);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const add = () => {
    if (author === "" || name === "") {
      setMsg("Please fill all required fields");
      return;
    }
    if (author.length < 3 || author.length > 50) {
      setMsg("Author name must be longer than 2 and shorter than 50 symbols");
      return;
    }
    if (name.length < 2 || name.length > 50) {
      setMsg("Title must be longer than 2 and shorter than 50 symbols");
      return;
    }
    setCreateData({
      author,
      name,
      image: photoPrint,
      category_id: parseInt(cat),
    });
    setAuthor("");
    setName("");
    setPhotoPrint(null);
    fileInput.current.value = null;
    setCat(0);
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">Add Book</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select Category</label>
          <select
            className="form-select"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            <option value={0} disabled>
              Choose from list
            </option>

            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            ref={fileInput}
            type="file"
            className="form-control"
            onChange={doPhoto}
          />
        </div>
        {photoPrint ? (
          <div className="img-bin">
            <img src={photoPrint} alt="upload"></img>
          </div>
        ) : null}
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
    </div>
  );
}

export default CreateB;
