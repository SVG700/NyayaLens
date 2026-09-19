import { LegalDocument } from './types';

export const DEMO_RENTAL_AGREEMENT: LegalDocument = {
  id: 'doc-rental-001',
  name: 'Apartment Rental Agreement',
  type: 'Residential Lease Agreement',
  fileSize: '184 KB',
  uploadDate: '2026-02-15',
  lastAnalyzed: 'Just now',
  status: 'Analyzed',
  parties: ['Tenant: Alex Parker', 'Landlord: Crestview Properties LLC'],
  duration: '11 months (renewable upon written agreement)',
  governingLaw: 'Jurisdiction of New Delhi / Local Rent Control Directives',
  totalClauses: 24,
  summary: 'This agreement establishes the terms of an 11-month residential tenancy for Apartment 4B at Crestview Heights, including monthly rent obligations, security deposit management, maintenance allocation, quiet enjoyment standards, termination covenants, and dispute procedures.',
  simpleLanguageSummary: {
    corePremise: 'You are renting Apartment 4B for 11 months from Crestview Properties LLC. Rent is due on the 1st of each month with a 5-day grace period.',
    financialSummary: 'Monthly rent is $1,850. A security deposit of $3,700 (equivalent to two months rent) is held in escrow. Late fees of $75 apply after the 5th day.',
    exitConditions: 'Either party can terminate with a 30-day written notice. Early termination without cause requires forfeiture of 50% of the deposit.',
    mainRisks: 'Clause 8.3 requires tenant to bear all minor repairs under $100. Clause 12.1 permits landlord entry with only 12-hour advance notice rather than standard 24-hour notice.'
  },
  rawText: `RESIDENTIAL LEASE AGREEMENT

This Residential Lease Agreement ("Agreement") is executed on this 1st day of January, 2026, by and between:
LANDLORD: Crestview Properties LLC, represented by its authorized manager ("Landlord"),
AND
TENANT: Alex Parker ("Tenant").

1. PREMISES AND TERM
1.1 The Landlord hereby leases to Tenant the residential property situated at Unit 4B, Crestview Heights, 742 Evergreen Terrace ("Premises"), for a fixed period of eleven (11) months commencing on January 1, 2026 and terminating automatically on November 30, 2026, unless renewed in writing.

2. RENT AND PAYMENT SCHEDULE
2.1 Tenant covenants to pay Landlord a monthly base rental sum of $1,850.00 (One Thousand Eight Hundred Fifty US Dollars), due in advance on or before the first (1st) day of each calendar month via authorized electronic bank transfer.
2.2 A grace period of five (5) calendar days is permitted. Any payment received after 11:59 PM on the 5th calendar day shall incur a mandatory late administrative charge of $75.00, compounding at 1.5% weekly for further delays.

3. SECURITY DEPOSIT AND DEDUCTION PROVISIONS
3.1 Upon signing, Tenant shall deposit the sum of $3,700.00 (equivalent to two calendar months base rent) as a refundable Security Deposit to guarantee faithful performance of all covenants herein.
3.2 The Landlord shall retain the Security Deposit in a designated account. Within forty-five (45) business days following full vacation of the Premises, Landlord shall return the balance after itemized deduction for unpaid utilities, structural damage exceeding normal wear and tear, or deep cleaning costs.

4. UTILITIES AND OPERATIONAL CHARGES
4.1 Tenant shall be solely responsible for obtaining and promptly paying all municipal utility accounts, including electricity, cooking gas, high-speed internet, and supplemental heating charges.
4.2 Landlord shall bear municipal property taxes and primary building association maintenance dues.

5. MAINTENANCE AND REPAIRS RESPONSIBILITIES
5.1 Tenant agrees to maintain the Premises in good, sanitary condition. Minor repairs costing $100.00 or less per incident (including plumbing clogs, bulb replacements, and washer gaskets) shall be paid by Tenant.
5.2 Major structural repairs, roof leakages, and main HVAC system overhauls exceeding $100.00 shall remain the responsibility of Landlord, provided Tenant gives written notification within forty-eight (48) hours of discovery.

6. USE, OCCUPANCY AND PROHIBITION OF SUBLETTING
6.1 The Premises shall be used exclusively as a private single-family residence by the designated Tenant. No commercial operations or unauthorized home-based storefronts are permitted.
6.2 Tenant shall strictly not assign, mortgage, or sublet any portion of the Premises, nor grant any license or invite paying guests via short-term rental platforms (including Airbnb or VRBO), without prior explicit written consent from Landlord.

7. TERMINATION AND NOTICE PERIOD
7.1 Either party may elect to terminate this Agreement prior to expiration by furnishing thirty (30) calendar days prior written notice via registered email or certified postal receipt.
7.2 Should Tenant unilaterally vacate the Premises prior to the completion of the eleven (11) month tenure without mutual consent, Tenant shall forfeit fifty percent (50%) of the Security Deposit as liquidated damages for marketing and re-letting costs.

8. INSPECTION AND RIGHT OF ENTRY
8.1 Landlord or its authorized technicians reserve the right to enter the Premises during regular business hours (8:00 AM to 6:00 PM) for safety inspections, periodic appraisal, or required repairs upon providing at least twelve (12) hours advance digital notice.
8.2 In cases of bona fide emergency threatening life or catastrophic structural damage (e.g. active water rupture or gas hazard), Landlord may enter immediately without prior notice.

9. ALTERATIONS AND FIXTURES
9.1 Tenant shall make no structural alterations, painting of interior walls in non-neutral colors, or permanent affixing of hardware into masonry without prior written authorization from Landlord.

10. GOVERNING JURISDICTION AND DISPUTE RESOLUTION
10.1 This Agreement shall be construed and interpreted in accordance with applicable residential tenancy codes. All unresolved disputes shall first undergo mandatory conciliation before resorting to formal court proceedings.`,
  clauses: [
    {
      id: 'cl-1',
      sectionNumber: 'Section 1.1',
      title: 'Premises & Lease Term',
      pageNumber: 1,
      originalText: 'The Landlord hereby leases to Tenant the residential property situated at Unit 4B, Crestview Heights, 742 Evergreen Terrace ("Premises"), for a fixed period of eleven (11) months commencing on January 1, 2026 and terminating automatically on November 30, 2026, unless renewed in writing.',
      simplifiedText: 'The lease runs for 11 months from January 1, 2026 to November 30, 2026. It ends automatically unless you and the landlord sign a new agreement in writing.',
      tags: ['Informational'],
      category: 'General',
      explanation: {
        whatItSays: 'Specifies the exact rental period of 11 months and explicit start and end calendar dates.',
        whyItMatters: '11-month leases in many jurisdictions avoid certain long-term tenancy registration triggers, meaning renewal is not automatic.',
        whoItAffects: 'Both Tenant and Landlord.',
        whatToVerify: 'Verify that the move-in date aligns with your moving schedule and confirm renewal notice expectations.',
        suggestedQuestionForLawyer: 'What statutory protections or registration rights apply to an 11-month residential lease under our local rent control acts?'
      }
    },
    {
      id: 'cl-2',
      sectionNumber: 'Section 2.1 & 2.2',
      title: 'Rent Amount & Late Penalties',
      pageNumber: 1,
      originalText: 'Tenant covenants to pay Landlord a monthly base rental sum of $1,850.00, due in advance on or before the first (1st) day of each calendar month. A grace period of five (5) calendar days is permitted. Any payment received after 11:59 PM on the 5th calendar day shall incur a mandatory late administrative charge of $75.00, compounding at 1.5% weekly for further delays.',
      simplifiedText: 'Rent is $1,850/month, due on the 1st. You have until the 5th to pay without fee. Missing the 5th incurs a $75 fee plus 1.5% weekly interest.',
      tags: ['Important', 'Financial'],
      category: 'Financial',
      explanation: {
        whatItSays: 'Sets the monthly rate, strict deadline, a 5-day buffer, and recurring weekly late interest fees.',
        whyItMatters: 'Compounding late fees (1.5% weekly) can escalate quickly if a banking glitch or salary delay occurs.',
        whoItAffects: 'Tenant financial obligation.',
        whatToVerify: 'Verify whether electronic transfers have processing delays and check if local statutes cap rental late penalties.',
        suggestedQuestionForLawyer: 'Is a compounding 1.5% weekly penalty clause legally enforceable, or does local law place a maximum ceiling on tenant late fees?'
      }
    },
    {
      id: 'cl-3',
      sectionNumber: 'Section 3.1 & 3.2',
      title: 'Security Deposit & Return Window',
      pageNumber: 1,
      originalText: 'Tenant shall deposit the sum of $3,700.00 (equivalent to two calendar months base rent) as a refundable Security Deposit... Within forty-five (45) business days following full vacation of the Premises, Landlord shall return the balance after itemized deduction...',
      simplifiedText: 'You pay a $3,700 deposit (2 months rent). The landlord has up to 45 business days (nearly 9 calendar weeks) to return it with an itemized deduction list.',
      tags: ['Tenant Obligation', 'Financial', 'Review Recommended'],
      category: 'Financial',
      explanation: {
        whatItSays: 'The landlord holds 2 months of rent and takes up to 45 business days post-move-out to return the balance.',
        whyItMatters: '45 business days is significantly longer than standard 14 to 30 calendar day statutory periods in many states/municipalities.',
        whoItAffects: 'Tenant liquidity when relocating to a new apartment.',
        whatToVerify: 'Check local tenant laws regarding statutory maximum return windows (often 21-30 days) and interest bearing deposit requirements.',
        suggestedQuestionForLawyer: 'Can the landlord legally extend the deposit refund period to 45 business days if local tenancy code mandates 30 calendar days?'
      }
    },
    {
      id: 'cl-4',
      sectionNumber: 'Section 5.1',
      title: 'Tenant Maintenance Allocation ($100 Deductible)',
      pageNumber: 2,
      originalText: 'Minor repairs costing $100.00 or less per incident (including plumbing clogs, bulb replacements, and washer gaskets) shall be paid by Tenant.',
      simplifiedText: 'You must pay out-of-pocket for any minor repair that costs $100 or less per incident.',
      tags: ['Review Recommended', 'Important'],
      category: 'Responsibilities',
      explanation: {
        whatItSays: 'Shifts routine maintenance costs under $100 entirely onto the tenant, regardless of whether damage was caused by ordinary wear.',
        whyItMatters: 'Cumulative small repairs (faucets, washers, switches) could add several hundred dollars to living expenses during the year.',
        whoItAffects: 'Tenant day-to-day operational expense.',
        whatToVerify: 'Inspect all plumbing, electrical sockets, and appliance gaskets prior to move-in to ensure nothing is already malfunctioning.',
        suggestedQuestionForLawyer: 'Are pre-existing minor defects or routine plumbing wear legally transferable to a tenant under standard habitability guidelines?'
      }
    },
    {
      id: 'cl-5',
      sectionNumber: 'Section 6.2',
      title: 'Absolute Prohibition on Subletting & Home-Sharing',
      pageNumber: 2,
      originalText: 'Tenant shall strictly not assign, mortgage, or sublet any portion of the Premises, nor grant any license or invite paying guests via short-term rental platforms (including Airbnb or VRBO), without prior explicit written consent from Landlord.',
      simplifiedText: 'No subletting, roommate replacements, or listing the apartment on Airbnb/VRBO without the landlord’s written permission.',
      tags: ['Important'],
      category: 'Responsibilities',
      explanation: {
        whatItSays: 'Total bar against taking paying guests, short-term subleasing, or transferring the lease.',
        whyItMatters: 'Violating this is usually classified as a material breach allowing immediate lease cancellation.',
        whoItAffects: 'Tenant freedom of property occupancy.',
        whatToVerify: 'Confirm if you intend to travel or host long-term visiting family members.',
        suggestedQuestionForLawyer: 'Does this clause prevent having extended family members or non-paying house guests stay for multiple weeks?'
      }
    },
    {
      id: 'cl-6',
      sectionNumber: 'Section 7.1 & 7.2',
      title: 'Termination Notice & Early Vacation Penalty',
      pageNumber: 2,
      originalText: 'Either party may elect to terminate this Agreement prior to expiration by furnishing thirty (30) calendar days prior written notice... Should Tenant unilaterally vacate... prior to completion... Tenant shall forfeit fifty percent (50%) of the Security Deposit as liquidated damages.',
      simplifiedText: 'Either party can end the lease with 30 days notice. However, if you leave early before 11 months, you automatically lose $1,850 (half your deposit) as a penalty fee.',
      tags: ['Potential Concern', 'Important'],
      category: 'Termination',
      explanation: {
        whatItSays: 'Provides 30-day exit rights, but imposes a strict 50% deposit forfeiture ($1,850) if the tenant exits before 11 months.',
        whyItMatters: 'Even if you provide a timely 30-day notice, leaving at month 8 or 9 means losing $1,850 unless a replacement tenant or mutual release is negotiated.',
        whoItAffects: 'Tenant financial security upon career relocation or unexpected life events.',
        whatToVerify: 'Check if the landlord is legally required to mitigate damages by actively looking for a replacement tenant instead of keeping a liquidated penalty.',
        suggestedQuestionForLawyer: 'Is an automatic 50% security deposit forfeiture clause enforceable if I provide full 30 days notice and assist in finding a qualified replacement tenant?'
      }
    },
    {
      id: 'cl-7',
      sectionNumber: 'Section 8.1',
      title: 'Landlord Right of Entry (12-Hour Notice)',
      pageNumber: 3,
      originalText: 'Landlord or its authorized technicians reserve the right to enter the Premises during regular business hours (8:00 AM to 6:00 PM) for safety inspections, periodic appraisal, or required repairs upon providing at least twelve (12) hours advance digital notice.',
      simplifiedText: 'The landlord can enter your apartment with only 12 hours notice via text/email for inspections or appraisals.',
      tags: ['Review Recommended', 'Potential Concern'],
      category: 'Governance',
      explanation: {
        whatItSays: 'Landlord entry allowed with only 12 hours notice between 8 AM and 6 PM.',
        whyItMatters: 'Standard statutory covenant of quiet enjoyment in most regions requires 24 to 48 hours notice for non-emergency access.',
        whoItAffects: 'Tenant privacy and home security.',
        whatToVerify: 'Consider requesting an amendment raising the notification period to 24 hours written notice.',
        suggestedQuestionForLawyer: 'Does local residential landlord-tenant law require a minimum 24-hour notice before non-emergency entry?'
      }
    },
    {
      id: 'cl-8',
      sectionNumber: 'Section 9.1',
      title: 'Alterations & Wall Painting Restrictions',
      pageNumber: 3,
      originalText: 'Tenant shall make no structural alterations, painting of interior walls in non-neutral colors, or permanent affixing of hardware into masonry without prior written authorization from Landlord.',
      simplifiedText: 'No wall painting or drilling into masonry/walls without prior written approval from the landlord.',
      tags: ['Informational'],
      category: 'Responsibilities',
      explanation: {
        whatItSays: 'Restricts wall decor, paint colors, and wall mount installations.',
        whyItMatters: 'Mounting TV brackets or hanging heavy art without authorization could lead to repair deductions from your deposit.',
        whoItAffects: 'Tenant personalization of the living space.',
        whatToVerify: 'Clarify upfront whether standard small picture nails are permissible without penalty.',
        suggestedQuestionForLawyer: 'What constitutes standard allowable decoration versus unauthorized alteration under residential lease law?'
      }
    },
    {
      id: 'cl-9',
      sectionNumber: 'Section 10.1',
      title: 'Dispute Resolution & Conciliation',
      pageNumber: 3,
      originalText: 'This Agreement shall be construed and interpreted in accordance with applicable residential tenancy codes. All unresolved disputes shall first undergo mandatory conciliation before resorting to formal court proceedings.',
      simplifiedText: 'Any legal disagreement must go through conciliation/mediation before either party can file an official lawsuit.',
      tags: ['Informational'],
      category: 'Liability',
      explanation: {
        whatItSays: 'Both parties agree to informal conciliation before court filings.',
        whyItMatters: 'Helps resolve issues quickly without expensive litigation fees, though it adds a procedural step.',
        whoItAffects: 'Both parties.',
        whatToVerify: 'Verify who bears the cost of the conciliation mediator.',
        suggestedQuestionForLawyer: 'Does the mandatory conciliation clause prevent fast-track filings for urgent emergency repairs or unlawful deposit retention?'
      }
    }
  ],
  obligations: [
    {
      id: 'ob-1',
      party: 'Tenant',
      description: 'Pay monthly base rent of $1,850 on or before the 1st of each month via electronic transfer.',
      originalSection: 'Section 2.1',
      frequencyOrCondition: 'Monthly recurring',
      consequence: '$75 late fee plus 1.5% weekly compounding penalty after 5-day grace period.',
      importance: 'Critical'
    },
    {
      id: 'ob-2',
      party: 'Tenant',
      description: 'Bear repair and maintenance costs for all minor items costing $100 or less per incident.',
      originalSection: 'Section 5.1',
      frequencyOrCondition: 'Per incident',
      consequence: 'Out-of-pocket repair costs or deduction from security deposit upon vacate.',
      importance: 'Watch'
    },
    {
      id: 'ob-3',
      party: 'Tenant',
      description: 'Furnish at least thirty (30) calendar days prior written notice before early termination.',
      originalSection: 'Section 7.1',
      frequencyOrCondition: 'Upon exit decision',
      consequence: 'Automatic forfeiture of 50% of security deposit ($1,850) if terminated before 11 months.',
      importance: 'Critical'
    },
    {
      id: 'ob-4',
      party: 'Landlord',
      description: 'Perform and pay for major structural repairs, roof leakages, and main HVAC system overhauls exceeding $100.',
      originalSection: 'Section 5.2',
      frequencyOrCondition: 'Upon notice within 48 hours',
      consequence: 'Tenant may seek repair-and-deduct remedies or claim habitability violation.',
      importance: 'Standard'
    },
    {
      id: 'ob-5',
      party: 'Landlord',
      description: 'Return the remaining balance of the $3,700 Security Deposit along with itemized deductions.',
      originalSection: 'Section 3.2',
      frequencyOrCondition: 'Within 45 business days of full move-out',
      consequence: 'Statutory interest or legal claim for wrongful deposit retention if withheld improperly.',
      importance: 'Watch'
    }
  ],
  dates: [
    {
      id: 'dt-1',
      date: '2026-01-01',
      formattedDate: '01 Jan 2026',
      event: 'Tenancy Commencement Date',
      explanation: 'Official start date of the 11-month lease term; keys handed over and move-in permitted.',
      actionRequired: 'Complete joint walk-through move-in inspection checklist with landlord and document photo timestamp proof.',
      isUpcoming: false,
      daysRemaining: 0,
      sourceSection: 'Section 1.1'
    },
    {
      id: 'dt-2',
      date: '2026-05-01',
      formattedDate: '01 May 2026',
      event: 'Mid-Term Property Walkthrough',
      explanation: 'Recommended periodic inspection interval by landlord technician.',
      actionRequired: 'Ensure all minor wear items are noted; check smoke detectors and HVAC filters.',
      isUpcoming: true,
      daysRemaining: 42,
      sourceSection: 'Section 8.1'
    },
    {
      id: 'dt-3',
      date: '2026-10-31',
      formattedDate: '31 Oct 2026',
      event: 'Mandatory 30-Day Notice Window Opens',
      explanation: 'Latest date to submit written notice if not renewing the lease for another term.',
      actionRequired: 'Decide on lease renewal or send formal 30-day written notice via certified email.',
      isUpcoming: true,
      daysRemaining: 225,
      sourceSection: 'Section 7.1'
    },
    {
      id: 'dt-4',
      date: '2026-11-30',
      formattedDate: '30 Nov 2026',
      event: 'Agreement Automatic Expiration',
      explanation: 'Lease officially expires. Premises must be surrendered clean and vacant by 12:00 PM.',
      actionRequired: 'Hand over keys, complete exit inspection, and request deposit accounting statement.',
      isUpcoming: true,
      daysRemaining: 255,
      sourceSection: 'Section 1.1'
    }
  ],
  reviewPoints: [
    {
      id: 'rp-1',
      title: '50% Security Deposit Early Exit Forfeiture',
      severity: 'Potential Concern',
      summary: 'Section 7.2 forfeits $1,850 of your deposit if you exit before 11 months, even with full 30 days notice.',
      detailedNotice: 'Under common law principles and many residential tenant protection statutes, landlords are required to take reasonable steps to mitigate damages (i.e. finding a replacement tenant) rather than applying an arbitrary fixed forfeiture.',
      actionableStep: 'Negotiate an amendment: Request that if you provide 30 days notice and a suitable replacement tenant is secured, full deposit return applies minus verifiable advertising costs.',
      clauseId: 'cl-6'
    },
    {
      id: 'rp-2',
      title: 'Short 12-Hour Landlord Notice of Entry',
      severity: 'Review Recommended',
      summary: 'Section 8.1 grants the landlord right of entry with only 12 hours advance digital notice.',
      detailedNotice: 'Most standard leases and tenancy privacy statutes guarantee at least 24 or 48 hours advance notice for routine inspections, ensuring tenant privacy is respected.',
      actionableStep: 'Request altering "twelve (12) hours" to "twenty-four (24) hours advance notice in writing".',
      clauseId: 'cl-7'
    },
    {
      id: 'rp-3',
      title: 'Prolonged 45 Business Day Deposit Refund Window',
      severity: 'Review Recommended',
      summary: 'Section 3.2 allows the landlord 45 business days (approx. 9 weeks) to return your deposit.',
      detailedNotice: 'Having $3,700 tied up for over 2 months after moving out can place significant financial strain when leasing your next residence.',
      actionableStep: 'Propose aligning with industry best practice of 21 to 30 calendar days for refund with receipts.',
      clauseId: 'cl-3'
    },
    {
      id: 'rp-4',
      title: 'Tenant Responsibility for Repairs Under $100',
      severity: 'Important',
      summary: 'Clause 5.1 makes tenant pay for any minor repair under $100 regardless of fault.',
      detailedNotice: 'Aging plumbing or wear-and-tear items that fail early during your tenancy might end up charged to you.',
      actionableStep: 'Conduct an exhaustive photographic condition report on day 1 to confirm everything is working properly.',
      clauseId: 'cl-4'
    },
    {
      id: 'rp-5',
      title: 'Compounding Weekly Late Rent Fee (1.5%)',
      severity: 'Important',
      summary: 'Section 2.2 adds a compounding 1.5% weekly interest on late rental payments.',
      detailedNotice: 'Ensure your payroll bank account is set up with automated reminders 3 days before the 1st of every month to avoid triggering this.',
      actionableStep: 'Set up an automated calendar and banking transfer for the 28th of every month.',
      clauseId: 'cl-2'
    }
  ],
  checklist: [
    {
      id: 'chk-1',
      text: 'Verify termination notice period and early exit forfeiture condition',
      category: 'Pre-Signing',
      completed: false,
      deadline: 'Before signing lease',
      note: 'Clause 7.2 imposes 50% deposit penalty if terminated early'
    },
    {
      id: 'chk-2',
      text: 'Confirm security deposit return timeline (request reduction from 45 business days to 30 days)',
      category: 'Pre-Signing',
      completed: false,
      deadline: 'Before signing lease',
      note: 'Held in escrow by Crestview Properties'
    },
    {
      id: 'chk-3',
      text: 'Conduct photographic move-in inspection of fixtures and plumbing (minor repairs <$100 clause)',
      category: 'Immediate',
      completed: true,
      deadline: 'Within 48 hours of move-in',
      note: 'Timestamp all photos in cloud storage'
    },
    {
      id: 'chk-4',
      text: 'Set up automated monthly rent transfer for the 28th of every month',
      category: 'Ongoing',
      completed: false,
      deadline: 'Before 1st of each month',
      note: 'Avoids $75 penalty and 1.5% compounding fee'
    },
    {
      id: 'chk-5',
      text: 'Mark calendar for October 31, 2026 (30-day renewal / notice decision window)',
      category: 'Ongoing',
      completed: false,
      deadline: '2026-10-31',
      note: 'Section 7.1 requires written notice'
    },
    {
      id: 'chk-6',
      text: 'Prepare 3 specific questions regarding deposit forfeiture and 12-hr notice for a lawyer',
      category: 'Legal Consultation',
      completed: false,
      deadline: 'Prior to lease execution',
      note: 'Framed for quick professional review'
    }
  ],
  lawyerQuestions: [
    {
      id: 'lq-1',
      number: 1,
      question: 'Is the 50% security deposit forfeiture clause for early termination legally enforceable in our jurisdiction if 30 days notice is given?',
      rationale: 'Many jurisdictions require landlords to mitigate losses by advertising for new tenants rather than keeping arbitrary penalties.',
      relatedClause: 'Section 7.2 (Early Vacation Penalty)',
      category: 'Termination & Deposits'
    },
    {
      id: 'lq-2',
      number: 2,
      question: 'Does local residential tenancy law override the 45-business-day deposit return timeline in favor of a shorter statutory deadline?',
      rationale: 'Statutory tenant protection codes frequently specify 14-30 calendar days as the maximum allowable period for return of deposits.',
      relatedClause: 'Section 3.2 (Deposit Accounting)',
      category: 'Statutory Compliance'
    },
    {
      id: 'lq-3',
      number: 3,
      question: 'Can the landlord legally enforce a 12-hour digital notice for non-emergency inspections, or does state law mandate 24 to 48 hours?',
      rationale: 'Quiet enjoyment and privacy rights are commonly protected by strict minimum notice rules.',
      relatedClause: 'Section 8.1 (Right of Entry)',
      category: 'Tenant Privacy'
    },
    {
      id: 'lq-4',
      number: 4,
      question: 'Are there standard riders or amendments we can attach to exclude pre-existing minor wear from the tenant $100 deductible repair clause?',
      rationale: 'Protecting the tenant from inheriting plumbing or structural costs from previous occupants.',
      relatedClause: 'Section 5.1 (Maintenance Allocation)',
      category: 'Liabilities'
    }
  ]
};

