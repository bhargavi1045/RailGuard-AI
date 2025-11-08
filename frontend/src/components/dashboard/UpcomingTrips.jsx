import React from "react";

export default function UpcomingTrips({ trips }) {
  return (
    <section className="bg-gray-800 p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-3">Today's Assigned Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li
            key={trip.id}
            className="mb-2 p-3 bg-gray-700 rounded-lg flex justify-between items-center"
          >
            <div>
              <strong>{trip.route}</strong>
              <p className="text-sm text-gray-300">Departure: {trip.departure}</p>
            </div>
            <span
              className={`px-2 py-1 rounded ${
                trip.status === "On Time" ? "bg-green-600" : "bg-red-600"
              } text-white text-sm`}
            >
              {trip.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
