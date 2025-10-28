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
}



export default function StationDropdown({ selectedTypeFilter }: StationDropdownProps) {
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);

    const [beginStationId, setBeginStationId] = useState<string | null>(null);
    const [endStationId, setEndStationId] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredStations = stations.filter(station =>
        (!selectedTypeFilter || station.stationType.includes(selectedTypeFilter)) &&
        (!searchQuery || station.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );


    useEffect(() => {
        axios.get("http://localhost:8080/stations")
            .then((res) => {
                setStations(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching stations:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col space-y-4 w-full">
            <div>
                <p className="text-sm font-medium mb-1">Begin station:</p>
                <Autocomplete
                    className="w-full"
                    label="Begin station"
                    placeholder={loading ? "Loading..." : "Selecteer een station"}
                    value={beginStationId ? stations.find(s => s._id === beginStationId)?.title || "" : ""}
                    onInputChange={(val: string) => setSearchQuery(val)}
                    onValueChange={(val: string) => {
                        const station = stations.find(s => s.title === val);
                        setBeginStationId(station?._id || null);
                    }}
                    disabled={loading || filteredStations.length === 0}
                >
                    {filteredStations.map(station => (
                        <AutocompleteItem key={station._id}>
                            {station.title}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
            </div>

            <div>
                <p className="text-sm font-medium mb-1">Eind station:</p>
                <Autocomplete
                    className="w-full"
                    label="Eind station"
                    placeholder={loading ? "Loading..." : "Selecteer een station"}
                    value={endStationId ? stations.find(s => s._id === endStationId)?.title || "" : ""}
                    onInputChange={(val: string) => setSearchQuery(val)}
                    onValueChange={(val: string) => {
                        const station = stations.find(s => s.title === val);
                        setEndStationId(station?._id || null);
                    }}
                    disabled={loading || filteredStations.length === 0}
                >
                    {filteredStations.map(station => (
                        <AutocompleteItem key={station._id}>
                            {station.title}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>

            </div>

            {beginStationId && endStationId && beginStationId === endStationId && (
                <p className="text-red-500 text-sm text-center">
                    Begin- en eindstation mogen niet hetzelfde zijn.
                </p>
            )}
        </div>

    );
}
