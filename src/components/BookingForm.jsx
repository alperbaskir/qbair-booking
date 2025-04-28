"use client"

import { useState, useEffect } from "react"
import TripTypeSelector from "./TripTypeSelector"
import DateInput from "./DateInput"

const BookingForm = () => {
  const [formData, setFormData] = useState({
    tripType: "oneWay",
    departure: "",
    return: "",
  })

  const [errors, setErrors] = useState({
    departure: "",
    return: "",
  })

  const [submitted, setSubmitted] = useState(false)

  // Parse query parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const departureParam = params.get("departure")
    const returnParam = params.get("return")
    const tripTypeParam = params.get("tripType")

    const newFormData = { ...formData }

    if (departureParam && isValidDateFormat(departureParam)) {
      newFormData.departure = departureParam
    }

    if (returnParam && isValidDateFormat(returnParam)) {
      newFormData.return = returnParam
    }

    if (tripTypeParam === "oneWay" || tripTypeParam === "roundTrip") {
      newFormData.tripType = tripTypeParam
    }

    setFormData(newFormData)
  }, [])

  const isValidDateFormat = (dateString) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString)
  }

  const isDateInPast = (dateString) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const inputDate = new Date(dateString)
    return inputDate < today
  }

  const validateForm = () => {
    const newErrors = {
      departure: "",
      return: "",
    }
    let isValid = true

    // Validate departure date
    if (!formData.departure) {
      newErrors.departure = "Departure date is required"
      isValid = false
    } else if (!isValidDateFormat(formData.departure)) {
      newErrors.departure = "Date must be in format: yyyy-mm-dd"
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
      } else if (!isValidDateFormat(formData.return)) {
        newErrors.return = "Date must be in format: yyyy-mm-dd"
        isValid = false
      } else if (isDateInPast(formData.return)) {
        newErrors.return = "Return date cannot be in the past"
        isValid = false
      } else if (new Date(formData.return) < new Date(formData.departure)) {
        newErrors.return = "Return date must be same or later than departure date"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleTripTypeChange = (tripType) => {
    setFormData({
      ...formData,
      tripType,
      // Clear return date when switching to one-way
      ...(tripType === "oneWay" && { return: "" }),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    if (validateForm()) {
      // In a real application, this would submit the form data to a server
      alert(
        `Booking confirmed!\n\nTrip Type: ${formData.tripType === "oneWay" ? "One-way" : "Round Trip"}\nDeparture: ${formData.departure}${formData.tripType === "roundTrip" ? `\nReturn: ${formData.return}` : ""}`,
      )
    }
  }

  // Get today's date in yyyy-mm-dd format for min attribute
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <TripTypeSelector tripType={formData.tripType} onChange={handleTripTypeChange} />

        <DateInput
          label="Departure Date"
          name="departure"
          value={formData.departure}
          onChange={handleInputChange}
          min={today}
          error={submitted && errors.departure}
          placeholder="YYYY-MM-DD"
          required
        />

        <DateInput
          label="Return Date"
          name="return"
          value={formData.return}
          onChange={handleInputChange}
          min={formData.departure || today}
          error={submitted && errors.return}
          disabled={formData.tripType === "oneWay"}
          placeholder="YYYY-MM-DD"
          required={formData.tripType === "roundTrip"}
        />

        <button
          type="submit"
          className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Book Flight
        </button>
      </form>
    </div>
  )
}

export default BookingForm
