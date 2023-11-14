import React from "react";
import Image from "next/image";

export const HeroLeft = () => {
  return (
    <div className="hero-left">
      <div className="hltr-t">
        <div className="nc-t">
          <a href="#" className="name-cont-a a-btn">
            <p className="typed-out nca-cont">hello, i'm miguel.</p>
          </a>
        </div>
        <div className="av-t">
          <div className="mg-box-div">
            <a className="a-btn">
              <div className="mg-box-cont">
                <Image
                  src="./mg.svg"
                  alt="my initials, 'm' & 'g'"
                  fill
                  priority={true}
                  className="mg-box-h1"
                />
              </div>
            </a>
          </div>
          <div className="ai-t">
            <Image src="/tetobb.png" alt="teto" fill priority />
          </div>
        </div>
      </div>

      <div className="hero-left-bot">
        <div className="hlb-left">
          <div className="get-in-touch-div">
            <a href="#about" className="a-btn btn-get-in-touch">
              get in touch
            </a>
          </div>
          <div className="work-div">
            <a className="a-btn work-btn" href="/#">
              see my work
            </a>
          </div>
        </div>

        <div className="hlb-right">
          <div className="abt-me-div a-btn">
            <a href="/#" className="">
              <button className="btn-about-me">about me</button>
            </a>
          </div>
          <div className="in-div">
            <a href="/#" className="in-a a-btn">
              <button className="in-btn">in</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
