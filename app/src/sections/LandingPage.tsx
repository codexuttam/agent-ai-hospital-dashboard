import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  Activity,
  Users,
  Stethoscope,
  Clock,
  Shield,
  Brain,
  Sparkles,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  Microscope,
  Pill,
  ClipboardCheck,
  Zap,
  Globe,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Page = 'landing' | 'dashboard' | 'patient' | 'doctor' | 'reception' | 'admin' | 'chat'

interface LandingPageProps {
  onNavigate: (page: Page) => void
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [scrolled, setScrolled] = useState(false)
  const [counters, setCounters] = useState({ doctors: 0, patients: 0, years: 0, beds: 0 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const targets = { doctors: 45, patients: 50000, years: 25, beds: 120 }
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setCounters({
        doctors: Math.round(targets.doctors * eased),
        patients: Math.round(targets.patients * eased),
        years: Math.round(targets.years * eased),
        beds: Math.round(targets.beds * eased),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A623] to-[#E09420] flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-[#0A4A6E] font-bold text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Shreekrishna
                </h1>
                <p className="text-[10px] text-muted-foreground tracking-wider uppercase">Hospital & Research Centre</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm text-[#0A4A6E]/70 hover:text-[#0A4A6E] transition-colors">Services</a>
              <a href="#technology" className="text-sm text-[#0A4A6E]/70 hover:text-[#0A4A6E] transition-colors">AI Technology</a>
              <a href="#stats" className="text-sm text-[#0A4A6E]/70 hover:text-[#0A4A6E] transition-colors">About</a>
              <a href="#contact" className="text-sm text-[#0A4A6E]/70 hover:text-[#0A4A6E] transition-colors">Contact</a>
            </div>
            <Button
              onClick={() => onNavigate('dashboard')}
              className="bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] hover:from-[#0D5A82] hover:to-[#0A4A6E] text-white btn-3d rounded-xl px-5"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Launch AI OS
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-16">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[10%] w-64 h-64 bg-gradient-to-br from-[#EAF6FF] to-[#F0EEFF] rounded-full opacity-60 blur-2xl"
          />
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-[5%] w-80 h-80 bg-gradient-to-br from-[#F7F4EF] to-[#EAF6FF] rounded-full opacity-50 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-[#F5A623]/10 to-transparent rounded-full blur-2xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Badge className="mb-6 bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20 px-4 py-1.5 text-xs rounded-full">
                <Sparkles className="w-3 h-3 mr-1" /> AI-Powered Healthcare
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A4A6E] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Healthcare Reimagined with{' '}
                <span className="bg-gradient-to-r from-[#F5A623] to-[#E09420] bg-clip-text text-transparent">
                  Intelligence
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Shreekrishna Hospital brings cutting-edge AI to every touchpoint — from intelligent triage 
                and smart scheduling to clinical decision support and automated care coordination.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  onClick={() => onNavigate('dashboard')}
                  size="lg"
                  className="bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] hover:from-[#0D5A82] hover:to-[#0A4A6E] text-white btn-3d rounded-xl px-8 h-12 text-base"
                >
                  Enter Hospital OS
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('patient')}
                  className="border-[#0A4A6E]/20 text-[#0A4A6E] hover:bg-[#0A4A6E]/5 rounded-xl px-8 h-12 text-base btn-3d"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Patient Portal
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-[#0A4A6E] to-[#34C98A] flex items-center justify-center">
                      <span className="text-[10px] text-white font-medium">DR</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Trusted by 50,000+ patients</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Dashboard Preview Card */}
                <div className="glass-card rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
                      <div className="w-3 h-3 rounded-full bg-[#F5A623]" />
                      <div className="w-3 h-3 rounded-full bg-[#34C98A]" />
                    </div>
                    <Badge className="bg-[#34C98A]/10 text-[#34C98A] border-0 text-[10px]">
                      <Activity className="w-3 h-3 mr-1" /> Live
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#EAF6FF] rounded-xl p-4">
                      <Users className="w-6 h-6 text-[#0A4A6E] mb-2" />
                      <p className="text-xl font-bold text-[#0A4A6E]">186</p>
                      <p className="text-[10px] text-muted-foreground">Patients Today</p>
                    </div>
                    <div className="bg-[#E8F8F0] rounded-xl p-4">
                      <Stethoscope className="w-6 h-6 text-[#34C98A] mb-2" />
                      <p className="text-xl font-bold text-[#34C98A]">24</p>
                      <p className="text-[10px] text-muted-foreground">Doctors On Duty</p>
                    </div>
                    <div className="bg-[#FFF8E7] rounded-xl p-4">
                      <Clock className="w-6 h-6 text-[#F5A623] mb-2" />
                      <p className="text-xl font-bold text-[#F5A623]">12m</p>
                      <p className="text-[10px] text-muted-foreground">Avg Wait Time</p>
                    </div>
                    <div className="bg-[#F0EEFF] rounded-xl p-4">
                      <Brain className="w-6 h-6 text-[#8B5CF6] mb-2" />
                      <p className="text-xl font-bold text-[#8B5CF6]">AI</p>
                      <p className="text-[10px] text-muted-foreground">Triage Active</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] rounded-xl">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F5A623]" />
                      <span className="text-white text-xs font-medium">AI Assistant: Processing triage for 3 patients...</span>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#34C98A]/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#34C98A]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0A4A6E]">99.8% Uptime</p>
                      <p className="text-[10px] text-muted-foreground">Enterprise Security</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Badge className="mb-4 bg-[#0A4A6E]/10 text-[#0A4A6E] border-0">Our Impact</Badge>
            <h2 className="text-3xl font-bold text-[#0A4A6E]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Trusted by Thousands
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Expert Doctors', value: counters.doctors, suffix: '+', icon: Stethoscope, color: 'text-[#0A4A6E]', bg: 'bg-[#EAF6FF]' },
              { label: 'Patients Served', value: counters.patients.toLocaleString(), suffix: '', icon: Users, color: 'text-[#34C98A]', bg: 'bg-[#E8F8F0]' },
              { label: 'Years of Excellence', value: counters.years, suffix: '+', icon: Award, color: 'text-[#F5A623]', bg: 'bg-[#FFF8E7]' },
              { label: 'Hospital Beds', value: counters.beds, suffix: '', icon: Heart, color: 'text-[#8B5CF6]', bg: 'bg-[#F0EEFF]' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center card-3d"
              >
                <div className={`w-14 h-14 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold text-[#0A4A6E]">{stat.value}{stat.suffix}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-[#F7F4EF] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Badge className="mb-4 bg-[#34C98A]/10 text-[#34C98A] border-0">Our Services</Badge>
            <h2 className="text-3xl font-bold text-[#0A4A6E]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Comprehensive Care, Intelligent Delivery
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              From emergency response to preventive care, our AI-enhanced services ensure every patient receives the right care at the right time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'AI Triage & Diagnosis', desc: 'Intelligent symptom analysis and priority routing', color: 'from-[#0A4A6E] to-[#0D5A82]', bg: 'bg-[#EAF6FF]' },
              { icon: Stethoscope, title: 'Expert Consultation', desc: '45+ specialists across 20 departments', color: 'from-[#34C98A] to-[#2DB57A]', bg: 'bg-[#E8F8F0]' },
              { icon: Microscope, title: 'Advanced Diagnostics', desc: 'AI-powered imaging and lab analysis', color: 'from-[#8B5CF6] to-[#7C3AED]', bg: 'bg-[#F0EEFF]' },
              { icon: Pill, title: 'Smart Pharmacy', desc: 'Automated prescription and drug interaction checks', color: 'from-[#F5A623] to-[#E09420]', bg: 'bg-[#FFF8E7]' },
              { icon: Heart, title: 'Cardiac Care', desc: '24/7 cardiac emergency and monitoring', color: 'from-[#EF4444] to-[#DC2626]', bg: 'bg-[#FFE4E1]' },
              { icon: ClipboardCheck, title: 'Health Records', desc: 'Unified digital health history with AI insights', color: 'from-[#06B6D4] to-[#0891B2]', bg: 'bg-[#E0F7FA]' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 card-3d group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-[#0A4A6E] text-lg">{service.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{service.desc}</p>
                <div className="mt-4 flex items-center text-[#0A4A6E] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section id="technology" className="py-20 bg-gradient-to-br from-[#0A4A6E] via-[#0D5A82] to-[#0A4A6E] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-[#F5A623] rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-[#34C98A] rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">AI Technology</Badge>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Powered by Advanced AI
            </h2>
            <p className="text-white/70 mt-3 max-w-2xl mx-auto">
              Our proprietary AI engine enhances every aspect of healthcare delivery, from patient intake to clinical decision-making.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'Clinical AI Engine', desc: 'GPT-4o powered diagnosis assistance, drug interaction checking, and treatment recommendations', features: ['Symptom Analysis', 'Diagnosis Support', 'Prescription AI'] },
              { icon: Zap, title: 'Operational Intelligence', desc: 'Smart scheduling, demand forecasting, and automated resource optimization', features: ['Smart Scheduling', 'Demand Forecast', 'Auto Routing'] },
              { icon: Shield, title: 'Safety & Compliance', desc: 'Real-time fraud detection, anomaly alerts, and regulatory compliance monitoring', features: ['Fraud Detection', 'Anomaly Alerts', 'Compliance AI'] },
            ].map((tech, i) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F5A623]/20 flex items-center justify-center mb-4">
                  <tech.icon className="w-7 h-7 text-[#F5A623]" />
                </div>
                <h3 className="font-semibold text-white text-lg">{tech.title}</h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">{tech.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tech.features.map(f => (
                    <Badge key={f} className="bg-white/10 text-white/80 border-0 text-[10px]">{f}</Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Badge className="mb-4 bg-[#8B5CF6]/10 text-[#8B5CF6] border-0">Departments</Badge>
            <h2 className="text-3xl font-bold text-[#0A4A6E]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Specialized Care Units
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Cardiology', icon: Heart, count: '6 Experts', color: 'bg-[#FFE4E1] text-[#DC2626]' },
              { name: 'Neurology', icon: Brain, count: '4 Experts', color: 'bg-[#F0EEFF] text-[#7C3AED]' },
              { name: 'Orthopedics', icon: Activity, count: '5 Experts', color: 'bg-[#EAF6FF] text-[#0A4A6E]' },
              { name: 'Pediatrics', icon: Users, count: '7 Experts', color: 'bg-[#FFF8E7] text-[#D97706]' },
              { name: 'Oncology', icon: Microscope, count: '3 Experts', color: 'bg-[#E8F8F0] text-[#059669]' },
              { name: 'Emergency', icon: Zap, count: '8 Experts', color: 'bg-[#FFE4E1] text-[#DC2626]' },
              { name: 'Radiology', icon: Globe, count: '4 Experts', color: 'bg-[#E0F7FA] text-[#0891B2]' },
              { name: 'General Medicine', icon: Stethoscope, count: '12 Experts', color: 'bg-[#EAF6FF] text-[#0A4A6E]' },
            ].map((dept, i) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-4 text-center card-3d cursor-pointer hover:scale-105 transition-transform"
              >
                <div className={`w-12 h-12 ${dept.color.split(' ')[0]} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <dept.icon className={`w-6 h-6 ${dept.color.split(' ')[1]}`} />
                </div>
                <p className="font-medium text-[#0A4A6E] text-sm">{dept.name}</p>
                <p className="text-[10px] text-muted-foreground">{dept.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#F7F4EF] via-[#EAF6FF] to-[#F0EEFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20 px-4 py-1.5">
              <Sparkles className="w-3 h-3 mr-1" /> Experience the Future
            </Badge>
            <h2 className="text-4xl font-bold text-[#0A4A6E] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ready to Transform Healthcare?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Step into our AI-powered Hospital OS and experience how intelligent technology 
              enhances every aspect of patient care and hospital operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => onNavigate('dashboard')}
                size="lg"
                className="bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] hover:from-[#0D5A82] hover:to-[#0A4A6E] text-white btn-3d rounded-xl px-10 h-14 text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Launch AI Hospital OS
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> HIPAA Compliant</span>
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Enterprise Security</span>
              <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> 99.9% Uptime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="bg-[#0A4A6E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A623] to-[#E09420] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Shreekrishna</h3>
                  <p className="text-[10px] text-white/50">Hospital & Research Centre</p>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Delivering excellence in healthcare through innovation, compassion, and advanced AI technology since 1999.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#F5A623]">Quick Links</h4>
              <div className="space-y-2">
                {['Patient Portal', 'Doctor Login', 'Reception Desk', 'Admin Dashboard', 'AI Assistant'].map(link => (
                  <p key={link} className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors">{link}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#F5A623]">Departments</h4>
              <div className="space-y-2">
                {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency'].map(dept => (
                  <p key={dept} className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors">{dept}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#F5A623]">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="w-4 h-4 text-[#F5A623]" />
                  123 Health Avenue, Medical District
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Phone className="w-4 h-4 text-[#F5A623]" />
                  +91 98765 43210
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Mail className="w-4 h-4 text-[#F5A623]" />
                  care@shreekrishna.hospital
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40"> Shreekrishna Hospital. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/40 hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="text-sm text-white/40 hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="text-sm text-white/40 hover:text-white cursor-pointer transition-colors">Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
