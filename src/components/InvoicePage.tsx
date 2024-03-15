import React, { useEffect, useState } from "react";
import Payment from "./InvoicePage/Payment";
import Invoice from "./InvoicePage/Invoice";

const InvoicePage = () => {
  const [isPaying, setIsPaying] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsPaying(false);
    }, 5000);
  }, []);

  return <div>{isPaying ? <Payment /> : <Invoice />}</div>;
};

export default InvoicePage;
