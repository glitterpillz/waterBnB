import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUserSpot } from '../../store/session';
import { useNavigate } from 'react-router-dom';

function EditSpotForm({ spot, setEditingSpot }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatedSpotData, setUpdatedSpotData] = useState({
    country: spot.country,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    lat: spot.lat,
    lng: spot.lng,
    description: spot.description,
    name: spot.name,
    price: spot.price,
    previewImage: spot.previewImage,
  });

  console.log(spot.images);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSpotData({ ...updatedSpotData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editUserSpot(spot.id, updatedSpotData));
    setEditingSpot(null);

    navigate(`/spots/${spot.id}`)
  };

  return (
    <div>
      <form className='create-spot-form' onSubmit={handleSubmit}>
        <h1>Update Your Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p>Guests will get your exact address once they booked a reservation.</p>
        <br />
        <label>
            Country
            <input
              type="text"
              name="country"
              value={updatedSpotData.country}
              onChange={handleChange}
            />
        </label>
        <label>
            Street Address
            <input
              type='text'
              name='address'
              value={updatedSpotData.address}
              onChange={handleChange}
            />
        </label>
        <div className='city-state-container'>

          <label>
              City
              <input
                type='text'
                name='city'
                value={updatedSpotData.city}
                onChange={handleChange}
              />
          </label>
          <label>
              State
              <input
                type='text'
                name='state'
                value={updatedSpotData.state}
                onChange={handleChange}
              />
          </label>
        </div>
        <div className='lat-lng-container'>

          <label>
              Latitude
              <input
                type='text'
                name='lat'
                value={updatedSpotData.lat}
                onChange={handleChange}
              />
          </label>
          <label>
              Longitude
              <input
                type='text'
                name='lng'
                value={updatedSpotData.lng}
                onChange={handleChange}
              />
          </label>
        </div>
        <br />
        <hr />
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea
          name="description"
          value={updatedSpotData.description}
          onChange={handleChange}
        />
        <br />
        <hr />
        <h2>Create a title for your spot</h2>
        <p>Catch guest&apos;s attention with a spot title that highlights what makes your place special.</p>
        <input
          type='text'
          name='name'
          value={updatedSpotData.name}
          onChange={handleChange}
        />
        <br />
        <hr />
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div className='price-input'>
          <p>$</p>
          <input
            type='number'
            name='price'
            value={updatedSpotData.price}
            onChange={handleChange}          
          />
        </div>
        <br />
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default EditSpotForm;