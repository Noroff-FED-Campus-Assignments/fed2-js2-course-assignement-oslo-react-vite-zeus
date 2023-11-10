import { describe, it, expect } from "vitest";
import { handleLogout } from "./index";

describe("Navigation", () => {
  it("should clear local storage when handleLogout is called", () => {
    localStorage.setItem("testKey", "testValue");

    handleLogout();

    expect(localStorage.length).toBe(0);
    expect(localStorage.getItem("testKey")).toBe(null);

    console.log("Test passed: Local storage was cleared as expected.");
  });
});
