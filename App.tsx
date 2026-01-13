import './style.css';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Upload, Briefcase, FileText, Download, Copy, CheckCircle, Plus, Trash2, User } from 'lucide-react';

export default function AutoJobApp() {
  const [profile, setProfile] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    linkedin: '',
    portfolio: '',
    ssn: '',
    dob: '',
    eligibleToWork: '',
    convicted: '',
    convictionDetails: '',
    
    // Professional Summary
    summary: '',
    desiredPosition: '',
    desiredSalary: '',
    availableStartDate: '',
    employmentType: '',
    
    // Employment History (3 previous employers)
    employers: [
      { company: '', position: '', supervisor: '', phone: '', address: '', startDate: '', endDate: '', salary: '', duties: '', reasonForLeaving: '', canContact: '' },
      { company: '', position: '', supervisor: '', phone: '', address: '', startDate: '', endDate: '', salary: '', duties: '', reasonForLeaving: '', canContact: '' },
      { company: '', position: '', supervisor: '', phone: '', address: '', startDate: '', endDate: '', salary: '', duties: '', reasonForLeaving: '', canContact: '' }
    ],
    
    // Education History
    education: [
      { school: '', location: '', degree: '', major: '', graduationDate: '', gpa: '' },
      { school: '', location: '', degree: '', major: '', graduationDate: '', gpa: '' }
    ],
    
    // References
    references: [
      { name: '', relationship: '', company: '', phone: '', email: '' },
      { name: '', relationship: '', company: '', phone: '', email: '' },
      { name: '', relationship: '', company: '', phone: '', email: '' }
    ],
    
    // Skills & Certifications
    skills: '',
    certifications: '',
    languages: '',
    
    // Additional Information
    driversLicense: '',
    licenseNumber: '',
    vehicleAccess: '',
    shiftPreference: '',
    hoursAvailable: ''
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setProfile(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = (arrayName, template) => {
    setProfile(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], template]
    }));
  };

  const removeItem = (arrayName, index) => {
    setProfile(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setProfile(data);
        } catch (err) {
          alert('Error reading file. Please ensure it\'s a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(profile, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'job-application-profile.json';
    link.click();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'position', label: 'Position Details' },
    { id: 'employment', label: 'Employment History' },
    { id: 'education', label: 'Education' },
    { id: 'references', label: 'References' },
    { id: 'additional', label: 'Additional Info' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Comprehensive Job Application Manager</h1>
            </div>
            <div className="flex gap-2">
              <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {activeTab === 'personal' && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Full Name" name="fullName" value={profile.fullName} onChange={handleInputChange} />
                  <Input label="Email" name="email" type="email" value={profile.email} onChange={handleInputChange} />
                  <Input label="Phone" name="phone" type="tel" value={profile.phone} onChange={handleInputChange} />
                  <Input label="Date of Birth" name="dob" type="date" value={profile.dob} onChange={handleInputChange} />
                  <Input label="Social Security Number" name="ssn" value={profile.ssn} onChange={handleInputChange} />
                  <Input label="Address" name="address" value={profile.address} onChange={handleInputChange} />
                  <Input label="City" name="city" value={profile.city} onChange={handleInputChange} />
                  <Input label="State" name="state" value={profile.state} onChange={handleInputChange} />
                  <Input label="ZIP Code" name="zip" value={profile.zip} onChange={handleInputChange} />
                  <Input label="LinkedIn Profile" name="linkedin" value={profile.linkedin} onChange={handleInputChange} />
                  <Input label="Portfolio/Website" name="portfolio" value={profile.portfolio} onChange={handleInputChange} />
                  <Select label="Eligible to Work in US?" name="eligibleToWork" value={profile.eligibleToWork} onChange={handleInputChange} options={['', 'Yes', 'No']} />
                  <Select label="Ever Been Convicted?" name="convicted" value={profile.convicted} onChange={handleInputChange} options={['', 'Yes', 'No']} />
                </div>
                {profile.convicted === 'Yes' && (
                  <Textarea label="Conviction Details" name="convictionDetails" value={profile.convictionDetails} onChange={handleInputChange} rows={3} />
                )}
              </>
            )}

            {activeTab === 'position' && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Position & Availability</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Desired Position" name="desiredPosition" value={profile.desiredPosition} onChange={handleInputChange} />
                  <Input label="Desired Salary" name="desiredSalary" value={profile.desiredSalary} onChange={handleInputChange} />
                  <Input label="Available Start Date" name="availableStartDate" type="date" value={profile.availableStartDate} onChange={handleInputChange} />
                  <Select label="Employment Type" name="employmentType" value={profile.employmentType} onChange={handleInputChange} options={['', 'Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Internship']} />
                  <Select label="Shift Preference" name="shiftPreference" value={profile.shiftPreference} onChange={handleInputChange} options={['', 'Day', 'Evening', 'Night', 'Flexible', 'Any']} />
                  <Input label="Hours Available per Week" name="hoursAvailable" value={profile.hoursAvailable} onChange={handleInputChange} />
                </div>
                <Textarea label="Professional Summary" name="summary" value={profile.summary} onChange={handleInputChange} rows={4} placeholder="Brief overview of your professional background and career goals..." />
              </>
            )}

            {activeTab === 'employment' && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Employment History</h2>
                  <button
                    onClick={() => addItem('employers', { company: '', position: '', supervisor: '', phone: '', address: '', startDate: '', endDate: '', salary: '', duties: '', reasonForLeaving: '', canContact: '' })}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Employer
                  </button>
                </div>
                {profile.employers.map((employer, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">Employer {index + 1}</h3>
                      {profile.employers.length > 1 && (
                        <button onClick={() => removeItem('employers', index)} className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="Company Name" value={employer.company} onChange={(e) => handleArrayChange('employers', index, 'company', e.target.value)} />
                      <Input label="Position/Title" value={employer.position} onChange={(e) => handleArrayChange('employers', index, 'position', e.target.value)} />
                      <Input label="Supervisor Name" value={employer.supervisor} onChange={(e) => handleArrayChange('employers', index, 'supervisor', e.target.value)} />
                      <Input label="Phone" value={employer.phone} onChange={(e) => handleArrayChange('employers', index, 'phone', e.target.value)} />
                      <Input label="Address" value={employer.address} onChange={(e) => handleArrayChange('employers', index, 'address', e.target.value)} />
                      <Input label="Start Date" type="date" value={employer.startDate} onChange={(e) => handleArrayChange('employers', index, 'startDate', e.target.value)} />
                      <Input label="End Date" type="date" value={employer.endDate} onChange={(e) => handleArrayChange('employers', index, 'endDate', e.target.value)} />
                      <Input label="Starting/Ending Salary" value={employer.salary} onChange={(e) => handleArrayChange('employers', index, 'salary', e.target.value)} />
                      <Select label="May We Contact?" value={employer.canContact} onChange={(e) => handleArrayChange('employers', index, 'canContact', e.target.value)} options={['', 'Yes', 'No']} />
                    </div>
                    <div className="mt-4">
                      <Textarea label="Job Duties & Responsibilities" value={employer.duties} onChange={(e) => handleArrayChange('employers', index, 'duties', e.target.value)} rows={3} />
                      <Textarea label="Reason for Leaving" value={employer.reasonForLeaving} onChange={(e) => handleArrayChange('employers', index, 'reasonForLeaving', e.target.value)} rows={2} />
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === 'education' && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Education History</h2>
                  <button
                    onClick={() => addItem('education', { school: '', location: '', degree: '', major: '', graduationDate: '', gpa: '' })}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add School
                  </button>
                </div>
                {profile.education.map((edu, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">Education {index + 1}</h3>
                      {profile.education.length > 1 && (
                        <button onClick={() => removeItem('education', index)} className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="School/Institution" value={edu.school} onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)} />
                      <Input label="Location" value={edu.location} onChange={(e) => handleArrayChange('education', index, 'location', e.target.value)} />
                      <Input label="Degree/Certification" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
                      <Input label="Major/Field of Study" value={edu.major} onChange={(e) => handleArrayChange('education', index, 'major', e.target.value)} />
                      <Input label="Graduation Date" type="date" value={edu.graduationDate} onChange={(e) => handleArrayChange('education', index, 'graduationDate', e.target.value)} />
                      <Input label="GPA (Optional)" value={edu.gpa} onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)} />
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <Textarea label="Skills" name="skills" value={profile.skills} onChange={handleInputChange} rows={3} placeholder="List your relevant skills..." />
                  <Textarea label="Certifications & Licenses" name="certifications" value={profile.certifications} onChange={handleInputChange} rows={3} placeholder="List any certifications, licenses, or special training..." />
                  <Textarea label="Languages" name="languages" value={profile.languages} onChange={handleInputChange} rows={2} placeholder="List languages you speak and proficiency level..." />
                </div>
              </>
            )}

            {activeTab === 'references' && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Professional References</h2>
                  <button
                    onClick={() => addItem('references', { name: '', relationship: '', company: '', phone: '', email: '' })}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Reference
                  </button>
                </div>
                {profile.references.map((ref, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">Reference {index + 1}</h3>
                      {profile.references.length > 1 && (
                        <button onClick={() => removeItem('references', index)} className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="Full Name" value={ref.name} onChange={(e) => handleArrayChange('references', index, 'name', e.target.value)} />
                      <Input label="Relationship" value={ref.relationship} onChange={(e) => handleArrayChange('references', index, 'relationship', e.target.value)} placeholder="e.g., Former Supervisor" />
                      <Input label="Company/Organization" value={ref.company} onChange={(e) => handleArrayChange('references', index, 'company', e.target.value)} />
                      <Input label="Phone" value={ref.phone} onChange={(e) => handleArrayChange('references', index, 'phone', e.target.value)} />
                      <Input label="Email" type="email" value={ref.email} onChange={(e) => handleArrayChange('references', index, 'email', e.target.value)} />
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === 'additional' && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Select label="Valid Driver's License?" name="driversLicense" value={profile.driversLicense} onChange={handleInputChange} options={['', 'Yes', 'No']} />
                  <Input label="License Number" name="licenseNumber" value={profile.licenseNumber} onChange={handleInputChange} />
                  <Select label="Reliable Vehicle Access?" name="vehicleAccess" value={profile.vehicleAccess} onChange={handleInputChange} options={['', 'Yes', 'No']} />
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            {showForm ? 'Hide' : 'Show'} Auto-Filled Application Preview
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Complete Application Preview</h2>
              {copied && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Copied!</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    activeTab === tab.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="space-y-6">
              {activeTab === 'personal' && (
                <Section title="Personal Information">
                  <FormField label="Full Name" value={profile.fullName} onCopy={copyToClipboard} />
                  <FormField label="Email" value={profile.email} onCopy={copyToClipboard} />
                  <FormField label="Phone" value={profile.phone} onCopy={copyToClipboard} />
                  <FormField label="Date of Birth" value={profile.dob} onCopy={copyToClipboard} />
                  <FormField label="Social Security Number" value={profile.ssn} onCopy={copyToClipboard} />
                  <FormField label="Address" value={profile.address} onCopy={copyToClipboard} />
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField label="City" value={profile.city} onCopy={copyToClipboard} />
                    <FormField label="State" value={profile.state} onCopy={copyToClipboard} />
                    <FormField label="ZIP" value={profile.zip} onCopy={copyToClipboard} />
                  </div>
                  <FormField label="LinkedIn Profile" value={profile.linkedin} onCopy={copyToClipboard} />
                  <FormField label="Portfolio/Website" value={profile.portfolio} onCopy={copyToClipboard} />
                  <FormField label="Eligible to Work in US?" value={profile.eligibleToWork} onCopy={copyToClipboard} />
                  <FormField label="Ever Been Convicted?" value={profile.convicted} onCopy={copyToClipboard} />
                  {profile.convicted === 'Yes' && (
                    <FormField label="Conviction Details" value={profile.convictionDetails} onCopy={copyToClipboard} textarea />
                  )}
                </Section>
              )}

              {activeTab === 'position' && (
                <Section title="Position & Availability">
                  <FormField label="Desired Position" value={profile.desiredPosition} onCopy={copyToClipboard} />
                  <FormField label="Desired Salary" value={profile.desiredSalary} onCopy={copyToClipboard} />
                  <FormField label="Available Start Date" value={profile.availableStartDate} onCopy={copyToClipboard} />
                  <FormField label="Employment Type" value={profile.employmentType} onCopy={copyToClipboard} />
                  <FormField label="Shift Preference" value={profile.shiftPreference} onCopy={copyToClipboard} />
                  <FormField label="Hours Available per Week" value={profile.hoursAvailable} onCopy={copyToClipboard} />
                  <FormField label="Professional Summary" value={profile.summary} onCopy={copyToClipboard} textarea />
                </Section>
              )}

              {activeTab === 'employment' && (
                <Section title="Employment History">
                  {profile.employers.map((emp, i) => (
                    <div key={i} className="mb-6 pb-6 border-b last:border-b-0">
                      <h4 className="font-semibold text-gray-700 mb-3">Employer {i + 1}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField label="Company" value={emp.company} onCopy={copyToClipboard} />
                        <FormField label="Position" value={emp.position} onCopy={copyToClipboard} />
                        <FormField label="Supervisor" value={emp.supervisor} onCopy={copyToClipboard} />
                        <FormField label="Phone" value={emp.phone} onCopy={copyToClipboard} />
                        <FormField label="Address" value={emp.address} onCopy={copyToClipboard} />
                        <FormField label="Start Date" value={emp.startDate} onCopy={copyToClipboard} />
                        <FormField label="End Date" value={emp.endDate} onCopy={copyToClipboard} />
                        <FormField label="Salary" value={emp.salary} onCopy={copyToClipboard} />
                        <FormField label="May We Contact?" value={emp.canContact} onCopy={copyToClipboard} />
                      </div>
                      <FormField label="Job Duties & Responsibilities" value={emp.duties} onCopy={copyToClipboard} textarea />
                      <FormField label="Reason for Leaving" value={emp.reasonForLeaving} onCopy={copyToClipboard} textarea />
                    </div>
                  ))}
                </Section>
              )}

              {activeTab === 'education' && (
                <Section title="Education & Skills">
                  {profile.education.map((edu, i) => (
                    <div key={i} className="mb-6 pb-6 border-b last:border-b-0">
                      <h4 className="font-semibold text-gray-700 mb-3">Education {i + 1}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField label="School/Institution" value={edu.school} onCopy={copyToClipboard} />
                        <FormField label="Location" value={edu.location} onCopy={copyToClipboard} />
                        <FormField label="Degree/Certification" value={edu.degree} onCopy={copyToClipboard} />
                        <FormField label="Major/Field of Study" value={edu.major} onCopy={copyToClipboard} />
                        <FormField label="Graduation Date" value={edu.graduationDate} onCopy={copyToClipboard} />
                        <FormField label="GPA" value={edu.gpa} onCopy={copyToClipboard} />
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 space-y-4">
                    <FormField label="Skills" value={profile.skills} onCopy={copyToClipboard} textarea />
                    <FormField label="Certifications & Licenses" value={profile.certifications} onCopy={copyToClipboard} textarea />
                    <FormField label="Languages" value={profile.languages} onCopy={copyToClipboard} textarea />
                  </div>
                </Section>
              )}

              {activeTab === 'references' && (
                <Section title="Professional References">
                  {profile.references.map((ref, i) => (
                    <div key={i} className="mb-6 pb-6 border-b last:border-b-0">
                      <h4 className="font-semibold text-gray-700 mb-3">Reference {i + 1}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField label="Full Name" value={ref.name} onCopy={copyToClipboard} />
                        <FormField label="Relationship" value={ref.relationship} onCopy={copyToClipboard} />
                        <FormField label="Company/Organization" value={ref.company} onCopy={copyToClipboard} />
                        <FormField label="Phone" value={ref.phone} onCopy={copyToClipboard} />
                        <FormField label="Email" value={ref.email} onCopy={copyToClipboard} />
                      </div>
                    </div>
                  ))}
                </Section>
              )}

              {activeTab === 'additional' && (
                <Section title="Additional Information">
                  <FormField label="Valid Driver's License?" value={profile.driversLicense} onCopy={copyToClipboard} />
                  <FormField label="License Number" value={profile.licenseNumber} onCopy={copyToClipboard} />
                  <FormField label="Reliable Vehicle Access?" value={profile.vehicleAccess} onCopy={copyToClipboard} />
                </Section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Input({ label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function Textarea({ label, name, value, onChange, rows = 3, placeholder }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FormField({ label, value, onCopy, textarea }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {textarea ? (
          <textarea
            value={value}
            readOnly
            rows="3"
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg bg-gray-50"
          />
        ) : (
          <input
            type="text"
            value={value}
            readOnly
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg bg-gray-50"
          />
        )}
        <button
          onClick={() => onCopy(value)}
          className="absolute right-2 top-2 p-2 text-gray-500 hover:text-indigo-600 transition"
          title="Copy to clipboard"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<AutoJobApp />);
