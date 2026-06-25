import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  X,
  Printer,
  Activity,
  UserPlus,
  Stethoscope,
  Calendar,
  Timer,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface QueuePatient {
  id: number
  token: string
  name: string
  age: number
  gender: string
  department: string
  doctor: string
  status: 'waiting' | 'in-progress' | 'completed' | 'urgent'
  checkInTime: string
  estimatedWait: string
  symptoms: string
  type: 'walk-in' | 'appointment'
}

const initialQueue: QueuePatient[] = [
  { id: 1, token: 'A001', name: 'Vikram Singh', age: 62, gender: 'Male', department: 'Cardiology', doctor: 'Dr. Rajesh Sharma', status: 'urgent', checkInTime: '9:02 AM', estimatedWait: 'Now', symptoms: 'Chest pain, palpitations', type: 'walk-in' },
  { id: 2, token: 'A002', name: 'Rahul Mehta', age: 45, gender: 'Male', department: 'Cardiology', doctor: 'Dr. Rajesh Sharma', status: 'in-progress', checkInTime: '9:05 AM', estimatedWait: 'Current', symptoms: 'Chest pain, SOB', type: 'appointment' },
  { id: 3, token: 'A003', name: 'Sunita Sharma', age: 34, gender: 'Female', department: 'Neurology', doctor: 'Dr. Priya Patel', status: 'waiting', checkInTime: '9:15 AM', estimatedWait: '~15 min', symptoms: 'Headache, dizziness', type: 'appointment' },
  { id: 4, token: 'A004', name: 'Amit Patel', age: 28, gender: 'Male', department: 'General Medicine', doctor: 'Dr. Amit Kumar', status: 'waiting', checkInTime: '9:22 AM', estimatedWait: '~25 min', symptoms: 'Fever, body ache', type: 'walk-in' },
  { id: 5, token: 'A005', name: 'Priya Gupta', age: 52, gender: 'Female', department: 'Orthopedics', doctor: 'Dr. Sneha Gupta', status: 'waiting', checkInTime: '9:30 AM', estimatedWait: '~35 min', symptoms: 'Joint pain, swelling', type: 'appointment' },
  { id: 6, token: 'A006', name: 'Neha Reddy', age: 29, gender: 'Female', department: 'General Medicine', doctor: 'Dr. Amit Kumar', status: 'waiting', checkInTime: '9:38 AM', estimatedWait: '~45 min', symptoms: 'Sore throat, cough', type: 'walk-in' },
  { id: 7, token: 'A007', name: 'Arjun Nair', age: 41, gender: 'Male', department: 'Gastroenterology', doctor: 'Dr. Vikram Rao', status: 'waiting', checkInTime: '9:42 AM', estimatedWait: '~50 min', symptoms: 'Abdominal pain', type: 'appointment' },
  { id: 8, token: 'A008', name: 'Kavita Joshi', age: 65, gender: 'Female', department: 'Cardiology', doctor: 'Dr. Rajesh Sharma', status: 'waiting', checkInTime: '9:48 AM', estimatedWait: '~55 min', symptoms: 'Follow-up BP check', type: 'appointment' },
]

const departments = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'General Medicine', 'Gastroenterology', 'Pediatrics']

