import jsPDF from "jspdf";
import { User } from "../types/User";
import { CartItem } from "../types/Product";
import { displayPrice, multiplyPrice } from "./price";

const generateInvoice = (user: User, cartItems: CartItem[]) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Facture Custom Store", 10, 10);

  doc.setFontSize(12);
  doc.text(`Nom: ${user.name.firstname} ${user.name.lastname}`, 10, 20);
  doc.text(
    `Adresse: ${user.address.number} ${user.address.street}, ${user.address.zipcode} ${user.address.city}`,
    10,
    30
  );
  doc.text(`Email: ${user.email}`, 10, 40);
  doc.text(`Téléphone: ${user.phone}`, 10, 50);

  doc.text("Détails de la commande:", 10, 70);
  let yPos = 80;
  cartItems.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.title} - ${item.quantity} x ${displayPrice(
        item.price
      )}`,
      10,
      yPos
    );
    yPos += 10;
  });

  yPos += 10;

  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + multiplyPrice(cur.price, cur.quantity),
    0
  );
  doc.text(`Total: ${displayPrice(totalPrice)}`, 10, yPos);

  return doc;
};

export { generateInvoice };
