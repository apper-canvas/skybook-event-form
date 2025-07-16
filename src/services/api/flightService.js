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
  },

  getFlightStatus: async (flightNumber) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate real-time status with random variations
    const statuses = ['on-time', 'delayed', 'boarding', 'departed', 'arrived', 'cancelled'];
    const gates = ['A12', 'B8', 'C15', 'D3', 'E7', 'F11'];
    const delays = [0, 15, 30, 45, 60, 90, 120];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomGate = gates[Math.floor(Math.random() * gates.length)];
    const randomDelay = delays[Math.floor(Math.random() * delays.length)];
    
    return {
      flightNumber,
      status: randomStatus,
      gate: randomGate,
      delayMinutes: randomStatus === 'delayed' ? randomDelay : 0,
      lastUpdated: new Date().toISOString(),
      terminal: Math.floor(Math.random() * 3) + 1
    };
  }
};