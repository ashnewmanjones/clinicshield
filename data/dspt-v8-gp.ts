/**
 * DSPT Version 8 (2025-26) — GP Practice (Category 4) Requirements
 *
 * Source: NHS England "Version8_25-26 CAT2 Cat3 and CAT4.xlsx"
 * Extracted: 2026-02-12
 *
 * Structure:
 * - 10 NDG Data Security Standards
 * - 36 Assertions (grouped under standards)
 * - 45 Evidence Items for GP practices (29 mandatory, 16 optional)
 *
 * This file is the single source of truth for the DSPT question data
 * used throughout ClinicShield.
 */

export type InputType = "yes_no" | "text" | "document" | "date";

export interface EvidenceItem {
  /** v8 evidence reference e.g. "1.1.1" */
  ref: string;
  /** How the user provides their answer */
  inputType: InputType;
  /** The official DSPT evidence question text for GP Category 4 */
  evidenceText: string;
  /** Official DSPT tooltip/guidance for GP Category 4 */
  tooltip: string | null;
  /** Required to meet "Standards Met" status */
  mandatory: boolean;
  /** Required to meet "Approaching Standards" status */
  approachingMandatory: boolean;
  /** Plain-English question for ClinicShield UI */
  plainEnglishQuestion: string;
  /** Contextual help text explaining what this means for a GP practice */
  clinicHelp: string;
  /** Exemptions that waive this requirement */
  exemptions: Exemption[];
  /** Whether this is new or changed in v8 */
  changeFromV7: string | null;
}

export type Exemption =
  | "nhs_mail"
  | "cyber_essentials_plus"
  | "iso27001"
  | "psn_ia"
  | "audit";

export interface Assertion {
  /** Assertion reference e.g. "1.1" */
  ref: string;
  /** Official assertion description */
  title: string;
  /** Evidence items under this assertion */
  evidenceItems: EvidenceItem[];
}

export interface Standard {
  /** Standard number 1-10 */
  number: number;
  /** NDG standard title */
  title: string;
  /** Brief description of what this standard covers */
  description: string;
  /** Assertions under this standard */
  assertions: Assertion[];
}

// ---------------------------------------------------------------------------
// Full DSPT v8 GP (Category 4) dataset
// ---------------------------------------------------------------------------

