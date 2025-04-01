    import React from 'react';

    const TemplateOne = ({data}) => {
    return (
        <div className="w-full h-full">
        <div className="w-full max-w-[45  0px] sm:max-w-[480px] md:max-w-[500px] lg:max-w-[550px] border-2 m-auto min-h-auto max-h-full mt-4 flex">
            
            <div className="flex flex-col text-white justify-start items-start h-auto bg-[#000080] w-2/5 px-4 py-6 overflow-hidden gap-4">
            
            <div className="border-b-2 w-full pb-3">
                <div className="flex justify-center items-center mb-2">
                <img src="" alt="Profile" className="rounded-full border-2 w-20 h-20" />
                </div>
                <p className="text-[12px] break-words text-[10px] truncate block">
                <span className='font-bold'>Address:</span>{data.address || "123 Main Street"}
                </p>
                <p className="text-[12px] break-words text-[10px]"><span className='font-bold'>Phone: </span>{data.phone || " "}
                </p>
                <p className="text-[12px] break-word ">
                <span className='font-bold'>Email: </span> {data.email || " "}
                </p>
                <p className="text-[12px] break-word  mb-2">
                <span className='font-bold'>Linkedin: </span> {data.linkedin || " "}
                </p>
            </div>

            
            <div className="w-full">
                <p className="text-[14px] font-bold">Summary</p>
                <p className="text-[11px] h-auto break-words overflow-hidden w-full">
                {data.summary || "Your summary goes here..."}
                </p>
            </div>

            <div className="w-full">
                <p className="text-[14px] font-bold">Skills</p> 
                <ul className="list-disc pl-4 text-[11px]">
                <li>Skill 1</li>
                <li>Skill 2</li>
                <li>Skill 3</li>
                </ul>
            </div>

            </div>

            <div className="bg-white flex flex-col justify-start h-auto w-3/5 px-4 py-6 gap-6">
            
            <h1 className="text-left break-words block text-3xl font-bold">{data.fullName || 'Your name '}</h1>

            <div>
                <p className="text-[14px] font-bold">Experience</p>
                <p className="text-[11px]">
                <strong>Job Title: </strong>{data.companyName || 'Company name'}<br />  
                {data.startDate} - {data.endDate} <br />
                </p>
            <p className='text-[10px] break-words'><strong className='font-bold'>Contributions: </strong>{data.roles}</p>
            </div>

            <div>
                <p className="text-[14px] font-bold">Education</p>
                <p className="text-[11px]">
                <strong>Degree</strong> - University Name <br />
                2015 - 2019
                </p>
            </div>

            <div>
                <p className="text-[14px] font-bold">Languages</p>
                <ul className="list-disc pl-4 text-[11px]">
                <li>English - Fluent</li>
                <li>French - Intermediate</li>
                </ul>
            </div>

            </div>

        </div>
        </div>
    );
    };

    export default TemplateOne;
