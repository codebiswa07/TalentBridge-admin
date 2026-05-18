// Keys matching the job-portal app
export const KEYS = {
  USERS: 'jp_users',
  JOBS: 'jp_jobs',
  APPLICATIONS: 'jp_applications',
}

export const read = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || [] }
  catch { return [] }
}

export const write = (key, val) => localStorage.setItem(key, JSON.stringify(val))

// ── seed rich demo data if job-portal hasn't run yet ──────────────────────────
export const ensureData = () => {
  if (read(KEYS.JOBS).length > 0) return          // already seeded

  const JOBS = [
    { id:'j1', employerId:'e1', title:'Senior Frontend Engineer', company:'Nexus Technologies', location:'Bangalore', type:'Full-time', salary:'₹18–28 LPA', category:'Engineering', description:'Lead UI architecture.', requirements:['React','TypeScript'], postedAt: ago(2), logo:'⚡', status:'active' },
    { id:'j2', employerId:'e1', title:'Product Designer', company:'Bloom Studio', location:'Remote', type:'Full-time', salary:'₹12–20 LPA', category:'Design', description:'Design beautiful products.', requirements:['Figma','Research'], postedAt: ago(5), logo:'🌸', status:'active' },
    { id:'j3', employerId:'e2', title:'Backend Engineer — Node.js', company:'DataStream Inc.', location:'Hyderabad', type:'Full-time', salary:'₹15–24 LPA', category:'Engineering', description:'Build microservices.', requirements:['Node.js','PostgreSQL'], postedAt: ago(1), logo:'🔷', status:'active' },
    { id:'j4', employerId:'e2', title:'Growth Marketing Manager', company:'Pebble Commerce', location:'Mumbai', type:'Full-time', salary:'₹10–16 LPA', category:'Marketing', description:'Drive acquisition.', requirements:['SEO','Analytics'], postedAt: ago(8), logo:'🛍️', status:'closed' },
    { id:'j5', employerId:'e3', title:'ML Engineer', company:'Cognify AI', location:'Pune', type:'Full-time', salary:'₹20–35 LPA', category:'AI/ML', description:'Build prod ML systems.', requirements:['Python','PyTorch'], postedAt: ago(3), logo:'🤖', status:'active' },
    { id:'j6', employerId:'e3', title:'DevOps Engineer', company:'CloudRoot', location:'Chennai', type:'Contract', salary:'₹14–22 LPA', category:'Engineering', description:'Manage K8s clusters.', requirements:['Kubernetes','Terraform'], postedAt: ago(6), logo:'☁️', status:'active' },
    { id:'j7', employerId:'e4', title:'Data Analyst', company:'InsightCo', location:'Delhi', type:'Full-time', salary:'₹8–14 LPA', category:'Data', description:'Derive insights from data.', requirements:['SQL','Python','Tableau'], postedAt: ago(4), logo:'📊', status:'active' },
    { id:'j8', employerId:'e4', title:'Product Manager', company:'LaunchPad', location:'Bangalore', type:'Full-time', salary:'₹22–38 LPA', category:'Product', description:'Own the product roadmap.', requirements:['Roadmapping','Agile','Stakeholder mgmt'], postedAt: ago(7), logo:'🚀', status:'active' },
    { id:'j9', employerId:'e5', title:'Sales Executive', company:'BridgeSales', location:'Mumbai', type:'Full-time', salary:'₹6–10 LPA', category:'Sales', description:'Drive B2B sales pipeline.', requirements:['Prospecting','CRM','Negotiation'], postedAt: ago(10), logo:'💼', status:'closed' },
    { id:'j10', employerId:'e5', title:'UI/UX Designer', company:'PixelCraft', location:'Remote', type:'Part-time', salary:'₹8–12 LPA', category:'Design', description:'Create stunning interfaces.', requirements:['Figma','Prototyping'], postedAt: ago(2), logo:'🎨', status:'active' },
  ]

  const USERS = [
    { id:'e1', name:'Priya Sharma',   email:'priya@nexus.com',    role:'employer', joinedAt: ago(30) },
    { id:'e2', name:'Rohan Mehta',    email:'rohan@datastream.io', role:'employer', joinedAt: ago(25) },
    { id:'e3', name:'Ananya Iyer',    email:'ananya@cognify.ai',   role:'employer', joinedAt: ago(20) },
    { id:'e4', name:'Karan Joshi',    email:'karan@launchpad.in',  role:'employer', joinedAt: ago(15) },
    { id:'e5', name:'Meera Nair',     email:'meera@bridge.com',    role:'employer', joinedAt: ago(12) },
    { id:'c1', name:'Arjun Reddy',    email:'arjun@gmail.com',     role:'candidate', joinedAt: ago(18) },
    { id:'c2', name:'Sanya Kapoor',   email:'sanya@gmail.com',     role:'candidate', joinedAt: ago(14) },
    { id:'c3', name:'Dev Patel',      email:'dev@outlook.com',     role:'candidate', joinedAt: ago(10) },
    { id:'c4', name:'Nisha Gupta',    email:'nisha@yahoo.com',     role:'candidate', joinedAt: ago(8) },
    { id:'c5', name:'Vikram Singh',   email:'vikram@gmail.com',    role:'candidate', joinedAt: ago(6) },
    { id:'c6', name:'Pooja Verma',    email:'pooja@gmail.com',     role:'candidate', joinedAt: ago(4) },
    { id:'c7', name:'Aarav Shah',     email:'aarav@gmail.com',     role:'candidate', joinedAt: ago(3) },
  ]

  const APPLICATIONS = [
    { id:'a1',  jobId:'j1', candidateId:'c1', candidateName:'Arjun Reddy',   candidateEmail:'arjun@gmail.com',  appliedAt: ago(1), status:'Pending',     coverLetter:'I am passionate about frontend.' },
    { id:'a2',  jobId:'j1', candidateId:'c2', candidateName:'Sanya Kapoor',  candidateEmail:'sanya@gmail.com',  appliedAt: ago(2), status:'Shortlisted', coverLetter:'5 years of React experience.' },
    { id:'a3',  jobId:'j1', candidateId:'c3', candidateName:'Dev Patel',     candidateEmail:'dev@outlook.com',  appliedAt: ago(3), status:'Rejected',    coverLetter:'Looking for frontend opportunities.' },
    { id:'a4',  jobId:'j2', candidateId:'c4', candidateName:'Nisha Gupta',   candidateEmail:'nisha@yahoo.com',  appliedAt: ago(1), status:'Pending',     coverLetter:'Product designer with 4 yrs exp.' },
    { id:'a5',  jobId:'j2', candidateId:'c5', candidateName:'Vikram Singh',  candidateEmail:'vikram@gmail.com', appliedAt: ago(2), status:'Shortlisted', coverLetter:'Figma expert.' },
    { id:'a6',  jobId:'j3', candidateId:'c1', candidateName:'Arjun Reddy',   candidateEmail:'arjun@gmail.com',  appliedAt: ago(1), status:'Pending',     coverLetter:'Backend Node dev.' },
    { id:'a7',  jobId:'j3', candidateId:'c6', candidateName:'Pooja Verma',   candidateEmail:'pooja@gmail.com',  appliedAt: ago(2), status:'Pending',     coverLetter:'3 yrs backend experience.' },
    { id:'a8',  jobId:'j5', candidateId:'c2', candidateName:'Sanya Kapoor',  candidateEmail:'sanya@gmail.com',  appliedAt: ago(1), status:'Shortlisted', coverLetter:'ML engineer with PyTorch expertise.' },
    { id:'a9',  jobId:'j5', candidateId:'c7', candidateName:'Aarav Shah',    candidateEmail:'aarav@gmail.com',  appliedAt: ago(2), status:'Pending',     coverLetter:'AI/ML background from IIT.' },
    { id:'a10', jobId:'j6', candidateId:'c3', candidateName:'Dev Patel',     candidateEmail:'dev@outlook.com',  appliedAt: ago(1), status:'Pending',     coverLetter:'DevOps 3 years.' },
    { id:'a11', jobId:'j7', candidateId:'c4', candidateName:'Nisha Gupta',   candidateEmail:'nisha@yahoo.com',  appliedAt: ago(3), status:'Shortlisted', coverLetter:'Data analyst 2 years.' },
    { id:'a12', jobId:'j8', candidateId:'c5', candidateName:'Vikram Singh',  candidateEmail:'vikram@gmail.com', appliedAt: ago(2), status:'Pending',     coverLetter:'Product background.' },
    { id:'a13', jobId:'j10',candidateId:'c6', candidateName:'Pooja Verma',   candidateEmail:'pooja@gmail.com',  appliedAt: ago(1), status:'Pending',     coverLetter:'UI/UX with 2 years.' },
  ]

  write(KEYS.JOBS, JOBS)
  write(KEYS.USERS, USERS)
  write(KEYS.APPLICATIONS, APPLICATIONS)
}

function ago(days) {
  return new Date(Date.now() - days * 86400000).toISOString()
}
