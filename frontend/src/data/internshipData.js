const delay = (payload, time = 600) => new Promise((resolve) => setTimeout(() => resolve(payload), time))

const internshipPositions = [
  {
    id: 'intern-1',
    title: 'Sustainability Research Intern',
    host: 'EcoSphere Labs',
    duration: '3 months',
    location: 'Freetown / Hybrid',
    category: 'Research & Strategy',
    stipend: '$450 / month',
    postedOn: 'Jul 05, 2026',
    deadline: 'Aug 08, 2026',
    slots: 2,
    tags: ['Research', 'Circular Economy', 'Hybrid'],
    summary: 'Join CIC partners to support research into circular materials, reuse systems, and sustainability protocols.',
    description:
      'You will work with the CIC research team to collect data, test eco-friendly prototypes, and present findings to partner stakeholders. This role is ideal for members who want hands-on experience with sustainability research and community innovation.',
    responsibilities: [
      'Collect field data and analyze sustainability metrics.',
      'Support prototype testing and material validation.',
      'Help create reports for community and partner briefings.',
      'Collaborate with cross-functional teams on research priorities.',
    ],
    requirements: [
      'Strong research and presentation skills.',
      'Interest in circular systems, materials, or social impact.',
      'Comfort working in hybrid field and remote settings.',
      'Ability to meet project deadlines and present insights clearly.',
    ],
  },
  {
    id: 'intern-2',
    title: 'Product Design Intern',
    host: 'GreenTech Alliance',
    duration: '6 months',
    location: 'Remote / Campus Hub',
    category: 'Design & Innovation',
    stipend: '$500 / month',
    postedOn: 'Jun 28, 2026',
    deadline: 'Aug 15, 2026',
    slots: 3,
    tags: ['Design', 'Innovation', 'Remote'],
    summary: 'Help design low-waste products and build prototypes that support circular innovation in local communities.',
    description:
      'Work with designers, engineers, and community volunteers to develop product solutions that prioritize reuse, repair, and sustainability. This internship is perfect for creative members who want to turn ideas into tangible prototypes.',
    responsibilities: [
      'Design low-waste product concepts and supporting visuals.',
      'Collaborate with makers to refine prototype features.',
      'Run user feedback sessions with CIC members and partners.',
      'Support documentation and handoff for scaled implementation.',
    ],
    requirements: [
      'Portfolio or experience in product, industrial, or UX design.',
      'Creative problem solving with a sustainability mindset.',
      'Ability to communicate design decisions clearly.',
      'Comfort working on iterative prototype cycles.',
    ],
  },
  {
    id: 'intern-3',
    title: 'Community Engagement Intern',
    host: 'ReThink NGO',
    duration: '4 months',
    location: 'Freetown / Field',
    category: 'Community Outreach',
    stipend: '$380 / month',
    postedOn: 'Jul 10, 2026',
    deadline: 'Aug 20, 2026',
    slots: 1,
    tags: ['Community', 'Outreach', 'Events'],
    summary: 'Coordinate outreach campaigns and learning labs that connect CIC members with circular innovation activities.',
    description:
      'Lead member engagement initiatives, organize workshops, and support educational events that promote circular practices. This position is ideal for members who enjoy relationship-building and community advocacy.',
    responsibilities: [
      'Develop and promote engagement activities for CIC members.',
      'Support workshop planning, communications, and event logistics.',
      'Collect member feedback and improve future programming.',
      'Work with partner organizations to increase outreach impact.',
    ],
    requirements: [
      'Strong communication and community outreach skills.',
      'Interest in sustainable development and education.',
      'Ability to organize events and support volunteer teams.',
      'Comfort interacting with diverse community stakeholders.',
    ],
  },
]

const initialApplications = [
  {
    id: 'app-1',
    internshipId: 'intern-1',
    title: 'Sustainability Research Intern',
    host: 'EcoSphere Labs',
    appliedOn: 'Jul 24, 2026',
    status: 'Under review',
  },
  {
    id: 'app-2',
    internshipId: 'intern-3',
    title: 'Community Engagement Intern',
    host: 'ReThink NGO',
    appliedOn: 'Jul 12, 2026',
    status: 'Interview scheduled',
  },
]

export const fetchPublicInternships = () => delay(internshipPositions)

export const fetchInternshipById = (id) => delay(internshipPositions.find((position) => position.id === id))

export const fetchMemberInternships = () => delay(internshipPositions)

export const fetchMyApplications = () => delay(initialApplications)

export const submitInternshipApplication = (application) =>
  delay({
    success: true,
    id: `app-${Date.now()}`,
    status: 'Submitted',
    appliedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    ...application,
  })

export const fetchEmployerDashboard = () =>
  delay({
    activePositions: internshipPositions.length,
    openRoles: internshipPositions.reduce((sum, item) => sum + item.slots, 0),
    pendingApplications: 24,
    interviewsScheduled: 10,
    topEmployers: [
      { name: 'EcoSphere Labs', hires: 4, openRoles: 2 },
      { name: 'GreenTech Alliance', hires: 2, openRoles: 3 },
      { name: 'ReThink NGO', hires: 1, openRoles: 1 },
    ],
    recentApplications: [
      { id: 'app-31', candidate: 'Lina Koroma', role: 'Research Intern', employer: 'EcoSphere Labs', status: 'Pending' },
      { id: 'app-32', candidate: 'Yusif Kamara', role: 'Design Intern', employer: 'GreenTech Alliance', status: 'Shortlisted' },
      { id: 'app-33', candidate: 'Mariatu Bah', role: 'Engagement Intern', employer: 'ReThink NGO', status: 'Interview' },
    ],
    positions: internshipPositions,
  })
