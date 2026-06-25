import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Stethoscope,
  Brain,
  Shield,
  Sparkles,
  FileText,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Thermometer,
  Heart,
  Activity,
  Pill,
  FlaskConical,
  Calendar,
  X,
  Loader2,
  Printer,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const patients = [
  { id: 1, name: 'Rahul Mehta', age: 45, gender: 'Male', vitals: { bp: '140/90', hr: 88, temp: '98.6F', spo2: 98 }, symptoms: 'Chest pain, shortness of breath', waitTime: '5 min', status: 'urgent', queue: 1 },
  { id: 2, name: 'Sunita Sharma', age: 34, gender: 'Female', vitals: { bp: '120/80', hr: 72, temp: '99.2F', spo2: 99 }, symptoms: 'Persistent headache, dizziness', waitTime: '12 min', status: 'stable', queue: 2 },
  { id: 3, name: 'Amit Patel', age: 28, gender: 'Male', vitals: { bp: '118/78', hr: 65, temp: '101.2F', spo2: 97 }, symptoms: 'High fever, body ache, fatigue', waitTime: '18 min', status: 'moderate', queue: 3 },
  { id: 4, name: 'Priya Gupta', age: 52, gender: 'Female', vitals: { bp: '135/85', hr: 78, temp: '98.4F', spo2: 99 }, symptoms: 'Joint pain, knee swelling', waitTime: '25 min', status: 'stable', queue: 4 },
  { id: 5, name: 'Vikram Singh', age: 62, gender: 'Male', vitals: { bp: '150/95', hr: 92, temp: '98.8F', spo2: 96 }, symptoms: 'Chest tightness, palpitations', waitTime: '2 min', status: 'critical', queue: 0 },
]

function generateClinicalSummary(patient: any) {
  const summaries: Record<string, string> = {
    'Rahul Mehta': `Patient presents with chest pain and dyspnea. BP elevated at 140/90. Cardiac workup recommended including ECG and troponin levels. Differential: unstable angina, MI, pulmonary embolism.`,
    'Sunita Sharma': `Patient reports persistent frontal headache with dizziness. Vitals stable. No focal neurological deficits observed. Differential: tension headache, migraine, possible sinusitis. Consider CT if symptoms persist.`,
    'Amit Patel': `Patient presents with fever (101.2F), myalgia, and fatigue. Likely viral infection. Differential: influenza, COVID-19, dengue. Recommend CBC, viral panel, and supportive care.`,
    'Priya Gupta': `Patient with chronic joint pain and acute knee swelling. No trauma reported. Differential: osteoarthritis flare, gout, rheumatoid arthritis. Recommend X-ray, uric acid levels, rheumatoid factor.`,
    'Vikram Singh': `URGENT: Patient with chest tightness and palpitations. Hypertensive (150/95). History suggests cardiac involvement. Immediate ECG, cardiac enzymes, and cardiology consult required.`,
  }
  return summaries[patient.name] || `Patient ${patient.name} presents with ${patient.symptoms}. Vitals show BP ${patient.vitals.bp}, HR ${patient.vitals.hr}. Further evaluation recommended.`
}

