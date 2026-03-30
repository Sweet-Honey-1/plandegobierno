/**
 * PlanDeGobierno.jsx
 * Página completa del Plan de Gobierno 2026-2031 – Partido del Buen Gobierno
 * 8 subcomponentes con animaciones GSAP (SplitText + ScrollTrigger)
 *
 * Dependencias: gsap, @gsap/react, gsap/ScrollTrigger, gsap/SplitText (premium)
 * Estilos: Tailwind CSS
 */

import { useRef} from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// ─────────────────────────────────────────────
// DATOS DEL PLAN
// ─────────────────────────────────────────────

const EJES = [
  { id: 'economia',    num: '01', label: 'Economía',    color: '#D72638', anchor: '#plan-economia' },
  { id: 'salud',       num: '02', label: 'Salud',        color: '#1A1A1A', anchor: '#plan-salud' },
  { id: 'educacion',   num: '03', label: 'Educación',    color: '#D72638', anchor: '#plan-educacion' },
  { id: 'seguridad',   num: '04', label: 'Seguridad',    color: '#1A1A1A', anchor: '#plan-seguridad' },
  { id: 'ambiente',    num: '05', label: 'Ambiente',     color: '#D72638', anchor: '#plan-ambiente' },
  { id: 'integridad',  num: '06', label: 'Integridad',   color: '#1A1A1A', anchor: '#plan-integridad' },
  { id: 'resumen',     num: '07', label: 'Ejes Estratégicos', color: '#D72638', anchor: '#plan-resumen' },
]

const ECONOMIA_OBJETIVOS = [
  { num: '01', title: 'Crecimiento Económico Sostenido e Inclusivo', desc: 'Diversificar la matriz productiva hacia energía, agroindustria, economía digital y minería con valor agregado.' },
  { num: '02', title: 'Estabilidad Macroeconómica y Disciplina Fiscal', desc: 'Fondo soberano para gestionar ingresos por recursos naturales y asegurar gobernanza técnica transparente.' },
  { num: '03', title: 'Reducción Integral de la Informalidad', desc: 'Incentivos para formalizar MYPE con acceso al crédito, protección social y acompañamiento productivo.' },
  { num: '04', title: 'Fortalecimiento del Sistema Tributario', desc: 'Impuestos al carbono, eliminación de subsidios fósiles y facturación electrónica universal.' },
  { num: '05', title: 'Mejora del Empleo y Sistema Previsional', desc: 'Afiliación automática para independientes y RMV garantizada para mayores de 85 años.' },
  { num: '06', title: 'Reducción de Desigualdades y Pobreza', desc: 'Programas sociales con enfoque territorial y de ciclo de vida con componentes productivos.' },
  { num: '07', title: 'Transición Ecológica y Resiliencia Climática', desc: 'Economía circular, financiamiento climático e inversión en energías limpias e infraestructura resiliente.' },
  { num: '08', title: 'Gestión Pública Moderna y Descentralización', desc: 'Macrorregiones con presupuestos identificables y reorganización municipal racionalizada.' },
  { num: '09', title: 'Infraestructura y Servicios Públicos de Calidad', desc: 'Priorizar infraestructura en territorios de alta desigualdad bajo mecanismos transparentes.' },
  { num: '10', title: 'Capital Humano, Ciencia y Tecnología', desc: 'Fortalecer SUNEDU y el sistema nacional de ciencia, tecnología e innovación.' },
]

const SALUD_LINEAS = [
  { icon: '🏥', title: 'Sistema Único e Integrado', desc: 'Tarifario único nacional, Historia Clínica Electrónica interoperable y aseguramiento con solo DNI.' },
  { icon: '🩺', title: 'Primer Nivel de Atención', desc: 'Cobertura territorial del 100% con EESS funcionando +12h con médico. Unidades móviles y atención comunitaria.' },
  { icon: '💊', title: 'Aseguramiento Universal', desc: 'Eliminación de barreras geográficas y administrativas. Todo habitante tendrá cobertura en salud efectiva.' },
  { icon: '🔬', title: 'Modernización del MINSA', desc: 'Redistribución presupuestal vinculada a necesidades reales y disminución del gasto de bolsillo.' },
  { icon: '🚑', title: 'Atención Prehospitalaria', desc: 'Sistema Único de Emergencia Nacional, telemedicina para zonas rurales y atención domiciliaria.' },
  { icon: '🛡️', title: 'Erradicar la Corrupción', desc: 'Auditorías semestrales independientes y tablero de control público sobre adquisiciones.' },
]

const SALUD_METAS = [
  { val: '<10%', label: 'Anemia infantil' },
  { val: '100%', label: 'Cobertura de salud' },
  { val: '100%', label: 'Sistema MINSA digital' },
]

const EDUCACION_OBJETIVOS = [
  { num: '01', title: 'Trayectorias Educativas Completas', desc: 'Desde la educación inicial hasta la educación superior sin discriminación ni interrupciones para ninguna persona.' },
  { num: '02', title: 'Aprendizajes de Calidad y Pertinencia', desc: 'Énfasis en comprensión lectora, razonamiento matemático, ciudadanía, ciencia y tecnología.' },
  { num: '03', title: 'Desarrollo Profesional Docente', desc: 'Revalorizar la carrera docente con formación continua descentralizada y carrera pública atractiva.' },
  { num: '04', title: 'Educación Superior Universal', desc: 'Ampliar oferta de educación superior en regiones. Fortalecer becas PRONABEC para zonas rurales.' },
  { num: '05', title: 'Infraestructura Educativa y Digital', desc: 'Plan multianual de cierre de brechas priorizando riesgo, equidad y resiliencia territorial.' },
]