export const DEMO_EMPLOYMENT_AGREEMENT: LegalDocument = {
  id: 'doc-employment-002',
  name: 'Employment Agreement - Staff Engineer',
  type: 'Full-Time Employment Contract',
  fileSize: '210 KB',
  uploadDate: '2026-02-18',
  lastAnalyzed: '2 hours ago',
  status: 'Analyzed',
  parties: ['Employee: Jordan Rivera', 'Employer: Nexus AI Solutions Inc.'],
  duration: 'Indefinite (At-Will, subject to 30-day notice)',
  governingLaw: 'State of California / Federal Labor Standards',
  totalClauses: 18,
  summary: 'This employment agreement governs terms for a full-time Senior/Staff Software Engineer, outlining base salary, equity vesting, intellectual property assignment, confidentiality, non-solicitation, and separation protocols.',
  simpleLanguageSummary: {
    corePremise: 'You are being hired as a full-time Staff Software Engineer at Nexus AI Solutions with a base salary of $165,000 plus equity options.',
    financialSummary: 'Base annual compensation is $165,000 paid bi-weekly, plus 25,000 stock options with a 1-year cliff and 4-year vesting schedule.',
    exitConditions: 'Employment is at-will. Either party may terminate with 30 days notice. Severance of 2 months base pay applies if terminated without cause.',
    mainRisks: 'Broad IP assignment clause claims rights to all inventions developed during employment, including personal projects using company hardware. Non-solicitation spans 18 months.'
  },
  rawText: `EMPLOYMENT AGREEMENT

This Agreement is made on February 1, 2026 between Nexus AI Solutions Inc. ("Company") and Jordan Rivera ("Employee").
1. Position: Staff Software Engineer. Base Salary: $165,000 per annum.
2. Equity: 25,000 ISOs subject to standard 1-year cliff and 48-month total vesting.
3. Intellectual Property: Employee assigns all inventions, discoveries, and software made during employment to the Company.
4. Non-Solicitation: For 18 months post-employment, Employee shall not solicit Company employees or active clients.
5. Termination: 30 days written notice required by either party.`,
  clauses: [
    {
      id: 'emp-cl-1',
      sectionNumber: 'Section 3.1',
      title: 'Intellectual Property Assignment',
      pageNumber: 2,
      originalText: 'Employee hereby assigns to the Company all rights, title, and interest in and to any and all inventions, discoveries, designs, and computer software created, conceived, or authored by Employee during the period of employment, whether during working hours or using personal equipment if related to the Company’s prospective fields.',
      simplifiedText: 'The company claims ownership of any software or invention you make while employed, even on your own time if it touches anything related to their business.',
      tags: ['Potential Concern', 'Review Recommended'],
      category: 'Liability',
      explanation: {
        whatItSays: 'Broad assignment of intellectual property including side projects that touch the company’s broad domain.',
        whyItMatters: 'Could inadvertently transfer ownership of your personal software projects, open-source repositories, or future startups.',
        whoItAffects: 'Employee side pursuits and personal IP.',
        whatToVerify: 'Request an exhibit listing excluded pre-existing inventions and clarify carve-outs under California Labor Code Section 2870.',
        suggestedQuestionForLawyer: 'Does this IP assignment comply with statutory labor carve-outs for inventions developed entirely on personal time without company resources?'
      }
    },
    {
      id: 'emp-cl-2',
      sectionNumber: 'Section 4.2',
      title: '18-Month Non-Solicitation Covenant',
      pageNumber: 3,
      originalText: 'For an eighteen (18) month period subsequent to termination, Employee shall not directly or indirectly induce or solicit any customer, contractor, or employee to cease association with Company.',
      simplifiedText: 'For 1.5 years after leaving, you cannot ask former coworkers or clients to join or work with you elsewhere.',
      tags: ['Review Recommended'],
      category: 'Termination',
      explanation: {
        whatItSays: 'Restricts contacting or hiring former colleagues or pitching former company customers for 18 months.',
        whyItMatters: '18 months is a long window that can impede your ability to build teams at a subsequent startup or employer.',
        whoItAffects: 'Employee future career and recruiting network.',
        whatToVerify: 'Verify if customer non-solicitation is enforceable in your state jurisdiction.',
        suggestedQuestionForLawyer: 'Is an 18-month non-solicitation clause for customers and team members enforceable under local employment laws?'
      }
    }
  ],
  obligations: [
    {
      id: 'emp-ob-1',
      party: 'Employee',
      description: 'Devote full professional time and loyalty; not engage in competing consulting.',
      originalSection: 'Section 1.3',
      consequence: 'Grounds for immediate termination for cause.',
      importance: 'Standard'
    },
    {
      id: 'emp-ob-2',
      party: 'Employer',
      description: 'Provide 2 months base salary severance in the event of termination without cause.',
      originalSection: 'Section 5.2',
      consequence: 'Contractual damages if withheld.',
      importance: 'Critical'
    }
  ],
  dates: [
    {
      id: 'emp-dt-1',
      date: '2026-03-01',
      formattedDate: '01 Mar 2026',
      event: 'Official Start Date',
      explanation: 'First day of employment and payroll enrollment.',
      actionRequired: 'Submit tax forms and I-9 verification documents.',
      isUpcoming: false,
      daysRemaining: 0
    },
    {
      id: 'emp-dt-2',
      date: '2027-03-01',
      formattedDate: '01 Mar 2027',
      event: 'Equity 1-Year Cliff Vesting',
      explanation: '25% of the 25,000 stock options vest automatically.',
      actionRequired: 'Review option strike price and consult financial advisor regarding 83(b) election.',
      isUpcoming: true,
      daysRemaining: 345
    }
  ],
  reviewPoints: [
    {
      id: 'emp-rp-1',
      title: 'Broad IP Assignment Encroachment',
      severity: 'Potential Concern',
      summary: 'Company claims inventions made on personal time if vaguely related to company future roadmap.',
      detailedNotice: 'Always ensure an explicit "Schedule of Prior Inventions" is attached to preserve your existing code repositories.',
      actionableStep: 'Attach Schedule A listing your personal open source libraries and pre-existing domains.',
      clauseId: 'emp-cl-1'
    }
  ],
  checklist: [
    {
      id: 'emp-chk-1',
      text: 'Submit Schedule of Prior Inventions before signing to protect side projects',
      category: 'Pre-Signing',
      completed: false,
      deadline: 'Before contract signature'
    },
    {
      id: 'emp-chk-2',
      text: 'Confirm health insurance coverage inception date and HSA contributions',
      category: 'Immediate',
      completed: true,
      deadline: 'First week of onboarding'
    }
  ],
  lawyerQuestions: [
    {
      id: 'emp-lq-1',
      number: 1,
      question: 'Does the IP assignment clause adequately protect my existing personal open-source projects?',
      rationale: 'Protecting personal GitHub repositories from company claims.',
      relatedClause: 'Section 3.1',
      category: 'Intellectual Property'
    }
  ]
};

