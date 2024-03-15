import "./ProgressLabel.css";

const ProgressLabel = ({
  index,
  title,
  isActive,
}: {
  index: number;
  title: string;
  isActive: boolean;
}) => {
  const activeClass = isActive ? "active" : "";

  return (
    <div className="progress-label">
      <div className={["progress-number", activeClass].join(" ")}>{index}</div>
      <div className={["progress-title", activeClass].join(" ")}>{title}</div>
    </div>
  );
};

export default ProgressLabel;
