"use client";

import React, { useState, useRef } from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faFileAlt } from "@fortawesome/free-solid-svg-icons";

export default function Editprofile({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    phone: data.phone || "",
    emergency_contact: data.emergency_contact || "",
    national_id: data.national_id || "",
    address_id_card: data.address_id_card || "",
    current_address: data.current_address || "",
    work_history: data.work_history || "",
    documents: data.documents || "",
  });

  const [documentUrl, setDocumentUrl] = useState(`${process.env.NEXT_PUBLIC_BASE_API}/file/${data.documents}`); // Track document URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length === 0) {
      alert("Only PDF files are allowed.");
      return;
    }

    const fileNames = pdfFiles.map((file) => file.name).join(", ");
    setFormData((prevState) => ({ ...prevState, documents: fileNames }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("phone", formData.phone);
      form.append("emergency_contact", formData.emergency_contact);
      form.append("national_id", formData.national_id);
      form.append("address_id_card", formData.address_id_card);
      form.append("current_address", formData.current_address);
      form.append("work_history", formData.work_history);
      form.append("documents", formData.documents);

      if (fileInputRef.current && fileInputRef.current.files[0]) {
        form.append("documents", fileInputRef.current.files[0]);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/technicians/${data.id}`,
        {
          method: "PUT",
          body: form,
        }
      );

      if (response.ok) {
        const encodedFileName = encodeURIComponent(formData.documents);
        setDocumentUrl(`${process.env.NEXT_PUBLIC_BASE_API}/file/${encodedFileName}`);
        setIsEditing(false);
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleCancel = () => {
    setFormData(data);
    setIsEditing(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
      <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
        <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6">
          <span>
            <FontAwesomeIcon icon={faAddressCard} className="h-10 w-10" /> Profile
          </span>
        </div>
        <div className="flex gap-12 justify-center">
          <div className="bg-gray-50 p-10 rounded-xl shadow-md text-center w-full">
            <form onSubmit={handleSubmit}>
              <div className="text-left grid grid-cols-3 gap-6">
                <Input
                  disabled={!isEditing}
                  name="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  fullWidth
                />
                <Input
                  disabled={!isEditing}
                  name="emergency_contact"
                  label="Emergency Contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  placeholder="Enter emergency contact"
                  fullWidth
                />
                <Input
                  disabled={!isEditing}
                  name="national_id"
                  label="National ID"
                  value={formData.national_id}
                  onChange={handleChange}
                  placeholder="Enter your national ID"
                  fullWidth
                />
                <Textarea
                  disabled={!isEditing}
                  name="address_id_card"
                  label="Address (ID Card)"
                  value={formData.address_id_card}
                  onChange={handleChange}
                  placeholder="Enter address on ID card"
                  fullWidth
                  className="col-span-3"
                />
                <Textarea
                  disabled={!isEditing}
                  name="current_address"
                  label="Current Address"
                  value={formData.current_address}
                  onChange={handleChange}
                  placeholder="Enter your current address"
                  fullWidth
                  className="col-span-3"
                />
                <Textarea
                  disabled={!isEditing}
                  name="work_history"
                  label="Work History"
                  value={formData.work_history}
                  onChange={handleChange}
                  placeholder="Enter your work history"
                  fullWidth
                  className="col-span-3"
                />
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Documents (PDF only)
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    disabled={!isEditing}
                    ref={fileInputRef}
                    className="block cursor-pointer w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    multiple
                    onChange={handleFileChange}
                  />
                  <p className="mt-2 text-sm text-gray-500">Current Document: {formData.documents}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-4 justify-end">
                {isEditing ? (
                  <>
                    <Button variant="light" color="danger" auto onClick={handleCancel}>Cancel</Button>
                    <Button shadow color="primary" auto type="submit">Submit</Button>
                  </>
                ) : (
                  <Button shadow color="default" auto onClick={handleEditToggle}>Edit Profile</Button>
                )}
              </div>
            </form>
          </div>
          <div className="bg-gray-50 p-10 rounded-md shadow-md w-full">
            <div className="text-2xl font-semibold border-b border-gray-300 pb-4 mb-4">
              <FontAwesomeIcon icon={faFileAlt} className="h-10 w-10" /> File Upload
            </div>
            <iframe src={documentUrl} width="100%" height="540px" className="mt-4 border rounded-md shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
