import React, { useEffect, useState } from 'react';

function ViewRequest() {
  const [ownerId, setOwnerId] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch logged-in user details including their works
    const fetchOwnerInfoAndRequests = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('https://skill2earn-project.onrender.com/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch owner info');
        const data = await res.json();

        setOwnerId(data._id);

        if (!data.works || data.works.length === 0) {
          setRequests([]);
          setLoading(false);
          return;
        }

        // For each work, fetch pending requests
        const allRequests = await Promise.all(
          data.works.map(async (work) => {
            const resReqs = await fetch(`https://skill2earn-project.onrender.com/api/users/${data._id}/works/${work._id}/requests`);
            if (!resReqs.ok) return [];
            const reqs = await resReqs.json();
            // Attach work info to each request for display purposes
            return reqs.map(r => ({ ...r, work }));
          })
        );

        // Flatten list of requests for all works into a single array
        const flattenedRequests = allRequests.flat();
        setRequests(flattenedRequests);

      } catch (err) {
        setMessage(err.message);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerInfoAndRequests();
  }, []);

  // Approve or delete request handler
  const handleRequestAction = async (requesterId, workId, action) => {
    setMessage(null);
    try {
      const res = await fetch(`https://skill2earn-project.onrender.com/api/works/request/${action}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId, workId, requesterId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update request');
      setMessage(data.message);

      // Remove the updated request from local state to update UI instantly
      setRequests(prev => prev.filter(r => !(r.requester._id === requesterId && r.work._id === workId)));
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
      <h2>Pending Requests for All Your Works</h2>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Requester</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Email</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Work</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={`${req._id}-${req.work._id}`}>
                <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>{req.requester.username}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>{req.requester.email}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>
                  {req.work.category} - {req.work.subcategory}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '6px' }}>
                  <button
                    onClick={() => handleRequestAction(req.requester._id, req.work._id, 'accept')}
                    style={{ marginRight: 8 }}
                  >
                    Approve
                  </button>
                  <button onClick={() => handleRequestAction(req.requester._id, req.work._id, 'delete')}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewRequest;
