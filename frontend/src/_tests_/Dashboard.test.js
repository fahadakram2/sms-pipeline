import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
});

test("fetches and displays students", async () => {
  mock.onGet(/students/).reply(200, [
    { _id: "1", name: "Ali", subject: "Math", age: 20, email: "a@test.com" }
  ]);

  render(<Dashboard />);

  await waitFor(() => {
    expect(screen.getByText("Ali")).toBeInTheDocument();
  });
});

test("shows alert if form is empty", async () => {
  window.alert = jest.fn();
  render(<Dashboard />);
  fireEvent.click(screen.getByText("Add Student"));
  expect(window.alert).toHaveBeenCalledWith("All fields required");
});

test("adds student successfully", async () => {
  mock.onPost(/students/).reply(200);
  mock.onGet(/students/).reply(200, []);

  render(<Dashboard />);

  fireEvent.change(screen.getByPlaceholderText("Name"), {
    target: { value: "Ahmed" }
  });

  fireEvent.change(screen.getByPlaceholderText("Subject"), {
    target: { value: "Science" }
  });

  fireEvent.change(screen.getByPlaceholderText("Age"), {
    target: { value: "22" }
  });

  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "ah@test.com" }
  });

  fireEvent.click(screen.getByText("Add Student"));

  await waitFor(() => {
    expect(mock.history.post.length).toBe(1);
  });
});