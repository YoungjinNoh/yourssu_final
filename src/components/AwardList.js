const AwardList = ({ awards }) => {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <h2>Awards</h2>
          </div>
        </div>
      </div>
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {awards.map((award) => (
            <div className="col mb-5" key={award.id}>
              <div className="card h-100">
                <img className="card-img-top" src={award.image} alt="..." />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">{award.title}</h5>
                    {award.date.slice(0, 7)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  );
};

export default AwardList;
