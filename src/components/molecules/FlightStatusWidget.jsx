import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { flightService } from "@/services/api/flightService";

const FlightStatusWidget = ({ flight }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchFlightStatus = async () => {
    try {
      setError("");
      const statusData = await flightService.getFlightStatus(flight.flightNumber);
      
      // Check if status changed and notify user
      if (status && status.status !== statusData.status) {
        const statusMessages = {
          'on-time': 'Flight is on time',
          'delayed': `Flight delayed by ${statusData.delayMinutes} minutes`,
          'boarding': 'Boarding has started',
          'departed': 'Flight has departed',
          'arrived': 'Flight has arrived',
          'cancelled': 'Flight has been cancelled'
        };
        
        toast.info(`${flight.flightNumber}: ${statusMessages[statusData.status]}`);
      }
      
      setStatus(statusData);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to fetch flight status");
      toast.error("Unable to update flight status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlightStatus();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchFlightStatus, 30000);
    
    return () => clearInterval(interval);
  }, [flight.flightNumber]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time': return 'CheckCircle';
      case 'delayed': return 'Clock';
      case 'boarding': return 'UserCheck';
      case 'departed': return 'Plane';
      case 'arrived': return 'MapPin';
      case 'cancelled': return 'XCircle';
      default: return 'Info';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'on-time': return 'success';
      case 'delayed': return 'warning';
      case 'boarding': return 'info';
      case 'departed': return 'info';
      case 'arrived': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const formatLastUpdated = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <div className="flex items-center justify-center">
          <ApperIcon name="Loader2" className="w-5 h-5 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-600">Loading flight status...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ApperIcon name="AlertCircle" className="w-5 h-5 text-red-500" />
            <span className="ml-2 text-sm text-red-700">{error}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchFlightStatus}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Activity" className="w-5 h-5 text-blue-600" />
          <h4 className="font-medium text-gray-900">Live Flight Status</h4>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchFlightStatus}
          className="text-blue-600 hover:bg-blue-100"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <ApperIcon 
            name={getStatusIcon(status.status)} 
            className={`w-5 h-5 ${
              status.status === 'on-time' ? 'text-green-600' :
              status.status === 'delayed' ? 'text-orange-600' :
              status.status === 'cancelled' ? 'text-red-600' :
              'text-blue-600'
            }`}
          />
          <div>
            <p className="text-xs text-gray-600">Status</p>
            <Badge variant={getStatusVariant(status.status)} className="text-xs">
              {status.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <ApperIcon name="MapPin" className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-xs text-gray-600">Gate</p>
            <p className="font-medium text-gray-900">{status.gate}</p>
          </div>
        </div>
        
        {status.delayMinutes > 0 && (
          <div className="flex items-center space-x-2">
            <ApperIcon name="Clock" className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-gray-600">Delay</p>
              <p className="font-medium text-orange-600">+{status.delayMinutes}m</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <ApperIcon name="Building" className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-xs text-gray-600">Terminal</p>
            <p className="font-medium text-gray-900">T{status.terminal}</p>
          </div>
        </div>
      </div>
      
      {lastUpdated && (
        <div className="flex items-center justify-center mt-3 pt-3 border-t border-blue-200">
          <ApperIcon name="Clock" className="w-4 h-4 text-gray-400 mr-1" />
          <span className="text-xs text-gray-500">
            Last updated {formatLastUpdated(lastUpdated)}
          </span>
        </div>
      )}
    </div>
  );
};

export default FlightStatusWidget;