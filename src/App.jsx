import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Header from "@/components/organisms/Header";
import SearchPage from "@/components/pages/SearchPage";
import BookingPage from "@/components/pages/BookingPage";
import ConfirmationPage from "@/components/pages/ConfirmationPage";
import MyBookingsPage from "@/components/pages/MyBookingsPage";
import DealsPage from "@/components/pages/DealsPage";
import SupportPage from "@/components/pages/SupportPage";

function App() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState(null);

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
  };

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <SearchPage 
                  onFlightSelect={handleFlightSelect}
                  onSearch={handleSearch}
                />
              } 
            />
            <Route 
              path="/booking" 
              element={
                <BookingPage 
                  selectedFlight={selectedFlight}
                  searchCriteria={searchCriteria}
                />
              } 
            />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/bookings" element={<MyBookingsPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;