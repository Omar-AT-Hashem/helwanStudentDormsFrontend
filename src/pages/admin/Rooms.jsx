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
    // Logic to save new room data
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
      {/* Sidebar */}
      <div className="sidebar">
        {/* City list */}
        <h2>Cities</h2>
        <ul>
          {/* Mapping through cities */}
          {citiesData.map((city, index) => (
            <li key={index}>
              <button onClick={() => handleCityClick(city)}>
                {city.name} - {city.type}
              </button>
              {/* Show buildings if city is selected */}
              {selectedCity.name === city.name && (
                <ul>
                  {/* Mapping through buildings */}
                  {city.buildings.map((building, index) => (
                    <li key={index}>
                      <button onClick={() => handleBuildingClick(building)}>
                        {building.name} - Levels: {building.numberOfLevels}
                      </button>
                      {/* Show room adding form if building is selected */}
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

      {/* Main content */}
      <div className="main-content">
        {/* Display rooms in the selected level */}
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

        {/* Form for adding a room */}
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
            {/* Selector for room type */}
            <select
              value={newRoomData.type}
              onChange={(e) => setNewRoomData({ ...newRoomData, type: e.target.value })}
            >
              <option value="normal">Normal</option>
              <option value="special">Special</option>
            </select>
            {/* Selector for type of housing */}
            <select
              value={newRoomData.typeOfHousing}
              onChange={(e) => setNewRoomData({ ...newRoomData, typeOfHousing: e.target.value })}
            >
              <option value="students">Students</option>
              <option value="notstudents">Not Students</option>
            </select>
            {/* Save button */}
            <button onClick={handleSaveRoom}>Save</button>
          </div>
        )}

        {/* Display selected room details */}
        {selectedRoom.name && (
          <div>
            <h3>Selected Room</h3>
            <p>Name: {selectedRoom.name}</p>
            <p>Type: {selectedRoom.type}</p>
            <p>Type of Housing: {selectedRoom.typeOfHousing}</p>
            <p>Number of Beds: {selectedRoom.numberOfBeds}</p>
            {/* Buttons for updating and deleting room */}
            <button onClick={handleUpdateRoom}>Update Room</button>
            <button onClick={handleDeleteRoom}>Delete Room</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;
