import { bannerData } from "../data/banner-data";

const Banner = () => {
  return (
    <section>
      <div className="banner-container">
        {bannerData.map((item, index) => {
          return (
            <div key={index} className="banner-cards-container">
              <h3 className="banner-heading">{item.heading}</h3>
              <p className="banner-description">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Banner;
