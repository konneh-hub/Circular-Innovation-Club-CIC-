const delay = (payload, time = 600) => new Promise((resolve) => setTimeout(() => resolve(payload), time))

export const fetchAdminDashboard = () =>
  delay({
    totalMembers: 1240,
    activeProjects: 68,
    upcomingEvents: 14,
    competitions: 5,
    fundingRequests: 12,
    internshipOpportunities: 18,
    monthlySummary: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      projects: [35, 42, 47, 50, 56, 61, 68],
      events: [6, 8, 9, 10, 11, 13, 14],
      fundingRequests: [4, 5, 7, 8, 9, 11, 12],
      internships: [9, 10, 12, 13, 15, 17, 18],
    },
    reportBreakdown: {
      labels: ['Funding', 'Projects', 'Events', 'Internships', 'Sustainability'],
      values: [22, 18, 14, 12, 10],
    },
    recentItems: [
      { label: 'New project approval', value: 'Solar Upcycling Lab', type: 'project' },
      { label: 'Member onboarding', value: '72 new members', type: 'member' },
      { label: 'Funding review', value: '3 pending requests', type: 'funding' },
    ],
  })

export const fetchAdminMembers = () =>
  delay([
    { name: 'Amina Conteh', status: 'Active', joined: 'Jan 2025', role: 'Project Lead' },
    { name: 'Nadia Mansaray', status: 'Active', joined: 'Mar 2025', role: 'Community Manager' },
    { name: 'Kofi Adu', status: 'Pending', joined: 'Jul 2026', role: 'Event Coordinator' },
    { name: 'Fatmata Sesay', status: 'Suspended', joined: 'Feb 2024', role: 'Research Partner' },
  ])

export const fetchAdminProjects = () =>
  delay([
    {
      id: 'project-1',
      name: 'Solar Upcycling Lab',
      category: 'Energy',
      description: 'Develop sustainable solar recycling solutions with CIC members and partners to reduce electronic waste.',
      manager: 'Amina Conteh',
      stage: 'Execution',
      status: 'Active',
      progress: 72,
      deadline: 'Nov 2026',
      members: [
        { name: 'Amina Conteh', role: 'Project Lead' },
        { name: 'Nadia Mansaray', role: 'Research Partner' },
        { name: 'Kofi Adu', role: 'Systems Engineer' },
      ],
      files: [
        { id: 'file-1', name: 'project-charter.pdf', type: 'PDF', uploaded: 'Jun 02, 2026' },
        { id: 'file-2', name: 'prototype-specs.docx', type: 'DOCX', uploaded: 'Jun 12, 2026' },
      ],
      milestones: [
        { title: 'Requirements approved', progress: '100%', status: 'Completed' },
        { title: 'Prototype launch', progress: '72%', status: 'In progress' },
        { title: 'Community demo', progress: '0%', status: 'Upcoming' },
      ],
    },
    {
      id: 'project-2',
      name: 'Green Coding Night',
      category: 'Education',
      description: 'Host a collaborative coding event focused on circular design, sustainability and community innovation.',
      manager: 'Kofi Adu',
      stage: 'Planning',
      status: 'Upcoming',
      progress: 24,
      deadline: 'Sep 2026',
      members: [
        { name: 'Kofi Adu', role: 'Event Coordinator' },
        { name: 'Fatmata Sesay', role: 'Outreach Lead' },
      ],
      files: [
        { id: 'file-3', name: 'event-plan.pdf', type: 'PDF', uploaded: 'Jun 09, 2026' },
      ],
      milestones: [
        { title: 'Venue confirmed', progress: '100%', status: 'Completed' },
        { title: 'Agenda finalized', progress: '30%', status: 'In progress' },
      ],
    },
    {
      id: 'project-3',
      name: 'Waste Management AI',
      category: 'Research',
      description: 'Build an AI-driven waste sorting tool for community recycling centers in Sierra Leone.',
      manager: 'Nadia Mansaray',
      stage: 'Design',
      status: 'Active',
      progress: 58,
      deadline: 'Dec 2026',
      members: [
        { name: 'Nadia Mansaray', role: 'Data Lead' },
        { name: 'Amina Conteh', role: 'Product Owner' },
      ],
      files: [
        { id: 'file-4', name: 'data-schema.xlsx', type: 'XLSX', uploaded: 'May 28, 2026' },
        { id: 'file-5', name: 'ai-roadmap.pdf', type: 'PDF', uploaded: 'Jun 03, 2026' },
      ],
      milestones: [
        { title: 'Research completed', progress: '80%', status: 'In progress' },
        { title: 'Model training', progress: '30%', status: 'In progress' },
      ],
    },
  ])

