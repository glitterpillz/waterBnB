import './SpotCreatePage.css';

import * as sessionActions from '../../store/session';

import { useState } from 'react';
import { useDispatch } from 'react-redux'


function SpotCreatePage() {
    const dispatch = useDispatch();


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


    const handleSubmit = (e) => {
        e.preventDefault();

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

        dispatch(sessionActions.createUserSpot(spotData));
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
                </label>
                <label>
                    Street Address
                    <input
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
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
                <button type='submit'>Create Spot</button>
            </form>
        </div>
    )
}


export default SpotCreatePage;
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!sessionUser) {
//             alert('You must be logged in to create a spot');
//             history.push('/login');
//             return;
//         }

//         if (!country || !street || !city || !lat || !lng || !name || !price) {
//             alert('Please fill out all the required fields');
//             return;
//         }

//         const spotData = {
//             country,
//             street,
//             city,
//             lat,
//             lng,
//             description,
//             name,
//             price,
//             images
//         };

//         const response = dispatch(spotActions.createNewSpot(spotData));

//         if (response.ok) {
//             history.push('/spots');
//         } else {
//             alert('There was an error creating the spot');
//         }

//     }

//     return (
//         <div>
//             <h1>Create a New Spot</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type='text'
//                     placeholder='Country'
//                     value={country}
//                     onChange={(e) => setCountry(e.target.value)}
//                 />
//                 <input
//                     type='text'
//                     placeholder='Street Address'
//                     value={street}
//                     onChange={(e) => setStreet(e.target.value)}
//                 />
//                 <input
//                     type='text'
//                     placeholder='City'
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                 />
//                 <input
//                     type='number'
//                     placeholder='Latitude'
//                     value={lat}
//                     onChange={(e) => setLat(e.target.value)}
//                     step='0.0001'
//                 />
//                 <input
//                     type='number'
//                     placeholder='Longitude'
//                     value={lng}
//                     onChange={(e) => setLng(e.target.value)}
//                     step='0.0001'
//                 />
//                 <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder='Enter a description'
//                 />
//                 <input
//                     type='text'
//                     placeholder='Title'
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <input
//                     type='number'
//                     placeholder='price'
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                 />
//                 {images.map((image, index) => (
//                     <input
//                         key={index}
//                         type='url'
//                         placeholder={`Image URL ${index + 1}`}
//                         value={image}
//                         onChange={(e) => {
//                             const updatedImages = [...images];
//                             updatedImages[index] = e.target.value;
//                             setImages(updatedImages);
//                         }}
//                     />
//                 ))}
//                 <button type='submit'>Create Spot</button>
//             </form>
//         </div>
//     )
// }

// export default SpotCreatePage;