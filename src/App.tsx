import { useEffect, useState, useRef } from 'react';
import './styles.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  hue: number;
}

interface Universe {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
}

function CosmicBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [universes, setUniverses] = useState<Universe[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 10,
      opacity: Math.random() * 0.7 + 0.3,
      hue: Math.random() * 60 + 240,
    }));
    setParticles(newParticles);

    const colors = [
      'rgba(147, 112, 219, 0.4)',
      'rgba(255, 182, 193, 0.3)',
      'rgba(100, 149, 237, 0.35)',
      'rgba(255, 215, 0, 0.25)',
      'rgba(64, 224, 208, 0.3)',
    ];

    const newUniverses: Universe[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      size: Math.random() * 200 + 80,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setUniverses(newUniverses);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0612] via-[#120a1a] to-[#0d0618]" />

      {/* Nebula layers */}
      <div className="absolute inset-0 nebula-1" />
      <div className="absolute inset-0 nebula-2" />

      {/* Floating universes */}
      {universes.map((u) => (
        <div
          key={u.id}
          className="absolute rounded-full universe-orb"
          style={{
            left: `${u.x}%`,
            top: `${u.y}%`,
            width: `${u.size}px`,
            height: `${u.size}px`,
            background: `radial-gradient(circle at 30% 30%, ${u.color}, transparent 70%)`,
            animationDelay: `${u.delay}s`,
          }}
        />
      ))}

      {/* Stars/particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full star-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: `hsla(${p.hue}, 80%, 80%, ${p.opacity})`,
            animationDuration: `${p.speed}s`,
            boxShadow: `0 0 ${p.size * 2}px hsla(${p.hue}, 80%, 70%, 0.5)`,
          }}
        />
      ))}

      {/* Scan lines overlay */}
      <div className="absolute inset-0 scanlines" />
    </div>
  );
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
    >
      {children}
    </div>
  );
}

