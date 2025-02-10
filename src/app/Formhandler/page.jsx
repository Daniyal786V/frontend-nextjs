// import React, { useState } from 'react';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { Trash2, Plus } from 'lucide-react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// const QuestionManagementForm = ({ categoryId, onQuestionAdded }) => {
//   const [formData, setFormData] = useState({
//     categoryId: categoryId,
//     label: '',
//     type: 'text',
//     required: false,
//     placeholder: '',
//     helpText: '',
//     orderIndex: 0,
//     options: []
//   });

//   const questionTypes = [
//     { value: 'text', label: 'Text Input' },
//     { value: 'textarea', label: 'Text Area' },
//     { value: 'select', label: 'Select' },
//     { value: 'radio', label: 'Radio Group' },
//     { value: 'checkbox', label: 'Checkbox Group' }
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch('/api/questions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setFormData({
//           categoryId: categoryId,
//           label: '',
//           type: 'text',
//           required: false,
//           placeholder: '',
//           helpText: '',
//           orderIndex: 0,
//           options: []
//         });
//         if (onQuestionAdded) {
//           onQuestionAdded(result);
//         }
//       }
//     } catch (error) {
//       console.error('Error adding question:', error);
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <h2 className="text-2xl font-bold">Add New Question</h2>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="label">Question Label</Label>
//             <Input
//               id="label"
//               value={formData.label}
//               onChange={(e) => setFormData({ ...formData, label: e.target.value })}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="type">Question Type</Label>
//             <Select
//               value={formData.type}
//               onValueChange={(value) => setFormData({ ...formData, type: value })}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select question type" />
//               </SelectTrigger>
//               <SelectContent>
//                 {questionTypes.map((type) => (
//                   <SelectItem key={type.value} value={type.value}>
//                     {type.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex items-center space-x-2">
//             <Switch
//               id="required"
//               checked={formData.required}
//               onCheckedChange={(checked) =>
//                 setFormData({ ...formData, required: checked })
//               }
//             />
//             <Label htmlFor="required">Required</Label>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="placeholder">Placeholder</Label>
//             <Input
//               id="placeholder"
//               value={formData.placeholder}
//               onChange={(e) =>
//                 setFormData({ ...formData, placeholder: e.target.value })
//               }
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="helpText">Help Text</Label>
//             <Input
//               id="helpText"
//               value={formData.helpText}
//               onChange={(e) =>
//                 setFormData({ ...formData, helpText: e.target.value })
//               }
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="orderIndex">Order Index</Label>
//             <Input
//               id="orderIndex"
//               type="number"
//               value={formData.orderIndex}
//               onChange={(e) =>
//                 setFormData({ ...formData, orderIndex: parseInt(e.target.value) })
//               }
//             />
//           </div>

//           {['select', 'radio', 'checkbox'].includes(formData.type) && (
//             <div className="space-y-2">
//               <Label>Options</Label>
//               {formData.options.map((option, index) => (
//                 <div key={index} className="flex gap-2">
//                   <Input
//                     value={option}
//                     onChange={(e) => {
//                       const newOptions = [...formData.options];
//                       newOptions[index] = e.target.value;
//                       setFormData({ ...formData, options: newOptions });
//                     }}
//                   />
//                   <Button
//                     type="button"
//                     variant="destructive"
//                     size="icon"
//                     onClick={() => {
//                       const newOptions = formData.options.filter(
//                         (_, i) => i !== index
//                       );
//                       setFormData({ ...formData, options: newOptions });
//                     }}
//                   >
//                     <Trash2 size={16} />
//                   </Button>
//                 </div>
//               ))}
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     options: [...formData.options, ''],
//                   })
//                 }
//               >
//                 <Plus className="mr-2" size={16} />
//                 Add Option
//               </Button>
//             </div>
//           )}

//           <Button type="submit" className="w-full">
//             Add Question
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default QuestionManagementForm;
"use client"
import React, { useState, useEffect } from 'react';
import axios from '@/config/axios';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categoryMapping = {
  "General": 1,
  "Health": 2,
  "termLife": 3,
  "Health (Claim)": 7,
  "termLife (Claim)": 8,
  "General (Claim)": 9,
};

const QuestionManagementForm = () => {
  const [formData, setFormData] = useState({
    categoryName: '', // Store category name, not ID
    label: '',
    type: 'text',
    required: false,
    placeholder: '',
    helpText: '',
    orderIndex: 0,
    options: []
  });

  const questionTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Select' },
    { value: 'radio', label: 'Radio Group' },
    { value: 'checkbox', label: 'Checkbox Group' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure categoryName is selected
    if (!formData.categoryName) {
      alert('Please select a category');
      return;
    }

    // Map category name to hardcoded categoryId
    const categoryId = categoryMapping[formData.categoryName];

    const payload = {
      categoryId, // Send the mapped category ID
      label: formData.label,
      type: formData.type,
      required: formData.required,
      placeholder: formData.placeholder,
      helpText: formData.helpText,
      orderIndex: formData.orderIndex,
      options: formData.options
    };

    try {
      const response = await axios.post("/dynamic/", payload)
      console.log(response)

      if (response.status === 201) {
        alert('Question added successfully');
        
        const result = await response.json();
        setFormData({
          categoryName: '',
          label: '',
          type: 'text',
          required: false,
          placeholder: '',
          helpText: '',
          orderIndex: 0,
          options: []
        });
       
      }
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Add New Question</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.categoryName}
              onValueChange={(value) => setFormData({ ...formData, categoryName: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(categoryMapping).map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question Label */}
          <div className="space-y-2">
            <Label htmlFor="label">Question Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              required
            />
          </div>

          {/* Question Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Question Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Required Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="required"
              checked={formData.required}
              onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
            />
            <Label htmlFor="required">Required</Label>
          </div>

          {/* Placeholder & Help Text */}
          <div className="space-y-2">
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              value={formData.placeholder}
              onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="helpText">Help Text</Label>
            <Input
              id="helpText"
              value={formData.helpText}
              onChange={(e) => setFormData({ ...formData, helpText: e.target.value })}
            />
          </div>

          {/* Order Index */}
          <div className="space-y-2">
            <Label htmlFor="orderIndex">Order Index</Label>
            <Input
              id="orderIndex"
              type="number"
              value={formData.orderIndex}
              onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) })}
            />
          </div>

          {/* Options for Select/Radio/Checkbox */}
          {['select', 'radio', 'checkbox'].includes(formData.type) && (
            <div className="space-y-2">
              <Label>Options</Label>
              {formData.options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...formData.options];
                      newOptions[index] = e.target.value;
                      setFormData({ ...formData, options: newOptions });
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setFormData({ ...formData, options: formData.options.filter((_, i) => i !== index) });
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => setFormData({ ...formData, options: [...formData.options, ''] })}>
                <Plus className="mr-2" size={16} />
                Add Option
              </Button>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Add Question
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuestionManagementForm;
