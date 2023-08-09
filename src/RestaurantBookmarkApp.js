import React, { useState } from 'react';
import Address from './Address';
import BookmarkedList from './BookmarkedList';
import ImageUploader from './ImageUploader';

function RestaurantBookmarkApp() {
    const [showAddressSearch, setShowAddressSearch] = useState(false);
    const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleToggleAddressSearch = () => {
        setShowAddressSearch(!showAddressSearch);
    };

    const handleAddBookmark = (restaurant) => {
        setBookmarkedRestaurants([...bookmarkedRestaurants, restaurant]);
        setShowAddressSearch(false); // Close the address search after adding bookmark
    };

    const handleImageUpload = (image) => {
        // Perform image upload logic and update the state
        setUploadedImages([...uploadedImages, image]);
    };

    return (
        <div>
            <button onClick={handleToggleAddressSearch}>맛집 등록하기</button>
            {showAddressSearch && (
                <Address
                    onAddBookmark={handleAddBookmark}
                />
            )}
            <BookmarkedList restaurants={bookmarkedRestaurants} />
            <ImageUploader onImageUpload={handleImageUpload} />
            {/* Render other components */}
        </div>
    );
}

export default RestaurantBookmarkApp;
