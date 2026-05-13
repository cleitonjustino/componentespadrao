import { useEffect, useState } from "react";

interface BillingData {
  email: string;
  cardNumber: string;
}

interface Cart {
  total: number;
}

interface BillingContinueButtonProps {
  billingData: BillingData;
  cart: Cart;
}

const BillingContinueButton = ({ billingData, cart }: BillingContinueButtonProps) => {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const ready = billingData.email && billingData.cardNumber && cart.total > 0;
    setValid(ready);
  }, []);

  return <button disabled={!valid}>Continue</button>;
};

export default BillingContinueButton;
