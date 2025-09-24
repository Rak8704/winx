export interface CommonMessage {
  title: string;
  message: string;
}

export interface CopyProps {
  text: string;
  label: string;
  onCopy: (text: string, label: string) => void;
  onKeyDown: (event: React.KeyboardEvent, text: string, label: string) => void;
}
