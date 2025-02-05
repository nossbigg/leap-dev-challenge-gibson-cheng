import { render, screen } from "@testing-library/react";
import { EditableTextBox } from "./EditableTextBox";
import userEvent from "@testing-library/user-event";

describe("EditableTextBox", () => {
  it("shows content", () => {
    render(
      <EditableTextBox
        content="some-text"
        label="some-label"
        onSave={async () => true}
      />
    );

    expect(screen.getByText("some-text")).toBeInTheDocument();
  });

  it("updates content and saves", async () => {
    const user = userEvent.setup();

    const onSaveMock = jest.fn().mockResolvedValue(true);

    render(
      <EditableTextBox
        content="some-text"
        label="some-label"
        onSave={onSaveMock}
      />
    );

    await user.click(screen.getByTestId("EditIcon"));
    await user.type(screen.getByLabelText("some-label"), "-2");

    await user.click(screen.getByTestId("DoneIcon"));
    expect(onSaveMock).toHaveBeenCalledWith("some-text-2");
  });
});