export const DEMO_SERVICE_CONTRACT: LegalDocument = {
  id: 'doc-service-003',
  name: 'Master Service Agreement - Cloud Architecture',
  type: 'B2B Consulting & Services Contract',
  fileSize: '156 KB',
  uploadDate: '2026-02-12',
  lastAnalyzed: '1 day ago',
  status: 'Analyzed',
  parties: ['Client: Apex Retail Corp', 'Provider: Kestrel Cloud Solutions LLP'],
  duration: '6 Months (Milestone-based)',
  governingLaw: 'State of Delaware',
  totalClauses: 16,
  summary: 'A commercial Master Services Agreement for migrating legacy infrastructure to a scalable cloud cluster, covering project milestones, acceptance criteria, net-30 invoicing, and indemnity caps.',
  simpleLanguageSummary: {
    corePremise: 'Kestrel Cloud Solutions will migrate Apex Retail’s ecommerce backend to AWS/GCP over 6 months.',
    financialSummary: 'Total contract value is $84,000, billed in four milestone tranches of $21,000 on Net-30 terms.',
    exitConditions: 'Either party may terminate for material breach with 14 days cure period, or for convenience with 30 days written notice and payment for work completed.',
    mainRisks: 'Acceptance testing clause has a deemed acceptance window of only 5 business days. Indemnification lacks a clear mutual aggregate cap.'
  },
  rawText: `MASTER SERVICES AGREEMENT
Parties: Apex Retail Corp ("Client") and Kestrel Cloud Solutions ("Provider").
Total Fee: $84,000 payable across 4 milestones.
Acceptance: Client has 5 business days to reject deliverables, otherwise deemed accepted.
Liability: Limited to total fees paid under the applicable Statement of Work.`,
  clauses: [
    {
      id: 'srv-cl-1',
      sectionNumber: 'Section 4.3',
      title: 'Deemed Acceptance Window (5 Days)',
      pageNumber: 2,
      originalText: 'Client shall have five (5) business days following receipt of milestone deliverables to test and submit written objections. In the absence of written objection within such window, deliverables shall be deemed irrevocably accepted.',
      simplifiedText: 'You only have 5 days to test and reject any technical milestone; otherwise, it is automatically approved and payment becomes due.',
      tags: ['Important', 'Review Recommended'],
      category: 'Responsibilities',
      explanation: {
        whatItSays: 'Deliverables are deemed accepted if client does not send detailed written objections within 5 business days.',
        whyItMatters: 'Technical QA for cloud migration often requires 10 to 14 days of stress testing and security review.',
        whoItAffects: 'Client engineering and verification teams.',
        whatToVerify: 'Verify whether 5 days is sufficient for your internal team to run functional validation.',
        suggestedQuestionForLawyer: 'Can the deemed acceptance period be expanded from 5 business days to 14 business days to allow thorough end-to-end integration testing?'
      }
    }
  ],
  obligations: [
    {
      id: 'srv-ob-1',
      party: 'Provider',
      description: 'Deliver weekly sprint progress reports and migration benchmarks.',
      originalSection: 'Section 2.2',
      importance: 'Standard'
    },
    {
      id: 'srv-ob-2',
      party: 'Client',
      description: 'Remit payment within Net-30 calendar days upon signed acceptance of each milestone.',
      originalSection: 'Section 3.4',
      importance: 'Critical'
    }
  ],
  dates: [
    {
      id: 'srv-dt-1',
      date: '2026-04-15',
      formattedDate: '15 Apr 2026',
      event: 'Milestone 2 Delivery: Database Re-platforming',
      explanation: 'Cutover of relational database to managed cloud instance.',
      actionRequired: 'Execute test scripts within acceptance window.',
      isUpcoming: true,
      daysRemaining: 26
    }
  ],
  reviewPoints: [
    {
      id: 'srv-rp-1',
      title: '5-Day Deemed Acceptance Risk',
      severity: 'Review Recommended',
      summary: 'Automatic acceptance after 5 business days can trigger premature payment obligations.',
      detailedNotice: 'Complex cloud deployments rarely complete load and security verification within 5 working days.',
      actionableStep: 'Negotiate 10-15 business days for milestone QA.',
      clauseId: 'srv-cl-1'
    }
  ],
  checklist: [
    {
      id: 'srv-chk-1',
      text: 'Negotiate extension of 5-day acceptance testing window to 10 days',
      category: 'Pre-Signing',
      completed: false
    }
  ],
  lawyerQuestions: [
    {
      id: 'srv-lq-1',
      number: 1,
      question: 'Is the mutual liability limitation sufficiently protective against secondary data breach claims?',
      rationale: 'Clarifying whether cloud security breaches fall inside or outside the fee liability cap.',
      relatedClause: 'Section 7.1',
      category: 'Liability'
    }
  ]
};

