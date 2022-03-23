import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fstore } from "../fbase";
import { useEffect, useState } from "react";

const ProjectDetail = () => {
  const params = useParams();
  const [ready, setReady] = useState(false);
  const [data, setData] = useState({});

  const getData = async () => {
    const docRef = doc(fstore, "project", params.id);
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
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-8">
                <article>
                  <header className="mb-4">
                    <h1 className="fw-bolder mb-1 mt-2">{data.title}</h1>
                    <div className="text-muted fst-italic mb-2">{`Developed at ${data.date.slice(0, 7)}`}</div>
                    {data.technology.map((tech, i) => (
                      <span key={i} className="badge bg-secondary text-decoration-none link-light">{`${tech} `}</span>
                    ))}
                  </header>
                  <figure className="mb-4" style={{display:"flex",justifyContent:"flex-end"}}><video
                    src={data.video}
                    width="600px"
                    height="400px"
                    controls
                    autoPlay
                  /></figure>
                </article>
              </div>
            </div>
          </div>



        </>
      ) : (
        <>Loaded...</>
      )}
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright © Youngjin's Portfolio 2022
          </p>
        </div>
      </footer>
    </>
  );
};

export default ProjectDetail;
