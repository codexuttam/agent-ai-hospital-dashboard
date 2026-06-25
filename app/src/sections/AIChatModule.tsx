import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  Send,
  User,
  Sparkles,
  Loader2,
  Stethoscope,
  Calendar,
  Clock,
  Phone,
  Heart,
  Activity,
  Brain,
  Zap,
  Shield,
  ChevronRight,
  RefreshCw,
  Lightbulb,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

const mockResponses: Record<string, string> = {
  'hello': 'Hello! Welcome to Shreekrishna Hospital. I\'m your AI Hospital Assistant. How can I help you today? I can help with appointment booking, doctor information, emergency contacts, hospital timings, and general health queries.',
  'hi': 'Hi there! I\'m the Shreekrishna Hospital AI Assistant. How may I assist you today?',
  'doctor': 'We have 45+ expert doctors across 8 departments:\n\n• Cardiology: Dr. Rajesh Sharma (18 yrs exp)\n• Neurology: Dr. Priya Patel (15 yrs exp)\n• Orthopedics: Dr. Sneha Gupta (14 yrs exp)\n• Pediatrics: Dr. Anjali Desai (16 yrs exp)\n• General Medicine: Dr. Amit Kumar (12 yrs exp)\n• Gastroenterology: Dr. Vikram Rao (10 yrs exp)\n\nWould you like to book an appointment with any specific doctor?',
  'appointment': 'I can help you book an appointment! To get started, could you please tell me:\n\n1. Which department or doctor would you prefer?\n2. What symptoms are you experiencing?\n3. Do you have a preferred date and time?\n\nAlternatively, you can visit the Patient Portal from the sidebar for direct booking.',
  'emergency': '🚨 Emergency Contact Information:\n\n• Emergency Hotline: +91 98765 43210\n• Ambulance: 108 (Toll-free)\n• Emergency Department: Open 24/7\n• Location: Ground Floor, East Wing\n\nFor life-threatening emergencies, please call 108 immediately or visit our Emergency Department directly.',
  'timing': 'Our hospital operates at the following hours:\n\n🕐 OPD Hours:\nMonday - Saturday: 9:00 AM - 5:00 PM\nSunday: 10:00 AM - 2:00 PM (Emergency Only)\n\n🚨 Emergency Department: 24/7\n\n🩺 Doctor Consultation:\nMorning: 9:00 AM - 1:00 PM\nEvening: 2:00 PM - 5:00 PM\n\n💊 Pharmacy: 24/7\n\n🧪 Lab Services: 7:00 AM - 7:00 PM',
  'contact': 'Shreekrishna Hospital & Research Centre\n\n📍 Address:\n123 Health Avenue, Medical District\nMumbai, Maharashtra 400001\n\n📞 Phone: +91 98765 43210\n📧 Email: care@shreekrishna.hospital\n🌐 Website: www.shreekrishna.hospital\n\nFor appointments, call: +91 98765 43211',
  'cardiology': 'Our Cardiology department is led by Dr. Rajesh Sharma with 18+ years of experience.\n\nServices offered:\n• ECG & Echocardiography\n• Cardiac Catheterization\n• Angioplasty & Stenting\n• Pacemaker Implantation\n• Heart Failure Management\n\nCurrent wait time: ~15 minutes\nNext available slot: Tomorrow 10:30 AM\n\nWould you like to book a consultation?',
  'fever': 'I\'m sorry to hear you\'re not feeling well. Fever can have various causes.\n\nFor mild fever (below 101°F):\n• Stay hydrated and rest\n• Take paracetamol if needed\n• Monitor temperature every 4 hours\n\n⚠️ Please consult a doctor immediately if:\n• Fever exceeds 103°F\n• Lasts more than 3 days\n• Accompanied by severe headache, rash, or breathing difficulty\n\nWould you like to book an appointment with General Medicine?',
  'headache': 'Headaches can range from tension-type to migraines.\n\nFor mild headaches:\n• Rest in a quiet, dark room\n• Stay hydrated\n• Apply cold/warm compress\n• OTC pain relievers may help\n\n⚠️ Seek immediate care if headache is:\n• Sudden and severe ("worst ever")\n• Accompanied by confusion, vision changes, or weakness\n• Follows a head injury\n\nI can book you a Neurology consultation with Dr. Priya Patel. Would that help?',
  'chest pain': '⚠️ CHEST PAIN IS A SERIOUS SYMPTOM\n\nIf you are experiencing chest pain RIGHT NOW:\n\n1. Call Emergency: 108 or +91 98765 43210\n2. Do not drive yourself\n3. Chew an aspirin (if not allergic) while waiting\n4. Stay calm and rest\n\nOur Cardiology team is available 24/7 for emergencies.\n\nDr. Rajesh Sharma (Cardiology) is on duty today.\n\nPlease seek immediate medical attention.',
  'insurance': 'We accept all major insurance providers:\n\n• Star Health\n• ICICI Lombard\n• Max Bupa\n• Apollo Munich\n• Bajaj Allianz\n• Religare\n• New India Assurance\n• Government Health Schemes\n\nOur AI-powered insurance verification can check your coverage and estimate co-pay amounts instantly.\n\nPlease bring your insurance card and ID proof during your visit.',
  'location': 'Shreekrishna Hospital is located at:\n\n📍 123 Health Avenue, Medical District\nMumbai, Maharashtra 400001\n\n🚗 Parking: Available (Basement & Open)\n🚇 Nearest Metro: Medical Centre Station (500m)\n🚌 Bus Stop: Hospital Gate\n\nOur location is wheelchair accessible with ramps and elevators at all entry points.',
  'covid': 'COVID-19 Related Services:\n\n• RT-PCR Testing: Available (Results in 6-8 hours)\n• Rapid Antigen: Results in 30 minutes\n• Vaccination: All doses available\n• COVID Consultation: Dr. Amit Kumar (General Medicine)\n\nSymptoms to watch for:\n• Fever, cough, fatigue\n• Loss of taste/smell\n• Breathing difficulty\n\nIf you suspect COVID-19, please call before visiting. We have a dedicated isolation wing.',
}

