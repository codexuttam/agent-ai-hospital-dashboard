import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Sparkles,
  Stethoscope,
  Clock,
  Calendar,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Heart,
  Thermometer,
  Activity,
  FileText,
  Loader2,
  Star,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/* ─── Mock AI Triage ─── */
function mockTriageSymptoms(symptoms: string) {
  const lower = symptoms.toLowerCase()
  let severity: 'High' | 'Medium' | 'Low' = 'Low'
  let department = 'General Medicine'
  let urgency = 'Routine'
  let summary = 'Mild symptoms detected. General consultation recommended.'

  if (lower.includes('chest pain') || lower.includes('breathing') || lower.includes('heart')) {
    severity = 'High'
    department = 'Cardiology'
    urgency = 'Immediate'
    summary = 'Potential cardiac symptoms detected. Urgent cardiology evaluation required.'
  } else if (lower.includes('headache') || lower.includes('migraine') || lower.includes('dizzy')) {
    severity = 'Medium'
    department = 'Neurology'
    urgency = 'Same Day'
    summary = 'Neurological symptoms present. Same-day neurology consultation advised.'
  } else if (lower.includes('fever') || lower.includes('cold') || lower.includes('cough')) {
    severity = lower.includes('high fever') ? 'Medium' : 'Low'
    department = 'General Medicine'
    urgency = severity === 'Medium' ? 'Same Day' : 'Routine'
    summary = `Respiratory symptoms detected. ${severity === 'Medium' ? 'Prompt' : 'Routine'} evaluation recommended.`
  } else if (lower.includes('fracture') || lower.includes('bone') || lower.includes('joint')) {
    severity = 'Medium'
    department = 'Orthopedics'
    urgency = 'Same Day'
    summary = 'Musculoskeletal symptoms detected. Orthopedic evaluation needed.'
  } else if (lower.includes('stomach') || lower.includes('abdominal') || lower.includes('digestion')) {
    severity = 'Medium'
    department = 'Gastroenterology'
    urgency = 'Same Day'
    summary = 'Gastrointestinal symptoms present. GI specialist consultation recommended.'
  }

  return { severity, department, urgency, summary, symptoms }
}

const quickSymptoms = [
  { label: 'Chest Pain', icon: Heart, color: 'bg-[#FFE4E1] text-[#DC2626]' },
  { label: 'Headache', icon: Brain, color: 'bg-[#F0EEFF] text-[#7C3AED]' },
  { label: 'Fever', icon: Thermometer, color: 'bg-[#FFF8E7] text-[#D97706]' },
  { label: 'Cold/Cough', icon: Activity, color: 'bg-[#EAF6FF] text-[#0A4A6E]' },
]

const doctors = [
  { id: 1, name: 'Dr. Rajesh Sharma', specialty: 'Cardiology', rating: 4.9, experience: '18 years', patients: 1240, available: true, nextSlot: '10:30 AM', image: 'RS' },
  { id: 2, name: 'Dr. Priya Patel', specialty: 'Neurology', rating: 4.8, experience: '15 years', patients: 980, available: true, nextSlot: '11:00 AM', image: 'PP' },
  { id: 3, name: 'Dr. Amit Kumar', specialty: 'General Medicine', rating: 4.7, experience: '12 years', patients: 1560, available: true, nextSlot: '9:45 AM', image: 'AK' },
  { id: 4, name: 'Dr. Sneha Gupta', specialty: 'Orthopedics', rating: 4.9, experience: '14 years', patients: 890, available: false, nextSlot: '2:00 PM', image: 'SG' },
  { id: 5, name: 'Dr. Vikram Rao', specialty: 'Gastroenterology', rating: 4.6, experience: '10 years', patients: 760, available: true, nextSlot: '12:15 PM', image: 'VR' },
  { id: 6, name: 'Dr. Anjali Desai', specialty: 'Pediatrics', rating: 4.9, experience: '16 years', patients: 2100, available: true, nextSlot: '10:00 AM', image: 'AD' },
]

const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM']

