import React, { useEffect, useState } from "react";
import Payment from "./InvoicePage/Payment";
import Invoice from "./InvoicePage/Invoice";

const InvoicePage = ({
  onDownload,
  onFinish,
}: {
  onDownload: () => void;
  onFinish: () => void;
}) => {
  const [isPaying, setIsPaying] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsPaying(false);
    }, 5000);
  }, []);

  return (
    <div>
      {isPaying ? (
        <Payment />
      ) : (
        <Invoice onDownload={onDownload} onFinish={onFinish} />
      )}
    </div>
  );
};

export default InvoicePage;