function getAIResponse(input: string): string {
  const lower = input.toLowerCase()
  
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lower.includes(key)) return response
  }
  
  if (lower.includes('pain') || lower.includes('hurt') || lower.includes('ache')) {
    return 'I understand you\'re experiencing pain. To help me guide you better:\n\n• Where is the pain located?\n• When did it start?\n• Is it constant or intermittent?\n• Rate the severity (1-10)\n\nFor severe pain (8+), please visit our Emergency Department or call +91 98765 43210.\n\nWould you like me to help you book an appointment with the appropriate specialist?'
  }
  
  if (lower.includes('book') || lower.includes('schedule')) {
    return mockResponses['appointment']
  }
  
  if (lower.includes('thank')) {
    return 'You\'re welcome! Your health is our priority. If you need any further assistance, feel free to ask. Take care!'
  }
  
  if (lower.includes('bye') || lower.includes('goodbye')) {
    return 'Goodbye! Stay healthy. Remember, we\'re here 24/7 if you need us. Take care!'
  }
  
  return `Thank you for your message. I want to make sure I help you correctly.\n\nI can assist you with:\n• Booking appointments with our specialists\n• Information about our doctors and departments\n• Emergency contacts and hospital timings\n• General health guidance\n• Insurance and billing queries\n• Location and directions\n\nCould you please provide more details about what you need? Or type "emergency" for urgent assistance.`
}

const quickQuestions = [
  { icon: Stethoscope, text: 'Find a Doctor', query: 'Tell me about your doctors' },
  { icon: Calendar, text: 'Book Appointment', query: 'How to book appointment' },
  { icon: Clock, text: 'Hospital Timings', query: 'What are your timings' },
  { icon: Phone, text: 'Emergency', query: 'Emergency contact' },
  { icon: Heart, text: 'Cardiology', query: 'Tell me about cardiology' },
  { icon: Activity, text: 'Check Symptoms', query: 'I have fever and headache' },
]

