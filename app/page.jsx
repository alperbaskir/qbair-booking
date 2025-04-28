import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-sky-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sky-700">QbAir</h1>
          <p className="text-gray-600">Book your flight with ease</p>
        </div>
        <BookingForm />
      </div>
    </div>
  );
}
