import React, { useState } from "react";

interface Props {
  onSubmit: (data: any) => Promise<void> | void;
}

const TarantulaForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    userId: "",
    name: "",
    species: "",
    commonName: "",
    sex: "",
    acquisitionDate: "",
    acquisitionSource: "",
    birthDate: "",
    legSpan: "",
    weight: "",
    enclosureType: "",
    enclosureSize: "",
    substrateType: "",
    substrateDepth: "",
    temperatureRange: "",
    humidityRange: "",
    notes: "",
    photoUrl: ""
  });

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Properly format data for backend
      const formData = {
        userId: form.userId ? Number(form.userId) : null,
        name: form.name.trim(),
        species: form.species.trim(),
        commonName: form.commonName.trim() || null,
        sex: form.sex || null,
        // Convert date strings to proper format or null
        acquisitionDate: form.acquisitionDate || null,
        acquisitionSource: form.acquisitionSource.trim() || null,
        birthDate: form.birthDate || null,
        // Convert to numbers or null
        legSpan: form.legSpan ? parseFloat(form.legSpan) : null,
        weight: form.weight ? parseFloat(form.weight) : null,
        enclosureType: form.enclosureType || null,
        enclosureSize: form.enclosureSize.trim() || null,
        substrateType: form.substrateType.trim() || null,
        substrateDepth: form.substrateDepth ? parseFloat(form.substrateDepth) : null,
        temperatureRange: form.temperatureRange.trim() || null,
        humidityRange: form.humidityRange.trim() || null,
        notes: form.notes.trim() || null,
        photoUrl: form.photoUrl.trim() || null
      };

      await onSubmit(formData);

      // Reset form only if successful
      setForm({
        userId: "",
        name: "",
        species: "",
        commonName: "",
        sex: "",
        acquisitionDate: "",
        acquisitionSource: "",
        birthDate: "",
        legSpan: "",
        weight: "",
        enclosureType: "",
        enclosureSize: "",
        substrateType: "",
        substrateDepth: "",
        temperatureRange: "",
        humidityRange: "",
        notes: "",
        photoUrl: ""
      });
    } catch (err: any) {
      console.error("Form submission error:", err);
      // Handle different types of errors
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to create tarantula. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Tarantula</h2>

      {error && (
        <div style={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          color: '#dc2626',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-content">
        {/* Basic Information */}
        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">User ID *</label>
              <input
                type="number"
                name="userId"
                value={form.userId}
                onChange={handleChange}
                placeholder="Enter User ID"
                required
                disabled={isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tarantula name"
                required
                disabled={isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Species *</label>
              <input
                type="text"
                name="species"
                value={form.species}
                onChange={handleChange}
                placeholder="e.g., Brachypelma hamorii"
                required
                disabled={isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Common Name</label>
              <input
                type="text"
                name="commonName"
                value={form.commonName}
                onChange={handleChange}
                placeholder="e.g., Mexican Redknee"
                disabled={isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Sex</label>
              <select
                name="sex"
                value={form.sex}
                onChange={handleChange}
                disabled={isLoading}
                className="form-select"
              >
                <option value="">Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Photo URL</label>
              <input
                type="url"
                name="photoUrl"
                value={form.photoUrl}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                disabled={isLoading}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="form-section-divider">
          <h3 className="section-title">Important Dates</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                disabled={isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Acquisition Date</label>
              <input
                type="date"
                name="acquisitionDate"
                value={form.acquisitionDate}
                onChange={handleChange}
                disabled={isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Acquisition Source</label>
              <input
                type="text"
                name="acquisitionSource"
                value={form.acquisitionSource}
                onChange={handleChange}
                placeholder="e.g., Pet store, breeder, online"
                disabled={isLoading}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Physical Measurements */}
        <div className="form-section-divider">
          <h3 className="section-title">Physical Measurements</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Leg Span (cm)</label>
              <input
                type="number"
                step="0.1"
                name="legSpan"
                value={form.legSpan}
                onChange={handleChange}
                placeholder="e.g., 12.5"
                disabled={isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Weight (g)</label>
              <input
                type="number"
                step="0.1"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder="e.g., 45.2"
                disabled={isLoading}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Enclosure Setup */}
        <div className="form-section-divider">
          <h3 className="section-title">Enclosure Setup</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Enclosure Type</label>
              <select
                name="enclosureType"
                value={form.enclosureType}
                onChange={handleChange}
                disabled={isLoading}
                className="form-select"
              >
                <option value="">Select enclosure type</option>
                <option value="Glass Terrarium">Glass Terrarium</option>
                <option value="Plastic Container">Plastic Container</option>
                <option value="Acrylic Enclosure">Acrylic Enclosure</option>
                <option value="Custom Built">Custom Built</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Enclosure Size</label>
              <input
                type="text"
                name="enclosureSize"
                value={form.enclosureSize}
                onChange={handleChange}
                placeholder="e.g., 40x30x30cm"
                disabled={isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Substrate Type</label>
              <input
                type="text"
                name="substrateType"
                value={form.substrateType}
                onChange={handleChange}
                placeholder="e.g., Coco fiber, peat moss"
                disabled={isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Substrate Depth (cm)</label>
              <input
                type="number"
                step="0.1"
                name="substrateDepth"
                value={form.substrateDepth}
                onChange={handleChange}
                placeholder="e.g., 5.0"
                disabled={isLoading}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Environmental Conditions */}
        <div className="form-section-divider">
          <h3 className="section-title">Environmental Conditions</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Temperature Range</label>
              <input
                type="text"
                name="temperatureRange"
                value={form.temperatureRange}
                onChange={handleChange}
                placeholder="e.g., 22-26°C"
                disabled={isLoading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Humidity Range</label>
              <input
                type="text"
                name="humidityRange"
                value={form.humidityRange}
                onChange={handleChange}
                placeholder="e.g., 60-70%"
                disabled={isLoading}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="form-section-divider">
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Additional notes about this tarantula..."
              rows={4}
              disabled={isLoading}
              className="form-textarea"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Creating Tarantula...' : 'Create Tarantula'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TarantulaForm;
