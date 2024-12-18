import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LaunchTable from '../src/components/LaunchTable';
import { fetchLaunches } from '../src/api/SpacexApi';

jest.mock('../src/api/SpacexApi', () => ({
  fetchLaunches: jest.fn(),
}))

const mockLaunches = [
  { id: '5eb87cd9ffd86e000604b32a', name: 'FalconSat', date_utc: '2006-03-24T22:30:00.000Z', details: 'Engine failure at 33 seconds and loss of vehicle' },
  { id: '633f72130531f07b4fdf59c3', name: 'Viasat-3 & Arcturus', date_utc: '2022-12-01T00:00:00.000Z', details: 'N/A' },
];

describe('LaunchTable', () => {
  it('should render the table headers', () => {

    render(<LaunchTable />);

    const headers = ['Name', 'Launch Date', 'Rocket ID', 'Details'];

    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('should fetch and display launch data', async () => {
    (fetchLaunches as jest.Mock).mockResolvedValue(mockLaunches);

    render(<LaunchTable />);

    await waitFor(() => {
      mockLaunches.forEach((launch) => {
        expect(screen.getByText(launch.id)).toBeInTheDocument();
        expect(screen.getByText(launch.name)).toBeInTheDocument();
        expect(screen.getByText(new Date(launch.date_utc).toLocaleDateString())).toBeInTheDocument();
        expect(screen.getByText(launch.details)).toBeInTheDocument();
      });
    });
  });

  it('handles row clicks to open a dialog', async () => {
    (fetchLaunches as jest.Mock).mockResolvedValue([mockLaunches[0]]);

    render(<LaunchTable />);

    await waitFor(() => {
      expect(screen.getByText('FalconSat')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText('FalconSat'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

// Add handle pagination and page change tests
