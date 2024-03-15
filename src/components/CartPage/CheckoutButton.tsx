import "./CheckoutButton.css";

const CheckoutButton = ({
  text,
  disabled,
  onClick,
}: {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <div>
      <button
        className="go-to-next-step-button"
        onClick={() => onClick()}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default CheckoutButton;
