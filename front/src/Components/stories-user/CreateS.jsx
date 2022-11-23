import { useState, useContext, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import StoriesUserContext from "../../Contexts/StoriesUserContext";
import getBase64 from "../../Functions/getBase64";

function CreateS() {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [amount_wanted, setAmount_wanted] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();

  const { setCreateData, currentUserId } = useContext(StoriesUserContext);
  const { setMsg } = useContext(DataContext);

  console.log(currentUserId);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const add = () => {
    if (title === "" || info === "" || amount_wanted === "") {
      setMsg("Please fill all required fields");
      return;
    }
    if (title.length < 3 || title.length > 30) {
      setMsg("Title must be longer than 2 and shorter than 30 symbols");
      return;
    }
    if (info.length < 10 || info.length > 2000) {
      setMsg(
        "Description must be longer than 10 and shorter than 2000 symbols"
      );
      return;
    }
    setCreateData({
      title,
      info,
      amount_wanted: Number(amount_wanted),
      amount_left: Number(amount_wanted),
      user_id: Number(currentUserId),
      image: photoPrint,
    });
    setTitle("");
    setInfo("");
    setAmount_wanted("");
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">New Story</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Story Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Info</label>
          <input
            type="text"
            className="form-control"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount wanted</label>
          <input
            type="text"
            className="form-control"
            value={amount_wanted}
            onChange={(e) => setAmount_wanted(e.target.value)}
          />
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

export default CreateS;
