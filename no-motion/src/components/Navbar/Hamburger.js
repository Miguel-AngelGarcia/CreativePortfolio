"use client";
import React from "react";
import { useState } from "react";

export const Hamburger = () => {
  const [burgerStatus, setBurgerStatus] = useState(false);

  function changeBurgerStatus() {
    console.log("clicked:");
    if (burgerStatus === false) {
      setBurgerStatus(true);
    } else setBurgerStatus(false);
  }

  return (
    <>
      <div className="burger-wrapper" onClick={changeBurgerStatus}>
        <div
          className="burger-line"
          style={{
            backgroundColor: burgerStatus ? "white" : "#000",
            transform: burgerStatus ? "translate3d(0, 7px, 0)" : "rotate(0)",
          }}
        ></div>
        <div
          className="burger-line"
          style={{
            backgroundColor: burgerStatus ? "white" : "#000",
            transform: burgerStatus ? "rotate(90deg)" : "rotate(0)",
          }}
        ></div>
      </div>
      <div
        className="burger-list-wrapper"
        style={{
          transform: burgerStatus ? "translateX(0)" : "translateX(150vw)",
        }}
      >
        <ul className="burger-list">
          <li>
            <a className="nav-link-mobile">Work</a>
          </li>
          <li>
            <a className="nav-link-mobile">About</a>
          </li>
          <li>
            <a className="nav-link-mobile">Contact</a>
          </li>
        </ul>
      </div>
    </>
  );
};
