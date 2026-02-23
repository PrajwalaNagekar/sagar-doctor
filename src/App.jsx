import React, { useState, useEffect, useRef } from 'react';
import {
   Calendar,
   Users,
   Activity,
   FileText,
   Clock,
   Search,
   Bell,
   Menu,
   User,
   ChevronRight,
   ChevronLeft,
   Plus,
   X,
   CheckCircle,
   AlertCircle,
   LogOut,
   Stethoscope,
   Thermometer,
   ClipboardList,
   BedDouble,
   FileCheck,
   CalendarDays,
   UserCheck,
   Syringe,
   Pill,
   Download,
   Share2,
   Filter,
   ArrowLeft,
   Home,
   CalendarX,
   HeartPulse,
   Weight,
   FlaskConical,
   Droplet,
   Lock,
   Receipt,
   Navigation,
   HelpCircle,
   Shield,
   Settings,
   Megaphone,
   Mic,
   MicOff,
   VideoOff,
   PhoneOff,
   FileCheck2,
   Info,
   HeartHandshake,
   Accessibility,
   History,
   ArrowRight,
   UserPlus,
   ShieldCheck,
   Radio,
   FileEdit,
   Award,
   Briefcase,
   Star
} from 'lucide-react';

/**
 * SAGAR HOSPITAL DOCTOR APP - VERSION 3.1
 * Updates: Modified Login Screen Text
 * Features: Doctor Profile, Rescheduling, EMR, IPD, Leave & Coverage
 */

// --- Mock Data ---

const INITIAL_APPOINTMENTS = [
   { id: 1, patient: "Rahul Sharma", uhid: "SH-8899", time: "09:30 AM", date: "17 Feb", type: "OPD", status: "Checked In", age: 34, gender: "M", issue: "Chest Pain" },
   { id: 2, patient: "Sneha Reddy", uhid: "SH-9012", time: "10:00 AM", date: "17 Feb", type: "VIDEO", status: "Pending", age: 28, gender: "F", issue: "Hypertension" },
   { id: 3, patient: "Amit Verma", uhid: "SH-7721", time: "10:30 AM", date: "17 Feb", type: "OPD", status: "Waiting", age: 45, gender: "M", issue: "Cardiac Checkup" },
   { id: 4, patient: "Priya Menon", uhid: "SH-6654", time: "11:00 AM", date: "17 Feb", type: "OPD", status: "Completed", age: 52, gender: "F", issue: "Breathlessness" },
];

const INPATIENTS = [
   { id: 101, name: "Vikram Singh", uhid: "SH-1001", ward: "ICU-04", admitDate: "10 Feb 2026", diagnosis: "Acute MI", status: "Critical" },
   { id: 102, name: "Anjali Gupta", uhid: "SH-1022", ward: "Gen-12", admitDate: "12 Feb 2026", diagnosis: "Viral Pyrexia", status: "Stable" },
   { id: 103, name: "Mohd. Azhar", uhid: "SH-1045", ward: "Pvt-01", admitDate: "08 Feb 2026", diagnosis: "Angioplasty Recovery", status: "Ready for Discharge" },
];

const MY_LAB_REPORTS = [
   { id: "LR-001", name: "Complete Blood Count (CBC)", date: "10 Feb 2026", status: "Uploaded", doctor: "Dr. Rajesh Kumar" },
   { id: "LR-002", name: "Lipid Profile", date: "10 Feb 2026", status: "Uploaded", doctor: "Dr. Rajesh Kumar" },
   { id: "LR-003", name: "Thyroid Profile", date: "28 Jan 2026", status: "Processing", doctor: "Self" },
];

const CONSULTATION_RECORDS = [
   { id: "ENC-091", date: "15 Jan 2026", diagnosis: "Essential Hypertension", notes: "Patient advised low sodium diet.", doctor: "Dr. Rajesh Kumar" },
];

const RX_HISTORY = [
   { id: "RX-882", date: "15 Jan 2026", meds: ["Tab. Telma 40mg"] },
];

const FOLLOWUP_HISTORY = [
   { date: "12 Mar 2026", status: "Upcoming", type: "OPD Review" },
];

const MEDICINE_DB = [
   { name: "Pan 40", dosage: "40mg", type: "Tablet" },
   { name: "Telma 40", dosage: "40mg", type: "Tablet" },
   { name: "Dolo 650", dosage: "650mg", type: "Tablet" },
];

const DOCTOR_LIST = [
   "Dr. Sneha Gupta (Gen. Med)",
   "Dr. Amit Verma (Pediatrics)",
   "Dr. Vikram Rao (Consultant)"
];

// --- Functional Components ---

const SplashScreen = ({ onFinish }) => {
   useEffect(() => {
      const timer = setTimeout(onFinish, 2000);
      return () => clearTimeout(timer);
   }, [onFinish]);

   return (
      <div className="h-full w-full bg-white flex flex-col items-center justify-center text-white p-8">
         <div className="bg-white p-4 rounded-3xl shadow-2xl mb-6 animate-bounce">
            <Stethoscope size={48} className="text-indigo-700" />
         </div>
         <h1 className="text-2xl font-bold tracking-tight mb-1 text-center">Sagar Hospital</h1>
         <p className="text-indigo-200 text-sm font-medium uppercase text-center tracking-[0.2em]">Doctor Clinical Connect</p>
      </div>
   );
};

const LoginScreen = ({ onLogin }) => (
   <div className="h-full flex flex-col bg-white p-8 justify-center animate-fade-in">
      <div className="mb-10 text-center">
         <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 text-indigo-700 mx-auto border border-indigo-100 shadow-sm">
            <UserCheck size={32} />
         </div>
         <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Sagar Doctors</h1>
         <p className="text-gray-500 mt-2 text-sm leading-relaxed">Secure Management Portal</p>
      </div>
      <div className="space-y-4">
         <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Professional Mobile</label>
            <input type="tel" defaultValue="+91 98765 43210" className="w-full border-b-2 border-gray-100 py-3 text-lg font-bold text-gray-800 outline-none focus:border-indigo-600 transition-colors" />
         </div>
      </div>
      <button onClick={onLogin} className="w-full bg-indigo-700 text-white h-14 rounded-xl font-black text-sm uppercase tracking-widest mt-12 shadow-lg shadow-indigo-200 active:scale-95 transition-all">
         Login with mobile number
      </button>
   </div>
);

