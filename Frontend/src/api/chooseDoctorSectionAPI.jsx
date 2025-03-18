const doctorsData = {
    specialists: [
        { "name": "Dermatologist", "image": "/images/dermatologist.jpg", online: false },
        { "name": "Gynecologist", "image": "/images/gynecologist.jpg", online: true },
        { "name": "Urologist", "image": "/images/urologist.jpg", online: false },
        { "name": "Gastroenterologist", "image": "/images/gastroenterologist.jpg", online: true },
        { "name": "Dentist", "image": "/images/dentist.jpg", online: false },
        { "name": "Psychiatrist", "image": "/images/psychiatrist.jpg", online: false },
        { "name": "ENT Specialist", "image": "/images/ent-specialist.jpg", online: false },
        { "name": "Orthopedic Surgeon", "image": "/images/orthopedic-surgeon.jpg", online: true },
        { "name": "Sexologist", "image": "/images/sexologist.jpg", online: false },
        { "name": "Neurologist", "image": "/images/neurologist.jpg", online: false },
        { "name": "Child Specialist", "image": "/images/child-specialist.jpg", online: false },
        { "name": "Pulmonologist", "image": "/images/pulmonologist.jpg", online: true },
        { "name": "Eye Specialist", "image": "/images/eye-specialist.jpg", online: false },
        { "name": "General Physician", "image": "/images/general-physician.jpg", online: false },
        { "name": "Cardiologist", "image": "/images/heart-attack.jpg", online: true },
        { "name": "Nephrologist", "image": "/images/general-physician.jpg", online: false },
        { "name": "Oncologist", "image": "/images/neurologist.jpg", online: false },
        { "name": "Endocrinologist", "image": "/images/high-blood-pressure.jpg", online: true },
        { "name": "Radiologist", "image": "/images/eye-specialist.jpg", online: false }
    ],
    conditions: [
        { "name": "Fever", "image": "/images/fever.jpg", "specialty": "General Physician" },
        { "name": "Heart Attack", "image": "/images/heart-attack.jpg", "specialty": "Cardiologist" },
        { "name": "Pregnancy", "image": "/images/pregnancy.jpg", "specialty": "Gynecologist" },
        { "name": "High Blood Pressure", "image": "/images/high-blood-pressure.jpg", "specialty": "Endocrinologist" },
        { "name": "Piles", "image": "/images/piles.jpg", "specialty": "Gastroenterologist" },
        { "name": "Diarrhea", "image": "/images/diarrhea.jpg", "specialty": "Gastroenterologist" },
        { "name": "Acne", "image": "/images/acne.jpg", "specialty": "Dermatologist" }
    ]
};

// Always return a pre-sorted array so the top doctors remain fixed.
export const fetchDoctors = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                specialists: [...doctorsData.specialists].sort((a, b) => b.online - a.online), // Sort once here
                conditions: doctorsData.conditions
            });
        }, 500);
    });
};
