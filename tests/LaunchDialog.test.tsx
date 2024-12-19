import { render, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import LaunchDialog from "../src/components/LaunchDialog";
import { userEvent } from "@testing-library/user-event";

jest.mock("../src/api/SpacexApi", () => ({
  fetchLaunches: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockLaunches = [
  {
    name: "FalconSat",
    date_utc: "2006-03-24T22:30:00.000Z",
    id: "5eb87cd9ffd86e000604b32a",
    launchpad: "5e9e4502f5090995de566f86",
    success: false,
    details: "Engine failure at 33 seconds and loss of vehicle",
  },
];

describe("LaunchDialog", () => {
  it("should render the dialog with all the launch data", async () => {
    render(
      <LaunchDialog
        open={true}
        selectedLaunch={mockLaunches[0]}
        onClose={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(
        screen.getByText(`Name: ${mockLaunches[0].name}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `Launch Date: ${new Date(
            mockLaunches[0].date_utc
          ).toLocaleDateString()}`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Rocket ID: ${mockLaunches[0].id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Launchpad ID: ${mockLaunches[0].launchpad}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `Status: ${mockLaunches[0].success ? "Success" : "Failed"}`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `Details: ${mockLaunches[0].details || "No details available"}`
        )
      ).toBeInTheDocument();
    });
  });

  it("should call onClose when the close button is clicked", async () => {
    const onCloseMock = jest.fn();
    render(
      <LaunchDialog
        open={true}
        selectedLaunch={mockLaunches[0]}
        onClose={onCloseMock}
      />
    );

    const closeButton = screen.getByLabelText("close");
    await userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should navigate to launch summary page when the Go to Summary button is clicked", async () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <LaunchDialog
        open={true}
        selectedLaunch={mockLaunches[0]}
        onClose={jest.fn()}
      />
    );

    const goToSummaryButton = screen.getByText("Go to Summary");
    await userEvent.click(goToSummaryButton);

    expect(navigateMock).toHaveBeenCalledWith(`/launch/${mockLaunches[0].id}`);
  });
});
