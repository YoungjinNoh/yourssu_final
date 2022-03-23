import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home.js";
import Auth from "./routes/Auth.js";
import AwardDetail from "./routes/AwardDetail.js";
import ProjectDetail from "./routes/ProjectDetail.js";
import { useEffect, useState } from "react";
import { fauth } from "./fbase.js";
import Navigation from "./components/Navigation";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    fauth.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.email,
        });
      } else {
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = fauth.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
    });
  };

  return (
    <>
      {Boolean(userObj) && <Navigation userObj={userObj} />}
      <div className="container">

        {init ? (
          <Routes>
            {Boolean(userObj) ? (
              <>
                <Route path="/" element={<Home userObj={userObj} />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/award/:id" element={<AwardDetail />} />
              </>
            ) : (
              <Route path="/" element={<Auth />} />
            )}
          </Routes>
        ) : (
          "initializing..."
        )}
      </div>

    </>
  );
}

export default App;
