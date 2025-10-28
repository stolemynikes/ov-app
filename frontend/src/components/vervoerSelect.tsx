import { RadioGroup, Radio, RadioProps, cn } from "@heroui/react";

export const CustomRadio = (props: RadioProps) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center",
                    "flex-row max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
            }}
        >
            {children}
        </Radio>
    );
};

interface VervoerSelectProps {
  selectedFilter: string;
  onChange: (val: string) => void;
}

export default function VervoerSelect({ selectedFilter, onChange }: VervoerSelectProps) {

    return (
        <RadioGroup
            label="Selecteer vervoer:"
            orientation="horizontal"
            className="flex gap-4"
            value={selectedFilter}
            onValueChange={onChange}
        >
            <CustomRadio description="" value="">
                Alles
            </CustomRadio>
            <CustomRadio description="" value="train">
                Trein
            </CustomRadio>
            <CustomRadio description="" value="bus">
                Bus
            </CustomRadio>
            <CustomRadio value="metro">
                Metro
            </CustomRadio>
            <CustomRadio value="tram">
                Tram
            </CustomRadio>
        </RadioGroup>
    );
}
