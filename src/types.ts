export interface LaunchData {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  details: string | null;
  launchpad: string;
  success: boolean | null;
}

export interface LaunchTableData {
  id: string;
  name: string;
  date_utc: string;
  details: string | null;
}

export interface Column {
  id: 'id' | 'name' | 'date_utc' | 'details';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center';
}

export interface LaunchDialogProps {
  open: boolean;
  onClose: () => void;
  selectedLaunch: LaunchData | null;
}
