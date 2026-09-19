import { LegalDocument, DocumentComparisonItem } from './types';

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

This Executive Employment Agreement ("Agreement") is entered into as of February 1, 2026, by and between Nexus AI Solutions Inc., a Delaware corporation ("Company"), and Jordan Rivera ("Employee").

1. POSITION AND DUTIES
1.1 The Company agrees to employ Employee as Staff Software Engineer. Employee shall devote full professional time, attention, and energies to the business of the Company.
1.2 Employee shall receive an initial annualized base salary of $165,000.00, payable in semi-monthly installments subject to standard payroll tax withholdings.

2. EQUITY INCENTIVE COMPENSATION
2.1 Subject to approval by the Board of Directors, Employee shall be granted an option to purchase 25,000 shares of Common Stock under the 2024 Equity Incentive Plan.
2.2 The Options shall vest over a four (4) year period: twenty-five percent (25%) shall vest on the first (1st) anniversary of the Employment Start Date (the "Cliff Date"), and the remaining seventy-five percent (75%) shall vest in equal monthly installments over the subsequent thirty-six (36) months, contingent on continuous service.

3. PROPRIETARY INFORMATION AND INVENTIONS ASSIGNMENT
3.1 Employee hereby assigns and transfers exclusively to Company all rights, title, and interest in and to all inventions, discoveries, software code, trade secrets, and methodologies conceived, created, or authored during employment, whether during working hours or using personal equipment if related to Company's business fields.
3.2 Excluded from this assignment are inventions that qualify fully for exemption under California Labor Code Section 2870, provided Employee discloses them on Schedule A attached hereto prior to commencement.

4. RESTRICTIVE COVENANTS AND NON-SOLICITATION
4.1 During employment and for eighteen (18) months following termination, Employee shall not directly or indirectly recruit, solicit, or induce any employee, consultant, or independent contractor to leave Company employment.
4.2 During the Restricted Period, Employee shall not solicit or divert active or prospective clients of the Company with whom Employee had material business contact.

5. SEPARATION, NOTICE AND SEVERANCE
5.1 Employment is at-will. Either party may terminate employment upon thirty (30) calendar days prior written notice.
5.2 In the event Company terminates Employee's employment without Cause, Company shall pay Employee two (2) months of base salary as severance pay, subject to execution of an effective mutual release of claims.

