export interface InputDateProps {
  placeholder: string;
  value: Date | null;
  minValue?: Date | null;
  maxValue?: Date | null;
  onChange: (value: Date | null) => void;
  additionalClass?: string;
  withDeleteBtn?: boolean;
}
