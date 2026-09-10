import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => {
          const isDevelopment = project.status === "development";

          const cardContent = (
            <>
              <div className="myworks-card-number">0{index + 1}</div>
              <div className="myworks-card-image">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} website preview`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : isDevelopment ? (
                  <div className="myworks-card-placeholder myworks-card-placeholder-dev">
                    <span className="myworks-placeholder-name">{project.title}</span>
                    <span className="myworks-placeholder-status">IN DEVELOPMENT</span>
                    <span className="myworks-placeholder-progress">{project.progress || 0}%</span>
                  </div>
                ) : (
                  <div className="myworks-card-placeholder">
                    <span>{project.title}</span>
                  </div>
                )}
              </div>
              <div className="myworks-card-info">
                <h3>{project.title}</h3>
                <p className="myworks-card-category">{project.category}</p>
                <p className="myworks-card-description">{project.description}</p>
                <p className="myworks-card-tech">{project.technologies}</p>
                {/* Progress bar for development projects */}
                {isDevelopment && project.progress !== undefined && (
                  <div className="myworks-progress">
                    <div className="myworks-progress-bar">
                      <div className="myworks-progress-fill" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <span className="myworks-progress-text">{project.progress}% IN DEVELOPMENT</span>
                  </div>
                )}
                {/* Buttons for live projects */}
                {!isDevelopment && (project.link || project.github) && (
                  <div className="myworks-buttons">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="myworks-btn myworks-btn-live"
                        data-cursor="disable"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Live
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="myworks-btn myworks-btn-github"
                        data-cursor="disable"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </>
          );

          // Development projects: no link wrapper
          if (isDevelopment) {
            return (
              <div className="myworks-card" key={project.id}>
                {cardContent}
              </div>
            );
          }

          // Live projects with external link
          if (project.link && !project.link.startsWith("/")) {
            return (
              <div className="myworks-card" key={project.id}>
                {cardContent}
              </div>
            );
          }

          // Projects with internal link
          if (project.link && project.link.startsWith("/")) {
            return (
              <Link
                className="myworks-card"
                key={project.id}
                data-cursor="disable"
                to={project.link}
              >
                {cardContent}
              </Link>
            );
          }

          // No link
          return (
            <div className="myworks-card" key={project.id}>
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyWorks;
