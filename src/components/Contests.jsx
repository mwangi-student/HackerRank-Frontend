import { RolesData } from "../data/roles-data";
import { CodingContests } from "../data/contest-data";

const Contests = () => {
  return (
    <div>
      <div>
        <section className="roles-certification">
          <h3 className="certify-heading text-center text-3xl text-bold">
            Get your skills sharpened
          </h3>
          <hr className="mx-auto w-32 border-gray-400 border-2 my-2" />
          <div className="cards-container">
            {RolesData.map((item, index) => {
              return (
                <div key={index} className="card">
                  <h2 className="card-heading">
                    {item.heading}
                    <p className="font-light text-gray-500 font-sans">
                      {item.date}
                    </p>
                    <span>
                      <img src="src\assets\SVG.png" alt="info" />
                    </span>
                  </h2>

                  <div>
                    <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                      View Challenges
                    </button>
                  </div>
                  <img src={item.img} alt={item.alt} className="role-img" />
                </div>
              );
            })}
          </div>
          <h3 className="certify-heading text-center text-3xl text-bold">
            Take part in a Contest
          </h3>
          <hr className="mx-auto w-32 border-gray-400 border-2 my-2" />
          <div className="cards-container">
            {CodingContests.map((item, index) => {
              return (
                <div key={index} className="card">
                  <h2 className="card-heading">
                    {item.heading}

                    <p className="font-light text-gray-500 font-sans">
                      {item.date}
                    </p>
                    <span>
                      <img src="src\assets\SVG.png" alt="info" />
                    </span>
                  </h2>
                  <div>
                    <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                      Participate Challenges
                    </button>
                  </div>
                  <img src={item.img} alt={item.alt} className="skill-img" />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contests;
