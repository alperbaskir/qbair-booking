"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TripTypeSelector = ({ onChange, tripType = "oneWay" }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-700 font-medium">Trip Type</label>
      <Tabs value={tripType} onValueChange={onChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="oneWay">One-way</TabsTrigger>
          <TabsTrigger value="roundTrip">Round Trip</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TripTypeSelector;
