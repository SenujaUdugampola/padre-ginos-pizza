import { render } from "vitest-browser-react";
import {expect, test} from "vitest";
import Pizza from "../Pizza";

test("alt text render on img", async () => {
    const name = "My favourite pizza";
    const src = "https://picsum.photos/200";
    const screen = render(
        <Pizza name={name} image={src} description="cool stuff browser" />
    );

    const img = await screen.getByRole("img");

    await expect.element(img).toBeInTheDocument();
    await expect.element(img).toBeInTheDocument("src", src);
    await expect.element(img).toBeInTheDocument("alt", name);
})