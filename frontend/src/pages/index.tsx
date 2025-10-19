import Navbar from "@/components/navbar";
import VervoerSelect from "@/components/vervoerSelect";
import StationDropdown from "@/components/stationDropdown";
import SearchButton from '@/components/searchButton';

// If you need HeroUI styles (uncomment if not already imported globally)
// import "@heroui/react/styles.css";

export default function IndexPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Centered and stacked content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <VervoerSelect />
          <StationDropdown />
          <SearchButton/>
        </div>
      </div>
    </div>
  );
}
