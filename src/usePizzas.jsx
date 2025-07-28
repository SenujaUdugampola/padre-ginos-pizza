import { useState, useEffect } from "react";
import getPizzas from "./api/getPizzas";

export const usePizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPizzas() {
      try {
        setLoading(true);
        const data = await getPizzas();
        setPizzas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPizzas();
  }, []);

  return { pizzas, loading, error };
};
