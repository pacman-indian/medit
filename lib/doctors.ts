export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  experienceYears: number;
  rating: number;
  reviews: number;
  about: string;
  hospital: string;
  address: string;
  fee: string;
  feeAmount: number;
  image: string;
  location: string;
  availability: string;
  lat: number;
  lng: number;
  phone: string;
}

export const DOCTORS: Doctor[] = [
  {
    id: 1, name: "Dr. Priya Sharma", specialty: "Cardiologist",
    qualification: "MBBS, MD (Cardiology), AIIMS", experience: "12+ Years", experienceYears: 12,
    rating: 4.9, reviews: 124,
    about: "Dr. Priya Sharma is a renowned cardiologist with over a decade of experience in treating complex heart conditions. She specialises in preventive cardiology and interventional procedures.",
    hospital: "Apollo Heart Institute", address: "Sarita Vihar, Delhi – 110076",
    fee: "₹1,500", feeAmount: 1500,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Delhi", availability: "Mon, Wed, Fri", lat: 28.5274, lng: 77.2953, phone: "+91 11 2692 5801",
  },
  {
    id: 2, name: "Dr. Rajesh Verma", specialty: "Dermatologist",
    qualification: "MBBS, MD (Dermatology)", experience: "8+ Years", experienceYears: 8,
    rating: 4.8, reviews: 98,
    about: "Dr. Rajesh Verma is an expert in clinical and cosmetic dermatology. He specialises in acne, eczema, and hair loss with a patient-first approach.",
    hospital: "Skin Care Clinic", address: "Bandra West, Mumbai – 400050",
    fee: "₹1,200", feeAmount: 1200,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Mumbai", availability: "Tue, Thu, Sat", lat: 19.0596, lng: 72.8295, phone: "+91 22 2640 1122",
  },
  {
    id: 3, name: "Dr. Anjali Gupta", specialty: "General Physician",
    qualification: "MBBS, MD (Internal Medicine)", experience: "15+ Years", experienceYears: 15,
    rating: 4.9, reviews: 210,
    about: "Dr. Anjali Gupta is a senior physician with extensive experience managing lifestyle diseases like diabetes and hypertension. She believes in holistic, patient-centred care.",
    hospital: "Fortis Hospital", address: "Bannerghatta Road, Bangalore – 560076",
    fee: "₹800", feeAmount: 800,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Bangalore", availability: "Mon to Sat", lat: 12.8900, lng: 77.5990, phone: "+91 80 6621 4444",
  },
  {
    id: 4, name: "Dr. Vikram Singh", specialty: "Cardiologist",
    qualification: "MBBS, DM (Cardiology)", experience: "20+ Years", experienceYears: 20,
    rating: 5.0, reviews: 340,
    about: "Dr. Vikram Singh is a pioneer in non-invasive cardiology. He has served at multiple military hospitals and now consults at AIIMS New Delhi.",
    hospital: "AIIMS", address: "Ansari Nagar, New Delhi – 110029",
    fee: "₹2,000", feeAmount: 2000,
    image: "https://images.unsplash.com/photo-1537368910025-bc005f1c7ae2?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Delhi", availability: "Mon, Tue, Wed", lat: 28.5672, lng: 77.2100, phone: "+91 11 2658 8500",
  },
  {
    id: 5, name: "Dr. Meera Redis", specialty: "Neurologist",
    qualification: "MBBS, DM (Neurology)", experience: "10+ Years", experienceYears: 10,
    rating: 4.7, reviews: 85,
    about: "Dr. Meera Redis specialises in migraines, epilepsy, and stroke rehabilitation. She is known for compassionate, evidence-based care.",
    hospital: "Max Healthcare", address: "Sushant Lok, Gurugram – 122001",
    fee: "₹1,800", feeAmount: 1800,
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Gurugram", availability: "Thu, Fri, Sat", lat: 28.4650, lng: 77.0734, phone: "+91 124 4141 414",
  },
  {
    id: 6, name: "Dr. Arjun Kapoor", specialty: "Orthopedic",
    qualification: "MBBS, MS (Orthopedics)", experience: "14+ Years", experienceYears: 14,
    rating: 4.8, reviews: 156,
    about: "Dr. Arjun Kapoor is an expert in joint replacement and sports injuries. He uses minimally invasive techniques for faster recovery times.",
    hospital: "Kokilaben Hospital", address: "Andheri West, Mumbai – 400053",
    fee: "₹1,600", feeAmount: 1600,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Mumbai", availability: "Mon, Wed, Fri", lat: 19.1281, lng: 72.8235, phone: "+91 22 3069 9999",
  },
  {
    id: 7, name: "Dr. Kavita Rao", specialty: "Pediatrician",
    qualification: "MBBS, MD (Pediatrics)", experience: "7+ Years", experienceYears: 7,
    rating: 4.9, reviews: 112,
    about: "Dr. Kavita Rao loves children and specialises in neonatal care and child nutrition. She is associated with Rainbow Children's Hospital.",
    hospital: "Rainbow Hospital", address: "Banjara Hills, Hyderabad – 500034",
    fee: "₹900", feeAmount: 900,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Hyderabad", availability: "Mon to Sat", lat: 17.4156, lng: 78.4347, phone: "+91 40 4444 1234",
  },
  {
    id: 8, name: "Dr. Suresh Nair", specialty: "ENT Specialist",
    qualification: "MBBS, MS (ENT)", experience: "18+ Years", experienceYears: 18,
    rating: 4.6, reviews: 78,
    about: "Dr. Suresh Nair is a senior ENT specialist dealing with sinus conditions, ear infections, and sleep apnoea surgeries.",
    hospital: "Amrita Hospital", address: "Edappally, Kochi – 682041",
    fee: "₹1,000", feeAmount: 1000,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Kochi", availability: "Wed, Thu, Fri", lat: 10.0272, lng: 76.3083, phone: "+91 484 266 6100",
  },
  {
    id: 9, name: "Dr. Neha Agarwal", specialty: "Psychiatrist",
    qualification: "MBBS, MD (Psychiatry)", experience: "9+ Years", experienceYears: 9,
    rating: 4.9, reviews: 145,
    about: "Dr. Neha Agarwal helps patients with anxiety, depression, and stress management using a combination of therapy and medication.",
    hospital: "Mind Care Clinic", address: "Salt Lake, Kolkata – 700091",
    fee: "₹1,500", feeAmount: 1500,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Kolkata", availability: "Tue, Thu, Sat", lat: 22.5806, lng: 88.4200, phone: "+91 33 4040 2020",
  },
  {
    id: 10, name: "Dr. Rohan Das", specialty: "Dentist",
    qualification: "BDS, MDS (Orthodontics)", experience: "5+ Years", experienceYears: 5,
    rating: 4.7, reviews: 60,
    about: "Dr. Rohan Das is a cosmetic dentist specialising in smile designing, braces, and implants.",
    hospital: "Smile Dental Care", address: "Dispur, Guwahati – 781006",
    fee: "₹500", feeAmount: 500,
    image: "https://images.unsplash.com/photo-1537368910025-bc005f1c7ae2?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Guwahati", availability: "Mon to Fri", lat: 26.1433, lng: 91.7898, phone: "+91 361 245 6789",
  },
  // Pune doctors
  {
    id: 11, name: "Dr. Sneha Kulkarni", specialty: "General Physician",
    qualification: "MBBS, MD (Internal Medicine)", experience: "11+ Years", experienceYears: 11,
    rating: 4.8, reviews: 189,
    about: "Dr. Sneha Kulkarni is a trusted general physician in Pune, specialising in lifestyle disease management, preventive care, and chronic condition monitoring.",
    hospital: "Deenanath Mangeshkar Hospital", address: "Erandwane, Pune – 411004",
    fee: "₹700", feeAmount: 700,
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Pune", availability: "Mon to Sat", lat: 18.5129, lng: 73.8358, phone: "+91 20 4015 1000",
  },
  {
    id: 12, name: "Dr. Amit Deshpande", specialty: "Orthopedic",
    qualification: "MBBS, MS (Orthopedics)", experience: "16+ Years", experienceYears: 16,
    rating: 4.7, reviews: 203,
    about: "Dr. Amit Deshpande is a leading orthopaedic surgeon in Pune with expertise in arthroscopy, sports injuries, and joint replacements.",
    hospital: "Ruby Hall Clinic", address: "Sassoon Road, Pune – 411001",
    fee: "₹1,400", feeAmount: 1400,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400",
    location: "Pune", availability: "Mon, Wed, Fri", lat: 18.5217, lng: 73.8743, phone: "+91 20 6645 5000",
  },
];
