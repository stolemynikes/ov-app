import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Spinner,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
import { CustomCheckbox } from "@/components/customCheckbox"; // Adjust import path accordingly

export default function CreateStation() {
  const [title, setTitle] = useState('');
  const [stationTypes, setStationTypes] = useState<Set<string>>(new Set());
  const [elevatorAccessible, setElevatorAccessible] = useState(false);
  const [wheelChairAccessible, setWheelChairAccessible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveStation = async () => {
    if (!title || !stationTypes) return;

    const data = {
      title,
      stationType: Array.from(stationTypes),
      elevatorAccessible,
      wheelChairAccessible,
    };

    try {
      setLoading(true);
      await axios.post('http://localhost:8080/stations', data);
      navigate('/');
    } catch (error) {
      alert('An error occurred. Please check the console.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <h1 className="text-3xl font-semibold text-center text-foreground">Create Station</h1>
        </CardHeader>

        <CardBody className="space-y-6">
          {loading && <Spinner className="mx-auto" size="lg" />}

          <Input
            label="Title"
            placeholder="Enter station title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isRequired
            disabled={loading}
          />

          <Select
            label="Station Type"
            placeholder="Select station type"
            selectionMode="multiple"
            selectedKeys={stationTypes}
            onSelectionChange={(keys) => setStationTypes(new Set(keys as Set<string>))}
            isRequired
            disabled={loading}
          >
            <SelectItem key="train">Train</SelectItem>
            <SelectItem key="bus">Bus</SelectItem>
            <SelectItem key="metro">Metro</SelectItem>
            <SelectItem key="tram">Tram</SelectItem>
          </Select>

          <div className="flex flex-col gap-6 mt-2">
            <CustomCheckbox
              isSelected={elevatorAccessible}
              onValueChange={setElevatorAccessible}
              disabled={loading}
            >
              Elevator Accessible
            </CustomCheckbox>

            <CustomCheckbox
              isSelected={wheelChairAccessible}
              onValueChange={setWheelChairAccessible}
              disabled={loading}
            >
              Wheelchair Accessible
            </CustomCheckbox>
          </div>

          <Button
            color="primary"
            className="w-full mt-4"
            onClick={handleSaveStation}
            isDisabled={loading || !title || stationTypes.size === 0}
          >
            Save Station
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
