import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fstore } from "../fbase";
import { useEffect, useState } from "react";

const AwardDetail = () => {
  const params = useParams();
  const [ready, setReady] = useState(false);
  const [data, setData] = useState({});

  const getData = async () => {
    const docRef = doc(fstore, "award", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
      setReady(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {ready ? (
        <>
          <h4>{data.title}</h4>
          <img src={data.image} width="400px" height="600px" />
          {data.date.slice(0, 7)}
        </>
      ) : (
        <>Loaded...</>
      )}
    </>
  );
};

export default AwardDetail;