function generatePrescription(patient: any) {
  const prescriptions: Record<string, any[]> = {
    'Rahul Mehta': [
      { medication: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days', notes: 'Antiplatelet therapy' },
      { medication: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime', duration: '30 days', notes: 'Cholesterol management' },
      { medication: 'Nitroglycerin', dosage: '0.4mg', frequency: 'Sublingual PRN', duration: 'As needed', notes: 'For chest pain emergencies' },
    ],
    'Sunita Sharma': [
      { medication: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '5 days', notes: 'For headache relief' },
      { medication: 'Prochlorperazine', dosage: '5mg', frequency: 'Twice daily', duration: '3 days', notes: 'For dizziness' },
    ],
    'Amit Patel': [
      { medication: 'Paracetamol', dosage: '650mg', frequency: 'Thrice daily', duration: '5 days', notes: 'For fever and body ache' },
      { medication: 'Oseltamivir', dosage: '75mg', frequency: 'Twice daily', duration: '5 days', notes: 'Antiviral if influenza confirmed' },
      { medication: 'Oral Rehydration', dosage: '1 sachet', frequency: 'Thrice daily', duration: '5 days', notes: 'Maintain hydration' },
    ],
    'Priya Gupta': [
      { medication: 'Diclofenac', dosage: '50mg', frequency: 'Twice daily', duration: '7 days', notes: 'Anti-inflammatory for joint pain' },
      { medication: 'Calcium + Vitamin D3', dosage: '500mg/1000IU', frequency: 'Once daily', duration: '30 days', notes: 'Bone health supplement' },
    ],
    'Vikram Singh': [
      { medication: 'Aspirin', dosage: '325mg', frequency: 'Once (loading dose)', duration: 'Today', notes: 'Immediate cardiac protection' },
      { medication: 'Clopidogrel', dosage: '75mg', frequency: 'Once daily', duration: '30 days', notes: 'Dual antiplatelet therapy' },
      { medication: 'Metoprolol', dosage: '25mg', frequency: 'Twice daily', duration: '30 days', notes: 'Rate control and BP management' },
      { medication: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily at bedtime', duration: '30 days', notes: 'High-intensity statin' },
    ],
  }
  return prescriptions[patient.name] || [
    { medication: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '5 days', notes: 'Symptomatic relief' },
  ]
}

const investigations: Record<string, string[]> = {
  'Rahul Mehta': ['ECG', 'Troponin I & T', 'Chest X-Ray', 'Echocardiogram'],
  'Sunita Sharma': ['CBC', 'CT Head (if persistent)', 'Vision Testing'],
  'Amit Patel': ['CBC', 'COVID-19 RT-PCR', 'Dengue NS1', 'Liver Function Test'],
  'Priya Gupta': ['X-Ray Knee (AP/Lateral)', 'Serum Uric Acid', 'Rheumatoid Factor', 'CRP'],
  'Vikram Singh': ['ECG (STAT)', 'Troponin (STAT)', 'Chest X-Ray', 'Echocardiogram', 'Cardiology Consult'],
}

export default function DoctorModule() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'queue' | 'consult' | 'prescription'>('queue')
  const [clinicalSummary, setClinicalSummary] = useState('')
  const [prescription, setPrescription] = useState<any[]>([])
  const [notes, setNotes] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient)
    setClinicalSummary('')
    setPrescription([])
    setNotes('')
    setActiveTab('consult')
  }

  const handleGenerateSummary = async () => {
    if (!selectedPatient) return
    setIsGenerating(true)
    await new Promise(r => setTimeout(r, 1200))
    const summary = generateClinicalSummary(selectedPatient)
    setClinicalSummary(summary)
    setIsGenerating(false)
  }

  const handleGeneratePrescription = async () => {
    if (!selectedPatient) return
    setIsGenerating(true)
    await new Promise(r => setTimeout(r, 1500))
    const rx = generatePrescription(selectedPatient)
    setPrescription(rx)
    setIsGenerating(false)
    setActiveTab('prescription')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-700'
      case 'urgent': return 'bg-orange-100 text-orange-700'
      case 'moderate': return 'bg-[#FFF8E7] text-[#D97706]'
      default: return 'bg-[#E8F8F0] text-[#059669]'
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0A4A6E]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Doctor Workstation
          </h1>
          <p className="text-muted-foreground mt-1">AI-assisted clinical decision support</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-[#E8F8F0] text-[#34C98A] border-0 px-3 py-1">
            <Stethoscope className="w-3 h-3 mr-1" /> {patients.length} in Queue
          </Badge>
          <Badge className="bg-[#FFE4E1] text-red-600 border-0 px-3 py-1">
            <AlertTriangle className="w-3 h-3 mr-1" /> 1 Critical
          </Badge>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* QUEUE VIEW */}
        {activeTab === 'queue' && (
          <motion.div
            key="queue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Alert Banner */}
            <AnimatePresence>
              {showAlert && patients.some(p => p.status === 'critical') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-4 text-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Critical Patient Alert</p>
                      <p className="text-sm text-white/80">Vikram Singh - Chest tightness with palpitations requires immediate attention</p>
                    </div>
                  </div>
                  <button onClick={() => setShowAlert(false)} className="text-white/80 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Patient Queue */}
            <div className="grid gap-3">
              {patients.map((patient, i) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleSelectPatient(patient)}
                  className="glass-card rounded-2xl p-5 card-3d cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      patient.status === 'critical' ? 'bg-red-100' :
                      patient.status === 'urgent' ? 'bg-orange-100' :
                      patient.status === 'moderate' ? 'bg-[#FFF8E7]' : 'bg-[#E8F8F0]'
                    }`}>
                      <span className={`font-bold ${
                        patient.status === 'critical' ? 'text-red-600' :
                        patient.status === 'urgent' ? 'text-orange-600' :
                        patient.status === 'moderate' ? 'text-[#D97706]' : 'text-[#059669]'
                      }`}>#{patient.queue}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#0A4A6E]">{patient.name}</h3>
                        <Badge className={`${getStatusColor(patient.status)} border-0 text-[10px]`}>
                          {patient.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{patient.age} yrs • {patient.gender} • {patient.symptoms}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Heart className="w-3 h-3" /> {patient.vitals.hr} bpm
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Activity className="w-3 h-3" /> BP {patient.vitals.bp}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Thermometer className="w-3 h-3" /> {patient.vitals.temp}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm text-muted-foreground">Wait</p>
                      <p className={`font-semibold ${patient.waitTime === '2 min' ? 'text-red-500' : 'text-[#0A4A6E]'}`}>
                        {patient.waitTime}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CONSULTATION VIEW */}
        {activeTab === 'consult' && selectedPatient && (
          <motion.div
            key="consult"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Patient Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A4A6E] to-[#34C98A] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{selectedPatient.name.split(' ').map((n: string) => n[0]).join('')}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#0A4A6E]">{selectedPatient.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedPatient.age} years • {selectedPatient.gender}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setActiveTab('queue')} className="rounded-xl">
                Back to Queue
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Vitals */}
              <Card className="glass-card border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Vitals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#FFE4E1] rounded-xl">
                    <span className="text-sm">Blood Pressure</span>
                    <span className="font-semibold text-[#DC2626]">{selectedPatient.vitals.bp}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#EAF6FF] rounded-xl">
                    <span className="text-sm">Heart Rate</span>
                    <span className="font-semibold text-[#0A4A6E]">{selectedPatient.vitals.hr} bpm</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#FFF8E7] rounded-xl">
                    <span className="text-sm">Temperature</span>
                    <span className="font-semibold text-[#D97706]">{selectedPatient.vitals.temp}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#E8F8F0] rounded-xl">
                    <span className="text-sm">SpO2</span>
                    <span className="font-semibold text-[#059669]">{selectedPatient.vitals.spo2}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* AI Clinical Summary */}
              <Card className="glass-card border-0 lg:col-span-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                      <Brain className="w-4 h-4 text-[#8B5CF6]" /> AI Clinical Summary
                    </CardTitle>
                    {!clinicalSummary && (
                      <Button
                        size="sm"
                        onClick={handleGenerateSummary}
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-lg h-8 text-xs"
                      >
                        {isGenerating ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                        Generate
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {clinicalSummary ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-[#F0EEFF] rounded-xl">
                        <p className="text-sm text-[#0A4A6E] leading-relaxed">{clinicalSummary}</p>
                      </div>

                      {/* Differential Diagnosis */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Differential Diagnosis</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedPatient.name === 'Vikram Singh' ? (
                            <>
                              <Badge className="bg-red-100 text-red-700 border-0">Acute Coronary Syndrome</Badge>
                              <Badge className="bg-[#FFF8E7] text-[#D97706] border-0">Arrhythmia</Badge>
                              <Badge className="bg-[#EAF6FF] text-[#0A4A6E] border-0">Hypertensive Crisis</Badge>
                            </>
                          ) : (
                            <>
                              <Badge className="bg-[#EAF6FF] text-[#0A4A6E] border-0">Primary Diagnosis A</Badge>
                              <Badge className="bg-[#FFF8E7] text-[#D97706] border-0">Secondary Differential</Badge>
                              <Badge className="bg-[#E8F8F0] text-[#059669] border-0">Ruling Out</Badge>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Drug Interactions */}
                      <div className="flex items-start gap-2 p-3 bg-[#FFF8E7]/50 rounded-xl">
                        <Shield className="w-4 h-4 text-[#F5A623] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-[#0A4A6E]">AI Safety Check</p>
                          <p className="text-xs text-muted-foreground mt-0.5">No known drug interactions. Allergies: NKDA. Monitor BP closely.</p>
                        </div>
                      </div>

                      {/* Investigations */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Recommended Investigations</p>
                        <div className="flex flex-wrap gap-2">
                          {(investigations[selectedPatient.name] || ['CBC', 'Basic Metabolic Panel']).map((test) => (
                            <Badge key={test} variant="outline" className="text-[10px]">
                              <FlaskConical className="w-3 h-3 mr-1" />{test}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Brain className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                      <p className="text-sm">Click "Generate" to get AI clinical summary</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Consultation Notes */}
            <Card className="glass-card border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Consultation Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter your clinical observations and notes..."
                  className="min-h-[120px] rounded-xl border-[#0A4A6E]/10"
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleGeneratePrescription}
                disabled={isGenerating || !clinicalSummary}
                className="bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] text-white btn-3d rounded-xl px-6"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Pill className="w-4 h-4 mr-2" />}
                Generate Prescription
              </Button>
              <Button variant="outline" className="rounded-xl">
                <FileText className="w-4 h-4 mr-2" /> Save Notes
              </Button>
            </div>
          </motion.div>
        )}

        {/* PRESCRIPTION VIEW */}
        {activeTab === 'prescription' && selectedPatient && (
          <motion.div
            key="prescription"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            {/* Prescription Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#34C98A] to-[#2DB57A] flex items-center justify-center">
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#0A4A6E]">Prescription</h2>
                  <p className="text-xs text-muted-foreground">{selectedPatient.name} • {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Printer className="w-4 h-4 mr-1" /> Print
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Download className="w-4 h-4 mr-1" /> PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('consult')} className="rounded-lg">
                  Back
                </Button>
              </div>
            </div>

            {/* Prescription Card */}
            <Card className="glass-card border-0 shadow-xl">
              <CardContent className="p-6 space-y-6">
                {/* Patient Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Patient</p>
                    <p className="text-sm font-medium text-[#0A4A6E]">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Age/Gender</p>
                    <p className="text-sm font-medium text-[#0A4A6E]">{selectedPatient.age} / {selectedPatient.gender}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Date</p>
                    <p className="text-sm font-medium text-[#0A4A6E]">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Doctor</p>
                    <p className="text-sm font-medium text-[#0A4A6E]">Dr. Current User</p>
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <h3 className="font-semibold text-[#0A4A6E] mb-3 flex items-center gap-2">
                    <Pill className="w-4 h-4" /> Prescribed Medications
                  </h3>
                  <div className="space-y-3">
                    {prescription.map((med, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-[#EAF6FF] rounded-xl"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-[#0A4A6E]">{med.medication} <span className="text-sm font-normal text-muted-foreground">{med.dosage}</span></p>
                            <p className="text-sm text-muted-foreground mt-1">{med.frequency} • {med.duration}</p>
                          </div>
                          <Badge className="bg-white text-[#0A4A6E] border-0 text-[10px]">Rx {i + 1}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic">{med.notes}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Investigations */}
                <div>
                  <h3 className="font-semibold text-[#0A4A6E] mb-3 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4" /> Investigations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(investigations[selectedPatient.name] || []).map((test) => (
                      <Badge key={test} className="bg-[#F0EEFF] text-[#7C3AED] border-0 px-3 py-1">
                        {test}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Follow Up */}
                <div className="p-4 bg-[#FFF8E7] rounded-xl">
                  <h3 className="font-semibold text-[#0A4A6E] mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Follow Up
                  </h3>
                  <p className="text-sm text-muted-foreground">Review in 1 week or earlier if symptoms worsen. Emergency contact: +91 98765 43210</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-[#34C98A] to-[#2DB57A] text-white btn-3d rounded-xl">
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve & Send
                  </Button>
                  <Button variant="outline" className="rounded-xl">Edit</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