6. CONFIDENTIALITY AND TRADE SECRETS
6.1 Employee covenants to safeguard all non-public technical specifications, model weights, training datasets, and proprietary algorithms, and not disclose them to third parties without prior written consent.`,
  clauses: [
    {
      id: 'emp-cl-1',
      sectionNumber: 'Section 1.2',
      title: 'Base Compensation & Payment Terms',
      pageNumber: 1,
      originalText: 'Employee shall receive an initial annualized base salary of $165,000.00, payable in semi-monthly installments subject to standard payroll tax withholdings.',
      simplifiedText: 'You will earn a base salary of $165,000 per year, paid twice a month with standard tax deductions.',
      tags: ['Important', 'Financial'],
      category: 'Financial',
      explanation: {
        whatItSays: 'Fixes annual base salary at $165,000 with semi-monthly distribution.',
        whyItMatters: 'Establishes guaranteed base pay regardless of company performance or milestone achievements.',
        whoItAffects: 'Employee compensation.',
        whatToVerify: 'Verify performance review cycles and annual bonus eligibility criteria.',
        suggestedQuestionForLawyer: 'Is there a guaranteed annual cost-of-living or performance adjustment schedule incorporated into this base salary?'
      }
    },
    {
      id: 'emp-cl-2',
      sectionNumber: 'Section 2.1 & 2.2',
      title: 'Equity Grant & 1-Year Cliff Vesting',
      pageNumber: 1,
      originalText: 'Employee shall be granted an option to purchase 25,000 shares of Common Stock... twenty-five percent (25%) shall vest on the first (1st) anniversary of the Employment Start Date (the "Cliff Date"), and the remaining seventy-five percent (75%) shall vest in equal monthly installments over the subsequent thirty-six (36) months.',
      simplifiedText: 'You get 25,000 stock options. You must stay 1 full year to earn the first 25% (6,250 shares). The remaining 75% vests monthly over the next 3 years.',
      tags: ['Important', 'Financial'],
      category: 'Financial',
      explanation: {
        whatItSays: 'Standard 4-year vesting schedule with a 1-year cliff before any equity vests.',
        whyItMatters: 'If you leave or are terminated at month 11, you leave with 0 vested shares.',
        whoItAffects: 'Employee long-term incentive upside.',
        whatToVerify: 'Check option strike price, post-termination exercise window (standard 90 days vs extended), and acceleration on change-of-control.',
        suggestedQuestionForLawyer: 'Does this grant provide single or double-trigger vesting acceleration if the company is acquired?'
      }
    },
    {
      id: 'emp-cl-3',
      sectionNumber: 'Section 3.1 & 3.2',
      title: 'Broad Intellectual Property Assignment',
      pageNumber: 2,
      originalText: 'Employee hereby assigns and transfers exclusively to Company all rights, title, and interest in and to all inventions, discoveries, software code, trade secrets, and methodologies conceived, created, or authored during employment, whether during working hours or using personal equipment if related to Company’s business fields.',
      simplifiedText: 'The company claims full ownership of any code or invention you build during your employment, even on your personal computer if it relates to their industry.',
      tags: ['Potential Concern', 'Review Recommended'],
      category: 'Liability',
      explanation: {
        whatItSays: 'Broad IP assignment claiming side projects and software conceived on personal time if vaguely related to the company’s roadmap.',
        whyItMatters: 'Could inadvertently transfer ownership of your personal open-source projects or side startups.',
        whoItAffects: 'Employee personal intellectual property.',
        whatToVerify: 'Demand to attach Schedule A explicitly listing all pre-existing personal repositories and projects.',
        suggestedQuestionForLawyer: 'Does this IP assignment comply with statutory labor carve-outs (e.g. CA Labor Code 2870) for inventions developed on personal time without company hardware?'
      }
    },
    {
      id: 'emp-cl-4',
      sectionNumber: 'Section 4.1 & 4.2',
      title: '18-Month Non-Solicitation Covenant',
      pageNumber: 2,
      originalText: 'During employment and for eighteen (18) months following termination, Employee shall not directly or indirectly recruit, solicit, or induce any employee, consultant, or independent contractor to leave Company employment... nor solicit or divert active or prospective clients.',
      simplifiedText: 'For 1.5 years after leaving, you cannot ask former coworkers to join you at another company or pitch company clients.',
      tags: ['Review Recommended', 'Important'],
      category: 'Termination',
      explanation: {
        whatItSays: 'Restricts recruiting coworkers or contacting clients for 18 months post-departure.',
        whyItMatters: '18 months is a long window that can limit your ability to recruit teammates for a future startup or venture.',
        whoItAffects: 'Employee future career and hiring network.',
        whatToVerify: 'Check if non-solicitation covenants are enforceable in your state jurisdiction.',
        suggestedQuestionForLawyer: 'Is an 18-month non-solicitation restriction for employees and clients enforceable under applicable state employment laws?'
      }
    },
    {
      id: 'emp-cl-5',
      sectionNumber: 'Section 5.1 & 5.2',
      title: 'Separation Notice & 2-Month Severance',
      pageNumber: 3,
      originalText: 'Employment is at-will. Either party may terminate employment upon thirty (30) calendar days prior written notice... In the event Company terminates Employee’s employment without Cause, Company shall pay Employee two (2) months of base salary as severance pay.',
      simplifiedText: 'Either party can end employment with 30 days notice. If the company fires you without cause, you receive 2 months of severance pay ($27,500).',
      tags: ['Important'],
      category: 'Termination',
      explanation: {
        whatItSays: 'Provides 30-day notice and 2 months of guaranteed severance if fired without cause.',
        whyItMatters: 'Provides a safety net during transition, though you must sign a release of claims to collect it.',
        whoItAffects: 'Both Employee and Employer.',
        whatToVerify: 'Check the exact contractual definition of "Cause" to ensure it cannot be invoked arbitrarily.',
        suggestedQuestionForLawyer: 'Is the definition of "Cause" narrowly defined to require written warning and a 30-day cure period before severance can be denied?'
      }
    },
    {
      id: 'emp-cl-6',
      sectionNumber: 'Section 6.1',
      title: 'Confidentiality & Trade Secret Protections',
      pageNumber: 3,
      originalText: 'Employee covenants to safeguard all non-public technical specifications, model weights, training datasets, and proprietary algorithms, and not disclose them to third parties without prior written consent.',
      simplifiedText: 'You must maintain strict secrecy regarding company training datasets, AI model weights, and proprietary code indefinitely.',
      tags: ['Informational'],
      category: 'Responsibilities',
      explanation: {
        whatItSays: 'Indefinite non-disclosure of technical architecture and proprietary data.',
        whyItMatters: 'Standard in deep tech, but ensure it does not prohibit using general engineering knowledge in future roles.',
        whoItAffects: 'Employee technical communication.',
        whatToVerify: 'Confirm that general skills and residual knowledge are excluded from confidentiality restrictions.',
        suggestedQuestionForLawyer: 'Does this confidentiality clause include a standard "residuals" clause protecting general know-how acquired during employment?'
      }
    }
  ],
  obligations: [
    {
      id: 'emp-ob-1',
      party: 'Employee',
      description: 'Devote full professional working time and loyalty; refrain from competing side consulting.',
      originalSection: 'Section 1.1',
      consequence: 'Grounds for immediate termination for Cause.',
      importance: 'Standard'
    },
    {
      id: 'emp-ob-2',
      party: 'Employee',
      description: 'Refrain from soliciting employees or active company clients for 18 months post-employment.',
      originalSection: 'Section 4.1',
      consequence: 'Injunction and monetary damages for lost revenue.',
      importance: 'Watch'
    },
    {
      id: 'emp-ob-3',
      party: 'Employer',
      description: 'Pay base annual compensation of $165,000 semi-monthly plus standard health benefit coverage.',
      originalSection: 'Section 1.2',
      consequence: 'Wage claim and statutory penalties for unpaid compensation.',
      importance: 'Critical'
    },
    {
      id: 'emp-ob-4',
      party: 'Employer',
      description: 'Provide two (2) months base salary severance upon termination without Cause.',
      originalSection: 'Section 5.2',
      consequence: 'Breach of contract damages.',
      importance: 'Critical'
    }
  ],
  dates: [
    {
      id: 'emp-dt-1',
      date: '2026-03-01',
      formattedDate: '01 Mar 2026',
      event: 'Official Start Date & Payroll Inception',
      explanation: 'First day of employment and benefits enrollment window.',
      actionRequired: 'Submit Form I-9 verification and execute Schedule A prior inventions list.',
      isUpcoming: false,
      daysRemaining: 0,
      sourceSection: 'Section 1.1'
    },
    {
      id: 'emp-dt-2',
      date: '2026-03-31',
      formattedDate: '31 Mar 2026',
      event: 'Section 83(b) Tax Election Deadline',
      explanation: 'Statutory 30-day window following equity award grant.',
      actionRequired: 'Consult CPA to determine whether to file an 83(b) election with the IRS.',
      isUpcoming: true,
      daysRemaining: 11,
      sourceSection: 'Section 2.1'
    },
    {
      id: 'emp-dt-3',
      date: '2027-03-01',
      formattedDate: '01 Mar 2027',
      event: 'Equity 1-Year Cliff Vesting Milestone',
      explanation: 'First 25% of the 25,000 stock options (6,250 shares) vest fully.',
      actionRequired: 'Verify cap table portal balance and check ongoing monthly vesting schedule.',
      isUpcoming: true,
      daysRemaining: 345,
      sourceSection: 'Section 2.2'
    }
  ],
  reviewPoints: [
    {
      id: 'emp-rp-1',
      title: 'Broad IP Assignment Encroachment',
      severity: 'Potential Concern',
      summary: 'Section 3.1 claims inventions made on personal time if related to prospective company roadmap.',
      detailedNotice: 'Always ensure an explicit "Schedule of Prior Inventions" is attached to preserve your existing GitHub repositories.',
      actionableStep: 'Attach Schedule A listing your personal open source libraries and pre-existing domains.',
      clauseId: 'emp-cl-3'
    },
    {
      id: 'emp-rp-2',
      title: 'Prolonged 18-Month Non-Solicitation Window',
      severity: 'Review Recommended',
      summary: 'Section 4.1 restricts contacting former colleagues or clients for 18 months.',
      detailedNotice: '18 months exceeds standard 12-month tech industry covenants and can impede future recruiting.',
      actionableStep: 'Propose reducing non-solicitation duration from 18 months to 12 months.',
      clauseId: 'emp-cl-4'
    }
  ],
  checklist: [
    {
      id: 'emp-chk-1',
      text: 'Submit Schedule of Prior Inventions before signing to protect side projects',
      category: 'Pre-Signing',
      completed: false,
      deadline: 'Before contract signature',
      note: 'Clause 3.2 allows statutory carve-outs'
    },
    {
      id: 'emp-chk-2',
      text: 'Confirm health insurance coverage inception date and HSA contributions',
      category: 'Immediate',
      completed: true,
      deadline: 'First week of onboarding'
    },
    {
      id: 'emp-chk-3',
      text: 'Calendar 83(b) tax election cutoff (30 days from stock option grant)',
      category: 'Immediate',
      completed: false,
      deadline: '2026-03-31'
    },
    {
      id: 'emp-chk-4',
      text: 'Negotiate reduction of 18-month non-solicitation down to 12 months',
      category: 'Pre-Signing',
      completed: false,
      deadline: 'Prior to contract execution'
    }
  ],
  lawyerQuestions: [
    {
      id: 'emp-lq-1',
      number: 1,
      question: 'Does the IP assignment clause adequately protect my pre-existing personal open-source libraries?',
      rationale: 'Protecting personal GitHub repositories from retroactive company ownership claims.',
      relatedClause: 'Section 3.1 (Inventions Assignment)',
      category: 'Intellectual Property'
    },
    {
      id: 'emp-lq-2',
      number: 2,
      question: 'Is the 18-month employee and customer non-solicitation restriction legally enforceable in California/Delaware?',
      rationale: 'Clarifying whether post-employment restrictions could hinder future startup formation.',
      relatedClause: 'Section 4.1 (Non-Solicitation)',
      category: 'Post-Employment'
    },
    {
      id: 'emp-lq-3',
      number: 3,
      question: 'Does the equity grant include double-trigger acceleration upon a change of control or acquisition?',
      rationale: 'Protecting unvested options if the startup is acquired before the 4-year vesting schedule completes.',
      relatedClause: 'Section 2.2 (Equity Vesting)',
      category: 'Equity & Severance'
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

This Master Services Agreement ("Agreement") is executed as of February 10, 2026, by and between Apex Retail Corp ("Client") and Kestrel Cloud Solutions LLP ("Provider").

1. SERVICES AND STATEMENTS OF WORK
1.1 Provider shall perform enterprise cloud migration, database re-platforming, and infrastructure automation services as detailed in Statement of Work #1 ("SOW").

2. COMPENSATION AND BILLING
2.1 Total contract fees under SOW #1 shall be $84,000.00, invoiced in four equal milestone installments of $21,000.00 each upon milestone completion.
2.2 Client covenants to remit payment within thirty (30) calendar days of invoice receipt ("Net-30"). Invoices unpaid after 45 days incur 1.0% monthly interest.

3. ACCEPTANCE TESTING CRITERIA
3.1 Client shall have five (5) business days following receipt of milestone deliverables to test and submit written objections. In the absence of written objection within such window, deliverables shall be deemed irrevocably accepted.

4. INDEPENDENT CONTRACTOR RELATIONSHIP
4.1 Provider is an independent contractor. Neither party shall act as an agent, partner, or joint venturer of the other.

5. LIMITATION OF LIABILITY
5.1 Except for breaches of confidentiality, each party's aggregate monetary liability under this Agreement shall not exceed the total fees actually paid to Provider hereunder ($84,000.00).

6. TERMINATION AND NOTICE
6.1 Either party may terminate this Agreement for material breach upon fourteen (14) days prior written notice, provided the breaching party fails to cure within said window.
6.2 Client may terminate for convenience upon thirty (30) days prior written notice, subject to paying for all work completed.`,
  clauses: [
    {
      id: 'srv-cl-1',
      sectionNumber: 'Section 2.1 & 2.2',
      title: 'Milestone Fees & Net-30 Payment Terms',
      pageNumber: 1,
      originalText: 'Total contract fees under SOW #1 shall be $84,000.00, invoiced in four equal milestone installments of $21,000.00 each... Client covenants to remit payment within thirty (30) calendar days of invoice receipt ("Net-30").',
      simplifiedText: 'Total fee is $84,000, billed in 4 chunks of $21,000 upon milestone sign-off. Payments are due within 30 days.',
      tags: ['Important', 'Financial'],
      category: 'Financial',
      explanation: {
        whatItSays: 'Sets four $21,000 milestone payments on standard Net-30 payment terms.',
        whyItMatters: 'Guarantees milestone gating so payment is tied directly to verified delivery.',
        whoItAffects: 'Both Client and Provider finance teams.',
        whatToVerify: 'Verify exact delivery definitions for each of the four technical milestones.',
        suggestedQuestionForLawyer: 'Are acceptance criteria sufficiently objective to prevent disputed milestone billing?'
      }
    },
    {
      id: 'srv-cl-2',
      sectionNumber: 'Section 3.1',
      title: 'Deemed Acceptance Window (5 Days)',
      pageNumber: 2,
      originalText: 'Client shall have five (5) business days following receipt of milestone deliverables to test and submit written objections. In the absence of written objection within such window, deliverables shall be deemed irrevocably accepted.',
      simplifiedText: 'You only have 5 business days to test and submit written objections to any milestone; otherwise, it is automatically approved.',
      tags: ['Potential Concern', 'Review Recommended'],
      category: 'Responsibilities',
      explanation: {
        whatItSays: 'Automatic approval occurs after 5 business days if written bugs are not submitted.',
        whyItMatters: '5 days is very tight for end-to-end integration and load testing of cloud architecture.',
        whoItAffects: 'Client engineering and QA teams.',
        whatToVerify: 'Request expanding acceptance testing window to at least 10–14 business days.',
        suggestedQuestionForLawyer: 'Can the deemed acceptance period be expanded from 5 business days to 14 business days to allow thorough end-to-end integration testing?'
      }
    },
    {
      id: 'srv-cl-3',
      sectionNumber: 'Section 5.1',
      title: 'Aggregate Liability Cap ($84,000)',
      pageNumber: 2,
      originalText: 'Except for breaches of confidentiality, each party\'s aggregate monetary liability under this Agreement shall not exceed the total fees actually paid to Provider hereunder ($84,000.00).',
      simplifiedText: 'Neither party can be sued for more than the contract total ($84,000), even if an outage or service failure causes larger business losses.',
      tags: ['Important'],
      category: 'Liability',
      explanation: {
        whatItSays: 'Limits total damage claims to fees paid ($84,000) and excludes indirect consequential losses.',
        whyItMatters: 'Protects both parties from unlimited liability, but caps recovery if a major data incident occurs.',
        whoItAffects: 'Both parties.',
        whatToVerify: 'Verify whether data breach liabilities should be carved out into a higher super-cap.',
        suggestedQuestionForLawyer: 'Should gross negligence or cloud security breaches be excluded from the $84,000 aggregate liability limitation?'
      }
    },
    {
      id: 'srv-cl-4',
      sectionNumber: 'Section 6.1 & 6.2',
      title: 'Termination for Cause & Convenience',
      pageNumber: 3,
      originalText: 'Either party may terminate this Agreement for material breach upon fourteen (14) days prior written notice, provided the breaching party fails to cure... Client may terminate for convenience upon thirty (30) days prior written notice.',
      simplifiedText: 'Either side can cancel for breach after giving 14 days to fix it. The client can cancel anytime with 30 days notice by paying for work done.',
      tags: ['Important'],
      category: 'Termination',
      explanation: {
        whatItSays: '14-day cure window for breach, and 30-day convenience termination for client.',
        whyItMatters: 'Fair termination exit mechanism that avoids prolonged lock-in.',
        whoItAffects: 'Both parties.',
        whatToVerify: 'Clarify what happens to work-in-progress deliverables upon convenience termination.',
        suggestedQuestionForLawyer: 'Does the contract guarantee full transfer of all work-in-progress code if terminated early for convenience?'
      }
    }
  ],
  obligations: [
    {
      id: 'srv-ob-1',
      party: 'Provider',
      description: 'Execute database migration and deliver architecture automation documentation per SOW.',
      originalSection: 'Section 1.1',
      consequence: 'Client withholding of milestone payment tranche.',
      importance: 'Critical'
    },
    {
      id: 'srv-ob-2',
      party: 'Client',
      description: 'Remit milestone payment within Net-30 calendar days upon signed acceptance.',
      originalSection: 'Section 2.2',
      consequence: '1.0% monthly interest on unpaid balances.',
      importance: 'Standard'
    },
    {
      id: 'srv-ob-3',
      party: 'Client',
      description: 'Submit written rejection notices within 5 business days of deliverable receipt.',
      originalSection: 'Section 3.1',
      consequence: 'Deemed irrevocable acceptance and payment obligation.',
      importance: 'Watch'
    }
  ],
  dates: [
    {
      id: 'srv-dt-1',
      date: '2026-02-15',
      formattedDate: '15 Feb 2026',
      event: 'Contract Effective Date & SOW Inception',
      explanation: 'Official kickoff of cloud migration sprints.',
      actionRequired: 'Provide IAM credentials and access to staging VPC.',
      isUpcoming: false,
      daysRemaining: 0,
      sourceSection: 'Section 1.1'
    },
    {
      id: 'srv-dt-2',
      date: '2026-04-15',
      formattedDate: '15 Apr 2026',
      event: 'Milestone 2 Delivery: Database Re-platforming',
      explanation: 'Cutover of relational database to managed cloud instance.',
      actionRequired: 'Execute test scripts within acceptance window.',
      isUpcoming: true,
      daysRemaining: 26,
      sourceSection: 'Section 3.1'
    },
    {
      id: 'srv-dt-3',
      date: '2026-08-15',
      formattedDate: '15 Aug 2026',
      event: 'Final Milestone Delivery & Knowledge Transfer',
      explanation: 'Handover of infrastructure automation templates and final sign-off.',
      actionRequired: 'Complete acceptance testing and remit final milestone tranche.',
      isUpcoming: true,
      daysRemaining: 148,
      sourceSection: 'Section 2.1'
    }
  ],
  reviewPoints: [
    {
      id: 'srv-rp-1',
      title: '5-Day Deemed Acceptance Window Risk',
      severity: 'Potential Concern',
      summary: 'Automatic acceptance after 5 business days can trigger premature payment obligations.',
      detailedNotice: 'Complex cloud deployments rarely complete load and security verification within 5 working days.',
      actionableStep: 'Negotiate expanding the testing window to 10–14 business days.',
      clauseId: 'srv-cl-2'
    },
    {
      id: 'srv-rp-2',
      title: 'Liability Cap Scope for Data Breaches',
      severity: 'Important',
      summary: 'Section 5.1 caps liability at fees paid ($84,000) for all claims except confidentiality.',
      detailedNotice: 'Consider adding a separate higher super-cap for data protection liabilities.',
      actionableStep: 'Propose a $250,000 super-cap for data privacy breaches.',
      clauseId: 'srv-cl-3'
    }
  ],
  checklist: [
    {
      id: 'srv-chk-1',
      text: 'Negotiate extension of 5-day acceptance testing window to 10 or 14 business days',
      category: 'Pre-Signing',
      completed: false,
      deadline: 'Before contract signature'
    },
    {
      id: 'srv-chk-2',
      text: 'Define specific quantitative acceptance criteria for each of the 4 milestone deliveries',
      category: 'Pre-Signing',
      completed: true,
      deadline: 'Prior to kickoff'
    },
    {
      id: 'srv-chk-3',
      text: 'Verify AWS/GCP staging VPC access and security groups for Provider technicians',
      category: 'Immediate',
      completed: false,
      deadline: '2026-02-20'
    }
  ],
  lawyerQuestions: [
    {
      id: 'srv-lq-1',
      number: 1,
      question: 'Is the mutual liability limitation sufficiently protective against secondary data breach claims?',
      rationale: 'Clarifying whether cloud security breaches fall inside or outside the $84,000 fee liability cap.',
      relatedClause: 'Section 5.1 (Limitation of Liability)',
      category: 'Liability & Indemnity'
    },
    {
      id: 'srv-lq-2',
      number: 2,
      question: 'Can we amend the 5-day deemed acceptance period to require explicit written sign-off before invoice approval?',
      rationale: 'Preventing premature deemed acceptance of partially functional software.',
      relatedClause: 'Section 3.1 (Acceptance Testing)',
      category: 'Acceptance & Gating'
    }
  ]
};

