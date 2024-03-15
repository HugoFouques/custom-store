import "./CheckoutButton.css";

const CheckoutButton = ({
  disabled,
  handleGoToNextStep,
}: {
  disabled: boolean;
  handleGoToNextStep: () => void;
}) => {
  return (
    <div>
      <button
        className="go-to-next-step-button"
        onClick={() => handleGoToNextStep()}
        disabled={disabled}
      >
        Poursuivre la commande
      </button>
    </div>
  );
};

export default CheckoutButton;
