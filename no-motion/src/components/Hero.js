import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <div id="hero" className="flex flex-row entire-viewport hero-flex">
        <div className="hero-left">
          <div className="hl-top-row">
            <div className="mg-box-div">
              <div className="mg-box-cont">
                <a>mg</a>
              </div>
            </div>

            <div className="avatar">
              <div className="name-cont a-btn">
                <a href="#" className="name-cont-a ">
                  <p className="typed-out">hello, i'm miguel.</p>
                </a>
              </div>
              <div className="avatar-img">
                <Image src="/tetobb.png" alt="teto" fill priority />
              </div>
            </div>
          </div>

          <div className="abt-me-div a-btn">
            <a className="a-btn">
              <button className="btn-about-me">about me</button>
            </a>
          </div>
          <div className="get-in-touch-div a-btn">
            <a href="#about">
              <button className="btn-get-in-touch">get in touch</button>
            </a>
          </div>
          <div className="in-div">
            <a href="/#" className="in-a a-btn">
              <button className="in-btn">in</button>
            </a>
          </div>

          <a>see my work</a>
        </div>
        <div className="hero-right">
          <div className="hero-heading">
            <h1>Software</h1>
          </div>
          <div className="hero-heading">
            <h1>Engineer</h1>
          </div>
          <div className="hero-heading loc">
            <h1>in</h1>
            <h1>NYC</h1>
            <div className="flex flex-col justify-center align-middle">
              <Image
                id="initial-spinner"
                height={80}
                width={80}
                src="/mg-spiral.svg"
                alt="test"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
