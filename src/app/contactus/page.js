"use client";
import { useState, useRef, useEffect } from "react";
import { Mail, Phone, User, MessageCircle, Clipboard, Check } from "lucide-react";
import toast from "react-hot-toast";
import { showToast } from "@/components/ToastProvider";

export default function Contact() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        emailAddress: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const state = window.history.state;
            if (state?.apply && state?.job) {
                setFormData((prev) => ({
                    ...prev,
                    subject: `Application for ${state.job}`,
                    message: `I am interested in applying for the ${state.job} position.`,
                }));
            }
         
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First Name is required";
            isValid = false;
        }
        if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
            newErrors.mobileNumber = "Mobile Number must be exactly 10 digits";
            isValid = false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
            newErrors.emailAddress = "Invalid email format";
            isValid = false;
        }
        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
            isValid = false;
        }
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
        showToast("Fix all errors before submit", "error");
            return;
        }
        setShowSuccessModal(true);
        setFormData({
            firstName: "",
            lastName: "",
            mobileNumber: "",
            emailAddress: "",
            subject: "",
            message: "",
        });
        setErrors({});
    };

    return (
        <div className="min-h-screen pt-[60px] md:pt-[30px]">
            


            <div className="max-w-7xl mx-auto px-8 text-center">


                <p className="text-[#5C6268] text-sm mb-2 tracking-widest uppercase font-body">Contact Us</p>
                <h1 className="text-4xl md:text-6xl font-semibold text-[#1C252E] mb-4 font-body">We&apos;Are Here for You</h1>
                <p className="text-base md:text-lg text-[#1C252E] font-body mb-8">
                    Reach out to our team for support, inquiries, or just to connect with us.
                </p>

                {/* Contact Info */}
                <div className="flex justify-center gap-12">
                    <div className="text-center">
                        <Mail className="w-6 h-6 mx-auto mb-2 text-[#1C252E]" />
                        <p className="text-lg font-semibold text-[#1C252E] mb-1 font-body">Write to us</p>
                        <p className="text-base font-body text-[#1C252E]">support@stylishhim.com</p>
                    </div>
                    <div className="text-center">
                        <Phone className="w-6 h-6 mx-auto mb-2 text-[#1C252E]" />
                        <p className="text-lg font-semibold text-[#1C252E] mb-1 font-body">Call us</p>
                        <p className="text-base font-body text-[#1C252E]">+91 9999781282</p>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl mx-auto px-8 py-12">
                <div className="bg-[#FCFCFC] shadow-lg rounded-2xl p-8">
                    <h2 className="text-2xl md:text-3xl font-medium text-center mb-2 font-body">Let&apos;s Connect!</h2>
                    <p className="text-sm md:text-base text-[#5C6268] mb-8 text-center font-body">
                        Reach out to discover smarter solutions for your management needs.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#6A75D1] ${errors.firstName ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#6A75D1] ${errors.lastName ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Contact Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    placeholder="Mobile Number"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#6A75D1] ${errors.mobileNumber ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#6A75D1] ${errors.emailAddress ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>}
                            </div>
                        </div>

                        {/* Subject & Message */}
                        <div className="relative">
                            <Clipboard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#6A75D1] ${errors.subject ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                        </div>

                        <div className="relative">
                            <MessageCircle className="absolute left-3 top-4 w-5 h-5 text-gray-500" />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                rows={4}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#6A75D1] resize-none ${errors.message ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-[#1C252E] text-white px-8 py-3 rounded-full hover:bg-[#2a3441] transition-colors font-body"
                            >
                                Submit Question
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#1C252E] mb-2 font-body">Message Received!</h3>
                        <p className="text-base text-[#5C6268] mb-6 font-body">
                            Thank you for contacting us. Our team will review your message and get back to you within 24 hours.
                        </p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="bg-[#1C252E] text-white px-6 py-2 rounded-full hover:bg-[#2a3441] transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
