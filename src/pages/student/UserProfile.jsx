import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTE } from "../../config/env";


function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // State variables for user data
  // const [userData, setUserData] = useState({
  //   image: '', // Image URL
  //   nationalId: '',
  //   name: '',
  //   birthday: '',
  //   placeOfBirth: '',
  //   gender: '',
  //   telephone: '',
  //   mobile: '',
  //   email: '',
  //   religion: '',
  //   faculty: '',
  //   fatherName: '',
  //   fatherNationalId: '',
  //   fatherOccupation: '',
  //   fatherNumber: '',
  //   guardianName: '',
  //   guardianNationalId: '',
  //   guardianRelationship: '',
  //   residence: '',
  //   addressDetails: '',
  //   isDisabled: 0,
  //   familyAbroad: 0,
  //   highschoolAbroad: 0,
  //   highschoolSpecialization: '',
  //   highschoolGrade: '',
  //   accomodationType: '',
  //   accomodationWithNutrition: '',
  //   password: '',
  //   applicationStatus: '',
  // });

  const [userData, setUserData] = useState();

  // State variable to track the selected image file
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${API_ROUTE}/v1/student/get-by-nationalId/${sessionStorage.getItem(
          "nationalId"
        )}`
      )
      .then((response) => {
        console.log(response);
        setUser(response.data);
        setUserData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response ? err.response.data.error : "An error occurred");
        setLoading(false);
      });
  }, []);

;

  // Function to handle the image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    // Set the selected image file
    setSelectedImage(file);

    // Display a preview of the selected image
    const reader = new FileReader();
    reader.onload = (e) => {
      setUserData({ ...userData, image: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  // Function to handle the Save button click
  const handleSaveClick = () => {
    setErrorMessage(null);

    // Create an object with the updated user data based on the form fields
    const updatedUserData = {
      image: userData.image,
      nationalId: userData.nationalId,
      name: userData.name,
      mobile: userData.mobile,
      email: userData.email,
      address: userData.address,
      religion: userData.religion,
      residence: userData.residence,
      fatherName: userData.fatherName,
      fatherNationalId: userData.fatherNationalId,
      fatherNumber: userData.fatherNumber,
      fatherJob: userData.fatherJob,
      guardianName: userData.guardianName,
      guardianRelationship: userData.guardianRelationship,
      disabled: userData.disabled,
      familyAbroad: userData.familyAbroad,
      apartmentType: userData.apartmentType,
      applicationStatus: userData.applicationStatus,
    };

    // If a new image is selected, update the 'image' property in the user data
    if (selectedImage) {
      updatedUserData.image = selectedImage;
    }

    axios
      .put(
        `${API_ROUTE}/user/update/${sessionStorage.getItem("nationalId")}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // Handle success response
        setIsEditable(false); // Disable editing mode after successful save
      })
      .catch((error) => {
        // Handle errors
        setErrorMessage("Failed to update profile"); // Set error message
      });
  };

  return (
    user &&
    <div clas>
      <h1>Student's Profile</h1>
      <form>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="image"
            style={{ display: "none" }} // Hide the file input
          />
          <img
            src={userData.image || user.image}
            alt="User's Profile"
            style={{ maxWidth: "200px" }}
          />
          {isEditable && (
            <button onClick={() => document.getElementById("image").click()}>
              Select Image
            </button>
          )}
        </div>
        <div>
          <label htmlFor="nationalId">National ID:</label>
          <input
            type="number"
            value={userData.nationalId}
            readOnly
            id="nationalId"
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={userData.name}
            readOnly={!isEditable}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            id="name"
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="number"
            value={userData.mobile}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, mobile: e.target.value })
            }
            id="mobile"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={userData.email}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            id="email"
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            value={userData.address}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
            id="address"
          />
        </div>
        <div>
          <label htmlFor="religion">Religion:</label>
          <input
            type="text"
            value={userData.religion}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, religion: e.target.value })
            }
            id="religion"
          />
        </div>
        <div>
          <label htmlFor="residence">Address Details:</label>
          <input
            type="text"
            value={userData.residence}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, residence: e.target.value })
            }
            id="residence"
          />
        </div>
        <div>
          <label htmlFor="fatherName">Father's Name:</label>
          <input
            type="text"
            value={userData.fatherName}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, fatherName: e.target.value })
            }
            id="fatherName"
          />
        </div>
        <div>
          <label htmlFor="fatherNationalId">Father's National Id:</label>
          <input
            type="text"
            value={userData.fatherNationalId}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, fatherNationalId: e.target.value })
            }
            id="fatherNationalId"
          />
        </div>
        <div>
          <label htmlFor="fatherNumber">Father's Phone Number:</label>
          <input
            type="number"
            value={userData.fatherNumber}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, fatherNumber: e.target.value })
            }
            id="fatherNumber"
          />
        </div>
        <div>
          <label htmlFor="fatherJob">Father's Job:</label>
          <input
            type="text"
            value={userData.fatherJob}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, fatherJob: e.target.value })
            }
            id="fatherJob"
          />
        </div>
        <div>
          <label htmlFor="guardianName">Guardian Name:</label>
          <input
            type="text"
            value={userData.guardianName}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, guardianName: e.target.value })
            }
            id="guardianName"
          />
        </div>
        <div>
          <label htmlFor="guardianRelationship">Guardian Relationship:</label>
          <input
            type="text"
            value={userData.guardianRelationship}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, guardianRelationship: e.target.value })
            }
            id="guardianRelationship"
          />
        </div>
        <div>
          <label htmlFor="disabled">Disabled:</label>
          <input
            type="checkbox"
            checked={userData.disabled}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, disabled: e.target.checked })
            }
            id="disabled"
          />
        </div>
        <div>
          <label htmlFor="familyAbroad">Family Abroad:</label>
          <input
            type="checkbox"
            checked={userData.familyAbroad}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, familyAbroad: e.target.checked })
            }
            id="familyAbroad"
          />
        </div>
        <div>
          <label htmlFor="apartmentType">Apartment Type:</label>
          <input
            type="text"
            value={userData.apartmentType}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, apartmentType: e.target.value })
            }
            id="apartmentType"
          />
        </div>
        <div>
          <label htmlFor="applicationStatus">Application Status:</label>
          <input
            type="text"
            value={userData.applicationStatus}
            readOnly={!isEditable}
            onChange={(e) =>
              setUserData({ ...userData, applicationStatus: e.target.value })
            }
            id="applicationStatus"
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {user &&
          user.applicationStatus !== "accepted" &&
          user.applicationStatus !== "reviewed" && (
            <div>
              {isEditable ? (
                <button onClick={handleSaveClick}>Save</button>
              ) : (
                <button onClick={() => setIsEditable(true)}>Edit</button>
              )}
            </div>
          )}
      </form>
    </div>
              
  );
}

export default UserProfile;
