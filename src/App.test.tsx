import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import mockFetch from "./tests/mocks/mockFetch";
import userEvent from "@testing-library/user-event";
import Login from "./components/Login";

beforeAll(() => jest.spyOn(window, "fetch"));
beforeEach(() => {
  /* eslint-disable */
  // @ts-ignore
  window.fetch.mockImplementation(mockFetch);
});
afterEach(() => {
  jest.clearAllMocks();
});

test("Renders the landing page", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const titleElement = screen.getByText("Le custom shop");
  expect(titleElement).toBeInTheDocument();
});

test("should be able to search and display products", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  //Simulate fetching categories
  expect(await screen.findByText("electronics")).toBeInTheDocument();

  //Simulate fetching products
  expect(
    await screen.findByText("Mens Casual Premium Slim Fit T-Shirts")
  ).toBeInTheDocument();
  expect(await screen.findByText("22.30€")).toBeInTheDocument();
});

test("should to add products in cart on click", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Simulate add to cart event
  const addToCartButton = await screen.findAllByText("Ajouter au panier");
  userEvent.click(addToCartButton[0]);

  expect(await screen.findByText("Mon panier (1)")).toBeInTheDocument();
});

test("navbar should change if loggedin", async () => {
  const handleLoginMock = jest.fn();

  render(
    <MemoryRouter>
      <Login handleLogin={handleLoginMock} />
    </MemoryRouter>
  );

  // Simulate login
  const usernameInput = await screen.findByPlaceholderText("Identifiant");
  const passwordInput = await screen.findByPlaceholderText("Mot de passe");
  const loginButton = await screen.findByText("Se connecter", {
    selector: "button",
  });

  userEvent.type(usernameInput, "one user");
  userEvent.type(passwordInput, "passw0rd");
  userEvent.click(loginButton);

  await waitFor(() => {
    expect(handleLoginMock).toHaveBeenCalledWith(
      expect.any(String),
      "one user"
    );
  });
});
