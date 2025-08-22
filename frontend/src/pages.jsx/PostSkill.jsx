import React, { useEffect, useState } from 'react';

function PostSkill() {
  // Username editing state
  const [username, setUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [inputUsername, setInputUsername] = useState('');

  // User details states
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [detailsExist, setDetailsExist] = useState(false);

  // Skills & new skill states
  const [skills, setSkills] = useState([]);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState('manual');
  const [visibility, setVisibility] = useState('public');
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch user profile details and skills on mount
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch username and profile
        const resUser = await fetch('http://localhost:5000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resUser.ok) {
          const userData = await resUser.json();
          setUsername(userData.username);
          setInputUsername(userData.username);
          if (userData.works) setSkills(userData.works);
        }

        // Fetch user details
        const resDetails = await fetch('http://localhost:5000/api/user-details', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resDetails.ok) {
          const detailsData = await resDetails.json();
          setLocation(detailsData.location || '');
          setAddress(detailsData.address || '');
          setPincode(detailsData.pincode || '');
          setMobileNumber(detailsData.mobileNumber || '');   // camelCase here
          setWhatsappNumber(detailsData.whatsappNumber || ''); // camelCase here
          setDetailsExist(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  // Username handlers
  const toggleUsernameEdit = () => {
    setIsEditingUsername(!isEditingUsername);
    setInputUsername(username);
  };

  const saveUsername = async () => {
    if (!inputUsername.trim()) {
      alert('Username cannot be empty');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ username: inputUsername }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsername(inputUsername);
        setIsEditingUsername(false);
        alert('Username updated successfully');
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      alert('Error updating username: ' + err.message);
    }
  };

  // Save or update user details
  const handleSaveDetails = async () => {
    if (!location || !address || !pincode || !mobileNumber || !whatsappNumber) {
      alert('Please fill all details');
      return;
    }
    try {
      const url = `http://localhost:5000/api/user-details`;
      const method = detailsExist ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ location, address, pincode, mobileNumber, whatsappNumber }),  // camelCase
      });

      const data = await res.json();
      if (res.ok) {
        alert(detailsExist ? 'Details updated successfully' : 'Details saved successfully');
        setDetailsExist(true);
      } else {
        alert(data.message || 'Failed to save details');
      }
    } catch (err) {
      alert('Error saving details: ' + err.message);
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  // Add new skill
  const handleAddSkill = async () => {
    if (!category.trim() || !subcategory.trim() || !description.trim() || !mode || !imageFile) {
      alert('Please complete all skill fields and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('description', description);
    formData.append('mode', mode);
    formData.append('visibility', visibility);
    formData.append('image', imageFile);

    try {
      const res = await fetch('http://localhost:5000/api/skills', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert('Skill added successfully');

        // Add new skill to list with returned skills array
        setSkills(data.works);

        // Reset form
        setCategory('');
        setSubcategory('');
        setDescription('');
        setMode('manual');
        setVisibility('public');
        setImageFile(null);
      } else {
        alert(data.message || 'Failed to add skill');
      }
    } catch (err) {
      alert('Error adding skill: ' + err.message);
    }
  };

  // Delete skill handler


  return (
  <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Post Skill</h2>

      {/* Username editing */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Username: </label>
        {isEditingUsername ? (
          <>
            <input value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} />
            <button onClick={saveUsername} style={{ marginLeft: 8 }}>
              Save
            </button>
            <button onClick={toggleUsernameEdit} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <span>{username}</span>
            <button onClick={toggleUsernameEdit} style={{ marginLeft: 8 }}>
              Edit
            </button>
          </>
        )}
      </div>

      {/* User details */}
      <div>
        <label>
          Location:
          <input value={location} onChange={(e) => setLocation(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input value={address} onChange={(e) => setAddress(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
        </label>
      </div>
      <div>
        <label>
          Pincode:
          <input value={pincode} onChange={(e) => setPincode(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
        </label>
      </div>
      <div>
        <label>
          Mobile Number:
          <input value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
        </label>
      </div>
      <div>
        <label>
          WhatsApp Number:
          <input value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
        </label>
      </div>

      <button onClick={handleSaveDetails} style={{ padding: '0.5rem 1.5rem', margin: '1rem 0', cursor: 'pointer' }}>
        {detailsExist ? 'Update Details' : 'Save Details'}
      </button>

      <hr />

      {/* Add Skill Form */}
      <div style={{ marginTop: '1rem' }}>
        <h3>Add New Skill</h3>

        <div>
          <label>
            Category:
            <input value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
          </label>
        </div>
        <div>
          <label>
            Subcategory:
            <input value={subcategory} onChange={(e) => setSubcategory(e.target.value)} style={{ marginLeft: 8, width: '80%' }} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginLeft: 8, width: '80%', height: 60 }}
            />
          </label>
        </div>
        <div>
          <label>
            Mode:
            <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ marginLeft: 8 }}>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Visibility:
            <select value={visibility} onChange={(e) => setVisibility(e.target.value)} style={{ marginLeft: 8 }}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Image:
            <input type="file" name="image" accept="image/*" onChange={(e) => {
              if (e.target.files.length > 0) setImageFile(e.target.files[0]);
            }} style={{ marginLeft: 8 }} />
          </label>
          {imageFile && <span> {imageFile.name} selected</span>}
        </div>
        <button onClick={handleAddSkill} style={{ padding: '0.5rem 1.5rem', marginTop: '1rem', cursor: 'pointer' }}>
          Add Skill
        </button>
      </div>

      {/* User Skills with status and delete */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Your Skills</h3>
        {skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          skills.map((skill) => (
            <div key={skill._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10, textAlign: 'left' }}>
              <p><strong>Category:</strong> {skill.category}</p>
              <p><strong>Subcategory:</strong> {skill.subcategory}</p>
              <p><strong>Description:</strong> {skill.description}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span style={{
                  color: skill.status === 'approved' ? 'green'
                    : skill.status === 'pending' ? 'orange'
                      : 'red',
                }}>
                  {skill.status || 'pending'}
                </span>
              </p>
              <button
                onClick={() => handleDeleteSkill(skill._id)}
                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Delete Skill
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostSkill;
