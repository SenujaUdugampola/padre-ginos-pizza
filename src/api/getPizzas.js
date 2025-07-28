export default async function getPizzas() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await fetch('/api/pizzas');
  const data = await response.json();
  return data;
}
