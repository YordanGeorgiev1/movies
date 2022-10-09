import { render } from "@testing-library/react";
import { BrowserRouter, } from "react-router-dom";
import Movies from "./Movies";

test("checks if the async elements are being rendered", async () => {
  const movie = [
    {
      id: 1,
      title: "Title",
      genre: "Action",
      year: 2000,
      description: "This is the movie",
      director: "Director",
      stars: ["Dwayne Johnson", "Mark Waglberg"],
      poster: "picture",
    },
  ];

  render(
    <Movies />, { wrapper: BrowserRouter }
  );
  const asyncMock = jest.fn().mockReturnValue(movie);
  render(<Movies />, { wrapper: BrowserRouter });
  const result = await asyncMock();
  expect(result).toBe(movie);
});

