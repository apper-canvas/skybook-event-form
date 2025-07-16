import flightData from "@/services/mockData/flights.json";

export const flightService = {
  searchFlights: async (searchCriteria) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredFlights = [...flightData];
    
    // Filter by origin and destination
    if (searchCriteria.origin) {
      filteredFlights = filteredFlights.filter(flight => 
        flight.origin.toLowerCase().includes(searchCriteria.origin.toLowerCase())
      );
    }
    
    if (searchCriteria.destination) {
      filteredFlights = filteredFlights.filter(flight => 
        flight.destination.toLowerCase().includes(searchCriteria.destination.toLowerCase())
      );
    }
    
    // Filter by class
    if (searchCriteria.class) {
      filteredFlights = filteredFlights.filter(flight => 
        flight.class === searchCriteria.class
      );
    }
    
    // Return results with some randomization for demo
    return filteredFlights.sort(() => Math.random() - 0.5);
  },

  getFlightById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return flightData.find(flight => flight.Id === parseInt(id));
  },

  getAllFlights: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...flightData];
  }
};