import "./ProductCard.css";

const ProductCard = ({ img, product, brand, category, description, price }) => {
  return (
    <div className="product-card-container">
      <img className="product-card-img" src={img} alt="puré-de-tomate" />
      <div>
        <h3>{product}</h3>
        <p>Marca: {brand}</p>
        <p>Categoría: {category}</p>
      </div>
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
};

export default ProductCard;
