import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  ClipboardList,
  BarChart3,
  Bot,
  Home,
  ChevronLeft,
  ChevronRight,
  Activity,
  Clock,
  Heart,
  Brain,
  Sparkles,
  Menu,
  X
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import LandingPage from './sections/LandingPage'
import PatientModule from './sections/PatientModule'
import DoctorModule from './sections/DoctorModule'
import ReceptionModule from './sections/ReceptionModule'
import AdminModule from './sections/AdminModule'
import AIChatModule from './sections/AIChatModule'

type Page = 'landing' | 'dashboard' | 'patient' | 'doctor' | 'reception' | 'admin' | 'chat'

const navItems: { id: Page; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patient', label: 'Patient', icon: Users, badge: 'AI' },
  { id: 'doctor', label: 'Doctor', icon: Stethoscope, badge: 'AI' },
  { id: 'reception', label: 'Reception', icon: ClipboardList },
  { id: 'admin', label: 'Admin', icon: BarChart3 },
  { id: 'chat', label: 'AI Assistant', icon: Bot, badge: 'LIVE' },
]

const quickStats = [
  { label: 'Doctors On Duty', value: '24', icon: Stethoscope, color: 'text-teal' },
  { label: 'Patients Today', value: '186', icon: Users, color: 'text-saffron' },
  { label: 'Avg Wait Time', value: '12m', icon: Clock, color: 'text-mint' },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigateTo = (page: Page) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />
      case 'patient':
        return <PatientModule />
      case 'doctor':
        return <DoctorModule />
      case 'reception':
        return <ReceptionModule />
      case 'admin':
        return <AdminModule />
      case 'chat':
        return <AIChatModule />
      default:
        return <DashboardOverview onNavigate={navigateTo} />
    }
  }

  return (
    <div className="min-h-screen bg-sky-soft">
      {/* Landing Page - Full Screen */}
      {currentPage === 'landing' && (
        <LandingPage onNavigate={navigateTo} />
      )}

      {/* Dashboard Pages */}
      {currentPage !== 'landing' && (
        <div className="flex h-screen overflow-hidden">
          {/* Desktop Sidebar */}
          <motion.aside
            initial={false}
            animate={{ width: sidebarCollapsed ? 80 : 260 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="glass-sidebar hidden lg:flex flex-col h-screen fixed left-0 top-0 z-50"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5A623] to-[#E09420] flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <h1 className="text-white font-semibold text-sm tracking-wide whitespace-nowrap" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Shreekrishna
                  </h1>
                  <p className="text-white/50 text-[10px] tracking-wider uppercase">Hospital AI OS</p>
                </motion.div>
              )}
            </div>

            {/* Quick Stats */}
            {!sidebarCollapsed && (
              <div className="px-4 py-3 border-b border-white/10">
                <div className="grid grid-cols-3 gap-2">
                  {quickStats.map((stat) => (
                    <div key={stat.label} className="text-center p-2 rounded-lg bg-white/5">
                      <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color === 'text-teal' ? 'text-[#5BC0BE]' : stat.color === 'text-saffron' ? 'text-[#F5A623]' : 'text-[#34C98A]'}`} />
                      <p className="text-white font-bold text-sm">{stat.value}</p>
                      <p className="text-white/40 text-[9px]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`sidebar-item w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all ${
                    currentPage === item.id
                      ? 'active text-[#F5A623]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>
                      {item.badge && (
                        <Badge className="text-[9px] px-1.5 py-0 bg-[#F5A623]/20 text-[#F5A623] border-0">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </button>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-white/10">
              <button
                onClick={() => navigateTo('landing')}
                className="sidebar-item w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white"
              >
                <Home className="w-5 h-5" />
                {!sidebarCollapsed && <span>Back to Home</span>}
              </button>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="sidebar-item w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/50 hover:text-white mt-1"
              >
                {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                {!sidebarCollapsed && <span>Collapse</span>}
              </button>
            </div>
          </motion.aside>

          {/* Mobile Header */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-dark h-14 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F5A623] to-[#E09420] flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                Shreekrishna
              </span>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="lg:hidden fixed inset-0 z-40 glass-sidebar pt-14"
              >
                <nav className="p-4 space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
                        currentPage === item.id
                          ? 'bg-[#F5A623]/20 text-[#F5A623]'
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge className="text-[9px] px-1.5 py-0 bg-[#F5A623]/20 text-[#F5A623] border-0">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  ))}
                  <button
                    onClick={() => navigateTo('landing')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/5"
                  >
                    <Home className="w-5 h-5" />
                    <span>Back to Home</span>
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main
            className="flex-1 overflow-y-auto custom-scrollbar lg:ml-0"
            style={{ marginLeft: sidebarCollapsed ? '80px' : '260px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="p-4 lg:p-8 pt-16 lg:pt-8 min-h-screen"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      )}
    </div>
  )
}

/* Dashboard Overview */
function DashboardOverview({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0A4A6E]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Hospital Overview
          </h1>
          <p className="text-muted-foreground mt-1">Real-time operations dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-[#34C98A]/10 text-[#34C98A] border-0 px-3 py-1">
            <Activity className="w-3 h-3 mr-1" /> System Online
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients Today', value: '186', change: '+12%', icon: Users, color: 'from-[#0A4A6E] to-[#0D5A82]', bgColor: 'bg-teal-soft' },
          { label: 'Active Doctors', value: '24', change: '+3', icon: Stethoscope, color: 'from-[#34C98A] to-[#2DB57A]', bgColor: 'bg-mint-soft' },
          { label: 'Appointments', value: '142', change: '+8%', icon: ClipboardList, color: 'from-[#F5A623] to-[#E09420]', bgColor: 'bg-gold-soft' },
          { label: 'Revenue Today', value: '₹4.2L', change: '+15%', icon: BarChart3, color: 'from-[#8B5CF6] to-[#7C3AED]', bgColor: 'bg-lavender-soft' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass-card rounded-2xl p-5 card-3d cursor-pointer ${stat.bgColor}`}
            onClick={() => onNavigate('admin')}
          >
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-white/60 text-[#34C98A] border-0 text-[10px]">{stat.change}</Badge>
            </div>
            <p className="text-2xl font-bold text-[#0A4A6E] mt-3">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Access Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 card-3d cursor-pointer bg-gradient-to-br from-[#EAF6FF] to-white"
          onClick={() => onNavigate('patient')}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A4A6E] to-[#0D5A82] flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0A4A6E]">Patient Module</h3>
              <p className="text-xs text-muted-foreground">AI Symptom Check & Booking</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Queue Position</span>
              <span className="font-medium text-[#0A4A6E]">#12</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Est. Wait Time</span>
              <span className="font-medium text-[#34C98A]">~15 mins</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs text-[#F5A623]">AI Triage Available</span>
          </div>
        </motion.div>

        {/* Doctor Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 card-3d cursor-pointer bg-gradient-to-br from-[#E8F8F0] to-white"
          onClick={() => onNavigate('doctor')}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#34C98A] to-[#2DB57A] flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0A4A6E]">Doctor Module</h3>
              <p className="text-xs text-muted-foreground">Clinical Decision Support</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next Patient</span>
              <span className="font-medium text-[#0A4A6E]">Rahul M.</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Consultations</span>
              <span className="font-medium text-[#34C98A]">8 today</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#34C98A]" />
            <span className="text-xs text-[#34C98A]">AI Clinical Support Active</span>
          </div>
        </motion.div>

        {/* Reception Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 card-3d cursor-pointer bg-gradient-to-br from-[#FFF8E7] to-white"
          onClick={() => onNavigate('reception')}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5A623] to-[#E09420] flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0A4A6E]">Reception</h3>
              <p className="text-xs text-muted-foreground">Queue & Check-in Management</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">In Queue</span>
              <span className="font-medium text-[#0A4A6E]">14 patients</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Checked In</span>
              <span className="font-medium text-[#34C98A]">9 today</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs text-[#F5A623]">Live Queue Updates</span>
          </div>
        </motion.div>
      </div>

      {/* Live Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="font-semibold text-[#0A4A6E] mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#34C98A]" />
          Live Activity
        </h3>
        <div className="space-y-3">
          {[
            { time: '2 min ago', text: 'Patient #1842 checked in via AI Kiosk', type: 'checkin' },
            { time: '5 min ago', text: 'Dr. Sharma completed consultation #45', type: 'complete' },
            { time: '8 min ago', text: 'AI Triage: High severity case routed to Emergency', type: 'alert' },
            { time: '12 min ago', text: 'Appointment booked for Cardiology - Dr. Patel', type: 'booking' },
            { time: '15 min ago', text: 'Smart reminder sent to 24 patients', type: 'reminder' },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/50">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                activity.type === 'alert' ? 'bg-red-400' :
                activity.type === 'checkin' ? 'bg-[#34C98A]' :
                activity.type === 'complete' ? 'bg-[#8B5CF6]' :
                activity.type === 'booking' ? 'bg-[#F5A623]' : 'bg-[#0A4A6E]'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-[#0A4A6E]">{activity.text}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