const SEGURIDAD_EJES = [
  {
    title: 'Marco Normativo Inmediato',
    actions: ['Derogar leyes pro-crimen que debilitan la capacidad del Estado', 'Comisión especial revisora de legislación antidemocrática en 30 días', 'Restituir herramientas de inteligencia y persecución del crimen'],
    color: '#D72638',
  },
  {
    title: 'Prevención del Delito Juvenil',
    actions: ['Promover reinserción de adolescentes en conflicto con la ley', 'Habilidades socioemocionales y ocupacionales para jóvenes', 'Oportunidades de empleo y calificación profesional'],
    color: '#1A1A1A',
  },
  {
    title: 'Acceso a Seguridad Ciudadana',
    actions: ['Fortalecer función comunitaria de la Policía con enfoque territorial', 'Mejores canales de denuncia y atención oportuna', 'Transparencia y acceso a información sobre criminalidad'],
    color: '#D72638',
  },
  {
    title: 'Reducción de Delitos Violentos',
    actions: ['Atención y acciones restaurativas para víctimas de violencia de género', 'Mecanismos eficaces de alerta temprana y protección', 'Espacios de conciliación y justicia restaurativa comunitaria'],
    color: '#1A1A1A',
  },
  {
    title: 'Lucha contra Crimen Organizado',
    actions: ['Tecnologías avanzadas para rastreo e investigación criminal', 'Cooperación entre PNP, fiscalías y sistemas financieros', 'Desarticulación de mafias y economías criminales'],
    color: '#D72638',
  },
]

const AMBIENTE_OBJETIVOS = [
  { icon: '🌿', title: 'Economía Carbono Neutral', desc: 'Instrumentos económicos, impuestos ambientales, economía circular y reducción progresiva de subsidios fósiles.' },
  { icon: '💧', title: 'Calidad Ambiental', desc: 'Normas y estándares que protejan la salud del aire, agua y suelo, promoviendo tecnologías limpias.' },
  { icon: '🦜', title: 'Conservación de Ecosistemas', desc: 'Meta del 30% de conservación de zonas terrestres, aguas continentales, costeras y marinas al 2030.' },
  { icon: '⚡', title: 'Energías Renovables', desc: 'RER-NC al 30% de la matriz eléctrica. Proyectos de hidrógeno verde, electromovilidad y smart grids.' },
  { icon: '🌊', title: 'Recursos Marino-Costeros', desc: 'Gestión integrada de zonas marino-costeras. Pesca sostenible y soberanía sobre el mar peruano.' },
  { icon: '📚', title: 'Cultura y Educación Ambiental', desc: 'Currículo alineado a la realidad de cada región. Vigilancia comunitaria de calidad ambiental.' },
  { icon: '⚠️', title: 'Gestión de Peligros', desc: 'Prevención de riesgos naturales y tecnológicos. Infraestructura de monitoreo y alerta temprana.' },
  { icon: '⚖️', title: 'Justicia Ambiental', desc: 'Juzgados ambientales especializados en la Amazonia. Cero impunidad en delitos ambientales graves.' },
]

const INTEGRIDAD_LINEAS = [
  {
    num: '01',
    title: 'Profesionalización y Meritocracia',
    items: ['Carrera Directiva Pública obligatoria', 'Eliminación de rotación política en cargos operativos', 'Evaluación anual de capacidades y desempeño', 'Escuelas regionales de formación pública'],
  },
  {
    num: '02',
    title: 'Procesos Blindados y Trazabilidad',
    items: ['Contrataciones públicas 100% digitales y abiertas', 'Registro Único de Obras y Compras del Perú (RUOCP)', 'Auditoría digital continua y control concurrente reforzado', 'Interoperabilidad de sistemas de contratación'],
  },
  {
    num: '03',
    title: 'Justicia Anticorrupción Efectiva',
    items: ['Procedimientos disciplinarios rápidos con sanciones vinculantes', 'Fiscalías anticorrupción regionales con presupuesto protegido', 'Publicación obligatoria de información comprensible y resumida', 'Dashboard nacional de integridad público'],
  },
]

const RESUMEN_EJES = [
  {
    num: '01', title: 'Diversidad y Territorio',
    desc: 'Reconoce la diversidad cultural, lingüística y ecológica del país. Impulsa un desarrollo equilibrado entre costa, sierra y selva con integración ferroviaria nacional.',
    icon: '🗺️', color: '#D72638',
  },
  {
    num: '02', title: 'Estado y Gobernabilidad',
    desc: 'Reforma integral del Estado: meritocracia, descentralización, transparencia y eficiencia. Lucha frontal contra la corrupción y el centralismo.',
    icon: '🏛️', color: '#1A1A1A',
  },
  {
    num: '03', title: 'Economía para el Bienestar',
    desc: 'Transición de modelo extractivo a economía diversificada. Fondo Soberano de Riqueza. Objetivo: PBI ≥5%, informalidad ≤50%, pobreza ≤20%.',
    icon: '📈', color: '#D72638',
  },
  {
    num: '04', title: 'Transición Energética y Medioambiente',
    desc: 'Independencia energética con fuentes renovables (solar, eólica, hidrógeno verde). Impuestos verdes y recuperación de ecosistemas.',
    icon: '⚡', color: '#1A1A1A',
  },
  {
    num: '05', title: 'Educación y Salud de Calidad',
    desc: 'Educación inclusiva centrada en pensamiento crítico. Salud universal con digitalización. Metas: anemia <10%, cobertura de salud 100%.',
    icon: '🎓', color: '#D72638',
  },
  {
    num: '06', title: 'Amazonía, Sierra y Mar como Motores',
    desc: 'Protección de la Amazonía y aprovechamiento sostenible de biodiversidad. Pesca sostenible y soberanía sobre el mar peruano.',
    icon: '🌿', color: '#1A1A1A',
  },
]