const OtpScreen = ({ onVerify }) => {
   const [otp, setOtp] = useState(['', '', '', '']);
   const inputs = useRef([]);

   const handleChange = (val, index) => {
      if (isNaN(val)) return;
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      if (val && index < 3) inputs.current[index + 1].focus();
   };

   return (
      <div className="h-full flex flex-col bg-white p-8 justify-center animate-fade-in text-center">
         <div className="mb-10">
            <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 text-indigo-700 mx-auto border-2 border-indigo-100 shadow-inner">
               <Lock size={32} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Identity Check</h1>
            <p className="text-gray-400 mt-2 text-sm font-medium">Verify your clinical credentials</p>
         </div>
         <div className="flex gap-4 justify-center mb-10">
            {otp.map((digit, i) => (
               <input
                  key={i}
                  ref={el => inputs.current[i] = el}
                  type="text"
                  maxLength="1"
                  className="w-12 h-14 bg-gray-50 border-2 border-gray-100 rounded-xl text-center text-xl font-bold text-indigo-700 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
               />
            ))}
         </div>
         <button onClick={onVerify} className="w-full bg-indigo-700 text-white h-16 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-200 active:scale-95 transition-all">Authenticate & Start</button>
      </div>
   );
};

const Dashboard = ({ navigate, appointments }) => (
   <div className="h-full flex flex-col bg-gray-50 animate-fade-in">
      <div className="p-6 pt-14 pb-6 bg-indigo-700 rounded-b-[2.5rem] shadow-lg sticky top-0 z-10 text-white">
         <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full border-2 border-white/50 bg-white overflow-hidden shadow-sm flex items-center justify-center">
                  <img src="https://cdn-icons-png.flaticon.com/128/3774/3774299.png" className="w-full h-full object-contain bg-indigo-50 pt-1" alt="Dr" />
               </div>
               <div>
                  <h2 className="text-lg font-bold">Dr. Rajesh Kumar</h2>
                  <p className="text-indigo-100 text-xs opacity-80 uppercase font-black tracking-tighter">Cardiology Dept</p>
               </div>
            </div>
            <button className="p-2 bg-white/20 rounded-full active:scale-90 transition-transform"><Bell size={20} /></button>
         </div>
         <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 text-center">
               <p className="text-indigo-100 text-[9px] uppercase font-black mb-1">Queue</p>
               <p className="text-xl font-black">24</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 text-center">
               <p className="text-indigo-100 text-[9px] uppercase font-black mb-1">Census</p>
               <p className="text-xl font-black">08</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 text-center">
               <p className="text-indigo-100 text-[9px] uppercase font-black mb-1">Alerts</p>
               <p className="text-xl font-black">03</p>
            </div>
         </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-24">
         <h3 className="font-bold text-gray-800 mb-4 text-xs uppercase tracking-wider opacity-60">Operations</h3>
         <div className="grid grid-cols-3 gap-4 mb-8">
            {[
               { label: "OPD", icon: Calendar, color: "bg-indigo-100 text-indigo-600", to: "schedule" },
               { label: "IPD", icon: BedDouble, color: "bg-purple-100 text-purple-600", to: "ipd" },
               { label: "Leave", icon: CalendarX, color: "bg-orange-100 text-orange-600", to: "leaves" },
            ].map((action, idx) => (
               <div key={idx} onClick={() => navigate(action.to)} className="flex flex-col items-center gap-2 cursor-pointer active:opacity-60 transition-opacity">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.color} shadow-sm border border-black/5`}>
                     <action.icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 text-center leading-tight tracking-tighter">{action.label}</span>
               </div>
            ))}
         </div>
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider opacity-60">OPD Queues</h3>
            <button onClick={() => navigate('schedule')} className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg">All Tasks</button>
         </div>
         <div className="space-y-3">
            {appointments.map(appt => (
               <div key={appt.id} onClick={() => navigate('patient_detail', appt)} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 cursor-pointer active:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-50 rounded-xl border border-gray-200">
                     <span className="text-[9px] font-black text-gray-400 uppercase">{appt.time.split(' ')[1]}</span>
                     <span className="text-sm font-black text-gray-800 tracking-tighter">{appt.time.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-gray-800 text-sm leading-none mb-1">{appt.patient}</h4>
                     <p className="text-[10px] text-gray-400 font-bold uppercase">{appt.uhid} • {appt.issue}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
               </div>
            ))}
         </div>
      </div>
   </div>
);

const ProfileScreen = ({ navigate }) => {
   return (
      <div className="h-full flex flex-col bg-gray-50 animate-fade-in pb-24">
         <div className="p-6 pt-14 pb-8 bg-indigo-700 text-white rounded-b-[2.5rem] relative z-10 shadow-lg">
            <div className="flex items-center gap-5">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-indigo-700 border-4 border-white/20 shadow-xl overflow-hidden">
                  <img src="https://cdn-icons-png.flaticon.com/128/3774/3774299.png" className="w-full h-full object-contain bg-indigo-50 pt-2" alt="Dr" />
               </div>
               <div>
                  <h2 className="text-2xl font-black tracking-tight leading-none">Dr. Rajesh Kumar</h2>
                  <p className="text-indigo-100 text-sm font-bold uppercase mt-1">Interventional Cardiologist</p>
                  <div className="flex gap-2 mt-3">
                     <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-white/10">ID: DR-RAJ-882</span>
                     <span className="bg-indigo-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-white/10">Verified</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-6 -mt-4 relative z-20 scrollbar-hide">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 mb-6">
               <div className="grid grid-cols-2 p-4 gap-4 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Award size={20} /></div>
                     <div><p className="text-[9px] font-black text-gray-400 uppercase">Experience</p><p className="text-sm font-bold text-gray-800">12 Years</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Star size={20} /></div>
                     <div><p className="text-[9px] font-black text-gray-400 uppercase">Rating</p><p className="text-sm font-bold text-gray-800">4.9 / 5.0</p></div>
                  </div>
               </div>
               <div className="p-4 space-y-4">
                  <div className="flex items-center gap-4">
                     <Briefcase size={18} className="text-gray-400" />
                     <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Academic Credentials</p><p className="text-xs font-bold text-gray-700">MBBS, MD (General Medicine), DM (Cardiology)</p></div>
                  </div>
               </div>
            </div>

            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Professional Settings</h3>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 mb-6">
               {[
                  { label: "Clinical Schedule", icon: Calendar, color: "text-indigo-600 bg-indigo-50" },
                  { label: "My Digital Signature", icon: FileEdit, color: "text-purple-600 bg-purple-50" },
                  { label: "HOD Notifications", icon: Bell, color: "text-orange-600 bg-orange-50" },
                  { label: "Help & Support", icon: HelpCircle, color: "text-green-600 bg-green-50" }
               ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors cursor-pointer rounded-2xl">
                     <div className={`p-2 rounded-xl ${item.color}`}><item.icon size={20} /></div>
                     <span className="flex-1 text-sm font-bold text-gray-700">{item.label}</span>
                     <ChevronRight size={16} className="text-gray-300" />
                  </div>
               ))}
            </div>

            <button
               onClick={() => navigate('login')}
               className="w-full py-4 bg-red-50 text-red-600 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-red-100 active:bg-red-100 transition-all"
            >
               <LogOut size={16} /> Terminate Clinical Session
            </button>
         </div>
      </div>
   );
};

const ScheduleScreen = ({ navigate, appointments }) => (
   <div className="h-full flex flex-col bg-white">
      <div className="p-6 pt-14 pb-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 bg-white z-10 shadow-sm">
         <button onClick={() => navigate('dashboard')} className="p-2 -ml-2 text-gray-600 active:bg-gray-50 rounded-full transition-all"><ArrowLeft size={24} /></button>
         <h2 className="text-xl font-bold text-gray-800 tracking-tight">OPD Schedule</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
         <div className="mb-6 flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {[14, 15, 16, 17, 18, 19].map(day => (
               <div key={day} className={`min-w-[65px] flex flex-col items-center p-3 rounded-2xl border transition-all ${day === 17 ? 'bg-indigo-700 text-white shadow-xl scale-105' : 'bg-white border-gray-100 text-gray-400'}`}>
                  <span className="text-[10px] font-bold uppercase mb-1">Feb</span>
                  <span className="text-xl font-black">{day}</span>
               </div>
            ))}
         </div>
         <div className="space-y-4 pb-20">
            {appointments.map(appt => (
               <div key={appt.id} onClick={() => navigate('patient_detail', appt)} className="flex gap-4 group cursor-pointer active:scale-[0.98] transition-all">
                  <div className="flex flex-col items-center pt-2">
                     <div className={`w-3.5 h-3.5 rounded-full border-2 ${appt.status === 'Completed' ? 'bg-green-500 border-green-500' : 'bg-white border-indigo-600'}`}></div>
                     <div className="w-0.5 flex-1 bg-gray-100 my-1 group-last:hidden"></div>
                  </div>
                  <div className="flex-1 bg-gray-50 p-5 rounded-3xl border border-gray-100 mb-2 hover:bg-gray-100 transition-colors">
                     <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full uppercase tracking-tighter">{appt.time}</span>
                        <span className={`text-[9px] font-black px-2.5 py-1 rounded-full text-white uppercase shadow-sm ${appt.type === 'VIDEO' ? 'bg-purple-600' : 'bg-indigo-600'}`}>{appt.type}</span>
                     </div>
                     <h4 className="font-black text-gray-800 mb-1">{appt.patient}</h4>
                     <p className="text-[10px] text-gray-500 mb-4 font-bold uppercase tracking-tight">{appt.uhid} • {appt.gender}/{appt.age} Yrs</p>
                     <div className="flex gap-2">
                        <button onClick={(e) => { e.stopPropagation(); navigate('reschedule', appt); }} className="flex-1 bg-white border-2 border-gray-200 text-gray-600 text-[10px] font-black uppercase py-2.5 rounded-xl active:scale-95 transition-all">Reschedule</button>
                        <button className="flex-1 bg-indigo-700 text-white text-[10px] font-black uppercase py-2.5 rounded-xl shadow-md active:scale-95 transition-all">Consult</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   </div>
);

const PatientDetailScreen = ({ navigate, patient }) => {
   const [tab, setTab] = useState('history');
   if (!patient) return null;
   return (
      <div className="h-full flex flex-col bg-gray-50">
         <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10">
            <div className="flex items-center gap-4 mb-6">
               <button onClick={() => navigate('dashboard')} className="p-2 -ml-2 text-gray-600 transition-colors active:bg-gray-50 rounded-full"><ArrowLeft size={24} /></button>
               <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{patient.patient}</h2>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mt-1">{patient.uhid} • {patient.gender}/{patient.age} Yrs</p>
               </div>
               <button className="p-2.5 bg-indigo-50 text-indigo-700 rounded-2xl active:scale-90 transition-transform"><Share2 size={20} /></button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {[
                  { id: 'history', label: 'History', icon: History },
                  { id: 'records', label: 'Records', icon: FileText },
                  { id: 'labs', label: 'Labs', icon: FlaskConical },
                  { id: 'rx', label: 'Rx Pad', icon: Pill },
                  { id: 'followups', label: 'Visits', icon: Clock }
               ].map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all border ${tab === t.id ? 'bg-indigo-700 text-white border-indigo-700 shadow-md shadow-indigo-100' : 'bg-gray-50 text-gray-400 border-transparent'}`}>
                     <t.icon size={14} strokeWidth={3} /> {t.label}
                  </button>
               ))}
            </div>
         </div>
         <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-24">
            {tab === 'history' && (
               <div className="space-y-4 animate-fade-in">
                  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                     <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity size={14} className="text-indigo-600" /> Baseline History</h4>
                     <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-indigo-50/50 rounded-2xl"><p className="text-[9px] text-indigo-700 font-bold uppercase">BP</p><p className="text-sm font-black text-gray-800">120/80</p></div>
                        <div className="text-center p-3 bg-orange-50/50 rounded-2xl"><p className="text-[9px] text-orange-700 font-bold uppercase">Pulse</p><p className="text-sm font-black text-gray-800">72</p></div>
                        <div className="text-center p-3 bg-purple-50/50 rounded-2xl"><p className="text-[9px] text-purple-700 font-bold uppercase">Temp</p><p className="text-sm font-black text-gray-800">98.4</p></div>
                     </div>
                  </div>
               </div>
            )}
            {tab === 'records' && (
               <div className="space-y-3 animate-fade-in">
                  {CONSULTATION_RECORDS.map(record => (
                     <div key={record.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-indigo-600">
                        <span className="text-[10px] font-black text-indigo-700 uppercase mb-2 block">{record.date} • {record.id}</span>
                        <h4 className="text-sm font-bold text-gray-800">{record.diagnosis}</h4>
                        <p className="text-xs text-gray-500 mt-2 font-medium">{record.notes}</p>
                     </div>
                  ))}
               </div>
            )}
            {tab === 'labs' && (
               <div className="space-y-3 animate-fade-in">
                  {MY_LAB_REPORTS.map(report => (
                     <div key={report.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group active:bg-gray-50 transition-all">
                        <div className="flex items-center gap-3">
                           <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl"><FlaskConical size={20} /></div>
                           <div>
                              <h4 className="text-sm font-bold text-gray-800">{report.name}</h4>
                              <p className="text-[10px] text-gray-400 font-black uppercase">{report.date} • {report.status}</p>
                           </div>
                        </div>
                        <button className="p-2 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors"><Download size={18} /></button>
                     </div>
                  ))}
               </div>
            )}
            {tab === 'rx' && (
               <div className="space-y-3 animate-fade-in">
                  {RX_HISTORY.map(rx => (
                     <div key={rx.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-3">
                           <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest tracking-tighter">Clinical Prescription</h4>
                           <span className="text-[10px] font-bold text-gray-400 uppercase">{rx.date}</span>
                        </div>
                        <div className="space-y-2">
                           {rx.meds.map((m, i) => (
                              <div key={i} className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                 <p className="text-xs text-gray-600 font-bold">{m}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            )}
            {tab === 'followups' && (
               <div className="space-y-3 animate-fade-in">
                  {FOLLOWUP_HISTORY.map((f, i) => (
                     <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                        <div>
                           <p className="text-sm font-bold text-gray-800 tracking-tighter">{f.date}</p>
                           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{f.type}</p>
                        </div>
                        <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${f.status === 'Completed' ? 'bg-gray-100 text-gray-400' : 'bg-indigo-100 text-indigo-700 shadow-sm'}`}>{f.status}</span>
                     </div>
                  ))}
               </div>
            )}
         </div>
         <div className="p-4 bg-white border-t border-gray-100 shadow-2xl z-30">
            <button onClick={() => navigate('prescription', patient)} className="w-full bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all">Start Current Consult</button>
         </div>
      </div>
   );
};

const PrescriptionScreen = ({ navigate, patient }) => {
   const [meds, setMeds] = useState([]);
   const [search, setSearch] = useState('');
   if (!patient) return null;
   const addMed = (medicine) => { setMeds([...meds, { ...medicine, dose: '1-0-1', duration: '5 Days' }]); setSearch(''); };
   return (
      <div className="h-full flex flex-col bg-white">
         <div className="p-6 pt-14 pb-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 bg-white z-10 shadow-sm">
            <button onClick={() => navigate('patient_detail', patient)} className="p-2 -ml-2 text-gray-600 active:bg-gray-50 rounded-full transition-colors"><ArrowLeft size={24} /></button>
            <div className="flex-1">
               <h2 className="text-xl font-bold">Digital Rx Pad</h2>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{patient.patient}</p>
            </div>
         </div>
         <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <div className="relative mb-8">
               <Search size={20} className="absolute left-3 top-3.5 text-gray-300" />
               <input type="text" placeholder="Search drug database..." className="w-full bg-gray-50 pl-10 pr-4 py-4 rounded-2xl border border-gray-100 outline-none focus:border-indigo-500 font-bold text-sm shadow-inner transition-all" value={search} onChange={(e) => setSearch(e.target.value)} />
               {search && (
                  <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-2xl border border-gray-100 mt-2 z-50 overflow-hidden animate-fade-in">
                     {MEDICINE_DB.filter(m => m.name.toLowerCase().includes(search.toLowerCase())).map((m, idx) => (
                        <div key={idx} onClick={() => addMed(m)} className="p-4 border-b border-gray-50 last:border-0 hover:bg-indigo-50 cursor-pointer transition-colors">
                           <p className="text-sm font-bold text-gray-800">{m.name}</p>
                           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{m.dosage} • {m.type}</p>
                        </div>
                     ))}
                  </div>
               )}
            </div>
            <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mb-4 ml-1">Draft Medications</h3>
            {meds.length === 0 ? (
               <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <Pill size={40} className="mx-auto text-gray-200 mb-2" />
                  <p className="text-xs text-gray-400 font-medium px-10 leading-relaxed tracking-tighter">Digital Prescription flow. Add medications using the search above.</p>
               </div>
            ) : (
               <div className="space-y-4 animate-fade-in">
                  {meds.map((med, idx) => (
                     <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative group ring-1 ring-black/5">
                        <button onClick={() => setMeds(meds.filter((_, i) => i !== idx))} className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"><X size={16} /></button>
                        <h4 className="font-bold text-indigo-800 text-sm mb-4 flex items-center gap-2">
                           <Pill size={16} className="text-indigo-600" /> {med.name} <span className="text-[10px] text-gray-400 opacity-60">({med.dosage})</span>
                        </h4>
                        <div className="flex gap-3">
                           <div className="flex-1">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-1 mb-1 block">Dosage</label>
                              <input type="text" defaultValue={med.dose} className="w-full bg-gray-50 p-3 rounded-xl text-xs font-bold outline-none border border-gray-100 focus:border-indigo-500 focus:bg-white" placeholder="1-0-1" />
                           </div>
                           <div className="flex-1">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter ml-1 mb-1 block">Duration</label>
                              <input type="text" defaultValue={med.duration} className="w-full bg-gray-50 p-3 rounded-xl text-xs font-bold outline-none border border-gray-100 focus:border-indigo-500 focus:bg-white" placeholder="5 Days" />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
            <div className="mt-8 mb-10">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Doctor's Clinical Notes</label>
               <textarea className="w-full bg-gray-50 p-5 rounded-3xl border border-gray-100 outline-none focus:ring-1 focus:ring-indigo-500 text-sm font-medium leading-relaxed shadow-inner" rows="3" placeholder="Clinical findings..."></textarea>
            </div>
         </div>
         <div className="p-4 bg-white border-t border-gray-100 shadow-2xl">
            <button onClick={() => navigate('dashboard')} className="w-full bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-100 active:scale-95 transition-all flex items-center justify-center gap-3">
               <FileCheck2 size={22} /> Finalize Prescription
            </button>
         </div>
      </div>
   );
};

const IpdScreen = ({ navigate }) => (
   <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
         <button onClick={() => navigate('dashboard')} className="p-2 -ml-2 text-gray-600 active:bg-gray-50 rounded-full transition-all"><ArrowLeft size={24} /></button>
         <div>
            <h2 className="text-xl font-bold">IPD Census</h2>
            <p className="text-xs text-purple-600 font-bold uppercase tracking-widest tracking-tighter">In-house Management</p>
         </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-24">
         {INPATIENTS.map(patient => (
            <div key={patient.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm mb-4 active:scale-[0.98] transition-all">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <h3 className="font-bold text-gray-800 text-base">{patient.name}</h3>
                     <p className="text-[10px] text-gray-400 font-bold uppercase">{patient.uhid}</p>
                  </div>
                  <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${patient.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700 shadow-sm'}`}>
                     {patient.status}
                  </span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-2xl border border-black/5">
                     <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Initial Dx</p>
                     <p className="text-xs font-bold text-gray-700 mt-1 leading-tight">{patient.diagnosis}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl border border-black/5">
                     <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Ward Bed</p>
                     <p className="text-xs font-bold text-gray-700 mt-1 leading-tight">{patient.ward}</p>
                  </div>
               </div>
               <div className="flex gap-2 border-t border-gray-50 pt-4 mt-4">
                  <button className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 border border-gray-100 rounded-xl active:bg-gray-50">Vitals Chart</button>
                  <button onClick={() => navigate('discharge', patient)} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-white bg-purple-600 rounded-xl shadow-md active:scale-95 transition-all">Authorize Disch.</button>
               </div>
            </div>
         ))}
      </div>
   </div>
);

const DischargeSummaryScreen = ({ navigate, patient }) => {
   if (!patient) return null;
   return (
      <div className="h-full flex flex-col bg-white">
         <div className="p-6 pt-14 pb-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 bg-white z-10 shadow-sm">
            <button onClick={() => navigate('ipd')} className="p-2 -ml-2 text-gray-600 active:bg-gray-50 rounded-full transition-all"><ArrowLeft size={24} /></button>
            <div>
               <h2 className="text-xl font-bold">Clinical Discharge</h2>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">{patient.name}</p>
            </div>
         </div>
         <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <div className="space-y-6">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Managing Diagnosis</label>
                  <div className="p-4 bg-gray-50 rounded-2xl mt-2 text-sm font-bold text-gray-800 border border-gray-100">{patient.diagnosis} (Resolved)</div>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Course In-Hospital</label>
                  <textarea className="w-full bg-gray-50 p-4 rounded-2xl mt-2 text-sm h-32 border-none outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner font-medium leading-relaxed" defaultValue="Stable for 48 hours post management. Ready for home meds protocol."></textarea>
               </div>
            </div>
         </div>
         <div className="p-4 bg-white border-t border-gray-100 shadow-xl">
            <button onClick={() => navigate('dashboard')} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-green-100">
               <FileCheck size={22} /> Authenticate & Discharge
            </button>
         </div>
      </div>
   );
};

const LeaveManagerScreen = ({ navigate }) => {
   const [activeTab, setActiveTab] = useState('apply');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);
   const [leaveForm, setLeaveForm] = useState({ reason: '', coveringDoctor: '' });
   const handleSubmit = () => {
      if (!leaveForm.reason || !leaveForm.coveringDoctor) return;
      setIsSubmitting(true);
      setTimeout(() => {
         setIsSubmitting(false);
         setShowSuccess(true);
         setTimeout(() => { setShowSuccess(false); setActiveTab('history'); }, 1500);
      }, 1000);
   };
   return (
      <div className="h-full flex flex-col bg-gray-50">
         <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
            <button onClick={() => navigate('dashboard')} className="p-2 -ml-2 text-gray-600 active:bg-gray-50 rounded-full transition-all"><ArrowLeft size={24} /></button>
            <h2 className="text-xl font-bold">Leave Dashboard</h2>
         </div>
         <div className="flex bg-white px-6 border-b border-gray-100">
            <button onClick={() => setActiveTab('apply')} className={`flex-1 py-3 text-[10px] font-black uppercase border-b-4 transition-all ${activeTab === 'apply' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-300'}`}>Apply</button>
            <button onClick={() => setActiveTab('history')} className={`flex-1 py-3 text-[10px] font-black uppercase border-b-4 transition-all ${activeTab === 'history' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-300'}`}>Audit</button>
            <button onClick={() => setActiveTab('calendar')} className={`flex-1 py-3 text-[10px] font-black uppercase border-b-4 transition-all ${activeTab === 'calendar' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-300'}`}>Visual</button>
         </div>
         <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {activeTab === 'apply' ? (
               <div className="space-y-6 animate-fade-in">
                  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">ABSENCE PERIOD</label>
                     <div className="flex gap-4">
                        <div className="flex-1 p-3 bg-gray-50 rounded-2xl border border-gray-100"><p className="text-[9px] text-gray-400 uppercase font-black">FROM</p><p className="font-bold text-gray-800 text-sm tracking-tighter">20 Feb 2026</p></div>
                        <div className="flex-1 p-3 bg-gray-50 rounded-2xl border border-gray-100"><p className="text-[9px] text-gray-400 uppercase font-black">TO</p><p className="font-bold text-gray-800 text-sm tracking-tighter">22 Feb 2026</p></div>
                     </div>
                  </div>
                  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block tracking-tighter">Clinical Context</label>
                     <textarea className="w-full bg-gray-50 p-4 rounded-2xl text-sm font-medium border-none outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner" rows="3" value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} placeholder="Reason for leave..."></textarea>
                  </div>
                  <div className="bg-orange-50 p-5 rounded-3xl border border-orange-200 shadow-sm">
                     <div className="flex items-center gap-2 mb-2 text-orange-900 font-black text-xs uppercase tracking-tighter"><UserCheck size={18} /> Assign Coverage</div>
                     <select className="w-full p-4 bg-white rounded-2xl border border-orange-200 text-sm font-bold text-gray-700 outline-none shadow-sm" value={leaveForm.coveringDoctor} onChange={(e) => setLeaveForm({ ...leaveForm, coveringDoctor: e.target.value })}>
                        <option value="">Choose alternate consultant...</option>
                        {DOCTOR_LIST.map(d => <option key={d} value={d}>{d}</option>)}
                     </select>
                  </div>
                  <button disabled={isSubmitting || !leaveForm.reason || !leaveForm.coveringDoctor} onClick={handleSubmit} className="w-full bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg disabled:bg-gray-200 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-indigo-100">
                     {isSubmitting ? <Activity className="animate-spin" size={18} /> : showSuccess ? <CheckCircle size={18} /> : "File Application"}
                     {isSubmitting ? "Syncing..." : showSuccess ? "HOD Informed" : ""}
                  </button>
               </div>
            ) : activeTab === 'history' ? (
               <div className="space-y-4 animate-fade-in">
                  <div className="bg-white p-5 rounded-3xl border-l-8 border-green-500 shadow-sm">
                     <div className="flex justify-between items-start">
                        <div><h4 className="font-bold text-gray-800 text-base">Annual Leave</h4><p className="text-[10px] text-gray-400 font-black uppercase mt-0.5 tracking-tighter">10 Jan - 12 Jan 2026</p></div>
                        <span className="text-[9px] font-black uppercase bg-green-100 text-green-700 px-3 py-1 rounded-full shadow-sm">Approved</span>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-fade-in text-center">
                  <h4 className="font-black text-gray-800 uppercase tracking-widest text-xs mb-8 tracking-tighter">Visual Schedule Map</h4>
                  <div className="grid grid-cols-7 gap-2">
                     {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => <div key={idx} className="text-[9px] font-black text-gray-300 mb-2">{d}</div>)}
                     {Array.from({ length: 28 }).map((_, i) => (
                        <div key={i} className={`p-3 text-[10px] font-black rounded-xl transition-all ${i + 1 >= 20 && i + 1 <= 22 ? 'bg-indigo-700 text-white shadow-xl scale-110' : 'text-gray-300 hover:bg-gray-50'}`}>{i + 1}</div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

const CoveragePlanningScreen = ({ navigate }) => {
   const [step, setStep] = useState('planning');
   const [selectedDate, setSelectedDate] = useState('20 Feb 2026');
   const [coveringDoc, setCoveringDoc] = useState('');
   const [isBroadcasting, setIsBroadcasting] = useState(false);

   const handleConfirmCoverage = () => {
      if (!coveringDoc) return;
      setIsBroadcasting(true);
      setTimeout(() => {
         setIsBroadcasting(false);
         setStep('confirmed');
      }, 1500);
   };

   return (
      <div className="h-full flex flex-col bg-gray-50">
         <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
            <button onClick={() => navigate('dashboard')} className="p-2 -ml-2 text-gray-600 active:bg-gray-50 rounded-full transition-all"><ArrowLeft size={24} /></button>
            <div className="flex-1">
               <h2 className="text-xl font-bold">OPD Coverage</h2>
               <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest leading-none mt-1">Planned Transition</p>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-24">
            {step === 'planning' ? (
               <div className="space-y-6 animate-fade-in">
                  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block ml-1">ABSENCE DATE</label>
                     <div className="grid grid-cols-2 gap-3">
                        {['20 Feb', '21 Feb', '22 Feb', '23 Feb'].map(d => (
                           <button key={d} onClick={() => setSelectedDate(d + ' 2026')} className={`py-4 rounded-2xl border-2 font-black text-xs transition-all uppercase tracking-tighter ${selectedDate.includes(d) ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>
                              {d}
                           </button>
                        ))}
                     </div>
                  </div>
                  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block ml-1">ASSIGN CONSULTANT</label>
                     <div className="space-y-3">
                        {DOCTOR_LIST.map(doc => (
                           <div key={doc} onClick={() => setCoveringDoc(doc)} className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${coveringDoc === doc ? 'border-indigo-600 bg-indigo-50' : 'border-gray-50 bg-gray-50'}`}>
                              <span className={`text-[11px] font-black uppercase tracking-tighter ${coveringDoc === doc ? 'text-indigo-800' : 'text-gray-400'}`}>{doc}</span>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${coveringDoc === doc ? 'border-indigo-600' : 'border-gray-300'}`}>
                                 {coveringDoc === doc && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <button disabled={!coveringDoc || isBroadcasting} onClick={handleConfirmCoverage} className="w-full bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-gray-200">
                     {isBroadcasting ? <Activity size={20} className="animate-spin" /> : "Commit Coverage Plan"}
                  </button>
               </div>
            ) : (
               <div className="animate-fade-in flex flex-col items-center text-center py-10">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600 border-2 border-green-100 shadow-inner">
                     <ShieldCheck size={48} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tighter">PLAN COMMITTED</h2>
                  <p className="text-gray-500 text-sm font-medium mt-2 px-8">OPD slots for <span className="text-indigo-700 font-bold">{selectedDate}</span> are now managed by <span className="text-indigo-700 font-bold">{coveringDoc}</span>.</p>
                  <div className="mt-10 w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-left">
                     <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Broadcast Sync Status</h4>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full" /><span className="text-[11px] font-bold text-gray-700">Central HMS Updated</span></div>
                        <div className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full" /><span className="text-[11px] font-bold text-gray-700">Front Desk Notified</span></div>
                        <div className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full" /><span className="text-[11px] font-bold text-gray-700">Patient Redirection Enabled</span></div>
                     </div>
                  </div>
                  <button onClick={() => navigate('dashboard')} className="mt-12 text-indigo-700 font-black text-xs uppercase tracking-widest border-b-2 border-indigo-700 pb-0.5 active:opacity-50">Main Dashboard</button>
               </div>
            )}
         </div>
      </div>
   );
};

const RescheduleScreen = ({ navigate, appointments, selectedAppt, onReschedule }) => {
   const [step, setStep] = useState(selectedAppt ? 'slot' : 'patient');
   const [targetAppt, setTargetAppt] = useState(selectedAppt || null);
   const [selectedDate, setSelectedDate] = useState('18 Feb');
   const [selectedTime, setSelectedTime] = useState(null);
   const SLOTS = ["09:00 AM", "09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "04:00 PM"];
   const handleConfirm = () => { onReschedule(targetAppt.id, selectedDate, selectedTime); navigate('dashboard'); };
   return (
      <div className="h-full flex flex-col bg-gray-50">
         <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
            <button onClick={() => navigate('dashboard')} className="p-2 -ml-2 text-gray-600 active:bg-gray-50 rounded-full transition-all"><ArrowLeft size={24} /></button>
            <div className="flex-1"><h2 className="text-xl font-bold">Shift Schedule</h2><p className="text-xs text-red-600 font-bold uppercase tracking-widest mt-1">Manual Reassignment</p></div>
         </div>
         <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-24">
            {step === 'patient' ? (
               <div className="space-y-4 animate-fade-in">
                  <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mb-4 ml-1">Select Record to Shift</h3>
                  {appointments.filter(a => a.status !== 'Completed').map(appt => (
                     <div key={appt.id} onClick={() => { setTargetAppt(appt); setStep('slot'); }} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-700 font-black text-xs">{appt.patient.charAt(0)}</div>
                           <div><h4 className="font-bold text-gray-800 text-sm">{appt.patient}</h4><p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{appt.time} • {appt.uhid}</p></div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                     </div>
                  ))}
               </div>
            ) : (
               <div className="animate-fade-in space-y-6">
                  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Re-allocating</p>
                     <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl"><User size={22} /></div>
                        <div><h4 className="font-black text-gray-800 text-sm tracking-tight">{targetAppt?.patient}</h4><p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">SLOT: {targetAppt?.date} • {targetAppt?.time}</p></div>
                     </div>
                  </div>
                  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">New Date Selection</label>
                     <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {['18 Feb', '19 Feb', '20 Feb', '21 Feb'].map(d => (
                           <button key={d} onClick={() => setSelectedDate(d)} className={`px-4 py-3 rounded-2xl border-2 font-bold text-sm whitespace-nowrap transition-all ${selectedDate === d ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-gray-50 text-gray-400 bg-gray-50'}`}>{d}</button>
                        ))}
                     </div>
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Target Shift</label>
                     <div className="grid grid-cols-3 gap-3">
                        {SLOTS.map(s => (
                           <button key={s} onClick={() => setSelectedTime(s)} className={`py-3 rounded-xl border-2 font-bold text-[10px] transition-all tracking-tighter ${selectedTime === s ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-gray-100 bg-white text-gray-500'}`}>{s}</button>
                        ))}
                     </div>
                  </div>
                  <div className="bg-red-50 p-5 rounded-3xl border border-red-100">
                     <div className="flex items-center gap-2 mb-2 text-red-800 font-black text-[10px] uppercase tracking-widest"><AlertCircle size={14} /> Escalation Path</div>
                     <p className="text-[11px] text-red-700 font-bold leading-relaxed tracking-tight">System escalates to Admin for manual slot override if doctor initiated shift is not finalized immediately.</p>
                     <button onClick={() => navigate('dashboard')} className="mt-4 w-full py-3 bg-white border border-red-200 text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest active:bg-red-100 transition-all">Request Admin Override</button>
                  </div>
               </div>
            )}
         </div>
         {step === 'slot' && (
            <div className="p-4 bg-white border-t border-gray-100 shadow-2xl">
               <button disabled={!selectedTime} onClick={handleConfirm} className="w-full bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 disabled:bg-gray-200 transition-all">Finalize Reassignment</button>
            </div>
         )}
      </div>
   );
};

const RescheduleDashboardScreen = ({ navigate, appointments, onReschedule }) => (
   <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
         <button onClick={() => navigate('dashboard')} className="p-2 -ml-2 text-gray-600 active:bg-gray-50 rounded-full transition-all"><ArrowLeft size={24} /></button>
         <div className="flex-1">
            <h2 className="text-xl font-bold">Rescheduling</h2>
            <p className="text-xs text-red-600 font-bold uppercase tracking-widest leading-none mt-1">Slot Reassignment</p>
         </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-24">
         <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mb-4 ml-1 tracking-tighter">Current OPD Slots</h3>
         {appointments.map(appt => (
            <div key={appt.id} onClick={() => navigate('reschedule_action', appt)} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm mb-4 active:scale-[0.98] transition-all cursor-pointer">
               <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">{appt.date} • {appt.time}</span>
                  <ChevronRight size={16} className="text-gray-300" />
               </div>
               <h4 className="font-black text-gray-800 text-sm mb-1">{appt.patient}</h4>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{appt.uhid} • {appt.type}</p>
            </div>
         ))}
      </div>
   </div>
);

// --- Main Controller ---

export default function App() {
   const [screen, setScreen] = useState('splash');
   const [selectedData, setSelectedData] = useState(null);
   const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

   const handleReschedule = (apptId, newDate, newTime) => {
      setAppointments(prev => prev.map(appt =>
         appt.id === apptId ? { ...appt, date: newDate, time: newTime, status: 'Rescheduled' } : appt
      ));
   };

   const navigate = (to, data = null) => {
      if (data) setSelectedData(data);
      setScreen(to);
   };

   const renderScreen = () => {
      switch (screen) {
         case 'splash': return <SplashScreen onFinish={() => setScreen('login')} />;
         case 'login': return <LoginScreen onLogin={() => setScreen('otp')} />;
         case 'otp': return <OtpScreen onVerify={() => setScreen('dashboard')} />;
         case 'dashboard': return <Dashboard navigate={navigate} appointments={appointments} />;
         case 'schedule': return <ScheduleScreen navigate={navigate} appointments={appointments} />;
         case 'patient_detail': return <PatientDetailScreen navigate={navigate} patient={selectedData} />;
         case 'prescription': return <PrescriptionScreen navigate={navigate} patient={selectedData} />;
         case 'ipd': return <IpdScreen navigate={navigate} />;
         case 'discharge': return <DischargeSummaryScreen navigate={navigate} patient={selectedData} />;
         case 'leaves': return <LeaveManagerScreen navigate={navigate} />;
         case 'coverage': return <CoveragePlanningScreen navigate={navigate} />;
         case 'reschedule': return <RescheduleDashboardScreen navigate={navigate} appointments={appointments} onReschedule={handleReschedule} />;
         case 'reschedule_action': return <RescheduleScreen navigate={navigate} appointments={appointments} selectedAppt={selectedData} onReschedule={handleReschedule} />;
         case 'profile': return <ProfileScreen navigate={navigate} />;
         case 'search_patient': return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
               <button onClick={() => setScreen('dashboard')} className="absolute top-14 left-6 p-2.5 bg-white shadow-sm border border-gray-100 rounded-2xl text-indigo-700 active:bg-gray-100 transition-all"><ArrowLeft size={24} /></button>
               <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-700 shadow-sm border-2 border-white"><Settings className="animate-spin" size={40} /></div>
               <h2 className="text-xl font-black text-gray-800 mb-2 uppercase tracking-tighter">HMS SYNC POINT</h2>
               <p className="text-gray-400 text-sm font-medium px-8 leading-relaxed">Centralized Clinical System Module Integration in progress.</p>
            </div>
         );
         default: return <Dashboard navigate={navigate} appointments={appointments} />;
      }
   };

   return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center p-4 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
         <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; } 
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
         <div className="relative w-[380px] h-[800px] bg-black rounded-[55px] overflow-hidden ring-[10px] ring-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-50 flex items-center justify-center gap-3">
               <div className="w-16 h-4 bg-black rounded-full flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-[#1a1a1a] rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-[#333] rounded-full"></div>
               </div>
            </div>
            <div className="w-full h-full bg-white relative overflow-hidden flex flex-col">{renderScreen()}</div>
            {['dashboard', 'schedule', 'ipd', 'profile'].includes(screen) && (
               <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-8 py-4 pb-10 flex justify-between items-center z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                  <div onClick={() => setScreen('dashboard')} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${screen === 'dashboard' ? 'text-indigo-700 scale-105' : 'text-gray-300'}`}>
                     <Home size={24} strokeWidth={screen === 'dashboard' ? 3 : 2} />
                     <span className="text-[9px] font-black uppercase tracking-tighter">Main</span>
                  </div>
                  <div onClick={() => setScreen('schedule')} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${screen === 'schedule' ? 'text-indigo-700 scale-105' : 'text-gray-300'}`}>
                     <Calendar size={24} strokeWidth={screen === 'schedule' ? 3 : 2} />
                     <span className="text-[9px] font-black uppercase tracking-tighter">OPD</span>
                  </div>
                  <div onClick={() => setScreen('ipd')} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${screen === 'ipd' ? 'text-indigo-700 scale-105' : 'text-gray-300'}`}>
                     <BedDouble size={24} strokeWidth={screen === 'ipd' ? 3 : 2} />
                     <span className="text-[9px] font-black uppercase tracking-tighter">Census</span>
                  </div>
                  <div onClick={() => setScreen('profile')} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${screen === 'profile' ? 'text-indigo-700 scale-105' : 'text-gray-300'}`}>
                     <img src="https://cdn-icons-png.flaticon.com/128/3774/3774299.png" className={`w-6 h-6 object-contain transition-all ${screen === 'profile' ? 'opacity-100 drop-shadow-md' : 'opacity-40 grayscale'}`} alt="Profile" />
                     <span className="text-[9px] font-black uppercase tracking-tighter">Profile</span>
                  </div>
               </div>
            )}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black rounded-full z-50 opacity-10"></div>
         </div>
      </div>
   );
}