import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000000';

export function makeUuid(char: string, num: number): string {
  const hex = num.toString(16).padStart(12, '0');
  return `${char.repeat(8)}-0000-0000-0000-${hex}`;
}

interface RealSource {
  num: number;
  title: string;
  url: string | null;
  sourceType: 'website' | 'pdf' | 'video' | 'notes';
  label: string;
  pagesCount?: number;
  duration?: string;
  content: string;
  summary: string;
  claims: string[];
  keywords: string[];
}

interface RealProjectSeed {
  num: number;
  title: string;
  category: string;
  description: string;
  targetDurationMinutes: number;
  sources: RealSource[];
  outline: {
    title: string;
    sections: { heading: string; description: string }[];
  };
  scriptTitle: string;
  scriptContent: (sourceUuids: string[]) => string;
  validationReport: {
    coverageScore: number;
    grammarScore: number;
    accuracyScore: number;
    qualityScore: number;
    verifiedClaims: string[];
    unsupportedClaims: string[];
    aiSuggestions: string[];
  };
}

const SEED_DATA: RealProjectSeed[] = [
  {
    num: 1,
    title: 'The Physics of Black Holes & Spacetime',
    category: 'Astrophysics & Cosmology',
    description: 'Astrophysics & Cosmology | An in-depth exploration into stellar singularities, event horizons, Hawking radiation, and the gravitational fabric of general relativity.',
    targetDurationMinutes: 12,
    sources: [
      {
        num: 1,
        title: 'Event Horizon Telescope M87* Observations',
        url: 'https://eventhorizontelescope.org/m87-results',
        sourceType: 'website',
        label: 'Website',
        content: 'The Event Horizon Telescope (EHT) collaboration presented the first direct visual evidence of a supermassive black hole and its shadow at the center of the Messier 87 galaxy. Located 55 million light-years from Earth, the black hole possesses a mass 6.5 billion times that of our Sun. The asymmetric, bright emission ring reveals synchrotron radiation from relativistic plasma orbiting near the event horizon at nearly the speed of light, confirming Einstein\'s predictions under extreme gravitational curvature.',
        summary: 'Direct visual confirmation of the M87* event horizon and relativistic synchrotron radiation ring.',
        claims: [
          'The M87* supermassive black hole is located 55 million light-years from Earth.',
          'The black hole in M87 has a mass approximately 6.5 billion times greater than our Sun.',
          "Einstein's general relativity predictions hold true even in extreme gravitational curvature near event horizons.",
        ],
        keywords: ['Event Horizon', 'M87*', 'General Relativity', 'Synchrotron Radiation', 'Singularity', 'Astrophysics'],
      },
      {
        num: 2,
        title: 'Stephen Hawking - Particle Creation by Black Holes.pdf',
        url: null,
        sourceType: 'pdf',
        label: 'PDF',
        pagesCount: 28,
        content: 'In 1974, Stephen Hawking demonstrated that quantum field effects near the event horizon of a black hole cause it to emit blackbody radiation, now recognized as Hawking Radiation. Due to vacuum fluctuations, particle-antiparticle virtual pairs continuously form. When one particle falls across the event horizon, the other escapes into infinity carrying positive mass-energy away from the black hole. Consequently, black holes slowly lose mass over astronomical timescales and will eventually undergo complete evaporation.',
        summary: 'Quantum vacuum fluctuations near event horizons drive thermal evaporation via Hawking radiation.',
        claims: [
          'Quantum fluctuations near an event horizon cause black holes to emit thermal blackbody radiation.',
          'Escaping particles reduce the total mass-energy of the black hole, causing eventual evaporation.',
          'Hawking radiation reconciles thermodynamics and quantum field theory with gravitational singularities.',
        ],
        keywords: ['Hawking Radiation', 'Quantum Mechanics', 'Thermodynamics', 'Vacuum Fluctuations', 'Black Hole Evaporation'],
      },
      {
        num: 3,
        title: 'LIGO Gravitational Waves Binary Merger Detection',
        url: 'https://ligo.caltech.edu/news/ligo20160211',
        sourceType: 'video',
        label: 'Video',
        duration: '18 mins',
        content: 'In September 2015, the Advanced LIGO detectors observed gravitational wave transient GW150914, produced by the inspiral and merger of two stellar-mass black holes with masses 36 and 29 solar masses. The final single black hole formed had a mass of 62 solar masses, converting 3 solar masses into pure gravitational radiation radiated within fractions of a second, with peak power exceeding the combined light output of all stars in the observable universe.',
        summary: 'First direct measurement of gravitational ripple waves from coalescing stellar black holes.',
        claims: [
          'LIGO detected gravitational waves GW150914 from a binary black hole merger in September 2015.',
          'Three solar masses of energy were converted into gravitational wave radiation within fractions of a second.',
          'Gravitational wave astronomy provides direct observational proof of dynamical spacetime distortions.',
        ],
        keywords: ['Gravitational Waves', 'LIGO', 'Binary Merger', 'Spacetime Curvature', 'Inspiral'],
      },
      {
        num: 4,
        title: 'Spacetime Singularity & Information Paradox Notes',
        url: null,
        sourceType: 'notes',
        label: 'Notes',
        content: 'The black hole information paradox emerges from the conflict between quantum mechanics, which requires unitary time evolution and information conservation, and general relativity, which predicts all internal structure is destroyed at the central singularity. Modern holographic duality and string theory propose that information is encoded on the outer event horizon boundary and restored in late-time entangled Hawking radiation.',
        summary: 'Theoretical tensions between quantum unitarity and classical gravitational destruction.',
        claims: [
          'The black hole information paradox challenges the fundamental quantum mechanical principle of unitarity.',
          'General relativity predicts infinite spacetime curvature at the central gravitational singularity.',
          'Holographic duality posits that interior volume dynamics are encoded on the lower-dimensional horizon surface.',
        ],
        keywords: ['Information Paradox', 'Quantum Unitary', 'Holographic Principle', 'Entanglement'],
      },
    ],
    outline: {
      title: 'The Physics of Black Holes & Spacetime',
      sections: [
        { heading: '1. Into the Abyss', description: 'Visual confirmation of event horizons through the Event Horizon Telescope.' },
        { heading: '2. The Event Horizon & Einstein', description: 'How general relativity bends light and freezes time at the boundary.' },
        { heading: '3. Quantum Collisions: Hawking Radiation', description: 'Virtual particle pairs and the thermodynamic evaporation of black holes.' },
        { heading: '4. Shaking the Cosmos: Gravitational Waves', description: 'LIGO binary mergers and astronomical proof of spacetime ripples.' },
        { heading: '5. The Ultimate Mystery: Information Paradox', description: 'Can information truly be lost, or is the cosmos holographic?' },
      ],
    },
    scriptTitle: 'The Physics of Black Holes: From Event Horizons to Quantum Paradoxes',
    scriptContent: (srcs) => `Welcome to the edge of known physics. For over a century, black holes lived purely within the mathematical equations of Albert Einstein's general theory of relativity. But today, they stand as verified cosmic realities that push our understanding of space, time, and quantum mechanics to their absolute breaking points.

In 2019, humanity witnessed what was once deemed impossible: the Event Horizon Telescope captured the first direct visual image of the supermassive black hole at the core of galaxy Messier 87 [cite:${srcs[0]}]. Fifty-five million light-years away, an inferno of relativistic plasma swirls at near light speed around a dark central void, matching Einstein's equations with breathtaking precision.

Yet at the boundary known as the event horizon, our classical laws meet quantum reality. In 1974, physicist Stephen Hawking uncovered a startling truth [cite:${srcs[1]}]. Through quantum vacuum fluctuations, black holes are not completely black—they emit a faint thermal glow known as Hawking Radiation. Over unimaginably vast spans of time, this leakage of energy causes even the most colossal black holes to evaporate into nothingness.

When black holes collide, they produce ripples that distort the very geometry of our universe. In September 2015, the Laser Interferometer Gravitational-Wave Observatory detected the collision of two black holes thirty times the mass of our sun [cite:${srcs[2]}]. In less than a second, three solar masses of matter converted entirely into pure gravitational radiation, momentarily outshining all the stars in the visible cosmos combined.

This leads us to the deepest unanswered question in modern science: the Black Hole Information Paradox [cite:${srcs[3]}]. If matter falls in and the black hole evaporates away, is the quantum information it contained permanently erased? Solving this dilemma may finally give physicists the long-sought holy grail: a unified theory of Quantum Gravity.`,
    validationReport: {
      coverageScore: 94,
      grammarScore: 96,
      accuracyScore: 95,
      qualityScore: 93,
      verifiedClaims: [
        'M87* first visual evidence confirmed at 55 million light-years distance.',
        'Stephen Hawking 1974 particle creation and thermal black hole evaporation.',
        'LIGO GW150914 binary merger converted 3 solar masses to gravitational waves.',
        'Information conservation conflict between quantum mechanics and general relativity.',
      ],
      unsupportedClaims: [],
      aiSuggestions: [
        'Include a brief note on the Schwarzschild radius formula for clarity.',
        'Mention the role of supercomputers in reconstructing the EHT interferometry data.',
        'Pacing across the gravitational waves section is exceptionally engaging.',
      ],
    },
  },
  {
    num: 2,
    title: 'AI Ethics & Diagnostic Bias in Healthcare',
    category: 'Technology & Medicine',
    description: 'Technology & Medicine | Evaluating algorithmic fairness, clinical safety, patient data confidentiality, and diagnostic disparities in medical machine learning systems.',
    targetDurationMinutes: 10,
    sources: [
      {
        num: 5,
        title: 'Algorithmic Bias in Clinical Decision Support Systems',
        url: 'https://nature.com/articles/clinical-bias',
        sourceType: 'website',
        label: 'Website',
        content: 'Commercial prediction algorithms used routinely in hospitals to identify high-risk patients exhibit significant racial bias. Because health expenditure was used as a proxy for healthcare need, the algorithm falsely concluded that Black patients were healthier than equally sick white patients, reducing referral rates by more than half.',
        summary: 'Health expenditure proxy variables introduce profound disparities in clinical triage algorithms.',
        claims: [
          'Using financial cost as a proxy for healthcare need introduces severe systemic algorithmic bias.',
          'Under-resourced patient demographics receive fewer specialist referrals when models are unchecked.',
          'Auditing clinical training datasets is vital before deploying hospital triage automation.',
        ],
        keywords: ['Clinical Bias', 'Algorithmic Fairness', 'Triage Systems', 'Healthcare Disparities'],
      },
      {
        num: 6,
        title: 'WHO Ethics & Governance of AI for Health.pdf',
        url: null,
        sourceType: 'pdf',
        label: 'PDF',
        pagesCount: 42,
        content: 'The World Health Organization established six core principles for AI in medicine: protecting autonomy, promoting human well-being, ensuring transparency and explainability, fostering responsibility and accountability, ensuring inclusiveness and equity, and promoting sustainable, responsive technology design.',
        summary: 'Global consensus guidelines for ethical medical AI deployment published by the WHO.',
        claims: [
          'The WHO defines six core governance principles for medical artificial intelligence.',
          'Explainability and human oversight are non-negotiable standards for clinical AI tools.',
          'AI systems must preserve patient autonomy and foster equitable global health outcomes.',
        ],
        keywords: ['WHO Governance', 'Explainability', 'Medical Ethics', 'Accountability'],
      },
      {
        num: 7,
        title: 'Stanford Medicine - Deep Learning in Radiology Lecture',
        url: 'https://stanford.edu/radiology-ai',
        sourceType: 'video',
        label: 'Video',
        duration: '35 mins',
        content: 'Convolutional neural networks achieved radiologist-level performance in detecting pneumonia on chest radiographs. However, model performance drops significantly when deployed across different hospital systems due to dataset shift, varying scanner calibrations, and differing demographic prevalence.',
        summary: 'High diagnostic accuracy accompanied by vulnerability to hospital domain shift.',
        claims: [
          'Deep neural networks match or exceed radiologist accuracy under controlled benchmark conditions.',
          'Domain shift between different imaging hardware causes catastrophic diagnostic accuracy drops.',
          'Continuous validation across multi-center cohorts is necessary for robust clinical utility.',
        ],
        keywords: ['Radiology', 'Deep Learning', 'Domain Shift', 'Pneumonia Detection'],
      },
      {
        num: 8,
        title: 'HIPAA Patient Privacy & Model Drift Research Notes',
        url: null,
        sourceType: 'notes',
        label: 'Notes',
        content: 'Federated learning enables machine learning models to train across distributed hospital datasets without transferring raw electronic health records, safeguarding patient privacy under HIPAA while reducing vulnerability to localized model drift.',
        summary: 'Decentralized federated training architectures for HIPAA-compliant clinical AI.',
        claims: [
          'Federated learning trains medical models without centralized aggregation of protected health data.',
          'Model drift in clinical settings occurs when clinical workflows or treatment standards evolve.',
          'Differential privacy guarantees prevent patient re-identification from model weight parameters.',
        ],
        keywords: ['HIPAA', 'Federated Learning', 'Model Drift', 'Privacy Protection'],
      },
    ],
    outline: {
      title: 'AI Ethics & Diagnostic Bias in Healthcare',
      sections: [
        { heading: '1. The Promise and Peril', description: 'How deep learning matches top radiologists while risking hidden systemic bias.' },
        { heading: '2. Anatomy of Algorithmic Disparity', description: 'When proxy metrics like financial expenditure distort medical triage.' },
        { heading: '3. The WHO Ethical Framework', description: 'Six pillars of safe, explainable, and equitable clinical AI deployment.' },
        { heading: '4. Privacy in the Era of Big Data', description: 'Federated learning and differential privacy under HIPAA compliance.' },
      ],
    },
    scriptTitle: 'AI Ethics in Medicine: Accuracy, Fairness, and the Human Element',
    scriptContent: (srcs) => `Artificial intelligence is entering modern medicine at a speed unseen in previous technological revolutions. From screening mammograms to predicting ICU septic shock hours before symptoms appear, deep learning models are unlocking superhuman diagnostic capabilities [cite:${srcs[2]}]. But when algorithms make life-or-death recommendations, who ensures they are fair, transparent, and safe?

Beneath the promising accuracy figures lies a critical vulnerability: algorithmic bias. A landmark investigation revealed that commercial risk-scoring algorithms widely used across healthcare networks systematically underprivileged minority patients [cite:${srcs[0]}]. Because the model used historical healthcare expenditure as a proxy for illness severity, it failed to account for existing economic disparities—assigning lower risk scores to patients with severe untreated illnesses.

To protect patients, the World Health Organization established six foundational governance rules [cite:${srcs[1]}]. Above all, algorithms must never replace human clinical judgement; they must serve as explainable decision-support systems that empower physicians and respect patient autonomy.

Furthermore, medical AI relies heavily on vast quantities of protected health records. Innovations like federated learning allow neural networks to train directly on hospital servers without patient records ever leaving the institution [cite:${srcs[3]}]. Ultimately, the future of healthcare AI lies not in replacing clinicians, but in pairing human empathy with verified, transparent machine intelligence.`,
    validationReport: {
      coverageScore: 91,
      grammarScore: 94,
      accuracyScore: 92,
      qualityScore: 91,
      verifiedClaims: [
        'Clinical risk algorithms have previously introduced racial bias via cost proxies.',
        'WHO established six guiding principles for healthcare artificial intelligence.',
        'Federated learning provides decentralized model training without raw EHR export.',
      ],
      unsupportedClaims: [],
      aiSuggestions: [
        'Consider citing the FDA software-as-a-medical-device (SaMD) regulatory pathways.',
        'Emphasize the difference between prospective and retrospective clinical trial validations.',
      ],
    },
  },
  {
    num: 3,
    title: 'The Fall of the Roman Republic: From Caesar to Empire',
    category: 'Ancient History & Politics',
    description: 'Ancient History & Politics | Unpacking the constitutional breakdown, agrarian inequality, populist demagoguery, and military loyalty that dissolved five centuries of republican rule.',
    targetDurationMinutes: 15,
    sources: [
      {
        num: 9,
        title: 'The Rubicon & Constitutional Crisis: 49 BCE',
        url: 'https://ancienthistory.org/rubicon-crisis',
        sourceType: 'website',
        label: 'Website',
        content: 'On January 10, 49 BCE, Julius Caesar crossed the Rubicon stream with Legio XIII, committing high treason under Roman constitutional law. Faced with prosecution by senatorial conservatives led by Cato and Pompey upon surrendering his imperium, Caesar chose civil war over political destruction, uttering "Alea iacta est" (The die is cast).',
        summary: 'Crossing the constitutional Rubicon and the descent into decisive civil conflict.',
        claims: [
          'Caesar crossed the Rubicon with Legio XIII in January 49 BCE, violating Roman military law.',
          'Senatorial refusal to allow Caesar to stand for consul in absentia precipitated the invasion of Italy.',
          'The Senate passed the Senatus Consultum Ultimum, ordering Pompey to defend the Republic.',
        ],
        keywords: ['Rubicon', 'Julius Caesar', 'Civil War', 'Senate', 'Constitutional Law'],
      },
      {
        num: 10,
        title: "Cicero's Philippics on Tyranny & Oligarchy.pdf",
        url: null,
        sourceType: 'pdf',
        label: 'PDF',
        pagesCount: 56,
        content: 'Marcus Tullius Cicero composed fourteen blistering orations known as the Philippics between 44 and 43 BCE, vehemently denouncing Mark Antony as a lawless tyrant threatening to extinguish the revived Republic following the assassination of Julius Caesar on the Ides of March.',
        summary: 'Ciceronian political oratory defending constitutional republicanism against military autocracy.',
        claims: [
          'Cicero delivered fourteen Philippic speeches against Mark Antony following Caesar\'s assassination.',
          'Cicero sought to guide Octavian to protect constitutional traditions against military dictatorship.',
          'The Second Triumvirate resulted in proscription lists leading directly to Cicero\'s murder in 43 BCE.',
        ],
        keywords: ['Cicero', 'Philippics', 'Mark Antony', 'Triumvirate', 'Ides of March'],
      },
      {
        num: 11,
        title: 'Dan Carlin - Death Throes of the Republic Audio Essay',
        url: 'https://dancarlin.com/death-throes',
        sourceType: 'video',
        label: 'Video',
        duration: '52 mins',
        content: 'The decline of the Roman Republic began nearly a century before Caesar with the Gracchi brothers in 133 BCE. By introducing political violence into the Roman Forum and bypassing the Senate with popular assemblies, the norms that restrained senatorial ambition shattered irrevocably.',
        summary: 'Generational decay of political norms and institutional decay over a century.',
        claims: [
          'Political violence became normalized in Roman politics following the murder of Tiberius Gracchus in 133 BCE.',
          'The Marian reforms created professional client armies whose loyalty was to their general rather than Rome.',
          'Sulla established the precedent of marching Roman legions on Rome itself and establishing dictatorships.',
        ],
        keywords: ['Marian Reforms', 'Gracchi Brothers', 'Sulla', 'Political Violence', 'Client Armies'],
      },
      {
        num: 12,
        title: 'Agrarian Land Reforms & Roman Legionary Loyalty Notes',
        url: null,
        sourceType: 'notes',
        label: 'Notes',
        content: 'As Rome expanded across the Mediterranean, vast influxes of enslaved labor displaced free Roman peasant farmers into city slums. Latifundia (large aristocratic estates) dominated agriculture, driving legions to look to ambitious commanders for retirement land grants rather than the Senate.',
        summary: 'Economic displacement of the Roman citizenry and the rise of personal armies.',
        claims: [
          'Inundation of enslaved captives led to the growth of aristocratic latifundia estates.',
          'Dispossessed rural citizens flocked to Rome, forming a volatile urban proletariat.',
          'Veterans relied on their military generals to negotiate post-service land allotments.',
        ],
        keywords: ['Latifundia', 'Land Reform', 'Veterans', 'Proletariat', 'Economic Crisis'],
      },
    ],
    outline: {
      title: 'The Fall of the Roman Republic',
      sections: [
        { heading: '1. The Seeds of Collapse', description: 'Agrarian inequality, the Gracchi brothers, and the normalization of violence.' },
        { heading: '2. The Army of the General', description: 'How the Marian military reforms created warlords.' },
        { heading: '3. Crossing the Rubicon', description: 'Caesar, Pompey, and the constitutional point of no return.' },
        { heading: '4. The Death Throes', description: 'Cicero, the Ides of March, and the rise of Augustus Caesar.' },
      ],
    },
    scriptTitle: 'The Fall of the Roman Republic: How Five Centuries of Democracy Died',
    scriptContent: (srcs) => `How does a republic that stood for nearly five hundred years collapse into military dictatorship? The fall of the Roman Republic is often remembered by a single moment: Julius Caesar crossing the Rubicon in 49 BCE [cite:${srcs[0]}]. But the truth is that Rome did not die in a single day—it decayed over generations of broken norms, unbridled inequality, and political polarization.

The fracture began in 133 BCE with the Gracchi brothers [cite:${srcs[2]}]. Rapid territorial conquests flooded Italy with slave labor, ruining small family farms and concentrating wealth into aristocratic mega-estates known as latifundia [cite:${srcs[3]}]. When Tiberius Gracchus attempted agrarian land reform, conservative senators clubbed him to death in the Forum—injecting lethal violence into Roman politics for the first time.

Decades later, the general Gaius Marius removed property requirements for military service. Suddenly, Roman soldiers were no longer citizen-farmers defending their republic; they were poor enlistees dependent entirely on their commanding general for pay, plunder, and retirement land. The Roman legions were transformed into private armies loyal to warlords like Sulla, Pompey, and Julius Caesar.

When the Senate ordered Caesar to surrender his legions and face prosecution, he made the fateful gamble. Standing on the banks of the Rubicon with Legio XIII, he uttered the immortal words, "The die is cast," and marched on Italy. Despite Cicero's desperate, eloquent defense of constitutional liberty in his Philippics [cite:${srcs[1]}], the old Republic was already hollowed out from within. Out of its ashes rose the Roman Empire under Caesar's adopted heir, Augustus.`,
    validationReport: {
      coverageScore: 92,
      grammarScore: 95,
      accuracyScore: 94,
      qualityScore: 90,
      verifiedClaims: [
        'Caesar crossed the Rubicon in 49 BCE initiating Roman civil war.',
        'Marian military reforms shifted legionary allegiance to generals.',
        'Cicero delivered the Philippics against Mark Antony before the Triumvirate.',
      ],
      unsupportedClaims: [],
      aiSuggestions: [
        'Add one sentence detailing Sulla\'s march on Rome in 88 BCE as the direct precursor.',
      ],
    },
  },
  {
    num: 4,
    title: 'How CRISPR-Cas9 is Rewriting the Code of Life',
    category: 'Biotechnology & Genetics',
    description: 'Biotechnology & Genetics | Molecular mechanisms of RNA-guided endonuclease editing, clinical therapies for sickle cell anemia, and bioethical horizons.',
    targetDurationMinutes: 11,
    sources: [
      {
        num: 13,
        title: 'Doudna & Charpentier 2012 Dual-RNA Cas9 Discovery.pdf',
        url: null,
        sourceType: 'pdf',
        label: 'PDF',
        pagesCount: 22,
        content: 'Jennifer Doudna and Emmanuelle Charpentier showed that the bacterial adaptive immune system CRISPR-Cas9 utilizes a dual-RNA structure—crRNA and tracrRNA—that can be engineered into a single guide RNA (sgRNA) to direct the Cas9 endonuclease to cleave specific double-stranded DNA sequences with base-pair precision.',
        summary: 'Landmark discovery engineering bacterial CRISPR defense into a programmable genome editing tool.',
        claims: [
          'Cas9 utilizes single guide RNA (sgRNA) to introduce targeted double-strand breaks in DNA.',
          'The bacterial CRISPR system was adapted for programmable site-specific genetic engineering.',
          'Recognition requires a short protospacer adjacent motif (PAM) sequence adjacent to the target site.',
        ],
        keywords: ['CRISPR', 'Cas9', 'sgRNA', 'Doudna', 'PAM Sequence', 'Gene Editing'],
      },
      {
        num: 14,
        title: 'FDA Approval of Casgevy for Sickle Cell Disease',
        url: 'https://fda.gov/news/casgevy-approval',
        sourceType: 'website',
        label: 'Website',
        content: 'In December 2023, the US FDA approved Casgevy (exagamglogene autotemcel), the first CRISPR-based gene-editing therapy for patients aged 12 and older with sickle cell disease and transfusion-dependent beta-thalassemia, reactivating fetal hemoglobin production.',
        summary: 'Historical first therapeutic approval of human in vivo CRISPR gene editing.',
        claims: [
          'Casgevy became the first FDA-approved CRISPR gene-editing medicine in December 2023.',
          'The therapy edits the BCL11A enhancer in hematopoietic stem cells to reactivate fetal hemoglobin.',
          'Clinical trials demonstrated complete elimination of severe vaso-occlusive pain crises.',
        ],
        keywords: ['Casgevy', 'Sickle Cell', 'FDA Approval', 'BCL11A', 'Hemoglobin'],
      },
      {
        num: 15,
        title: 'MIT Broad Institute - Prime Editing vs Base Editing',
        url: 'https://broadinstitute.org/crispr-next-gen',
        sourceType: 'video',
        label: 'Video',
        duration: '24 mins',
        content: 'While original Cas9 creates double-strand breaks that can introduce erratic insertions and deletions, next-generation technologies like base editing and prime editing allow precise single-letter nucleotide conversions or sequence insertions without cutting both strands of DNA.',
        summary: 'Precision editing architectures avoiding double-strand breaks.',
        claims: [
          'Base editors perform single-nucleotide transitions without double-stranded DNA cleavage.',
          'Prime editing utilizes an engineered reverse transcriptase guided by pegRNA.',
          'Next-gen editing drastically diminishes bystander mutations and genomic translocations.',
        ],
        keywords: ['Base Editing', 'Prime Editing', 'Broad Institute', 'Double-Strand Breaks'],
      },
      {
        num: 16,
        title: 'Off-Target Double Strand Breaks & Germline Ethics Notes',
        url: null,
        sourceType: 'notes',
        label: 'Notes',
        content: 'Somatic cell editing treats individual patients without passing changes to descendants. In contrast, germline editing alters the DNA of embryos, sperm, or eggs, raising profound bioethical dilemmas regarding unintended off-target edits, consent of future generations, and genetic inequality.',
        summary: 'Ethical and biological distinctions between somatic therapies and germline alterations.',
        claims: [
          'Somatic genetic modifications remain confined to the patient and are not heritable.',
          'Germline gene alterations are passed down perpetually to all future generations.',
          'International scientific consensus maintains a strict moratorium on clinical human germline editing.',
        ],
        keywords: ['Germline Editing', 'Somatic Cells', 'Bioethics', 'Off-Target Effects'],
      },
    ],
    outline: {
      title: 'How CRISPR-Cas9 is Rewriting the Code of Life',
      sections: [
        { heading: '1. The Molecular Word Processor', description: 'From bacterial viral immunity to precision RNA-guided DNA scissors.' },
        { heading: '2. A Medical Breakthrough: Casgevy', description: 'Curing sickle cell anemia by reactivating fetal hemoglobin.' },
        { heading: '3. Beyond the Double-Strand Break', description: 'Prime editing and base editing: surgical genetic precision.' },
        { heading: '4. The Ethical Threshold', description: 'Somatic cures versus germline modification and designer genetics.' },
      ],
    },
    scriptTitle: 'CRISPR: The Molecular Revolution Transforming Medicine',
    scriptContent: (srcs) => `For four billion years, the fundamental code of biological life on Earth was shaped exclusively through random mutations and natural selection. Today, humanity has learned how to open the book of life and edit its sentences letter by letter. This is the story of CRISPR-Cas9.

Discovered as a humble bacterial immune defense system against invading viruses, biochemists Jennifer Doudna and Emmanuelle Charpentier unlocked its potential as a programmable molecular tool in 2012 [cite:${srcs[0]}]. By pairing a bacterial DNA-cutting enzyme called Cas9 with a synthetic guide RNA, scientists can direct molecular scissors to any specific sequence among our three billion base pairs with pinpoint accuracy.

In December 2023, the scientific promise turned into a life-saving reality. The FDA officially approved Casgevy, the world's first CRISPR-based medical therapy [cite:${srcs[1]}]. By editing the hematopoietic stem cells of patients suffering from sickle cell disease, the treatment reactivates fetal hemoglobin production—effectively curing a agonizing hereditary disorder that had plagued humanity for millennia.

Yet the field is evolving even faster. Advanced techniques like prime editing and base editing now modify genetic letters without cutting both DNA strands at all, eliminating unwanted cellular damage [cite:${srcs[2]}]. As we stand on the threshold of eradicating genetic diseases, society must navigate profound bioethical boundaries: using somatic editing to heal existing suffering while drawing a strict ethical line against heritable germline modifications [cite:${srcs[3]}].`,
    validationReport: {
      coverageScore: 96,
      grammarScore: 97,
      accuracyScore: 98,
      qualityScore: 95,
      verifiedClaims: [
        'Doudna and Charpentier 2012 discovery of programmable Cas9 with sgRNA.',
        'FDA approval of Casgevy for sickle cell disease in December 2023.',
        'Prime editing and base editing enable single-letter changes without DSBs.',
        'Distinction between non-heritable somatic edits and heritable germline edits.',
      ],
      unsupportedClaims: [],
      aiSuggestions: [
        'Mention the role of the PAM sequence (NGG for SpCas9) as a key molecular trigger.',
      ],
    },
  },
  {
    num: 5,
    title: 'The Neuroscience of Habit Formation & Dopamine Loops',
    category: 'Behavioral Psychology',
    description: 'Behavioral Psychology | Basal ganglia chunking, dopamine reward prediction errors, environmental friction, and neurological protocols for behavioral change.',
    targetDurationMinutes: 10,
    sources: [
      {
        num: 17,
        title: 'MIT Study - Basal Ganglia & Chunked Action Loops.pdf',
        url: null,
        sourceType: 'pdf',
        label: 'PDF',
        pagesCount: 30,
        content: 'Neuroscientists at MIT demonstrated that habits are encoded within the basal ganglia through a process called "chunking", where the brain converts a sequence of deliberate actions into an automatic behavioral routine. Brain activity spikes at the cue and reward phases while remaining dormant during routine execution, conserving prefrontal cortex cognitive bandwidth.',
        summary: 'Basal ganglia motor chunking and neurological energy conservation during habitual execution.',
        claims: [
          'Habits are neurologically consolidated in the basal ganglia via behavioral chunking.',
          'Prefrontal cortex activity drops during habit execution and spikes during cue identification and reward.',
          'Chunking allows the brain to automate complex behavioral routines to save cognitive energy.',
        ],
        keywords: ['Basal Ganglia', 'Chunking', 'Habit Loop', 'Prefrontal Cortex', 'MIT Neuroscience'],
      },
      {
        num: 18,
        title: 'Dopamine Reward Prediction Errors in Behavioral Conditioning',
        url: 'https://nature.com/articles/dopamine-rpe',
        sourceType: 'website',
        label: 'Website',
        content: 'Dopaminergic neurons in the ventral tegmental area (VTA) calculate Reward Prediction Errors (RPE). Dopamine does not create pleasure upon reward receipt; rather, it spikes during anticipatory anticipation when a cue predicts a reward, driving craving, motivation, and goal-directed seeking behavior.',
        summary: 'Reward prediction errors and the neurochemical distinction between anticipation and pleasure.',
        claims: [
          'Dopamine functions primarily as a neuromodulator of anticipation and desire rather than consummatory pleasure.',
          'Reward prediction errors adjust future behavioral expectations whenever actual outcomes differ from predictions.',
          'Anticipatory dopamine surges reinforce the habit loop before the physical action is completed.',
        ],
        keywords: ['Dopamine', 'Reward Prediction Error', 'VTA', 'Anticipation', 'Conditioning'],
      },
      {
        num: 19,
        title: 'Huberman Lab - Neural Plasticity & Friction Protocol',
        url: 'https://hubermanlab.com/neural-plasticity-habits',
        sourceType: 'video',
        label: 'Video',
        duration: '44 mins',
        content: 'Limbic friction represents the energetic activation barrier required to execute a behavior against internal resistance. Habits become context-independent when procedural memory circuits in the striatum fire automatically regardless of emotional or physical state.',
        summary: 'Limbic friction protocols and circadian phase-based habit consolidation.',
        claims: [
          'Limbic friction is the cognitive activation energy needed to overcome lethargy or distraction.',
          'Habits anchored to circadian dopamine rhythms consolidate faster into permanent routines.',
          'Procedural memory visualization physically reinforces striatal synaptic pathways.',
        ],
        keywords: ['Limbic Friction', 'Neuroplasticity', 'Procedural Memory', 'Circadian Rhythms'],
      },
      {
        num: 20,
        title: 'Cue-Routine-Reward Implementation Protocol Notes',
        url: null,
        sourceType: 'notes',
        label: 'Notes',
        content: 'The Golden Rule of habit change states that established neurological habit loops cannot be completely extinguished; rather, an existing loop is modified by keeping the established cue and reward while deliberately substituting a new behavioral routine.',
        summary: 'Routine substitution methodology for established neurological loops.',
        claims: [
          'Established neural habit circuits remain permanent; behavior is altered through routine substitution.',
          'Environmental architecture shapes habit triggers more effectively than conscious willpower alone.',
          'Immediate micro-rewards trigger local dopamine spikes necessary for synaptic consolidation.',
        ],
        keywords: ['Habit Change', 'Cue-Routine-Reward', 'Environmental Architecture', 'Routine Substitution'],
      },
    ],
    outline: {
      title: 'The Neuroscience of Habit Formation & Dopamine Loops',
      sections: [
        { heading: '1. The Brain on Autopilot', description: 'How the basal ganglia compresses complex routines into chunked habits.' },
        { heading: '2. The Molecule of Craving', description: 'Why dopamine drives anticipation rather than satisfaction.' },
        { heading: '3. Overcoming Limbic Friction', description: 'Action potential thresholds and the mechanics of willpower.' },
        { heading: '4. Reprogramming the Loop', description: 'The golden rule of habit change: routine substitution.' },
      ],
    },
    scriptTitle: 'The Neuroscience of Habit Formation: Rewiring Your Brain\'s Dopamine Loops',
    scriptContent: (srcs) => `Nearly forty percent of our daily actions are not conscious decisions—they are automated neurological habits. Whether checking your smartphone first thing in the morning or brewing your favorite cup of coffee, your brain has outsourced these behaviors to specialized subcortical circuits to preserve mental energy.

At the core of this automation sits the basal ganglia [cite:${srcs[0]}]. Through a fascinating neurological mechanism known as "chunking," the brain compresses a complex sequence of physical actions into a single automatic program. Once initiated by an environmental cue, your conscious prefrontal cortex essentially goes to sleep—letting the habit play out until the reward is achieved.

Contrary to popular belief, the neurotransmitter dopamine does not produce feelings of happiness or pleasure [cite:${srcs[1]}]. Dopamine is the chemical engine of anticipation and craving. It surges the moment you spot a familiar cue, creating an intense neurological urge to execute the routine in expectation of a reward.

Building new habits or breaking unwanted ones requires understanding "limbic friction"—the psychological activation barrier standing between your intention and physical action [cite:${srcs[2]}]. Because old neural pathways never disappear entirely, the most effective way to change a habit is not raw willpower, but routine substitution [cite:${srcs[3]}]: keep the same cue, provide the same neurological reward, but deliberately swap in a healthier routine.`,
    validationReport: {
      coverageScore: 93,
      grammarScore: 96,
      accuracyScore: 95,
      qualityScore: 92,
      verifiedClaims: [
        'Basal ganglia encodes automated motor routines via chunking.',
        'Dopamine drives anticipation rather than consummatory pleasure.',
        'Limbic friction measures cognitive barrier to behavioral initiation.',
        'Habits cannot be fully erased but can be modified via routine substitution.',
      ],
      unsupportedClaims: [],
      aiSuggestions: [
        'Mention the role of sleep in consolidating striatal memory circuits.',
        'Contrast intrinsic micro-rewards with extrinsic delayed rewards.',
      ],
    },
  },
];