export const fetchAdminEvents = () =>
  delay([
    {
      id: 'event-1',
      title: 'Circular Design Sprint',
      date: 'Aug 18, 2026',
      location: 'Hybrid',
      type: 'Workshop',
      status: 'Open',
      capacity: 90,
      description: 'A weekend sprint to design sustainable product concepts for local communities.',
      registrations: [
        { id: 'reg-1', name: 'Amina Conteh', email: 'amina@cic.club', status: 'Registered' },
        { id: 'reg-2', name: 'Kofi Adu', email: 'kofi@cic.club', status: 'Registered' },
      ],
      attendance: [
        { id: 'att-1', name: 'Amina Conteh', status: 'Checked in' },
      ],
      certificates: [
        { id: 'cert-1', recipient: 'Amina Conteh', issued: 'Aug 20, 2026', status: 'Issued' },
      ],
    },
    {
      id: 'event-2',
      title: 'Climate Innovation Forum',
      date: 'Sep 06, 2026',
      location: 'Online',
      type: 'Forum',
      status: 'Confirmed',
      capacity: 200,
      description: 'A forum to showcase climate solutions from student teams and partners.',
      registrations: [
        { id: 'reg-3', name: 'Nadia Mansaray', email: 'nadia@cic.club', status: 'Registered' },
        { id: 'reg-4', name: 'Fatmata Sesay', email: 'fatmata@cic.club', status: 'Registered' },
      ],
      attendance: [
        { id: 'att-2', name: 'Nadia Mansaray', status: 'Checked in' },
        { id: 'att-3', name: 'Fatmata Sesay', status: 'Checked in' },
      ],
      certificates: [
        { id: 'cert-2', recipient: 'Nadia Mansaray', issued: 'Sep 07, 2026', status: 'Issued' },
      ],
    },
    {
      id: 'event-3',
      title: 'Green Coding Night',
      date: 'Oct 12, 2026',
      location: 'Campus Hub',
      type: 'Hackathon',
      status: 'Registration',
      capacity: 120,
      description: 'An evening of collaborative coding focused on circular innovation challenges.',
      registrations: [
        { id: 'reg-5', name: 'Diallo Sesay', email: 'diallo@cic.club', status: 'Registered' },
      ],
      attendance: [],
      certificates: [],
    },
  ])

export const fetchAdminCompetitions = () =>
  delay([
    {
      id: 'competition-1',
      title: 'CIC Impact Challenge',
      category: 'Sustainability',
      prize: '$15,000 + mentorship',
      deadline: 'Aug 30, 2026',
      status: 'Review',
      description: 'Teams submit circular innovation proposals to advance waste reduction, material reuse, and community resilience.',
      registrationTeams: [
        { id: 'team-1', teamName: 'Eco Builders', lead: 'Amina Conteh', status: 'Registered', registeredAt: 'Jul 21, 2026' },
        { id: 'team-2', teamName: 'Green Loop', lead: 'Nadia Mansaray', status: 'Registered', registeredAt: 'Jul 23, 2026' },
      ],
      submissions: [
        { id: 'submission-1', title: 'Eco Builders pitch deck', team: 'Eco Builders', fileName: 'eco-builders-pitch.pdf', uploaded: 'Aug 01, 2026', status: 'Received' },
      ],
      judges: [
        { id: 'judge-1', name: 'Dr. Mariatu Kamara', expertise: 'Circular Design', assigned: true },
        { id: 'judge-2', name: 'Professor Musa Conteh', expertise: 'Sustainable Business', assigned: false },
      ],
      scores: [
        { id: 'score-1', teamName: 'Eco Builders', judgeName: 'Dr. Mariatu Kamara', score: 88, notes: 'Strong feasibility and impact.' },
      ],
      winner: null,
    },
    {
      id: 'competition-2',
      title: 'Material Reuse Sprint',
      category: 'Design',
      prize: '$8,000 + pilot support',
      deadline: 'Sep 14, 2026',
      status: 'Open',
      description: 'Rapid team innovation to reuse local materials in product and packaging design.',
      registrationTeams: [
        { id: 'team-3', teamName: 'Renew Crew', lead: 'Fatmata Sesay', status: 'Registered', registeredAt: 'Jul 27, 2026' },
      ],
      submissions: [],
      judges: [
        { id: 'judge-3', name: 'Mr. Kofi Yoon', expertise: 'Product Innovation', assigned: false },
        { id: 'judge-4', name: 'Ms. Lula Kamara', expertise: 'Materials Engineering', assigned: false },
      ],
      scores: [],
      winner: null,
    },
    {
      id: 'competition-3',
      title: 'Eco Design Showcase',
      category: 'Technology',
      prize: '$5,000 + investor matchmaking',
      deadline: 'Nov 05, 2026',
      status: 'Open',
      description: 'Present demonstrators that use circular systems to solve real-world sustainability challenges.',
      registrationTeams: [],
      submissions: [],
      judges: [
        { id: 'judge-5', name: 'Dr. Sia Kamara', expertise: 'Impact Evaluation', assigned: false },
      ],
      scores: [],
      winner: null,
    },
  ])

