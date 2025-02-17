import { RolesData } from "../data/roles-data";
import { SkillsData } from "../data/skills-data";

const Certifications = () => {
  return (
    <div>
      <div>
        <section className="roles-certification">
          <h3 className="certify-heading">Get Your Roles Certified</h3>
          <div className="cards-container">
            {RolesData.map((item, index) => {
              return (
                <div key={index} className="card">
                  <h2 className="card-heading">
                    {item.heading}
                    <span>
                      <img src="src\assets\SVG.png" alt="info" />
                    </span>
                  </h2>
                  <div>
                    <button className="btn skills-btn">Get certified</button>
                  </div>
                  <img src={item.img} alt={item.alt} className="role-img" />
                </div>
              );
            })}
          </div>
          <h3 className="certify-heading">Get Your Skills Certified</h3>
          <div className="cards-container">
            {SkillsData.map((item, index) => {
              return (
                <div key={index} className="card">
                  <h2 className="card-heading">
                    {item.heading}
                    <span>
                      <img src="src\assets\SVG.png" alt="info" />
                    </span>
                  </h2>
                  <div>
                    <button className="btn skills-btn">Get certified</button>
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

export default Certifications;
