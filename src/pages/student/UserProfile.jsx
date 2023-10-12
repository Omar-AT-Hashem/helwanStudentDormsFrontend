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

  // Function to handle the image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    // Set the selected image file
    setSelectedImage(file);

    // Display a preview of the selected image
  };

  return (
    user && (
      <div className="pt-16 ">
        <div className="flex justify-between mx-2 ml-20 my-2 bg-amber-50">
          <div className="flex flex-col">
            <span className="text-2xl">
              <span className="text-red-600 font-bold">الاسم:</span> {user.name}
            </span>
            <span className="text-2xl">
              <span className="text-red-600 font-bold">الرقم القومي:</span>{" "}
              {user.nationalId}
            </span>
          </div>
          <div>
            <img
              src="/default-photo.jpg"
              className="h-40"
              alt="default image"
            />
          </div>
        </div>
        <form className="px-4 py-2 grid grid-cols-2 gap-">
          <div className="mx-5 my-5">
            <div>نوع السكن:</div>
            <input
              className="bg-slate-500"
              type="text"
              value={userData.apartmentType}
              readOnly={!isEditable}
              onChange={(e) =>
                setUserData({ ...userData, apartmentType: e.target.value })
              }
              id="apartmentType"
            />
          </div>

          <div className="mx-5 my-5">
            <div>نوع السكن:</div>
            <input
              className="bg-slate-500"
              type="text"
              value={userData.apartmentType}
              readOnly={!isEditable}
              onChange={(e) =>
                setUserData({ ...userData, apartmentType: e.target.value })
              }
              id="apartmentType"
            />
          </div>

          <div className="mx-5 my-5">
            <div>نوع السكن:</div>
            <input
              className="bg-slate-500"
              type="text"
              value={userData.apartmentType}
              readOnly={!isEditable}
              onChange={(e) =>
                setUserData({ ...userData, apartmentType: e.target.value })
              }
              id="apartmentType"
            />
          </div>

          <div className="mx-5 my-5">
            <div>نوع السكن:</div>
            <input
              className="bg-slate-500"
              type="text"
              value={userData.apartmentType}
              readOnly={!isEditable}
              onChange={(e) =>
                setUserData({ ...userData, apartmentType: e.target.value })
              }
              id="apartmentType"
            />
          </div>
 
        
        </form>
      </div>
    )
  );
}

export default UserProfile;
