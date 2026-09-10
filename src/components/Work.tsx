import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    // Disable pinning on mobile to allow scrolling
    if (window.innerWidth <= 768) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Refresh ScrollTrigger after layout settles
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {config.projects.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.technologies}</p>
                {/* RiseUp progress indicator */}
                {project.status === "development" && project.progress !== undefined && (
                  <div className="work-progress">
                    <span className="work-progress-label">Development Progress</span>
                    <div className="work-progress-bar">
                      <div className="work-progress-fill" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <span className="work-progress-text">{project.progress}% IN DEVELOPMENT</span>
                  </div>
                )}
                {/* Live/GitHub buttons */}
                {project.status === "live" && (
                  <div className="work-buttons">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-btn work-btn-live"
                        data-cursor="disable"
                      >
                        View Live
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-btn work-btn-github"
                        data-cursor="disable"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
              <WorkImage
                image={project.image}
                alt={
                  project.status === "development"
                    ? `${project.title} - In Development`
                    : `${project.title} website preview`
                }
                link={project.status === "development" ? "" : project.link}
                status={project.status}
                progress={project.progress}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
