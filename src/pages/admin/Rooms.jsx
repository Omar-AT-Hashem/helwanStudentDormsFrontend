import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Rooms() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState({});
  const [selectedLevel, setSelectedLevel] = useState({});
  const [roomsInLevel, setRoomsInLevel] = useState([]);

  const citiesData = [
   {
      name: 'City A',
      type: 'sakan',
      buildings: [
        {
          name: 'Building 1',
          levels: [
            {
              name: 'Level 1',
              rooms: ['Room 101', 'Room 102', 'Room 103'],
            },
            {
              name: 'Level 2',
              rooms: ['Room 201', 'Room 202'],
            },
          ],
        },
        
      ],
    },
  
  ];

  const handleCityClick = (cityName) => {
    setSelectedCity(cityName);
    setSelectedBuilding({});
    setSelectedLevel({});
    setRoomsInLevel([]);
  };

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
    setSelectedLevel({});
    setRoomsInLevel([]);
  };

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    setRoomsInLevel(level.rooms);
  };

  const handleUpdateBuilding = () => {
    console.log('Building updated:', selectedBuilding);
  };

  const handleAddRoom = () => {
    console.log('Room added to', selectedLevel);
  };

  return (
    <div className="rooms-container">
      <div className="pt-16 flex flex-row w-full h-screen relative font-sans">
        <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #A9872D",
              backgroundColor: "#A9872D",
              padding: "16px",
              color: "white",
              fontWeight: "Bold",
              marginTop: "65px",
              textAlign: "center",
            },
          }}
        />
        <div className="flex-1 mt-4 snap-x">
          <div className="bg-mainBlue w-3/4 h-10 mr-56 text-fuchsia-50 text-center text-2xl mt-4 rounded-lg text-mr-1">
            اداره التعليمات  - جامعة حلوان
          </div>
          <div className="sidebar">
            <h2>Cities</h2>
            <ul>
              {citiesData.map((city, index) => (
                <li key={index}>
                  <button onClick={() => handleCityClick(city.name)}>{city.name}</button>
                  {selectedCity === city.name && (
                    <ul>
                      {city.buildings.map((building, index) => (
                        <li key={index}>
                          <button onClick={() => handleBuildingClick(building)}>{building.name}</button>
                          {selectedBuilding.name === building.name && (
                            <ul>
                              {building.levels.map((level, index) => (
                                <li key={index}>
                                  <button onClick={() => handleLevelClick(level)}>{level.name}</button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="main-content">
            <h1>{selectedCity}</h1>
            {selectedBuilding.name && (
              <div>
                <h2>{selectedBuilding.name}</h2>
                <p>Number of Levels: {selectedBuilding.levels.length}</p>
                <button onClick={handleUpdateBuilding}>Update</button>
              </div>
            )}
            {selectedLevel.name && (
              <div>
                <h3>Rooms in {selectedLevel.name}</h3>
                <ul>
                  {roomsInLevel.map((room, index) => (
                    <li key={index}>{room}</li>
                  ))}
                </ul>
                <button onClick={handleAddRoom}>Add Room</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