export const fetchAdminElections = () =>
  delay([
    {
      id: 'election-1',
      type: 'Leadership Council',
      title: 'Leadership Council Election',
      stage: 'Voting',
      deadline: 'Aug 26, 2026',
      description: 'Choose the CIC Leadership Council members who will guide community strategy, mentorship, and sustainable growth.',
      totalVotes: 248,
      candidates: [
        {
          id: 'candidate-1',
          name: 'Amina Conteh',
          role: 'Community Advocate',
          initials: 'AC',
          experience: '8 years of member-led initiative support',
          statement: 'I will prioritize inclusive leadership, member-led labs, and transparent decision-making.',
          votes: 92,
        },
        {
          id: 'candidate-2',
          name: 'Kofi Adu',
          role: 'Sustainability Strategist',
          initials: 'KA',
          experience: '10 years in circular systems design',
          statement: 'I will grow CIC’s sustainable innovation pipeline and funding partnerships.',
          votes: 76,
        },
        {
          id: 'candidate-3',
          name: 'Lula Kamara',
          role: 'Innovation Mentor',
          initials: 'LK',
          experience: '6 years coaching impact teams',
          statement: 'I will expand mentorship access and support early-stage impact projects.',
          votes: 80,
        },
      ],
    },
    {
      id: 'election-2',
      type: 'Mentorship Committee',
      title: 'Mentorship Committee Election',
      stage: 'Results',
      deadline: 'Sep 05, 2026',
      description: 'Finalize the mentorship committee members who will support new CIC cohorts and learning programs.',
      totalVotes: 198,
      candidates: [
        {
          id: 'candidate-4',
          name: 'Fatmata Sesay',
          role: 'Peer Coach',
          initials: 'FS',
          experience: '7 years building learning communities',
          statement: 'I will launch cohort-based coaching sessions and mentor matching for creative teams.',
          votes: 72,
        },
        {
          id: 'candidate-5',
          name: 'Musa Conteh',
          role: 'Program Lead',
          initials: 'MC',
          experience: '9 years managing collaborative programs',
          statement: 'I will strengthen learning pathways for sustainability and circular design projects.',
          votes: 64,
        },
        {
          id: 'candidate-6',
          name: 'Sia Kamara',
          role: 'Learning Champion',
          initials: 'SK',
          experience: '5 years designing education programs',
          statement: 'I will help members build project skills through mentorship and hands-on workshops.',
          votes: 62,
        },
      ],
    },
    {
      id: 'election-3',
      type: 'Operations Panel',
      title: 'Sustainability Operations Panel',
      stage: 'Nomination',
      deadline: 'Oct 10, 2026',
      description: 'Nominations are open for the operations panel that will shape CIC sustainability programs and impact operations.',
      totalVotes: 0,
      candidates: [
        {
          id: 'candidate-7',
          name: 'Mariatu Kamara',
          role: 'Design Operations',
          initials: 'MK',
          experience: '4 years managing community programs',
          statement: 'I will streamline CIC operations and build stronger member collaboration systems.',
          votes: 0,
        },
        {
          id: 'candidate-8',
          name: 'Nadia Mansaray',
          role: 'Community Coordinator',
          initials: 'NM',
          experience: '5 years growing engagement networks',
          statement: 'I will improve communications and make election participation more accessible.',
          votes: 0,
        },
      ],
    },
  ])

