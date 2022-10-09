import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

test("checks if the async elements are being rendered", async () => {
  const asyncMock = jest.fn().mockReturnValue([
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
  ]);
  render(<HomePage />, { wrapper: BrowserRouter });
  await asyncMock();
  const movie = await screen.findAllByTestId("movie");
  expect(movie).not.toHaveLength(0);
});
