import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle, FileText, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from '@/config/axios';

export const ClaimsPanel = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/claims');
      console.log("Fetched Claims:", data);
      setClaims(data);
      setError(null);
    } catch {
      setError('Failed to fetch claims');
    } finally {
      setLoading(false);
    }
  };

  const updateClaimStatus = async (claimId, newStatus) => {
    try {
      await axios.patch(`claims/${claimId}`, { status: newStatus });
      fetchClaims();
    } catch {
      setError('Failed to update claim status');
    }
  };

  const filteredClaims = filterStatus === 'all' ? claims : claims.filter(claim => claim.Status === filterStatus);

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <Card className="m-4 dark">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Claims Management</CardTitle>
        <div className="flex items-center gap-2">
          <Filter size={20} />
          <select className="p-2 border rounded dark:bg-gray-800" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Claims</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
        {loading ? (
          <p>Loading claims...</p>
        ) : (
          <div className="space-y-4">
            {filteredClaims.map((claim) => (
              <Card key={claim.ClaimId} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText size={20} />
                      <h3 className="font-bold">Claim #{claim.ClaimId}</h3>
                    </div>

                    <p className="text-sm  mt-2"><span className="font-semibold text-white">Description:</span> {claim.Description}</p>
                    <p className="text-sm mt-2">
                      <span className="font-semibold">Filed by:</span> {claim.UserName}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Policy:</span> {claim.PolicyName}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Date:</span> {new Date(claim.CreatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      claim.Status === 'Approved' ? 'bg-green-100 text-green-800' :
                      claim.Status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {claim.Status}
                    </span>
                    {claim.Status === 'Pending' && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => updateClaimStatus(claim.ClaimId, 'Approved')}
                          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => updateClaimStatus(claim.ClaimId, 'Rejected')}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
