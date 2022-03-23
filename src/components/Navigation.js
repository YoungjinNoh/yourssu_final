import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fauth } from "../fbase";

const Navigation = ({ userObj }) => {
  let navigate = useNavigate();

  const onLogoutClick = () => {
    fauth.signOut();
    navigate("/");
  };

  return (
      <nav className="navbar fixed-top navbar-dark bg-dark d-flex" style={{justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none' }}><span className="navbar-brand">Youngjin's Portfolio</span></Link>
          <form className="d-flex">
            <span className="navbar-brand me-2">
              {userObj.displayName
                ? `${userObj.displayName}님 환영합니다!`
                : "게스트로 접속 중입니다."}
            </span>
            <input
              className="btn btn-outline-success"
              type="button"
              value="로그아웃"
              name="logout"
              onClick={onLogoutClick}
            />
          </form>
      </nav>
  );
};

export default Navigation;
