import React from "react";
import Image from "next/image";

export const Tools = () => {
  const tools = [
    { id: 1, toolName: "Illustrator", img: "/illustrator.svg" },
    { id: 2, toolName: "Selenium", img: "/selenium.svg" },
    { id: 3, toolName: "React", img: "/react.svg" },
    { id: 4, toolName: "RESTful API", img: "/rest.svg" },
    { id: 5, toolName: "Pandas", img: "/pandas.svg" },
    { id: 6, toolName: "Photoshop", img: "/photoshop.svg" },
    { id: 7, toolName: "Figma", img: "/figma.svg" },
  ];

  return (
    <div className="stack-lang">
      <h1 className="stack-lang-header">Tools</h1>
      <div className="stack-lang-det">
        {tools.map((tool) => (
          <div key={tool.id} className="stack-lang-item">
            <div className={`si stack-item-${tool.toolName}`}>
              <Image src={tool.img} alt="test" height={40} width={40} />
            </div>
            <div className="stack-lang-title">
              <h1 className="stack-lang-h1">{tool.toolName}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
