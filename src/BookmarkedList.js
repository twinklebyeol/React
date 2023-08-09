import React from 'react';

function BookmarkedList({ restaurants }) {
    return (
        <div>
            <h2>북마크된 레스토랑</h2>
            <ul>
                {restaurants.map((restaurant, index) => (
                    <li key={index}>
                        {restaurant.name} - {restaurant.address}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookmarkedList;
