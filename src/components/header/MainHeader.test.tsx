import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import MainHeader from "./MainHeader";
import AuthContext from "../../store/auth-context";

describe("check if the route paths are correct", () => {
  test("checks the home button path", () => {
    const history = createMemoryHistory({ initialEntries: ["/login"] });
    render(
      <Router location={history.location} navigator={history}>
        <MainHeader />
      </Router>
    );
    const homebutton = screen.getByTestId("home-btn");
    userEvent.click(homebutton);
    expect(history.location.pathname).toBe("/");
  });
  test("checks the login button", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <MainHeader />
      </Router>
    );
    const login = screen.getByText("Sign up/Log in");
    userEvent.click(login);
    expect(history.location.pathname).toBe("/login");
  });
  test("checks the logout button", () => {
    const history = createMemoryHistory({ initialEntries: ["/action"] });
    const ctxValue = {
      token: "",
      isLoggedIn: true,
      login: (token: string) => {},
      logout: () => {},
    };

    render(
      <AuthContext.Provider value={ctxValue}>
        <Router location={history.location} navigator={history}>
          <MainHeader />
        </Router>
      </AuthContext.Provider>
    );
    const logout = screen.getByText("Logout");
    userEvent.click(logout);
    expect(history.location.pathname).toBe("/");
  });
  test("checks the actions category", () => {
    const history = createMemoryHistory({ initialEntries: ["/comedy"] });
    const ctxValue = {
      token: "",
      isLoggedIn: true,
      login: (token: string) => {},
      logout: () => {},
    };

    render(
      <AuthContext.Provider value={ctxValue}>
        <Router location={history.location} navigator={history}>
          <MainHeader />
        </Router>
      </AuthContext.Provider>
    );
    const actions = screen.getByText("Action Movies");
    userEvent.click(actions);
    expect(history.location.pathname).toBe("/action");
  });
  test("checks the comedies category", () => {
    const history = createMemoryHistory({ initialEntries: ["/action"] });
    const ctxValue = {
      token: "",
      isLoggedIn: true,
      login: (token: string) => {},
      logout: () => {},
    };

    render(
      <AuthContext.Provider value={ctxValue}>
        <Router location={history.location} navigator={history}>
          <MainHeader />
        </Router>
      </AuthContext.Provider>
    );
    const comedy = screen.getByText("Comedy Movies");
    userEvent.click(comedy);
    expect(history.location.pathname).toBe("/comedy");
  });
  test("checks the fanasy category", () => {
    const history = createMemoryHistory({ initialEntries: ["/action"] });
    const ctxValue = {
      token: "",
      isLoggedIn: true,
      login: (token: string) => {},
      logout: () => {},
    };

    render(
      <AuthContext.Provider value={ctxValue}>
        <Router location={history.location} navigator={history}>
          <MainHeader />
        </Router>
      </AuthContext.Provider>
    );
    const fantasy = screen.getByText("Fantasy Movies");
    userEvent.click(fantasy);
    expect(history.location.pathname).toBe("/fantasy");
  });
  test("checks the sci-fi category", () => {
    const history = createMemoryHistory({ initialEntries: ["/action"] });
    const ctxValue = {
      token: "",
      isLoggedIn: true,
      login: (token: string) => {},
      logout: () => {},
    };

    render(
      <AuthContext.Provider value={ctxValue}>
        <Router location={history.location} navigator={history}>
          <MainHeader />
        </Router>
      </AuthContext.Provider>
    );
    const fantasy = screen.getByText("Sci-Fi Movies");
    userEvent.click(fantasy);
    expect(history.location.pathname).toBe("/sci-fi");
  });
});

test("check if the li elements are rendered", () => {
  const ctxValue = {
    token: "",
    isLoggedIn: true,
    login: (token: string) => {},
    logout: () => {},
  };

  render(
    <AuthContext.Provider value={ctxValue}>
      <BrowserRouter>
        <MainHeader />
      </BrowserRouter>
    </AuthContext.Provider>
  );
  const liElements = screen.getAllByRole("listitem");
  expect(liElements).not.toHaveLength(0);
});
