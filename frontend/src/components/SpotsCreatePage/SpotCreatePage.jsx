import './SpotCreatePage.css';

import { csrfFetch } from '../../store/csrf';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SpotCreatePage() {
    const navigate = useNavigate();


    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [images, setImages] = useState(['', '', '', '']);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        
        const response = await csrfFetch("/api/spots/", {
          method: "POST",
          body: JSON.stringify({
            country,
            address,
            city,
            state,
            lat,
            lng,
            name,
            description,
            price,
            previewImage,
            images
          }),
        });
      
        if (response.ok) {
          const data = await response.json();
          console.log("Spot created with data:", data);
          navigate(`/spots/${data.id}`);
        } else {
          console.error("Failed to create spot:", response);
        }
      };
    

    return (
        <div>
            <form className='create-spot-form' onSubmit={handleSubmit}>
                <h1>Create a New Spot</h1>
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


export default SpotCreatePage;