export const dsptV8Standards: Standard[] = [
  // =======================================================================
  // STANDARD 1: Personal Confidential Data
  // =======================================================================
  {
    number: 1,
    title: "Personal Confidential Data",
    description:
      "Confidentiality, Caldicott principles, lawful basis for processing",
    assertions: [
      {
        ref: "1.1",
        title:
          "The organisation has a framework in place to support Lawfulness, Fairness and Transparency",
        evidenceItems: [
          {
            ref: "1.1.1",
            inputType: "text",
            evidenceText:
              "What is your organisation's Information Commissioner's Office (ICO) registration number?",
            tooltip:
              "Registration with the ICO is a legal requirement for every organisation that uses or shares personal information, unless they are exempt as a small charity. If your organisation is not already registered, you should register as a matter of urgency (https://ico.org.uk/for-organisations/data-protection-fee/). You can check whether you are registered and what your ICO registration number is on the Information Commissioner's Office website (https://ico.org.uk/esdwebpages/search).",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "What is your ICO registration number?",
            clinicHelp:
              "Every GP practice that handles patient data must be registered with the ICO. You can find your registration number on the ICO website. If you're not registered, you need to do this urgently as it's a legal requirement.",
            exemptions: [],
            changeFromV7: null,
          },
          {
            ref: "1.1.2",
            inputType: "document",
            evidenceText:
              "Does your organisation have an up to date list of the ways in which it holds and shares different types of personal and sensitive information?",
            tooltip:
              "To be compliant with data protection legislation you must keep a register of all of the information your organisation stores, shares and receives. The exact information you should include is explained in detail in the guidance below. This list is called an Information Asset Register (IAR) and it should detail where and how the information is held and how you keep it safe. You should also have a list or lists of the types of personal data that are shared with others, for example needs assessments, prescriptions, payslips, care plans. This list is called a Record of Processing Activities (ROPA) and should detail how the data is shared and how your organisation keeps it safe. It is fine to have either two separate documents or a single document that combines both lists. The register should have been reviewed and approved by the management team at least once in the last twelve months. Example templates for the ROPA and IAR are available from Digital Care Hub (https://www.digitalcarehub.co.uk/data-security-protecting-my-information/how-to-document-your-data-processing/).",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Do you have an up-to-date Information Asset Register (IAR) or Record of Processing Activities (ROPA)?",
            clinicHelp:
              "This is a list of all the personal data your practice holds, where it's stored, and who you share it with. Think patient records in EMIS/SystmOne, staff HR files, payroll data, prescriptions sent to pharmacies, referral letters, etc. You can combine the IAR and ROPA into one document. It needs to have been reviewed by your management team in the last 12 months.",
            exemptions: [],
            changeFromV7: "Updated tooltip for cat 2",
          },
          {
            ref: "1.1.3",
            inputType: "document",
            evidenceText:
              "Does your organisation have a privacy notice?",
            tooltip:
              "If you use and share personal data then you must tell people what you are doing with it. This includes why you need the data, what you'll do with it, who you're going to share it with and individual's rights under data protection legislation for example, the right to access their information. This should be set out in writing in 'a privacy notice'. You should provide this information in a clear, open and honest way using language which is easy to read and understand, and in a range of formats for different audiences. Your privacy notice should cover all data you process for example the data relating to the people you support and their relatives, staff, volunteers, members of the public. You may have more than one privacy notice, for example one for staff and another one for the people you support. An example privacy notice is available from British Medical Association (https://www.bma.org.uk/advice-and-support/ethics/confidentiality-and-health-records/gdpr-privacy-notices-for-gp-practices).",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Do you have a privacy notice that tells patients and staff how you use their data?",
            clinicHelp:
              "Your privacy notice explains to patients and staff what personal data you collect, why you need it, who you share it with, and their rights. Most practices display this in the waiting room and on their website. You may need separate notices for patients and staff. The BMA has a template specifically for GP practices.",
            exemptions: [],
            changeFromV7:
              "Updated evidence item and tooltip for cat 2,3,4",
          },
          {
            ref: "1.1.5",
            inputType: "text",
            evidenceText:
              "Your organisation's approach to security is owned and directed by senior responsible individuals, with regular discussions driven by individuals who have overall accountability for security.",
            tooltip:
              "Whilst data security and data protection is everybody's business, there must be a named person within your organisation who takes overall senior responsibility for data security and protection issues. Their responsibility is to provide senior level leadership and guidance. In the text box, name the person or people within your organisation with overall responsibility for data security and protection, along with their roles. Then, for each person, describe how this responsibility has been formally assigned to them. For instance, this responsibility could form part of their job description, or be noted in the minutes of a management meeting, or be in an email from the appropriate director in your organisation. Your organisation may also have additional specialised roles, for example a Data Protection Officer (DPO) or a Caldicott Guardian.",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Who is responsible for data security in your practice, and how has this been formally assigned?",
            clinicHelp:
              "You need a named person (usually the Practice Manager or a GP partner) who is formally responsible for data security. This should be documented — for example, in their job description, meeting minutes, or a formal letter. Many GP practices also have a Caldicott Guardian (usually a senior GP) and may have a Data Protection Officer.",
            exemptions: [],
            changeFromV7: "Updated evidence item for cat 3 and 4",
          },
          {
            ref: "1.1.6",
            inputType: "yes_no",
            evidenceText:
              "Your organisation has reviewed how it asks for and records, consent to share personal data.",
            tooltip:
              "Generally, consent under data protection law is not appropriate in health and care settings, but there are some circumstances where it may be necessary, such as for mailing lists. Further guidance on consent under data protection legislation is available on the ICO website (https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/consent/). Consent under the common law duty of confidentiality, however, is more frequently applicable. For example, an individual must provide their consent to share information with their carer. Provide details on your processes for gaining this consent in the comments.",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Have you reviewed how your practice asks for and records patient consent to share personal data?",
            clinicHelp:
              "This is about checking your processes for getting patient consent when sharing their information — for example, sharing records with a carer or family member, or for mailing lists. Note: most clinical data sharing (e.g. referrals, prescriptions) doesn't rely on consent but on other legal bases. This question is about the specific cases where consent IS needed.",
            exemptions: [],
            changeFromV7: null,
          },
        ],
      },
      {
        ref: "1.2",
        title: "Individuals' rights are respected and supported",
        evidenceItems: [
          {
            ref: "1.2.4",
            inputType: "yes_no",
            evidenceText:
              "Is your organisation compliant with the national data opt-out policy?",
            tooltip:
              "The national data opt-out gives everyone the ability to stop health and social care organisations from sharing their confidential information for research and planning purposes, with some exceptions such as where there is a legal mandate/direction or an overriding public interest. As a provider, you should help the people who use your services to understand that they can opt out of their data being used for other purposes. You should check that your policies, procedures, and privacy notice cover the opt out. From July 2022, it is a legal requirement for all health and social care CQC registered organisations to be compliant with the national data opt out.",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Is your practice compliant with the national data opt-out policy?",
            clinicHelp:
              "Since July 2022, all CQC-registered organisations must comply with the national data opt-out. This means patients can choose to stop their confidential data being used for research and planning. Your clinical system (EMIS/SystmOne) should handle this, but you need to make sure your policies and privacy notice mention it, and that staff know about it.",
            exemptions: [],
            changeFromV7: null,
          },
        ],
      },
      {
        ref: "1.3",
        title:
          "Accountability and Governance in place for data protection and data security",
        evidenceItems: [
          {
            ref: "1.3.1",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation have up to date policies in place for data protection and for data and cyber security, aligned with good practice guidance and (where applicable) national policies?",
            tooltip:
              "You should have policies and staff guidance in place communicating your organisation's principles and procedures for data protection. - data protection - data quality - record keeping - data security - where relevant, network security. These should be updated every three years at the minimum, and locally maintain evidence of when each update was made. Policy templates are available from Digital Care Hub (https://www.digitalcarehub.co.uk/data-security-protecting-my-information/data-security-and-protection-toolkit/template-policies/).",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Does your practice have up-to-date data protection and cyber security policies?",
            clinicHelp:
              "You need written policies covering data protection, data quality, record keeping, data security, and network security. These must be updated at least every 3 years. Digital Care Hub provides free template policies specifically designed for GP practices. If you don't have these yet, ClinicShield can help you generate them.",
            exemptions: [],
            changeFromV7: "Updated evidence item for cat 3 and 4",
          },
          {
            ref: "1.3.2",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation monitor your own compliance with data protection policies and regularly review the effectiveness of data handling and security controls?",
            tooltip:
              "Your organisation should carry out spot checks that staff are doing what it says in your data protection, staff confidentiality and related policies. These should be undertaken at least every year. They could be part of other audits that you carry out. You should keep a record that spot checks have been carried out, including details of any actions, who has approved the actions, and who is taking them forward if applicable. There is an example audit checklist that you can download from Digital Care Hub (https://www.digitalcarehub.co.uk/resource/data-security-audit-checklist/).",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Do you carry out regular checks that staff are following your data protection policies?",
            clinicHelp:
              "At least once a year, you should do spot checks to make sure staff are following your data protection policies. For example: Are computers locked when unattended? Are paper records stored securely? Are emails being sent to the right people? Keep a record of these checks and any actions taken.",
            exemptions: [],
            changeFromV7: "Updated tooltip for cat 2",
          },
          {
            ref: "1.3.6",
            inputType: "text",
            evidenceText:
              "What are the top three data and cyber security risks in your organisation and how does it plan to reduce those risks?",
            tooltip:
              "All organisations have risks and should be able to identify what they are. Thinking about your responses to all of the questions in the toolkit, consider which three areas carry the most risk for your organisation. Provide a brief headline for each risk and say what your organisation plans to do to reduce that risk. Your risk conclusions should be communicated to accountable senior individuals.",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "What are your practice's top 3 data and cyber security risks, and what are you doing about them?",
            clinicHelp:
              "Think about your biggest vulnerabilities. Common risks for GP practices include: staff clicking phishing emails, unsupported software (e.g. old Windows versions), no business continuity plan, weak passwords, lack of encryption on portable devices, or insufficient staff training. Name your top 3 and briefly say what you're doing to address each one.",
            exemptions: ["psn_ia"],
            changeFromV7: "Updated tooltip for cat 3 and 4",
          },
          {
            ref: "1.3.8",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation's data protection policy describe how you identify and minimise risks to personal data when introducing, or changing, a process or starting a new project involving personal data?",
            tooltip:
              "Your policy should describe the process that your organisation has in place to make sure that it systematically identifies and minimises the data protection risks of any new project or plan that involves processing personal data. For example, when you introduce a new care recording system; if you install CCTV; if you use new remote care or monitoring technology; if you share data for research or marketing purposes. This type of risk assessment is called a Data Protection Impact Assessment (DPIA). Your organisation should consider whether it needs to carry out a DPIA at the early stages of any new project if it plans to process personal data. A DPIA should follow relevant guidance from the Information Commissioner's Office (ICO) (https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/data-protection-impact-assessments/).",
            mandatory: false,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Does your data protection policy cover how you assess risks when starting new projects that involve personal data (DPIA process)?",
            clinicHelp:
              "When you introduce something new that involves personal data — like a new clinical system, CCTV, online consultations, or a research project — you should assess the data protection risks first. This is called a Data Protection Impact Assessment (DPIA). Your data protection policy should describe when and how you'd do this.",
            exemptions: [],
            changeFromV7: null,
          },
          {
            ref: "1.3.13",
            inputType: "text",
            evidenceText:
              "Briefly describe the physical controls your buildings have that prevent unauthorised access to personal data.",
            tooltip:
              "Physical controls that support data protection include lockable doors, windows and cupboards, clear desk procedure, security badges, key coded locks to access secure areas etc. Provide details at high level and, if you use more than one building, summarise how compliance is assured across your organisation's sites.",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "What physical security measures does your practice have to prevent unauthorised access to personal data?",
            clinicHelp:
              "Describe how you physically protect patient data. For a GP practice this typically includes: locked filing cabinets for paper records, key-coded or badge-access doors to clinical areas, a clear desk policy, lockable server room/cupboard, secure disposal bins for confidential waste. If you have multiple sites, cover all of them.",
            exemptions: ["psn_ia"],
            changeFromV7: null,
          },
        ],
      },
      {
        ref: "1.4",
        title: "Records are maintained appropriately",
        evidenceItems: [
          {
            ref: "1.4.1",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation have a timetable which sets out how long you retain records for?",
            tooltip:
              "Your organisation should have a retention timetable in place for all the different types of records that it holds, including finance, staffing and care records. The timetable, or schedule as it is sometimes called, should be based on the Records Management Code of Practice 2021 (https://transform.england.nhs.uk/information-governance/guidance/records-management-code/).",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Do you have a records retention schedule that sets out how long you keep different types of records?",
            clinicHelp:
              "You need a document that says how long you keep different types of records — patient records (GP records are kept for 10 years after death or after the patient leaves), staff records, financial records, etc. This should be based on the NHS Records Management Code of Practice 2021.",
            exemptions: [],
            changeFromV7: null,
          },
          {
            ref: "1.4.3",
            inputType: "text",
            evidenceText:
              "If your organisation destroys any records or equipment that hold personal data, how does it make sure that this is done securely?",
            tooltip:
              "It is important that when there is no longer a valid reason to keep personal data that it is disposed of securely. This applies to paper documents, electronic records and equipment, such as old computers and laptops, mobile phones, CDs and memory sticks. If anyone in your organisation destroys any records or equipment themselves, such as shredding documents, briefly describe how the organisation makes sure that this is done securely. If you do not destroy records or equipment yourselves, or only use a third party to do so, write \"Not applicable\" in the text box.",
            mandatory: false,
            approachingMandatory: true,
            plainEnglishQuestion:
              "How does your practice securely destroy records and equipment containing personal data?",
            clinicHelp:
              "When you dispose of old patient records, computers, phones, USB sticks, or paper documents, you need to do it securely. This typically means: cross-cut shredding for paper, using a certified destruction company for hard drives/equipment, and wiping devices before disposal. Describe your process, or say 'Not applicable' if you use a third party for all destruction.",
            exemptions: [],
            changeFromV7: null,
          },
        ],
      },
    ],
  },

  // =======================================================================
  // STANDARD 2: Staff Responsibilities
  // =======================================================================
  {
    number: 2,
    title: "Staff Responsibilities",
    description:
      "Contracts, confidentiality agreements, role-based responsibilities",
    assertions: [
      {
        ref: "2.1",
        title:
          "Staff are supported in understanding their obligations under the National Data Guardian's Data Security Standards",
        evidenceItems: [
          {
            ref: "2.1.1",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation have an induction process that covers data security and protection, and cyber security?",
            tooltip:
              "All new staff, directors, trustees and volunteers who have access to personal data, should have an induction that covers data security and protection as well as cyber security. It is good practice to keep records of who has been inducted and to review the induction process on a regular basis to ensure it is effective and up to date. Digital Care Hub provides a free Data Security and Protection elearning training course (https://www.digitalcarehub.co.uk/elearning/) that organisations can use as part of their staff induction.",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Do new staff, locums, and volunteers receive a data security induction when they join?",
            clinicHelp:
              "When new staff join your practice — including locum GPs, nurses, admin staff, cleaners, or volunteers — they should receive an induction covering data protection and cyber security basics. Keep a record of who's been inducted and when. Digital Care Hub offers a free online training course you can use.",
            exemptions: ["iso27001", "psn_ia"],
            changeFromV7: "Removed for cat 2",
          },
        ],
      },
      {
        ref: "2.2",
        title:
          "Staff contracts set out responsibilities for data security",
        evidenceItems: [
          {
            ref: "2.2.1",
            inputType: "yes_no",
            evidenceText:
              "Do all employment contracts, and volunteer agreements, contain data security requirements?",
            tooltip:
              "Clauses in contracts or agreements should reference data security (confidentiality, integrity and availability). Many contracts commonly focus on just confidentiality. Your organisation's staff employment contracts, and volunteer and trustee agreements if you have them, should be reviewed to see if they need to be updated to include a clause on data security.",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Do all staff contracts and volunteer agreements include data security responsibilities?",
            clinicHelp:
              "Check your employment contracts — they should mention data security, not just confidentiality. This means covering the confidentiality, integrity and availability of data. If your contracts only mention confidentiality, they need updating. This applies to all staff, locums, and any volunteers.",
            exemptions: ["iso27001"],
            changeFromV7: null,
          },
        ],
      },
    ],
  },

  // =======================================================================
  // STANDARD 3: Training
  // =======================================================================
  {
    number: 3,
    title: "Training",
    description: "Annual IG/data security training, completion records",
    assertions: [
      {
        ref: "3.2",
        title:
          "Your organisation engages proactively and widely to improve data security, and has an open and just culture for data security incidents",
        evidenceItems: [
          {
            ref: "3.2.1",
            inputType: "yes_no",
            evidenceText:
              "Have at least 95% of staff, directors, trustees and volunteers in your organisation completed training on data security and protection, and cyber security, in the last twelve months?",
            tooltip:
              "All people in your organisation with access to personal data must complete appropriate data security and protection, and cyber security, training every year. Your organisation's training needs analysis should identify the level of training or awareness raising that people need, and you should use a range of training and awareness methods to reach all staff effectively. There is an understanding that due to illness, maternity/paternity leave, attrition or other reasons it might not be possible for 100% of people to receive training every year. Therefore, the target is 95% of people with access to personal data. For clarity, it is the last twelve months prior to the date of publication.",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Have at least 95% of your staff completed data security training in the last 12 months?",
            clinicHelp:
              "Everyone with access to personal data — GPs, nurses, receptionists, admin, cleaners with building access — needs to complete data security training annually. The target is 95% (allowing for maternity leave, long-term sick, etc.). The free NHS Data Security Awareness e-learning course at e-LfH counts. Keep a log of who has completed training and when.",
            exemptions: [],
            changeFromV7: "Updated tooltip for cat 3 and 4",
          },
        ],
      },
    ],
  },

  // =======================================================================
  // STANDARD 4: Managing Data Access
  // =======================================================================
  {
    number: 4,
    title: "Managing Data Access",
    description: "Role-based access, authentication, least privilege",
    assertions: [
      {
        ref: "4.1",
        title:
          "The organisation maintains a current record of staff and their roles",
        evidenceItems: [
          {
            ref: "4.1.1",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation have an up to date record of people and their roles?",
            tooltip:
              "Your organisation must have a list of all staff, and volunteers if you have them, and their current role. This list should be kept up to date, including any change of role, new starters and removal of leavers. This might be linked to your existing payroll or rostering system.",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Do you have an up-to-date list of all staff and their roles?",
            clinicHelp:
              "You need a current list of everyone who works at your practice and what they do — GPs, nurses, healthcare assistants, receptionists, practice manager, cleaners, etc. This should be kept updated when people join, leave, or change roles. Your payroll system or HR records may already cover this.",
            exemptions: [],
            changeFromV7: null,
          },
        ],
      },
      {
        ref: "4.2",
        title:
          "The organisation assures good management and maintenance of identity and access control for its networks and information systems",
        evidenceItems: [
          {
            ref: "4.2.4",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation have a reliable way of removing or amending people's access to IT systems when they leave or change roles?",
            tooltip:
              "When people change roles or leave your organisation, there needs to be a reliable way to amend or remove their access to your IT system(s). This could be by periodic audit to make sure that people's access rights are at the right level. It is important that leavers who had access to personal data have their access rights revoked in line with your policies and procedures. This includes access to shared email addresses.",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Do you have a reliable process for removing IT access when staff leave or change roles?",
            clinicHelp:
              "When someone leaves your practice or changes role, you need to promptly remove or update their access to clinical systems (EMIS/SystmOne), NHS email, shared drives, and any other IT systems. This includes shared email accounts and NHSmail shared mailboxes. Have a checklist for leavers that includes IT access removal.",
            exemptions: ["cyber_essentials_plus"],
            changeFromV7: null,
          },
        ],
      },
      {
        ref: "4.3",
        title:
          "All staff understand that their activities on IT systems will be monitored and recorded for security purposes",
        evidenceItems: [
          {
            ref: "4.3.1",
            inputType: "yes_no",
            evidenceText:
              "Have all the administrators of your organisation's IT system(s) signed an agreement to hold them accountable to higher standards?",
            tooltip:
              "The people within your organisation who are IT system administrators may have access to more information than other staff. Therefore, they need to be held accountable in a formal way to higher standards of confidentiality than others. This requirement applies to IT system administrators working in external companies who support your organisation's IT systems. This formal agreement could be part of a job description or a contract with your IT support company and/or systems supplier/s. If your organisation does not use any IT systems, then 'tick' and write \"Not applicable\" in the comments box.",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Have your IT administrators (including external IT support companies) signed agreements holding them to higher data security standards?",
            clinicHelp:
              "Anyone who has admin-level access to your IT systems — whether internal staff or your external IT support company — should have signed a formal agreement about their higher data security responsibilities. This could be in their job description, contract, or a separate agreement. If you use an external IT company, check that their contract covers this.",
            exemptions: ["iso27001"],
            changeFromV7: "Updated tooltip for cat 2",
          },
        ],
      },
      {
        ref: "4.4",
        title:
          "You closely manage privileged user access to networks and information systems supporting the essential service",
        evidenceItems: [
          {
            ref: "4.4.1",
            inputType: "yes_no",
            evidenceText:
              "The person with responsibility for IT confirms that IT administrator activities are logged and those logs are only accessible to appropriate personnel.",
            tooltip:
              "IT Support staff typically have high level access to systems. The identities of these people should be known and managed, and their activities on your systems should be logged and only available to appropriate personnel. If your organisation does not use any IT systems, then 'tick' and write \"Not applicable\" in the comments box.",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Are IT administrator activities on your systems being logged, with logs only accessible to appropriate people?",
            clinicHelp:
              "Your IT support company or internal IT admin should have their activities logged when they access your systems. These logs should only be viewable by authorised people. Ask your IT support provider whether they log admin activities on your systems. If you don't use IT systems, mark as 'Not applicable'.",
            exemptions: [],
            changeFromV7: "Updated tooltip for cat 3 and 4",
          },
        ],
      },
      {
        ref: "4.5",
        title:
          "You ensure your passwords are suitable for the information you are protecting",
        evidenceItems: [
          {
            ref: "4.5.3",
            inputType: "yes_no",
            evidenceText:
              "Multi-factor authentication is used on all remotely accessible user accounts on all systems, with exceptions only as approved by a relevant board or senior management.",
            tooltip:
              "Multi-factor authentication (MFA) is one of the most effective ways to protect data and accounts from unauthorised access. Where systems do not support MFA, or where there are significant operational reasons outweighing the risk of not having MFA, then exceptions can be made and should be detailed in the text box response. Exceptions for ICB-commissioned digital services should be decided by the ICB board or senior management. Exceptions for practice-commissioned digital services may be decided by the practice management. All exceptions should be detailed in the text box response. Guidance on implementing Multi-factor authentication is available (https://www.digitalcarehub.co.uk/data-security-protecting-my-information/cyber-security/implement-multi-factor-authentication-mfa/).",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Is multi-factor authentication (MFA) enabled on all systems that can be accessed remotely?",
            clinicHelp:
              "MFA means requiring a second form of verification (like a code on your phone) in addition to a password. This should be turned on for all systems accessible outside the practice — NHSmail, clinical systems accessed remotely, VPNs, cloud services, etc. If a system doesn't support MFA, document this as an approved exception.",
            exemptions: [],
            changeFromV7:
              "Updated evidence item and tooltip for cat 2",
          },
        ],
      },
    ],
  },

  // =======================================================================
  // STANDARD 5: Process Reviews
  // =======================================================================
  {
    number: 5,
    title: "Process Reviews",
    description: "Data flow mapping, DPIA, lawful basis register",
    assertions: [
      {
        ref: "5.1",
        title:
          "Process reviews are held at least once per year where data security is put at risk following data security incidents",
        evidenceItems: [
          {
            ref: "5.1.1",
            inputType: "yes_no",
            evidenceText:
              "If your organisation has had a data breach or a near miss in the last year, has the organisation reviewed the process that may have allowed the breach to occur?",
            tooltip:
              "Confirm that your organisation has reviewed any processes that have caused a breach or a near miss, or which force people to use unauthorised workarounds that could compromise your organisation's data and cyber security. Workarounds could be things such as using unauthorised devices such as home computers or personal memory sticks or forwarding emails to personal email addresses. It is good practice to review processes annually even if a breach or near miss has not taken place. If no breaches or near misses in the last 12 months then please tick and write \"Not applicable\" in the comments box.",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "If you've had a data breach or near miss in the last year, have you reviewed what went wrong and fixed the process?",
            clinicHelp:
              "If your practice has had any data incidents — a misfaxed referral, an email sent to the wrong person, a lost USB stick, a phishing attack — you should have reviewed the process that allowed it to happen and taken steps to prevent it recurring. If you've had no incidents, answer 'Yes' and note 'Not applicable' in comments. It's good practice to review processes annually regardless.",
            exemptions: ["iso27001"],
            changeFromV7: null,
          },
        ],
      },
      {
        ref: "5.2",
        title:
          "Action is taken to address problem processes as a result of feedback at meetings or in year",
        evidenceItems: [
          {
            ref: "5.2.1",
            inputType: "yes_no",
            evidenceText:
              "Are the actions to address problem processes, being monitored and assurance given to the senior team?",
            tooltip:
              "Explain the governance around escalation of any issues to management through reports and briefing notes during the last twelve months.",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Are actions from data security reviews being tracked and reported to senior management?",
            clinicHelp:
              "When you identify a problem with a data security process, the fix should be tracked and reported to partners/senior management. This could be through regular practice meeting agendas, a simple action log, or briefing notes. The key is that someone senior is overseeing that issues get resolved.",
            exemptions: [],
            changeFromV7: null,
          },
        ],
      },
    ],
  },

  // =======================================================================
  // STANDARD 6: Responding to Incidents
  // =======================================================================
  {
    number: 6,
    title: "Responding to Incidents",
    description: "Breach reporting, incident response plan, ICO notification",
    assertions: [
      {
        ref: "6.1",
        title:
          "A confidential system for reporting data security and protection breaches and near misses is in place and actively used",
        evidenceItems: [
          {
            ref: "6.1.1",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation have a system in place to report data breaches?",
            tooltip:
              "All staff, and volunteers if you have them, are responsible for noticing and reporting data breaches and it is vital that you have a robust reporting system in your organisation. There is an incident reporting tool within this toolkit which should be used to report health and care incidents to Information Commissioner's Office ICO. If you are not sure whether or not to inform the Information Commissioner's Office of a breach, the toolkit's incident reporting tool and guide can help you to decide. Digital Care Hub has Staff Guidance on Data Breaches (https://www.digitalcarehub.co.uk/resource/staff-guidance-on-data-breaches/).",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Does your practice have a system for staff to report data breaches and near misses?",
            clinicHelp:
              "You need a clear process for staff to report data breaches (e.g. patient records sent to the wrong person) and near misses (e.g. an unlocked computer found unattended). All staff should know how to report these. The DSPT toolkit has a built-in incident reporting tool for reporting to the ICO. Digital Care Hub has free staff guidance you can share.",
            exemptions: ["iso27001", "psn_ia"],
            changeFromV7: null,
          },
          {
            ref: "6.1.2",
            inputType: "yes_no",
            evidenceText:
              "If your organisation has had a data breach, were the management team notified, and did they approve the actions planned to minimise the risk of a recurrence?",
            tooltip:
              "In the event of a data breach the management team of your organisation, or nominated person, should be notified of the breach and any associated action plans or lessons learnt. If no breaches have occurred in the last 12 months then please tick and write \"Not applicable\" in the comments box.",
            mandatory: false,
            approachingMandatory: true,
            plainEnglishQuestion:
              "If you've had a data breach, was the management team notified and did they approve an action plan?",
            clinicHelp:
              "If a data breach occurred, the partners/practice manager should have been informed and should have signed off on actions to prevent it happening again. If you've had no breaches in the last 12 months, answer 'Yes' and note 'Not applicable'.",
            exemptions: ["iso27001", "psn_ia"],
            changeFromV7: null,
          },
          {
            ref: "6.1.3",
            inputType: "yes_no",
            evidenceText:
              "If your organisation has had a data breach, were all individuals who were affected informed?",
            tooltip:
              "If your organisation has had a data breach that is likely to result in a high risk of adversely affecting individuals' rights and freedoms - e.g. damage to reputation, financial loss, unfair discrimination, or other significant loss - you must inform the individual(s) affected as soon as possible. If your organisation has had no such breaches in the last 12 months then please tick and write \"Not applicable\" in the comments box. More information is available from the Information Commissioner's Office (https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/personal-data-breaches/).",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "If you've had a data breach, were all affected individuals informed?",
            clinicHelp:
              "If a breach could seriously affect someone — for example, their medical records were sent to the wrong person — you must inform them as soon as possible. If you've had no high-risk breaches in the last 12 months, answer 'Yes' and note 'Not applicable'.",
            exemptions: [],
            changeFromV7: null,
          },
        ],
      },
      {
        ref: "6.2",
        title:
          "All user devices are subject to anti-virus protections while email services benefit from spam filtering and protection deployed at the corporate gateway",
        evidenceItems: [
          {
            ref: "6.2.1",
            inputType: "yes_no",
            evidenceText:
              "Do all the computers and other devices used across your organisation have antivirus/antimalware software which is kept up to date?",
            tooltip:
              "This applies to all servers, desktop computers, laptop computers, and tablets. Note that antivirus software and antimalware software are the same thing - they both perform the same functions. You may need to ask your IT supplier to assist with answering this question. If your organisation does not use any computers or other devices, then tick and write \"Not applicable\" in the comments box. Further information is available from Digital Care Hub (https://www.digitalcarehub.co.uk/data-security-protecting-my-information/cyber-security/have-up-to-date-antivirus-software/).",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Do all computers and devices in your practice have up-to-date antivirus software?",
            clinicHelp:
              "Every computer, laptop, and tablet in your practice needs antivirus/antimalware software that's kept up to date. This includes the server if you have one on-site. Windows Defender (built into Windows 10/11) counts if it's enabled and updating. Ask your IT support company to confirm this if you're unsure.",
            exemptions: ["cyber_essentials_plus", "iso27001"],
            changeFromV7: null,
          },
        ],
      },
      {
        ref: "6.3",
        title:
          "Known vulnerabilities are acted on based on advice from NHS Digital, and lessons are learned from previous incidents and near misses",
        evidenceItems: [
          {
            ref: "6.3.5",
            inputType: "text",
            evidenceText:
              "Have you had any repeat data security incidents within the organisation during the past twelve months?",
            tooltip:
              "A repeat incident is defined as an exploitation of the same vulnerability on the same systems or different ones, that occurs within three calendar months of a previous occurrence. Provide details.",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Have you had any repeat data security incidents in the last 12 months?",
            clinicHelp:
              "A 'repeat incident' means the same type of breach happening again within 3 months — for example, two separate cases of patient records being emailed to the wrong address. If yes, describe what happened and what you've done to prevent further occurrences. If no, simply state that.",
            exemptions: [],
            changeFromV7: null,
          },
        ],
      },
    ],
  },

  // =======================================================================
  // STANDARD 7: Continuity Planning
  // =======================================================================
  {
    number: 7,
    title: "Continuity Planning",
    description: "Business continuity, disaster recovery, backup testing",
    assertions: [
      {
        ref: "7.1",
        title:
          "Organisations have a defined, planned and communicated response to data security incidents that impact sensitive information or key operational services",
        evidenceItems: [
          {
            ref: "7.1.1",
            inputType: "document",
            evidenceText:
              "Do you have a digital asset register detailing your organisation's hardware and software, which is kept up to date?",
            tooltip:
              "This digital asset register is a list of the digital devices (hardware) and computer software your organisation uses. The register should have been reviewed at least once in the last twelve months. You can have a separate list of digital assets or combine it into one document with your Information Asset Register (see 1.1.2.) An example digital asset register is available at: Asset register (https://www.digitalcarehub.co.uk/resource/information-asset-register-template/)",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Do you have an up-to-date list of all hardware and software used in your practice?",
            clinicHelp:
              "You need a register listing all your digital equipment (computers, laptops, tablets, printers, routers, phones) and software (EMIS/SystmOne, Windows, Office, etc.). This should be reviewed at least once a year. You can combine this with your Information Asset Register from question 1.1.2. Digital Care Hub has a template.",
            exemptions: [],
            changeFromV7: "New evidence item for cat 4",
          },
          {
            ref: "7.1.2",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation have a business continuity plan that covers data and cyber security?",
            tooltip:
              "Your organisation's business continuity plan should cover data and cyber security - for example what would you do to ensure continuity of service if: you had a power cut; the phone line/internet went down; you were hacked; a computer broke down; the office became unavailable (for example through fire). Your plan should include communications with other organisations and your data protection obligations. Your plan should be understood by relevant staff and other stakeholders.",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Does your practice have a business continuity plan that covers what to do if IT systems go down or you're hit by a cyber attack?",
            clinicHelp:
              "Your business continuity plan should cover scenarios like: What if the internet goes down? What if you're hit by ransomware? What if there's a power cut? What if a computer breaks? What if the building is inaccessible? It should include who to contact, how to continue seeing patients, and your data protection obligations during an incident.",
            exemptions: ["iso27001"],
            changeFromV7: "Updated tooltip for cat 2,3,4",
          },
          {
            ref: "7.1.5",
            inputType: "yes_no",
            evidenceText:
              "Your asset register prioritises assets according to their organisational importance, and includes dependencies (such as power, cooling, data, people etc.) that support the assets.",
            tooltip: null,
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Does your asset register prioritise items by importance and list their dependencies (power, internet, etc.)?",
            clinicHelp:
              "Your digital asset register (from 7.1.1) should indicate which systems are most critical to your practice — e.g. your clinical system is more critical than the printer — and note what each depends on (internet connection, power supply, specific server, etc.). This helps you prioritise during a disaster recovery.",
            exemptions: [],
            changeFromV7: "New evidence item for cat 2,3,4",
          },
          {
            ref: "7.1.6",
            inputType: "yes_no",
            evidenceText:
              "Assets (hardware, software and data) are owned and managed throughout their lifecycle.",
            tooltip:
              "You should have an asset management process which ensures that: - obsolete devices are identified and managed - suitable controls are applied wherever assets are reused, transferred or disposed of",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Do you manage your hardware, software, and data assets throughout their lifecycle — from purchase to disposal?",
            clinicHelp:
              "This means having a process for managing equipment from when you buy it to when you dispose of it. When a computer becomes obsolete, is it identified and replaced? When old equipment is disposed of, are hard drives wiped securely? When software licences expire, is this tracked?",
            exemptions: [],
            changeFromV7: "New evidence item for cat 3 and 4",
          },
        ],
      },
      {
        ref: "7.3",
        title:
          "You have the capability to enact your incident response plan, including effective limitation of impact on your essential service",
        evidenceItems: [
          {
            ref: "7.3.2",
            inputType: "yes_no",
            evidenceText:
              "All emergency contacts are kept securely, in hardcopy and are up-to-date.",
            tooltip:
              "Contacts are those needed to enact the business continuity plan that covers data and cyber security. The contacts include phone number as well as email.",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Do you have a printed, up-to-date list of emergency contacts for your business continuity plan?",
            clinicHelp:
              "If your IT systems go down, you can't access digital contact lists. Keep a printed copy of emergency contacts: your IT support company, clinical system helpdesk (EMIS/SystmOne), ICB IG team, NHS England cyber security, your internet provider, key staff members' mobile numbers. Store it securely but make sure relevant staff know where it is.",
            exemptions: [],
            changeFromV7: null,
          },
          {
            ref: "7.3.4",
            inputType: "yes_no",
            evidenceText:
              "How does your organisation make sure that there are working backups of all important data and information?",
            tooltip:
              "It is important to make sure that backups are being done regularly, that they are successful and that they include the right files and systems. Briefly explain how your organisation's backup systems work, how you protect them from unauthorised access, and how you have tested them. Your plan to restore from backup should include which systems need to be recovered, and in what order. You may need to ask your IT supplier to assist with answering this question.",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Do you have working backups of all important data, and have you tested that they can be restored?",
            clinicHelp:
              "Your clinical data, documents, and other important files need to be backed up regularly. You should know: How often are backups done? Where are they stored (on-site, cloud, or both)? Are they protected from ransomware (i.e. not always connected)? Have you actually tested restoring from a backup? Ask your IT support company about this if unsure.",
            exemptions: [],
            changeFromV7: "Updated tooltip for cat 2,3,4",
          },
        ],
      },
    ],
  },

  // =======================================================================
  // STANDARD 8: Unsupported Systems
  // =======================================================================
  {
    number: 8,
    title: "Unsupported Systems",
    description: "Patch management, end-of-life systems, upgrade plans",
    assertions: [
      {
        ref: "8.1",
        title:
          "All software and hardware has been surveyed to understand if it is supported and up to date",
        evidenceItems: [
          {
            ref: "8.1.4",
            inputType: "yes_no",
            evidenceText:
              "Are all the IT systems and the software used in your organisation still supported by the manufacturer or the risks are understood and managed?",
            tooltip:
              "Systems and software that are no longer supported by the manufacturer can be unsafe as they are no longer being updated to protect against viruses for example. You may need to ask your IT supplier to assist with answering this question. Examples of unsupported software include: Windows XP, Windows Vista, Windows 7, Windows 8.1, Java or Windows Server 2008. Windows 11 is supported and is the most up to date version of Windows. This question also applies to software systems such as rostering, care planning or electronic medicine administration record (MAR) charts for example. If your organisation does not use any IT systems or software, then tick and write \"Not applicable\" in the comments box. For guidance (including information on how to check which software versions you have), see Digital Care Hub (https://www.digitalcarehub.co.uk/data-security-protecting-my-information/cyber-security/install-the-latest-software-updates/).",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Are all your IT systems and software still supported by the manufacturer, or are any risks from unsupported systems being managed?",
            clinicHelp:
              "Check whether all your software is still receiving security updates. Unsupported software includes Windows XP, Vista, 7, 8.1, and Windows Server 2008. Windows 10 support ends October 2025 — plan to upgrade to Windows 11. Also check your clinical system version, printers, routers, etc. Ask your IT support company to confirm everything is supported.",
            exemptions: ["psn_ia"],
            changeFromV7: "Now applicable for cat 4",
          },
        ],
      },
      {
        ref: "8.2",
        title:
          "Unsupported software and hardware is categorised and documented, and data security risks are identified and managed",
        evidenceItems: [
          {
            ref: "8.2.1",
            inputType: "document",
            evidenceText:
              "If your answer to 8.1.4 (on IT systems and software being supported by the manufacturer) was that software risks are being managed, please provide a document that summarises the risk of continuing to use each unsupported item, the reasons for doing so and a summary of the action your organisation is taking to minimise the risk.",
            tooltip:
              "This is a conscious decision to accept and manage the associated risks of unsupported systems. This document should indicate that your board or management team have formally considered the risks of continuing to use unsupported items and have concluded that the risks are acceptable. If your answer to the previous question was yes, write \"Not applicable\" in \"Enter text describing document location\".",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "If you're using unsupported software, do you have a document explaining the risks and what you're doing about it?",
            clinicHelp:
              "If you answered in 8.1.4 that you have unsupported systems but are managing the risks, you need a document that: lists each unsupported item, explains the risk, gives the reason you're still using it, and describes what you're doing to reduce the risk. This must be formally approved by partners/management. If everything is supported, write 'Not applicable'.",
            exemptions: ["psn_ia"],
            changeFromV7: "Now applies for cat 4",
          },
        ],
      },
      {
        ref: "8.3",
        title:
          "Supported systems are kept up-to-date with the latest security patches",
        evidenceItems: [
          {
            ref: "8.3.1",
            inputType: "document",
            evidenceText:
              "How do you make sure that the latest software updates are downloaded and installed promptly?",
            tooltip:
              "This is your strategy for system updates. You may need your IT supplier/s to assist with this.",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "How does your practice ensure software updates and security patches are installed promptly?",
            clinicHelp:
              "You need a strategy for keeping software up to date — Windows updates, antivirus definitions, clinical system updates, browser updates, etc. Many practices rely on their IT support company for this. Describe your approach: Is Windows Update set to automatic? Does your IT company push updates remotely? How quickly are critical security patches applied?",
            exemptions: [],
            changeFromV7: "Updated evidence item for cat 4",
          },
          {
            ref: "8.3.8",
            inputType: "yes_no",
            evidenceText:
              "Your organisation is registered for and actively using the NCSC early warning service.",
            tooltip:
              "The NCSC early warning service (https://www.ncsc.gov.uk/information/early-warning-service) helps organisations investigate cyber attacks on their network by notifying them of malicious activity that has been detected in information feeds.",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Is your practice registered for the NCSC Early Warning service?",
            clinicHelp:
              "The National Cyber Security Centre (NCSC) runs a free Early Warning service that alerts you if they detect malicious activity targeting your network. Registration is free and straightforward at https://www.ncsc.gov.uk/information/early-warning-service. This is a new requirement for GP practices in DSPT v8.",
            exemptions: [],
            changeFromV7: "Now applies for cat 3 and 4",
          },
        ],
      },
      {
        ref: "8.4",
        title:
          "You manage known vulnerabilities in your network and information systems to prevent disruption of the essential service",
        evidenceItems: [
          {
            ref: "8.4.3",
            inputType: "yes_no",
            evidenceText:
              "You identify and understand security vulnerabilities in your systems, such as through regular vulnerability testing.",
            tooltip: null,
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Do you regularly test for and identify security vulnerabilities in your IT systems?",
            clinicHelp:
              "This means proactively looking for weaknesses in your IT setup — for example, through vulnerability scanning tools, penetration testing, or regular security reviews by your IT support company. This is a new requirement for GP practices in v8 and is optional, but good practice.",
            exemptions: [],
            changeFromV7: "New evidence item for cat 4",
          },
        ],
      },
    ],
  },

  // =======================================================================
  // STANDARD 9: IT Protection
  // =======================================================================
  {
    number: 9,
    title: "IT Protection",
    description: "Firewalls, encryption, anti-malware, network security",
    assertions: [
      {
        ref: "9.1",
        title:
          "All networking components have had their default passwords changed",
        evidenceItems: [
          {
            ref: "9.1.1",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation make sure that the passwords of all networking components, such as a Wi-Fi router, have been changed from their original passwords?",
            tooltip:
              "Networking components include routers, switches, hubs and firewalls at all of your organisation's locations. Your organisation may just have a Wi-Fi router. This does not apply to Wi-Fi routers for people working from home. You may need to ask your IT supplier to assist with answering this question. If your organisation does not have a network or internet access, then tick and write \"Not applicable\" in the comments box.",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Have all default passwords on your network equipment (routers, Wi-Fi, switches) been changed?",
            clinicHelp:
              "When routers, Wi-Fi access points, and other network equipment are first installed, they come with default passwords (like 'admin' or 'password'). These must be changed to strong, unique passwords. This applies to all your locations but not to staff working from home. Ask your IT support company to confirm this has been done.",
            exemptions: ["cyber_essentials_plus"],
            changeFromV7: null,
          },
        ],
      },
      {
        ref: "9.2",
        title:
          "A penetration test has been scoped and undertaken",
        evidenceItems: [
          {
            ref: "9.2.1",
            inputType: "yes_no",
            evidenceText:
              "The annual IT penetration testing is scoped in negotiation between the Board/person with delegated responsibility for data security, business and testing team including a vulnerability scan and checking that all networking components have had their default passwords changed to a high strength password.",
            tooltip:
              "Use the comments field to outline the scope of the organisation's penetration test and redact any elements of the scope that are sensitive.",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Has your practice had an annual IT penetration test that was properly scoped with senior management?",
            clinicHelp:
              "Penetration testing is where a security specialist tries to find weaknesses in your IT systems. While optional for GP practices, it's good practice. If you've had one, describe its scope. If you have Cyber Essentials Plus certification or PSN compliance, you may be exempt from this requirement.",
            exemptions: ["cyber_essentials_plus", "psn_ia"],
            changeFromV7: "Updated tooltip for cat 2",
          },
        ],
      },
      {
        ref: "9.5",
        title:
          "You securely configure the network and information systems that support the delivery of essential services",
        evidenceItems: [
          {
            ref: "9.5.2",
            inputType: "yes_no",
            evidenceText:
              "Are all laptops and tablets or removable devices that hold or allow access to personal data, encrypted?",
            tooltip:
              "Mobile computers like laptops and tablets and removable devices like memory sticks/cards/CDs are vulnerable as they can be lost or stolen. To make these devices especially difficult to get into, they can be encrypted (this protects information by converting it into unreadable code that cannot be deciphered easily by unauthorised people). Devices can be further protected, for example, by preventing the use of removable devices like memory sticks. This is called computer port control. You may need to ask your IT supplier to assist with answering this question. If your organisation does not use any mobile devices, or equivalent security arrangements are in place, then tick and write \"Not applicable\" in the comments box.",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Are all laptops, tablets, and removable devices (USB sticks, etc.) that could access patient data encrypted?",
            clinicHelp:
              "Any portable device that holds or can access personal data must be encrypted. For Windows laptops, this means BitLocker should be enabled. For tablets, check that device encryption is turned on. Ideally, also disable USB ports or restrict removable media use. If you don't use any portable devices, you can mark this as 'Not applicable'.",
            exemptions: [],
            changeFromV7: null,
          },
        ],
      },
    ],
  },

  // =======================================================================
  // STANDARD 10: Accountable Suppliers
  // =======================================================================
  {
    number: 10,
    title: "Accountable Suppliers",
    description: "Supplier contracts, DPAs, third-party assurance",
    assertions: [
      {
        ref: "10.1",
        title:
          "The organisation can name its suppliers, the products and services they deliver and the contract durations",
        evidenceItems: [
          {
            ref: "10.1.2",
            inputType: "yes_no",
            evidenceText:
              "Does your organisation have a list of its suppliers that handle personal information, the products and services they deliver, and their contact details?",
            tooltip:
              "Your organisation should have a list or lists of the external suppliers that handle personal information such as IT or care planning systems suppliers, IT support, accountancy, DBS checks, HR and payroll services, showing the system or services provided. If you have no such suppliers, then 'tick' and write \"Not applicable\" in the comments box. A template example is available from Digital Care Hub (https://www.digitalcarehub.co.uk/resource/template-suppliers-list/).",
            mandatory: true,
            approachingMandatory: true,
            plainEnglishQuestion:
              "Do you have a list of all suppliers that handle personal data on your behalf?",
            clinicHelp:
              "List all external companies that handle personal data for your practice: your clinical system provider (EMIS/SystmOne), IT support company, payroll provider, occupational health service, DBS checking service, shredding company, cloud storage providers, etc. Include what service they provide and their contact details. Digital Care Hub has a template.",
            exemptions: [],
            changeFromV7: null,
          },
        ],
      },
      {
        ref: "10.2",
        title:
          "Basic due diligence has been undertaken against each supplier that handles personal information",
        evidenceItems: [
          {
            ref: "10.2.1",
            inputType: "yes_no",
            evidenceText:
              "Do your organisation's IT system suppliers have cyber security certification?",
            tooltip:
              "Your organisation should ensure that any supplier of IT systems has cyber security certification. For example, external certification such as Cyber Essentials, or ISO27001, or by being listed on Digital marketplace, or by completing this Toolkit. An IT systems supplier would include suppliers of systems such as rostering, care planning or electronic medicine administration record (MAR) charts for example. If your organisation does not use any IT systems, then tick and write \"Not applicable\" in the comments box.",
            mandatory: true,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Do your IT system suppliers have cyber security certifications (like Cyber Essentials or ISO 27001)?",
            clinicHelp:
              "Check that your IT suppliers — clinical system provider, IT support company, etc. — have recognised cyber security certifications such as Cyber Essentials, Cyber Essentials Plus, ISO 27001, or have completed their own DSPT. Most major NHS suppliers like EMIS and TPP will have these. Ask smaller suppliers for evidence of their certification.",
            exemptions: [],
            changeFromV7: null,
          },
          {
            ref: "10.2.2",
            inputType: "yes_no",
            evidenceText:
              "Contracts with all third parties that handle personal information are compliant with ICO guidance.",
            tooltip:
              "A review of all contracts has been undertaken to ensure that they comply with the requirements set out in Article 28 of the GDPR and have completed a Data Security and Protection Toolkit. If you have no such suppliers, then 'tick' and write \"Not applicable\" in the comments box.",
            mandatory: false,
            approachingMandatory: false,
            plainEnglishQuestion:
              "Are your contracts with third parties that handle personal data compliant with GDPR Article 28 (data processing agreements)?",
            clinicHelp:
              "Any contract with a supplier that handles personal data on your behalf should include a Data Processing Agreement (DPA) that complies with GDPR Article 28. This covers things like: what data they process, how they protect it, what happens if there's a breach, and what happens when the contract ends. Review your key supplier contracts to check this is in place.",
            exemptions: [],
            changeFromV7: "Updated tooltip for cat 3 and 4",
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper constants
// ---------------------------------------------------------------------------

/** Total evidence items for GP Category 4 */
export const TOTAL_EVIDENCE_ITEMS = 45;

/** Mandatory evidence items required for "Standards Met" */
export const MANDATORY_EVIDENCE_ITEMS = 29;

/** Evidence items required for "Approaching Standards" */
export const APPROACHING_STANDARDS_ITEMS = 22;

/** Quick lookup: all evidence refs that are mandatory */
export const MANDATORY_REFS = new Set([
  "1.1.1", "1.1.2", "1.1.3", "1.1.5", "1.2.4",
  "1.3.1", "1.3.2", "1.3.13", "1.4.1",
  "2.1.1", "2.2.1",
  "3.2.1",
  "4.1.1", "4.2.4", "4.3.1", "4.5.3",
  "5.1.1",
  "6.1.1", "6.1.3", "6.2.1",
  "7.1.1", "7.1.2", "7.3.2", "7.3.4",
  "8.3.1",
  "9.1.1", "9.5.2",
  "10.1.2", "10.2.1",
]);

/** Quick lookup: all evidence refs required for "Approaching Standards" */
export const APPROACHING_REFS = new Set([
  "1.1.1", "1.1.2", "1.1.3", "1.1.5",
  "1.3.1", "1.3.8", "1.3.13", "1.4.1", "1.4.3",
  "2.1.1", "2.2.1",
  "4.1.1", "4.2.4",
  "6.1.1", "6.1.2", "6.1.3", "6.2.1",
  "7.3.2",
]);

/** Items new or newly applicable in DSPT v8 for GP practices */
export const NEW_IN_V8_REFS = new Set([
  "7.1.1",  // New evidence item for cat 4
  "7.1.5",  // New evidence item for cat 2,3,4
  "7.1.6",  // New evidence item for cat 3 and 4
  "8.1.4",  // Now applicable for cat 4
  "8.2.1",  // Now applies for cat 4
  "8.3.8",  // Now applies for cat 3 and 4
  "8.4.3",  // New evidence item for cat 4
]);
