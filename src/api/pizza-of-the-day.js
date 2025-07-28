export default async function getPizzaOfTheDay() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await fetch('/api/pizza-of-the-day');
  const data = await response.json();
  return data;
}