async function seed() {
  console.log('--- Starting Real Educational Content Seeding ---');

  for (const project of SEED_DATA) {
    const projectId = makeUuid('b', project.num);
    console.log(`\nSeeding project: "${project.title}" (${projectId})`);

    // 1. Upsert Project
    const { error: projError } = await supabase.from('projects').upsert({
      id: projectId,
      user_id: DEFAULT_USER_ID,
      title: project.title,
      description: project.description,
      target_duration_minutes: project.targetDurationMinutes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (projError) {
      console.error(`Failed to upsert project ${project.title}:`, projError.message);
      continue;
    }
    console.log(`✓ Project inserted`);

    // 2. Insert Sources, Chunks, and Claims
    const sourceUuids: string[] = [];
    for (const src of project.sources) {
      const sourceId = makeUuid('a', src.num);
      sourceUuids.push(sourceId);

      const { error: srcError } = await supabase.from('sources').upsert({
        id: sourceId,
        project_id: projectId,
        title: src.title,
        url: src.url,
        source_type: src.sourceType,
        raw_content: src.content,
        summary: src.summary,
        processing_status: 'completed',
        created_at: new Date().toISOString(),
      });

      if (srcError) {
        console.error(`Failed to upsert source ${src.title}:`, srcError.message);
        continue;
      }

      // Upsert Chunks
      const chunkId = makeUuid('c', src.num);
      await supabase.from('source_chunks').upsert({
        id: chunkId,
        source_id: sourceId,
        project_id: projectId,
        chunk_index: 0,
        content: src.content,
        embedding_model: 'text-embedding-004',
        created_at: new Date().toISOString(),
      });

      // Upsert Claims
      for (let i = 0; i < src.claims.length; i++) {
        const claimId = makeUuid('d', src.num * 10 + i);
        await supabase.from('claims').upsert({
          id: claimId,
          source_id: sourceId,
          project_id: projectId,
          claim_text: src.claims[i],
          confidence_score: 0.95,
          created_at: new Date().toISOString(),
        });
      }
    }
    console.log(`✓ ${project.sources.length} sources, chunks, and claims inserted`);

    // 3. Upsert Outline
    const outlineId = makeUuid('e', project.num);
    await supabase.from('outlines').upsert({
      id: outlineId,
      project_id: projectId,
      title: project.outline.title,
      structure: project.outline,
      created_at: new Date().toISOString(),
    });
    console.log(`✓ Outline inserted`);

    // 4. Upsert Script
    const scriptId = makeUuid('f', project.num);
    const content = project.scriptContent(sourceUuids);
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const estimatedReadTimeSeconds = Math.round((wordCount / 140) * 60);

    await supabase.from('scripts').upsert({
      id: scriptId,
      project_id: projectId,
      outline_id: outlineId,
      title: project.scriptTitle,
      content,
      word_count: wordCount,
      estimated_read_time_seconds: estimatedReadTimeSeconds,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    console.log(`✓ Script inserted (${wordCount} words)`);

    // 5. Upsert Validation Report
    const reportId = makeUuid('1', project.num);
    await supabase.from('validation_reports').upsert({
      id: reportId,
      project_id: projectId,
      script_id: scriptId,
      coverage_score: project.validationReport.coverageScore,
      verified_claims: project.validationReport.verifiedClaims,
      unsupported_claims: project.validationReport.unsupportedClaims,
      missing_topics: project.validationReport.aiSuggestions,
      created_at: new Date().toISOString(),
    });
    console.log(`✓ Validation report inserted (${project.validationReport.coverageScore}% coverage)`);
  }

  console.log('\n========================================');
  console.log('All 5 real educational projects seeded successfully!');
  console.log('========================================');
}

seed().catch(console.error);
