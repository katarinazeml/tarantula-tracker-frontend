import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTarantulaById, deleteTarantula } from "../api/api";
import Header from "../components/Header";

interface TarantulaDetail {
  id: number;
  userId: number;
  name: string;
  species: string;
  commonName?: string;
  sex?: string;
  acquisitionDate?: string;
  acquisitionSource?: string;
  birthDate?: string;
  legSpan?: number;
  weight?: number;
  enclosureType?: string;
  enclosureSize?: string;
  substrateType?: string;
  substrateDepth?: number;
  temperatureRange?: string;
  humidityRange?: string;
  notes?: string;
  photoUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  totalMolts?: number;
  lastFeedingDate?: string;
  lastMoltDate?: string;
}

const TarantulaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tarantula, setTarantula] = useState<TarantulaDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTarantula = async () => {
      if (!id) {
        setError("No tarantula ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await getTarantulaById(Number(id));
        setTarantula(response.data);
        setError("");
      } catch (err: any) {
        console.error("Fetch error:", err);
        if (err.response?.status === 404) {
          setError("Tarantula not found");
        } else {
          setError("Failed to load tarantula details");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTarantula();
  }, [id]);

  const handleDelete = async () => {
    if (!tarantula) return;

    if (!window.confirm(`Are you sure you want to delete "${tarantula.name}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTarantula(tarantula.id);
      navigate('/tarantulas');
    } catch (err: any) {
      console.error("Delete error:", err);
      setError("Failed to delete tarantula");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString();
  };

  const calculateAge = (birthDate?: string) => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const now = new Date();
    const ageInMs = now.getTime() - birth.getTime();
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears.toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="container">
        <Header />
        <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
          <p>Loading tarantula details...</p>
        </div>
      </div>
    );
  }

  if (error || !tarantula) {
    return (
      <div className="container">
        <Header />
        <div style={{ marginBottom: '24px' }}>
          <Link to="/tarantulas" style={{ color: '#a855f7', textDecoration: 'none' }}>
            ← Back to My Tarantulas
          </Link>
        </div>
        <div style={{
          padding: '24px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          textAlign: 'center'
        }}>
          {error || "Tarantula not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />

      <div style={{ marginBottom: '24px' }}>
        <Link to="/tarantulas" style={{ color: '#a855f7', textDecoration: 'none' }}>
          ← Back to My Tarantulas
        </Link>
      </div>

      <div style={{
        background: 'linear-gradient(145deg, rgba(15, 15, 30, 0.9), rgba(26, 26, 46, 0.9))',
        borderRadius: '16px',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Header Section */}
        <div style={{
          padding: '32px',
          borderBottom: '1px solid rgba(168, 85, 247, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '24px',
            marginBottom: '24px'
          }}>
            {tarantula.photoUrl && (
              <img
                src={tarantula.photoUrl}
                alt={tarantula.name}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '3px solid rgba(168, 85, 247, 0.4)'
                }}
              />
            )}

            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#e5e7eb',
                marginBottom: '8px'
              }}>
                {tarantula.name}
              </h1>

              <div style={{
                fontSize: '20px',
                color: '#c084fc',
                fontStyle: 'italic',
                marginBottom: '12px'
              }}>
                {tarantula.species}
                {tarantula.commonName && (
                  <span style={{ color: '#9ca3af', fontWeight: 'normal' }}>
                    {" "}({tarantula.commonName})
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {tarantula.sex && (
                  <div style={{ color: '#d1d5db' }}>
                    <strong>Sex:</strong> {tarantula.sex}
                  </div>
                )}
                {tarantula.birthDate && (
                  <div style={{ color: '#d1d5db' }}>
                    <strong>Age:</strong> {calculateAge(tarantula.birthDate)} years
                  </div>
                )}
                {tarantula.legSpan && (
                  <div style={{ color: '#d1d5db' }}>
                    <strong>Leg Span:</strong> {tarantula.legSpan}cm
                  </div>
                )}
                {tarantula.weight && (
                  <div style={{ color: '#d1d5db' }}>
                    <strong>Weight:</strong> {tarantula.weight}g
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                opacity: isDeleting ? 0.6 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete Tarantula'}
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ padding: '32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Basic Information */}
            <div style={{
              backgroundColor: 'rgba(15, 15, 30, 0.6)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <h3 style={{
                color: '#c084fc',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Basic Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ color: '#d1d5db' }}>
                  <strong>Owner ID:</strong> {tarantula.userId}
                </div>
                <div style={{ color: '#d1d5db' }}>
                  <strong>Birth Date:</strong> {formatDate(tarantula.birthDate)}
                </div>
                <div style={{ color: '#d1d5db' }}>
                  <strong>Acquired:</strong> {formatDate(tarantula.acquisitionDate)}
                </div>
                {tarantula.acquisitionSource && (
                  <div style={{ color: '#d1d5db' }}>
                    <strong>Source:</strong> {tarantula.acquisitionSource}
                  </div>
                )}
              </div>
            </div>

            {/* Enclosure Setup */}
            {(tarantula.enclosureType || tarantula.enclosureSize || tarantula.substrateType) && (
              <div style={{
                backgroundColor: 'rgba(15, 15, 30, 0.6)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <h3 style={{
                  color: '#c084fc',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  Enclosure Setup
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tarantula.enclosureType && (
                    <div style={{ color: '#d1d5db' }}>
                      <strong>Type:</strong> {tarantula.enclosureType}
                    </div>
                  )}
                  {tarantula.enclosureSize && (
                    <div style={{ color: '#d1d5db' }}>
                      <strong>Size:</strong> {tarantula.enclosureSize}
                    </div>
                  )}
                  {tarantula.substrateType && (
                    <div style={{ color: '#d1d5db' }}>
                      <strong>Substrate:</strong> {tarantula.substrateType}
                    </div>
                  )}
                  {tarantula.substrateDepth && (
                    <div style={{ color: '#d1d5db' }}>
                      <strong>Depth:</strong> {tarantula.substrateDepth}cm
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Environmental Conditions */}
            {(tarantula.temperatureRange || tarantula.humidityRange) && (
              <div style={{
                backgroundColor: 'rgba(15, 15, 30, 0.6)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <h3 style={{
                  color: '#c084fc',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  Environmental Conditions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tarantula.temperatureRange && (
                    <div style={{ color: '#d1d5db' }}>
                      <strong>Temperature:</strong> {tarantula.temperatureRange}
                    </div>
                  )}
                  {tarantula.humidityRange && (
                    <div style={{ color: '#d1d5db' }}>
                      <strong>Humidity:</strong> {tarantula.humidityRange}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Care History */}
            {(tarantula.totalMolts || tarantula.lastFeedingDate || tarantula.lastMoltDate) && (
              <div style={{
                backgroundColor: 'rgba(15, 15, 30, 0.6)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <h3 style={{
                  color: '#c084fc',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  Care History
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tarantula.totalMolts !== undefined && (
                    <div style={{ color: '#d1d5db' }}>
                      <strong>Total Molts:</strong> {tarantula.totalMolts}
                    </div>
                  )}
                  {tarantula.lastFeedingDate && (
                    <div style={{ color: '#d1d5db' }}>
                      <strong>Last Fed:</strong> {formatDate(tarantula.lastFeedingDate)}
                    </div>
                  )}
                  {tarantula.lastMoltDate && (
                    <div style={{ color: '#d1d5db' }}>
                      <strong>Last Molt:</strong> {formatDate(tarantula.lastMoltDate)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Notes Section */}
          {tarantula.notes && (
            <div style={{
              marginTop: '24px',
              backgroundColor: 'rgba(15, 15, 30, 0.6)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <h3 style={{
                color: '#c084fc',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Notes
              </h3>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap'
              }}>
                {tarantula.notes}
              </p>
            </div>
          )}

          {/* Metadata */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: 'rgba(75, 85, 99, 0.1)',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#9ca3af'
          }}>
            <div>Created: {formatDate(tarantula.createdAt)}</div>
            <div>Last Updated: {formatDate(tarantula.updatedAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarantulaDetailPage;
