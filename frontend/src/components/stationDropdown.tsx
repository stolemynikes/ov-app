import { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectItem } from "@heroui/react";

type Station = {
    _id: string;
    title: string;
    stationType: string;
    elevatorAccessible: boolean;
    wheelChairAccessible: boolean;
};

export default function StationDropdown() {
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);

    const [beginStationId, setBeginStationId] = useState<string | null>(null);
    const [endStationId, setEndStationId] = useState<string | null>(null);

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
                <Select
                    className="w-full"
                    items={stations}
                    label="Begin station"
                    placeholder={loading ? "Loading..." : "Selecteer een station"}
                    isDisabled={loading || stations.length === 0}
                    selectedKeys={beginStationId ? [beginStationId] : []}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setBeginStationId(selectedKey);
                    }}
                >
                    {(station) => (
                        <SelectItem key={station._id}>
                            {station.title}
                        </SelectItem>
                    )}
                </Select>
            </div>

            <div>
                <p className="text-sm font-medium mb-1">Eind station:</p>
                <Select
                    className="w-full"
                    items={stations}
                    label="Eind station"
                    placeholder={loading ? "Loading..." : "Selecteer een station"}
                    isDisabled={loading || stations.length === 0}
                    selectedKeys={endStationId ? [endStationId] : []}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setEndStationId(selectedKey);
                    }}
                >
                    {(station) => (
                        <SelectItem key={station._id}>
                            {station.title}
                        </SelectItem>
                    )}
                </Select>
            </div>

            {beginStationId && endStationId && beginStationId === endStationId && (
                <p className="text-red-500 text-sm text-center">
                    Begin- en eindstation mogen niet hetzelfde zijn.
                </p>
            )}
        </div>

    );
}