export const fetchAdminFunding = () =>
  delay({
    totalBudget: 65000,
    usedBudget: 32250,
    remainingBudget: 32750,
    fundingRequests: [
      {
        id: 'fund-1',
        project: 'Eco Packaging Lab',
        amount: 12000,
        requestedBy: 'Fatmata Sesay',
        status: 'Review',
        requestedOn: 'Jul 12, 2026',
        purpose: 'Local material testing and design prototyping',
      },
      {
        id: 'fund-2',
        project: 'Solar Upcycling Lab',
        amount: 8500,
        requestedBy: 'Amina Conteh',
        status: 'Approved',
        requestedOn: 'Jun 28, 2026',
        purpose: 'Final build and community prototype launch',
      },
      {
        id: 'fund-3',
        project: 'Green Infrastructure',
        amount: 15000,
        requestedBy: 'Kofi Adu',
        status: 'Pending',
        requestedOn: 'Jul 20, 2026',
        purpose: 'Small-scale urban sustainability pilots',
      },
    ],
    spendingTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      values: [5200, 4300, 6100, 7300, 6800, 5900, 6750],
    },
    expenseSummary: [
      { label: 'Operations', value: 39 },
      { label: 'Events', value: 27 },
      { label: 'Research', value: 18 },
      { label: 'Marketing', value: 16 },
    ],
    expenses: [
      { id: 'exp-1', category: 'Materials', item: 'Recycled packaging supplies', amount: 4200, date: 'Jul 18, 2026', status: 'Paid' },
      { id: 'exp-2', category: 'Venue', item: 'Community workshop hall', amount: 2800, date: 'Jul 09, 2026', status: 'Paid' },
      { id: 'exp-3', category: 'Travel', item: 'Partner site visits', amount: 1800, date: 'Jun 30, 2026', status: 'Pending' },
      { id: 'exp-4', category: 'Equipment', item: 'Solar testing kits', amount: 3600, date: 'Jun 22, 2026', status: 'Approved' },
    ],
    sponsors: [
      { id: 'sp-1', name: 'EcoSphere Labs', contribution: '$18,000', status: 'Active' },
      { id: 'sp-2', name: 'Circular Venture Fund', contribution: '$12,500', status: 'Active' },
      { id: 'sp-3', name: 'GreenTech Alliance', contribution: '$7,000', status: 'Pending' },
    ],
    reports: [
      { id: 'rep-1', title: 'Quarterly funding review', status: 'Ready', updated: 'Jul 24, 2026' },
      { id: 'rep-2', title: 'Sponsor engagement analysis', status: 'Draft', updated: 'Jul 18, 2026' },
      { id: 'rep-3', title: 'Budget utilization summary', status: 'In review', updated: 'Jul 22, 2026' },
    ],
  })

export const fetchAdminPartners = () =>
  delay([
    { name: 'EcoSphere Labs', type: 'Research', status: 'Active' },
    { name: 'Circular Venture Fund', type: 'Funding', status: 'Pending' },
    { name: 'GreenTech Alliance', type: 'Operations', status: 'Active' },
  ])

export const fetchAdminInternships = () =>
  delay([
    { title: 'Sustainability Research Intern', location: 'Remote', applicants: 24, status: 'Open' },
    { title: 'Project Operations Intern', location: 'Freetown', applicants: 16, status: 'Open' },
  ])

export const fetchAdminSustainability = () =>
  delay({
    totals: {
      treesPlanted: 12400,
      wasteRecycled: 58.3,
      communityReach: 18500,
      carbonReduced: 4750,
      activeProjects: 7,
    },
    impactTrends: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          name: 'Trees planted',
          values: [1200, 1380, 1490, 1610, 1720, 1830, 1900],
          suffix: 'trees',
          color: 'emerald',
        },
        {
          name: 'Waste recycled',
          values: [4.5, 5.2, 6.0, 6.8, 7.4, 8.1, 8.3],
          suffix: 't',
          color: 'sky',
        },
        {
          name: 'Carbon reduced',
          values: [520, 610, 690, 740, 810, 900, 980],
          suffix: 'kg',
          color: 'amber',
        },
      ],
    },
    projects: [
      {
        id: 'sust-1',
        title: 'Urban tree planting campaign',
        impact: '2,700 trees planted',
        progress: 84,
        status: 'In progress',
      },
      {
        id: 'sust-2',
        title: 'Community recycling hub',
        impact: '58 tonnes diverted',
        progress: 67,
        status: 'Active',
      },
      {
        id: 'sust-3',
        title: 'Carbon offset workshops',
        impact: '4,750 kg reduced',
        progress: 52,
        status: 'Planning',
      },
    ],
    communityInsights: [
      { label: 'Member workshops', value: '22', detail: 'Hands-on sustainability sessions' },
      { label: 'Partner sites', value: '14', detail: 'Recycling and research partners' },
      { label: 'Volunteer hours', value: '1,280', detail: 'Community contribution this term' },
    ],
    initiatives: [
      { title: 'Plastic-to-Fabric lab', progress: '82%' },
      { title: 'Circular Labs expansion', progress: '56%' },
      { title: 'Peer-led climate coaching', progress: '71%' },
    ],
    achievements: [
      { title: 'Community clean-up sprint', value: '1,200 kg collected' },
      { title: 'Renewable sourcing pilot', value: '65% of materials' },
      { title: 'Impact fellowship launched', value: '18 new leaders' },
    ],
  })

export const fetchAdminReports = () =>
  delay({
    overview: [
      { title: 'Member growth', value: '14% increase' },
      { title: 'Project approvals', value: '9 this month' },
      { title: 'Event attendance', value: '1,280 attendees' },
    ],
    reportItems: [
      { title: 'Quarterly operations report', status: 'Ready' },
      { title: 'Funding audit summary', status: 'In review' },
    ],
  })

export const fetchAdminSettings = () =>
  delay({
    account: { adminName: 'CIC Admin', email: 'admin@cic.club' },
    preferences: [
      { label: 'Receive event alerts', enabled: true },
      { label: 'Enable member approvals', enabled: true },
      { label: 'Show development insights', enabled: false },
    ],
  })
