import React from "react";
import Image from "next/image";
import Frameworks from "./Frameworks";
import { Languages } from "./Languages";
import { Tools } from "./Tools";

const Stack = () => {
  return (
    <section className="stack">
      <div className="stack-cont">
        <div className="stack-header">
          <h2 className="stack-title">My tech stack includes:</h2>
          <div className="stack-fill"></div>
        </div>
        <Languages />
        <Frameworks />
        <Tools />
      </div>
    </section>
  );
};

export default Stack;
