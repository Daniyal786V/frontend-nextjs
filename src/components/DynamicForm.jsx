import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

const DynamicForm = ({ questions, onSubmit }) => {
  // console.log("questions from DynamicForm", questions)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  const validateField = (question, value) => {
    if (question.required && (!value || value.trim() === "")) {
      return `${question.label} is required`
    }

    switch (question.type) {
      case "text":
        if (question.label.toLowerCase().includes("email") && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            return "Please enter a valid email address"
          }
        }
        if (question.label.toLowerCase().includes("mobile") && value) {
          const phoneRegex = /^\d{10}$/
          if (!phoneRegex.test(value)) {
            return "Please enter a valid 10-digit mobile number"
          }
        }
        break
      case "number":
        if (value && isNaN(value)) {
          return "Please enter a valid number"
        }
        break
      default:
        break
    }
    return null
  }

  const handleChange = (questionId, value) => {
    const question = questions.find((q) => q.questionId === questionId)
    const error = validateField(question, value)

    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [questionId]: error,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}
    let hasErrors = false

    questions.forEach((question) => {
      const error = validateField(question, formData[question.questionId])
      if (error) {
        newErrors[question.questionId] = error
        hasErrors = true
      }
    })

    setErrors(newErrors)

    if (!hasErrors) {
        // Format the responses as an array of objects with questionId and answer
        const formattedResponses = questions.map(question => ({
          questionId: question.questionId,
          answer: (formData[question.questionId] || '').toString()
        }));
  
        try {
          await onSubmit(formattedResponses);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
    }
}

  const renderField = (question) => {
    const { questionId, type, label, placeholder, options } = question

    switch (type) {
      case "select":
        const parsedOptions = options ? JSON.parse(options) : []
        return (
          <Select value={formData[questionId] || ""} onValueChange={(value) => handleChange(questionId, value)}>
            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-gray-200">
              <SelectValue placeholder={placeholder || `Select ${label}`} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {parsedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-gray-200">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "number":
        return (
          <Input
            type="number"
            placeholder={placeholder}
            value={formData[questionId] || ""}
            onChange={(e) => handleChange(questionId, e.target.value)}
            className="w-full bg-gray-800 border-gray-700 text-gray-200"
          />
        )

      case "date":
        return (
          <Input
            type="date"
            value={formData[questionId] || ""}
            onChange={(e) => handleChange(questionId, e.target.value)}
            className="w-full bg-gray-800 border-gray-700 text-gray-200"
          />
        )

      default: // text
        return (
          <Input
            type="text"
            placeholder={placeholder}
            value={formData[questionId] || ""}
            onChange={(e) => handleChange(questionId, e.target.value)}
            className="w-full bg-gray-800 border-gray-700 text-gray-200"
          />
        )
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question) => (
            <motion.div
              key={question.questionId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <Label className="flex items-center gap-1 text-gray-300 mb-1">
                {question.label}
                {question.required && <span className="text-red-500">*</span>}
              </Label>
              {renderField(question)}
              {question.helpText && <p className="text-sm text-gray-500 mt-1">{question.helpText}</p>}
              {errors[question.questionId] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center text-red-500 text-sm mt-1"
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errors[question.questionId]}</span>
                </motion.div>
              )}
            </motion.div>
          ))}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
          >
            Submit Form
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default DynamicForm



// import React, { useState } from "react";

// const DynamicForm = ({ questions, onSubmit }) => {
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});

//   // Validation function
//   const validateField = (question, value) => {
//     if (question.required && (!value || value.trim() === "")) {
//       return `${question.label} is required`;
//     }

//     if (question.type === "text" && question.label.toLowerCase().includes("email") && value) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(value)) {
//         return "Please enter a valid email address";
//       }
//     }

//     if (question.type === "text" && question.label.toLowerCase().includes("mobile") && value) {
//       const phoneRegex = /^\d{10}$/;
//       if (!phoneRegex.test(value)) {
//         return "Please enter a valid 10-digit mobile number";
//       }
//     }

//     if (question.type === "number" && value && isNaN(value)) {
//       return "Please enter a valid number";
//     }

//     return null;
//   };

//   const handleInputChange = (questionId, value) => {
//     const question = questions.find((q) => q.questionId === questionId);
//     const error = validateField(question, value);

//     setFormData((prevData) => ({
//       ...prevData,
//       [questionId]: value,
//     }));

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [questionId]: error,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     let hasErrors = false;

//     questions.forEach((question) => {
//       const error = validateField(question, formData[question.questionId]);
//       if (error) {
//         newErrors[question.questionId] = error;
//         hasErrors = true;
//       }
//     });

//     setErrors(newErrors);

//     if (!hasErrors) {
//              // Format the data for submission
//              const formattedResponses = Object.entries(formData).map(([questionId, answer]) => ({
//                questionId: parseInt(questionId),
//                answer: answer?.toString() || ''
//              }))
//              await onSubmit(formattedResponses);
//            }
//          };
  

//   const renderField = (question) => {
//     if (question.type === "select") {
//       let optionsArray = [];
      
//       // Handle options parsing safely
//       if (question.options) {
//         try {
//           // If options is a string, try to parse it
//           if (typeof question.options === 'string') {
//             optionsArray = JSON.parse(question.options);
//           } 
//           // If options is already an array, use it directly
//           else if (Array.isArray(question.options)) {
//             optionsArray = question.options;
//           }
//         } catch (e) {
//           console.error('Error parsing options:', e);
//           optionsArray = [];
//         }
//       }

//       return (
//         <select
//           id={question.questionId}
//           value={formData[question.questionId] || ""}
//           onChange={(e) => handleInputChange(question.questionId, e.target.value)}
//           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-700 text-white"
//         >
//           <option value="">{question.placeholder || "Select an option"}</option>
//           {optionsArray.map((option) => (
//             <option 
//               key={option.value || option} 
//               value={option.value || option}
//             >
//               {option.label || option}
//             </option>
//           ))}
//         </select>
//       );
//     }

//     return (
//       <input
//         type={question.type}
//         id={question.questionId}
//         value={formData[question.questionId] || ""}
//         onChange={(e) => handleInputChange(question.questionId, e.target.value)}
//         placeholder={question.placeholder}
//         className="mt-1 block w-full shadow-sm sm:text-sm rounded-md bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
//       />
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {questions.map((question) => (
//         <div key={question.questionId} className="space-y-2">
//           <label
//             htmlFor={question.questionId}
//             className="block text-sm font-medium text-gray-300"
//           >
//             {question.label}
//             {question.required && <span className="text-red-500">*</span>}
//           </label>
//           {renderField(question)}
//           {question.helpText && (
//             <p className="text-sm text-gray-400">{question.helpText}</p>
//           )}
//           {errors[question.questionId] && (
//             <p className="text-red-500 text-sm">{errors[question.questionId]}</p>
//           )}
//         </div>
//       ))}
//       <div>
//         <button
//           type="submit"
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Submit Form
//         </button>
//       </div>
//     </form>
//   );
// };

// export default DynamicForm;