import { Button } from "@heroui/react";

interface SearchButtonProps {
    onClick: () => void;
    disabled?: boolean;

}

export default function SearchButton({onClick, disabled}: SearchButtonProps) {
    return <>
        <Button className="w-full" color="primary" onClick={onClick} isDisabled={disabled}>
            Plan mijn reis!
        </Button>
    </>
}
