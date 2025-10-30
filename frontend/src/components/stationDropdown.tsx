import { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

type Station = {
    _id: string;
    title: string;
    stationType: string[];
    elevatorAccessible: boolean;
    wheelChairAccessible: boolean;
};

interface StationDropdownProps {
    selectedTypeFilter: string;
    beginStation: string;
    setBeginStation: (value: string) => void;
    endStation: string;
    setEndStation: (value: string) => void;
}

export default function StationDropdown({
    selectedTypeFilter,
    beginStation,
    setBeginStation,
    endStation,
    setEndStation,
}: StationDropdownProps) {
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);
    const [beginQuery, setBeginQuery] = useState<string>("");
    const [endQuery, setEndQuery] = useState<string>("");

    useEffect(() => {
        axios
            .get("http://localhost:8080/stations")
            .then((res) => {
                setStations(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching stations:", err);
                setLoading(false);
            });
    }, []);

    const filteredBeginStations = stations.filter(
        (s) =>
            (!selectedTypeFilter || s.stationType.includes(selectedTypeFilter)) &&
            (!beginQuery || s.title.toLowerCase().includes(beginQuery.toLowerCase()))
    );

    const filteredEndStations = stations.filter(
        (s) =>
            (!selectedTypeFilter || s.stationType.includes(selectedTypeFilter)) &&
            (!endQuery || s.title.toLowerCase().includes(endQuery.toLowerCase()))
    );

    return (
        <div className="flex flex-col space-y-4 w-full">
            {/* Begin Station */}
            <div>
                <p className="text-sm font-medium mb-1">Begin station:</p>
                <Autocomplete
                    className="w-full"
                    label="Begin station"
                    placeholder={loading ? "Loading..." : "Selecteer een station"}
                    isDisabled={loading || filteredBeginStations.length === 0}
                    inputValue={beginQuery}
                    onInputChange={setBeginQuery}
                    selectedKey={stations.find((s) => s.title === beginStation)?._id}
                    onSelectionChange={(key) => {
                        const selected = stations.find((s) => s._id === key);
                        if (selected) {
                            setBeginStation(selected.title);
                            setBeginQuery(selected.title);
                        }
                    }}
                    onClear={() => {
                        setBeginStation("");
                        setBeginQuery("");
                    }}
                >
                    {filteredBeginStations.map((station) => (
                        <AutocompleteItem
                            key={station._id}
                            textValue={station.title}
                            isDisabled={station.title === endStation}
                        >
                            {station.title}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            </div>

            {/* End Station */}
            <div>
                <p className="text-sm font-medium mb-1">Eind station:</p>
                <Autocomplete
                    className="w-full"
                    label="Eind station"
                    placeholder={loading ? "Loading..." : "Selecteer een station"}
                    isDisabled={loading || filteredEndStations.length === 0}
                    inputValue={endQuery}
                    onInputChange={setEndQuery}
                    selectedKey={stations.find((s) => s.title === endStation)?._id}
                    onSelectionChange={(key) => {
                        const selected = stations.find((s) => s._id === key);
                        if (selected) {
                            setEndStation(selected.title);
                            setEndQuery(selected.title);
                        }
                    }}
                    onClear={() => {
                        setEndStation("");
                        setEndQuery("");
                    }}
                >
                    {filteredEndStations.map((station) => (
                        <AutocompleteItem
                            key={station._id}
                            textValue={station.title}
                            isDisabled={station.title === beginStation}
                        >
                            {station.title}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            </div>

            {beginStation && endStation && beginStation === endStation && (
                <p className="text-red-500 text-sm text-center">
                    Begin- en eindstation mogen niet hetzelfde zijn.
                </p>
            )}
        </div>
    );
}
