'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from 'react';
import ico from '../ico.png';
import Image from 'next/image';


export default function LandingPage() {
  const { login } = usePrivy();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [exploding, setExploding] = useState(true);
  const [particles, setParticles] = useState<Array<{
    id: number;
    width: number;
    height: number;
    background: string;
    x: number;
    y: number;
    scale: number;
  }>>([]);

  useEffect(() => {
    setIsClient(true);
    
    // Generar partículas solo en el cliente
    const newParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      width: Math.random() * 30 + 10,
      height: Math.random() * 30 + 10,
      background: i % 3 === 0 
        ? "radial-gradient(circle, #8B3DFF, transparent)" 
        : i % 3 === 1 
          ? "radial-gradient(circle, #6F5AFF, transparent)" 
          : "radial-gradient(circle, #5FC8FF, transparent)",
      x: Math.random() * 1000 - 500,
      y: Math.random() * 1000 - 500,
      scale: Math.random() * 2 + 0.5
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setExploding(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white overflow-hidden">
      {/* Explosión inicial de Xescrow */}
      <AnimatePresence>
        {exploding && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ 
                scale: [0.2, 1, 1.1, 1],
                opacity: [0, 1, 1, 1],
              }}
              transition={{ 
                duration: 2,
                times: [0, 0.4, 0.8, 1]
              }}
              className="text-center"
            >
              <motion.h1 
                className="text-[10rem] md:text-[18rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B3DFF] via-[#6F5AFF] to-[#5FC8FF]"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(139, 61, 255, 0.5)",
                    "0 0 60px rgba(111, 90, 255, 0.8)",
                    "0 0 120px rgba(95, 200, 255, 1)",
                    "0 0 200px rgba(95, 200, 255, 1)",
                    "0 0 120px rgba(111, 90, 255, 0.8)",
                    "0 0 60px rgba(139, 61, 255, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Xescrow
              </motion.h1>
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8"
              >
                <motion.p 
                  className="text-2xl md:text-3xl text-gray-300"
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(255, 255, 255, 0.2)",
                      "0 0 15px rgba(111, 90, 255, 0.5)",
                      "0 0 5px rgba(255, 255, 255, 0.2)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Contrata servicios con seguridad blockchain
                </motion.p>
              </motion.div>
              
              {/* Partículas explosivas */}
              {isClient && particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 1
                  }}
                  animate={{ 
                    x: particle.x, 
                    y: particle.y,
                    scale: particle.scale,
                    opacity: 0
                  }}
                  transition={{ 
                    duration: 3,
                    delay: Math.random() * 0.7,
                    ease: "easeOut"
                  }}
                  style={{
                    width: `${particle.width}px`,
                    height: `${particle.height}px`,
                    background: particle.background
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Particles */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#8B3DFF]/20"
              initial={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
              }}
              animate={{
                y: [0, Math.random() * 40 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
        <Image src={ico} alt="Icon" width={32} height={32} className="rounded-full" />
        <span className="text-xl font-bold tracking-tight">Xescrow</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex space-x-8"
        >
          <Link href="#features" className="text-gray-400 hover:text-white transition">Características</Link>
          <Link href="#jurado" className="text-gray-400 hover:text-white transition">Ser Jurado</Link>
          <Link href="#how-it-works" className="text-gray-400 hover:text-white transition">Cómo funciona</Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            //onClick={login}
            className="bg-transparent border border-[#8B3DFF] text-[#8B3DFF] hover:bg-[#8B3DFF] hover:text-white transition-all"
          >
            Ir a la app
          </Button>
        </motion.div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-400 z-20"
          //onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-current rounded mb-1.5"></div>
          <div className="w-6 h-0.5 bg-current rounded mb-1.5"></div>
          <div className="w-4 h-0.5 bg-current rounded"></div>
        </button>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 left-0 w-full h-screen bg-[#0a0a0a] z-10 flex flex-col items-center justify-center space-y-8"
          >
            <button 
              className="absolute top-6 right-6 text-2xl"
              //onClick={() => setMenuOpen(false)}
            >
              &times;
            </button>
            <Link href="#features" className="text-2xl" onClick={() => setMenuOpen(false)}>Características</Link>
            <Link href="#jurado" className="text-2xl" onClick={() => setMenuOpen(false)}>Ser Jurado</Link>
            <Link href="#how-it-works" className="text-2xl" onClick={() => setMenuOpen(false)}>Cómo funciona</Link>
            <Button 
              //onClick={login}
              className="mt-8 bg-[#8B3DFF] text-white"
            >
              Iniciar sesión
            </Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="container mx-auto px-4 py-32 flex flex-col items-center text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: exploding ? 0 : 1 }}
        transition={{ delay: exploding ? 0 : 1, duration: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#8B3DFF] text-sm font-medium mb-6 tracking-widest"
          >
            SERVICIOS DESCENTRALIZADOS
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              textShadow: "0 0 20px rgba(139, 61, 255, 0.3), 0 0 40px rgba(111, 90, 255, 0.2)"
            }}
            transition={{ delay: 0.6 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B3DFF] via-[#6F5AFF] to-[#5FC8FF]">
              Xescrow
            </span>
            <br />
            <motion.span
              className="text-2xl md:text-3xl text-gray-300 mt-4 block"
              animate={{
                textShadow: [
                  "0 0 5px rgba(255, 255, 255, 0.1)",
                  "0 0 15px rgba(111, 90, 255, 0.4)",
                  "0 0 5px rgba(255, 255, 255, 0.1)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Contrata servicios con seguridad blockchain
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Xescr0w protege tus transacciones con contratos inteligentes y resolución de disputas por jurados independientes.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              //onClick={login}
              className="bg-gradient-to-r from-[#8B3DFF] to-[#5FC8FF] text-white font-bold py-6 px-10 rounded-full text-lg transition duration-300 hover:shadow-lg hover:shadow-[#8B3DFF]/30"
            >
              Empezar gratis
            </Button>
            <Link href="#jurado">
              <Button 
                variant="outline" 
                className="bg-transparent border-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 hover:text-white font-bold py-6 px-8 rounded-full text-lg transition"
              >
                Ser Jurado
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#8B3DFF] text-sm font-medium mb-4 tracking-widest"
          >
            CARACTERÍSTICAS PRINCIPALES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold mb-4"
          >
            Simplificamos los servicios digitales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Una plataforma diseñada para proteger a clientes y proveedores con tecnología blockchain. 
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Pagos seguros",
              description: "Tu dinero queda protegido en un contrato inteligente hasta que el servicio sea completado satisfactoriamente.",
              icon: "🔒"
            },
            {
              title: "Disputas justas",
              description: "Conflictos resueltos por jurados independientes seleccionados aleatoriamente.",
              icon: "⚖️"
            },
            {
              title: "Sin intermediarios",
              description: "Conectamos directamente a clientes y proveedores eliminando comisiones innecesarias.",
              icon: "🔗"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-gray-900 to-gray-900/0 p-8 rounded-2xl border border-gray-800 hover:border-[#8B3DFF]/30 transition-all"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Jurado Section 1: ¿Querés ser jurado? */}
      <section id="jurado" className="container mx-auto px-4 py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="text-[#8B3DFF] text-sm font-medium mb-4 tracking-widest">OPORTUNIDAD ÚNICA</div>
            <h2 className="text-4xl font-bold mb-6">
              ¿Conocías Xescrow? 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8B3DFF] to-[#5FC8FF] mt-2">
                ¡100% transparente, sin intermediarios!
              </span>
            </h2>
            
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300"
              >
                Gracias a la red de Mantle, Xescrow podra gozar de transacciones económicas. 
                <span className="text-[#8B3DFF] font-medium"> ¡También podés ganar vos si te sumas!</span>
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400"
              >
                Ayudá a Xescrow a ser una plataforma que fomenta la decentralización y generar un cambio a un sistema Web3. Sumate al nuevo mercado libre decentralizado.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-6"
              >
                <Button 
                  //onClick={login}
                  className="bg-gradient-to-r from-[#8B3DFF] to-[#5FC8FF] text-white font-bold py-5 px-8 rounded-full text-lg transition duration-300 hover:shadow-lg hover:shadow-[#8B3DFF]/30"
                >
                  Registrarse
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 rounded-full bg-[#8B3DFF]/10 blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full bg-[#5FC8FF]/10 blur-3xl"></div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-900/0 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#8B3DFF]/10 flex items-center justify-center mr-4">
                    <div className="text-3xl">👑</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Beneficios de ser Jurado</h3>
                    <p className="text-gray-400">Ganá mientras contribuís a la comunidad</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    { 
                      icon: "💰", 
                      title: "Ganancias por disputa", 
                      description: "Recibí una comisión por cada disputa que resuelvas" 
                    },
                    { 
                      icon: "🕒", 
                      title: "Flexibilidad total", 
                      description: "Participá cuando quieras, sin horarios fijos" 
                    },
                    { 
                      icon: "🌐", 
                      title: "Desde cualquier lugar", 
                      description: "Resolvé disputas desde tu computadora o móvil" 
                    },
                    { 
                      icon: "📈", 
                      title: "Crece tu reputación", 
                      description: "Mejorá tu puntuación a medida que ayudas a resolver" 
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="text-2xl mr-4 mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jurado Section 2: ¿Qué es ser jurado? */}
      <section className="container mx-auto px-4 py-32 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#8B3DFF] text-sm font-medium mb-4 tracking-widest"
          >
            EL ROL DEL JURADO
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold mb-8"
          >
            ¿Qué es ser jurado en Xescr0w?
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-12 text-left"
          >
            <p className="text-xl mb-6">
              Es aquel que, en caso de disputa, ayuda a determinar un ganador mediante un proceso justo y transparente:
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8B3DFF] flex items-center justify-center mt-1 mr-3">1</div>
                <p>
                  <span className="font-bold">Selección de dos jurados:</span> Primero se eligen dos jurados para evaluar la disputa
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8B3DFF] flex items-center justify-center mt-1 mr-3">2</div>
                <p>
                  <span className="font-bold">Resolución inicial:</span> Si ambos jurados están de acuerdo, la disputa se resuelve
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8B3DFF] flex items-center justify-center mt-1 mr-3">3</div>
                <p>
                  <span className="font-bold">Desempate con tercer jurado:</span> Si hay empate, un tercer jurado tiene el voto final
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8B3DFF] flex items-center justify-center mt-1 mr-3">4</div>
                <p>
                  <span className="font-bold">Resultado definitivo:</span> La resolución se dicta y todas las partes involucradas reciben lo que les corresponde
                </p>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-[#8B3DFF]/10 border border-[#8B3DFF]/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">La filosofía detrás del jurado</h3>
              <p className="text-gray-300">
                "La opción de jurado hace que la plataforma no tome control de una disputa, 
                sino que sea la comunidad quien asuma ese rol. Esto garantiza decisiones 
                imparciales y descentralizadas."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="text-[#8B3DFF] text-sm font-medium mb-4 tracking-widest">CÓMO FUNCIONA</div>
            <h2 className="text-4xl font-bold mb-6">Proceso simple en 4 pasos</h2>
            <p className="text-gray-400 mb-8">
              Desde la contratación hasta la resolución de disputas, nuestro sistema garantiza transparencia y seguridad en cada etapa.
            </p>
            
            <div className="space-y-8">
              {[
                { step: "01", title: "Crear oferta", description: "El proveedor publica un servicio con condiciones claras" },
                { step: "02", title: "Aceptar y pagar", description: "El cliente acepta y deposita el pago en el contrato inteligente" },
                { step: "03", title: "Completar servicio", description: "El proveedor completa el servicio y notifica al sistema" },
                { step: "04", title: "Confirmar o disputar", description: "El cliente confirma o inicia una disputa para resolverse por jurados" }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="text-[#8B3DFF] font-bold text-lg pt-1">{step.step}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 rounded-full bg-[#8B3DFF]/10 blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full bg-[#5FC8FF]/10 blur-3xl"></div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-900/0 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-6 border-b border-gray-800">
                    <div>
                      <div className="text-lg font-bold">Crear nueva oferta</div>
                      <div className="text-gray-400 text-sm">Publica un servicio para clientes</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#8B3DFF]/10 flex items-center justify-center">
                      <div className="w-3 h-3 bg-[#8B3DFF] rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Título del servicio</div>
                      <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Descripción</div>
                      <div className="h-3 bg-gray-800 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-800 rounded w-5/6 mb-2"></div>
                      <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm mb-2">Precio (Mantle)</div>
                        <div className="h-4 bg-gray-800 rounded w-16"></div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-2">Tiempo de entrega</div>
                        <div className="h-4 bg-gray-800 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-800 flex justify-end">
                    <div className="bg-[#8B3DFF] text-white px-6 py-2.5 rounded-lg text-sm">
                      Publicar oferta
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-[#8B3DFF] text-sm font-medium mb-4 tracking-widest">ÚNETE AHORA</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Protege tus transacciones de servicios
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Construyamos juntos una comunidad para hacer de esta plataforma una forma nueva de prestar tus servicios y conseguir los de otros.
          </p>
          <Button 
            //onClick={login}
            className="bg-gradient-to-r from-[#8B3DFF] to-[#5FC8FF] text-white font-bold py-6 px-10 rounded-full text-lg transition duration-300 hover:shadow-lg hover:shadow-[#8B3DFF]/30"
          >
            Crear cuenta gratis
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 relative z-10 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-6">
            <Image src={ico} alt="Icon" width={32} height={32} className="rounded-full" />
              <span className="text-xl font-bold">Xescrow</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Plataforma descentralizada para contratación segura de servicios digitales.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Características</Link></li>
                <li><Link href="#" className="hover:text-white transition">Soluciones</Link></li>
                <li><Link href="#" className="hover:text-white transition">Precios</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Recursos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition">Documentación</Link></li>
                <li><Link href="#" className="hover:text-white transition">Soporte</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition">Términos</Link></li>
                <li><Link href="#" className="hover:text-white transition">Privacidad</Link></li>
                <li><Link href="#" className="hover:text-white transition">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Xescr0w. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}