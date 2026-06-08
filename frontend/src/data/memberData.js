const delay = (payload, time = 600) => new Promise((resolve) => setTimeout(() => resolve(payload), time))

export const fetchMemberDashboard = () =>
  delay({
    totalProjects: 12,
    eventsJoined: 8,
    certificatesEarned: 5,
    upcomingEvents: [
      {
        title: 'Circular Design Sprint',
        date: 'Aug 18, 2026',
        location: 'Hybrid',
        status: 'Confirmed',
      },
      {
        title: 'Climate Innovation Forum',
        date: 'Sep 06, 2026',
        location: 'Online',
        status: 'Registered',
      },
      {
        title: 'Green Coding Night',
        date: 'Oct 12, 2026',
        location: 'Campus Hub',
        status: 'Open',
      },
    ],
    activeProjects: [
      {
        name: 'Solar Upcycling Lab',
        role: 'Design Lead',
        completion: 72,
      },
      {
        name: 'Waste Management AI',
        role: 'Developer',
        completion: 58,
      },
      {
        name: 'Plastic-to-Fabric Initiative',
        role: 'Research Coordinator',
        completion: 33,
      },
    ],
  })

export const fetchMemberProfile = () =>
  delay({
    name: 'Amina Conteh',
    memberId: 'CIC-04281',
    membershipLevel: 'Gold',
    joined: 'Jan 15, 2025',
    email: 'amina@cic.club',
    phone: '+232 76 123 987',
    location: 'Freetown, Sierra Leone',
    bio: 'Innovator and circular design enthusiast helping CIC members build sustainable solutions that matter.',
    skills: ['Design Thinking', 'Community Outreach', 'Sustainability Strategy'],
    interests: ['Circular Systems', 'Social Impact', 'Green Tech'],
  })

export const fetchMembershipCard = () =>
  delay({
    name: 'Amina Conteh',
    memberId: 'CIC-04281',
    level: 'Gold',
    role: 'Community Innovator',
    organization: 'Circular Innovation Club',
    expiry: 'Dec 2027',
    joined: 'Jan 2025',
    email: 'amina@cic.club',
    phone: '+232 76 123 987',
    verificationUrl: 'https://cic.club/verify/CIC-04281',
    tierBenefits: ['Priority event access', 'Mentor pairing', 'Project funding support'],
  })

export const fetchAttendanceData = () =>
  delay({
    member: {
      name: 'Amina Conteh',
      memberId: 'CIC-04281',
      role: 'Community Innovator',
      email: 'amina@cic.club',
    },
    activeEvent: {
      eventId: 'event-2026-09',
      event: 'Climate Innovation Forum',
      date: 'Sep 06, 2026',
      location: 'Online',
      venue: 'Virtual Conference',
    },
    history: [
      {
        eventId: 'event-2026-08',
        event: 'Circular Design Sprint',
        date: 'Aug 18, 2026',
        location: 'Hybrid',
        status: 'Present',
        scannedAt: 'Aug 18, 2026 10:05 AM',
      },
      {
        eventId: 'event-2026-06',
        event: 'Green Hackathon',
        date: 'Jun 02, 2026',
        location: 'Campus Hub',
        status: 'Present',
        scannedAt: 'Jun 02, 2026 03:10 PM',
      },
      {
        eventId: 'event-2026-04',
        event: 'Spring Startup Summit',
        date: 'Apr 12, 2026',
        location: 'Conference Center',
        status: 'Absent',
        scannedAt: 'Apr 12, 2026 09:15 AM',
      },
    ],
  })

export const fetchMemberProjects = () =>
  delay([
    {
      name: 'Solar Upcycling Lab',
      role: 'Design Lead',
      status: 'In progress',
      progress: 72,
      updated: '2 days ago',
    },
    {
      name: 'Plastic-to-Fabric Initiative',
      role: 'Research Coordinator',
      status: 'Review',
      progress: 48,
      updated: '5 days ago',
    },
    {
      name: 'Waste Management AI',
      role: 'Developer',
      status: 'Planning',
      progress: 24,
      updated: '1 week ago',
    },
  ])

export const fetchMemberEvents = () =>
  delay([
    {
      title: 'Circular Design Sprint',
      date: 'Aug 18, 2026',
      location: 'Hybrid',
      status: 'Confirmed',
    },
    {
      title: 'Climate Innovation Forum',
      date: 'Sep 06, 2026',
      location: 'Online',
      status: 'Registered',
    },
    {
      title: 'Green Coding Night',
      date: 'Oct 12, 2026',
      location: 'Campus Hub',
      status: 'Open',
    },
  ])

