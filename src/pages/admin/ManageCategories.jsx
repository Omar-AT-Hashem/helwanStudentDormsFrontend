import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategories, setNewCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const generateUniqueId = () =>
    `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  const handleAddCategory = () => {
    const newUnsavedCategory = {
      id: generateUniqueId(),
      name: "",
      cities: [""],
    };
    setNewCategories([...newCategories, newUnsavedCategory]);
  };

  const handleSaveCategory = (unsavedCategory, index) => {
    setCategories([...categories, unsavedCategory]);
    setNewCategories(newCategories.filter((cat, i) => i !== index));
  };

  const handleCancelAddCategory = (index) => {
    setNewCategories(newCategories.filter((cat, i) => i !== index));
  };

  const handleAddCity = (categoryIndex) => {
    const updatedCategories = [...newCategories];
    updatedCategories[categoryIndex].cities.push("");
    setNewCategories(updatedCategories);
  };

  const handleDeleteCity = (categoryIndex, cityIndex) => {
    const updatedCategories = [...newCategories];
    updatedCategories[categoryIndex].cities.splice(cityIndex, 1);
    setNewCategories(updatedCategories);
  };

  const handleUpdateCategoryName = (categoryIndex, name) => {
    const updatedCategories = [...newCategories];
    updatedCategories[categoryIndex].name = name;
    setNewCategories(updatedCategories);
  };

  const handleUpdateCity = (categoryIndex, cityIndex, cityName) => {
    const updatedCategories = [...newCategories];
    updatedCategories[categoryIndex].cities[cityIndex] = cityName;
    setNewCategories(updatedCategories);
  };

  const handleEditCategory = (categoryIndex) => {
    setEditingCategory(categoryIndex);
  };

  const handleCancelEditCategory = () => {
    setEditingCategory(null);
  };

  const handleSaveEditedCategory = (categoryIndex) => {
    // Implement the logic to save the edited category here
    // After saving, update the categories state
    setEditingCategory(null);
  };

  const handleDeleteCategories = () => {
    const updatedCategories = categories.filter(
      (category, index) => !selectedCategories.includes(index)
    );
    setCategories(updatedCategories);
    setSelectedCategories([]); // Clear the selectedCategories array after deletion

    setCategories(updatedCategories);
    setSelectedCategories([]);
  };

  const toggleCategorySelection = (index) => {
    if (selectedCategories.includes(index)) {
      setSelectedCategories(selectedCategories.filter((i) => i !== index));
    } else {
      setSelectedCategories([...selectedCategories, index]);
    }
  };

  return (
    <div className="pt-16 flex flex-row w-full h-screen relative font-sans">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #A9872D",
            backgroundColor: "#A9872D",
            padding: "16px",
            color: "white",
            fontWeight: "bold",
            marginTop: "65px",
            textAlign: "center",
          },
        }}
      />
      <div className="flex-1">
        <h1>Manage Categories</h1>

        <div>
          <h2>Categories</h2>
          <button onClick={handleAddCategory}>Add Category</button>
          <button onClick={handleDeleteCategories}>
            Delete Checked Categories
          </button>

          {newCategories.map((unsavedCategory, index) => (
            <div key={unsavedCategory.id}>
              <h3>Add New Category</h3>
              <label>
                Category Name:
                <input
                  type="text"
                  placeholder="Category Name"
                  value={unsavedCategory.name}
                  onChange={(e) =>
                    handleUpdateCategoryName(index, e.target.value)
                  }
                  required
                />
              </label>
              <h4>Cities:</h4>
              {unsavedCategory.cities.map((city, cityIndex) => (
                <div key={cityIndex}>
                  <label>
                    City Name:
                    <input
                      type="text"
                      placeholder="City Name"
                      value={city}
                      onChange={(e) =>
                        handleUpdateCity(index, cityIndex, e.target.value)
                      }
                      required
                    />
                  </label>
                  <button onClick={() => handleDeleteCity(index, cityIndex)}>
                    Delete City
                  </button>
                </div>
              ))}
              <button onClick={() => handleAddCity(index)}>Add City</button>
              <button
                onClick={() => handleSaveCategory(unsavedCategory, index)}
              >
                Save
              </button>
              <button onClick={() => handleCancelAddCategory(index)}>
                Cancel
              </button>
            </div>
          ))}

          {categories.map((category, index) => (
            <div key={category.id}>
              {editingCategory === index ? (
                // Edit mode
                <div>
                  <h3>Edit Category</h3>
                  <label>
                    Category Name:
                    <input
                      type="text"
                      placeholder="Category Name"
                      value={category.name}
                      onChange={(e) =>
                        handleUpdateCategoryName(index, e.target.value)
                      }
                      required
                    />
                  </label>
                  <h4>Cities:</h4>
                  {category.cities.map((city, cityIndex) => (
                    <div key={cityIndex}>
                      <label>
                        City Name:
                        <input
                          type="text"
                          placeholder="City Name"
                          value={city}
                          onChange={(e) =>
                            handleUpdateCity(index, cityIndex, e.target.value)
                          }
                          required
                        />
                      </label>
                      <button
                        onClick={() => handleDeleteCity(index, cityIndex)}
                      >
                        Delete City
                      </button>
                    </div>
                  ))}
                  <button onClick={() => handleAddCity(index)}>Add City</button>
                  <button onClick={() => handleSaveEditedCategory(index)}>
                    Save
                  </button>
                  <button onClick={handleCancelEditCategory}>Cancel</button>
                </div>
              ) : (
                // Non-editable mode
                <div>
                  <button onClick={() => handleEditCategory(index)}>
                    Update Category
                  </button>
                  <div>
                    <strong>Category Name: {category.name}</strong>
                  </div>
                  <div>
                    <strong>Cities:</strong>
                    {category.cities.map((city, cityIndex) => (
                      <div key={cityIndex}>{city}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {loading && (
        <Loader2
          size={100}
          className="animate-spin duration-200 absolute left-[50%] top-[50%]"
        />
      )}
    </div>
  );
};

export default ManageCategories;
