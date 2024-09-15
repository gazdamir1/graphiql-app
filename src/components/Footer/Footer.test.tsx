import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  const elementInDocument = (element: HTMLElement) => {
    return document.body.contains(element);
  };

  const hasAttribute = (
    element: HTMLElement,
    attribute: string,
    value: string,
  ) => {
    return element.getAttribute(attribute) === value;
  };

  it("должен рендерить ссылку на GitHub", () => {
    const { getByText } = render(<Footer />);
    const githubLink = getByText("GitHub");

    expect(elementInDocument(githubLink)).toBe(true);
    expect(
      hasAttribute(
        githubLink,
        "href",
        "https://github.com/gazdamir1/graphiql-app/tree/develop",
      ),
    ).toBe(true);
  });

  it("должен отображать текущий год", () => {
    const { getByText } = render(<Footer />);
    const year = getByText("2024");

    expect(elementInDocument(year)).toBe(true);
  });

  it("должен отображать изображение с правильными параметрами", () => {
    const { container } = render(<Footer />);
    const image = container.querySelector("img");

    expect(elementInDocument(image as HTMLElement)).toBe(true);
    expect(hasAttribute(image as HTMLElement, "src", "/rss-logo.svg")).toBe(
      true,
    );
    expect(hasAttribute(image as HTMLElement, "width", "40")).toBe(true);
    expect(hasAttribute(image as HTMLElement, "height", "40")).toBe(true);
  });
});
