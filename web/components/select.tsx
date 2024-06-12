import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";

export interface ISelectOption {
  label: string;
  value: string;
}

export interface ISelectProps {
  value: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  options: ISelectOption[];
  placeholder?: string;
}

export const Select: FC<ISelectProps> = (props) => {
  const { value, onChange, options, placeholder } = props;
  return (
    <UISelect value={value} onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </UISelect>
  );
};
