import { Paystub, Deduction } from './supabase';

export async function generateRandomPaystub(): Promise<Paystub> {
  const randomSalary = Math.floor(Math.random() * 4500) + 2000;
  const grossCurrent = parseFloat(randomSalary.toFixed(2));

  const payPeriodsPerYear = [24, 26, 12, 52];
  const randomPayPeriods = payPeriodsPerYear[Math.floor(Math.random() * payPeriodsPerYear.length)];
  const payPeriodsSoFar = Math.floor(Math.random() * randomPayPeriods) + 1;
  const grossYTD = parseFloat((grossCurrent * payPeriodsSoFar).toFixed(2));

  const federalTaxRate = 0.10 + Math.random() * 0.15;
  const stateTaxRate = 0.02 + Math.random() * 0.06;
  const federalTax = parseFloat((grossCurrent * federalTaxRate).toFixed(2));
  const stateTax = parseFloat((grossCurrent * stateTaxRate).toFixed(2));
  const socialSecurity = parseFloat((grossCurrent * 0.062).toFixed(2));
  const medicare = parseFloat((grossCurrent * 0.0145).toFixed(2));

  const has401k = Math.random() > 0.3;
  const retirement401kRate = has401k ? (0.03 + Math.random() * 0.07) : 0;
  const retirement401k = parseFloat((grossCurrent * retirement401kRate).toFixed(2));

  const healthInsurance = parseFloat((Math.random() * 250 + 80).toFixed(2));
  const dentalInsurance = parseFloat((Math.random() * 50 + 15).toFixed(2));
  const visionInsurance = Math.random() > 0.6 ? parseFloat((Math.random() * 20 + 8).toFixed(2)) : 0;
  const lifeInsurance = Math.random() > 0.5 ? parseFloat((Math.random() * 30 + 10).toFixed(2)) : 0;

  const deductions: Deduction[] = [
    { description: 'Federal Income Tax', current: `$${federalTax.toFixed(2)}`, ytd: `$${(federalTax * payPeriodsSoFar).toFixed(2)}` },
    { description: 'State Income Tax', current: `$${stateTax.toFixed(2)}`, ytd: `$${(stateTax * payPeriodsSoFar).toFixed(2)}` },
    { description: 'Social Security (OASDI)', current: `$${socialSecurity.toFixed(2)}`, ytd: `$${(socialSecurity * payPeriodsSoFar).toFixed(2)}` },
    { description: 'Medicare', current: `$${medicare.toFixed(2)}`, ytd: `$${(medicare * payPeriodsSoFar).toFixed(2)}` },
    ...(has401k ? [{ description: '401(k) Retirement', current: `$${retirement401k.toFixed(2)}`, ytd: `$${(retirement401k * payPeriodsSoFar).toFixed(2)}` }] : []),
    { description: 'Health Insurance', current: `$${healthInsurance.toFixed(2)}`, ytd: `$${(healthInsurance * payPeriodsSoFar).toFixed(2)}` },
    { description: 'Dental Insurance', current: `$${dentalInsurance.toFixed(2)}`, ytd: `$${(dentalInsurance * payPeriodsSoFar).toFixed(2)}` },
    ...(visionInsurance > 0 ? [{ description: 'Vision Insurance', current: `$${visionInsurance.toFixed(2)}`, ytd: `$${(visionInsurance * payPeriodsSoFar).toFixed(2)}` }] : []),
    ...(lifeInsurance > 0 ? [{ description: 'Life Insurance', current: `$${lifeInsurance.toFixed(2)}`, ytd: `$${(lifeInsurance * payPeriodsSoFar).toFixed(2)}` }] : [])
  ];

  const totalDeductionsCurrent = federalTax + stateTax + socialSecurity + medicare + retirement401k + healthInsurance + dentalInsurance + visionInsurance + lifeInsurance;
  const totalDeductionsYTD = totalDeductionsCurrent * payPeriodsSoFar;
  const netPayCurrent = grossCurrent - totalDeductionsCurrent;
  const netPayYTD = grossYTD - totalDeductionsYTD;

  const firstNames = [
    'James', 'Mary', 'Michael', 'Patricia', 'Robert', 'Jennifer', 'John', 'Linda', 'David', 'Elizabeth',
    'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen',
    'Charles', 'Lisa', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra',
    'Donald', 'Ashley', 'Steven', 'Kimberly', 'Andrew', 'Emily', 'Paul', 'Donna', 'Joshua', 'Michelle',
    'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa', 'Timothy', 'Deborah',
    'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia',
    'Jacob', 'Amy', 'Gary', 'Kathleen', 'Nicholas', 'Angela', 'Eric', 'Shirley', 'Jonathan', 'Brenda',
    'Stephen', 'Emma', 'Larry', 'Anna', 'Justin', 'Pamela', 'Scott', 'Nicole', 'Brandon', 'Samantha',
    'Benjamin', 'Katherine', 'Samuel', 'Christine', 'Raymond', 'Debra', 'Gregory', 'Rachel', 'Alexander', 'Carolyn',
    'Patrick', 'Janet', 'Frank', 'Catherine', 'Jack', 'Maria', 'Dennis', 'Heather', 'Jerry', 'Diane',
    'Tyler', 'Ruth', 'Aaron', 'Julie', 'Jose', 'Olivia', 'Adam', 'Joyce', 'Nathan', 'Virginia',
    'Zachary', 'Victoria', 'Douglas', 'Kelly', 'Peter', 'Lauren', 'Kyle', 'Christina', 'Noah', 'Joan',
    'Ethan', 'Evelyn', 'Jeremy', 'Judith', 'Walter', 'Megan', 'Christian', 'Andrea', 'Keith', 'Cheryl',
    'Roger', 'Hannah', 'Terry', 'Jacqueline', 'Austin', 'Martha', 'Sean', 'Madison', 'Gerald', 'Teresa'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
    'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
    'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
    'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
    'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
    'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'
  ];

  const schools = [
    { name: 'Lincoln High School', location: '800 N 1st Street, Phoenix, AZ 85004', code: 'LHS001' },
    { name: 'Washington Elementary School', location: '4950 S Lamar Boulevard, Austin, TX 78745', code: 'WES002' },
    { name: 'Roosevelt Middle School', location: '1531 W Olive Avenue, Chicago, IL 60622', code: 'RMS003' },
    { name: 'Jefferson High School', location: '3825 E Campbell Avenue, Phoenix, AZ 85018', code: 'JHS004' },
    { name: 'Franklin Elementary School', location: '2200 Vine Street, Philadelphia, PA 19103', code: 'FES005' },
    { name: 'Madison High School', location: '5005 Broadway, San Antonio, TX 78209', code: 'MHS006' },
    { name: 'Kennedy Middle School', location: '4221 Balboa Avenue, San Diego, CA 92117', code: 'KMS007' },
    { name: 'Adams Elementary School', location: '1819 N Peak Street, Dallas, TX 75204', code: 'AES008' },
    { name: 'Monroe High School', location: '1530 E Santa Clara Street, San Jose, CA 95116', code: 'MHS009' },
    { name: 'Jackson Middle School', location: '3700 S Congress Avenue, Austin, TX 78704', code: 'JMS010' },
    { name: 'Wilson Elementary School', location: '8740 Beach Boulevard, Jacksonville, FL 32216', code: 'WES011' },
    { name: 'Hamilton High School', location: '6105 Camp Bowie Boulevard, Fort Worth, TX 76116', code: 'HHS012' },
    { name: 'Harrison Middle School', location: '2770 W Broad Street, Columbus, OH 43204', code: 'HMS013' },
    { name: 'Grant Elementary School', location: '500 S Tryon Street, Charlotte, NC 28202', code: 'GES014' },
    { name: 'Pierce High School', location: '2055 Lombard Street, San Francisco, CA 94123', code: 'PHS015' },
    { name: 'Garfield High School', location: '4701 N Keystone Avenue, Indianapolis, IN 46205', code: 'GHS016' },
    { name: 'McKinley Elementary', location: '1400 E Republican Street, Seattle, WA 98112', code: 'MES017' },
    { name: 'Truman Middle School', location: '1350 E 17th Avenue, Denver, CO 80218', code: 'TMS018' },
    { name: 'Eisenhower High School', location: '715 Boylston Street, Boston, MA 02116', code: 'EHS019' },
    { name: 'Cleveland Elementary', location: '2121 NW Lovejoy Street, Portland, OR 97210', code: 'CES020' },
    { name: 'Reagan High School', location: '211 Broadway, Nashville, TN 37201', code: 'RHS021' },
    { name: 'Carter Middle School', location: '545 S Main Street, Memphis, TN 38103', code: 'CMS022' },
    { name: 'Bush Elementary School', location: '1900 NW Expressway, Oklahoma City, OK 73118', code: 'BES023' },
    { name: 'Clinton High School', location: '101 S 4th Street, Louisville, KY 40202', code: 'CHS024' },
    { name: 'Ford Middle School', location: '401 E Pratt Street, Baltimore, MD 21202', code: 'FMS025' },
    { name: 'Coolidge Elementary', location: '2000 W Wisconsin Avenue, Milwaukee, WI 53233', code: 'CES026' },
    { name: 'Hoover High School', location: '2401 Central Avenue NW, Albuquerque, NM 87104', code: 'HHS027' },
    { name: 'Taft Middle School', location: '260 S Church Avenue, Tucson, AZ 85701', code: 'TMS028' },
    { name: 'Harding Elementary', location: '2323 N Fresno Street, Fresno, CA 93703', code: 'HES029' },
    { name: 'Tyler High School', location: '1020 11th Street, Sacramento, CA 95814', code: 'THS030' },
    { name: 'Polk Middle School', location: '340 E Ocean Boulevard, Long Beach, CA 90802', code: 'PMS031' },
    { name: 'Taylor Elementary', location: '1200 Main Street, Kansas City, MO 64105', code: 'TES032' },
    { name: 'Fillmore High School', location: '120 N Center Street, Mesa, AZ 85201', code: 'FHS033' },
    { name: 'Buchanan Middle School', location: '265 Peachtree Street NE, Atlanta, GA 30303', code: 'BMS034' },
    { name: 'Arthur Elementary', location: '102 S Tejon Street, Colorado Springs, CO 80903', code: 'AES035' },
    { name: 'Garfield STEM Academy', location: '500 Fayetteville Street, Raleigh, NC 27601', code: 'GSA036' },
    { name: 'Liberty Charter School', location: '1450 Brickell Avenue, Miami, FL 33131', code: 'LCS037' },
    { name: 'Horizon Preparatory', location: '401 13th Street, Oakland, CA 94612', code: 'HPS038' },
    { name: 'Summit High School', location: '730 Hennepin Avenue, Minneapolis, MN 55403', code: 'SHS039' },
    { name: 'Valley View Middle', location: '1301 E 9th Street, Cleveland, OH 44114', code: 'VVM040' },
    { name: 'Heritage Academy', location: '5115 N Central Expressway, Dallas, TX 75205', code: 'HA041' },
    { name: 'Riverside High School', location: '1680 Speer Boulevard, Denver, CO 80202', code: 'RHS042' },
    { name: 'Oakwood Elementary', location: '3550 Wilshire Boulevard, Los Angeles, CA 90010', code: 'OES043' },
    { name: 'Lakeside Middle School', location: '1155 W Webster Avenue, Chicago, IL 60614', code: 'LMS044' },
    { name: 'Skyline High School', location: '2727 Fairview Avenue E, Seattle, WA 98102', code: 'SHS045' },
    { name: 'Mountain View Elementary', location: '3131 E Indian School Road, Phoenix, AZ 85016', code: 'MVE046' },
    { name: 'Parkside Middle School', location: '4343 N Central Avenue, Phoenix, AZ 85012', code: 'PMS047' },
    { name: 'Westwood High School', location: '2600 West 7th Street, Fort Worth, TX 76107', code: 'WHS048' },
    { name: 'Eastside Elementary', location: '1010 E 6th Street, Austin, TX 78702', code: 'EES049' },
    { name: 'Northgate Middle School', location: '5600 N Interstate 35, Austin, TX 78751', code: 'NMS050' }
  ];

  const positions = [
    'Mathematics Teacher', 'English Teacher', 'Science Teacher', 'Social Studies Teacher', 'Elementary Teacher',
    'Special Education Teacher', 'Physical Education Teacher', 'Art Teacher', 'Music Teacher', 'School Counselor',
    'History Teacher', 'Biology Teacher', 'Chemistry Teacher', 'Physics Teacher', 'Spanish Teacher',
    'French Teacher', 'Computer Science Teacher', 'Drama Teacher', 'Band Director', 'Choir Director',
    'Reading Specialist', 'ESL Teacher', 'Librarian', 'Media Specialist', 'Gifted Education Teacher',
    'Kindergarten Teacher', '1st Grade Teacher', '2nd Grade Teacher', '3rd Grade Teacher', '4th Grade Teacher',
    '5th Grade Teacher', 'Algebra Teacher', 'Geometry Teacher', 'Calculus Teacher', 'Statistics Teacher',
    'World History Teacher', 'American History Teacher', 'Government Teacher', 'Economics Teacher', 'Psychology Teacher'
  ];

  const school = schools[Math.floor(Math.random() * schools.length)];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  const middleInitials = ['', 'A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'J.', 'K.', 'L.', 'M.', 'N.', 'P.', 'R.', 'S.', 'T.', 'W.'];
  const hasMiddleInitial = Math.random() > 0.7;
  const middleInitial = hasMiddleInitial ? middleInitials[Math.floor(Math.random() * middleInitials.length)] : '';
  const name = middleInitial ? `${firstName} ${middleInitial} ${lastName}` : `${firstName} ${lastName}`;

  const position = positions[Math.floor(Math.random() * positions.length)];

  const checkNumberFormats = [
    () => (Math.floor(Math.random() * 9000000) + 1000000).toString(),
    () => (Math.floor(Math.random() * 90000) + 10000).toString(),
    () => `${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
    () => `CHK${Math.floor(Math.random() * 900000) + 100000}`,
    () => `P${Math.floor(Math.random() * 9000000) + 1000000}`,
  ];
  const checkNumber = checkNumberFormats[Math.floor(Math.random() * checkNumberFormats.length)]();

  const ssnPart1 = Math.floor(Math.random() * 900) + 100;
  const ssnPart2 = Math.floor(Math.random() * 90) + 10;
  const ssnPart3 = Math.floor(Math.random() * 9000) + 1000;

  const fileNumberFormats = [
    () => (Math.floor(Math.random() * 9000000) + 1000000).toString(),
    () => `EMP${Math.floor(Math.random() * 900000) + 100000}`,
    () => `${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 900) + 100}`,
    () => `F-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`,
  ];
  const fileNumber = fileNumberFormats[Math.floor(Math.random() * fileNumberFormats.length)]();

  const accountEnding = Math.floor(Math.random() * 9000) + 1000;

  const einFormats = [
    () => '12-3456789',
    () => `${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9000000) + 1000000}`,
    () => `${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9000000) + 1000000}`,
  ];
  const employerEIN = einFormats[Math.floor(Math.random() * einFormats.length)]();

  const today = new Date();

  const daysAgo = Math.floor(Math.random() * 30);
  const payDate = new Date(today);
  payDate.setDate(today.getDate() - daysAgo);

  const payDateOptions = [15, 30, 1];
  const chosenPayDay = payDateOptions[Math.floor(Math.random() * payDateOptions.length)];

  if (chosenPayDay === 1) {
    payDate.setDate(1);
  } else if (chosenPayDay === 15) {
    payDate.setDate(15);
  } else {
    const lastDay = new Date(payDate.getFullYear(), payDate.getMonth() + 1, 0);
    payDate.setDate(lastDay.getDate());
  }

  const periodEnd = new Date(payDate);
  periodEnd.setDate(periodEnd.getDate() - 1);

  const periodLengths = [7, 14, 15, 30];
  const periodLength = periodLengths[Math.floor(Math.random() * periodLengths.length)];
  const periodStart = new Date(periodEnd);
  periodStart.setDate(periodStart.getDate() - periodLength);

  const hireYear = Math.floor(Math.random() * 20) + 2005;
  const hireMonth = Math.floor(Math.random() * 12);
  const hireDay = Math.floor(Math.random() * 28) + 1;
  const hireDate = new Date(hireYear, hireMonth, hireDay);

  const paymentMethodFormats = [
    () => `Direct Deposit - Account ending ****${accountEnding}`,
    () => `Direct Deposit - Account ****${accountEnding}`,
    () => `ACH Transfer - ****${accountEnding}`,
    () => `Electronic Transfer - ****${accountEnding}`,
    () => `Direct Deposit`,
    () => 'Paper Check',
  ];
  const paymentMethod = paymentMethodFormats[Math.floor(Math.random() * paymentMethodFormats.length)]();

  const templates = ['modern', 'classic', 'beaverton'];
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

  return {
    check_number: checkNumber,
    pay_date: payDate.toISOString().split('T')[0],
    period_start: periodStart.toISOString().split('T')[0],
    period_end: periodEnd.toISOString().split('T')[0],
    school_name: school.name,
    school_location: school.location,
    school_code: school.code,
    employer_ein: employerEIN,
    employee_name: name,
    employee_ssn: `${ssnPart1}-${ssnPart2}-${ssnPart3}`,
    position: position,
    file_number: fileNumber,
    hire_date: hireDate.toISOString().split('T')[0],
    salary_rate: grossCurrent,
    gross_pay_current: grossCurrent,
    gross_pay_ytd: grossYTD,
    deductions: deductions,
    total_deductions_current: parseFloat(totalDeductionsCurrent.toFixed(2)),
    total_deductions_ytd: parseFloat(totalDeductionsYTD.toFixed(2)),
    net_pay_current: parseFloat(netPayCurrent.toFixed(2)),
    net_pay_ytd: parseFloat(netPayYTD.toFixed(2)),
    payment_method: paymentMethod,
    template: randomTemplate
  };
}
