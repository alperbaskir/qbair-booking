"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CitySelector = ({ label, name, value, onChange, options, placeholder, error }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-gray-700 font-medium">
        {label} <span className="text-red-500">*</span>
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={name} className={cn("w-full", error ? "border-red-500 ring-red-500" : "")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default CitySelector

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}
