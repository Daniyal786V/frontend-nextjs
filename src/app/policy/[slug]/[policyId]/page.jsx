'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/config/axios';
import Link from 'next/link';

export default function PolicyDetailsPage() {
    const params = useParams();
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicyDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/policy/getPolicyById/${params.policyId}`);
                console.log(response.data)
                setPolicy(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

            fetchPolicyDetails();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="text-xl text-gray-100">Loading policy details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }
    const category = `${params.slug}`.toUpperCase();
    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">{policy?.PolicyName}</h1>
                    <div className="flex items-center space-x-4 text-gray-300">
                        <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm">
                            {category}
                        </span>
                        <span className="text-sm">Policy ID: {policy?.PolicyId}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-white">Coverage Details</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-400">Coverage Amount</p>
                                <p className="text-lg font-medium text-white">
                                    {policy?.Coverage}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400">Premium</p>
                                <p className="text-lg font-medium text-white">
                                    ${policy?.Premium}/month
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-white">Policy Details</h2>
                        <div className="prose prose-invert">
                        <p className="text-gray-400">Description</p>

                            <p className="text-white">{policy?.Description}</p>
                        </div>
                        <p className="text-gray-400">Duration</p>
                                <p className="text-lg font-medium text-white">
                                    {policy?.Duration} Years
                                </p>
                    </div>
                    
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-center">
                    <Link href={`/buyPolicy/${policy.PolicyId}`}>
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                                     transition-colors duration-200 font-medium">
                        Buy This Policy
                    </button>
                    </Link>
                   
                </div>
            </div>
        </div>
    );
}