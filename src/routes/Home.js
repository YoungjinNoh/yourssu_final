import AwardList from "../components/AwardList";
import ProjectList from "../components/ProjectList";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { fstore } from "../fbase";

const Home = ({ userObj }) => {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    const unsubTexts = onSnapshot(
      query(collection(fstore, "guestbook"), orderBy("date", "desc")),
      (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setTexts(newArray);
      }
    );

    const unsubProjects = onSnapshot(
      query(collection(fstore, "project"), orderBy("date", "desc")),
      (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setProjects(newArray);
      }
    );
    const unsubAwards = onSnapshot(
      query(collection(fstore, "award"), orderBy("date", "desc")),
      (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setAwards(newArray);
      }
    );

    return () => {
      unsubTexts();
      unsubProjects();
      unsubAwards();
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (text === "") return;
    await addDoc(collection(fstore, "guestbook"), {
      text: text,
      writer: userObj.displayName ? userObj.displayName.split("@")[0] : "익명",
      date: Date.now(),
    });
    setText("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  return (
    <>
      <header
        className="py-5 bg-image-full"
        style={{
          background: "url(https://source.unsplash.com/wfh8dDlNFOk/1600x900)",
        }}
      >
        <div className="text-center my-5">
          <img
            className="img-fluid rounded-circle mb-4"
            src="me.jpg"
            alt="..."
            width="150px"
          />
          <h1 className="text-white fs-3 fw-bolder">Youngjin Noh</h1>
          <p className="text-white-50 mb-0">
            1999.05. 출생<br />
            2012.02. 영신초등학교 졸업<br />
            2015.02. 윤중중학교 졸업<br />
            2018.02. 선린인터넷고등학교 웹운영과 졸업<br />
            2019.03. 숭실대학교 컴퓨터학부 입학<br />
            2019. 선린인터넷고등학교 수업협력교사<br />
            2022.01. 공군 병장 만기전역<br />
            2022. 대건정보처리학원 코딩강사
          </p>
        </div>
      </header>
      <section className="py-5">
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <form onSubmit={onSubmit}>
                <div className="input-group">
                  <textarea className="form-control" value={text}
                    onChange={onChange}
                    placeholder="방명록을 작성해주세요" aria-label="With textarea"></textarea>
                </div>
                <input type="submit" value="등록" style={{ float: 'right' }} />
              </form>
              <div className="pt-2" style={{ clear: 'both' }}>
                {texts.map((text) => (
                  <div key={text.id}>
                    <hr />
                    <p className="lead" >
                      {"작성자: " + text.writer}</p>
                    <p className="mb-0">
                      {text.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="py-5 bg-image-full"
        style={{
          background: "url(https://source.unsplash.com/4ulffa6qoKA/1200x800)",
        }}
      >
        <div style={{ height: "20rem" }}></div>
      </div>
      <section className="py-5">
        <ProjectList projects={projects} />
        
      </section>
      <section className="py-5">

      <AwardList awards={awards} />
      </section>

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

export default Home;