import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithUser } from "../lib/utils";

import Login from "./Login";
describe("Integration | Component | Login", () => {
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

  let originalFetch;
  const MOCK_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

  beforeAll(() => {
    vi.mock("next/router", () => require("next-router-mock"));
  });

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        statusText: "OK",
        ok: true,
        json: () =>
          Promise.resolve({
            name: "my_username",
            email: "first.last@stud.noroff.no",
            avatar: "https://img.service.com/avatar.jpg",
            accessToken: MOCK_ACCESS_TOKEN,
          }),
      }),
    );
  });

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    global.fetch = originalFetch;
  });

  describe("Login", () => {
    const TEST_EMAIL = "first.last@stud.noroff.no";
    const TEST_PASSWORD = "UzI1NiIsInR5cCI";

    it("Displays the correct button", async () => {
      renderWithUser(<Login />);

      const button = await screen.findByText("Log in");
      expect(button).toBeInTheDocument();
    });

    it("The login function fetches and stores a token in browser storage", async () => {
      const { user } = renderWithUser(<Login />);

      const emailInput = await screen.findByPlaceholderText("Email");
      const passwordInput = await screen.findByPlaceholderText("Password");
      await user.type(emailInput, TEST_EMAIL);
      await user.type(passwordInput, TEST_PASSWORD);

      const signBtn = await screen.getByRole("button", { name: /Log in/i });
      await user.click(signBtn);

      await waitFor(() => {
        const successMessage = screen.queryByText("Login successful.");
        expect(successMessage).toBeInTheDocument();

        expect(setItemSpy).toHaveBeenCalledWith(
          "accessToken",
          MOCK_ACCESS_TOKEN,
        );
      });
    });
  });
});
