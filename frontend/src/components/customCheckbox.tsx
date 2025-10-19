import { Checkbox, cn } from "@heroui/react";

type CustomCheckboxProps = React.ComponentProps<typeof Checkbox> & {
  children: React.ReactNode;
};

export const CustomCheckbox = ({ children, ...props }: CustomCheckboxProps) => {
  return (
    <Checkbox
      {...props}
      classNames={{
        base: cn(
          "inline-flex items-center gap-4 p-4 rounded-lg cursor-pointer",
          "border-2 border-transparent bg-content1 hover:bg-content2",
          "data-[selected=true]:border-primary",
          "max-w-full"
        ),
      }}
    >
      {children}
    </Checkbox>
  );
};
