import { useContext, useEffect, useState, useRef } from "react";
import BooksContext from "../../Contexts/BooksContext";
import getBase64 from "../../Functions/getBase64";

function EditB() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  // const [status, setStatus] = useState("");
  // const [term, setTerm] = useState("");
  // const [term_count, setTerm_count] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();
  const [cat, setCat] = useState(0);
  const [deletePhoto, setDeletePhoto] = useState(false);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const { setEditData, modalData, setModalData, categories } =
    useContext(BooksContext);

  const edit = () => {
    setEditData({
      author,
      name,
      image: photoPrint,
      category_id: parseInt(cat),
      id: modalData.id,
      deletePhoto: deletePhoto ? 1 : 0,
    });
    setModalData(null);
    setDeletePhoto(false);
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setAuthor(modalData.author);
    setName(modalData.name);
    setCat(modalData.category_id);
    setPhotoPrint(modalData.image);
    setDeletePhoto(false);
  }, [modalData]);

  if (null === modalData) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Book</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="card m-4">
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
                  <label htmlFor="image-delete">Delete image?</label>
                  <input
                    id="image-delete"
                    type="checkbox"
                    checked={deletePhoto}
                    onChange={() => setDeletePhoto((d) => !d)}
                  ></input>
                  <img src={photoPrint} alt="upload"></img>
                </div>
              ) : null}
              <button
                onClick={edit}
                type="button"
                className="btn btn-outline-success"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditB;
