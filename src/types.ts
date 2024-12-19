export interface LaunchData {
  id: string;
  name: string;
  date_utc: string;
  details: string | null;
  launchpad: string;
  success: boolean | null;
  links?: LaunchLinks;
}

export interface LaunchTableData {
  id: string;
  name: string;
  date_utc: string;
  details: string | null;
}

interface LaunchLinks {
  image?: string;
  webcast?: string;
  article?: string;
  wikipedia?: string;
}

export interface Column {
  id: "id" | "name" | "date_utc" | "details";
  label: string;
  minWidth?: number;
  align?: "left" | "center";
}

export interface LaunchDialogProps {
  open: boolean;
  onClose: () => void;
  selectedLaunch: LaunchData | null;
}
