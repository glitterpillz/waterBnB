import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditSpotForm from './EditSpotForm';

function EditSpotPage() {
  const { spotId } = useParams(); 

  const userSpots = useSelector((state) => state.session.userSpots); 

  const [spot, setSpot] = useState(null);

  useEffect(() => {
    if (userSpots.length > 0) {
      const foundSpot = userSpots.find(spot => spot.id === Number(spotId));
      setSpot(foundSpot);
    }
  }, [userSpots, spotId]); 

  if (!spot) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <EditSpotForm spot={spot} setEditingSpot={setSpot} />
    </div>
  );
}

export default EditSpotPage;
