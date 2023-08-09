import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { KakaoMap, KakaoPlace } from 'react-kakao-maps';

function Address() {
    const [openPostcode, setOpenPostcode] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
        const [currentLocation, setCurrentLocation] = useState(null);

    const handleClickButton = () => {
        setOpenPostcode(prevOpenPostcode => !prevOpenPostcode);
    };

    const handleSelectPlace = place => {
        console.log(`
            장소명: ${place.name},
            주소: ${place.address},
            카테고리: ${place.category_name}
        `);
        setSelectedPlace(place);
    };

    return (
        <div>
            <button onClick={handleClickButton}>장소검색</button>
            {openPostcode && (
                <DaumPostcode 
                    onComplete={handleSelectPlace}
                    autoClose={false}
                    defaultQuery=""
                />
            )}
            
            {selectedPlace && (
                <KakaoMap
                    apiKey="84cbc98e39f026fe18815f96084df1d3"
                    width="100%"
                    height="300px"
                    initialOptions={{
                        center: {
                            lat: selectedPlace.y,
                            lng: selectedPlace.x,
                        },
                    }}
                >
                    <KakaoPlace.Marker
                        position={{
                            lat: selectedPlace.y,
                            lng: selectedPlace.x,
                        }}
                        title={selectedPlace.name}
                    />
                </KakaoMap>
            )}
        </div>
    );
}

export default Address;