export default function AIChatModule() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! Welcome to Shreekrishna Hospital. I\'m your AI Hospital Assistant powered by advanced clinical intelligence. How can I help you today?',
      timestamp: new Date(),
      suggestions: ['Find a Doctor', 'Book Appointment', 'Emergency', 'Check Symptoms']
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking and typing
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1000))
    
    const response = getAIResponse(text)
    
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      suggestions: text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi') 
        ? ['Find a Doctor', 'Book Appointment', 'Emergency', 'Check Symptoms']
        : undefined
    }

    setIsTyping(false)
    setMessages(prev => [...prev, assistantMsg])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickQuestion = (query: string) => {
    handleSend(query)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A4A6E] to-[#8B5CF6] flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#0A4A6E]" style={{ fontFamily: 'Playfair Display, serif' }}>
              AI Hospital Assistant
            </h1>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-[#34C98A]">
                <span className="w-2 h-2 rounded-full bg-[#34C98A] animate-pulse" /> Online
              </span>
              <span className="text-xs text-muted-foreground">• Powered by Clinical AI</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-[#EAF6FF] text-[#0A4A6E] border-0">
            <Brain className="w-3 h-3 mr-1" /> GPT-4o
          </Badge>
          <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setMessages([messages[0]])}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Main Chat Area */}
        <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {messages.map((msg, _i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'assistant'
                    ? 'bg-gradient-to-br from-[#0A4A6E] to-[#8B5CF6]'
                    : 'bg-gradient-to-br from-[#34C98A] to-[#2DB57A]'
                }`}>
                  {msg.role === 'assistant' ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#0A4A6E] to-[#0D5A82] text-white'
                      : 'bg-white shadow-sm border border-gray-100'
                  }`}>
                    <p className={`text-sm whitespace-pre-line leading-relaxed ${
                      msg.role === 'user' ? 'text-white' : 'text-[#0A4A6E]'
                    }`}>
                      {msg.content}
                    </p>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>

                  {/* Suggestion Chips */}
                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.suggestions.map(s => (
                        <button
                          key={s}
                          onClick={() => handleQuickQuestion(s === 'Find a Doctor' ? 'Tell me about your doctors' : s === 'Book Appointment' ? 'How to book appointment' : s === 'Emergency' ? 'Emergency contact' : 'I have fever and headache')}
                          className="px-3 py-1.5 bg-[#EAF6FF] text-[#0A4A6E] rounded-full text-xs font-medium hover:bg-[#0A4A6E] hover:text-white transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A4A6E] to-[#8B5CF6] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#0A4A6E] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#0A4A6E] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#0A4A6E] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about appointments, doctors, symptoms, emergencies..."
                className="flex-1 rounded-xl border-[#0A4A6E]/10 focus:border-[#0A4A6E]/30 h-11"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-[#0A4A6E] to-[#8B5CF6] text-white btn-3d rounded-xl px-4 h-11"
              >
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              AI responses are for informational purposes. For emergencies, call 108 or +91 98765 43210
            </p>
          </div>
        </div>

        {/* Sidebar - Quick Actions */}
        <div className="hidden lg:block w-64 space-y-4 flex-shrink-0">
          {/* Quick Questions */}
          <Card className="glass-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#0A4A6E] flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#F5A623]" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map((q) => (
                <button
                  key={q.text}
                  onClick={() => handleQuickQuestion(q.query)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#EAF6FF] transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EAF6FF] group-hover:bg-[#0A4A6E] flex items-center justify-center transition-colors">
                    <q.icon className="w-4 h-4 text-[#0A4A6E] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm text-[#0A4A6E]">{q.text}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card className="glass-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#0A4A6E] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8B5CF6]" /> AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { icon: Brain, text: 'Clinical Triage', desc: 'Symptom analysis & routing' },
                { icon: Stethoscope, text: 'Doctor Matching', desc: 'Specialist recommendations' },
                { icon: Shield, text: 'Safety Checks', desc: 'Drug interaction alerts' },
                { icon: Zap, text: 'Smart Responses', desc: 'Instant health guidance' },
              ].map((cap) => (
                <div key={cap.text} className="flex items-start gap-2 p-2">
                  <cap.icon className="w-4 h-4 text-[#0A4A6E] mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-[#0A4A6E]">{cap.text}</p>
                    <p className="text-[10px] text-muted-foreground">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Card */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5" />
              <span className="font-semibold text-sm">Emergency?</span>
            </div>
            <p className="text-xs text-white/80 mb-3">For life-threatening emergencies, call immediately</p>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
              <Phone className="w-4 h-4" />
              <span className="font-bold text-sm">108</span>
            </div>
            <p className="text-[10px] text-white/60 mt-2">24/7 Emergency Department</p>
          </div>
        </div>
      </div>
    </div>
  )
}