function TheoryCard({
  title,
  description,
  icon,
  delay = 0
}: {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}) {
  return (
    <div
      className="theory-card group relative p-6 md:p-8 rounded-2xl overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      <div className="absolute inset-0 border border-white/10 rounded-2xl" />
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <span className="text-4xl md:text-5xl mb-4 block">{icon}</span>
        <h3 className="font-cinzel text-lg md:text-xl text-amber-200/90 mb-3">{title}</h3>
        <p className="font-cormorant text-base md:text-lg text-gray-300/80 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <CosmicBackground />

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center px-4 md:px-8">
        <div
          className="text-center z-10 max-w-5xl mx-auto"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="hero-entrance">
            <span className="inline-block font-cormorant text-sm md:text-base tracking-[0.3em] text-purple-300/70 uppercase mb-4 md:mb-6">
              Beyond the Observable
            </span>
            <h1 className="font-cinzel text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-wide mb-6 md:mb-8 hero-title">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-200 to-cyan-200">
                MULTIVERSE
              </span>
            </h1>
            <p className="font-cormorant text-xl sm:text-2xl md:text-3xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed italic">
              "The universe is not only queerer than we suppose, but queerer than we can suppose."
            </p>
            <span className="block font-cormorant text-base md:text-lg text-purple-300/60 mt-4">
              — J.B.S. Haldane
            </span>
          </div>

          <div className="mt-12 md:mt-16 scroll-indicator">
            <div className="w-6 h-10 md:w-8 md:h-12 border-2 border-white/30 rounded-full mx-auto flex justify-center">
              <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 scroll-dot" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* What is the Multiverse */}
        <Section className="px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-8 md:mb-12 text-amber-100/90">
              Is the Multiverse Real?
            </h2>
            <div className="space-y-6 md:space-y-8">
              <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-gray-200/85 leading-relaxed">
                The multiverse hypothesis suggests our universe is just one of potentially
                <span className="text-purple-300 font-semibold"> infinite parallel realities</span>,
                each with its own laws of physics, histories, and possibilities. While it sounds
                like science fiction, this concept emerges from rigorous theoretical physics.
              </p>
              <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-gray-200/85 leading-relaxed">
                From quantum mechanics to cosmic inflation, multiple independent lines of scientific
                inquiry point toward a cosmos far stranger and more vast than we ever imagined.
              </p>
            </div>
          </div>
        </Section>

        {/* Theories Grid */}
        <Section className="px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-center mb-10 md:mb-16 text-amber-100/90">
              Leading Multiverse Theories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <TheoryCard
                icon="🌊"
                title="Many-Worlds Interpretation"
                description="Every quantum measurement splits reality into parallel branches. When you flip a coin, both outcomes occur — in separate universes. Proposed by Hugh Everett in 1957."
                delay={0}
              />
              <TheoryCard
                icon="🎈"
                title="Eternal Inflation"
                description="The Big Bang wasn't unique. Cosmic inflation continues forever, spawning bubble universes like ours in an endless quantum foam. Each bubble: a new cosmos."
                delay={100}
              />
              <TheoryCard
                icon="🎻"
                title="String Theory Landscape"
                description="String theory suggests 10^500 possible configurations of extra dimensions. Each configuration yields different physics — perhaps each exists somewhere in the multiverse."
                delay={200}
              />
              <TheoryCard
                icon="🔄"
                title="Cyclic Cosmology"
                description="Our universe may be one beat in an eternal cosmic pulse — expanding, contracting, and rebirthing. Each cycle spawns a new universe with new initial conditions."
                delay={300}
              />
            </div>
          </div>
        </Section>

        {/* Evidence Section */}
        <Section className="px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="evidence-box relative p-6 sm:p-8 md:p-12 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30" />
              <div className="absolute inset-0 border border-purple-500/20 rounded-3xl" />

              <div className="relative z-10">
                <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 text-cyan-200/90">
                  The Evidence Question
                </h2>
                <div className="space-y-4 md:space-y-6 font-cormorant text-lg sm:text-xl md:text-2xl text-gray-200/85 leading-relaxed">
                  <p>
                    <span className="text-amber-300">Can we prove it?</span> This is where science meets philosophy.
                    By definition, other universes exist beyond our observable horizon — we cannot send probes
                    or receive signals from them.
                  </p>
                  <p>
                    Yet indirect evidence may exist: anomalies in the cosmic microwave background, the
                    fine-tuning of physical constants, and the mathematical elegance of theories that
                    naturally predict multiple universes.
                  </p>
                  <p className="text-purple-200/90 italic">
                    The absence of evidence is not evidence of absence — especially when the evidence,
                    by nature, lies forever beyond our reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Philosophical Implications */}
        <Section className="px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-12 text-amber-100/90">
              What Does It Mean?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="implication-card">
                <div className="text-4xl md:text-5xl mb-4">♾️</div>
                <h3 className="font-cinzel text-lg md:text-xl text-purple-200 mb-3">Every Possibility</h3>
                <p className="font-cormorant text-base md:text-lg text-gray-300/80">
                  In infinite universes, every possible version of you exists. Every choice you didn't make — someone made it.
                </p>
              </div>
              <div className="implication-card">
                <div className="text-4xl md:text-5xl mb-4">🎯</div>
                <h3 className="font-cinzel text-lg md:text-xl text-purple-200 mb-3">Fine-Tuning Explained</h3>
                <p className="font-cormorant text-base md:text-lg text-gray-300/80">
                  Why is our universe perfect for life? Perhaps it's selection bias — we exist because we're in a universe that allows it.
                </p>
              </div>
              <div className="implication-card">
                <div className="text-4xl md:text-5xl mb-4">🌌</div>
                <h3 className="font-cinzel text-lg md:text-xl text-purple-200 mb-3">Cosmic Humility</h3>
                <p className="font-cormorant text-base md:text-lg text-gray-300/80">
                  Our universe may be one grain of sand on an infinite beach — magnificent and insignificant simultaneously.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Closing */}
        <Section className="px-4 md:px-8 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="font-cormorant text-2xl sm:text-3xl md:text-4xl italic text-gray-200/90 leading-relaxed">
              "Not only is the universe stranger than we think, it is stranger than we
              <span className="text-purple-300">can</span> think."
            </blockquote>
            <cite className="block font-cormorant text-lg md:text-xl text-amber-200/60 mt-6 md:mt-8">
              — Werner Heisenberg
            </cite>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 md:py-12 px-4 text-center">
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-auto mb-6 md:mb-8" />
        <p className="font-cormorant text-xs md:text-sm text-gray-500/60">
          Requested by @mr49selfmade · Built by @clonkbot
        </p>
      </footer>
    </div>
  );
}

export default App;
