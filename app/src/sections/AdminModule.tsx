import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Stethoscope,
  TrendingUp,
  DollarSign,
  Calendar,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Shield,
  AlertTriangle,
  Filter,
  Download,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 280, appointments: 320 },
  { month: 'Feb', revenue: 310, appointments: 350 },
  { month: 'Mar', revenue: 295, appointments: 340 },
  { month: 'Apr', revenue: 340, appointments: 380 },
  { month: 'May', revenue: 380, appointments: 410 },
  { month: 'Jun', revenue: 420, appointments: 450 },
]

const departmentData = [
  { name: 'Cardiology', patients: 145, color: '#0A4A6E' },
  { name: 'Neurology', patients: 98, color: '#8B5CF6' },
  { name: 'Orthopedics', patients: 120, color: '#34C98A' },
  { name: 'General Med', patients: 210, color: '#F5A623' },
  { name: 'Pediatrics', patients: 175, color: '#EC4899' },
  { name: 'Gastro', patients: 85, color: '#06B6D4' },
]

const hourlyData = [
  { hour: '8AM', patients: 12 },
  { hour: '9AM', patients: 28 },
  { hour: '10AM', patients: 35 },
  { hour: '11AM', patients: 42 },
  { hour: '12PM', patients: 30 },
  { hour: '1PM', patients: 15 },
  { hour: '2PM', patients: 25 },
  { hour: '3PM', patients: 38 },
  { hour: '4PM', patients: 32 },
  { hour: '5PM', patients: 20 },
]

const satisfactionData = [
  { name: 'Excellent', value: 45, color: '#34C98A' },
  { name: 'Good', value: 30, color: '#0A4A6E' },
  { name: 'Average', value: 18, color: '#F5A623' },
  { name: 'Poor', value: 7, color: '#EF4444' },
]

const recentBookings = [
  { id: 'BK-4521', patient: 'Rahul Mehta', doctor: 'Dr. Rajesh Sharma', department: 'Cardiology', time: '10:30 AM', status: 'confirmed', amount: 1500 },
  { id: 'BK-4522', patient: 'Sunita Sharma', doctor: 'Dr. Priya Patel', department: 'Neurology', time: '11:00 AM', status: 'checked-in', amount: 1200 },
  { id: 'BK-4523', patient: 'Amit Patel', doctor: 'Dr. Amit Kumar', department: 'General Medicine', time: '09:45 AM', status: 'in-progress', amount: 800 },
  { id: 'BK-4524', patient: 'Priya Gupta', doctor: 'Dr. Sneha Gupta', department: 'Orthopedics', time: '02:00 PM', status: 'confirmed', amount: 2000 },
  { id: 'BK-4525', patient: 'Neha Reddy', doctor: 'Dr. Anjali Desai', department: 'Pediatrics', time: '10:00 AM', status: 'completed', amount: 1000 },
  { id: 'BK-4526', patient: 'Arjun Nair', doctor: 'Dr. Vikram Rao', department: 'Gastroenterology', time: '12:15 PM', status: 'confirmed', amount: 1800 },
]

const topDoctors = [
  { name: 'Dr. Rajesh Sharma', department: 'Cardiology', patients: 45, rating: 4.9, revenue: '₹2.4L' },
  { name: 'Dr. Anjali Desai', department: 'Pediatrics', patients: 62, rating: 4.9, revenue: '₹2.1L' },
  { name: 'Dr. Priya Patel', department: 'Neurology', patients: 38, rating: 4.8, revenue: '₹1.8L' },
  { name: 'Dr. Amit Kumar', department: 'General Medicine', patients: 55, rating: 4.7, revenue: '₹1.5L' },
  { name: 'Dr. Sneha Gupta', department: 'Orthopedics', patients: 32, rating: 4.9, revenue: '₹1.9L' },
]

