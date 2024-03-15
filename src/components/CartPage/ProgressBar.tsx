import { CheckoutStep, getStepIndex } from "../../types/CheckoutStep";
import ProgressLabel from "./ProgressLabel";

import "./ProgressBar.css";

const ProgressBar = ({ currentStep }: { currentStep: CheckoutStep }) => {
  const currentStepIndex = getStepIndex(currentStep);

  return (
    <div className="progress-bar">
      <ProgressLabel
        title="Panier"
        index={1}
        isActive={currentStepIndex >= 1}
      />
      <ProgressLabel
        title="Authentification"
        index={2}
        isActive={currentStepIndex >= 2}
      />
      <ProgressLabel
        title="Livraison"
        index={3}
        isActive={currentStepIndex >= 3}
      />
      <ProgressLabel
        title="Paiement"
        index={4}
        isActive={currentStepIndex >= 4}
      />
      <ProgressLabel
        title="Confirmation"
        index={5}
        isActive={currentStepIndex >= 5}
      />
    </div>
  );
};

export default ProgressBar;
