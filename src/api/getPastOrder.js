export default async function getPastOrder(order) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch(`/api/past-order/${order}`);
    const data = await response.json();
    return data;
}
