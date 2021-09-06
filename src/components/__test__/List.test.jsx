import { render as rtlRender, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import * as hooks from "../../context/AppContext";
import userEvent from "@testing-library/user-event";
import { List } from "../List";

const mockItems = [
  {
    id: 1,
    description: "foo bar",
    status: "completed",
    completed: false,
    createdAt: "2021-09-04T18:46:15.694Z",
  },
  {
    id: 2,
    description: "bar foo",
    status: "completed",
    completed: false,
    createdAt: "2021-09-04T18:46:15.694Z",
  },
];

const mockOnUpdate = jest.fn();

const mockData = {
  request: {
    query: hooks.UPDATE_TASK,
    variables: {
      data: {
        id: 1,
        description: "foo barfoo barsomenewtext",
        status: "completed",
        completed: false,
        d: false,
      },
      filter: { id: 1 },
    },
  },
  result: {
    data: {
      taskUpdate: {
        id: 1,
        description: "foo barfoo barsomenewtext",
        status: "completed",
        complete: false,
        d: false,
        createdAt: "2021-09-04T18:46:15.694Z",
      },
    },
  },
};

function render(ui) {
  rtlRender(
    <MockedProvider mocks={[mockData]}>
      <hooks.AppProvider>{ui}</hooks.AppProvider>
    </MockedProvider>
  );
}

describe("List component", () => {
  it("should render correctly", () => {
    render(<List items={mockItems} />);
    const listText = screen.getByText(/foo bar/i);
    expect(listText).toBeInTheDocument();
  });
  it("should edit a row", async () => {
    render(<List items={mockItems} onUpdate={mockOnUpdate} />);
    const [btn] = screen.getAllByRole("button", { name: /edit/i });
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    const descriptionInput = await screen.findByRole("textbox", {
      name: /description/i,
    });
    expect(descriptionInput).toBeInTheDocument();
    userEvent.type(descriptionInput, "foo barsomenewtext");
    const submitBtn = screen.getByTestId("submitBtn");
    expect(submitBtn).toBeInTheDocument();
    await waitFor(() => {
      userEvent.click(submitBtn);
    });
  });
});