export default function AdminModule() {
  const [dateRange, setDateRange] = useState('Today')

  const kpiCards = [
    { title: 'Total Revenue', value: '₹4.2L', change: '+15%', up: true, icon: DollarSign, color: 'from-[#0A4A6E] to-[#0D5A82]', bgColor: 'bg-[#EAF6FF]' },
    { title: 'Appointments', value: '142', change: '+8%', up: true, icon: Calendar, color: 'from-[#34C98A] to-[#2DB57A]', bgColor: 'bg-[#E8F8F0]' },
    { title: 'Active Doctors', value: '24', change: '+3', up: true, icon: Stethoscope, color: 'from-[#8B5CF6] to-[#7C3AED]', bgColor: 'bg-[#F0EEFF]' },
    { title: 'Patients Today', value: '186', change: '+12%', up: true, icon: Users, color: 'from-[#F5A623] to-[#E09420]', bgColor: 'bg-[#FFF8E7]' },
    { title: 'Avg Wait Time', value: '12m', change: '-3m', up: true, icon: Clock, color: 'from-[#06B6D4] to-[#0891B2]', bgColor: 'bg-[#E0F7FA]' },
    { title: 'Satisfaction', value: '4.8', change: '+0.2', up: true, icon: Activity, color: 'from-[#EC4899] to-[#DB2777]', bgColor: 'bg-[#FDF2F8]' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0A4A6E]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Hospital analytics and operations overview</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-white rounded-xl px-3 py-2 shadow-sm">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm bg-transparent border-none outline-none text-[#0A4A6E]"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <Button variant="outline" className="rounded-xl">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card rounded-2xl p-4 card-3d"
          >
            <div className={`w-10 h-10 ${kpi.bgColor} rounded-xl flex items-center justify-center mb-3`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color === 'from-[#0A4A6E] to-[#0D5A82]' ? 'text-[#0A4A6E]' : kpi.color === 'from-[#34C98A] to-[#2DB57A]' ? 'text-[#34C98A]' : kpi.color === 'from-[#8B5CF6] to-[#7C3AED]' ? 'text-[#8B5CF6]' : kpi.color === 'from-[#F5A623] to-[#E09420]' ? 'text-[#F5A623]' : kpi.color === 'from-[#06B6D4] to-[#0891B2]' ? 'text-[#06B6D4]' : 'text-[#EC4899]'}`} />
            </div>
            <p className="text-xl font-bold text-[#0A4A6E]">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {kpi.up ? <ArrowUpRight className="w-3 h-3 text-[#34C98A]" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
              <span className="text-xs text-[#34C98A]">{kpi.change}</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{kpi.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-[#0A4A6E]">Revenue & Appointments</h3>
              <p className="text-xs text-muted-foreground">Monthly trend (in Lakhs)</p>
            </div>
            <Badge className="bg-[#EAF6FF] text-[#0A4A6E] border-0">
              <TrendingUp className="w-3 h-3 mr-1" /> +18% YoY
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A4A6E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0A4A6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#0A4A6E" fill="url(#revenueGrad)" strokeWidth={2} name="Revenue (₹L)" />
              <Area type="monotone" dataKey="appointments" stroke="#34C98A" fill="none" strokeWidth={2} strokeDasharray="5 5" name="Appointments" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-[#0A4A6E]">Patients by Department</h3>
              <p className="text-xs text-muted-foreground">Distribution across specialties</p>
            </div>
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <ReBarChart data={departmentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="patients" radius={[0, 8, 8, 0]}>
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </ReBarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Hourly Traffic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="font-semibold text-[#0A4A6E] mb-1">Hourly Traffic</h3>
          <p className="text-xs text-muted-foreground mb-4">Patient flow throughout the day</p>
          <ResponsiveContainer width="100%" height={180}>
            <ReBarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="patients" fill="#0A4A6E" radius={[8, 8, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Satisfaction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="font-semibold text-[#0A4A6E] mb-1">Patient Satisfaction</h3>
          <p className="text-xs text-muted-foreground mb-4">Overall rating distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <RePieChart>
              <Pie
                data={satisfactionData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
                paddingAngle={4}
              >
                {satisfactionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconSize={8} iconType="circle" formatter={(value: string) => <span className="text-xs">{value}</span>} />
            </RePieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#F5A623]" />
            <h3 className="font-semibold text-[#0A4A6E]">AI Insights</h3>
          </div>
          <div className="space-y-3">
            {[
              { icon: TrendingUp, text: 'Revenue trending 15% above forecast this month', color: 'text-[#34C98A]', bg: 'bg-[#E8F8F0]' },
              { icon: Users, text: 'Pediatrics seeing 22% surge in appointments', color: 'text-[#0A4A6E]', bg: 'bg-[#EAF6FF]' },
              { icon: Clock, text: 'Avg wait time reduced by 8 min after AI scheduling', color: 'text-[#F5A623]', bg: 'bg-[#FFF8E7]' },
              { icon: Shield, text: 'Zero billing anomalies detected this week', color: 'text-[#34C98A]', bg: 'bg-[#E8F8F0]' },
              { icon: AlertTriangle, text: 'Cardiology demand forecasted to spike next week', color: 'text-[#F5A623]', bg: 'bg-[#FFF8E7]' },
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                <div className={`w-8 h-8 ${insight.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <insight.icon className={`w-4 h-4 ${insight.color}`} />
                </div>
                <p className="text-sm text-[#0A4A6E]">{insight.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings & Top Doctors */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0A4A6E]">Recent Bookings</h3>
            <Button variant="ghost" size="sm" className="text-[#0A4A6E]">View All</Button>
          </div>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0A4A6E] to-[#34C98A] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{booking.patient.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#0A4A6E] truncate">{booking.patient}</p>
                    <Badge className={`border-0 text-[9px] ${
                      booking.status === 'completed' ? 'bg-[#E8F8F0] text-[#059669]' :
                      booking.status === 'in-progress' ? 'bg-[#EAF6FF] text-[#0A4A6E]' :
                      booking.status === 'checked-in' ? 'bg-[#FFF8E7] text-[#D97706]' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{booking.doctor} • {booking.department}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-[#0A4A6E]">₹{booking.amount.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">{booking.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Doctors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0A4A6E]">Top Performing Doctors</h3>
            <Badge className="bg-[#EAF6FF] text-[#0A4A6E] border-0">This Month</Badge>
          </div>
          <div className="space-y-3">
            {topDoctors.map((doc, _i) => (
              <div key={doc.name} className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F5A623] to-[#E09420] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">#{_i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0A4A6E]">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.department} • {doc.patients} patients</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium text-[#0A4A6E]">{doc.rating}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{doc.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
