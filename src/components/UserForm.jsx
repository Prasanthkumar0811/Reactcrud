import { useEffect, useState } from "react";

const emptyForm = { name: "", email: "", age: "", phone: "", city: "" };

function UserForm({ onSave, editUser, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // When Edit is clicked, fill the form and clear old errors
  useEffect(() => {
    setForm(editUser ? editUser : emptyForm);
    setErrors({});
  }, [editUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Remove this field's error as soon as the user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  // Check every field, set errors, return true if valid
  function validate() {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";

    if (!form.age) newErrors.age = "Age is required";
    else if (form.age < 1 || form.age > 120) newErrors.age = "Enter a valid age";

    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be 10 digits";

    if (!form.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    onSave(form);
    setForm(emptyForm);
  }

  function handleCancel() {
    setErrors({});
    onCancel();
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? "input-error" : ""}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="field">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="field">
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className={errors.age ? "input-error" : ""}
        />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>

      <div className="field">
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className={errors.phone ? "input-error" : ""}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="field">
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className={errors.city ? "input-error" : ""}
        />
        {errors.city && <span className="error">{errors.city}</span>}
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn add">
          {editUser ? "Update" : "Add"}
        </button>
        {editUser && (
          <button type="button" className="btn cancel" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