export default function PatientModule() {
  const [view, setView] = useState<'home' | 'triage' | 'doctors' | 'booking' | 'confirmed'>('home')
  const [symptoms, setSymptoms] = useState('')
  const [triageResult, setTriageResult] = useState<any>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('All')

  const handleTriage = async () => {
    if (!symptoms.trim()) return
    setIsAnalyzing(true)
    await new Promise(r => setTimeout(r, 1500))
    const result = mockTriageSymptoms(symptoms)
    setTriageResult(result)
    setIsAnalyzing(false)
    setView('triage')
  }

  const handleQuickSymptom = (label: string) => {
    setSymptoms(label)
  }

  const filteredDoctors = doctors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = specialtyFilter === 'All' || d.specialty === specialtyFilter
    return matchesSearch && matchesSpecialty
  })

  const specialties = ['All', ...Array.from(new Set(doctors.map(d => d.specialty)))]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0A4A6E]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Patient Portal
          </h1>
          <p className="text-muted-foreground mt-1">AI-powered symptom checking and appointment booking</p>
        </div>
        <Badge className="bg-[#EAF6FF] text-[#0A4A6E] border-0 px-3 py-1">
          <Sparkles className="w-3 h-3 mr-1" /> AI Enabled
        </Badge>
      </div>

      <AnimatePresence mode="wait">
        {/* HOME VIEW */}
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* AI Symptom Checker Card */}
            <Card className="glass-card border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">AI Symptom Checker</h2>
                    <p className="text-white/70 text-sm">Describe your symptoms for instant AI triage</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                {/* Quick Symptoms */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-3">Quick select common symptoms:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickSymptoms.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => handleQuickSymptom(s.label)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                          symptoms === s.label ? s.color + ' ring-2 ring-offset-1' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <s.icon className="w-4 h-4" />
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symptom Input */}
                <div className="flex gap-3">
                  <Textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Describe your symptoms in detail... (e.g., 'I have been experiencing chest pain and shortness of breath for 2 days')"
                    className="flex-1 min-h-[100px] rounded-xl border-[#0A4A6E]/10 focus:border-[#0A4A6E]/30 resize-none"
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={handleTriage}
                    disabled={!symptoms.trim() || isAnalyzing}
                    className="bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] hover:from-[#0D5A82] hover:to-[#0A4A6E] text-white btn-3d rounded-xl px-6"
                  >
                    {isAnalyzing ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                    ) : (
                      <><Sparkles className="w-4 h-4 mr-2" /> Check Symptoms</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setView('doctors')}
                className="glass-card rounded-2xl p-5 cursor-pointer card-3d bg-gradient-to-br from-[#EAF6FF] to-white"
              >
                <Stethoscope className="w-8 h-8 text-[#0A4A6E] mb-3" />
                <h3 className="font-semibold text-[#0A4A6E]">Find a Doctor</h3>
                <p className="text-sm text-muted-foreground mt-1">Browse specialists and book appointments</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-5 cursor-pointer card-3d bg-gradient-to-br from-[#E8F8F0] to-white"
              >
                <Calendar className="w-8 h-8 text-[#34C98A] mb-3" />
                <h3 className="font-semibold text-[#0A4A6E]">My Appointments</h3>
                <p className="text-sm text-muted-foreground mt-1">View upcoming and past appointments</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-5 cursor-pointer card-3d bg-gradient-to-br from-[#FFF8E7] to-white"
              >
                <FileText className="w-8 h-8 text-[#F5A623] mb-3" />
                <h3 className="font-semibold text-[#0A4A6E]">Medical Records</h3>
                <p className="text-sm text-muted-foreground mt-1">Access your health history and reports</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* TRIAGE RESULT VIEW */}
        {view === 'triage' && triageResult && (
          <motion.div
            key="triage"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Triage Result Card */}
            <Card className={`glass-card border-0 shadow-xl overflow-hidden ${
              triageResult.severity === 'High' ? 'ring-2 ring-red-400' : 
              triageResult.severity === 'Medium' ? 'ring-2 ring-[#F5A623]' : ''
            }`}>
              <div className={`p-6 ${
                triageResult.severity === 'High' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                triageResult.severity === 'Medium' ? 'bg-gradient-to-r from-[#F5A623] to-[#E09420]' :
                'bg-gradient-to-r from-[#34C98A] to-[#2DB57A]'
              } text-white`}>
                <div className="flex items-center gap-3">
                  {triageResult.severity === 'High' ? <AlertTriangle className="w-6 h-6" /> : 
                   triageResult.severity === 'Medium' ? <Clock className="w-6 h-6" /> :
                   <CheckCircle className="w-6 h-6" />}
                  <div>
                    <h2 className="font-semibold text-lg">AI Triage Result: {triageResult.severity} Severity</h2>
                    <p className="text-white/80 text-sm">Based on your reported symptoms</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#EAF6FF] rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Department</p>
                    <p className="text-lg font-semibold text-[#0A4A6E] mt-1">{triageResult.department}</p>
                  </div>
                  <div className={`rounded-xl p-4 ${
                    triageResult.severity === 'High' ? 'bg-[#FFE4E1] text-[#DC2626]' :
                    triageResult.severity === 'Medium' ? 'bg-[#FFF8E7] text-[#D97706]' :
                    'bg-[#E8F8F0] text-[#059669]'
                  }`}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Urgency</p>
                    <p className="text-lg font-semibold mt-1">{triageResult.urgency}</p>
                  </div>
                  <div className="bg-[#F0EEFF] rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Symptoms</p>
                    <p className="text-lg font-semibold text-[#7C3AED] mt-1">{triageResult.symptoms}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Clinical Summary</p>
                  <p className="text-sm text-[#0A4A6E]">{triageResult.summary}</p>
                </div>

                {/* AI Recommendations */}
                <div className="flex items-start gap-3 bg-[#FFF8E7]/50 rounded-xl p-4">
                  <Sparkles className="w-5 h-5 text-[#F5A623] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#0A4A6E]">AI Recommendation</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on your symptoms, we recommend consulting with a {triageResult.department} specialist. 
                      {triageResult.severity === 'High' ? ' Please visit the emergency department or book an urgent appointment immediately.' :
                       triageResult.severity === 'Medium' ? ' Please book a same-day appointment for proper evaluation.' :
                       ' You can book a routine appointment at your convenience.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setView('doctors')}
                    className="bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] hover:from-[#0D5A82] hover:to-[#0A4A6E] text-white btn-3d rounded-xl px-6"
                  >
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Find {triageResult.department} Doctor
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { setView('home'); setSymptoms(''); setTriageResult(null) }}
                    className="rounded-xl"
                  >
                    Check Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* DOCTORS LIST VIEW */}
        {view === 'doctors' && (
          <motion.div
            key="doctors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors by name or specialty..."
                  className="pl-10 rounded-xl"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {specialties.map(s => (
                  <button
                    key={s}
                    onClick={() => setSpecialtyFilter(s)}
                    className={`px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                      specialtyFilter === s ? 'bg-[#0A4A6E] text-white' : 'bg-white text-muted-foreground hover:bg-gray-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Doctor Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredDoctors.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-5 card-3d cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => { setSelectedDoctor(doc); setView('booking') }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A4A6E] to-[#34C98A] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{doc.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[#0A4A6E]">{doc.name}</h3>
                        {doc.available ? (
                          <Badge className="bg-[#34C98A]/10 text-[#34C98A] border-0 text-[10px]">Available</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-500 border-0 text-[10px]">Busy</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                          {doc.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">{doc.experience}</span>
                        <span className="text-xs text-muted-foreground">{doc.patients.toLocaleString()} patients</span>
                      </div>
                      {doc.available && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-[#34C98A]">
                          <Clock className="w-3 h-3" />
                          Next available: {doc.nextSlot}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setView('home')}
              className="rounded-xl"
            >
              Back to Symptom Checker
            </Button>
          </motion.div>
        )}

        {/* BOOKING VIEW */}
        {view === 'booking' && selectedDoctor && (
          <motion.div
            key="booking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            <Card className="glass-card border-0 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0A4A6E] to-[#34C98A] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{selectedDoctor.image}</span>
                  </div>
                  <div>
                    <CardTitle className="text-xl text-[#0A4A6E]">{selectedDoctor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.specialty} • {selectedDoctor.experience}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                      <span className="text-sm font-medium">{selectedDoctor.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="text-sm font-medium text-[#0A4A6E] mb-3 block">Select Date</label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                      const date = `${20 + i} Jun`
                      const isSelected = selectedDate === date
                      const isWeekend = day === 'Sat' || day === 'Sun'
                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(date)}
                          disabled={isWeekend}
                          className={`p-2 rounded-xl text-center transition-all ${
                            isSelected ? 'bg-[#0A4A6E] text-white shadow-lg' :
                            isWeekend ? 'bg-gray-50 text-gray-300 cursor-not-allowed' :
                            'bg-white hover:bg-[#EAF6FF] text-[#0A4A6E]'
                          }`}
                        >
                          <p className="text-[10px]">{day}</p>
                          <p className="text-sm font-semibold">{20 + i}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="text-sm font-medium text-[#0A4A6E] mb-3 block">Select Time Slot</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 rounded-xl text-sm transition-all ${
                            selectedTime === time ? 'bg-[#0A4A6E] text-white shadow-lg' : 'bg-white hover:bg-[#EAF6FF] text-[#0A4A6E]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Confirm Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setView('confirmed')}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 bg-gradient-to-r from-[#34C98A] to-[#2DB57A] hover:from-[#2DB57A] hover:to-[#34C98A] text-white btn-3d rounded-xl h-12"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Appointment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setView('doctors')}
                    className="rounded-xl"
                  >
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* CONFIRMED VIEW */}
        {view === 'confirmed' && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#34C98A] to-[#2DB57A] flex items-center justify-center mb-6 shadow-xl"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-[#0A4A6E] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Appointment Confirmed!
            </h2>
            <p className="text-muted-foreground max-w-md">
              Your appointment with <strong>{selectedDoctor?.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been booked.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => { setView('home'); setSelectedDoctor(null); setSelectedDate(''); setSelectedTime(''); setSymptoms(''); setTriageResult(null) }}
                className="bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] text-white btn-3d rounded-xl"
              >
                Book Another
              </Button>
              <Button
                variant="outline"
                onClick={() => setView('home')}
                className="rounded-xl"
              >
                Go Home
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
