import { describe, expect, it } from "vitest";
import { getAllQueryParams } from "../src/getAllQueryParams.js";

describe("getAllQueryParams", () => {
  it("handles normal parameters", () => {
    expect(
      getAllQueryParams("?name=Ashish&role=developer")
    ).toEqual({
      name: "Ashish",
      role: "developer",
    });
  });

  it("preserves duplicate values", () => {
    expect(
      getAllQueryParams(
        "?userId=123&userId=456&userId=789"
      )
    ).toEqual({
      userId: ["123", "456", "789"],
    });
  });

  it("supports URLSearchParams", () => {
    const params = new URLSearchParams(
      "userId=123&status=active"
    );

    expect(getAllQueryParams(params)).toEqual({
      userId: "123",
      status: "active",
    });
  });

  it("supports encoded values", () => {
    expect(
      getAllQueryParams(
        "?name=Ashish%20Kumar&city=New%20Delhi"
      )
    ).toEqual({
      name: "Ashish Kumar",
      city: "New Delhi",
    });
  });

  it("supports empty values", () => {
    expect(
      getAllQueryParams("?name=&status=active")
    ).toEqual({
      name: "",
      status: "active",
    });
  });

  it("returns empty object for empty query", () => {
    expect(getAllQueryParams("")).toEqual({});
  });
});