// pages/[slug].js
'use client';
import axios from '@/config/axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Card from '@/components/card';
import { ClipboardList } from 'lucide-react';

export default function Page({ params }) {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Slug, setSlug] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchParams = async () => {
            const unwrappedParams = await params;
            setSlug(unwrappedParams.slug);
        };

        fetchParams();
    }, [params]);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(`policy/getPolicies/${Slug}`);
                setPolicies(response.data);
            } catch (err) {
                if (err.status === 401) {
                    router.push("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        if (Slug) {
            fetchPolicies();
        }
    }, [Slug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-xl text-gray-100">Loading policies...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (!policies.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
                <h1 className="text-2xl font-bold mb-4 text-gray-100"> Category: {Slug}</h1>
                <div className="text-gray-400">No policies found in this category.</div>
            </div>
        );
    }

    return (
        <div className=" w-full h-screen px-4 py-8 bg-gray-900">
 <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
          <ClipboardList className="w-8 h-8 mr-2 text-blue-500" />
          Category: {Slug}
        </h1>            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {policies.map((policy) => (
                    <Card
                        key={policy.PolicyId}
                        policy={policy}
                        // Add any other props your Card component needs
                    />
                ))}
            </div>
        </div>
    );
}