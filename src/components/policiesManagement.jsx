import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from '@/config/axios';

export const PoliciesPanel = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    PolicyName: '',
    Description: '',
    Category: 'General',
    Premium: 100000,
    Duration: 1,
    Coverage: 'Default coverage'
  });

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/policy/getPolicies');
      console.log("Fetched Policies:", data);
      setPolicies(data);
      setError(null);
    } catch {
      setError('Failed to fetch policies');
    } finally {
      setLoading(false);
    }
  };

  const createPolicy = async () => {
    try {
      await axios.post('policy/addPolicy', newPolicy);
      setShowAddDialog(false);
      fetchPolicies();
      setNewPolicy({
        PolicyName: '',
        Description: '',
        Category: 'General',
        Premium: 100000,
        Duration: 1,
        Coverage: 'Default coverage'
      });
    } catch {
      setError('Failed to create policy');
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <Card className="m-4 dark">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Policy Management</CardTitle>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Plus size={20} /> Add Policy
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Policy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Policy Name"
                className="w-full p-2 border rounded  dark:bg-gray-800"
                value={newPolicy.PolicyName}
                onChange={(e) => setNewPolicy({ ...newPolicy, PolicyName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Policy Premium"
                className="w-full p-2 border rounded  dark:bg-gray-800"
                value={newPolicy.Premium}
                onChange={(e) => setNewPolicy({ ...newPolicy, Premium: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded dark:bg-gray-800"
                value={newPolicy.Description}
                onChange={(e) => setNewPolicy({ ...newPolicy, Description: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded dark:bg-gray-800"
                value={newPolicy.Category}
                onChange={(e) => setNewPolicy({ ...newPolicy, Category: e.target.value })}
              >
                <option value="General">General</option>
                <option value="Health">Health</option>
                <option value="termLife">Term Life</option>
                <option value="investmentPlans">Investment Plans</option>
                <option value="carInsurance">Car Insurance</option>
                <option value="twoWheeler">Two Wheeler</option>
                <option value="familyHealth">Family Health</option>
                <option value="travelInsurance">Travel Insurance</option>
                <option value="homeInsurance">Home Insurance</option>
                <option value="healthInsurance">Health Insurance</option>
              </select>
              <button onClick={createPolicy} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Create Policy
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
        {loading ? (
          <p>Loading policies...</p>
        ) : (
          <div className="grid gap-4">
            {policies.map((policy) => (
              <Card key={policy.PolicyId} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{policy.PolicyName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{policy.Description || 'No description available'}</p>
                    <div className="mt-2 flex gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{policy.Category}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{policy.Coverage}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><Edit2 size={16} /></button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><Trash2 size={16} /></button>
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
