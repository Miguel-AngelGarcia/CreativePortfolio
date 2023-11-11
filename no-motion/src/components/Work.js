"use client";
import React from "react";
import { useState } from "react";

const Work = () => {
  function showDesc() {
    if (clicked == "") {
      setClicked("show");
    } else setClicked("");
  }
  const [clicked, setClicked] = useState("");

  return (
    <div className="resume-career">
      <div className="each-exp">
        <div className="exp-title" onClick={showDesc}>
          <h2 className="exp-det">2008-2012</h2>
          <h2 className="exp-det b">Some School</h2>
          <h2 className="exp-det b">Position AT</h2>
        </div>
        <div className={`exp-desc ${clicked}`}>
          <div className="indent-div"></div>
          <div className="desc-desc">
            wwas there for a good time, not a long time. it just be like that
            sometimes. it it may not be what you wwant it to be, it may not be
            what you deserve, but it is what it is. wow this mo-fo really needs
            a lot of words to get to the damn next line
          </div>
        </div>
        <div className="linea"></div>
      </div>

      <div className="each-exp">
        <div className="exp-title">
          <h2 className="exp-det">2008-2012</h2>
          <h2 className="exp-det b">So me School</h2>
          <h2 className="exp-det b">Position AT</h2>
        </div>
        <div className="exp-desc">
          <div className="indent-div"></div>
          <div className="desc-desc">
            wwas there for a good time, not a long time. it just be like that
            sometimes. it it may not be what you wwant it to be, it may not be
            what you deserve, but it is what it is. wow this mo-fo really needs
            a lot of words to get to the damn next line
          </div>
        </div>
        <div className="linea"></div>
      </div>

      <div className="each-exp">
        <div className="exp-title">
          <h2 className="exp-det">2008-2012</h2>
          <h2 className="exp-det b">Some School</h2>
          <h2 className="exp-det b">Position AT</h2>
        </div>
        <div className="exp-desc">
          <div className="indent-div"></div>
          <div className="desc-desc">
            wwas there for a good time, not a long time. it just be like that
            sometimes. it it may not be what you wwant it to be, it may not be
            what you deserve, but it is what it is. wow this mo-fo really needs
            a lot of words to get to the damn next line
          </div>
        </div>
        <div className="linea"></div>
      </div>
    </div>
  );
};

export default Work;