export const ALL_DEMO_DOCUMENTS: LegalDocument[] = [
  DEMO_RENTAL_AGREEMENT,
  DEMO_EMPLOYMENT_AGREEMENT,
  DEMO_SERVICE_CONTRACT
];

export const COMPARISON_DEMO_DATA = {
  docA: {
    name: 'Standard Residential Lease (Draft A)',
    type: '11-Month Lease',
    duration: '11 Months',
    parties: 'Tenant Parker / Crestview LLC'
  },
  docB: {
    name: 'Revised Landlord Counter-Offer (Draft B)',
    type: '12-Month Lease',
    duration: '12 Months',
    parties: 'Tenant Parker / Crestview LLC'
  },
  comparisonItems: [
    {
      category: 'Termination',
      field: 'Early Termination Notice Period',
      docAValue: '30 calendar days written notice',
      docBValue: '60 calendar days written notice',
      aiExplanation: 'Draft B doubles the notice commitment, making it much harder to exit quickly if life circumstances change.',
      differenceType: 'significant_difference' as const,
      affectedParty: 'Tenant'
    },
    {
      category: 'Financial',
      field: 'Security Deposit Amount',
      docAValue: '$3,700 (2 months base rent)',
      docBValue: '$1,850 (1 month base rent)',
      aiExplanation: 'Draft B requires half the upfront capital for the deposit, which is favorable for tenant cash flow.',
      differenceType: 'significant_difference' as const,
      affectedParty: 'Tenant (Favorable)'
    },
    {
      category: 'Financial',
      field: 'Early Exit Penalty',
      docAValue: '50% of deposit forfeiture ($1,850)',
      docBValue: 'Full forfeiture of deposit + 1 month rent ($3,700 total)',
      aiExplanation: 'Draft B imposes an aggressive double penalty for breaking the lease prior to term end.',
      differenceType: 'warning' as const,
      affectedParty: 'Tenant (High Risk)'
    },
    {
      category: 'Responsibilities',
      field: 'Maintenance Deductible',
      docAValue: '$100 or less per incident paid by Tenant',
      docBValue: '$50 or less per incident paid by Tenant',
      aiExplanation: 'Draft B reduces tenant minor repair burden from $100 down to $50.',
      differenceType: 'minor_difference' as const,
      affectedParty: 'Tenant'
    },
    {
      category: 'Governance',
      field: 'Landlord Entry Notice',
      docAValue: '12 hours advance digital notice',
      docBValue: '24 hours advance written notice',
      aiExplanation: 'Draft B offers better privacy protection aligning with standard 24-hour statutory courtesy.',
      differenceType: 'minor_difference' as const,
      affectedParty: 'Tenant (Favorable)'
    },
    {
      category: 'Termination',
      field: 'Lease Renewal Mechanism',
      docAValue: 'Automatic expiration; explicit written agreement needed',
      docBValue: 'Automatic month-to-month rollover with 5% annual escalation',
      aiExplanation: 'Draft B automatically extends the tenancy into a month-to-month arrangement if neither party issues notice.',
      differenceType: 'significant_difference' as const,
      affectedParty: 'Both Parties'
    },
    {
      category: 'Liability',
      field: 'Dispute Resolution Method',
      docAValue: 'Mandatory conciliation prior to court',
      docBValue: 'Binding single-arbitrator commercial arbitration',
      aiExplanation: 'Draft B forces disputes into binding private arbitration where legal fees may be higher.',
      differenceType: 'warning' as const,
      affectedParty: 'Both Parties'
    }
  ],
  summaryAI: 'Comparing Draft A against Draft B reveals significant trade-offs: Draft B requires only 1 month security deposit upfront (saving $1,850 initially) and offers 24-hour entry notice. However, Draft B significantly increases risk upon exit by doubling the notice window to 60 days and demanding a steep double penalty for early termination. If you value flexibility, Draft A is safer; if you prioritize lower upfront cash, Draft B is preferable provided you negotiate the early exit penalty.'
};
