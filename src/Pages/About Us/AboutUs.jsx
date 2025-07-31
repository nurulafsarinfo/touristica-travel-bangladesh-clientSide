import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#d1dbff] text-[#627bdb] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="https://i.ibb.co/MkWmWC4j/1750843837556-1-removebg-preview.png"
            alt="Nurul Afsar"
            className="mx-auto rounded-full border-4 w-32 border-[#584df7] mb-4"
          />
          <h1 className="text-3xl font-bold text-[#263a88]">Nurul Afsar</h1>
          <p className="text-sm text-[#627bdb]">Full-Stack Developer | MERN Stack Enthusiast</p>
        </div>

        {/* About Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#263a88] mb-2">About Me</h2>
          <p>
            I'm a passionate MERN Stack developer with hands-on experience in building dynamic and scalable
            full-stack web applications. I've completed over <strong>3 full-stack projects</strong> using React, Node.js, Express, and MongoDB. 
            I enjoy solving real-world problems through code and building user-friendly experiences.
          </p>
        </section>

        {/* Project Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#263a88] mb-2">Projects Overview</h2>
          <p>
            <strong>Projects Completed:</strong> 3+ full-stack web applications
          </p>

          {/* Project List */}
          <div className="mt-4 space-y-4">
            {/* Project 1 */}
            <div>
              <h3 className="font-bold text-[#263a88]">StudySphere – Assignment Management System</h3>
              <p>A secure platform for managing and grading assignments.</p>
              <a href="https://stadysphere-a11.firebaseapp.com" className="text-[#0ea5e9] hover:underline text-sm">Live Demo</a> | 
              <a href="https://github.com/nurulafsarinfo/StudySphere-client-side" className="text-[#0ea5e9] hover:underline text-sm ml-2">Client Repo</a> | 
              <a href="https://github.com/nurulafsarinfo/StudySphere-server-side" className="text-[#0ea5e9] hover:underline text-sm ml-2">Server Repo</a>
            </div>

            {/* Project 2 */}
            <div>
              <h3 className="font-bold text-[#263a88]">GardenHub – Gardening Social Platform</h3>
              <p>A MERN social app for tips, quizzes, and gardening enthusiasts.</p>
              <a href="https://gardeners-user-auth.web.app/" className="text-[#0ea5e9] hover:underline text-sm">Live Demo</a> | 
              <a href="https://github.com/nurulafsarinfo/GardenHub-client-site" className="text-[#0ea5e9] hover:underline text-sm ml-2">Client Repo</a> | 
              <a href="https://github.com/nurulafsarinfo/GardenHub-server-site-a10" className="text-[#0ea5e9] hover:underline text-sm ml-2">Server Repo</a>
            </div>
          </div>
        </section>

        {/* Contact / Social Links */}
        <section className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold text-[#263a88] mb-2">Contact & Links</h2>
          <p className="mb-2">📧 mdnurulafsar123afsar@gmail.com</p>
          <div className="flex space-x-4 text-sm">
            <a href="https://github.com/nurulafsarinfo/" className="text-[#627bdb] hover:text-[#f050a6]" target='_blank'>GitHub</a>
            <a href="https://nurulafsar-webdev.netlify.app/" target='_blank' className="text-[#627bdb] hover:text-[#f050a6]">Portfolio</a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
