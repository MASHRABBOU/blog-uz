import "./media.css";
import { useState } from "react";
import { useEffect } from "react";

export const MediaComp = () => {
  const [photo, setPhoto] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    fetch(
      import.meta.env.VITE_APP_BASE_URL + `/img?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setPhoto(data.results));
  }, [page, limit]);

  const increment = () => {
    setLimit(limit + 9)
  }

  return (
    <section className="media">
      <div className="container">
        <div className="media-inner">
          <h2 className="media-title">Rasmlar</h2>

          <ul className="media-list">
            {photo.length &&
              photo.map((item, idx) => (
                <li className="media-item" key={idx}>
                  <img src={item.img} alt="img" className="media-img" />
                </li>
              ))}
          </ul>
          <button className="media-btn" onClick={increment}>Yana ko'rish</button>
        </div>
      </div>
    </section>
  );
};
