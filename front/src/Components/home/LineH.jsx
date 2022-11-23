import { useContext, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import HomeContext from "../../Contexts/HomeContext";

function LineH({ storie }) {
  const { setAmountData, setDonation } = useContext(HomeContext);
  const { setMsg } = useContext(DataContext);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const add = () => {
    if (name === "" || name.length < 2 || name.length > 30) {
      setMsg("Invalid name");
      return;
    }
    if (amount === String || amount < 1 || amount > 1000000) {
      setMsg("Minimum donation 1 Eur, maximum donation 1000000 Eur");
      return;
    }
    if (amount > storie[1][0].amount_left) {
      setMsg(
        "We were hoping to collect less than you are willing to donate... "
      );
      return;
    }
    setDonation({
      name,
      amount_donating: Number(amount),
      storie_id: storie[1][0].id,
    });
    setAmountData({
      id: storie[1][0].id,
      amount_donating: Number(amount),
    });
    setAmount("");
    setName("");
  };

  return (
    <li className="list-group-item">
      <div className="li-content-one">
        <h2 className="li-content-one-title">{storie[0]}</h2>
        <div className="li-content-one-main">
          <div className="li-content-one-img">
            {storie[1][0].image ? (
              <div className="img-bin li-content-details">
                <img src={storie[1][0].image} alt={storie[0]}></img>
              </div>
            ) : (
              <div className="no-image">No image</div>
            )}
          </div>
          <div className="li-content-one-info">
            <div className="li-content-details">
              We hope to raise {storie[1][0].amount_wanted} Eur
            </div>
            <div className="li-content-details">
              So far collected:{" "}
              {storie[1][0].amount_collected ?? "no donations yet"} Eur
            </div>
            <div className="li-content-details">
              Left to collect: {storie[1][0].amount_left} Eur
            </div>
            <div className="li-content-details">
              Our story: {storie[1][0].info}
            </div>
          </div>
        </div>
      </div>
      <div className="li-content-many">
        <h4>Already helped us:</h4>
        <ul className="list-group">
          {storie[1]?.map((d) =>
            d.did !== null ? (
              <li key={d.did} className="list-group-item">
                <div className="li-content-details">
                  {d.name} already donated:
                </div>
                <div className="li-content-details">
                  {d.amount_donating} Eur
                </div>
              </li>
            ) : null
          )}
        </ul>
        <div className="mb-3">
          <h4 className="form-label">Donate for this story:</h4>
          <label className="input-label">Your name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="input-label">
            Amount you are willing to donate:{" "}
          </label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button onClick={add} type="button" className="btn btn-outline-success">
          Donate
        </button>
      </div>
    </li>
  );
}

export default LineH;
