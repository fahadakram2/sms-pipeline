import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../pages/Signup";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

test("successful signup navigates to login", async () => {
  mock.onPost(/signup/).reply(200);
  window.alert = jest.fn();

  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "newuser" }
  });

  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "1234" }
  });

  fireEvent.click(screen.getByText("Signup"));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith("Signup Successful");
  });
});