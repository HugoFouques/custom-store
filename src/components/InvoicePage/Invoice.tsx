import "./Invoice.css";

const Invoice = ({
  onDownload,
  onFinish,
}: {
  onDownload: () => void;
  onFinish: () => void;
}) => {
  return (
    <div className="invoice-container">
      <h2>Merci d'avoir effectué vos achats sur Custom Shop !</h2>
      <div className="invoice-text">
        <div>
          Le paiement pour votre commande ayant pour référence <b>KIOUQITTM</b>{" "}
          a bien été effectué.
        </div>
        <div>
          Suivez votre commande et téléchargez votre facture sur notre site.
        </div>
        <div>
          Si vous avez un compte invité, vous pouvez suivre votre commande via
          la section Suivi de commande sur notre boutique.
        </div>
      </div>
      <button className="invoice-button" onClick={() => onDownload()}>
        Télécharger ma facture
      </button>
      <button className="invoice-button" onClick={() => onFinish()}>
        Retourner sur le Custom Shop
      </button>
    </div>
  );
};

export default Invoice;
