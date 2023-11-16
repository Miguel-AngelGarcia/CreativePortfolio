import React from "react";
import Image from "next/image";

export const Projects = () => {
  const projects = [
    {
      id: 1,
      projName: "Real Estate Predictor",
      tags: [
        { id: 1, tagName: "Machine Learning" },
        { id: 2, tagName: "Full Stack" },
        { id: 3, tagName: "REST API" },
        { id: 4, tagName: "SQLite" },
        { id: 5, tagName: "Pandas" },
      ],
      img: "/ml.png",
    },
    {
      id: 2,
      projName: "Whats For Dinner",
      tags: [
        { id: 1, tagName: "Responsive" },
        { id: 2, tagName: "SQL Database" },
        { id: 3, tagName: "Java Spring Boot" },
      ],
      img: "/food.png",
    },
    {
      id: 3,
      projName: "Photography Showcase",
      tags: [
        { id: 1, tagName: "Motion" },
        { id: 2, tagName: "JavaScript" },
        { id: 3, tagName: "CSS" },
      ],
      img: "/photo.png",
    },
    {
      id: 4,
      projName: "Canvas",
      tags: [
        { id: 1, tagName: "Game" },
        { id: 2, tagName: "Canvas" },
        { id: 3, tagName: "JavaScript" },
      ],
      img: "/game.png",
    },
  ];
  return (
    <section className="projects-wrapper">
      <div className="projects-cont">
        {projects.map((project) => (
          <div className={`each-proj proj-${project.id}`} key={project.id}>
            <Image src={project.img} alt="test" priority={true} fill />
            <div className="proj-tag-cont">
              {project.tags.map((tag) => (
                <div key={tag.id} className="tag-cont outline-cs-1">
                  <p className="pro-tag">{tag.tagName}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
