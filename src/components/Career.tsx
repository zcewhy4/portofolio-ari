import "./styles/Career.css";
import { config } from "../config";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My <span>Journey</span>
        </h2>
        <div className="journey-timeline">
          <div className="journey-line"></div>
          {config.journey.map((item, index) => (
            <div
              key={index}
              className={`journey-item ${index % 2 === 0 ? "journey-left" : "journey-right"}`}
            >
              <div className="journey-year-badge">
                <span>{item.year}</span>
              </div>
              <div className="journey-card">
                <div className="journey-card-header">
                  <h3>{item.title}</h3>
                  <span className="journey-subtitle">{item.subtitle}</span>
                </div>
                <p className="journey-description">{item.description}</p>
                {item.highlight && (
                  <p className="journey-highlight">{item.highlight}</p>
                )}
                {item.education && (
                  <div className="journey-education">
                    <span className="journey-edu-icon">🎓</span>
                    <span>{item.education}</span>
                  </div>
                )}
                {item.projects && item.projects.length > 0 && (
                  <div className="journey-projects">
                    <span className="journey-projects-label">Projects:</span>
                    <div className="journey-projects-list">
                      {item.projects.map((project, pIndex) => (
                        <span key={pIndex} className="journey-project-tag">
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="journey-skills">
                  {item.skills.map((skill, sIndex) => (
                    <span key={sIndex} className="journey-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
