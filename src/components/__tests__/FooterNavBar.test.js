import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import FooterNavBar from "../FooterNavBar";
import NavBar from "../NavBar";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // screen.debug();
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

test("renders links to the Homepage, users feed page and users liked page for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <FooterNavBar />
      </CurrentUserProvider>
    </Router>
  );

  const homeLink = await screen.findByText("Home");
  const feedLink = await screen.findByText("Feed");
  const likedLink = await screen.findByText("Liked");
  expect(homeLink).toBeInTheDocument();
  expect(feedLink).toBeInTheDocument();
  expect(likedLink).toBeInTheDocument();
});

test("renders Home icon link on log out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
        <FooterNavBar />
      </CurrentUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByText("Sign out", {
    name: "Sign out",
  });
  fireEvent.click(signOutLink);

  const homeLink = await screen.getByLabelText("Click to view liked page", {
    wname: "Home",
  });

  expect(homeLink).toBeInTheDocument();
});
