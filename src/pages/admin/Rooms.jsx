import React, { useState } from 'react';
// City component
function CityDetails({ selectedCity, handleUpdateBuilding, handleCityDelete }) {
  return (
    <div>
      <h2>{selectedCity.name} - {selectedCity.type}</h2>
      {/* Additional city details */}
      <button onClick={handleUpdateBuilding}>Update Building</button>
      <button onClick={handleCityDelete}>Delete Building</button>
    </div>
  );
}

// Building component
function BuildingDetails({ selectedBuilding, handleAddRoom }) {
  return (
    <div>
      <h2>{selectedBuilding.name} - Levels: {selectedBuilding.numberOfLevels}</h2>
      {/* Additional building details */}
      <button onClick={handleAddRoom}>Add Room</button>
    </div>
  );
}

// Level component
function LevelDetails({ selectedLevel, roomsInLevel, handleRoomClick }) {
  return (
    <div>
      <h2>Rooms in {selectedLevel.name}</h2>
      <ul>
        {roomsInLevel.map((room, index) => (
          <li key={index} onClick={() => handleRoomClick(room)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}


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
  const [editingBuilding, setEditingBuilding] = useState(false);
  const [editingRoom, setEditingRoom] = useState(false);
  const [editingRoomData, setEditingRoomData] = useState({});
  const [roomDetailsVisible, setRoomDetailsVisible] = useState(false);

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
              {
                name: 'Room 102',
                numberOfBeds: 3,
                type: 'special',
                typeOfHousing: 'notstudents',
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
  {
    name: 'City B',
    type: 'metropolitan',
    buildings: [
      {
        name: 'Building 2',
        numberOfLevels: 3,
        levels: [
          {
            name: 'Level 1',
            rooms: [
              {
                name: 'Room 103',
                numberOfBeds: 4,
                type: 'normal',
                typeOfHousing: 'students',
              },
            ],
          },
          {
            name: 'Level 2',
            rooms: [
              {
                name: 'Room 202',
                numberOfBeds: 2,
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

const handleUpdateBuilding = () => {
  setEditingBuilding(true);
  // Copy the selected building data to preserve original values while editing
  setSelectedBuilding((prevBuilding) => ({ ...prevBuilding }));
};

  const handleSaveBuilding = () => {
    // Logic to update building
    setEditingBuilding(false);
  };

  const handleExitEditBuilding = () => {
    setEditingBuilding(false);
    // Reset building data to the state before editing
    // Logic to revert building data to original state
  };

  const handleExitAddRoom = () => {
    setRoomFormVisible(false);
    // Reset new room data to default values
    setNewRoomData({
      name: '',
      numberOfBeds: 1,
      type: 'normal',
      typeOfHousing: 'students',
    });
  };
const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setEditingRoomData({});
    setRoomDetailsVisible(true);
  };

  const handleUpdateRoom = () => {
    setEditingRoomData({ ...selectedRoom });
  };

  const handleSaveRoom = () => {
    // Logic to save updated room data
    // Update the room data in the state or backend
    setEditingRoomData({});
    setRoomDetailsVisible(false);
  };

  const handleExitRoomEdit = () => {
    setEditingRoomData({});
    setRoomDetailsVisible(false);
  };

  // Render function for displaying room details
  const renderRoomDetails = () => {
    if (roomDetailsVisible && selectedLevel.name && roomsInLevel.length > 0) {
      return (
        <div>
          <h2>Rooms in {selectedLevel.name}</h2>
          <ul>
            {roomsInLevel.map((room, index) => (
              <li key={index} onClick={() => handleRoomClick(room)}>
                {room.name}
              </li>
            ))}
          </ul>
          {selectedRoom.name && (
            <div>
              <h3>Room Details</h3>
              <p>Name: {selectedRoom.name}</p>
              <p>Number of Beds: {selectedRoom.numberOfBeds}</p>
              {/* Displaying update and delete buttons when room is selected */}
              <button onClick={handleUpdateRoom}>Update Room</button>
              <button onClick={() => setSelectedRoom({})}>Delete Room</button>
              {/* Render editing fields when update button is clicked */}
              {editingRoomData.name === selectedRoom.name && (
                <div>
                  <label>
                    Room Name:
                    <input
                      type="text"
                      value={editingRoomData.name}
                      onChange={(e) =>
                        setEditingRoomData({ ...editingRoomData, name: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Number of Beds:
                    <select
                      value={editingRoomData.numberOfBeds}
                      onChange={(e) =>
                        setEditingRoomData({ ...editingRoomData, numberOfBeds: e.target.value })
                      }
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </label>
                  <button onClick={handleSaveRoom}>Save</button>
                  <button onClick={handleExitRoomEdit}>Exit</button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Render function for the main content area
  const renderMainContent = () => {
    if (selectedLevel.name) {
      return (
        <LevelDetails
          selectedLevel={selectedLevel}
          roomsInLevel={roomsInLevel}
          handleRoomClick={handleRoomClick}
        />
      );
    } else if (selectedBuilding.name && !editingBuilding) {
      return (
        <BuildingDetails
          selectedBuilding={selectedBuilding}
          handleAddRoom={handleAddRoom}
        />
      );
    } else if (selectedCity.name) {
      return (
        <CityDetails
          selectedCity={selectedCity}
          handleUpdateBuilding={handleUpdateBuilding}
          handleCityDelete={() => setSelectedBuilding({})}
        />
      );
    }
    return null;
  };

  return (
    <div className="rooms-container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* City or Building or Level list */}
        <h2>
          {selectedCity.name && `${selectedCity.name} - ${selectedCity.type}`}
          {selectedBuilding.name && !editingBuilding && (
            <>
              <span>{` - Levels: ${selectedBuilding.numberOfLevels}`}</span>
              <button onClick={handleUpdateBuilding}>Update Building</button>
              <button onClick={() => setSelectedBuilding({})}>Delete Building</button>
            </>
          )}
          {selectedLevel.name && !roomFormVisible && (
            <>
              <span>{` - Rooms in ${selectedLevel.name}`}</span>
              <button onClick={handleAddRoom}>Add Room</button>
            </>
          )}
        </h2>
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
                        {building.name}
                      </button>
                      {/* Show levels if building is selected */}
                      {selectedBuilding.name === building.name && (
                        <ul>
                          {/* Mapping through levels */}
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

      {/* Main content */}
      <div className="main-content">
        {renderMainContent()}
       {renderRoomDetails()}
        {/* Form for adding a room */}
        {roomFormVisible && (
          <div>
            <h3>Add Room</h3>
            <label>
              Room Name:
              <input
                type="text"
                value={newRoomData.name}
                onChange={(e) => setNewRoomData({ ...newRoomData, name: e.target.value })}
              />
            </label>
            <label>
              Number of Beds:
              <select
                value={newRoomData.numberOfBeds}
                onChange={(e) => setNewRoomData({ ...newRoomData, numberOfBeds: e.target.value })}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </label>
            <button onClick={handleSaveRoom}>Save</button>
            <button onClick={handleExitAddRoom}>Exit</button>
          </div>
        )}

{selectedBuilding.name && editingBuilding && (
  <div>
    <h3>Edit Building Details</h3>
    <label>
      Building Name:
      <input
        type="text"
        value={selectedBuilding.name}
        onChange={(e) => setSelectedBuilding({ ...selectedBuilding, name: e.target.value })}
      />
    </label>
    <label>
      Number of Levels:
      <input
        type="number"
        value={selectedBuilding.numberOfLevels}
        onChange={(e) => setSelectedBuilding({ ...selectedBuilding, numberOfLevels: e.target.value })}
      />
    </label>
    {/* Add more input fields for editing other building details */}
    <button onClick={handleSaveBuilding}>Save</button>
    <button onClick={handleExitEditBuilding}>Exit</button>
  </div>
)}

      </div>
    </div>
  );
}

export default Rooms;