export default function ReceptionModule() {
  const [queue, setQueue] = useState<QueuePatient[]>(initialQueue)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])

  const [newPatient, setNewPatient] = useState({
    name: '', age: '', gender: 'Male', phone: '', department: 'General Medicine', symptoms: '', type: 'walk-in' as 'walk-in' | 'appointment'
  })

  // Simulate live queue updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prev => prev.map(p => {
        if (p.status === 'waiting' && Math.random() > 0.95) {
          return { ...p, estimatedWait: p.estimatedWait.replace(/\d+/, (m: string) => Math.max(0, parseInt(m) - 1).toString()) }
        }
        return p
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleCheckIn = () => {
    if (!newPatient.name || !newPatient.age) return
    const token = `A${String(queue.length + 1).padStart(3, '0')}`
    const patient: QueuePatient = {
      id: queue.length + 1,
      token,
      name: newPatient.name,
      age: parseInt(newPatient.age),
      gender: newPatient.gender,
      department: newPatient.department,
      doctor: 'Dr. ' + (newPatient.department === 'Cardiology' ? 'Rajesh Sharma' : newPatient.department === 'Neurology' ? 'Priya Patel' : 'Amit Kumar'),
      status: 'waiting',
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedWait: `~${queue.length * 10} min`,
      symptoms: newPatient.symptoms,
      type: newPatient.type,
    }
    setQueue([...queue, patient])
    setNotifications([`${patient.name} checked in with token ${token}`, ...notifications])
    setShowCheckIn(false)
    setNewPatient({ name: '', age: '', gender: 'Male', phone: '', department: 'General Medicine', symptoms: '', type: 'walk-in' })
  }

  const handleStatusChange = (id: number, newStatus: QueuePatient['status']) => {
    setQueue(queue.map(p => p.id === id ? { ...p, status: newStatus } : p))
  }

  const filteredQueue = queue.filter(p => {
    const matchesDept = filter === 'All' || p.department === filter
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.token.toLowerCase().includes(search.toLowerCase())
    return matchesDept && matchesSearch
  })

  const stats = {
    waiting: queue.filter(p => p.status === 'waiting').length,
    inProgress: queue.filter(p => p.status === 'in-progress').length,
    completed: queue.filter(p => p.status === 'completed').length,
    urgent: queue.filter(p => p.status === 'urgent').length,
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'urgent': return <Badge className="bg-red-100 text-red-700 border-0 animate-pulse">URGENT</Badge>
      case 'in-progress': return <Badge className="bg-[#EAF6FF] text-[#0A4A6E] border-0">IN PROGRESS</Badge>
      case 'completed': return <Badge className="bg-[#E8F8F0] text-[#059669] border-0">DONE</Badge>
      default: return <Badge className="bg-gray-100 text-gray-600 border-0">WAITING</Badge>
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0A4A6E]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Reception Desk
          </h1>
          <p className="text-muted-foreground mt-1">Live queue management and patient check-in</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowCheckIn(true)}
            className="bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] text-white btn-3d rounded-xl"
          >
            <UserPlus className="w-4 h-4 mr-2" /> New Check-In
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Printer className="w-4 h-4 mr-2" /> Print Queue
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Waiting', value: stats.waiting, icon: Clock, color: 'text-gray-500', bg: 'bg-gray-50' },
          { label: 'In Progress', value: stats.inProgress, icon: Activity, color: 'text-[#0A4A6E]', bg: 'bg-[#EAF6FF]' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-[#34C98A]', bg: 'bg-[#E8F8F0]' },
          { label: 'Urgent', value: stats.urgent, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-2xl font-bold text-[#0A4A6E]">{stat.value}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {notifications.slice(0, 3).map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 bg-[#E8F8F0] rounded-xl"
              >
                <CheckCircle className="w-4 h-4 text-[#34C98A] flex-shrink-0" />
                <p className="text-sm text-[#0A4A6E]">{note}</p>
                <button onClick={() => setNotifications(notifications.filter((_, idx) => idx !== i))} className="ml-auto">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or token..."
            className="pl-10 rounded-xl"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {departments.map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                filter === d ? 'bg-[#0A4A6E] text-white' : 'bg-white text-muted-foreground hover:bg-gray-50'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Queue List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[#0A4A6E]">Live Queue ({filteredQueue.length})</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="w-4 h-4 text-[#34C98A] animate-pulse" />
            Live updates
          </div>
        </div>

        {filteredQueue.map((patient, i) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`glass-card rounded-2xl p-4 ${
              patient.status === 'urgent' ? 'ring-2 ring-red-400' :
              patient.status === 'in-progress' ? 'ring-2 ring-[#0A4A6E]' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Token */}
              <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
                patient.status === 'urgent' ? 'bg-red-100' :
                patient.status === 'in-progress' ? 'bg-[#EAF6FF]' :
                patient.status === 'completed' ? 'bg-[#E8F8F0]' : 'bg-gray-100'
              }`}>
                <span className={`text-[10px] ${
                  patient.status === 'urgent' ? 'text-red-500' :
                  patient.status === 'in-progress' ? 'text-[#0A4A6E]' :
                  patient.status === 'completed' ? 'text-[#34C98A]' : 'text-gray-500'
                }`}>TOKEN</span>
                <span className={`font-bold text-sm ${
                  patient.status === 'urgent' ? 'text-red-700' :
                  patient.status === 'in-progress' ? 'text-[#0A4A6E]' :
                  patient.status === 'completed' ? 'text-[#059669]' : 'text-gray-700'
                }`}>{patient.token}</span>
              </div>

              {/* Patient Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-[#0A4A6E]">{patient.name}</h4>
                  {getStatusBadge(patient.status)}
                  <Badge className="bg-gray-100 text-gray-600 border-0 text-[10px]">{patient.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{patient.age} yrs • {patient.gender}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Stethoscope className="w-3 h-3" /> {patient.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {patient.doctor}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{patient.symptoms}</p>
              </div>

              {/* Actions */}
              <div className="text-right flex-shrink-0 space-y-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {patient.checkInTime}
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Timer className="w-3 h-3" />
                  <span className={patient.estimatedWait === 'Now' ? 'text-red-500 font-medium' : 'text-muted-foreground'}>
                    {patient.estimatedWait}
                  </span>
                </div>
                <div className="flex gap-1">
                  {patient.status === 'waiting' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(patient.id, 'in-progress')}
                      className="bg-[#0A4A6E] text-white h-7 text-[10px] rounded-lg px-2"
                    >
                      Start
                    </Button>
                  )}
                  {patient.status === 'in-progress' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(patient.id, 'completed')}
                      className="bg-[#34C98A] text-white h-7 text-[10px] rounded-lg px-2"
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Check-in Modal */}
      <AnimatePresence>
        {showCheckIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowCheckIn(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">New Patient Check-In</h3>
                      <p className="text-white/70 text-sm">Walk-in or appointment registration</p>
                    </div>
                  </div>
                  <button onClick={() => setShowCheckIn(false)} className="text-white/70 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Patient Name *</label>
                    <Input
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      placeholder="Full name"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Age *</label>
                    <Input
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                      placeholder="Years"
                      type="number"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Gender</label>
                    <select
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                      className="w-full h-10 rounded-xl border border-input bg-transparent px-3 text-sm"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
                    <Input
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                      placeholder="Mobile number"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Department</label>
                  <select
                    value={newPatient.department}
                    onChange={(e) => setNewPatient({ ...newPatient, department: e.target.value })}
                    className="w-full h-10 rounded-xl border border-input bg-transparent px-3 text-sm"
                  >
                    {departments.filter(d => d !== 'All').map(d => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Symptoms / Reason</label>
                  <textarea
                    value={newPatient.symptoms}
                    onChange={(e) => setNewPatient({ ...newPatient, symptoms: e.target.value })}
                    placeholder="Brief description of symptoms"
                    className="w-full min-h-[80px] rounded-xl border border-input bg-transparent px-3 py-2 text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Patient Type</label>
                  <div className="flex gap-2">
                    {(['walk-in', 'appointment'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setNewPatient({ ...newPatient, type })}
                        className={`flex-1 py-2 rounded-xl text-sm capitalize transition-all ${
                          newPatient.type === type ? 'bg-[#0A4A6E] text-white' : 'bg-gray-50 text-muted-foreground hover:bg-gray-100'
                        }`}
                      >
                        {type === 'walk-in' ? 'Walk-In' : 'Appointment'}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleCheckIn}
                  disabled={!newPatient.name || !newPatient.age}
                  className="w-full bg-gradient-to-r from-[#34C98A] to-[#2DB57A] text-white btn-3d rounded-xl h-11"
                >
                  <CheckCircle className="w-4 h-4 mr-2" /> Complete Check-In
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
