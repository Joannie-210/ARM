import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const TemplateOne = ({ data }) => {
  console.log("TemplateOne received data:", data);

  const resumeRef = useRef(); // Reference for the printable content

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "My_Resume",
  });

  return (
    <div className="w-full h-full flex flex-col items-center">
    
      <div ref={resumeRef} className="w-full max-w-[520px] shadow-lg m-auto min-h-120 max-h-auto mt-4 flex flex-col bg-white p-6">
        
       
        <div className="flex w-full">
         
          <div className="flex flex-col text-white justify-start items-start h-auto bg-[#000080] w-3/5 px-4 py-6 overflow-hidden gap-4">
            <div className="border-b-2 w-full pb-3">
              <div className="flex justify-center items-center mb-2">
                <img src={data.profileImage || ""} alt="Profile" className="object-cover rounded-full border-2 w-20 h-20" />
              </div>
              <p className="text-[12px] break-words"><span className='font-bold'>Address:</span> {data.address || "123 Main Street"}</p>
              <p className="text-[12px] break-words"><span className='font-bold'>Phone:</span> {data.phone || "N/A"}</p>
              <p className="text-[12px] break-words"><span className='font-bold'>Email:</span> {data.email || "N/A"}</p>
              <p className="text-[12px] break-words"><span className='font-bold'>LinkedIn:</span> {data.linkedin || "N/A"}</p>
            </div>

            <div className="w-full">
              <p className="text-[14px] font-bold">Summary</p>
              <p className="text-[11px] break-words w-full">
                {data.summary || "Your summary goes here..."}
              </p>
            </div>

            <div className="w-full">
              <p className="text-[14px] font-bold">Skills</p> 
              <ul className="list-disc pl-4 text-[11px]">
                {data.skills && data.skills.length > 0 ? data.skills.map((skill, index) => <li key={index}>{skill}</li>) : <li>No skills added</li>}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white flex flex-col justify-start h-auto w-3/5 px-4 py-6 gap-6">
            <h1 className="text-left break-words text-3xl font-bold">{data.fullName || 'Your Name'}</h1>
            
            <div>
              <p className="text-[14px] font-bold">Experience</p>
              {data.experiences && data.experiences.length > 0 ? (
                data.experiences.map((exp, index) => (
                  <div key={index} className="text-[11px] break-words">
                    <strong>Company Name:</strong> {exp.companyName || 'Company name'}<br />
                    <strong>Dates:</strong> {exp.startDate} - {exp.endDate} <br />
                    <strong className='font-bold'>Contributions:</strong> {exp.roles || "No contributions listed"}
                    <hr className='w-full bg-[#000080] h-[1px]'/>
                  </div>
                ))
              ) : (
                <p className="text-[11px]">No experience added</p>
              )}
            </div>

            <div>
              <p className="text-[14px] font-bold">Certifications</p>
              {data.certifications && data.certifications.length > 0 ? (
                data.certifications.map((cert, index) => (
                  <div key={index} className="text-[11px]">
                    <strong>Degree</strong> - {cert.name || "Certification Name"} <br />
                    {cert.startYear || "Start Year"} - {cert.endYear || "End Year"}
                    <strong className='font-bold block'>Issuer:</strong> {cert.issuer || "Issuer Name"}
                  </div>
                ))
              ) : (
                <p className="text-[11px]">No education details added</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Button to Download PDF */}
      <button onClick={handlePrint} className="mt-4 bg-blue-600 text-white p-2 rounded block">
        Download PDF
      </button>
    </div>
  );
};

export default TemplateOne;