// ─────────────────────────────────────────────
// HOOK UTILITARIO: scroll-trigger reveal
// ─────────────────────────────────────────────
function useScrollReveal(ref: any, targets: any , vars = {}) {
  useGSAP(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
          ...vars,
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])
}

// ─────────────────────────────────────────────
// 1. PRESENTACIÓN DEL PLAN
// ─────────────────────────────────────────────
function PlanHeroSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const visionRef = useRef(null)
  const navRef = useRef(null)
  const statsRef = useRef(null)
  const counterRefs = useRef([])

  useGSAP(() => {
    const splitTitle = new SplitText(titleRef.current, { type: 'words,chars' })
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 })

      tl.from(splitTitle.chars, {
        opacity: 0, y: 80, rotationX: -90, duration: 0.7,
        stagger: 0.025, transformOrigin: '50% 50% -30px',
      })
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(visionRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8 }, '-=0.2')
      .fromTo(
        statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo(
        navRef.current?.children ? Array.from(navRef.current.children) : [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
        '-=0.3'
      )

      // Counter animation for stats
      counterRefs.current.forEach((el) => {
        if (!el) return
        const target = parseFloat(el.dataset.target)
        const isPercent = el.dataset.percent === 'true'
        // CÓDIGO CORREGIDO
        const counterObj = { val: 0 }; // 1. Guardamos el objeto en una variable

        gsap.to(counterObj, {          // 2. Usamos gsap.to (solo necesita objetivo y estado final)
          val: target,
          duration: 2, 
          delay: 1.2, 
          ease: 'power2.out',
          onUpdate: () => {            // 3. Leemos el valor directamente del objeto
            el.textContent = Math.round(counterObj.val) + (isPercent ? '%' : '');
          }
        });
      })

      // Floating decoration
      gsap.to('.hero-deco-circle', {
        y: -20, rotation: 15, duration: 4,
        repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 1.2,
      })
    }, sectionRef)
    return () => { ctx.revert(); splitTitle.revert() }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#F5C800] flex flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-deco-circle absolute top-10 right-10 w-72 h-72 rounded-full border-[50px] border-[#E0B400] opacity-30" />
        <div className="hero-deco-circle absolute -bottom-20 -left-20 w-96 h-96 rounded-full border-[60px] border-[#E0B400] opacity-20" />
        <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#D72638] opacity-50 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full">
        {/* Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-8 h-0.5 bg-[#D72638]" />
          <span className="text-[#D72638] font-bold text-xs tracking-[0.25em] uppercase">Documento de Trabajo N°1</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: title + vision */}
          <div>
            <h1
              ref={titleRef}
              className="font-black text-[#1A1A1A] leading-[0.9] tracking-[-0.04em] mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              PLAN DE<br />
              <span style={{ color: '#D72638' }}>GOBIERNO</span><br />
              2026–2031
            </h1>

            <p
              ref={subtitleRef}
              className="text-[#1A1A1A]/70 font-semibold text-lg leading-relaxed max-w-md mb-8"
              style={{ opacity: 0 }}
            >
              Partido del Buen Gobierno — una transformación profunda del Perú basada en la equidad, la sostenibilidad y la inclusión.
            </p>

            {/* Vision quote */}
            <blockquote
              ref={visionRef}
              className="border-l-4 border-[#D72638] pl-5 mb-10"
              style={{ opacity: 0 }}
            >
              <p className="text-[#1A1A1A] font-medium italic leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)' }}>
                "Un Estado activo que garantice derechos, impulse el desarrollo territorial y promueva la transición hacia una economía verde y del conocimiento."
              </p>
              <footer className="mt-2 text-[#D72638] font-bold text-xs tracking-widest uppercase">Visión General PBG</footer>
            </blockquote>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-4">
              {[
                { target: 5, percent: true, label: 'Crecimiento PBI mínimo' },
                { target: 20, percent: true, label: 'Meta pobreza al 2031' },
                { target: 7, percent: false, label: 'Planes sectoriales' },
                { target: 182, percent: false, label: 'Páginas de propuestas' },
              ].map((s, i) => (
                <div key={i} className="bg-[#1A1A1A] rounded-2xl px-5 py-3 text-center min-w-[100px]" style={{ opacity: 0 }}>
                  <div className="font-black text-[#F5C800] text-3xl leading-none">
                    <span
                      ref={el => counterRefs.current[i] = el}
                      data-target={s.target}
                      data-percent={s.percent}
                    >0</span>
                    {s.percent ? '%' : ''}
                  </div>
                  <div className="text-[#F5C800]/60 text-[10px] font-semibold mt-1 leading-tight max-w-[90px]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: navigation guide */}
          <div>
            <div className="bg-[#1A1A1A] rounded-[2rem] p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-5 h-0.5 bg-[#F5C800]" />
                <span className="text-[#F5C800] font-bold text-xs tracking-[0.2em] uppercase">Navegación del Plan</span>
              </div>
              <p className="text-white/60 text-sm mb-6">Haz clic en cualquier eje para navegar directo a esa sección</p>
              <div ref={navRef} className="flex flex-col gap-2">
                {EJES.map((eje) => (
                  <a
                    key={eje.id}
                    href={eje.anchor}
                    className="flex items-center gap-4 group bg-white/5 hover:bg-[#D72638] rounded-xl px-4 py-3 transition-all duration-300"
                    style={{ opacity: 0 }}
                  >
                    <span className="font-black text-[#F5C800] text-lg w-8 group-hover:text-white transition-colors">{eje.num}</span>
                    <span className="text-white font-semibold text-sm group-hover:text-white transition-colors">{eje.label}</span>
                    <span className="ml-auto text-white/30 group-hover:text-white text-xs transition-all duration-300 group-hover:translate-x-1">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[#1A1A1A]/40 text-[10px] font-bold tracking-widest uppercase">Explorar el Plan</span>
        <div className="w-0.5 h-8 bg-[#1A1A1A]/20 rounded-full overflow-hidden">
          <div className="w-full h-1/2 bg-[#D72638]/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 2. PLAN ECONÓMICO
// ─────────────────────────────────────────────
function EconomiaSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)
  const metaRef = useRef(null)

  useGSAP(() => {
    const split = new SplitText(titleRef.current, { type: 'words' })
    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0, y: 60, rotation: -5, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.fromTo(
        cardsRef.current?.querySelectorAll('.eco-card') || [],
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(
        metaRef.current?.children ? Array.from(metaRef.current.children) : [],
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(2)',
          scrollTrigger: { trigger: metaRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section id="plan-economia" ref={sectionRef} className="bg-[#F5C800] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#D72638] text-white font-black text-sm px-4 py-1.5 rounded-full">01</span>
            <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Plan Económico</span>
          </div>
          <h2
            ref={titleRef}
            className="font-black text-[#1A1A1A] leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
          >
            ECONOMÍA PARA EL<br />
            <span className="text-[#D72638]">BIENESTAR AL 2031</span>
          </h2>
          <p className="text-[#1A1A1A]/70 font-medium max-w-xl text-lg">
            Hacia un Perú con desarrollo económico sostenido, formalización creciente, equidad social y servicios públicos de calidad.
          </p>
        </div>

        {/* Meta highlights */}
        <div ref={metaRef} className="flex flex-wrap gap-4 mb-12">
          {[
            { label: 'Crecimiento PBI mínimo', value: '≥ 5%', bg: '#D72638', text: '#fff' },
            { label: 'Informalidad laboral', value: '≤ 50%', bg: '#1A1A1A', text: '#F5C800' },
            { label: 'Pobreza objetivo', value: '≤ 20%', bg: '#D72638', text: '#fff' },
            { label: 'Inversión en I+D', value: '≥ 1% PBI', bg: '#1A1A1A', text: '#F5C800' },
          ].map((m, i) => (
            <div key={i} className="rounded-2xl px-6 py-4 flex flex-col items-center min-w-[140px]" style={{ background: m.bg }}>
              <span className="font-black text-2xl leading-none" style={{ color: m.text }}>{m.value}</span>
              <span className="text-xs font-semibold mt-1 text-center leading-tight opacity-80" style={{ color: m.text }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* 10 Objectives grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {ECONOMIA_OBJETIVOS.map((obj, i) => (
            <div
              key={i}
              className="eco-card rounded-[1.5rem] p-5 flex flex-col group cursor-default hover:-translate-y-2 transition-transform duration-300"
              style={{
                background: i % 2 === 0 ? '#1A1A1A' : 'white',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
              }}
            >
              <span
                className="font-black text-5xl leading-none mb-3"
                style={{ color: i % 2 === 0 ? 'rgba(245,200,0,0.15)' : 'rgba(26,26,26,0.07)' }}
              >
                {obj.num}
              </span>
              <h3
                className="font-black text-sm leading-tight mb-2"
                style={{ color: i % 2 === 0 ? '#F5C800' : '#1A1A1A' }}
              >
                {obj.title}
              </h3>
              <p
                className="text-xs leading-relaxed font-medium mt-auto"
                style={{ color: i % 2 === 0 ? 'rgba(245,200,0,0.6)' : 'rgba(26,26,26,0.6)' }}
              >
                {obj.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 3. PLAN DE SALUD
// ─────────────────────────────────────────────
function SaludSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const lineaRefs = useRef([])
  const metasRef = useRef(null)

  useGSAP(() => {
    const split = new SplitText(titleRef.current, { type: 'words' })
    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0, x: -60, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      lineaRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        )
      })

      gsap.fromTo(
        metasRef.current?.children ? Array.from(metasRef.current.children) : [],
        { opacity: 0, scale: 0.5, rotation: -10 },
        {
          opacity: 1, scale: 1, rotation: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(2)',
          scrollTrigger: { trigger: metasRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section id="plan-salud" ref={sectionRef} className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#1A1A1A] text-[#F5C800] font-black text-sm px-4 py-1.5 rounded-full">02</span>
            <span className="text-[#1A1A1A] font-bold text-xs tracking-[0.2em] uppercase">Plan de Salud</span>
          </div>
          <h2
            ref={titleRef}
            className="font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em', color: '#1A1A1A' }}
          >
            SALUD UNIVERSAL<br />
            <span className="text-[#D72638]">CON EQUIDAD 2026–2031</span>
          </h2>
          <p className="text-[#1A1A1A]/60 font-medium max-w-xl text-lg italic">
            "Salud Universal con Equidad, Calidad e Interculturalidad"
          </p>
        </div>

        {/* Vision box */}
        <div className="bg-[#F5C800] rounded-[2rem] p-8 mb-12">
          <p className="font-bold text-[#1A1A1A] text-lg leading-relaxed">
            Para el 2031, el Perú será un país con un sistema de salud articulado, universal, equitativo, centrado en las personas y comunidades, con enfoque territorial, de curso de vida, intercultural, de género y basado en derechos humanos.
          </p>
        </div>

        {/* 6 action lines */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {SALUD_LINEAS.map((linea, i) => (
            <div
              key={i}
              ref={el => lineaRefs.current[i] = el}
              className="rounded-[1.5rem] p-6 hover:-translate-y-1 transition-transform duration-300 cursor-default"
              style={{ background: i % 3 === 0 ? '#D72638' : i % 3 === 1 ? '#1A1A1A' : '#F5C800', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
            >
              <div className="text-3xl mb-3">{linea.icon}</div>
              <h3
                className="font-black text-base mb-2 leading-tight"
                style={{ color: i % 3 === 2 ? '#1A1A1A' : 'white' }}
              >
                {linea.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: i % 3 === 2 ? 'rgba(26,26,26,0.7)' : 'rgba(255,255,255,0.7)' }}
              >
                {linea.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Metas */}
        <div>
          <h3 className="font-black text-[#1A1A1A] text-2xl mb-6">Metas al 2031</h3>
          <div ref={metasRef} className="flex flex-wrap gap-5">
            {SALUD_METAS.map((m, i) => (
              <div
                key={i}
                className="bg-[#D72638] rounded-[2rem] px-8 py-6 flex flex-col items-center min-w-[160px]"
                style={{ boxShadow: '0 8px 32px rgba(215,38,56,0.3)' }}
              >
                <span className="font-black text-white text-4xl leading-none">{m.val}</span>
                <span className="text-white/70 text-sm font-semibold mt-2 text-center">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 4. PLAN DE EDUCACIÓN
// ─────────────────────────────────────────────
function EducacionSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const objRefs = useRef([])

  useGSAP(() => {
    const split = new SplitText(titleRef.current, { type: 'words,chars' })
    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0, y: 50, rotation: 5, duration: 0.7, stagger: 0.08, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      objRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            delay: i * 0.05,
          }
        )
      })

      // Animated line connector
      gsap.fromTo('.edu-line',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1, duration: 2, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'bottom 30%', scrub: 1 },
        }
      )
    }, sectionRef)
    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section id="plan-educacion" ref={sectionRef} className="bg-[#1A1A1A] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#D72638] text-white font-black text-sm px-4 py-1.5 rounded-full">03</span>
            <span className="text-[#F5C800] font-bold text-xs tracking-[0.2em] uppercase">Plan de Educación</span>
          </div>
          <h2
            ref={titleRef}
            className="font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em', color: '#F5C800' }}
          >
            EDUCACIÓN PARA EL<br />
            <span className="text-[#D72638]">SIGLO XXI</span>
          </h2>
          <p className="text-white/60 font-medium max-w-xl text-lg italic">
            "Por un Perú educado, equitativo, científico y diverso"
          </p>
        </div>

        {/* Vision */}
        <div className="border border-[#F5C800]/20 rounded-[2rem] p-8 mb-14">
          <p className="text-white font-medium text-lg leading-relaxed">
            Una educación inclusiva, intercultural, equitativa y de calidad, centrada en el desarrollo pleno de las personas, que fortalezca la ciudadanía, la justicia social, el pensamiento crítico, la creatividad y la ciencia, asegurando trayectorias educativas completas desde la primera infancia hasta la educación superior.
          </p>
        </div>

        {/* Objectives timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-[220px] top-0 bottom-0 w-0.5 bg-[#D72638]/20 edu-line" />

          <div className="flex flex-col gap-6">
            {EDUCACION_OBJETIVOS.map((obj, i) => (
              <div
                key={i}
                ref={el => objRefs.current[i] = el}
                className="flex flex-col lg:flex-row gap-6 items-start group"
              >
                {/* Number block */}
                <div className="flex-shrink-0 w-full lg:w-[200px] flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: i % 2 === 0 ? '#D72638' : '#F5C800', color: i % 2 === 0 ? 'white' : '#1A1A1A' }}
                  >
                    {obj.num}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/5 hover:bg-white/10 rounded-2xl p-6 transition-all duration-300 cursor-default">
                  <h3 className="font-black text-[#F5C800] text-lg mb-2">{obj.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{obj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Evaluación docente continua', icon: '👩‍🏫' },
            { label: 'Becas para zonas rurales', icon: '🎓' },
            { label: 'Digitalización educativa', icon: '💻' },
            { label: 'Cierre de brecha infraestructura', icon: '🏫' },
          ].map((item, i) => (
            <div key={i} className="bg-[#F5C800] rounded-2xl p-5 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-bold text-[#1A1A1A] text-sm leading-tight">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 5. PLAN DE SEGURIDAD CIUDADANA
// ─────────────────────────────────────────────
function SeguridadSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const trackRef = useRef(null)
  const statRef = useRef(null)

  useGSAP(() => {
    const split = new SplitText(titleRef.current, { type: 'words' })
    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0, y: -60, rotation: 'random(-15,15)', duration: 0.8,
        stagger: 0.1, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      gsap.fromTo(
        trackRef.current?.querySelectorAll('.seg-card') || [],
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: trackRef.current, start: 'top 85%' },
        }
      )

      gsap.fromTo(
        statRef.current?.children ? Array.from(statRef.current.children) : [],
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(2)',
          scrollTrigger: { trigger: statRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section id="plan-seguridad" ref={sectionRef} className="bg-[#D72638] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#1A1A1A] text-[#F5C800] font-black text-sm px-4 py-1.5 rounded-full">04</span>
            <span className="text-white font-bold text-xs tracking-[0.2em] uppercase">Plan de Seguridad</span>
          </div>
          <h2
            ref={titleRef}
            className="font-black leading-tight mb-4 text-white"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
          >
            SEGURIDAD Y<br />
            <span className="text-[#F5C800]">JUSTICIA FIRME</span><br />
            2026–2031
          </h2>
          <p className="text-white/80 font-medium max-w-xl text-lg">
            Al 2031, el Perú contará con un sistema de seguridad ciudadana eficaz, articulado, descentralizado, con activa coordinación de los gobiernos subnacionales.
          </p>
        </div>

        {/* Extorsion stat callout */}
        <div ref={statRef} className="flex flex-wrap gap-5 mb-14">
          <div className="bg-[#1A1A1A] rounded-[2rem] px-8 py-6 flex flex-col items-center min-w-[180px]">
            <span className="font-black text-[#F5C800] text-5xl leading-none">679%</span>
            <span className="text-white/60 text-sm font-semibold mt-2 text-center">Crecimiento extorsión<br />2020–2024</span>
          </div>
          <div className="bg-white/10 rounded-[2rem] px-8 py-6 flex-1 flex items-center">
            <p className="text-white font-medium leading-relaxed">
              La extorsión se ha consolidado como una de las actividades criminales más lucrativas del Perú. Recuperaremos la paz social con una política <strong>firme y preventiva</strong> frente al crimen organizado.
            </p>
          </div>
        </div>

        {/* 5 Strategy cards */}
        <div ref={trackRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SEGURIDAD_EJES.map((eje, i) => (
            <div
              key={i}
              className="seg-card rounded-[1.5rem] p-6 hover:-translate-y-1 transition-transform duration-300 cursor-default"
              style={{ background: i % 2 === 0 ? '#1A1A1A' : 'white' }}
            >
              <span
                className="font-black text-5xl leading-none block mb-3"
                style={{ color: i % 2 === 0 ? 'rgba(245,200,0,0.1)' : 'rgba(215,38,56,0.08)' }}
              >
                0{i + 1}
              </span>
              <h3
                className="font-black text-base mb-3 leading-tight"
                style={{ color: i % 2 === 0 ? '#F5C800' : '#1A1A1A' }}
              >
                {eje.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {eje.actions.map((act, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: i % 2 === 0 ? '#D72638' : '#1A1A1A' }}
                    >
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span
                      className="text-xs font-medium leading-snug"
                      style={{ color: i % 2 === 0 ? 'rgba(245,200,0,0.75)' : 'rgba(26,26,26,0.7)' }}
                    >
                      {act}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 6. PLAN DE AMBIENTE
// ─────────────────────────────────────────────
function AmbienteSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const visionRef = useRef(null)

  useGSAP(() => {
    const split = new SplitText(titleRef.current, { type: 'words' })
    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0, scale: 0.5, rotation: 'random(-20,20)', duration: 0.8,
        stagger: 0.08, ease: 'back.out(2)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.fromTo(visionRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: visionRef.current, start: 'top 85%' } }
      )
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.amb-card') || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section id="plan-ambiente" ref={sectionRef} className="bg-[#F5C800] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#D72638] text-white font-black text-sm px-4 py-1.5 rounded-full">05</span>
            <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Plan de Ambiente</span>
          </div>
          <h2
            ref={titleRef}
            className="font-black leading-tight mb-4 text-[#1A1A1A]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
          >
            SOSTENIBILIDAD<br />
            <span className="text-[#D72638]">Y FUTURO VERDE</span>
          </h2>
        </div>

        {/* Vision */}
        <div ref={visionRef} className="bg-[#1A1A1A] rounded-[2rem] p-8 mb-14">
          <p className="text-[#F5C800] font-bold text-lg leading-relaxed">
            El Estado, la inversión privada y la sociedad civil actúan con una visión común para salvaguardar la naturaleza. El cumplimiento de las metas climáticas impulsa un desarrollo sostenible innovador, competitivo y justo que erradica la pobreza y asegura una gestión resiliente.
          </p>
        </div>

        {/* 8 objectives */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AMBIENTE_OBJETIVOS.map((obj, i) => (
            <div
              key={i}
              className="amb-card rounded-[1.5rem] p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300 cursor-default"
              style={{
                background: i % 2 === 0 ? '#1A1A1A' : 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <span className="text-3xl mb-3">{obj.icon}</span>
              <h3
                className="font-black text-sm mb-2 leading-tight"
                style={{ color: i % 2 === 0 ? '#F5C800' : '#1A1A1A' }}
              >
                {obj.title}
              </h3>
              <p
                className="text-xs leading-relaxed font-medium mt-auto"
                style={{ color: i % 2 === 0 ? 'rgba(245,200,0,0.6)' : 'rgba(26,26,26,0.6)' }}
              >
                {obj.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Energy callout */}
        <div className="mt-12 bg-[#D72638] rounded-[2rem] p-8 text-center">
          <p className="text-white font-black text-xl mb-2">Meta: 30% de conservación territorial al 2030</p>
          <p className="text-white/70 font-medium">Zonas terrestres, aguas continentales, costeras y marinas protegidas</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 7. PLAN DE INTEGRIDAD Y BUEN GOBIERNO
// ─────────────────────────────────────────────
function IntegridadSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const lineaRefs = useRef([])
  const pillarsRef = useRef(null)

  useGSAP(() => {
    const split = new SplitText(titleRef.current, { type: 'words,chars' })
    const ctx = gsap.context(() => {
      gsap.from(split.chars, {
        opacity: 0, y: 40, rotationX: -90, duration: 0.6,
        stagger: 0.02, ease: 'back.out(1.7)', transformOrigin: '50% 100%',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      lineaRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
            delay: i * 0.1,
          }
        )
      })

      gsap.fromTo(
        pillarsRef.current?.children ? Array.from(pillarsRef.current.children) : [],
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section id="plan-integridad" ref={sectionRef} className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#1A1A1A] text-[#F5C800] font-black text-sm px-4 py-1.5 rounded-full">06</span>
            <span className="text-[#1A1A1A] font-bold text-xs tracking-[0.2em] uppercase">Integridad y Buen Gobierno</span>
          </div>
          <h2
            ref={titleRef}
            className="font-black leading-tight mb-4 text-[#1A1A1A]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
          >
            ESTADO ÍNTEGRO<br />
            <span className="text-[#D72638]">Y TRANSPARENTE</span>
          </h2>
          <p className="text-[#1A1A1A]/60 font-medium max-w-xl text-lg italic">
            "Integridad para gobernar, gobernar para transformar"
          </p>
        </div>

        {/* Vision */}
        <div className="bg-[#F5C800] rounded-[2rem] p-8 mb-14">
          <p className="font-bold text-[#1A1A1A] text-lg leading-relaxed">
            Para el año 2031, el Perú será un país con instituciones íntegras, transparentes y confiables, donde la corrupción haya sido reducida de manera sustantiva mediante un Estado profesional, digital, eficiente y orientado al bien común.
          </p>
        </div>

        {/* 3 action lines */}
        <div className="grid lg:grid-cols-3 gap-6 mb-14">
          {INTEGRIDAD_LINEAS.map((linea, i) => (
            <div
              key={i}
              ref={el => lineaRefs.current[i] = el}
              className="rounded-[1.5rem] overflow-hidden hover:-translate-y-1 transition-transform duration-300 cursor-default"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', background: i === 1 ? '#1A1A1A' : i === 2 ? '#D72638' : '#F5C800' }}
            >
              <div className="p-6">
                <span
                  className="font-black text-6xl leading-none block mb-4"
                  style={{ color: i === 0 ? 'rgba(26,26,26,0.08)' : 'rgba(255,255,255,0.08)' }}
                >
                  {linea.num}
                </span>
                <h3
                  className="font-black text-lg mb-4 leading-tight"
                  style={{ color: i === 0 ? '#1A1A1A' : '#F5C800' }}
                >
                  {linea.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {linea.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: i === 0 ? '#D72638' : '#F5C800' }}
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? 'white' : '#1A1A1A'} strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span
                        className="text-xs font-medium leading-snug"
                        style={{ color: i === 0 ? 'rgba(26,26,26,0.8)' : 'rgba(255,255,255,0.8)' }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CNIBG creation callout */}
        <div ref={pillarsRef} className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Centro Nacional de Integridad', icon: '🏛️', desc: 'Órgano autónomo creado dentro de PCM' },
            { label: 'Dashboard Nacional', icon: '📊', desc: 'Publicación pública de indicadores en tiempo real' },
            { label: 'Ranking Regional', icon: '🏆', desc: 'Informe anual de integridad por región' },
            { label: 'Evaluación OCDE', icon: '🌐', desc: 'Metodología internacional independiente' },
          ].map((p, i) => (
            <div key={i} className="bg-[#1A1A1A] rounded-2xl p-5 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl mb-2">{p.icon}</div>
              <h4 className="font-bold text-[#F5C800] text-sm mb-1">{p.label}</h4>
              <p className="text-white/50 text-xs">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 8. RESUMEN – EJES ESTRATÉGICOS & META FINAL
// ─────────────────────────────────────────────
function ResumenSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const axesRef = useRef(null)
  const metaRef = useRef(null)
  const commitRef = useRef(null)

  useGSAP(() => {
    const split = new SplitText(titleRef.current, { type: 'words' })
    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0, y: 80, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.fromTo(
        axesRef.current?.querySelectorAll('.eje-card') || [],
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: axesRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(commitRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: commitRef.current, start: 'top 85%' } }
      )
      gsap.fromTo(metaRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: metaRef.current, start: 'top 85%' },
        }
      )

      // Parallax BG
      gsap.to('.resumen-bg-deco', {
        y: -80, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })
    }, sectionRef)
    return () => { ctx.revert(); split.revert() }
  }, [])

  return (
    <section id="plan-resumen" ref={sectionRef} className="bg-[#1A1A1A] py-24 overflow-hidden relative">
      {/* BG deco */}
      <div className="resumen-bg-deco absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border-[80px] border-[#F5C800]/5" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full border-[60px] border-[#D72638]/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#D72638] text-white font-black text-sm px-4 py-1.5 rounded-full">07</span>
            <span className="text-[#F5C800] font-bold text-xs tracking-[0.2em] uppercase">Resumen Estratégico</span>
          </div>
          <h2
            ref={titleRef}
            className="font-black leading-tight mb-4 text-[#F5C800]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
          >
            6 EJES QUE<br />
            <span className="text-[#D72638]">TRANSFORMAN EL PERÚ</span>
          </h2>
          <p className="text-white/60 font-medium max-w-xl text-lg">
            El PBG 2026–2031 plantea transformar el Perú hacia un modelo de desarrollo equitativo, sostenible y libre de corrupción.
          </p>
        </div>

        {/* 6 Strategic axes */}
        <div ref={axesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {RESUMEN_EJES.map((eje, i) => (
            <div
              key={i}
              className="eje-card rounded-[1.5rem] p-7 flex flex-col group cursor-default hover:-translate-y-2 transition-transform duration-300"
              style={{ background: i % 2 === 0 ? '#D72638' : 'rgba(255,255,255,0.05)', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="font-black text-5xl leading-none"
                  style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(245,200,0,0.1)' }}
                >
                  {eje.num}
                </span>
                <span className="text-3xl">{eje.icon}</span>
              </div>
              <h3
                className="font-black text-base mb-3 leading-tight"
                style={{ color: i % 2 === 0 ? '#F5C800' : '#F5C800' }}
              >
                {eje.title}
              </h3>
              <p
                className="text-sm leading-relaxed font-medium mt-auto"
                style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.75)' : 'rgba(245,200,0,0.6)' }}
              >
                {eje.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Commitments */}
        <div ref={commitRef} className="bg-[#F5C800] rounded-[2rem] p-8 mb-10">
          <h3 className="font-black text-[#1A1A1A] text-2xl mb-6">Compromisos Estratégicos</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🌏', label: 'Integración Regional', desc: 'Alianza del Pacífico, CAN, APEC y adhesión a la OCDE' },
              { icon: '🔬', label: 'Inversión en CTI', desc: 'Ciencia, tecnología e innovación sostenida' },
              { icon: '👥', label: 'Participación Ciudadana', desc: 'Control y evaluación activa de políticas públicas' },
              { icon: '🌱', label: 'Enfoques Transversales', desc: 'Género, interculturalidad, clima y digitalización' },
            ].map((c, i) => (
              <div key={i} className="bg-[#1A1A1A] rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{c.icon}</div>
                <h4 className="font-bold text-[#F5C800] text-sm mb-1">{c.label}</h4>
                <p className="text-white/50 text-xs">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meta Final */}
        <div
          ref={metaRef}
          className="rounded-[2rem] p-10 text-center relative overflow-hidden"
          style={{ background: '#D72638', boxShadow: '0 20px 60px rgba(215,38,56,0.4)' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full border-[40px] border-white/5" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border-[30px] border-white/5" />
          </div>
          <p className="text-white/70 font-bold text-sm tracking-[0.2em] uppercase mb-3">Meta Final 2031</p>
          <h3 className="font-black text-white text-3xl md:text-4xl leading-tight mb-4">
            Un Perú justo, competitivo,<br />
            <span className="text-[#F5C800]">verde e inclusivo</span>
          </h3>
          <p className="text-white/75 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Donde el crecimiento económico, la igualdad social y el respeto ambiental vayan de la mano. El PBG busca consolidar un nuevo contrato social que combine eficiencia estatal, desarrollo humano y sostenibilidad ambiental.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="#"
              className="bg-[#F5C800] text-[#1A1A1A] font-black px-8 py-3.5 rounded-full hover:bg-white transition-all duration-200 hover:-translate-y-1 text-sm tracking-wide"
            >
              Descargar Plan Completo
            </a>
            <a
              href="/voluntarios"
              className="border-2 border-white text-white font-black px-8 py-3.5 rounded-full hover:bg-white hover:text-[#D72638] transition-all duration-200 hover:-translate-y-1 text-sm tracking-wide"
            >
              Únete al PBG
            </a>
          </div>
        </div>

        {/* Footer brand */}
        <div className="mt-12 text-center">
          <p className="text-white/30 text-sm font-semibold">
            www.partidodelbuengobierno.pe — Documento de Trabajo N°1 — Plan de Gobierno 2026–2031
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export const PlanDeGobierno = () =>  {
  return (
    <main className="overflow-x-hidden">
      <PlanHeroSection />
      <EconomiaSection />
      <SaludSection />
      <EducacionSection />
      <SeguridadSection />
      <AmbienteSection />
      <IntegridadSection />
      <ResumenSection />
    </main>
  )
}
