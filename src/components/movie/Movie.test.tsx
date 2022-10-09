import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Movie from "./Movie";

describe("check the navigation when we click the movie", () => {
  test("check if the user is logged", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const ctxValue = {
      token: "",
      isLoggedIn: true,
      login: (token: string) => {},
      logout: () => {},
    };

    render(
      <AuthContext.Provider value={ctxValue}>
        <Router location={history.location} navigator={history}>
          <Movie id={1} title={""} genre={""} year={0} poster={""} />
        </Router>
      </AuthContext.Provider>
    );
    const logout = screen.getByTestId("link");
    userEvent.click(logout);
    expect(history.location.pathname).toBe("//1");
  });
  test('check if the user is not logged', () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const ctxValue = {
      token: "",
      isLoggedIn: false,
      login: (token: string) => {},
      logout: () => {},
    };

    render(
      <AuthContext.Provider value={ctxValue}>
        <Router location={history.location} navigator={history}>
          <Movie id={1} title={""} genre={""} year={0} poster={""} />
        </Router>
      </AuthContext.Provider>
    );
    const logout = screen.getByTestId("link");
    userEvent.click(logout);
    expect(history.location.pathname).toBe('/login');
    });
});
