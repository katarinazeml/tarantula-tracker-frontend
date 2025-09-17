import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  getFriends,
  getPendingFriendRequests,
  getSentFriendRequests,
  respondToFriendRequest,
  removeFriend,
  getFriendshipStatistics
} from "../api/api";
import Header from "../components/Header";

interface Friend {
  userId: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  friendsSince: string;
  totalTarantulas: number;
}

interface FriendRequest {
  id: number;
  requesterId: number;
  requesterUsername: string;
  requesterFirstName?: string;
  requesterLastName?: string;
  addresseeId: number;
  addresseeUsername: string;
  addresseeFirstName?: string;
  addresseeLastName?: string;
  status: string;
  requestedAt: string;
  respondedAt?: string;
}

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [respondingTo, setRespondingTo] = useState<number | null>(null);
  const [removingFriend, setRemovingFriend] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'friends' | 'pending' | 'sent'>('friends');
  const [currentUserId] = useState<number>(1); // TODO: Replace with actual logged-in user ID

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [friendsRes, pendingRes, sentRes, statsRes] = await Promise.all([
        getFriends(currentUserId),
        getPendingFriendRequests(currentUserId),
        getSentFriendRequests(currentUserId),
        getFriendshipStatistics(currentUserId)
      ]);

      setFriends(friendsRes.data);
      setPendingRequests(pendingRes.data);
      setSentRequests(sentRes.data);
      setStatistics(statsRes.data);
      setError("");
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError("Failed to load friends data. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRespondToRequest = async (friendshipId: number, response: 'ACCEPTED' | 'DECLINED') => {
    setRespondingTo(friendshipId);
    setError("");

    try {
      await respondToFriendRequest(currentUserId, friendshipId, { response });
      await fetchData();
    } catch (err: any) {
      console.error("Respond error:", err);
      setError(`Failed to ${response.toLowerCase()} friend request. Please try again.`);
    } finally {
      setRespondingTo(null);
    }
  };

  const handleRemoveFriend = async (friendId: number, friendUsername: string) => {
    if (!window.confirm(`Are you sure you want to remove ${friendUsername} from your friends?`)) {
      return;
    }

    setRemovingFriend(friendId);
    setError("");

    try {
      await removeFriend(currentUserId, friendId);
      await fetchData();
    } catch (err: any) {
      console.error("Remove friend error:", err);
      setError("Failed to remove friend. Please try again.");
    } finally {
      setRemovingFriend(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="container">
        <Header />
        <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
          <p>Loading friends...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />

      <div style={{ marginBottom: '24px', marginTop: '60px' }}>
      <Link to="/" style={{ color: '#a855f7', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>My Friends</h1>
        <Link
          to="/users"
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
            border: '1px solid rgba(168, 85, 247, 0.5)'
          }}
        >
          + Find Friends
        </Link>
      </div>

      {/* Statistics */}
      {statistics && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
          padding: '20px',
          background: 'linear-gradient(145deg, rgba(15, 15, 30, 0.8), rgba(26, 26, 46, 0.8))',
          borderRadius: '12px',
          border: '1px solid rgba(168, 85, 247, 0.3)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a855f7' }}>
              {statistics.totalFriends}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Friends</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
              {statistics.pendingRequests}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Pending</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
              {statistics.sentRequests}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Sent</div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        borderBottom: '1px solid rgba(168, 85, 247, 0.3)'
      }}>
        {[
          { key: 'friends', label: `Friends (${friends.length})` },
          { key: 'pending', label: `Pending (${pendingRequests.length})` },
          { key: 'sent', label: `Sent (${sentRequests.length})` }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: '12px 20px',
              background: activeTab === tab.key
                ? 'linear-gradient(145deg, #7c3aed, #a855f7)'
                : 'transparent',
              color: activeTab === tab.key ? '#ffffff' : '#a855f7',
              border: activeTab === tab.key
                ? '1px solid rgba(168, 85, 247, 0.5)'
                : '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

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

      {/* Tab Content */}
      {activeTab === 'friends' && (
        <div>
          {friends.length > 0 ? (
            <ul className="user-list">
              {friends.map((friend) => (
                <li key={friend.userId}>
                  <div>
                    <strong>{friend.username}</strong>
                    {friend.firstName && friend.lastName && (
                      <span style={{ color: '#c084fc' }}> ({friend.firstName} {friend.lastName})</span>
                    )}
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      Friends since: {formatDate(friend.friendsSince)} •
                      {friend.totalTarantulas} tarantulas
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFriend(friend.userId, friend.username)}
                    disabled={removingFriend === friend.userId}
                    style={{
                      opacity: removingFriend === friend.userId ? 0.6 : 1,
                      cursor: removingFriend === friend.userId ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {removingFriend === friend.userId ? 'Removing...' : 'Remove'}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '48px',
              color: '#6b7280'
            }}>
              <p>No friends yet. Start by sending some friend requests!</p>
              <Link to="/users" style={{ color: '#a855f7' }}>Find Users</Link>
            </div>
          )}
        </div>
      )}

      {activeTab === 'pending' && (
        <div>
          {pendingRequests.length > 0 ? (
            <ul className="user-list">
              {pendingRequests.map((request) => (
                <li key={request.id}>
                  <div>
                    <strong>{request.requesterUsername}</strong> wants to be friends
                    {request.requesterFirstName && request.requesterLastName && (
                      <span style={{ color: '#c084fc' }}> ({request.requesterFirstName} {request.requesterLastName})</span>
                    )}
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      Requested: {formatDate(request.requestedAt)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleRespondToRequest(request.id, 'ACCEPTED')}
                      disabled={respondingTo === request.id}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        background: 'linear-gradient(145deg, #059669, #10b981)',
                        color: '#ffffff',
                        border: '1px solid rgba(5, 150, 105, 0.5)',
                        borderRadius: '6px',
                        cursor: respondingTo === request.id ? 'not-allowed' : 'pointer',
                        opacity: respondingTo === request.id ? 0.6 : 1
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRespondToRequest(request.id, 'DECLINED')}
                      disabled={respondingTo === request.id}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        background: 'linear-gradient(145deg, #dc2626, #ef4444)',
                        color: '#ffffff',
                        border: '1px solid rgba(220, 38, 38, 0.5)',
                        borderRadius: '6px',
                        cursor: respondingTo === request.id ? 'not-allowed' : 'pointer',
                        opacity: respondingTo === request.id ? 0.6 : 1
                      }}
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
              <p>No pending friend requests.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'sent' && (
        <div>
          {sentRequests.length > 0 ? (
            <ul className="user-list">
              {sentRequests.map((request) => (
                <li key={request.id}>
                  <div>
                    <strong>{request.addresseeUsername}</strong>
                    {request.addresseeFirstName && request.addresseeLastName && (
                      <span style={{ color: '#c084fc' }}> ({request.addresseeFirstName} {request.addresseeLastName})</span>
                    )}
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                      Sent: {formatDate(request.requestedAt)}
                    </div>
                  </div>
                  <div style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    color: '#f59e0b',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '6px',
                    background: 'rgba(245, 158, 11, 0.1)'
                  }}>
                    Pending
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
              <p>No sent friend requests.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;