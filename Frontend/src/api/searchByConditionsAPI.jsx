const conditionsData = {
    Dermatologist: {
        image: "/images/dermatologist.jpg",
        conditions: [
            "Acne", "Eczema", "Psoriasis", "Skin Infections", "Rosacea", "Vitiligo", "Hives", "Fungal Infections", "Moles", "Skin Cancer"
        ]
    },
    Gynecologist: {
        image: "/images/gynecologist.jpg",
        conditions: [
            "Amenorrhoea", "Aplastic Anemia", "Ectopic Pregnancy", "Endometriosis", "Female Infertility", "Female Urinary Problems", "Fibroids",
            "Gynecological Tumors", "High Risk Pregnancy", "Infectious Diseases", "Menopause", "Menstruation Problems", "Miscarriage",
            "Ovarian Cyst", "Polycystic Ovary Syndrome (PCOS)"
        ]
    },
    Urologist: {
        image: "/images/urologist.jpg",
        conditions: [
            "Kidney Stones", "Urinary Tract Infections", "Bladder Cancer", "Prostate Issues", "Incontinence"
        ]
    },
    Gastroenterologist: {
        image: "/images/gastroenterologist.jpg",
        conditions: [
            "Acid Reflux", "Irritable Bowel Syndrome (IBS)", "Liver Disease", "Ulcers", "Hepatitis", "Gallbladder Disease"
        ]
    },
    Dentist: {
        image: "/images/dentist.jpg",
        conditions: [
            "Tooth Decay", "Gingivitis", "Root Canal Infection", "Cavities", "Bruxism", "Tooth Sensitivity"
        ]
    },
    Psychiatrist: {
        image: "/images/psychiatrist.jpg",
        conditions: [
            "Depression", "Anxiety Disorders", "Bipolar Disorder", "Schizophrenia", "Obsessive-Compulsive Disorder (OCD)"
        ]
    },
    "ENT Specialist": {
        image: "/images/ent-specialist.jpg",
        conditions: [
            "Ear Infections", "Tonsillitis", "Sinusitis", "Hearing Loss", "Vertigo"
        ]
    },
    "Orthopedic Surgeon": {
        image: "/images/orthopedic-surgeon.jpg",
        conditions: [
            "Arthritis", "Fractures", "Osteoporosis", "Back Pain", "Joint Pain"
        ]
    },
    Sexologist: {
        image: "/images/sexologist.jpg",
        conditions: [
            "Erectile Dysfunction", "Premature Ejaculation", "Sexual Health Counseling", "Fertility Issues"
        ]
    },
    Neurologist: {
        image: "/images/neurologist.jpg",
        conditions: [
            "Migraine", "Epilepsy", "Stroke", "Parkinson’s Disease", "Multiple Sclerosis"
        ]
    },
    "Child Specialist": {
        image: "/images/child-specialist.jpg",
        conditions: [
            "Pediatric Asthma", "Growth Issues", "Childhood Infections", "Autism", "ADHD"
        ]
    },
    Pulmonologist: {
        image: "/images/pulmonologist.jpg",
        conditions: [
            "Asthma", "Chronic Obstructive Pulmonary Disease (COPD)", "Pneumonia", "Lung Cancer", "Tuberculosis"
        ]
    },
    "Eye Specialist": {
        image: "/images/eye-specialist.jpg",
        conditions: [
            "Cataracts", "Glaucoma", "Retinal Disorders", "Dry Eye Syndrome", "Macular Degeneration"
        ]
    },
    "General Physician": {
        image: "/images/general-physician.jpg",
        conditions: [
            "Fever", "Flu", "Diabetes", "Hypertension", "General Checkup"
        ]
    },
    Cardiologist: {
        image: "/images/heart-attack.jpg",
        conditions: [
            "Heart Attack", "High Blood Pressure", "Arrhythmia", "Cardiomyopathy", "Coronary Artery Disease"
        ]
    },
    Nephrologist: {
        image: "/images/general-physician.jpg",
        conditions: [
            "Chronic Kidney Disease", "Nephritis", "Dialysis Management", "Kidney Failure"
        ]
    },
    Oncologist: {
        image: "/images/neurologist.jpg",
        conditions: [
            "Lung Cancer", "Breast Cancer", "Leukemia", "Lymphoma", "Colon Cancer"
        ]
    },
    Endocrinologist: {
        image: "/images/high-blood-pressure.jpg",
        conditions: [
            "Diabetes", "Thyroid Disorders", "Hormonal Imbalances", "Osteoporosis"
        ]
    },
    Radiologist: {
        image: "/images/eye-specialist.jpg",
        conditions: [
            "MRI Analysis", "CT Scan Readings", "X-ray Interpretations", "Ultrasound Diagnoses"
        ]
    },
    Rheumatologist: {
        image: "/images/general-physician.jpg",
        conditions: [
            "Rheumatoid Arthritis", "Lupus", "Fibromyalgia", "Gout", "Osteoarthritis"
        ]
    },
    Immunologist: {
        image: "/images/neurologist.jpg",
        conditions: [
            "Autoimmune Diseases", "Allergies", "Immunodeficiency Disorders", "Asthma", "Chronic Infections"
        ]
    },
    PlasticSurgeon: {
        image: "/images/dermatologist.jpg",
        conditions: [
            "Reconstructive Surgery", "Burns", "Scar Revision", "Rhinoplasty", "Breast Augmentation"
        ]
    },
    Anesthesiologist: {
        image: "/images/general-physician.jpg",
        conditions: [
            "Pain Management", "Surgical Anesthesia", "Chronic Pain", "Postoperative Care", "Spinal Anesthesia"
        ]
    },
    Hematologist: {
        image: "/images/heart-attack.jpg",
        conditions: [
            "Anemia", "Leukemia", "Lymphoma", "Clotting Disorders", "Thrombocytopenia"
        ]
    },
    Pathologist: {
        image: "/images/eye-specialist.jpg",
        conditions: [
            "Biopsy Analysis", "Blood Tests", "Infectious Disease Testing", "Histopathology", "Cytopathology"
        ]
    },
    InfectiousDiseaseSpecialist: {
        image: "/images/general-physician.jpg",
        conditions: [
            "HIV/AIDS", "Tuberculosis", "Hepatitis B & C", "Dengue", "Malaria"
        ]
    },
    Geriatrician: {
        image: "/images/general-physician.jpg",
        conditions: [
            "Alzheimer’s Disease", "Osteoporosis", "Parkinson’s Disease", "Elderly Care", "Frailty Syndrome"
        ]
    },
    BariatricSurgeon: {
        image: "/images/general-physician.jpg",
        conditions: [
            "Obesity", "Gastric Bypass Surgery", "Weight Loss Management", "Metabolic Syndrome", "Bariatric Surgery"
        ]
    },
    Neonatologist: {
        image: "/images/child-specialist.jpg",
        conditions: [
            "Premature Birth", "Newborn Jaundice", "Neonatal Infections", "Congenital Disorders", "Respiratory Distress Syndrome"
        ]
    }
};

export const fetchConditions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(conditionsData);
        }, 500);
    });
};
