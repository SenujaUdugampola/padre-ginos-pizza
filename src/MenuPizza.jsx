import { useCurrency } from "./useCurrency";

const MenuPizza = ({ pizza }) => {
  const currency = useCurrency();

  return (
    <div className="menu-pizza">
      <div className="menu-pizza-image">
        <img 
          src={pizza.image || "https://picsum.photos/300/200"} 
          alt={pizza.name}
        />
      </div>
      <div className="menu-pizza-info">
        <h3>{pizza.name}</h3>
        <p className="menu-pizza-category">{pizza.category}</p>
        <p className="menu-pizza-description">{pizza.description}</p>
        
        <div className="menu-pizza-sizes">
          <h4>Sizes & Prices:</h4>
          <div className="sizes-grid">
            {Object.entries(pizza.sizes || {}).map(([size, price]) => (
              <div key={size} className="size-option">
                <span className="size-name">{size.toUpperCase()}</span>
                <span className="size-price">{currency(price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPizza;
