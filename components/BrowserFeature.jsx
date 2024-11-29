import { useState } from 'react';

const BrowserFeature = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [detailedAddress, setDetailedAddress] = useState({});
  const [error, setError] = useState('');
  const [showMap, setShowMap] = useState(false);

  const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

  const getLiveLocation = () => {
    setShowMap(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError('');
        },
        // eslint-disable-next-line no-unused-vars
        (err) => {
          setError('Unable to retrieve live location. Please check location settings.');
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };
  const displayMap = () => {
    if (location.latitude && location.longitude) {
      setShowMap(true);
      setError('');
    } else {
      setError('Please get your live location first.');
    }
  };

  const getDetailedAddress = async () => {
    if (location.latitude && location.longitude) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
          const formattedAddress = {
            street: addressComponents.find((comp) => comp.types.includes('route'))?.long_name || 'N/A',
            city: addressComponents.find((comp) => comp.types.includes('locality'))?.long_name || 'N/A',
            state: addressComponents.find((comp) => comp.types.includes('administrative_area_level_1'))?.short_name || 'N/A',
            zip: addressComponents.find((comp) => comp.types.includes('postal_code'))?.long_name || 'N/A',
            buildingNumber: addressComponents.find((comp) => comp.types.includes('street_number'))?.long_name || 'N/A',
          };
          setDetailedAddress(formattedAddress);
          setError('');
        } else {
          setError('Unable to fetch detailed address.');
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to fetch address. Check API key and network connection.');
      }
    } else {
      setError('Please get your live location first.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Location and Address Finder</h1>

      <button
        onClick={getLiveLocation}
        style={{
          padding: '10px 20px',
          margin: '10px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Get Latitude and Longitude
      </button>

      <button
        onClick={displayMap}
        style={{
          padding: '10px 20px',
          margin: '10px',
          backgroundColor: '#28A745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Show Location on Map
      </button>


      <button
        onClick={getDetailedAddress}
        style={{
          padding: '10px 20px',
          margin: '10px',
          backgroundColor: '#FFC107',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Get Detailed Address
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {location.latitude && location.longitude && (
        <div>
          <p>
            <strong>Latitude:</strong> {location.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {location.longitude}
          </p>
        </div>
      )}

      {showMap && (
        <iframe
          title="Google Maps"
          width="600"
          height="450"
          style={{ border: '0', marginTop: '20px' }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${location.latitude},${location.longitude}&zoom=14`}
        ></iframe>
      )}

      {detailedAddress.street && (
        <div>
          <h3>Detailed Address:</h3>
          <p>
            <strong>Street:</strong> {detailedAddress.street}
          </p>
          <p>
            <strong>Building Number:</strong> {detailedAddress.buildingNumber}
          </p>
          <p>
            <strong>City:</strong> {detailedAddress.city}
          </p>
          <p>
            <strong>State:</strong> {detailedAddress.state}
          </p>
          <p>
            <strong>Zip:</strong> {detailedAddress.zip}
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowserFeature;
