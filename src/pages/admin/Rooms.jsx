import React, { useState } from 'react';

function Rooms() {
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedBuilding, setSelectedBuilding] = useState({});
  const [selectedLevel, setSelectedLevel] = useState({});
  const [roomsInLevel, setRoomsInLevel] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [roomFormVisible, setRoomFormVisible] = useState(false);
  const [newRoomData, setNewRoomData] = useState({
    name: '',
    numberOfBeds: 1,
    type: 'normal',
    typeOfHousing: 'students',
  });

  const citiesData = [
    {
      name: 'City A',
      type: 'sakan',
      buildings: [
        {
          name: 'Building 1',
          numberOfLevels: 2,
          levels: [
            {
              name: 'Level 1',
              rooms: [
                {
                  name: 'Room 101',
                  numberOfBeds: 2,
                  type: 'normal',
                  typeOfHousing: 'students',
                },
              ],
            },
            {
              name: 'Level 2',
              rooms: [
                {
                  name: 'Room 201',
                  numberOfBeds: 3,
                  type: 'special',
                  typeOfHousing: 'notstudents',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const handleCityClick = (city) => {
    setSelectedCity(city);
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

  const handleAddRoom = () => {
    setRoomFormVisible(true);
  };

  const handleSaveRoom = () => {
    // Add logic to save new room data
    setRoomFormVisible(false);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleUpdateRoom = () => {
    console.log('Room updated:', selectedRoom);
    // Logic to update room
  };

  const handleDeleteRoom = () => {
    console.log('Room deleted:', selectedRoom);
    // Logic to delete room
  };

  return (
    <div className="rooms-container">
      <div className="sidebar">
        <h2>Cities</h2>
        <ul>
          {citiesData.map((city, index) => (
            <li key={index}>
              <button onClick={() => handleCityClick(city)}>
                {city.name} - {city.type}
              </button>
              {selectedCity.name === city.name && (
                <ul>
                  {city.buildings.map((building, index) => (
                    <li key={index}>
                      <button onClick={() => handleBuildingClick(building)}>
                        {building.name} - Levels: {building.numberOfLevels}
                      </button>
                      {selectedBuilding.name === building.name && (
                        <div>
                          <button onClick={handleAddRoom}>Add Room</button>
                          {/* Logic for updating and deleting building */}
                        </div>
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
        {selectedLevel.name && (
          <div>
            <h3>Rooms in {selectedLevel.name}</h3>
            <ul>
              {roomsInLevel.map((room, index) => (
                <li key={index} onClick={() => handleRoomClick(room)}>
                  {room.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {roomFormVisible && (
          <div>
            <h3>Add Room</h3>
            <input
              type="text"
              placeholder="Room Name"
              value={newRoomData.name}
              onChange={(e) => setNewRoomData({ ...newRoomData, name: e.target.value })}
            />
            <select
              value={newRoomData.numberOfBeds}
              onChange={(e) => setNewRoomData({ ...newRoomData, numberOfBeds: e.target.value })}
            >
              <option value={1}>1 bed</option>
              <option value={2}>2 beds</option>
              <option value={3}>3 beds</option>
              <option value={4}>4 beds</option>
            </select>
            {/* Other selectors for type and typeOfHousing */}
            <button onClick={handleSaveRoom}>Save</button>
          </div>
        )}
        {selectedRoom.name && (
          <div>
            <h3>Selected Room</h3>
            <p>Name: {selectedRoom.name}</p>
            <p>Type: {selectedRoom.type}</p>
            <p>Type of Housing: {selectedRoom.typeOfHousing}</p>
            <p>Number of Beds: {selectedRoom.numberOfBeds}</p>
            <button onClick={handleUpdateRoom}>Update Room</button>
            <button onClick={handleDeleteRoom}>Delete Room</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;
