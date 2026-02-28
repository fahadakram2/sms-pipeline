import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

test("successful login navigates to dashboard", async () => {
  mock.onPost(/login/).reply(200);

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "admin" }
  });

  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "1234" }
  });

  fireEvent.click(screen.getByText("Login"));

  await waitFor(() => {
    expect(mock.history.post.length).toBe(1);
  });
});

test("failed login shows alert", async () => {
  mock.onPost(/login/).reply(401);
  window.alert = jest.fn();

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText("Login"));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith("Invalid credentials");
  });
});