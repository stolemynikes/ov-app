import { RadioGroup, Radio, cn } from "@heroui/react";

export const CustomRadio = (props) => {
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

export default function App() {
    return (
        <RadioGroup
            label="Selecteer vervoer:"
            orientation="horizontal"
            className="flex gap-4"
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
