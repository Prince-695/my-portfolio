import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import emailjs from 'emailjs-com';

const Contact = () => {
  const myEmail = 'rathodprince411@gmail.com'; // Your email for validation

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure user is not using your email
    if (formData.email.trim() === myEmail) {
      alert('You cannot use this email address. Please enter your own email.');
      return;
    }

    // Validation: Ensure all fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Prepare the EmailJS payload
    const emailParams = {
      name: formData.name,        // User's name
      email: formData.email,      // User's email
      subject: formData.subject,  // Email subject
      message: formData.message,  // User's message
    };

    // Send the email via EmailJS
    emailjs
      .send(
        'service_t0hbubc',      // Replace with your EmailJS Service ID
        'template_huosmhx',     // Replace with your EmailJS Template ID
        emailParams,            // Data to send
        '2uQj5m_sibr284pcv'     // Replace with your EmailJS User ID
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        },
        (error) => {
          console.error('FAILED...', error);
          alert('Failed to send the message. Please try again.');
        }
      );
  };

  return (
    <div className="h-full">
      <div className="container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full">
        {/* Text & Form */}
        <div className="flex flex-col w-full max-w-[700px]">
          {/* Heading */}
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-12"
          >
            Let&apos;s <span className="text-accent">Connect.</span>
          </motion.h2>
          {/* Form */}
          <motion.form
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-6 w-full mx-auto"
          >
            {/* Name and Email Fields */}
            <div className="flex gap-x-6 w-full">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input"
              />
            </div>
            {/* Subject Field */}
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="input"
            />
            {/* Message Field */}
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="textarea"
            />
            {/* Submit Button */}
            <button
              type="submit"
              className="btn rounded-full border-2 border-white/30 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group"
            >
              <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-300">
                Let&apos;s Talk
              </span>
              <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
