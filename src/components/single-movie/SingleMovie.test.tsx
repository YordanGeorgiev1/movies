import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SingleMovie from "./SingleMovie";

describe("Testing if the async data is rendered", () => {
  test("testing with mock data", async () => {
    const movie = {
        id: 1,
        title: "Title",
        genre: "Action",
        year: 2000,
        description: "This is the movie",
        director: "Director",
        stars: ["Dwayne Johnson", "Mark Wahlberg"],
        poster: "picture",        
    };

    const asyncMock = jest.fn().mockReturnValue(movie);
    render(<SingleMovie />, { wrapper: BrowserRouter });
    const result = await asyncMock();
    expect(result).toBe(movie);
  });
});