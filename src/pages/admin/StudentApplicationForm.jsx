import { useState } from "react";
import { API_ROUTE } from "../../config/env.js";
import axios from "axios";

function StudentApplicationForm() {
  const [formData, setFormData] = useState({
    nationalId: "",
    name: "",
    image: null,
    mobile: "",
    email: "",
    address: "",
    religion: "",
    collage: "",
    fatherName: "",
    fatherNationalId: "",
    fatherJob: "",
    fatherNumber: "",
    guardianName: "",
    guardianRelationship: "",
    residence: "",
    addressDetails: "",
    dateOfApplying: "",
    isDisabled: false,
    familyAbroad: false,
    apartmentType: "",
    password: "",
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    checked = checked ? 1 : 0;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send formData to your backend API to insert into the database and create an account
    
      const form = new FormData();
      form.set("image", formData.image);
      form.set("nationalId", formData.nationalId);
      form.set("name", formData.name);
      form.set("mobile", formData.mobile);
      form.set("email", formData.email);
      form.set("religion", formData.religion);
      form.set("address", formData.address);
      form.set("faculty", formData.faculty);
      form.set("fatherName", formData.fatherName);
      form.set("fatherNationalId", formData.fatherNationalId);
      form.set("fatherOccupation", formData.fatherOccupation);
      form.set("fatherNumber", formData.fatherNumber);
      form.set("guardianName", formData.guardianName);
      form.set("guardianRelationship", formData.guardianRelationship);
      form.set("residence", formData.residence);
      form.set("addressDetails", formData.addressDetails);
      form.set("dateOfApplying", formData.dateOfApplying);
      form.set("isDisabled", formData.isDisabled);
      form.set("familyAbroad", formData.familyAbroad);
      form.set("apartmentType", formData.apartmentType);
      form.set("password", formData.password);

      axios
        .post(`${API_ROUTE}/student/register`, form)
        .then((res) => {
          // setFormData({
          //   nationalId: "",
          //   name: "",
          //   image: "",
          //   mobile: "",
          //   email: "",
          //   address: "",
          //   religion: "",
          //   faculty: "",
          //   fatherName: "",
          //   fatherNationalId: "",
          //   fatherOccupation: "",
          //   fatherNumber: "",
          //   guardianName: "",
          //   guardianRelationship: "",
          //   residence: "",
          //   addressDetails: "",
          //   dateOfApplying: "",
          //   isDisabled: 0,
          //   familyAbroad: 0,
          //   apartmentType: "",
          //   password: "",
          // });
          setFormError(null);
          alert("Application submitted successfully!");
        }).catch(err => {
          console.log(err);
        })
  };

  return (
    <div>
      <h1>Student Application Form</h1>
      <form onSubmit={handleSubmit} className="mt-20">
        <label>
          National ID:
          <input
            type="number"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mobile:
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Religion:
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          College:
          <input
            type="text"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Father Name:
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Father National ID:
          <input
            type="number"
            name="fatherNationalId"
            value={formData.fatherNationalId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Father Occupation:
          <input
            type="text"
            name="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Father Phone Number:
          <input
            type="text"
            name="fatherNumber"
            value={formData.fatherNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Guardian Name:
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Guardian Relationship:
          <input
            type="text"
            name="guardianRelationship"
            value={formData.guardianRelationship}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Residence:
          <input
            type="text"
            name="residence"
            value={formData.residence}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address Details:
          <textarea
            name="addressDetails"
            value={formData.addressDetails}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date of Applying:
          <input
            type="date"
            name="dateOfApplying"
            value={formData.dateOfApplying}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Disabled:
          <input
            type="checkbox"
            name="isDisabled"
            checked={formData.isDisabled}
            onChange={handleChange}
          />
        </label>

        <label>
          Family Abroad:
          <input
            type="checkbox"
            name="familyAbroad"
            checked={formData.familyAbroad}
            onChange={handleChange}
          />
        </label>

        <label>
          Apartment Type:
          <input
            type="text"
            name="apartmentType"
            value={formData.apartmentType}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      {formError && <p className="error">{formError}</p>}
    </div>
  );
}

export default StudentApplicationForm;
