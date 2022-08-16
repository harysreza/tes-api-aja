import React, { useEffect, useState } from "react";
import axios from "axios";

const Photos = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    if (isCancelled === false) {
      setLoading(true);
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_BASEURL}/posts?_limit=10`,
      })
        .then((res) => setDatas(res.data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading) return <Loaders />;

  return (
    <div>
      {datas.map((data, i) => {
        return <h3 key={i}>{data.title}</h3>;
      })}
    </div>
  );
};

const Loaders = () => {
  return <p>Loading...</p>;
};

export default Photos;
