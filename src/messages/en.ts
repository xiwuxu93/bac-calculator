const en = {
  metadata: {
    title: "BAC Calculator – Free Blood Alcohol Content Estimator",
    description:
      "Free online BAC calculator to estimate your blood alcohol concentration based on drinks, body weight, and time. For education only – never use any BAC calculator to decide whether you can drive.",
    keywords:
      "bac calculator,blood alcohol calculator,blood alcohol content calculator,alcohol level calculator,drink driving,dui,dwi,time to sober calculator,online bac calculator",
    siteName: "SafeBAC Calculator",
  },
  locales: {
    en: {
      name: "English",
      short: "EN",
    },
    zh: {
      name: "Chinese",
      short: "中文",
    },
    es: {
      name: "Español",
      short: "ES",
    },
  },
  common: {
    siteName: "SafeBAC Calculator",
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    disclaimer: "Disclaimer",
    backToHome: "Back to Home",
    professionalUseOnly: "Informational BAC Tool",
    viewFullDisclaimer: "View full disclaimer",
    navHome: "BAC Calculator",
    navTimeToZero: "Time to Zero",
    navHowTo: "How It Works",
    navAccuracy: "Accuracy",
  },
  header: {
    siteName: "SafeBAC Calculator",
    subtitle: "Estimate your blood alcohol level safely",
  },
  footer: {
    brandDescription:
      "A safety-focused BAC calculator that helps you understand your estimated blood alcohol concentration before you decide what to do next.",
    legalSection: "Legal",
    resourcesSection: "Resources",
    home: "Home",
    about: "About & methodology",
    getStarted: "Get Started",
  },
  timeToZero: {
    title: "BAC Time to Zero Calculator",
    description:
      "Estimate how long it may take for your blood alcohol concentration (BAC) to move back toward zero based on an approximate current BAC and typical elimination rates.",
    heroSubtitle:
      "Use this tool to better understand why sleeping, coffee, or a short break cannot instantly make you sober enough to drive.",
    form: {
      title: "Estimate time for your BAC to fall",
      subtitle:
        "Enter an estimated current BAC value to see a rough time range for your BAC to fall toward zero and below a commonly cited legal limit in your region.",
      bacLabel: "Estimated current BAC",
      bacUnitPercent: "% BAC",
      bacUnitPermille: "‰",
      bacUnitMgPerDl: "mg/dL",
      bacHelp:
        "You can enter a value from this or another BAC calculator, or from a device reading, if available. All values are treated as approximate.",
      countryLabel: "Country or region (for legal limit reference)",
      countryHelp:
        "Used only to compare your estimated BAC with commonly cited drink-driving limits. Always check current official laws in your area.",
    },
    countries: {
      US: "United States",
      UK: "United Kingdom",
      AU: "Australia",
      CA: "Canada",
      NZ: "New Zealand",
      MA: "Morocco",
      DZ: "Algeria",
    },
    actions: {
      estimate: "Estimate time",
    },
    errors: {
      valueInvalid: "Please enter a valid non‑negative BAC value.",
    },
    results: {
      placeholder:
        "Enter an approximate BAC value and choose your region to see a rough time range. Everyone processes alcohol differently, so treat the results as educational only.",
      summary: "Using an estimated BAC of {bac}%, the ranges below show how long it may take for your BAC to fall.",
      summaryZero: "If your estimated BAC is 0.00%, there is no remaining alcohol for this tool to estimate.",
      toZero: "It may take roughly {from}–{to} hours for your BAC to trend back toward 0.00%.",
      toLegalLimit:
        "If your current BAC is above a commonly cited legal limit, it may take roughly {from}–{to} hours to fall below that limit.",
      disclaimer:
        "These times are only rough estimates based on generalized elimination rates. Your actual BAC can rise or fall differently. Never rely on this tool to decide when it is safe or legal to drive.",
    },
    docs: {
      aboutTitle: "What does BAC time to zero mean?",
      aboutContent:
        "BAC time to zero is an estimate of how long it might take for your body to metabolize alcohol so that your measured blood alcohol concentration returns toward 0.00%. It is always an approximation because metabolism varies widely between people and even for the same person on different days.",
      factorsTitle: "What affects how fast BAC falls?",
      factorsContent:
        "Typical BAC elimination rates are often described as roughly 0.010–0.020% BAC per hour, but your actual rate can be slower or faster. Genetics, liver health, medications, food, body composition, drinking pattern, and many other factors all influence how quickly your BAC changes.",
      mythsTitle: "Why quick‑fix sobriety myths are dangerous",
      mythsContent:
        "Coffee, cold showers, fresh air, and similar tricks may make you feel more awake, but they do not significantly speed up the elimination of alcohol from your body. Only time allows your BAC to fall. You can still be impaired or over the legal limit even if you feel more alert.",
      safetyTitle: "Why you should not drive while waiting",
      safetyContent:
        "Even if an estimate suggests that your BAC might drop below a legal limit at a certain time, there is no guarantee that you will no longer be impaired. The safest option after drinking is always to arrange another way home instead of driving yourself.",
    },
    faqTitle: "BAC time to zero FAQ",
    faq: {
      q1: "Can this calculator tell me exactly when I will be sober?",
      a1: "No. The tool can only give a very rough estimate based on typical elimination rates. Your actual BAC may still be higher or lower than the estimate at any moment. Only professional testing can measure your real BAC.",
      q2: "Can I speed up how fast my BAC goes down?",
      a2: "Not in any meaningful or safe way. Time is the key factor. Coffee, cold showers, or exercise may make you feel different, but they do not reliably speed up the elimination of alcohol from your body.",
      q3: "If the tool says my BAC might be low enough, can I drive?",
      a3: "No. You must never use this or any BAC calculator to decide whether it is safe or legal to drive. If you have been drinking, the safest choice is always not to drive.",
    },
  },
  howToBac: {
    title: "How to Calculate Blood Alcohol Concentration (BAC)",
    description:
      "Learn how BAC is estimated using standard formulas, step-by-step examples, and key assumptions used by online BAC calculators.",
    heroSubtitle:
      "This guide explains the math behind BAC estimates so you can better understand what online calculators can and cannot tell you.",
    docs: {
      introTitle: "What does BAC measure?",
      introContent:
        "Blood alcohol concentration (BAC) is usually expressed as a percentage that represents grams of alcohol per 100 mL of blood. For example, a BAC of 0.08% means 0.08 grams of alcohol per 100 mL of blood.",
      formulaTitle: "The basic BAC estimation formula",
      formulaContent:
        "Many online calculators use a Widmark-style formula. It estimates BAC by dividing the amount of pure alcohol consumed by an estimate of the water in your body, then subtracting an hourly elimination rate for the time since your first drink.",
      stepsTitle: "Step-by-step example",
      stepsContent:
        "A simple example might assume a certain number of drinks, each with a defined volume and ABV, convert that into grams of pure alcohol, divide by an estimated distribution factor based on body weight and sex, and then subtract a fixed amount per hour since drinking began.",
      limitationsTitle: "Why these calculations are only estimates",
      limitationsContent:
        "Real human bodies do not follow a single formula. Metabolism varies with genetics, liver health, food, medications, hormones, stress, and more. Even with perfect inputs, Widmark-style formulas can only produce an approximate BAC.",
    },
    faqTitle: "Questions about BAC formulas",
    faq: {
      q1: "Why do different BAC calculators give different numbers?",
      a1: "Different calculators may use slightly different assumptions about body water, elimination rate, or standard drink sizes. Even with the same formula, rounding differences and input options can produce different results.",
      q2: "Are police or medical BAC tests based on the same formula?",
      a2: "No. Law enforcement and medical settings typically use calibrated breathalyzers or blood tests that directly measure alcohol, not formulas based on self-reported drinking.",
      q3: "If I know the formula, can I safely manage my drinking?",
      a3: "No. Knowing the math does not remove the uncertainty in your real BAC or the risk of impairment. The safest approach is still to avoid driving after drinking.",
    },
  },
  accuracyBac: {
    title: "How Accurate Are BAC Calculators?",
    description:
      "Understand what BAC calculators can estimate, where they can be wrong, and how to use them in the safest way possible.",
    heroSubtitle:
      "There is no such thing as a perfectly accurate online BAC calculator. This page explains why—and how to interpret results safely.",
    docs: {
      overviewTitle: "What does “accurate” really mean for BAC?",
      overviewContent:
        "For BAC, accuracy could mean how close an estimate is to a real blood or breath test at a given moment. Because online tools rely on self-reported drinks and generalized formulas, even a well-designed calculator can only approximate reality.",
      assumptionsTitle: "Key assumptions behind BAC estimates",
      assumptionsContent:
        "Most calculators assume a fixed distribution ratio based on sex, a standard elimination rate per hour, and typical drink sizes and ABV. In practice, each of these can vary substantially from person to person and drink to drink.",
      differencesTitle: "Why calculators disagree with each other",
      differencesContent:
        "Some tools ask for more detail about your drinks, while others use a rough drink count. Formulas, rounding, and reference values also differ. Two tools can both be reasonable yet produce slightly different numbers from the same inputs.",
      safetyTitle: "Using estimates safely",
      safetyContent:
        "The safest way to use any BAC calculator is as a rough educational guide only. Treat higher estimates as warnings and never treat lower estimates as guarantees that you are safe or legal to drive.",
    },
    faqTitle: "Accuracy FAQ",
    faq: {
      q1: "Is this BAC calculator the most accurate?",
      a1: "No online BAC calculator can guarantee accuracy. Our goal is to be transparent about assumptions and biased toward safety, not to claim perfect precision.",
      q2: "Why is my device or wearable giving a different BAC?",
      a2: "Consumer devices can use different sensors, algorithms, and calibration standards. Some may estimate impairment rather than actual BAC. Always treat such readings as rough and never as a license to drive.",
      q3: "How close are online estimates to breathalyzer results?",
      a3: "Sometimes they can be in the same range, but differences of several hundredths of a percent or more are possible. Only properly used, calibrated professional equipment can measure BAC reliably.",
    },
  },
  calculator: {
    form: {
      title: "Estimate your BAC",
      subtitle: "Enter your details and drinks to see an approximate blood alcohol concentration. Results are only estimates and must not be used to decide if you can drive.",
      sexLabel: "Sex",
      sexMale: "Male",
      sexFemale: "Female",
      weightLabel: "Body weight",
      weightUnitKg: "kg",
      weightUnitLb: "lb",
      weightHelp: "Use an approximate value if you are not sure. The estimate is sensitive to body weight.",
      countryLabel: "Country or region",
      countryHelp: "This helps us compare your estimated BAC with commonly cited legal limits in your selected region.",
      timeSinceFirstDrinkLabel: "Time since your first drink",
      timeHours: "hours",
      timeMinutes: "minutes",
      timeHelp: "Count from the first sip of your first drink. The longer you have been drinking, the lower your BAC may be from metabolism.",
      clearSavedDefaults: "Clear saved defaults",
    },
    countries: {
      US: "United States",
      UK: "United Kingdom",
      AU: "Australia",
      CA: "Canada",
      NZ: "New Zealand",
      MA: "Morocco",
      DZ: "Algeria",
    },
    drinks: {
      sectionTitle: "Drinks you have consumed",
      add: "Add drink",
      remove: "Remove",
      rowLabel: "Drink {index}",
      type: "Type",
      typeBeer: "Beer",
      typeWine: "Wine",
      typeSpirits: "Spirits",
      typeOther: "Other / mixed drink",
      count: "Number of servings",
      volumeMl: "Serving size (mL)",
      abv: "ABV (%)",
    },
    actions: {
      estimate: "Estimate BAC",
      reset: "Reset form",
      disclaimerShort: "Never use BAC estimates to decide whether you can drive.",
    },
    errors: {
      weightRequired: "Please enter a valid body weight.",
      timeInvalid: "Time since your first drink cannot be negative.",
      timeRequired: "Please enter how long it has been since your first drink.",
      drinksRequired: "Add at least one drink with a positive amount, volume, and ABV.",
    },
    risk: {
      label: {
        low: "Estimated impairment",
        medium: "High impairment",
        high: "Severe impairment",
      },
      low: "At an estimated BAC of {bac}%, many people appear close to normal but subtle impairments can already affect judgment and reaction time.",
      medium: "At an estimated BAC of {bac}%, your judgment, coordination, and reaction time are likely significantly impaired. Driving is unsafe and often illegal at this level.",
      high: "At an estimated BAC of {bac}%, you are likely severely impaired. Driving or operating machinery is extremely dangerous and likely illegal in many regions.",
    },
    results: {
      title: "Estimated BAC and safety overview",
      subtitle: "These numbers are only rough estimates. Everyone processes alcohol differently.",
      placeholder: "Fill in your details and drinks, then select “Estimate BAC” to see estimated values and safety guidance.",
      bacLabel: "Estimated blood alcohol concentration",
      unitPercent: "% BAC",
      unitPermille: "‰",
      unitMgPerDl: "mg/dL",
      percentSuffix: "Approximate percentage of alcohol in your blood.",
      permilleSuffix: "Promille (parts per thousand) equivalent of your BAC.",
      mgPerDlSuffix: "Approximate mg of alcohol per deciliter of blood.",
      estimateNote: "All values are approximate and based on generalized formulas, not actual measurements.",
      legalLimitKnown: "For many drivers in your selected region, a commonly cited legal limit is around {limit}% BAC or lower. Some drivers, such as new or professional drivers, may be subject to stricter limits.",
      legalLimitUnknown: "Legal limits for your selected region are not fully represented in this tool. Always check official local laws for up-to-date limits.",
      overLegalLimit: "Your estimated BAC may be at or above limits that many jurisdictions consider illegal for driving.",
      underLegalLimit: "Even if this estimate appears below a commonly cited legal limit, your driving can still be impaired. The safest choice is not to drive.",
      legalDisclaimer: "Legal limits vary by jurisdiction and change over time. This tool may not reflect current law and cannot be used as legal advice.",
      timeToZero: "Based on typical elimination rates, it may take roughly {from}–{to} hours for your BAC to return toward 0.00%.",
      timeToLegalLimit: "It may take roughly {from}–{to} hours for your estimated BAC to fall below a commonly cited legal limit.",
      timeDisclaimer: "Your body may eliminate alcohol more slowly or more quickly than these estimates. Only professional testing can determine your actual BAC.",
      safetyTitle: "Safety first",
      safetyContent: "If you have been drinking, arrange a safe way home instead of driving yourself. Use a taxi, rideshare, public transport, or a sober driver.",
    },
  },
  home: {
    title: "Blood Alcohol Concentration (BAC) Calculator",
    description:
      "Estimate your blood alcohol concentration (BAC) based on what you drank, your body weight, and time. See clear safety warnings and why you should never drive after drinking.",
    aboutTitle: "What Is Blood Alcohol Concentration (BAC)?",
    aboutContent:
      "Blood alcohol concentration (BAC) is the amount of alcohol in your bloodstream, usually expressed as a percentage. Even small increases in BAC can slow reaction time, reduce judgment, and make driving dangerous.",
    howToUseTitle: "How to Use This BAC Calculator",
    howToUseStep1:
      "Select your sex, enter your body weight, and choose your country or region.",
    howToUseStep2:
      "Add the drinks you have consumed and when you started drinking.",
    howToUseStep3:
      'Click the "Estimate BAC" button to see your approximate level, legal risk, and an estimate of how long it may take to reach zero.',
    whyUseTitle: "Why Use This BAC Calculator?",
    whyUseFree: "Free",
    whyUseFreeDesc: "Completely free to use with no registration required.",
    whyUsePrivate: "Private",
    whyUsePrivateDesc: "All calculations happen in your browser. We do not store what you enter.",
    whyUseFast: "Fast",
    whyUseFastDesc: "Instant results based on widely used BAC formulas.",
    whyUseSimple: "Simple",
    whyUseSimpleDesc: "Clear inputs and results designed for quick decisions.",
    whyUseMobile: "Mobile-Friendly",
    whyUseMobileDesc: "Optimized for phones so you can check BAC before you leave.",
    technicalTitle: "How This BAC Calculator Works",
    technicalContent:
      "This calculator uses standard BAC estimation formulas that consider your sex, body weight, amount of alcohol consumed, and time since your first drink. The result is only an estimate because alcohol affects everyone differently.",
    limitationsTitle: "Limitations and Accuracy",
    limitationsContent:
      "No online calculator can know your exact BAC. Metabolism, health conditions, food, medications, and many other factors can make your real BAC higher or lower than the estimate shown here.",
    legalLimitsTitle: "Legal Limits Around the World",
    legalLimitsContent:
      "Different countries and regions set different legal BAC limits for drivers. Many places also have stricter limits for new or professional drivers. Always check the rules where you live.",
    effectsTitle: "Effects at Different BAC Levels",
    effectsContent:
      "As BAC rises, judgment, coordination, and reaction time decline. Even before you reach the legal limit you may be too impaired to drive safely.",
    safetyTitle: "Safety First",
    safetyContent:
      "If you have been drinking, the safest choice is always not to drive. Choose a taxi, rideshare, public transport, or a sober driver instead of risking your life and others.",
    relatedToolsTitle: "Explore related BAC tools",
    relatedTimeToZero: "Estimate time for your BAC to fall to zero",
    relatedHowTo: "Learn how BAC is calculated",
    relatedAccuracy: "Understand how accurate BAC calculators are",
    faqTitle: "BAC Calculator FAQ",
    faqQ1: "How accurate is this BAC calculator?",
    faqA1:
      "All online BAC calculators provide estimates only. This tool uses commonly accepted formulas and reasonable assumptions, but your actual BAC can be higher or lower based on metabolism, health, medications, and many other factors.",
    faqQ2: "Can I use this to decide if I can drive?",
    faqA2:
      "No. You should never use any BAC calculator to decide whether it is safe or legal to drive. If you have been drinking, the safest choice is always not to drive.",
    faqQ3: "What information do I need to enter?",
    faqA3:
      "You will enter your sex, body weight, when you started drinking, and what types and amounts of alcoholic drinks you had. The calculator uses this to estimate how much alcohol is in your bloodstream over time.",
    faqQ4: "Does this calculator store my data?",
    faqA4:
      "No. All calculations run in your browser, and we do not store or send your drink details to our servers. You can clear or change your entries at any time.",
    faqQ5: "Why do women often reach higher BAC than men?",
    faqA5:
      "Because of differences in body composition and how alcohol is distributed in the body, women typically reach a higher BAC than men after drinking the same amount of alcohol, even at the same body weight.",
    faqQ6: "What is BAC time to zero?",
    faqA6:
      "BAC time to zero is an estimate of how long it may take for your body to process alcohol and for your BAC to return to zero. Even when an estimate suggests you might be back at 0.00%, you can still feel the effects of alcohol.",
    ctaTitle: "Check Your Estimated BAC Before You Drive",
    ctaDescription:
      "Estimate your BAC, understand your legal risk, and choose a safer way home instead of driving after drinking.",
    ctaButton: "Estimate My BAC",
    placeholderTitle: "BAC Calculator Coming Soon",
    placeholderDescription:
      "We are building a safety-focused BAC calculator. For now, learn how BAC works and why you should never drink and drive.",
  },
  privacy: {
    title: "Privacy Policy",
    description: "Learn how we handle and protect information you enter into the BAC calculator.",
    intro: "We designed this BAC calculator so that calculations happen in your browser and you retain full control of what you enter.",
    dataCollectionTitle: "Data Collection",
    dataCollectionContent: "We do not collect, store, or transmit the values you enter into the BAC calculator, such as drinks, body weight, or timing. All calculations run locally on your device and are never shared with our servers.",
    analyticsTitle: "Analytics",
    analyticsContent: "We may use privacy-friendly analytics to observe aggregate usage patterns, such as page views and device types. These analytics never contain the specific BAC values or drink information you enter.",
    cookiesTitle: "Cookies",
    cookiesContent: "The site does not set tracking cookies. Your browser may cache assets to improve performance, which you can clear at any time.",
    thirdPartiesTitle: "Third-Party Services",
    thirdPartiesContent: "If we embed third-party resources (for example fonts or analytics), they are selected for their privacy posture. Because BAC information can be sensitive, we avoid sending your calculator inputs to third parties.",
    changesTitle: "Policy Updates",
    changesContent: "We may update this policy to reflect product changes or legal requirements. Significant updates will be clearly communicated on this page.",
    contactTitle: "Contact",
    contactContent: "Reach out for questions about privacy.",
  },
  terms: {
    title: "Terms of Service",
    description: "Review the terms governing your use of this BAC calculator.",
    intro: "By accessing this tool you agree to the terms described below. Please read them carefully.",
    acceptableUseTitle: "Acceptable Use",
    acceptableUseContent: "Use the BAC calculator for informational and educational purposes only. Do not rely on the estimates to make safety-critical decisions such as whether to drive, operate machinery, or perform high-risk activities. Do not attempt to reverse engineer, disrupt, or overload the service.",
    medicalDisclaimerTitle: "No Medical or Legal Advice",
    medicalDisclaimerContent: "This BAC calculator does not provide medical, legal, or safety advice. Alcohol laws and health risks vary widely. Always consult qualified professionals and local authorities before making important decisions. You remain fully responsible for how you use any estimates shown.",
    limitationsTitle: "Service Limitations",
    limitationsContent: 'The BAC calculator is provided "as is" without warranties of accuracy, completeness, or availability. We may modify or discontinue the service without notice.',
    liabilityTitle: "Limitation of Liability",
    liabilityContent: "We are not liable for any damages, including legal, financial, health, or safety consequences, arising from the use or inability to use this BAC calculator. Use is entirely at your own risk.",
    changesTitle: "Changes to Terms",
    changesContent: "We may update these terms periodically. Continued use after changes take effect constitutes acceptance of the new terms.",
    contactTitle: "Contact",
    contactContent: "Have questions about these terms? Contact us.",
  },
  disclaimer: {
    title: "Disclaimer",
    description: "Understand how to interpret and safely apply BAC calculator outputs.",
    intro: "This BAC calculator is an informational reference only. Using this site should never delay or replace professional consultation from a doctor, addiction specialist, or legal professional.",
    lastUpdatedLabel: "Last updated:",
    lastUpdatedValue: "2025-11-07",
    educationHeading: "Informational Use Only",
    educationContent: "The BAC estimates and accompanying explanations are intended solely for general information and education. They should not be used as the sole basis for decisions about driving, working, or any other safety-sensitive activity.",
    noAdviceHeading: "Not Professional or Legal Advice",
    noAdviceContent: "Nothing on this site constitutes medical, legal, or safety advice. Always seek the guidance of qualified professionals and follow local laws before taking action on any calculated BAC value.",
    emergencyHeading: "Emergency Situations",
    emergencyContent: "If you believe you or someone else is experiencing alcohol poisoning, suicidal thoughts, or another emergency, call your local emergency number or seek immediate professional help.",
    audienceHeading: "Intended Users",
    audienceList1: "General public seeking informational tools",
    audienceList2: "Students and educators for learning purposes",
    audienceList3: "Professionals using as a quick reference",
    audienceExclusionHeading: "Not Intended For",
    audienceExclusionList1: "Critical decisions about driving, operating machinery, or performing safety-sensitive tasks without professional verification",
    audienceExclusionList2: "Use as a substitute for medical, legal, or addiction treatment evaluation",
    audienceExclusionList3: "Decisions made without consulting appropriate professionals or local authorities",
    clinicalJudgmentHeading: "Professional Judgment Takes Priority",
    clinicalJudgmentContent: "BAC calculator outputs may support—but never replace—professional judgment. If results conflict with expert advice, official test results, or your personal situation, always defer to professional guidance and the law.",
    accuracyHeading: "Accuracy and Completeness",
    accuracyContent: "While we strive for accuracy, all BAC values shown are estimates based on generalized formulas and may be significantly different from your actual blood alcohol concentration. Laws and scientific guidance can change, so verify calculations and recommendations against current standards and references.",
    liabilityHeading: "Limitation of Liability",
    liabilityContent: "To the fullest extent permitted by law, the site owners and contributors disclaim liability for any losses, injuries, legal actions, or other consequences arising from the use or misuse of this site and its BAC estimates.",
    noRelationshipHeading: "No Professional Relationship",
    noRelationshipContent: "Using this tool does not establish a professional relationship with the site owners or contributors.",
    thirdPartyHeading: "Third-Party References",
    thirdPartyContent: "Links to external resources are provided for convenience. We do not endorse or control third-party content and are not responsible for its accuracy.",
    complianceHeading: "User Responsibility",
    complianceContent: "Users are responsible for ensuring their use of this BAC calculator complies with all applicable laws and regulations in their jurisdiction, including drink-driving and alcohol consumption laws.",
    updatesHeading: "Policy Updates",
    updatesContent: "We may update this disclaimer as standards or site features evolve. Continued use signifies acceptance of the latest version.",
    contactHeading: "Contact",
    contactContent: "For questions about this disclaimer, contact us.",
  },
  unitConversion: {
    shared: {
      formTitle: "Convert between BAC units",
      formSubtitle:
        "Enter a value in one unit to see approximate equivalents in other common BAC units. All conversions are approximate.",
      inputLabel: "Value to convert",
      unitLabel: "Input unit",
      unitPercent: "% BAC",
      unitPermille: "‰ (promille)",
      unitMgPerDl: "mg/dL",
      resultTitle: "Converted values",
      approxNote: "All conversions are approximate and rounded for readability.",
      disclaimer:
        "Units and relationships shown here are simplified and intended for education, not for forensic or legal calculations.",
    },
    promillePage: {
      title: "Promille to BAC Converter – ‰ to % and mg/dL",
      description:
        "Convert blood alcohol from promille (‰) to percent BAC and mg/dL, and learn how these units relate to each other.",
      heroSubtitle:
        "Promille (‰) is commonly used in many countries to express BAC. This page helps you translate between units.",
      docsTitle: "Understanding promille and BAC",
      docsContent:
        "Promille (‰) literally means “per thousand.” A BAC of 0.5‰ is equivalent to 0.05% BAC. Some countries express legal driving limits in promille, while others use percent or mg/dL. The underlying concept is the same: an approximate measure of alcohol per volume of blood.",
    },
    mgdlPage: {
      title: "mg/dL to BAC Converter – mg/dL to % and ‰",
      description:
        "Convert blood alcohol values from mg/dL into percent BAC and promille, as often needed when reading lab results.",
      heroSubtitle:
        "Laboratories sometimes report blood alcohol in milligrams per deciliter (mg/dL). This page helps map those numbers to everyday BAC units.",
      docsTitle: "Understanding mg/dL for BAC",
      docsContent:
        "A deciliter is one-tenth of a liter. When a lab reports blood alcohol in mg/dL, it is describing how many milligrams of alcohol are present in each deciliter of blood. For everyday understanding and legal contexts, these values are often converted into % BAC or promille.",
    },
    conversionPage: {
      title: "BAC Unit Conversion Calculator",
      description:
        "Convert between percent BAC, promille (‰), and mg/dL using a single simple calculator.",
      heroSubtitle:
        "Different countries, devices, and reports use different BAC units. This calculator helps you move between them.",
      docsTitle: "Why BAC units vary",
      docsContent:
        "Historically, different regions and disciplines adopted different ways to express concentration: percentages, parts per thousand, and mass per volume. While the units vary, they all aim to describe the same physical idea: how much alcohol is in a given amount of blood.",
    },
  },
  countryBac: {
    shared: {
      faqTitle: "Drink-driving questions for {countryName}",
      faqQ1: "What is the drink-driving limit in {countryName}?",
      faqQ2: "Are there stricter limits for some drivers?",
      faqQ3: "What is the safest choice after drinking in {countryName}?",
      faqA1:
        "Drink-driving limits and enforcement policies in {countryName} can change. This page gives a rough overview based on commonly cited values, but you must always consult official government sources for current limits.",
      faqA2:
        "Many regions apply lower or even zero limits to novice, young, or professional drivers. If you fall into any special category, check the exact rules that apply to you in {countryName}.",
      faqA3:
        "Regardless of the legal limit in {countryName}, the safest option after drinking is always to avoid driving yourself. Arrange a taxi, rideshare, public transport, or a sober driver.",
      legalSectionTitle: "Legal limits overview",
      safetySectionTitle: "Safety first in {countryName}",
      safetySectionBody:
        "Legal limits are not safety guarantees. You can be too impaired to drive safely even below a legal threshold. Treat this calculator as an educational tool only and choose the safest option available.",
      names: {
        uk: "the United Kingdom",
        au: "Australia",
        nz: "New Zealand",
        ma: "Morocco",
        dz: "Algeria",
      },
      switchTitle: "Switch country",
      switchIntro: "View BAC estimates and drink-driving information for other regions:",
    },
    uk: {
      title: "BAC Calculator UK – Blood Alcohol Limit and Drink-Driving Risks",
      description:
        "Estimate your BAC with a UK-focused calculator and see how it compares to commonly cited drink-driving limits in the United Kingdom.",
      heroSubtitle:
        "Understand your estimated BAC and how it relates to drink-driving limits in the UK—but never use any calculator to decide if you can drive.",
    },
    au: {
      title: "BAC Calculator Australia – Blood Alcohol Limit and Driving Risks",
      description:
        "Estimate your BAC with an Australia-focused calculator and see how it compares to commonly cited drink-driving limits across Australian states and territories.",
      heroSubtitle:
        "Australian states typically apply strict BAC limits, especially for learners and professional drivers. Use estimates to stay informed—not to justify driving.",
    },
    nz: {
      title: "BAC Calculator New Zealand – Blood Alcohol Limit and Driving Risks",
      description:
        "Estimate your BAC with a New Zealand-focused calculator and see how it compares to commonly cited drink-driving limits.",
      heroSubtitle:
        "New Zealand uses lower limits for younger drivers and strong penalties for drink-driving. Estimates are for education only.",
    },
    ma: {
      title: "BAC Calculator Morocco – Blood Alcohol Limits and Road Safety",
      description:
        "Estimate your BAC with a Morocco-focused calculator and learn why many sources describe very low or near-zero drink-driving limits.",
      heroSubtitle:
        "Where limits are very low or close to zero, the safest option is simply not to drive after drinking at all.",
    },
    dz: {
      title: "BAC Calculator Algeria – Blood Alcohol Limits and Road Safety",
      description:
        "Estimate your BAC with an Algeria-focused calculator and understand why many sources treat driving after drinking as effectively zero-tolerance.",
      heroSubtitle:
        "In regions with zero-tolerance policies, any amount of drinking combined with driving may be unacceptable or illegal.",
    },
  },
  about: {
    title: "About SafeBAC Calculator",
    description:
      "Learn why this BAC calculator was created, how it estimates blood alcohol concentration, and how you should use it safely.",
    heroSubtitle:
      "Our goal is to make it easier to understand the risks of drinking and driving, not to provide permission to drive after drinking.",
    sections: {
      missionTitle: "Our mission",
      missionBody:
        "SafeBAC Calculator exists to help people better understand how alcohol can affect their ability to drive safely and make decisions. Online information about BAC is often scattered, overly technical, or presented without clear safety context. We aim to offer a simple, honest tool that always points users toward safer choices.",
      methodologyTitle: "How this calculator works",
      methodologyBody:
        "The BAC estimates are based on widely used Widmark-style formulas. These formulas combine information about your sex, body weight, the volume and strength of drinks consumed, and the time since your first drink. They estimate how much alcohol might be in the water in your body and subtract a typical elimination rate per hour.",
      limitationsTitle: "Important limitations",
      limitationsBody:
        "Even with detailed inputs, formulas cannot know your exact blood alcohol concentration. Metabolism can vary with genetics, liver health, medications, food, hormones, sleep, and many other factors. Two people who drink the same amount may have very different BAC levels. For this reason, all values shown on this site must be treated as rough estimates only.",
      safetyTitle: "How you should use this site",
      safetyBody:
        "Use SafeBAC Calculator as an educational tool to understand risk, not as a decision engine. Higher estimates should be viewed as warnings. Lower estimates should never be treated as proof that you are safe or legal to drive. If you have been drinking, the safest choice is always to avoid driving yourself and find another way home.",
      reviewTitle: "Medical and legal review",
      reviewBody:
        "We plan to collaborate with medical and legal professionals to review the formulas, explanations, and safety messaging on this site. When formal reviewers are added, their credentials and the dates of review will be listed here so that you can see who has helped check the information.",
      updatesTitle: "Content updates",
      updatesBody:
        "Alcohol research and traffic laws change over time. We periodically review the content and references on this site and update them as needed. If you believe something is outdated or inaccurate, please use the contact details in the disclaimer and privacy policy to let us know.",
      referencesTitle: "Key reference sources",
      referencesIntro:
        "SafeBAC Calculator is informed by public health resources and educational materials from trusted organizations, including:",
      referencesList1: "National and regional health agencies that publish guidance on alcohol and driving.",
      referencesList2: "Government traffic safety and licensing authorities that describe drink-driving limits.",
      referencesList3: "Educational and clinical summaries that explain Widmark-style BAC formulas and their limitations.",
    },
  },
  accuracyShort: {
    title: "Are BAC calculators accurate?",
    description:
      "A short explanation of how accurate BAC calculators can be, what they cannot do, and how to interpret their results safely.",
    heroSubtitle:
      "BAC calculators can be useful educational tools, but they cannot measure your real BAC or guarantee that you are safe to drive.",
    introTitle: "Short answer",
    introBody:
      "Online BAC calculators are only rough estimators. They may land in the right range for some people and situations, but they can also be significantly off. Many factors that strongly affect your real BAC—such as liver health, medications, food, and genetics—are not captured by simple inputs.",
    bulletsTitle: "What BAC calculators can and cannot do",
    bullet1: "They can illustrate how drinking more over a shorter time generally raises your estimated BAC.",
    bullet2: "They can highlight when your estimated BAC is likely above commonly cited legal limits.",
    bullet3: "They cannot know your exact BAC at any moment, even with detailed inputs.",
    bullet4: "They cannot guarantee that you are safe or legal to drive, even if the estimate looks low.",
    usageTitle: "How to use BAC calculators safely",
    usageBody:
      "Use BAC calculators to understand risk and to motivate safer choices: for example, by showing how a few extra drinks or one more hour can change your estimated BAC. Never use them as a green light to drive. If there is any uncertainty, do not drive.",
    faqTitle: "Quick questions about BAC calculator accuracy",
    faq: {
      q1: "Can a BAC calculator replace a breathalyzer or blood test?",
      a1: "No. Breath and blood tests directly measure alcohol in your body. Online calculators only estimate BAC from self-reported drinking, which is much less reliable.",
      q2: "If two calculators show different numbers, which one should I trust?",
      a2: "Treat both as rough estimates and pay more attention to the higher value and the warnings. Differences usually come from different assumptions about drink size, body water, and elimination rate.",
      q3: "If the calculator shows a low BAC, is it safe to drive?",
      a3: "No. A low estimate does not guarantee that you are unimpaired or under the legal limit. The safest option after drinking is always to avoid driving yourself.",
    },
  },
} as const;

export default en;
