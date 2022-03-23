import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <h2>Projects</h2>
          </div>
        </div>
      </div>

      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

          {projects.map((project) => (
            <div className="col mb-5" key={project.id}>
              <div className="card h-100">
                <video className="card-img-top" src={project.video} height="130px" alt="..." />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">{project.title}</h5>
                    {project.date.slice(0, 7)}
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center"><Link to={`/project/${project.id}`}><span className="btn btn-outline-dark mt-auto" >자세히 보기</span></Link></div>
                </div>
              </div>
            </div>
          ))}



        </div>
      </div>
    </>
  );
};

export default ProjectList;
