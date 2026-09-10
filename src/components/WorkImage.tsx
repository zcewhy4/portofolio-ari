import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  status?: string;
  progress?: number;
}

const ProjectPlaceholder = ({ title, status, progress }: { title?: string; status?: string; progress?: number }) => (
  <div className="work-image-placeholder">
    {status === "development" ? (
      <>
        <span className="work-image-placeholder-name">{title?.replace(" website preview", "").replace(" - In Development", "") || "Project"}</span>
        <span className="work-image-placeholder-status">IN DEVELOPMENT</span>
        <span className="work-image-placeholder-progress">{progress || 0}%</span>
      </>
    ) : (
      <>
        <div className="work-image-placeholder-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M3 16l5-5 4 4 4-6 5 7" />
            <circle cx="8.5" cy="8.5" r="1.5" />
          </svg>
        </div>
        <span className="work-image-placeholder-text">{title || "Project Preview"}</span>
      </>
    )}
  </div>
);

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [imgError, setImgError] = useState(false);
  const isExternalLink = Boolean(props.link && !props.link.startsWith("/"));
  const hasValidImage = Boolean(props.image && !imgError);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const imageContent = hasValidImage ? (
    <img
      src={props.image}
      alt={props.alt}
      loading="lazy"
      decoding="async"
      onError={() => setImgError(true)}
    />
  ) : (
    <ProjectPlaceholder title={props.alt} status={props.status} progress={props.progress} />
  );

  // For development projects (RiseUp), never render as a clickable link
  if (props.status === "development") {
    return (
      <div className="work-image">
        <div className="work-image-in" data-cursor={"disable"}>
          {imageContent}
        </div>
      </div>
    );
  }

  return (
    <div className="work-image">
      {props.link ? (
        isExternalLink ? (
          <a
            className="work-image-in"
            href={props.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsVideo(false)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={"disable"}
          >
            <div className="work-link">
              <MdArrowOutward />
            </div>
            {imageContent}
            {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
          </a>
        ) : (
          <Link
            className="work-image-in"
            to={props.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsVideo(false)}
            data-cursor={"disable"}
          >
            <div className="work-link">
              <MdArrowOutward />
            </div>
            {imageContent}
            {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
          </Link>
        )
      ) : (
        <div
          className="work-image-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          data-cursor={"disable"}
        >
          {imageContent}
          {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
