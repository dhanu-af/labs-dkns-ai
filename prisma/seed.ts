import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function upsertCategory(
  type: "EQUIPMENT" | "METHOD" | "SOP" | "DIRECTORY",
  slug: string,
  name: string,
  order: number,
  parentSlug?: string
) {
  const parent = parentSlug
    ? await prisma.category.findUnique({ where: { type_slug: { type, slug: parentSlug } } })
    : null;

  return prisma.category.upsert({
    where: { type_slug: { type, slug } },
    update: { name, order, parentId: parent?.id ?? null },
    create: { type, slug, name, order, parentId: parent?.id ?? null },
  });
}

async function main() {
  // -------------------------------------------------------------------
  // Bootstrap the initial super admin account from env vars, never from
  // a literal in source (this repo is public). Safe to re-run: if the
  // password env var changes, the stored hash is refreshed on next
  // deploy. Skips silently if the account already exists and no
  // bootstrap password is configured.
  // -------------------------------------------------------------------
  const bootstrapUsername = process.env.SITE_USERNAME;
  const bootstrapPassword = process.env.SITE_PASSWORD;
  if (bootstrapUsername && bootstrapPassword) {
    const passwordHash = await bcrypt.hash(bootstrapPassword, 10);
    await prisma.user.upsert({
      where: { username: bootstrapUsername },
      update: { passwordHash, role: "SUPER_ADMIN" },
      create: { username: bootstrapUsername, passwordHash, role: "SUPER_ADMIN" },
    });
  }

  // -------------------------------------------------------------------
  // Equipment taxonomy (2.2 Analytical Instruments, 2.3 General Lab Equipment)
  // -------------------------------------------------------------------
  await upsertCategory("EQUIPMENT", "analytical-instruments", "Analytical Instruments", 1);
  await upsertCategory("EQUIPMENT", "spectroscopy", "Spectroscopy", 1, "analytical-instruments");
  await upsertCategory("EQUIPMENT", "chromatography", "Chromatography", 2, "analytical-instruments");
  await upsertCategory("EQUIPMENT", "mass-spectrometry", "Mass Spectrometry", 3, "analytical-instruments");
  await upsertCategory("EQUIPMENT", "electrochemical-analyzers", "Electrochemical Analyzers", 4, "analytical-instruments");
  await upsertCategory("EQUIPMENT", "thermal-analysis", "Thermal Analysis", 5, "analytical-instruments");
  await upsertCategory("EQUIPMENT", "microscopy", "Microscopy", 6, "analytical-instruments");

  await upsertCategory("EQUIPMENT", "general-lab-equipment", "General Lab Equipment", 2);
  await upsertCategory("EQUIPMENT", "balances-weighing", "Balances & Weighing", 1, "general-lab-equipment");
  await upsertCategory("EQUIPMENT", "centrifuges", "Centrifuges", 2, "general-lab-equipment");
  await upsertCategory("EQUIPMENT", "incubators-ovens", "Incubators & Ovens", 3, "general-lab-equipment");
  await upsertCategory("EQUIPMENT", "autoclaves-sterilizers", "Autoclaves & Sterilizers", 4, "general-lab-equipment");
  await upsertCategory("EQUIPMENT", "water-purification-systems", "Water Purification Systems", 5, "general-lab-equipment");
  await upsertCategory("EQUIPMENT", "fume-hoods-biosafety-cabinets", "Fume Hoods & Biosafety Cabinets", 6, "general-lab-equipment");
  await upsertCategory("EQUIPMENT", "refrigeration-cold-storage", "Refrigeration & Cold Storage", 7, "general-lab-equipment");
  await upsertCategory("EQUIPMENT", "glassware-consumables", "Glassware & Consumables", 8, "general-lab-equipment");

  // -------------------------------------------------------------------
  // Method taxonomy (3.2-3.5)
  // -------------------------------------------------------------------
  await upsertCategory("METHOD", "chemical-analysis-methods", "Chemical Analysis Methods", 1);
  await upsertCategory("METHOD", "titrimetric-methods", "Titrimetric Methods", 1, "chemical-analysis-methods");
  await upsertCategory("METHOD", "gravimetric-analysis", "Gravimetric Analysis", 2, "chemical-analysis-methods");
  await upsertCategory("METHOD", "spectrophotometric-methods", "Spectrophotometric Methods", 3, "chemical-analysis-methods");

  await upsertCategory("METHOD", "instrumental-methods", "Instrumental Methods", 2);
  await upsertCategory("METHOD", "chromatographic-techniques", "Chromatographic Techniques", 1, "instrumental-methods");
  await upsertCategory("METHOD", "spectroscopic-techniques", "Spectroscopic Techniques", 2, "instrumental-methods");
  await upsertCategory("METHOD", "electroanalytical-techniques", "Electroanalytical Techniques", 3, "instrumental-methods");

  await upsertCategory("METHOD", "biological-microbiological-methods", "Biological/Microbiological Methods", 3);
  await upsertCategory("METHOD", "culturing-staining", "Culturing & Staining", 1, "biological-microbiological-methods");
  await upsertCategory("METHOD", "pcr-molecular-techniques", "PCR & Molecular Techniques", 2, "biological-microbiological-methods");
  await upsertCategory("METHOD", "elisa-immunoassays", "ELISA & Immunoassays", 3, "biological-microbiological-methods");

  await upsertCategory("METHOD", "physical-testing-methods", "Physical Testing Methods", 4);
  await upsertCategory("METHOD", "mechanical-testing", "Mechanical Testing", 1, "physical-testing-methods");
  await upsertCategory("METHOD", "thermal-rheological-testing", "Thermal/Rheological Testing", 2, "physical-testing-methods");

  // -------------------------------------------------------------------
  // SOP taxonomy (4.1) -- flat, Phase 2 content ships later
  // -------------------------------------------------------------------
  await upsertCategory("SOP", "sample-handling", "Sample Handling", 1);
  await upsertCategory("SOP", "equipment-operation", "Equipment Operation", 2);
  await upsertCategory("SOP", "cleaning", "Cleaning", 3);
  await upsertCategory("SOP", "waste-disposal", "Waste Disposal", 4);

  // -------------------------------------------------------------------
  // Standards & Regulations Library (7.5)
  // -------------------------------------------------------------------
  const iso17025 = await prisma.standardReference.upsert({
    where: { code: "ISO/IEC 17025" },
    update: {},
    create: {
      code: "ISO/IEC 17025",
      title: "General requirements for the competence of testing and calibration laboratories",
      summary: "The primary accreditation standard for testing and calibration laboratories.",
    },
  });
  const astmE11 = await prisma.standardReference.upsert({
    where: { code: "ASTM E11" },
    update: {},
    create: {
      code: "ASTM E11",
      title: "Standard Specification for Woven Wire Test Sieve Cloth and Test Sieves",
      summary: "Specification governing sieve mesh sizing used in particle size testing.",
    },
  });
  const usp621 = await prisma.standardReference.upsert({
    where: { code: "USP <621>" },
    update: {},
    create: {
      code: "USP <621>",
      title: "Chromatography",
      summary: "USP general chapter defining chromatographic system suitability requirements.",
    },
  });

  // -------------------------------------------------------------------
  // Equipment (2.4 template fields)
  // -------------------------------------------------------------------
  const spectroscopy = await prisma.category.findUniqueOrThrow({ where: { type_slug: { type: "EQUIPMENT", slug: "spectroscopy" } } });
  const chromatographyEq = await prisma.category.findUniqueOrThrow({ where: { type_slug: { type: "EQUIPMENT", slug: "chromatography" } } });
  const balances = await prisma.category.findUniqueOrThrow({ where: { type_slug: { type: "EQUIPMENT", slug: "balances-weighing" } } });
  const centrifuges = await prisma.category.findUniqueOrThrow({ where: { type_slug: { type: "EQUIPMENT", slug: "centrifuges" } } });
  const autoclaves = await prisma.category.findUniqueOrThrow({ where: { type_slug: { type: "EQUIPMENT", slug: "autoclaves-sterilizers" } } });
  const incubators = await prisma.category.findUniqueOrThrow({ where: { type_slug: { type: "EQUIPMENT", slug: "incubators-ovens" } } });

  await prisma.equipment.upsert({
    where: { slug: "uv-vis-spectrophotometer" },
    update: {},
    create: {
      slug: "uv-vis-spectrophotometer",
      name: "UV-Vis Spectrophotometer",
      summary: "Measures light absorbance across the ultraviolet and visible spectrum to quantify analyte concentration.",
      overview:
        "A UV-Vis spectrophotometer passes light of selected wavelengths through a sample and measures the intensity of light absorbed. Absorbance is proportional to concentration per the Beer-Lambert law, making the instrument a workhorse for quantitative chemical analysis.",
      specifications: {
        "Wavelength range": "190-1100 nm",
        "Bandwidth": "1-5 nm",
        "Photometric range": "0-3 Abs",
        "Light source": "Deuterium and tungsten lamps",
      },
      applications: "Quantitative analysis of solutions, DNA/protein concentration, kinetics studies, water quality testing.",
      manufacturers: [
        { name: "Agilent", models: ["Cary 60", "Cary 3500"] },
        { name: "Thermo Fisher Scientific", models: ["Evolution 220", "GENESYS 150"] },
        { name: "Shimadzu", models: ["UV-1900i"] },
      ],
      maintenanceNotes: "Verify wavelength accuracy and photometric accuracy quarterly using certified reference filters. Replace lamps per manufacturer service life.",
      safetyNotes: "UV lamps emit hazardous UV radiation when the sample compartment is open; never bypass the compartment interlock.",
      buyingGuide: "Prioritize wavelength accuracy and bandwidth for regulated methods; double-beam designs offer better baseline stability than single-beam.",
      categoryId: spectroscopy.id,
      standards: { connect: [{ id: usp621.id }] },
    },
  });

  await prisma.equipment.upsert({
    where: { slug: "hplc-system" },
    update: {},
    create: {
      slug: "hplc-system",
      name: "HPLC System",
      summary: "High-performance liquid chromatography system for separating, identifying, and quantifying compounds in a mixture.",
      overview:
        "HPLC pumps a liquid mobile phase at high pressure through a column packed with stationary phase. Components of the sample separate based on their interaction with the stationary phase and elute at characteristic retention times, detected by UV, fluorescence, or mass spectrometry.",
      specifications: {
        "Max pressure": "up to 15,000 psi (UHPLC)",
        "Flow rate range": "0.001-10 mL/min",
        "Detector options": "UV-Vis, PDA, fluorescence, RI",
      },
      applications: "Pharmaceutical assay and impurity testing, food and beverage analysis, environmental contaminant testing.",
      manufacturers: [
        { name: "Waters", models: ["Alliance iS", "ACQUITY UPLC"] },
        { name: "Agilent", models: ["1260 Infinity II", "1290 Infinity II"] },
      ],
      maintenanceNotes: "Flush the system with appropriate solvents after each use; replace column guard cartridges per manufacturer schedule; check pump seals for leaks.",
      safetyNotes: "Mobile phase solvents are often flammable/toxic — use in a ventilated area and follow SDS handling guidance.",
      buyingGuide: "Match pump pressure rating and detector sensitivity to your method requirements; consider UHPLC for faster runtimes on validated methods.",
      categoryId: chromatographyEq.id,
      standards: { connect: [{ id: usp621.id }] },
    },
  });

  await prisma.equipment.upsert({
    where: { slug: "analytical-balance" },
    update: {},
    create: {
      slug: "analytical-balance",
      name: "Analytical Balance",
      summary: "High-precision balance for weighing small masses to 0.0001 g accuracy.",
      overview:
        "Analytical balances use an electromagnetic force restoration mechanism to measure mass with high precision, typically to four decimal places in grams. An enclosed draft shield minimizes air currents that would otherwise affect the reading.",
      specifications: {
        "Readability": "0.0001 g (0.1 mg)",
        "Capacity": "up to 220 g",
        "Repeatability": "±0.0001 g",
      },
      applications: "Preparing standard solutions, formulation weighing, gravimetric analysis.",
      manufacturers: [
        { name: "Mettler Toledo", models: ["XPR analytical", "ME204"] },
        { name: "Sartorius", models: ["Cubis II"] },
      ],
      maintenanceNotes: "Calibrate with certified weights on a routine schedule; level the balance and let it warm up before use.",
      safetyNotes: "Avoid weighing volatile or corrosive chemicals directly on the pan; use appropriate weighing vessels.",
      buyingGuide: "Choose readability based on your smallest required weighment; internal calibration reduces manual calibration burden.",
      categoryId: balances.id,
      standards: { connect: [{ id: iso17025.id }] },
    },
  });

  await prisma.equipment.upsert({
    where: { slug: "benchtop-centrifuge" },
    update: {},
    create: {
      slug: "benchtop-centrifuge",
      name: "Benchtop Centrifuge",
      summary: "Spins samples at high speed to separate components of different densities.",
      overview:
        "A centrifuge uses centripetal force to accelerate the settling of particles in a suspension, separating components by density. Benchtop models are compact and suited to clinical, molecular biology, and general lab use.",
      specifications: {
        "Max speed": "up to 15,000 rpm",
        "Max RCF": "up to 21,000 x g",
        "Rotor capacity": "6-24 tubes depending on rotor",
      },
      applications: "Cell/pellet separation, plasma separation, DNA/RNA extraction workflows.",
      manufacturers: [
        { name: "Eppendorf", models: ["5425", "5910 R"] },
        { name: "Thermo Fisher Scientific", models: ["Sorvall Legend Micro 21R"] },
      ],
      maintenanceNotes: "Inspect rotors for corrosion/cracks before each use; balance tubes to within manufacturer tolerance.",
      safetyNotes: "Never open the lid while the rotor is spinning; always run with the lid closed and latched.",
      buyingGuide: "Match rotor capacity and RCF range to your workflow; refrigerated models are needed for temperature-sensitive samples.",
      categoryId: centrifuges.id,
      standards: { connect: [{ id: astmE11.id }] },
    },
  });

  await prisma.equipment.upsert({
    where: { slug: "autoclave-sterilizer" },
    update: {},
    create: {
      slug: "autoclave-sterilizer",
      name: "Autoclave Sterilizer",
      summary: "Uses pressurized steam to sterilize equipment, media, and waste.",
      overview:
        "An autoclave exposes items to saturated steam under pressure, typically 121°C at 15 psi for 15-20 minutes, which is sufficient to kill bacteria, viruses, fungi, and spores.",
      specifications: {
        "Chamber volume": "20-100 L (benchtop)",
        "Max temperature": "134°C",
        "Max pressure": "2.1 bar",
      },
      applications: "Sterilizing glassware, media, and biohazardous waste before disposal.",
      manufacturers: [
        { name: "Tuttnauer", models: ["3870EA"] },
        { name: "Getinge", models: ["Steri-Vac"] },
      ],
      maintenanceNotes: "Descale the chamber regularly; test cycle efficacy with biological indicators periodically.",
      safetyNotes: "Allow pressure to fully release before opening; wear heat-resistant gloves when unloading.",
      buyingGuide: "Chamber size should match your batch volume; consider a drying cycle for glassware-heavy workflows.",
      categoryId: autoclaves.id,
    },
  });

  await prisma.equipment.upsert({
    where: { slug: "laboratory-incubator" },
    update: {},
    create: {
      slug: "laboratory-incubator",
      name: "Laboratory Incubator",
      summary: "Maintains controlled temperature (and sometimes CO2/humidity) for culturing cells or microorganisms.",
      overview:
        "Incubators maintain a stable temperature, and in some models CO2 concentration and humidity, to support the growth of cell cultures or microbial cultures under reproducible conditions.",
      specifications: {
        "Temperature range": "ambient +5°C to 70°C",
        "Capacity": "50-750 L",
        "Uniformity": "±0.3°C",
      },
      applications: "Microbial culturing, cell culture incubation, BOD testing.",
      manufacturers: [
        { name: "Thermo Fisher Scientific", models: ["Heratherm"] },
        { name: "Binder", models: ["BD series"] },
      ],
      maintenanceNotes: "Verify temperature uniformity with a calibrated logger periodically; clean interior to prevent contamination.",
      safetyNotes: "Do not store flammable materials inside; follow biosafety protocols for biological samples.",
      buyingGuide: "Consider CO2 control for cell culture work; uniformity matters more than max temperature for most biological applications.",
      categoryId: incubators.id,
    },
  });

  // -------------------------------------------------------------------
  // Methods (3.6 template fields)
  // -------------------------------------------------------------------
  const titrimetric = await prisma.category.findUniqueOrThrow({ where: { type_slug: { type: "METHOD", slug: "titrimetric-methods" } } });
  const spectrophotometricM = await prisma.category.findUniqueOrThrow({ where: { type_slug: { type: "METHOD", slug: "spectrophotometric-methods" } } });
  const chromatographicM = await prisma.category.findUniqueOrThrow({ where: { type_slug: { type: "METHOD", slug: "chromatographic-techniques" } } });
  const culturingStaining = await prisma.category.findUniqueOrThrow({ where: { type_slug: { type: "METHOD", slug: "culturing-staining" } } });

  await prisma.method.upsert({
    where: { slug: "acid-base-titration" },
    update: {},
    create: {
      slug: "acid-base-titration",
      name: "Acid-Base Titration",
      summary: "Determines the concentration of an acid or base by neutralizing it with a titrant of known concentration.",
      principle:
        "A titrant of known concentration is added to an analyte solution until the reaction reaches its equivalence point, typically detected by a color-change indicator or a pH meter.",
      procedure:
        "1. Prepare and standardize the titrant against a primary standard.\n2. Pipette a known volume of analyte into a flask and add indicator.\n3. Titrate slowly while swirling until the endpoint color change persists for 30 seconds.\n4. Record the volume of titrant used and calculate concentration.",
      requiredEquipment: "Burette, pipette, Erlenmeyer flask, analytical balance, pH meter or indicator.",
      applications: "Quality control of acids/bases, food and beverage acidity testing, water hardness determination.",
      troubleshooting: "Overshooting the endpoint is the most common error — titrate dropwise near the expected endpoint. Improperly standardized titrant introduces systematic error.",
      categoryId: titrimetric.id,
    },
  });

  await prisma.method.upsert({
    where: { slug: "uv-vis-spectrophotometry" },
    update: {},
    create: {
      slug: "uv-vis-spectrophotometry",
      name: "UV-Vis Spectrophotometry",
      summary: "Quantifies analyte concentration by measuring light absorbance at a characteristic wavelength.",
      principle:
        "Per the Beer-Lambert law, absorbance is directly proportional to the concentration of an absorbing species and the path length of light through the sample.",
      procedure:
        "1. Zero the instrument with a blank matching the sample matrix.\n2. Prepare a calibration curve using standards of known concentration.\n3. Measure absorbance of the unknown sample at the wavelength of maximum absorbance.\n4. Interpolate concentration from the calibration curve.",
      requiredEquipment: "UV-Vis spectrophotometer, cuvettes, volumetric flasks, calibration standards.",
      applications: "Protein/DNA quantification, water quality testing, pharmaceutical assay.",
      troubleshooting: "Readings above ~1.5 Abs fall outside the linear range — dilute and re-measure. Cuvette scratches or fingerprints introduce scatter error.",
      categoryId: spectrophotometricM.id,
      standards: { connect: [{ id: usp621.id }] },
    },
  });

  await prisma.method.upsert({
    where: { slug: "hplc-analysis" },
    update: {},
    create: {
      slug: "hplc-analysis",
      name: "HPLC Analysis",
      summary: "Separates and quantifies compounds in a mixture using high-performance liquid chromatography.",
      principle:
        "Components partition between a mobile liquid phase and a stationary phase packed in a column, eluting at characteristic retention times based on their chemical properties.",
      procedure:
        "1. Equilibrate the column with mobile phase.\n2. Inject a known volume of sample.\n3. Monitor eluent with a detector (UV, fluorescence, etc.).\n4. Quantify peaks against a calibration curve of reference standards.",
      requiredEquipment: "HPLC system, appropriate column, mobile phase solvents, reference standards, filtered/degassed samples.",
      applications: "Pharmaceutical assay and impurity profiling, food contaminant testing, environmental analysis.",
      troubleshooting: "Peak tailing often indicates column degradation or a poor pH match; baseline drift can indicate air bubbles or an unequilibrated column.",
      categoryId: chromatographicM.id,
      standards: { connect: [{ id: usp621.id }] },
    },
  });

  await prisma.method.upsert({
    where: { slug: "gram-staining" },
    update: {},
    create: {
      slug: "gram-staining",
      name: "Gram Staining",
      summary: "Differentiates bacteria into Gram-positive and Gram-negative groups based on cell wall structure.",
      principle:
        "Gram-positive bacteria retain crystal violet stain due to a thick peptidoglycan layer, while Gram-negative bacteria lose the stain during decolorization and take up the safranin counterstain.",
      procedure:
        "1. Fix a heat-smeared bacterial sample to a slide.\n2. Apply crystal violet for 1 minute, rinse.\n3. Apply iodine (mordant) for 1 minute, rinse.\n4. Decolorize briefly with alcohol/acetone.\n5. Counterstain with safranin for 30-60 seconds, rinse, and examine under a microscope.",
      requiredEquipment: "Microscope slides, Bunsen burner, crystal violet, iodine, decolorizer, safranin, light microscope.",
      applications: "Clinical microbiology identification, environmental microbiology, food safety testing.",
      troubleshooting: "Over-decolorizing causes Gram-positive organisms to appear falsely Gram-negative; using an old (>24h) culture can produce inconsistent results.",
      categoryId: culturingStaining.id,
    },
  });

  // -------------------------------------------------------------------
  // Glossary (7.3)
  // -------------------------------------------------------------------
  const glossaryTerms = [
    { term: "Analyte", slug: "analyte", definition: "The substance whose concentration or presence is being measured in an analysis." },
    { term: "Calibration", slug: "calibration", definition: "The process of configuring an instrument to provide a result within an acceptable range by comparing it to a known standard." },
    { term: "Limit of Detection (LOD)", slug: "limit-of-detection-lod", definition: "The lowest concentration of an analyte that can be reliably distinguished from background noise." },
    { term: "Titrant", slug: "titrant", definition: "A solution of known concentration added during a titration to react with the analyte." },
    { term: "Matrix Effect", slug: "matrix-effect", definition: "The influence of a sample's other components on the accuracy of a measurement of the target analyte." },
  ];
  for (const term of glossaryTerms) {
    await prisma.glossaryTerm.upsert({ where: { slug: term.slug }, update: {}, create: term });
  }

  // -------------------------------------------------------------------
  // Safety guide pages (6.1 General Lab Safety)
  // -------------------------------------------------------------------
  const safetyPages = [
    {
      slug: "ppe-guidelines",
      title: "PPE Guidelines",
      order: 1,
      summary: "Minimum personal protective equipment expectations for general lab work.",
      body: "Lab coats, safety glasses/goggles, and closed-toe shoes are the baseline for any lab area. Gloves should be selected for the specific hazard (chemical-resistant nitrile for solvents, cut-resistant for glassware handling). Respiratory protection is required when working with volatile or particulate hazards outside a fume hood.",
    },
    {
      slug: "chemical-handling-storage",
      title: "Chemical Handling & Storage",
      order: 2,
      summary: "Core principles for safely handling and storing lab chemicals.",
      body: "Store chemicals by compatibility class, not alphabetically — segregate acids from bases, and oxidizers from flammables. Always read the SDS before first use of a new chemical. Use secondary containment for liquids and never return unused chemical to its original container.",
    },
    {
      slug: "emergency-procedures",
      title: "Emergency Procedures",
      order: 3,
      summary: "What to do in the event of a spill, fire, or chemical exposure.",
      body: "Know the location of the nearest eyewash station, safety shower, and fire extinguisher before starting work. For chemical exposure, flush the affected area for at least 15 minutes and seek medical attention. For spills beyond your training to handle, evacuate and notify EHS/the lab safety officer immediately.",
    },
  ];
  for (const page of safetyPages) {
    await prisma.guidePage.upsert({
      where: { section_slug: { section: "SAFETY", slug: page.slug } },
      update: {},
      create: { section: "SAFETY", ...page },
    });
  }

  // -------------------------------------------------------------------
  // Ask Nanduni — knowledge base entries (rule-based Q&A, not an LLM)
  // -------------------------------------------------------------------
  const kbEntries: {
    slug: string;
    category:
      | "EQUIPMENT_TROUBLESHOOTING"
      | "METHOD_TROUBLESHOOTING"
      | "CALIBRATION"
      | "SAMPLE_PREP"
      | "QUALITY_CONTROL"
      | "METHOD_DEVELOPMENT"
      | "GMP_GLP_COMPLIANCE"
      | "SAFETY"
      | "DATA_ANALYSIS"
      | "GENERAL";
    title: string;
    keywords: string;
    cause?: string;
    answer: string;
    source?: string;
  }[] = [
    {
      slug: "hplc-peak-tailing",
      category: "EQUIPMENT_TROUBLESHOOTING",
      title: "HPLC peak is tailing",
      keywords: "hplc, peak, tailing, chromatography, column, retention",
      cause: "Column degradation, a poor pH match between the mobile phase and analyte, or dead volume in the flow path.",
      answer:
        "Peak tailing most often points to a degraded or contaminated column — try flushing with a strong solvent or replacing the guard cartridge first. If tailing persists, check that your mobile phase pH is well away from the analyte's pKa, and inspect fittings for dead volume (loose ferrules, mismatched tubing bore).",
      source: "HPLC Analysis method guide",
    },
    {
      slug: "uv-vis-absorbance-out-of-range",
      category: "METHOD_TROUBLESHOOTING",
      title: "UV-Vis absorbance reading is out of range",
      keywords: "uv-vis, absorbance, out of range, linear range, dilute, beer-lambert",
      cause: "Absorbance above roughly 1.5 Abs falls outside the linear range of the Beer-Lambert law.",
      answer:
        "Dilute the sample and re-measure rather than trusting a high-absorbance reading — accuracy degrades sharply above ~1.5 Abs. Also check the cuvette for scratches or fingerprints, which scatter light and inflate the apparent absorbance.",
      source: "UV-Vis Spectrophotometry method guide",
    },
    {
      slug: "analytical-balance-calibration-frequency",
      category: "CALIBRATION",
      title: "How often should I calibrate the analytical balance?",
      keywords: "balance, calibration, schedule, certified weights, analytical, frequency",
      answer:
        "Do a quick check-weight verification with a certified reference weight at the start of each day of use, and a full calibration (including linearity and repeatability checks) on a routine schedule — quarterly is typical, though a formal ISO/IEC 17025 program will specify the exact interval based on usage and drift history.",
      source: "Analytical Balance equipment guide / ISO/IEC 17025",
    },
    {
      slug: "avoiding-matrix-effects",
      category: "SAMPLE_PREP",
      title: "How do I avoid matrix effects in sample prep?",
      keywords: "matrix effect, sample prep, dilution, extraction, interference",
      answer:
        "Match your calibration standards to the sample matrix wherever possible rather than using pure-solvent standards. Diluting the sample (\"dilute and shoot\") reduces matrix interference at the cost of sensitivity; for matrices you can't dilute away, the standard addition method spikes known amounts of analyte into the actual sample matrix to calibrate against.",
    },
    {
      slug: "lod-vs-loq",
      category: "QUALITY_CONTROL",
      title: "What's the difference between LOD and LOQ?",
      keywords: "lod, loq, limit of detection, limit of quantitation, quality control",
      answer:
        "LOD (Limit of Detection) is the lowest concentration that can be reliably distinguished from background noise — it tells you something is there, not how much. LOQ (Limit of Quantitation) is higher, typically about 3x the LOD, and is the lowest concentration that can be measured with acceptable precision and accuracy for reporting a value.",
      source: "Glossary — Limit of Detection (LOD)",
    },
    {
      slug: "choosing-hplc-column",
      category: "METHOD_DEVELOPMENT",
      title: "How do I choose an HPLC column for a new method?",
      keywords: "hplc, column selection, method development, stationary phase, c18",
      answer:
        "Start from the analyte's polarity and pKa: a C18 reversed-phase column covers most small-molecule work, while more polar analytes may need HILIC. Smaller particle sizes improve resolution and speed but increase backpressure, so match particle size to what your pump can handle. Once selected, verify system suitability against USP <621> before validating the method.",
      source: "USP <621> Chromatography",
    },
    {
      slug: "gmp-documentation-basics",
      category: "GMP_GLP_COMPLIANCE",
      title: "What documentation do I need for GMP compliance?",
      keywords: "gmp, glp, documentation, compliance, audit trail, alcoa",
      answer:
        "At minimum: signed and dated SOPs for every procedure, equipment calibration/maintenance logs, raw data retained with a full audit trail (who, what, when, why for any change), and deviation/CAPA records for anything that didn't go to plan. Follow ALCOA+ principles (Attributable, Legible, Contemporaneous, Original, Accurate, plus Complete/Consistent/Enduring/Available) for every record.",
    },
    {
      slug: "ppe-before-handling-solvents",
      category: "SAFETY",
      title: "What PPE do I need before handling solvents?",
      keywords: "ppe, solvents, safety, gloves, fume hood, chemical handling",
      answer:
        "Chemical-resistant nitrile gloves, safety glasses or goggles, and a lab coat are the baseline. Work inside a fume hood for anything volatile, and always check the SDS for the specific solvent — some (e.g. certain chlorinated solvents) need a different glove material than standard nitrile.",
      source: "PPE Guidelines / Chemical Handling & Storage",
    },
    {
      slug: "calculating-percent-rsd",
      category: "DATA_ANALYSIS",
      title: "How do I calculate %RSD for replicate measurements?",
      keywords: "rsd, relative standard deviation, statistics, replicates, precision",
      answer:
        "%RSD = (standard deviation ÷ mean) × 100, calculated across your replicate measurements. It's a quick way to express precision independent of the measurement's absolute scale. The Statistics & Uncertainty calculator on the Resources > Calculators page computes this automatically from a pasted list of values.",
      source: "Resources — Statistics & Uncertainty calculator",
    },
    {
      slug: "what-does-dkns-labs-cover",
      category: "GENERAL",
      title: "What does DKNS Labs cover?",
      keywords: "about, dkns labs, overview, general, what is this",
      answer:
        "DKNS Labs is a reference hub for lab equipment, methods, SOPs, and lab management guidance — Equipment & Instruments, Methods & Techniques, Safety & Compliance, and a Resources section with calculators, converters, a glossary, and the standards library, with SOPs and Lab Management depth arriving in later phases.",
      source: "About DKNS Labs",
    },
  ];

  for (const entry of kbEntries) {
    await prisma.knowledgeEntry.upsert({
      where: { slug: entry.slug },
      update: {},
      create: entry,
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
