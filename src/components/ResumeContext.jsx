import React, { useState, useContext, createContext } from 'react';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {  
  const [template, setTemplate] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    address: "",
    profile: [],
    experiences: [
      {
        companyName: "",
        startDate: "",
        endDate: "",
        roles: "",
      }
    ],
    summary: "",
    certifications: [
      {
        name: "",
        startYear: "",
        endYear: "",
        issuer: "",
      }
    ],
    skills: [""],
  });
  



  return (
    <ResumeContext.Provider value={{ formData, setFormData, template, setTemplate }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
