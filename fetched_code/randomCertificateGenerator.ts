import { Certificate } from './supabase';

export async function generateRandomCertificate(): Promise<Certificate> {
  const firstNames = [
    'Michael', 'Sarah', 'David', 'Emily', 'James', 'Jessica', 'Robert', 'Jennifer',
    'William', 'Linda', 'Richard', 'Patricia', 'Christopher', 'Amanda', 'Daniel', 'Michelle',
    'Matthew', 'Elizabeth', 'Anthony', 'Mary', 'Mark', 'Nancy', 'Steven', 'Lisa',
    'Andrew', 'Karen', 'Joshua', 'Susan', 'Kenneth', 'Margaret', 'Kevin', 'Dorothy',
    'Brian', 'Sandra', 'George', 'Betty', 'Timothy', 'Ashley', 'Ronald', 'Kimberly',
    'Edward', 'Donna', 'Jason', 'Carol', 'Jeffrey', 'Rebecca', 'Ryan', 'Sharon',
    'Jacob', 'Cynthia', 'Gary', 'Kathleen', 'Nicholas', 'Angela', 'Eric', 'Shirley',
    'Jonathan', 'Brenda', 'Stephen', 'Anna', 'Larry', 'Pamela', 'Justin', 'Nicole',
    'Scott', 'Samantha', 'Brandon', 'Katherine', 'Benjamin', 'Christine', 'Samuel', 'Debra'
  ];

  const lastNames = [
    'Anderson', 'Thompson', 'Martinez', 'Richardson', 'Patterson', 'Coleman', 'Henderson', 'Morrison',
    'Foster', 'Hayes', 'Campbell', 'Bennett', 'Torres', 'Russell', 'Griffin', 'Wallace',
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Wilson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee',
    'White', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen',
    'King', 'Wright', 'Scott', 'Green', 'Adams', 'Baker', 'Hall', 'Rivera',
    'Mitchell', 'Carter', 'Roberts', 'Phillips', 'Evans', 'Turner', 'Collins', 'Edwards',
    'Stewart', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy',
    'Cooper', 'Bailey', 'Kelly', 'Howard', 'Ward', 'Cox', 'Richardson', 'Brooks'
  ];

  const universities = [
    'University of Texas at Austin', 'Stanford University', 'Harvard University',
    'Massachusetts Institute of Technology', 'University of California, Berkeley',
    'Columbia University', 'Yale University', 'Princeton University',
    'Duke University', 'Northwestern University', 'University of Michigan',
    'Cornell University', 'University of Pennsylvania', 'Georgetown University',
    'University of Chicago', 'Johns Hopkins University', 'Brown University',
    'Vanderbilt University', 'Rice University', 'Notre Dame University',
    'Washington University in St. Louis', 'Emory University', 'UC Los Angeles',
    'University of Southern California', 'Carnegie Mellon University', 'University of Virginia',
    'Georgia Institute of Technology', 'University of North Carolina', 'Boston University',
    'New York University', 'Tufts University', 'University of Wisconsin-Madison',
    'University of Florida', 'Ohio State University', 'Penn State University',
    'University of Washington', 'University of Illinois', 'Purdue University',
    'University of Maryland', 'University of Minnesota', 'Texas A&M University'
  ];

  const departments = [
    'College of Education', 'School of Education and Human Development', 'College of Liberal Arts',
    'Department of Curriculum and Instruction', 'School of Teaching and Learning', 'College of Arts and Sciences',
    'Graduate School of Education', 'School of Professional Studies', 'College of Continuing Education',
    'Department of Educational Studies', 'School of Business Education', 'Department of Educational Leadership',
    'College of Humanities', 'School of Social Sciences', 'Department of Mathematics Education',
    'School of Science Education', 'College of Fine Arts', 'Department of Language Education'
  ];

  const fieldsOfStudy = [
    'Business Administration', 'Educational Leadership', 'Computer Science',
    'Engineering Management', 'Healthcare Administration', 'Public Policy',
    'Data Science', 'Marketing Strategy', 'Finance and Economics', 'Human Resources Management',
    'Organizational Development', 'Information Systems', 'Educational Technology', 'Curriculum Development'
  ];

  const specializationOptions = [
    ['Principles of Management', 'Marketing Strategy', 'Financial Analysis'],
    ['Organizational Behavior', 'Strategic Planning', 'Operations Management'],
    ['Leadership Development', 'Project Management', 'Business Ethics'],
    ['Digital Marketing', 'Consumer Behavior', 'Brand Management'],
    ['Corporate Finance', 'Investment Analysis', 'Risk Management'],
    ['Data Analytics', 'Machine Learning', 'Business Intelligence'],
    ['Instructional Design', 'Assessment Methods', 'Classroom Management'],
    ['Educational Psychology', 'Curriculum Theory', 'Learning Technologies']
  ];

  const positionTitles = [
    'Clinical Professor', 'Associate Professor', 'Assistant Professor',
    'Senior Lecturer', 'Adjunct Professor', 'Distinguished Teaching Professor',
    'Visiting Professor', 'Research Professor', 'Professor of Practice'
  ];

  const deanNames = [
    'Dr. Margaret Chen', 'Dr. Robert Caldwell', 'Dr. Elizabeth Thornton',
    'Dr. Steven Harrison', 'Dr. Catherine Morgan', 'Dr. Thomas Bradford',
    'Dr. Jennifer Ramirez', 'Dr. Michael Sullivan', 'Dr. Patricia Foster',
    'Dr. David Richardson', 'Dr. Angela Martinez', 'Dr. William Cooper'
  ];

  const executiveNames = [
    'Dr. Gregory Fenves', 'Dr. Katherine Walsh', 'Dr. Alexander Bennett',
    'Dr. Victoria Chambers', 'Dr. Benjamin Howard', 'Dr. Sophia Mitchell',
    'Dr. Christopher Edwards', 'Dr. Amanda Phillips', 'Dr. Daniel Turner',
    'Dr. Rachel Armstrong', 'Dr. Jonathan Pierce', 'Dr. Laura Henderson'
  ];

  const executiveTitles = [
    'President', 'Provost', 'Executive Vice President', 'Vice President for Academic Affairs',
    'Chancellor', 'Vice Provost', 'Senior Vice President'
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const middleInitials = ['', 'A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'J.', 'K.', 'L.', 'M.', 'N.', 'P.', 'R.', 'S.', 'T.'];
  const hasMiddleInitial = Math.random() > 0.6;
  const middleInitial = hasMiddleInitial ? middleInitials[Math.floor(Math.random() * middleInitials.length)] : '';
  const name = middleInitial ? `${firstName} ${middleInitial} ${lastName}` : `${firstName} ${lastName}`;

  const university = universities[Math.floor(Math.random() * universities.length)];
  const department = departments[Math.floor(Math.random() * departments.length)];

  const certificateTypes = [
    'Teaching Certificate', 'Professional Certificate', 'Advanced Certificate',
    'Certificate of Completion', 'Graduate Certificate', 'Specialist Certificate',
    'Endorsement Certificate', 'Certification of Excellence'
  ];
  const certificateType = certificateTypes[Math.floor(Math.random() * certificateTypes.length)];

  const fieldOfStudy = fieldsOfStudy[Math.floor(Math.random() * fieldsOfStudy.length)];
  const specializations = specializationOptions[Math.floor(Math.random() * specializationOptions.length)];
  const positionTitle = positionTitles[Math.floor(Math.random() * positionTitles.length)];
  const deanName = deanNames[Math.floor(Math.random() * deanNames.length)];
  const executiveName = executiveNames[Math.floor(Math.random() * executiveNames.length)];
  const executiveTitle = executiveTitles[Math.floor(Math.random() * executiveTitles.length)];

  const year = new Date().getFullYear();
  const certNumberFormats = [
    () => `CERT-${year}-${Math.floor(Math.random() * 90000) + 10000}`,
    () => `TC${year}${Math.floor(Math.random() * 9000) + 1000}`,
    () => `${Math.floor(Math.random() * 9000000) + 1000000}`,
    () => `C-${year.toString().slice(2)}-${Math.floor(Math.random() * 900000) + 100000}`,
    () => `${year}${Math.floor(Math.random() * 900000) + 100000}`,
  ];
  const certNumber = certNumberFormats[Math.floor(Math.random() * certNumberFormats.length)]();

  const today = new Date();
  const yearOffset = Math.floor(Math.random() * 5);
  const monthOffset = Math.floor(Math.random() * 12);
  const issueDate = new Date(
    today.getFullYear() - yearOffset,
    monthOffset,
    Math.floor(Math.random() * 28) + 1
  );

  const description = `has successfully completed the requirements for teaching certification and is hereby authorized to teach in the field of ${fieldOfStudy}`;

  return {
    certificate_number: certNumber,
    issue_date: issueDate.toISOString().split('T')[0],
    recipient_name: name,
    university_name: university,
    school_department: department,
    certificate_type: certificateType,
    field_of_study: fieldOfStudy,
    specializations: specializations,
    position_title: positionTitle,
    description: description,
    dean_name: deanName,
    dean_title: `Dean, ${department}`,
    principal_name: executiveName,
    principal_title: `${executiveTitle}, ${university}`
  };
}
