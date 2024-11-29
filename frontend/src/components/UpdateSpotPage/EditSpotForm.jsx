import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUserSpot } from '../../store/session';

function EditSpotForm({ spot, setEditingSpot }) {
  const dispatch = useDispatch();
  const [updatedSpotData, setUpdatedSpotData] = useState({
    name: spot.name,
    description: spot.description,
    price: spot.price,
    previewImage: spot.previewImage,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSpotData({ ...updatedSpotData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editUserSpot(spot.id, updatedSpotData));
    setEditingSpot(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={updatedSpotData.name}
        onChange={handleChange}
      />
      <label>Description:</label>
      <textarea
        name="description"
        value={updatedSpotData.description}
        onChange={handleChange}
      />
      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={updatedSpotData.price}
        onChange={handleChange}
      />
      <label>Preview Image URL:</label>
      <input
        type="text"
        name="previewImage"
        value={updatedSpotData.previewImage}
        onChange={handleChange}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditSpotForm;