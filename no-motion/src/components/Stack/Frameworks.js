import React from "react";
import Image from "next/image";

const Frameworks = () => {
  const frameworks = [
    { id: 1, frameName: "ASP.NET", img: "/aspnet.svg" },
    { id: 2, frameName: "Flask", img: "./flask.svg" },
    { id: 3, frameName: "Ruby on Rails", img: "/rails.svg" },
    { id: 4, frameName: "Next.Js", img: "/next.svg" },
    { id: 5, frameName: "Spring Boot", img: "/springboot.svg" },
  ];

  return (
    <div className="stack-lang">
      <h1 className="stack-lang-header">Frameworks</h1>
      <div className="stack-lang-det">
        {frameworks.map((frame) => (
          <div key={frame.id} className="stack-lang-item">
            <div className={`si stack-item-${frame.frameName}`}>
              <Image src={frame.img} alt="test" height={40} width={40} />
            </div>
            <div className="stack-lang-title">
              <h1 className="stack-lang-h1">{frame.frameName}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frameworks;
