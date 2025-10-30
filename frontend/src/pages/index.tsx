import { useState } from "react";
import Navbar from "@/components/navbar";
import VervoerSelect from "@/components/vervoerSelect";
import StationDropdown from "@/components/stationDropdown";
import SearchButton from "@/components/searchButton";
import TravelAdviceList from "@/components/travelAdviceList";

interface TravelAdvice {
  id: string;
  from: string;
  to: string;
  duration: string;
}

export default function IndexPage() {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("");

  const [beginStation, setBeginStation] = useState<string>("");
  const [endStation, setEndStation] = useState<string>("");

  const [adviceList, setAdviceList] = useState<TravelAdvice[]>([]);

  const handleSearch = () => {
    if (!beginStation || !endStation) return;

    // This is where you would call your API
    const mockResults: TravelAdvice[] = [
      { id: "1", from: beginStation, to: endStation, duration: "32m" },
      { id: "2", from: beginStation, to: endStation, duration: "35m" },
      { id: "3", from: beginStation, to: endStation, duration: "40m" },
    ];

    setAdviceList(mockResults);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 w-full max-w-2xl">
          <VervoerSelect
            selectedFilter={selectedTypeFilter}
            onChange={setSelectedTypeFilter}
          />

          <StationDropdown
            selectedTypeFilter={selectedTypeFilter}
            beginStation={beginStation}
            setBeginStation={setBeginStation}
            endStation={endStation}
            setEndStation={setEndStation}
          />

          <SearchButton
            onClick={handleSearch}
            disabled={!beginStation || !endStation || beginStation === endStation}
          />

          <TravelAdviceList adviceList={adviceList} />
        </div>
      </div>
    </div>
  );
}
