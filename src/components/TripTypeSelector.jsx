"use client"

const TripTypeSelector = ({ tripType, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-700 font-medium">Trip Type</label>
      <div className="flex border rounded-lg overflow-hidden">
        <button
          type="button"
          className={`flex-1 py-2 px-4 text-center ${
            tripType === "oneWay" ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onChange("oneWay")}
        >
          One-way
        </button>
        <button
          type="button"
          className={`flex-1 py-2 px-4 text-center ${
            tripType === "roundTrip" ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onChange("roundTrip")}
        >
          Round Trip
        </button>
      </div>
    </div>
  )
}

export default TripTypeSelector
