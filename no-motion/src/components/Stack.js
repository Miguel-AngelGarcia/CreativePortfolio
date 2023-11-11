import React from "react";
import Image from "next/image";

const Stack = () => {
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

  const frameworks = [
    { id: 1, langName: "ASP.NET", img: "/aspnet.svg" },
    { id: 2, langName: "Flask", img: "" },
    { id: 3, langName: "Ruby on Rails", img: "rails/.svg" },
    { id: 4, langName: "Next.Js", img: "" },
    { id: 5, langName: "Spring Boot", img: "/springboot.svg" },
  ];

  const tools = [
    { id: 1, langName: "Illustrator", img: "/illustrator.svg" },
    { id: 2, langName: "Selenium", img: "/.svg" },
    { id: 3, langName: "React", img: "/react.svg" },
    { id: 4, langName: "RESTful API", img: "/.svg" },
    { id: 5, langName: "Pandas", img: "/pandas.svg" },
    { id: 6, langName: "Photoshop", img: "/.svg" },
    { id: 7, langName: "Figma", img: "/figma.svg" },
  ];

  return (
    <section className="stack">
      <div className="stack-cont">
        <div className="stack-header">
          <h2 className="stack-title">My tech stack includes:</h2>
          <div className="stack-fill"></div>
        </div>
        <div className="stack-lang">
          <h1 className="stack-lang-header">Languages</h1>
          <div className="stack-lang-det">
            {languages.map((lang) => (
              <div key={lang.id} className="stack-lang-item">
                <div className="stack-lang-title">
                  <h1 className="stack-lang-h1">{lang.langName}</h1>
                </div>

                {lang.id % 2 >= 0 && (
                  <div>
                    <Image src={lang.img} alt="test" height={40} width={40} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stack;
