import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

// import PizzaOfTheDay from "./PizzaOfTheDay";
// import Order from "./Order";
// import Header from "./Header";
// import { CartContext } from "./contexts";

//import Pizza from "./Pizza";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Padre Gino's"),
//     React.createElement(Pizza, {
//       name: "The Pepperoni Pizza",
//       description: "Dope yo",
//     }),
//     React.createElement(Pizza, {
//       name: "The Americano Pizza",
//       description: "Fries on top",
//     }),
//     React.createElement(Pizza, {
//       name: "The Hawaian",
//       description: "Chicken nugggets on top",
//     }),
//     React.createElement(Pizza, {
//       name: "Baked Potato Pizza",
//       description: "Mashed potato",
//     }),
//   ]);
// };

const router = createRouter({routeTree});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});

const App = () => {
  return(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
//root.render(React.createElement(App));
root.render(<App />);

{/* <CartContext.Provider value={cartHook}>
        <div>
          <h1 className="logo" >Padre Gino's - Order Now</h1>
          <Pizza name="Pepproni" description="pep,cheese n stuff" image="/public/pizzas/pepperoni.webp"/>
          <Pizza name="Hawaian" description="ham,pineapple n stuff" image="/public/pizzas/hawaiian.webp"/>
          <Pizza name="Ameeeericano" description="fries,dogs n stuff" image="/public/pizzas/big_meat.webp"/>
          <Header />
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider> */}