import React, { useEffect, useState } from "react";
import "./Products.css";
import chevronRight from "../icons/chevron-right.svg";
import checkbox from "../icons/checkbox.svg";
import box from "../icons/box.svg";
import { Product } from "../types/Product";
import StarRating from "./StarRating";
import { Operation } from "../types/Operation";
import { displayPrice } from "../helpers/price";

const Products = ({
  products,
  categories,
  handleAddToCart,
}: {
  products: Product[];
  categories: string[];
  handleAddToCart: (itemId: number, operation: Operation) => void;
}) => {
  const [displayedProducts, setDisplayedProduct] = useState<Product[]>([]);
  const [displayedCategories, setDisplayedCategories] = useState<string[]>([]);

  useEffect(() => {
    setDisplayedProduct(products);
    setDisplayedCategories(categories);
  }, [categories, products]);

  const filterDisplayProduct = (category: string) => {
    const categoryAlreadyChecked = displayedCategories.includes(category);
    const removeFromDisplayedCategories = displayedCategories.filter(
      (c) => c !== category
    );
    const addToDisplayedCategories = [...displayedCategories, category];

    const newCategoryList = allCategoriesSelected
      ? [category]
      : categoryAlreadyChecked
      ? removeFromDisplayedCategories
      : addToDisplayedCategories;

    const filteredProducts = products.filter((p) =>
      newCategoryList.includes(p.category)
    );

    if (newCategoryList.length > 0) {
      setDisplayedCategories(newCategoryList);
      setDisplayedProduct(filteredProducts);
    } else {
      setDisplayedCategories(categories);
      setDisplayedProduct(products);
    }
  };

  const allCategoriesSelected =
    categories.length === displayedCategories.length;

  return (
    <div className="products-container">
      <h1 className="category-title">Collection du moment</h1>
      <div className="list-container">
        <ul className="category-list">
          {categories.map((category, index) => (
            <li
              key={index}
              className="category-container"
              onClick={() => filterDisplayProduct(category)}
            >
              <div className="category-checkbox">
                <img
                  src={
                    allCategoriesSelected ||
                    !displayedCategories.includes(category)
                      ? box
                      : checkbox
                  }
                  className="checkbox"
                  alt="checkbox"
                />
                <span>{category}</span>
              </div>
              <img src={chevronRight} className="chevron" alt="chevron-right" />
            </li>
          ))}
        </ul>
        <ul className="product-list">
          {displayedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-img">
                <img src={product.image} alt={product.description} />
              </div>
              <div className="product-price">{displayPrice(product.price)}</div>
              <h4 className="product-name">{product.title}</h4>
              <StarRating rating={product.rating} />
              <button
                className="add-to-cart"
                id="connect-button"
                onClick={() => handleAddToCart(product.id, "Add")}
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