export const ALL_DEMO_DOCUMENTS: LegalDocument[] = [
  DEMO_RENTAL_AGREEMENT,
  DEMO_EMPLOYMENT_AGREEMENT,
  DEMO_SERVICE_CONTRACT
];

export interface ComparisonPreset {
  id: string;
  label: string;
  category: string;
  docA: {
    name: string;
    type: string;
    duration: string;
    parties: string;
  };
  docB: {
    name: string;
    type: string;
    duration: string;
    parties: string;
  };
  comparisonItems: DocumentComparisonItem[];
  summaryAI: string;
}

export const COMPARISON_PRESETS: Record<string, ComparisonPreset> = {
  lease: {
    id: 'lease',
    label: 'Apartment Lease: Standard Draft A vs Counter Offer B',
    category: 'Residential Lease',
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
        differenceType: 'significant_difference',
        affectedParty: 'Tenant'
      },
      {
        category: 'Financial',
        field: 'Security Deposit Amount',
        docAValue: '$3,700 (2 months base rent)',
        docBValue: '$1,850 (1 month base rent)',
        aiExplanation: 'Draft B requires half the upfront capital for the deposit, which is favorable for tenant cash flow.',
        differenceType: 'significant_difference',
        affectedParty: 'Tenant (Favorable)'
      },
      {
        category: 'Financial',
        field: 'Early Exit Penalty',
        docAValue: '50% of deposit forfeiture ($1,850)',
        docBValue: 'Full forfeiture of deposit + 1 month rent ($3,700 total)',
        aiExplanation: 'Draft B imposes an aggressive double penalty for breaking the lease prior to term end.',
        differenceType: 'warning',
        affectedParty: 'Tenant (High Risk)'
      },
      {
        category: 'Responsibilities',
        field: 'Maintenance Deductible',
        docAValue: '$100 or less per incident paid by Tenant',
        docBValue: '$50 or less per incident paid by Tenant',
        aiExplanation: 'Draft B reduces tenant minor repair burden from $100 down to $50.',
        differenceType: 'minor_difference',
        affectedParty: 'Tenant'
      },
      {
        category: 'Governance',
        field: 'Landlord Entry Notice',
        docAValue: '12 hours advance digital notice',
        docBValue: '24 hours advance written notice',
        aiExplanation: 'Draft B offers better privacy protection aligning with standard 24-hour statutory courtesy.',
        differenceType: 'minor_difference',
        affectedParty: 'Tenant (Favorable)'
      },
      {
        category: 'Termination',
        field: 'Lease Renewal Mechanism',
        docAValue: 'Automatic expiration; explicit written agreement needed',
        docBValue: 'Automatic month-to-month rollover with 5% annual escalation',
        aiExplanation: 'Draft B automatically extends the tenancy into a month-to-month arrangement if neither party issues notice.',
        differenceType: 'significant_difference',
        affectedParty: 'Both Parties'
      },
      {
        category: 'Liability',
        field: 'Dispute Resolution Method',
        docAValue: 'Mandatory conciliation prior to court',
        docBValue: 'Binding single-arbitrator commercial arbitration',
        aiExplanation: 'Draft B forces disputes into binding private arbitration where legal fees may be higher.',
        differenceType: 'warning',
        affectedParty: 'Both Parties'
      }
    ],
    summaryAI: 'Comparing Draft A against Draft B reveals significant trade-offs: Draft B requires only 1 month security deposit upfront (saving $1,850 initially) and offers 24-hour entry notice. However, Draft B significantly increases risk upon exit by doubling the notice window to 60 days and demanding a steep double penalty for early termination. If you value flexibility, Draft A is safer; if you prioritize lower upfront cash, Draft B is preferable provided you negotiate the early exit penalty.'
  },
  employment: {
    id: 'employment',
    label: 'Employment Agreement: Initial Offer vs Executive Counter',
    category: 'Employment & Labor',
    docA: {
      name: 'Standard Tech Employment Offer (Draft A)',
      type: 'At-Will Employment Agreement',
      duration: 'Indefinite / At-Will',
      parties: 'Alex Parker / NexaSoft AI Corp'
    },
    docB: {
      name: 'Executive Counter-Draft (Draft B)',
      type: 'Senior Staff Employment Agreement',
      duration: 'Indefinite / At-Will',
      parties: 'Alex Parker / NexaSoft AI Corp'
    },
    comparisonItems: [
      {
        category: 'Financial',
        field: 'Base Salary & Signing Bonus',
        docAValue: '$155,000 base; zero signing bonus',
        docBValue: '$165,000 base; $20,000 upfront signing bonus',
        aiExplanation: 'Draft B enhances immediate liquidity and total annual guaranteed cash compensation by $30,000 in Year 1.',
        differenceType: 'minor_difference',
        affectedParty: 'Employee (Favorable)'
      },
      {
        category: 'Responsibilities',
        field: 'IP Inventions Assignment Scope',
        docAValue: 'All inventions created during employment term, including off-hours on personal equipment',
        docBValue: 'Inventions created using Company resources directly related to Company current core business; prior projects excluded',
        aiExplanation: 'Draft B carves out pre-existing personal open-source projects and personal time discoveries.',
        differenceType: 'significant_difference',
        affectedParty: 'Employee (Protection)'
      },
      {
        category: 'Termination',
        field: 'Post-Employment Non-Compete',
        docAValue: '18 months worldwide across all AI/software development sectors',
        docBValue: '6 months restricted to direct enterprise legal-tech competitors within 50 miles',
        aiExplanation: 'Draft A severely restricts future employment; Draft B narrows duration to 6 months and restricts scope to direct competitors.',
        differenceType: 'warning',
        affectedParty: 'Employee (High Impact)'
      },
      {
        category: 'Financial',
        field: 'Severance & Health Benefits',
        docAValue: '2 weeks statutory base salary; no COBRA subsidy',
        docBValue: '12 weeks base salary + 3 months fully paid COBRA health continuation',
        aiExplanation: 'Draft B provides a 6x stronger financial cushion if employment is terminated without cause.',
        differenceType: 'significant_difference',
        affectedParty: 'Employee (Favorable)'
      },
      {
        category: 'Governance',
        field: 'Termination Notice & Cure Period',
        docAValue: 'Immediate termination without prior notice during first 12 months',
        docBValue: '30-day written notice with 15-day cure opportunity for non-gross misconduct',
        aiExplanation: 'Draft B prevents arbitrary sudden dismissal by mandating written notice and a formal cure window.',
        differenceType: 'significant_difference',
        affectedParty: 'Employee'
      }
    ],
    summaryAI: 'The counter-offer (Draft B) materially improves employee legal protections: the aggressive 18-month global non-compete is curtailed to 6 localized months, pre-existing intellectual property is safeguarded from automatic company takeover, and severance protection expands from 2 to 12 weeks with paid medical continuity.'
  },
  msa: {
    id: 'msa',
    label: 'Master Services Agreement: Vendor Standard vs Enterprise Counter',
    category: 'Commercial Contracts',
    docA: {
      name: 'Cloud Services Vendor Standard MSA (Draft A)',
      type: 'B2B Services Agreement',
      duration: '12 Months',
      parties: 'HyperScale Cloud LLC / Enterprise Client'
    },
    docB: {
      name: 'Enterprise Client Revised Addendum (Draft B)',
      type: 'B2B Services Agreement',
      duration: '12 Months',
      parties: 'HyperScale Cloud LLC / Enterprise Client'
    },
    comparisonItems: [
      {
        category: 'Financial',
        field: 'Payment Terms & Invoicing',
        docAValue: 'Net-15 days from electronic invoice generation',
        docBValue: 'Net-60 days following written milestone acceptance sign-off',
        aiExplanation: 'Draft B delays cash receipt by 45+ days and ties payment directly to client acceptance testing rather than invoice date.',
        differenceType: 'significant_difference',
        affectedParty: 'Vendor (Cash Flow Delay)'
      },
      {
        category: 'Responsibilities',
        field: 'Milestone Acceptance Window',
        docAValue: '5 business days deemed acceptance if no notice given',
        docBValue: '15 business days with mandatory formal signoff certificate',
        aiExplanation: 'Draft B eliminates automatic deemed acceptance, allowing the client 3x more time to evaluate deliverables before accepting.',
        differenceType: 'significant_difference',
        affectedParty: 'Both Parties'
      },
      {
        category: 'Liability',
        field: 'Aggregate Liability Cap',
        docAValue: '1x fees paid in preceding 12 months ($84,000 cap)',
        docBValue: '3x fees ($252,000) with uncapped indemnity for data security breaches',
        aiExplanation: 'Draft B exposes the service provider to potentially uncapped liabilities in the event of an IT or data security incident.',
        differenceType: 'warning',
        affectedParty: 'Vendor (Elevated Risk)'
      },
      {
        category: 'Governance',
        field: 'Uptime SLA & Remedy',
        docAValue: '99.0% monthly uptime with 5% service credit',
        docBValue: '99.95% monthly uptime with 25% credit and right of termination',
        aiExplanation: 'Draft B demands carrier-grade 99.95% availability and gives the client immediate exit rights if SLA breaches recur.',
        differenceType: 'warning',
        affectedParty: 'Vendor'
      },
      {
        category: 'Termination',
        field: 'Termination for Convenience',
        docAValue: '60 days notice with full payment of remaining contract term',
        docBValue: '30 days notice with payment only for completed deliverables to date',
        aiExplanation: 'Draft B allows the client to cancel on 30 days notice without having to pay out the remainder of the annual contract.',
        differenceType: 'significant_difference',
        affectedParty: 'Client (Favorable)'
      }
    ],
    summaryAI: 'Draft B represents an enterprise client markup that shifts substantial financial and operational risk back to the vendor. Net-60 payment terms create cash flow lag, deemed acceptance is removed, and liability is uncapped for cybersecurity events. Negotiation should focus on restoring a reasonable super-cap on data breaches and capping SLA remedies to service credits.'
  }
};

export const COMPARISON_DEMO_DATA = COMPARISON_PRESETS.lease;
