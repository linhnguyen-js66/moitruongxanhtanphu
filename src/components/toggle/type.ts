import type { ReactNode } from 'react';

export interface ToggleTypes {
  checked?: Boolean;
  onToggle?: (event?: any) => void;
  disabled?: Boolean;
  offColor?: string;
  onColor?: string;
  offHandleColor?: string;
  onHandleColor?: string;
  handleDiameter?: number;
  uncheckedIcon?: ReactNode;
  checkedIcon?: ReactNode;
  uncheckedHandleIcon?: ReactNode;
  checkedHandleIcon?: ReactNode;
  boxShadow?: string;
  activeBoxShadow?: string;
  height?: number;
  width?: number;
  className?: string;
  borderRadius?: number;
  id?: string;
  label?: string;
  isTranslate?: boolean;
  textActive?: String;
  textColor?: String;
}
