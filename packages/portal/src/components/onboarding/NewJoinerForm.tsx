import React, { useState } from "react";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import logo from "figma:asset/329b11bccf18f298ae5105469e5fe347bf4d17c0.png";

interface NewJoinerFormProps {
  formId?: string;
}

export function NewJoinerForm({ formId }: NewJoinerFormProps) {
  const [formData, setFormData] = useState({
    employeeName: "",
    email: "",
    phoneNumber: "",
    additionalPhoneNumber: "",
    placeOfBirth: "",
    birthdate: "",
    gender: "",
    maritalStatus: "",
    bloodType: "",
    religion: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.employeeName.trim()) {
      newErrors.employeeName = "Employee name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.birthdate) {
      newErrors.birthdate = "Birthdate is required";
    }
    
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = "Marital status is required";
    }
    
    if (!formData.religion) {
      newErrors.religion = "Religion is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Show success message
      alert("Form submitted successfully!");
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--background)',
      padding: '48px 24px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '40px'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '8px'
          }}>
            <img 
              src={logo}
              alt="Logo"
              style={{ height: '40px', width: 'auto' }}
            />
          </div>
          <h1 style={{ marginBottom: '8px' }}>New joiner forms</h1>
          <p className="caption" style={{ color: 'var(--muted-foreground)' }}>
            To join our company, please complete the necessary forms providing your personal and employment information. These forms are essential for effective communication and administrative purposes.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Data Section */}
          <div style={{ 
            marginBottom: '32px',
            paddingBottom: '32px',
            borderBottom: '1px solid var(--border)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              marginBottom: '8px'
            }}>
              <User style={{ width: '20px', height: '20px', color: 'var(--muted-foreground)' }} />
              <h3>Personal data</h3>
            </div>
            <p className="caption" style={{ color: 'var(--muted-foreground)', marginBottom: '24px' }}>
              Your personal basic information data.
            </p>

            {/* Two Column Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '24px' 
            }}>
              {/* Employee Name */}
              <div>
                <Label htmlFor="employeeName">
                  Employee name <span style={{ color: 'var(--destructive-foreground)' }}>*</span>
                </Label>
                <Input
                  id="employeeName"
                  value={formData.employeeName}
                  onChange={(e) => handleInputChange('employeeName', e.target.value)}
                  placeholder="Enter your name"
                  style={{ marginTop: '8px' }}
                />
                {errors.employeeName && (
                  <p className="caption" style={{ color: 'var(--destructive-foreground)', marginTop: '4px' }}>
                    {errors.employeeName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">
                  Email <span style={{ color: 'var(--destructive-foreground)' }}>*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="name@injourney.co.id"
                  style={{ marginTop: '8px' }}
                />
                {errors.email && (
                  <p className="caption" style={{ color: 'var(--destructive-foreground)', marginTop: '4px' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+62"
                  style={{ marginTop: '8px' }}
                />
              </div>

              {/* Additional Phone Number */}
              <div>
                <Label htmlFor="additionalPhoneNumber">Additional phone number</Label>
                <Input
                  id="additionalPhoneNumber"
                  type="tel"
                  value={formData.additionalPhoneNumber}
                  onChange={(e) => handleInputChange('additionalPhoneNumber', e.target.value)}
                  placeholder="+62"
                  style={{ marginTop: '8px' }}
                />
              </div>

              {/* Place of Birth */}
              <div>
                <Label htmlFor="placeOfBirth">Place of birth</Label>
                <Input
                  id="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                  placeholder="Enter place of birth"
                  style={{ marginTop: '8px' }}
                />
              </div>

              {/* Birthdate */}
              <div>
                <Label htmlFor="birthdate">
                  Birthdate <span style={{ color: 'var(--destructive-foreground)' }}>*</span>
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => handleInputChange('birthdate', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
                {errors.birthdate && (
                  <p className="caption" style={{ color: 'var(--destructive-foreground)', marginTop: '4px' }}>
                    {errors.birthdate}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <Label>Gender</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  style={{ marginTop: '8px', display: 'flex', gap: '24px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" style={{ cursor: 'pointer', fontWeight: 'var(--font-weight-normal)' }}>
                      Male
                    </Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" style={{ cursor: 'pointer', fontWeight: 'var(--font-weight-normal)' }}>
                      Female
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Marital Status */}
              <div>
                <Label htmlFor="maritalStatus">
                  Marital status <span style={{ color: 'var(--destructive-foreground)' }}>*</span>
                </Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => handleInputChange('maritalStatus', value)}
                >
                  <SelectTrigger id="maritalStatus" style={{ marginTop: '8px' }}>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.maritalStatus && (
                  <p className="caption" style={{ color: 'var(--destructive-foreground)', marginTop: '4px' }}>
                    {errors.maritalStatus}
                  </p>
                )}
              </div>

              {/* Blood Type */}
              <div>
                <Label htmlFor="bloodType">Blood type</Label>
                <Select
                  value={formData.bloodType}
                  onValueChange={(value) => handleInputChange('bloodType', value)}
                >
                  <SelectTrigger id="bloodType" style={{ marginTop: '8px' }}>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Religion */}
              <div>
                <Label htmlFor="religion">
                  Religion <span style={{ color: 'var(--destructive-foreground)' }}>*</span>
                </Label>
                <Select
                  value={formData.religion}
                  onValueChange={(value) => handleInputChange('religion', value)}
                >
                  <SelectTrigger id="religion" style={{ marginTop: '8px' }}>
                    <SelectValue placeholder="Select religion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="islam">Islam</SelectItem>
                    <SelectItem value="christian">Christian</SelectItem>
                    <SelectItem value="catholic">Catholic</SelectItem>
                    <SelectItem value="hindu">Hindu</SelectItem>
                    <SelectItem value="buddha">Buddha</SelectItem>
                    <SelectItem value="confucius">Confucius</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.religion && (
                  <p className="caption" style={{ color: 'var(--destructive-foreground)', marginTop: '4px' }}>
                    {errors.religion}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button type="submit" style={{ minWidth: '120px' }}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}