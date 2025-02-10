"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PolicyWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverageType: '',
    startDate: '',
  });
  const [errors, setErrors] = useState({});

  const coverageOptions = [
    { id: 1, type: "Basic", coverage: 50000, price: 30 },
    { id: 2, type: "Standard", coverage: 100000, price: 50 },
    { id: 3, type: "Premium", coverage: 200000, price: 100 }
  ];

  const formFields = {
    personal: ["firstName", "lastName", "email", "phone"],
    coverage: ["coverageType", "startDate"]
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    } else if (step === 1) {
      if (!formData.coverageType) newErrors.coverageType = 'Coverage type is required';
      if (!formData.startDate) newErrors.startDate = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Form submitted:', formData);
      // Handle form submission here
    }
  };

  const renderPersonalInfo = () => (
    <div className='w-full h-screen'>
        <div className="space-y-4 w-full  ">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
    </div>
    </div>
    
  );

  const renderCoverageSelection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Coverage Type</label>
        <div className="grid grid-cols-3 gap-4">
          {coverageOptions.map(option => (
            <div
              key={option.id}
              className={`p-4 border rounded cursor-pointer transition-colors ${
                formData.coverageType === option.type
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
              onClick={() => handleInputChange({
                target: { name: 'coverageType', value: option.type }
              })}
            >
              <h3 className="font-medium">{option.type}</h3>
              <p className="text-sm text-gray-600">Coverage: ${option.coverage.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Price: ${option.price}/month</p>
            </div>
          ))}
        </div>
        {errors.coverageType && <p className="text-red-500 text-sm mt-1">{errors.coverageType}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className={`w-full p-2 border rounded ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
      </div>
    </div>
  );

  const renderSummary = () => {
    const selectedCoverage = coverageOptions.find(opt => opt.type === formData.coverageType);
    
    return (
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-medium mb-2">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact</p>
              <p className="font-medium">{formData.email}</p>
              <p className="font-medium">{formData.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-medium mb-2">Coverage Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Selected Plan</p>
              <p className="font-medium">{formData.coverageType}</p>
              {selectedCoverage && (
                <>
                  <p className="text-sm text-gray-600 mt-2">Coverage Amount</p>
                  <p className="font-medium">${selectedCoverage.coverage.toLocaleString()}</p>
                </>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600">Start Date</p>
              <p className="font-medium">{formData.startDate}</p>
              {selectedCoverage && (
                <>
                  <p className="text-sm text-gray-600 mt-2">Monthly Premium</p>
                  <p className="font-medium">${selectedCoverage.price}/month</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const steps = [
    { title: "Personal Information", content: renderPersonalInfo },
    { title: "Coverage Selection", content: renderCoverageSelection },
    { title: "Review & Submit", content: renderSummary }
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Insurance Policy</CardTitle>
        <div className="flex justify-between items-center mt-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="w-24 h-1 mx-4 bg-gray-200">
                  <div
                    className={`h-full ${
                      index < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="mt-6">
          {steps[currentStep].content()}
          
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center px-4 py-2 rounded ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Submit Policy
                <Check className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PolicyWizard;