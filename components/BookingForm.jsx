"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import TripTypeSelector from "./TripTypeSelector"
import CitySelector from "./CitySelector"

// List of European capital cities
const europeanCities = [
  { value: "amsterdam", label: "Amsterdam" },
  { value: "berlin", label: "Berlin" },
  { value: "brussels", label: "Brussels" },
  { value: "london", label: "London" },
  { value: "madrid", label: "Madrid" },
  { value: "paris", label: "Paris" },
  { value: "rome", label: "Rome" },
  { value: "stockholm", label: "Stockholm" },
  { value: "vienna", label: "Vienna" },
  { value: "warsaw", label: "Warsaw" },
]

const BookingForm = () => {
  const [formData, setFormData] = useState({
    tripType: "oneWay",
    departureCity: "",
    destinationCity: "",
    departure: undefined,
    return: undefined,
  })

  const [errors, setErrors] = useState({
    departureCity: "",
    destinationCity: "",
    departure: "",
    return: "",
  })

  const [submitted, setSubmitted] = useState(false)

  // Parse query parameters on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const departureParam = params.get("departure")
      const returnParam = params.get("return")
      const tripTypeParam = params.get("tripType")
      const departureCityParam = params.get("departureCity")
      const destinationCityParam = params.get("destinationCity")

      const newFormData = { ...formData }

      if (departureParam && isValidDateFormat(departureParam)) {
        newFormData.departure = new Date(departureParam)
      }

      if (returnParam && isValidDateFormat(returnParam)) {
        newFormData.return = new Date(returnParam)
      }

      if (tripTypeParam === "oneWay" || tripTypeParam === "roundTrip") {
        newFormData.tripType = tripTypeParam
      }

      if (departureCityParam && europeanCities.some((city) => city.value === departureCityParam)) {
        newFormData.departureCity = departureCityParam
      }

      if (destinationCityParam && europeanCities.some((city) => city.value === destinationCityParam)) {
        newFormData.destinationCity = destinationCityParam
      }

      setFormData(newFormData)
    }
  }, [])

  const isValidDateFormat = (dateString) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString)
  }

  const isDateInPast = (date) => {
    if (!date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const validateForm = () => {
    const newErrors = {
      departureCity: "",
      destinationCity: "",
      departure: "",
      return: "",
    }
    let isValid = true

    // Validate departure city
    if (!formData.departureCity) {
      newErrors.departureCity = "Departure city is required"
      isValid = false
    }

    // Validate destination city
    if (!formData.destinationCity) {
      newErrors.destinationCity = "Destination city is required"
      isValid = false
    } else if (formData.departureCity === formData.destinationCity) {
      newErrors.destinationCity = "Destination must be different from departure"
      isValid = false
    }

    // Validate departure date
    if (!formData.departure) {
      newErrors.departure = "Departure date is required"
      isValid = false
    } else if (isDateInPast(formData.departure)) {
      newErrors.departure = "Departure date cannot be in the past"
      isValid = false
    }

    // Validate return date for round trips
    if (formData.tripType === "roundTrip") {
      if (!formData.return) {
        newErrors.return = "Return date is required"
        isValid = false
      } else if (isDateInPast(formData.return)) {
        newErrors.return = "Return date cannot be in the past"
        isValid = false
      } else if (formData.return < formData.departure) {
        newErrors.return = "Return date must be same or later than departure date"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleTripTypeChange = (tripType) => {
    setFormData({
      ...formData,
      tripType,
      // Clear return date when switching to one-way
      ...(tripType === "oneWay" && { return: undefined }),
    })
  }

  const handleCityChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user selects a city
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    if (validateForm()) {
      // Get city labels for display
      const departureCityLabel =
        europeanCities.find((city) => city.value === formData.departureCity)?.label || formData.departureCity
      const destinationCityLabel =
        europeanCities.find((city) => city.value === formData.destinationCity)?.label || formData.destinationCity

      // Format dates for display
      const departureFormatted = formData.departure ? format(formData.departure, "yyyy-MM-dd") : ""
      const returnFormatted = formData.return ? format(formData.return, "yyyy-MM-dd") : ""

      // In a real application, this would submit the form data to a server
      alert(
        `Booking confirmed!\n\n` +
          `Trip Type: ${formData.tripType === "oneWay" ? "One-way" : "Round Trip"}\n` +
          `From: ${departureCityLabel}\n` +
          `To: ${destinationCityLabel}\n` +
          `Departure: ${departureFormatted}\n` +
          `${formData.tripType === "roundTrip" ? `Return: ${returnFormatted}` : ""}`,
      )
    }
  }

  // Get today's date for min attribute
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <TripTypeSelector tripType={formData.tripType} onChange={handleTripTypeChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CitySelector
            label="From"
            name="departureCity"
            value={formData.departureCity}
            onChange={(value) => handleCityChange("departureCity", value)}
            options={europeanCities}
            placeholder="Select departure city"
            error={submitted && errors.departureCity}
          />

          <CitySelector
            label="To"
            name="destinationCity"
            value={formData.destinationCity}
            onChange={(value) => handleCityChange("destinationCity", value)}
            options={europeanCities}
            placeholder="Select destination city"
            error={submitted && errors.destinationCity}
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">
            Departure Date <span className="text-red-500">*</span>
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.departure && "text-muted-foreground",
                  submitted && errors.departure && "border-red-500",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.departure ? format(formData.departure, "PPP") : <span>Select departure date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.departure}
                onSelect={(date) => {
                  setFormData({ ...formData, departure: date })
                  if (errors.departure) {
                    setErrors({ ...errors, departure: "" })
                  }
                }}
                disabled={(date) => date < today}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {submitted && errors.departure && <p className="text-red-500 text-sm">{errors.departure}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">
            Return Date {formData.tripType === "roundTrip" && <span className="text-red-500">*</span>}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.return && "text-muted-foreground",
                  formData.tripType === "oneWay" && "bg-gray-100 text-gray-500",
                  submitted && errors.return && "border-red-500",
                )}
                disabled={formData.tripType === "oneWay"}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.return ? format(formData.return, "PPP") : <span>Select return date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.return}
                onSelect={(date) => {
                  setFormData({ ...formData, return: date })
                  if (errors.return) {
                    setErrors({ ...errors, return: "" })
                  }
                }}
                disabled={(date) => date < (formData.departure || today)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {submitted && errors.return && <p className="text-red-500 text-sm">{errors.return}</p>}
        </div>

        <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
          Book Flight
        </Button>
      </form>
    </div>
  )
}

export default BookingForm
