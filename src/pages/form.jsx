import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResume } from "../components/ResumeContext";
import TemplateOne from "../components/TemplateOne";
import TemplateTwo from "../components/TemplateTwo";
import Button from "../components/Button";


const StepOneSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().matches(/^\d{10,}$/, "Phone number must be at least 10 digits"),
  linkedin: yup.string().url("Invalid LinkedIn URL"),
  summary: yup.string().required("Please fill in your summary"),
});

const StepTwoSchema = yup.object().shape({
  experiences: yup.array().of(
    yup.object().shape({
      companyName: yup.string().required("Must include your company name"),
      startDate: yup.date().required("Start date is required"),
      endDate: yup.date()
        .required("End date is required")
        .min(yup.ref("startDate"), "End date must be after start date"),
      roles: yup.string().required("Please fill in your roles"),
    })
  ),
});

const StepThreeSchema = yup.object().shape({
  skills: yup.array().of(yup.string().required("Skill is required")),
});

const StepFourSchema = yup.object().shape({
  certifications: yup.array().of(yup.object().shape({
    name: yup.string().required("Certification name is required"),
    startYear: yup.date().required("Start date is required"),
      endYear: yup.date()
        .required("End date is required"),
    issuer: yup.string().required("Issuer is required"),
  })),
});
const Form = () => {
  const { template, setTemplate, setFormData } = useResume();
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const validateSchema = step === 1 ? StepOneSchema : step === 2 ? StepTwoSchema : step === 3 ? StepThreeSchema : StepFourSchema;
  const { register, handleSubmit, control, watch, formState: { errors }, setValue, getValues } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      experiences: [{ companyName: "", startDate: "", endDate: "", roles: "" }],
      certifications: [{ name: "", date: "", issuer: "" }],
      skills: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills",
  });

  const {fields: certFields, append: appendCert, remove: removeCert} = useFieldArray({
    control,
    name: "certifications",
  });

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (input) {
      const filteredSkills = skills.filter(skill => skill.toLowerCase().includes(input.toLowerCase()));
      setSuggestions(filteredSkills);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleSuggestionClick = (skill) => {
    const currentSkills = getValues("skills");
    const skillIndex = currentSkills.findIndex((s) => s === "");
  
    if (skillIndex >= 0) {
      setValue(`skills.${skillIndex}`, skill);  
    }
  
    setSuggestions([]);  
  };
  

  useEffect(() => {
    const storedTemplate = localStorage.getItem("selectedTemplate");
    if (storedTemplate) {
      setTemplate(storedTemplate);
    }
  }, [setTemplate]);

  const formValues = watch();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setFormData(data);
  };

  const onNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const onPrev = () => {
    setStep((prev) => prev - 1);
  };

  const TemplateComponents = {
    TemplateOne,
    TemplateTwo,
  };

  const SelectedTemplate = TemplateComponents[template];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set image URL to state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[url('./assets/purp.jpeg')] w-full h-full min-h-screen  flex px-10 flex-col items-center justify-center">
      <div className=" m-auto w-full flex flex-row items-center justify-between gap-4 p-1">
        <div className="w-200 h-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white mt-5 shadow-md flex flex-col gap-3 w-180 px-6 py-2 outline-none border-none"
          >
            {step === 1 && (
              <>
                <label htmlFor="profileImage" className="mt-3 text-lg font-semibold">
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="p-2 outline-none border-b-2 "
                />

                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  {...register("fullName")}
                  className=" p-2 outline-none border-b border-b-2"/>
                <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

                <div className="flex w-full justify-between items-center gap-12">
                  <div className="h-auto w-full flex flex-col justify-center">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      {...register("email")}
                      className="outline-none py-2 border-b border-b-2 w-full"
                    />
                    <p className="text-red-500 text-sm">{errors.email?.message}</p>
                  </div>
                  <div className="h-auto w-full flex flex-col justify-center">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      {...register("address")}
                      className="outline-none outline-none border-b-2 border-b py-2"
                    />
                    <p className="text-red-500 text-sm">{errors.address?.message}</p>
                  </div>
                </div>

                <div className="flex w-full justify-between items-center gap-12">
                  <div className="h-auto w-full flex flex-col justify-center">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      {...register("phone")}
                      className="w-full outline-none py-2 border-b-2 border-b"
                    />
                    <p className="text-red-500 text-sm">{errors.phone?.message}</p>
                  </div>
                  <div className="h-auto w-full flex flex-col justify-center">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input
                      type="text"
                      {...register("linkedin")}
                      className="w-full outline-none py-2 border-b-2 border-b"
                    />
                    <p className="text-red-500 text-sm">{errors.linkedin?.message}</p>
                  </div>
                </div>

                <label htmlFor="summary">Write a brief summary about your role</label>
                <textarea
                  rows="6" 
                  {...register("summary")}
                  className="w-full border-2 p-2 rounded-md"
                />

                <Button className="primary" text="Continue" onClick={handleSubmit(onNext)} />
              </>
            )}

            {step === 2 && (
              <>
              <div className="h-120 overflow-y-scroll">
                <h2 className="text-lg font-semibold">Work Experience</h2>

                {fields.map((item, index) => (
                  <div key={item.id} className="mb-4 p-4 border-none ">
                    <label htmlFor={`experiences[${index}].companyName`}>Company Name</label>
                    <input
                      type="text"
                      {...register(`experiences.${index}.companyName`)}
                      className="w-full border p-2 rounded-md"
                    />
                    <p className="text-red-500 text-sm">
                      {errors.experiences?.[index]?.companyName?.message}
                    </p>

                    <div className="flex w-full justify-between gap-2">
                      <div className="w-full">
                        <label htmlFor={`experiences${index}.startDate`}>Start Date</label>
                        <input
                          type="date"
                          {...register(`experiences.${index}.startDate`)}
                          className="w-full border p-2 rounded-md"
                        />
                        <p className="text-red-500 text-sm">
                          {errors.experiences?.[index]?.startDate?.message}
                        </p>
                      </div>

                      <div className="w-full">
                        <label htmlFor={`experiences[${index}].endDate`}>End Date</label>
                        <input
                          type="date"
                          {...register(`experiences.${index}.endDate`)}
                          className="w-full border p-2 rounded-md"
                        />
                        <p className="text-red-500 text-sm">
                          {errors.experiences?.[index]?.endDate?.message}
                        </p>
                      </div>
                    </div>

                    <label htmlFor={`experiences[${index}].roles`}>Your Contributions</label>
                    <textarea
                      rows="6"
                      {...register(`experiences.${index}.roles`)}
                      className="w-full border p-2 rounded-md"
                    />

                    <button
                      type="button"
                      className="text-red-500 mt-2"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="bg-purple-800 w-full text-white px-4 py-2 rounded-md mt-2"
                  onClick={() => append({ companyName: "", startDate: "", endDate: "", roles: "" })}
                >
                  + Add Experience
                </button>
                </div>
              </>
            )}

{step === 3 && (
  <>
  <div className="h-120 overflow-y-scroll">
    <h2 className="text-lg font-semibold">Skills</h2>

    {skillFields.map((item, index) => (
      <div key={item.id} className="mb-4 p-4 border-none relative">
        <label>Skill</label>
        <input
          onChange={handleInputChange}
          type="text"
          {...register(`skills.${index}`)}
          className="w-full border p-2 rounded-md"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white w-full border rounded-md mt-1 z-10">
            {suggestions.map((skill, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(skill)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
        <p className="text-red-500 text-sm">{errors.skills?.[index]?.message}</p>

        <button type="button" className="text-red-500 mt-2" onClick={() => removeSkill(index)}>
          Remove
        </button>
      </div>
    ))}

    <button
      type="button"
      className="bg-purple-800 text-white px-4 py-2 rounded-md mt-2"
      onClick={() => appendSkill("")}
    >
      + Add Skill
    </button>
    </div>
  </>
)}

{step === 4 && (
  <>
   <div className="h-120 overflow-y-scroll">
    <h2 className="text-lg font-semibold">Certifications</h2>

    {certFields.map((item, index) => (
      <div key={item.id} className="mb-4 p-4 border-none relative">
        <label>Name</label>
        <input
          type="text"
          {...register(`certifications.${index}.name`)}
          className="w-full border-b outline-none p-2 "
        />
    <p className="text-red-500 text-sm">{errors.certifications?.[index]?.name?.message}</p>
       <div className="w-full flex justify-between gap-2 mt-2">
        <div className="flex flex-col w-full">
        <label>Start Year</label>
        <input
          type="date"
          {...register(`certifications.${index}.startYear`)}
          className="w-full  border-b outline-none p-2"
        />
        <p className="text-red-500 text-sm">{errors.certifications?.[index]?.startYear?.message}</p>
        </div>

        <div className="flex flex-col w-full">
        <label>End Year</label>
        <input
          type="date"
          {...register(`certifications.${index}.endYear`)}
          className="w-full p-2 border-b outline-none"
        />
        <p className="text-red-500 text-sm">{errors.certifications?.[index]?.endYear?.message}</p>
        </div>
        </div>

       <label htmlFor="">Issuer</label>
       <input type='text' {...register(`certifications.${index}.issuer`)} className="w-full p-2  border-b outline-none" />
      <p className="text-red-500 text-sm">{errors.certifications?.[index]?.issuer?.message}</p>

        <button type="button" className="text-red-500 mt-2" onClick={() => removeCert(index)}>
          Remove
        </button>
      </div>
    ))}

    <button
      type="button"
      className="bg-purple-800 text-white px-4 py-2 rounded-md mt-2"
      onClick={() => appendCert({name: "", startYear: "", endYear: "", issuer: ""})}
    >
      + Add certificate
    </button>
    </div>
  </>
)}


          </form>
        </div>

        <div className="w-[550px]">
          {SelectedTemplate && (
            <SelectedTemplate
              data={{ ...formValues, profileImage }} // Pass profileImage along with form data
            />
          )}
        </div>
      </div>

      {step === 2 && (
        <div className="pl-5 flex w-full m-auto h-20 justify-between items-center mt-5">
          <Button text="Back" onClick={onPrev} variant="gold" />
         
            <Button text="Continue" onClick={onNext} variant="secondary" />
          
        </div>
      )}

{step === 3 && (
        <div className="pl-5 flex w-full m-auto h-20 justify-between items-center mt-1">
          <Button text="Back" onClick={onPrev} variant="gold" />
            <Button text="Continue" onClick={onNext} variant="secondary" />
        </div>
      )}

{step === 4 && (
        <div className="pl-5 flex w-full m-auto h-20 justify-between items-center mt-1">
          <Button text="Back" onClick={onPrev} variant="gold" />
            <Button text="Download PDF"  variant="secondary" />
        </div>
      )}
    </div>
  );
};

export default Form;
