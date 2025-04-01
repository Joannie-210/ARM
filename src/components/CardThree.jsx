import { motion } from "framer-motion";
import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useResume } from "../components/ResumeContext";

const templates = [
  { id: 1, name: "Modern Template", component: "TemplateOne" },
  { id: 2, name: "Classic Template", component: "TemplateTwo" },
  { id: 3, name: "Creative Template", component: "TemplateThree" }
];

const CardThree = () => {
  const navigate = useNavigate();
  const { setTemplate } = useResume();

  const handleTemplateClick = (template) => {
    setTemplate(template.component); // Store template name in context
    localStorage.setItem("selectedTemplate", template.component); // Persist selection
    navigate("/form"); // Redirect to form page
  };

  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="w-150 h-auto bg-white text-purple-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex flex-col w-full h-20 justify-center items-start mt-1">
        <p className="text-gray-500 text-center m-auto text-black">Steps 3/3</p>
        <h1 className="m-auto text-black text-center text-3xl">Select a template to build your resume</h1>
      </div>
      <div className="flex justify-evenly">
        {templates.map((template) => (
          <Button key={template.id} variant="primary" text={template.name} onClick={() => handleTemplateClick(template)} />
        ))}
      </div>
    </motion.div>
  );
};

export default CardThree;
