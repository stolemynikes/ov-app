import { Card, CardBody } from "@heroui/react";

interface TravelAdvice {
  id: string;
  from: string;
  to: string;
  duration: string;
}

interface TravelAdviceListProps {
  adviceList: TravelAdvice[];
  onSelect?: (advice: TravelAdvice) => void;
}

export default function TravelAdviceList({ adviceList, onSelect }: TravelAdviceListProps) {
  if (adviceList.length === 0) return null;

  return (
    <div className="flex flex-col space-y-4 w-full">
      {adviceList.map((advice) => (
        <Card
          key={advice.id}
          className="w-full cursor-pointer hover:shadow-md transition-all"
          onClick={() => onSelect?.(advice)}
        >
          <CardBody className="flex justify-between items-start relative">

            <div className="flex flex-col relative">

              <div className="absolute left-1.25 top-2 bottom-2 w-[2px] bg-white"></div>

              <div className="flex items-center mb-2">
                <span className="w-3 h-3 bg-white border rounded-full mr-2 z-10"></span>
                <span className="text-lg font-semibold">{advice.from}</span>
              </div>

              <div className="flex items-center mt-2">
                <span className="w-3 h-3 bg-white border rounded-full mr-2 z-10"></span>
                <span className="text-lg font-semibold">{advice.to}</span>
              </div>
            </div>

            <span className="text-sm text-gray-500">{advice.duration}</span>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
