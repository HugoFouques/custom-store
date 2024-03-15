export type CheckoutStep =
  | "LoggedOut"
  | "LoggedIn"
  | "Shipping"
  | "Paid"
  | "Confirmed";

export const getStepIndex = (step: CheckoutStep): number => {
  switch (step) {
    case "LoggedOut":
      return 1;
    case "LoggedIn":
      return 2;
    case "Shipping":
      return 3;
    case "Paid":
      return 4;
    default:
      return 5;
  }
};

export const getNextStep = (step: CheckoutStep): CheckoutStep => {
  switch (step) {
    case "LoggedOut":
      return "LoggedIn";
    case "LoggedIn":
      return "Shipping";
    case "Shipping":
      return "Paid";
    case "Paid":
      return "Confirmed";
    default:
      return step;
  }
};
