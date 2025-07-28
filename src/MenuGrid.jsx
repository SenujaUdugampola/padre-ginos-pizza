import MenuPizza from "./MenuPizza";

const MenuGrid = ({ pizzas, selectedCategory }) => {
  // Group pizzas by category
  const pizzasByCategory = pizzas.reduce((acc, pizza) => {
    if (!acc[pizza.category]) {
      acc[pizza.category] = [];
    }
    acc[pizza.category].push(pizza);
    return acc;
  }, {});

  // Filter by selected category if provided
  const categoriesToShow = selectedCategory === "all" || !selectedCategory 
    ? Object.keys(pizzasByCategory) 
    : [selectedCategory];

  return (
    <div className="menu-grid">
      {categoriesToShow.map(category => (
        <div key={category} className="menu-category-section">
          <h2 className="menu-category-title">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className="menu-pizzas-grid">
            {pizzasByCategory[category]?.map(pizza => (
              <MenuPizza key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuGrid;
