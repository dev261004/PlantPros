import React, { useState, useEffect } from "react";
import axios from "axios";

const EventsPage = () => {
    const [localEvents, setLocalEvents] = useState([]);
    const [externalEvents, setExternalEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            // Fetch local events (from your backend)
            const localResponse = await axios.get("http://localhost:4000/api/v1/events");
            setLocalEvents(localResponse.data.events);

            // Fetch external events (Example API - Replace with actual sources)
            const externalResponse = await axios.get("https://api.eventbrite.com/v3/events/search/", {
                headers: { Authorization: `Bearer YOUR_EVENTBRITE_API_KEY` }
            });

            setExternalEvents(externalResponse.data.events);
        } catch (err) {
            setError("Failed to load events.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-4xl font-bold text-green-800 mb-8">Upcoming Events</h1>

            {loading ? (
                <p>Loading events...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Local Events */}
                    {localEvents.map((event) => (
                        <div key={event._id} className="bg-white p-4 rounded-lg shadow-lg">
                            <img src={event.image || "https://via.placeholder.com/150"} alt={event.name} className="w-full h-40 object-cover rounded-md mb-3" />
                            <h2 className="text-lg font-semibold text-green-800">{event.name}</h2>
                            <p className="text-gray-600">{event.location}</p>
                            <p className="text-gray-500 text-sm">{event.description}</p>
                            <p className="text-gray-700 mt-2 font-semibold">📅 {new Date(event.date).toLocaleDateString()}</p>
                            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                                Register
                            </button>
                        </div>
                    ))}

                    {/* External Events */}
                    {externalEvents.map((event) => (
                        <div key={event.id} className="bg-white p-4 rounded-lg shadow-lg">
                            <img src={event.logo?.url || "https://via.placeholder.com/150"} alt={event.name.text} className="w-full h-40 object-cover rounded-md mb-3" />
                            <h2 className="text-lg font-semibold text-blue-800">{event.name.text}</h2>
                            <p className="text-gray-600">{event.venue?.address?.city || "Location Unknown"}</p>
                            <p className="text-gray-500 text-sm">{event.description.text?.slice(0, 100)}...</p>
                            <p className="text-gray-700 mt-2 font-semibold">📅 {new Date(event.start.local).toLocaleDateString()}</p>
                            <a href={event.url} target="_blank" rel="noopener noreferrer" className="mt-4 block text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                View More
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventsPage;
