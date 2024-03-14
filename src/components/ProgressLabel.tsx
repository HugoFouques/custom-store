import "./ProgressLabel.css";

const ProgressLabel = ({
  index,
  title,
  currentStep,
}: {
  index: number;
  title: string;
  currentStep: number;
}) => {
  const hasBeenReach = currentStep >= index;
  const activeClass = hasBeenReach ? "active" : "";

  return (
    <div className="progress-label">
      <div className={["progress-number", activeClass].join(" ")}>{index}</div>
      <div className={["progress-title", activeClass].join(" ")}>{title}</div>
    </div>
  );
};

export default ProgressLabel;