export const fetchVotingItems = () =>
  delay([
    {
      id: 'election-1',
      type: 'Leadership Council Election',
      title: 'CIC Leadership Council',
      stage: 'Voting',
      deadline: 'Aug 26, 2026',
      description: 'Choose the Leadership Council members who will steer CIC strategy, mentorship, and sustainability programs.',
      totalVotes: 248,
      candidates: [
        {
          id: 'candidate-1',
          name: 'Amina Conteh',
          role: 'Community Advocate',
          initials: 'AC',
          experience: '8 years of member engagement',
          statement: 'I will expand member-led innovation labs with inclusive roundtables and hands-on support.',
          votes: 92,
        },
        {
          id: 'candidate-2',
          name: 'Kofi Adu',
          role: 'Sustainability Strategist',
          initials: 'KA',
          experience: '10 years in circular systems',
          statement: 'I will bring resource-efficient programs and mentorship for eco-design teams.',
          votes: 76,
        },
        {
          id: 'candidate-3',
          name: 'Lula Kamara',
          role: 'Innovation Mentor',
          initials: 'LK',
          experience: '6 years leading startup workshops',
          statement: 'I will increase access to funding and networking for emerging green founders.',
          votes: 80,
        },
      ],
    },
    {
      id: 'election-2',
      type: 'Mentorship Committee',
      title: 'Mentorship Steering Committee',
      stage: 'Results',
      deadline: 'Sep 05, 2026',
      description: 'Review the final results for the mentorship committee election and see which candidates will guide new coaching streams.',
      totalVotes: 198,
      candidates: [
        {
          id: 'candidate-4',
          name: 'Fatmata Sesay',
          role: 'Peer Coach',
          initials: 'FS',
          experience: '7 years supporting member growth',
          statement: 'I will launch weekly skill-building clinics and match members with expert mentors.',
          votes: 72,
        },
        {
          id: 'candidate-5',
          name: 'Musa Conteh',
          role: 'Program Lead',
          initials: 'MC',
          experience: '9 years managing collaborative programs',
          statement: 'I will empower mentees through focused cohorts and milestone-based review sessions.',
          votes: 64,
        },
        {
          id: 'candidate-6',
          name: 'Sia Kamara',
          role: 'Learning Champion',
          initials: 'SK',
          experience: '5 years designing learning journeys',
          statement: 'I will create mentorship tracks for creative impact projects and sustainable product design.',
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
      description: 'Nominations are open for the operations panel that will guide CIC sustainability initiatives and member operations.',
      totalVotes: 0,
      candidates: [
        {
          id: 'candidate-7',
          name: 'Mariatu Kamara',
          role: 'Design Operations',
          initials: 'MK',
          experience: '4 years managing field programs',
          statement: 'I will help recruit talented partners and streamline operational workflows for CIC projects.',
          votes: 0,
        },
        {
          id: 'candidate-8',
          name: 'Nadia Mansaray',
          role: 'Community Coordinator',
          initials: 'NM',
          experience: '5 years growing local engagement',
          statement: 'I will strengthen member communication and deliver transparent decision-making support.',
          votes: 0,
        },
      ],
    },
  ])

export const fetchCertificates = () =>
  delay([
    {
      title: 'Circular Design Workshop',
      issuer: 'CIC Academy',
      date: 'Apr 2026',
      certificateId: 'CIC-CRT-2026-009',
    },
    {
      title: 'Sustainability Sprint',
      issuer: 'CIC Events',
      date: 'May 2026',
      certificateId: 'CIC-CRT-2026-014',
    },
  ])

export const fetchNotifications = () =>
  delay([
    {
      id: 'note-1',
      title: 'Project pitch accepted',
      message: 'Your Solar Upcycling Lab proposal was accepted by the review panel.',
      date: 'Jul 30, 2026',
      type: 'success',
    },
    {
      id: 'note-2',
      title: 'Event reminder',
      message: 'Circular Design Sprint starts in 3 days. Confirm your attendance if you have not already done so.',
      date: 'Jul 27, 2026',
      type: 'info',
    },
    {
      id: 'note-3',
      title: 'Certificate ready',
      message: 'Your Sustainability Sprint certificate is available for download.',
      date: 'Jul 18, 2026',
      type: 'success',
    },
  ])
