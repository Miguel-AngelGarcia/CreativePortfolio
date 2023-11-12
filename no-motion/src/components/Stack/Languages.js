import React from "react";
import Image from "next/image";
export const Languages = () => {
  const languages = [
    { id: 1, langName: "Python", img: "/python.svg" },
    { id: 2, langName: "JavaScript", img: "/javascript.svg" },
    { id: 3, langName: "Java", img: "/java.svg" },
    { id: 4, langName: "TypeScript", img: "/typescript.svg" },
    { id: 5, langName: "C#", img: "/csharp.svg" },
    { id: 6, langName: "Go", img: "/golang.svg" },
    { id: 7, langName: "Ruby", img: "/ruby.svg" },
    { id: 8, langName: "SQL", img: "/sql.svg" },
  ];

  return (
    <div className="stack-lang">
      <h1 className="stack-lang-header">Languages</h1>
      <div className="stack-lang-det">
        {languages.map((lang) => (
          <div key={lang.id} className="stack-lang-item">
            <div className={`si stack-item-${lang.langName}`}>
              <Image src={lang.img} alt="test" height={40} width={40} />
            </div>
            <div className="stack-lang-title">
              <h1 className="stack-lang-h1">{lang.langName}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
