// src/App.js
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, Award, Building, TrendingUp, FileText, Star, Calendar, Globe, Shield, Zap, Target } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('mbkm');

  // Data dummy untuk charts
  const mbkmProjectsData = [
    { month: 'Jul', projects: 5 },
    { month: 'Aug', projects: 12 },
    { month: 'Sep', projects: 18 },
    { month: 'Oct', projects: 25 },
    { month: 'Nov', projects: 30 }
  ];

  const facultyActivitiesData = [
    { month: 'Jul', activities: 2 },
    { month: 'Aug', activities: 5 },
    { month: 'Sep', activities: 8 },
    { month: 'Oct', activities: 12 },
    { month: 'Nov', activities: 15 }
  ];

  const researchCategoriesData = [
    { name: 'Publikasi', value: 20, color: '#8B5CF6' },
    { name: 'HKI', value: 8, color: '#06B6D4' },
    { name: 'PkM', value: 12, color: '#10B981' },
    { name: 'Recognition', value: 5, color: '#F59E0B' }
  ];

  const industryPartnersData = [
    { partner: 'PT Teknologi Nusantara', projects: 8 },
    { partner: 'CV Digital Borneo', projects: 6 },
    { partner: 'Startup Kalimantan', projects: 5 },
    { partner: 'Perusahaan Energi', projects: 4 },
    { partner: 'Bank Regional', projects: 3 }
  ];

  const tabs = [
    { id: 'mbkm', label: 'Platform MBKM', icon: Users, color: 'bg-blue-500', url: 'mbkm.fsti-itk.ac.id' },
    { id: 'faculty', label: 'Faculty Portal', icon: BookOpen, color: 'bg-purple-500', url: 'faculty.fsti-itk.ac.id' },
    { id: 'research', label: 'Research Repository', icon: Award, color: 'bg-green-500', url: 'research.fsti-itk.ac.id' },
    { id: 'industry', label: 'Industry Collaboration', icon: Building, color: 'bg-orange-500', url: 'industry.fsti-itk.ac.id' }
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('text', 'bg').replace('600', '100')}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const ProjectCard = ({ title, student, prodi, status, url, tech }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Live' ? 'bg-green-100 text-green-800' : 
          status === 'Development' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-1">By: {student}</p>
      <p className="text-xs text-gray-500 mb-2">{prodi}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {tech.map((t, i) => (
          <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{t}</span>
        ))}
      </div>
      <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
        <Globe className="h-4 w-4 mr-1" />
        {url}
      </a>
    </div>
  );

  const FacultyCard = ({ name, role, expertise, industryExp, rating }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-purple-600 font-semibold">{name.split(' ').map(n => n[0]).join('')}</span>
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-700 mb-1"><strong>Expertise:</strong> {expertise}</p>
        <p className="text-sm text-gray-700 mb-1"><strong>Industry:</strong> {industryExp}</p>
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">Rating:</span>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
          ))}
          <span className="text-sm text-gray-600 ml-1">({rating}/5)</span>
        </div>
      </div>
      <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
        Book Consultation
      </button>
    </div>
  );

  const ResearchItem = ({ title, authors, type, year, citations, status }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 flex-1 mr-2">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          type === 'Publication' ? 'bg-blue-100 text-blue-800' : 
          type === 'HKI' ? 'bg-purple-100 text-purple-800' : 
          'bg-green-100 text-green-800'
        }`}>
          {type}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-1">Authors: {authors}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Year: {year}</span>
        <span className="text-xs text-gray-500">Citations: {citations}</span>
        <span className={`text-xs px-2 py-1 rounded ${
          status === 'Published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );

  const IndustryPartnerCard = ({ company, type, projects, contact, since }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Building className="h-6 w-6 text-orange-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">{company}</h3>
            <p className="text-sm text-gray-600">{type}</p>
          </div>
        </div>
        <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">Since {since}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-sm text-gray-700"><strong>Active Projects:</strong> {projects}</p>
          <p className="text-sm text-gray-700"><strong>Contact:</strong> {contact}</p>
        </div>
      </div>
      <button className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
        View Projects
      </button>
    </div>
  );

  const renderMBKMPlatform = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Active Students"
          value="85"
          subtitle="MBKM Participants"
          color="text-blue-600"
        />
        <StatCard
          icon={FileText}
          title="Projects Deployed"
          value="30+"
          subtitle="Live Applications"
          color="text-green-600"
        />
        <StatCard
          icon={Award}
          title="Certificates Issued"
          value="15"
          subtitle="Digital Blockchain"
          color="text-purple-600"
        />
        <StatCard
          icon={TrendingUp}
          title="Portfolio Success"
          value="78%"
          subtitle="Job Interview Rate"
          color="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Growth Timeline</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mbkmProjectsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="projects" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Projects</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            <ProjectCard
              title="E-Commerce Platform Borneo"
              student="Rizky Pratama"
              prodi="Sistem Informasi 2021"
              status="Live"
              url="rizky-ecommerce.mbkm.fsti-itk.ac.id"
              tech={['React', 'Node.js', 'MongoDB']}
            />
            <ProjectCard
              title="Smart Tourism Kalimantan"
              student="Siti Nurhaliza"
              prodi="Informatika 2020"
              status="Development"
              url="siti-tourism.mbkm.fsti-itk.ac.id"
              tech={['Vue.js', 'Laravel', 'MySQL']}
            />
            <ProjectCard
              title="IoT Monitoring Kelapa Sawit"
              student="Ahmad Fauzi"
              prodi="Teknik Elektro 2021"
              status="Live"
              url="ahmad-iot.mbkm.fsti-itk.ac.id"
              tech={['Arduino', 'Python', 'InfluxDB']}
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">MBKM Internal Program</h3>
            <p className="text-blue-100 mb-4">3-6 months internship with real industry projects</p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-blue-100">Available Slots</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-blue-100">Mentors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-blue-100">Job Placement</div>
              </div>
            </div>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderFacultyPortal = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Praktisi Dosen"
          value="12"
          subtitle="Active Consultants"
          color="text-purple-600"
        />
        <StatCard
          icon={Building}
          title="Industry Partners"
          value="7"
          subtitle="Active Collaborations"
          color="text-blue-600"
        />
        <StatCard
          icon={FileText}
          title="External Activities"
          value="15+"
          subtitle="Tridharma Outside ITK"
          color="text-green-600"
        />
        <StatCard
          icon={Award}
          title="MBKM Supervisors"
          value="20+"
          subtitle="Registered Mentors"
          color="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Faculty Activities Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={facultyActivitiesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="activities" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Consultant Faculty</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            <FacultyCard
              name="Dr. Ahmad Susanto"
              role="IT Consultant & Lecturer"
              expertise="Cloud Computing, DevOps"
              industryExp="3 years at PT Telkom"
              rating={5}
            />
            <FacultyCard
              name="Maya Sari, M.Kom"
              role="Software Engineer & Lecturer"
              expertise="Web Development, AI"
              industryExp="5 years at Startup Unicorn"
              rating={4}
            />
            <FacultyCard
              name="Prof. Budi Santoso"
              role="CTO & Professor"
              expertise="IoT, Embedded Systems"
              industryExp="10 years Industry Leader"
              rating={5}
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Praktisi Berkarya Program</h3>
            <p className="text-purple-100 mb-4">Connecting faculty expertise with industry needs</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-purple-100">Consultation Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">25</div>
                <div className="text-sm text-purple-100">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-purple-100">Client Satisfaction</div>
              </div>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Join Program
          </button>
        </div>
      </div>
    </div>
  );

  const renderResearchRepository = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={FileText}
          title="Publications"
          value="25"
          subtitle="Hosted Papers"
          color="text-green-600"
        />
        <StatCard
          icon={Award}
          title="HKI Documents"
          value="8"
          subtitle="Patents & Copyrights"
          color="text-blue-600"
        />
        <StatCard
          icon={Target}
          title="PkM Projects"
          value="12"
          subtitle="Community Impact"
          color="text-purple-600"
        />
        <StatCard
          icon={TrendingUp}
          title="Citations"
          value="+40%"
          subtitle="Improvement Rate"
          color="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Research Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={researchCategoriesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {researchCategoriesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Research</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            <ResearchItem
              title="Implementasi Machine Learning untuk Prediksi Cuaca di Kalimantan"
              authors="Dr. Maya Sari, Ahmad Fauzi"
              type="Publication"
              year="2024"
              citations="15"
              status="Published"
            />
            <ResearchItem
              title="Sistem Monitoring IoT Kelapa Sawit"
              authors="Prof. Budi Santoso"
              type="HKI"
              year="2024"
              citations="8"
              status="Granted"
            />
            <ResearchItem
              title="Digitalisasi UMKM Borneo melalui Platform E-Commerce"
              authors="Dr. Ahmad Susanto, Tim PkM"
              type="PkM"
              year="2024"
              citations="12"
              status="Implemented"
            />
            <ResearchItem
              title="Blockchain untuk Supply Chain Kelapa Sawit"
              authors="Maya Sari, M.Kom, et al."
              type="Publication"
              year="2024"
              citations="23"
              status="Published"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Open Research Repository</h3>
            <p className="text-green-100 mb-4">Making FSTI research globally accessible</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">2.5K</div>
                <div className="text-sm text-green-100">Total Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">45</div>
                <div className="text-sm text-green-100">Countries Reached</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">120</div>
                <div className="text-sm text-green-100">Scholar Citations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-green-100">Open Access</div>
              </div>
            </div>
          </div>
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
            Submit Research
          </button>
        </div>
      </div>
    </div>
  );

  const renderIndustryCollaboration = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Building}
          title="Active Partners"
          value="7"
          subtitle="Strategic Industries"
          color="text-orange-600"
        />
        <StatCard
          icon={FileText}
          title="Collaborative Projects"
          value="26"
          subtitle="Ongoing & Completed"
          color="text-blue-600"
        />
        <StatCard
          icon={Users}
          title="Consultations"
          value="150+"
          subtitle="Hours Delivered"
          color="text-green-600"
        />
        <StatCard
          icon={TrendingUp}
          title="Revenue Generated"
          value="320M"
          subtitle="IDR This Year"
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Industry Partners</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={industryPartnersData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="partner" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="projects" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Industry Partners</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            <IndustryPartnerCard
              company="PT Teknologi Nusantara"
              type="IT Solutions Provider"
              projects="8"
              contact="tech@nusantara.co.id"
              since="2024"
            />
            <IndustryPartnerCard
              company="CV Digital Borneo"
              type="Software Development"
              projects="6"
              contact="hello@digitalborneo.id"
              since="2024"
            />
            <IndustryPartnerCard
              company="Kalimantan Energy Corp"
              type="Energy & Mining"
              projects="4"
              contact="innovation@kaleng.com"
              since="2024"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Industry Partnership Platform</h3>
            <p className="text-orange-100 mb-4">Bridging academia and industry for innovation</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-orange-100">Platform Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">AI</div>
                <div className="text-sm text-orange-100">Smart Matching</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">&lt;2h</div>
                <div className="text-sm text-orange-100">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-orange-100">Digital Contract</div>
              </div>
            </div>
          </div>
          <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
            Become Partner
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Lab Inovasi Digital</h1>
                  <p className="text-sm text-gray-600">FSTI - Institut Teknologi Kalimantan</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">System Online</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-lg font-bold text-green-600">99.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? `${tab.color} text-white shadow-lg transform scale-105`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:block">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* URL Display */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-sm">
              https://{tabs.find(tab => tab.id === activeTab)?.url}
            </span>
            <div className="flex items-center space-x-1 ml-4">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-400">Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h2>
          <p className="text-gray-600 mt-1">
            {activeTab === 'mbkm' && 'Empowering students with real-world deployment experience (IKU 2)'}
            {activeTab === 'faculty' && 'Connecting faculty expertise with industry opportunities (IKU 3)'}
            {activeTab === 'research' && 'Making FSTI research globally accessible and impactful (IKU 5)'}
            {activeTab === 'industry' && 'Building bridges between academia and industry (IKU 3)'}
          </p>
        </div>

        {/* Platform Content */}
        {activeTab === 'mbkm' && renderMBKMPlatform()}
        {activeTab === 'faculty' && renderFacultyPortal()}
        {activeTab === 'research' && renderResearchRepository()}
        {activeTab === 'industry' && renderIndustryCollaboration()}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                © 2025 Lab Inovasi Digital FSTI ITK. Supporting IKU 2, 3, and 5.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Powered by:</span>
              <span className="text-sm bg-blue-600 px-2 py-1 rounded">Biznet VPS</span>
              <span className="text-sm bg-purple-600 px-2 py-1 rounded">React</span>
              <span className="text-sm bg-green-600 px-2 py-1 rounded">Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;