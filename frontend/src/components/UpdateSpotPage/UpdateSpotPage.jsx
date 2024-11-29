import * as sessionActions from '../../store/session';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditSpotForm = ({ spot }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    const [previewImage, setPreviewImage] = useState(spot.previewImage);
    const [images, setImages] = useState(spot.images);
    const [errors, setErrors] = useState({});
    
    const validateForm = () => {
        const errors = {};
        if (!country) errors.country = 'Country is required';
        if (!address) errors.address = 'Address is required';
        if (!city) errors.city = 'City is required';
        if (!state) errors.state = 'State is required';
        if (!lat) errors.lat = 'Latitude is required';
        if (!lng) errors.lng = 'Longitude is required';
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!name) errors.name = 'Name is required';
        if (!price) errors.price = 'Price is required';
        if (!previewImage) errors.previewImage = 'Preview image is required'
        if (images.some((image) => image && !isValidUrl(image))) errors.images = 'Image URL must end in .png, .jpg, or .jpeg';
        
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const isValidUrl = (url) => {
        const regex = /^(ftp|http|https):\/\/[^ "]+$/;
        return regex.test(url);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const spotData = {
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name,
            price,
            previewImage,
            images
        };

        dispatch(sessionActions.editUserSpot(spotData))
            .then((response) => {
                if (response?.spot?.id) {
                    navigate(`/spots/${response.spot.id}`);
                }
            })
            .catch((error) => {
                alert('An error occurred while updating your spot.', error)
            })
    };

    return (
        <div>
            <form className='edit-spot-form' onSubmit={handleSubmit}>
            <h1>Update Your Spot</h1>
                <h2>Where&apos;s your place located?</h2>
                <p>Guests will get your exact address once they booked a reservation.</p>
                <br />
                <label>
                    Country
                    <input
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    {errors.country && <span className='error'>{errors.country}</span>}
                </label>
                <label>
                    Street Address
                    <input
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <span className='error'>{errors.address}</span>}
                </label>
                <div className='city-state-container'>
                    <label>
                        City
                        <input
                            type='text'
                            placeholder='City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {errors.city && <span className='error'>{errors.city}</span>}
                    </label>
                    <span>, </span>
                    <label>
                        State
                        <input
                            type='text'
                            placeholder='STATE'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        {errors.state && <span className='error'>{errors.state}</span>}
                    </label>
                </div>
                <div className='lat-lng-container'>
                    <label>
                        Latitude
                        <input
                            type='number'
                            placeholder='Latitude'
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            step='0.0001'
                        />
                        {errors.lat && <span className='error'>{errors.lat}</span>}
                    </label>
                    <span>, </span>
                    <label>
                        Longitude
                        <input
                            type='number'
                            placeholder='Longitude'
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            step='0.0001'
                        />
                        {errors.lng && <span className='error'>{errors.lng}</span>}
                    </label>
                </div>
                <br />
                <hr />
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Please write at least 30 characters'
                />
                {errors.description && <span className='error'>{errors.description}</span>}
                <br />
                <hr />
                <h2>Create a title for your spot</h2>
                <p>Catch guest&apos;s attention with a spot title that highlights what makes your place special.</p>
                <input
                    type='text'
                    placeholder='Name of your spot'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span className='error'>{errors.name}</span>}
                <br />
                <hr />
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div className='price-input'>
                    <p>$</p>
                    <input
                        type='number'
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <span className='error'>{errors.price}</span>}
                </div>
                <br />
                <hr />
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type='url'
                    placeholder='Preview Image URL'
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                />
                {errors.previewImage && <span className='error'>{errors.previewImage}</span>}
                <div className='map-images'>
                    {images.map((image, index) => (
                        <input
                            key={index}
                            type='url'
                            placeholder={`Image URL ${index + 1}`}
                            value={image}
                            onChange={(e) => {
                                const updatedImages = [...images];
                                updatedImages[index] = e.target.value;
                                setImages(updatedImages);
                            }}
                        />
                    ))}
                </div>
                {errors.images && <span className='error'>{errors.images}</span>}
                <button type='submit'>Create Spot</button>
            </form>
        </div>
    )
}

export default EditSpotForm;