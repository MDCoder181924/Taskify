import { Check } from 'lucide-react';

export default function Pricing() {
  const tiers = [
    {
      name: 'Base',
      price: '$0',
      desc: 'Forever free for individuals',
      features: [
        'Unlimited Personal Tasks',
        'Basic AI Summaries',
        '2GB Encrypted Storage',
        'Community Support',
      ],
      cta: 'Start Free',
      recommended: false,
    },
    {
      name: 'Cognitive',
      price: '$19',
      desc: 'Per user, per month',
      features: [
        'All Base Features',
        'Advanced Neural Scheduling',
        'Team Collaboration Hub',
        '100GB Encrypted Storage',
        '24/7 Concierge Support',
      ],
      cta: 'Get Pro Access',
      recommended: true,
    },
    {
      name: 'Singularity',
      price: 'Custom',
      desc: 'For global-scale operations',
      features: [
        'Custom AI Engine Training',
        '24/7 Priority Concierge',
        'Dedicated Cloud Infrastructure',
        'SLA Guaranteed Uptime',
        'Quantum Vault Encryption',
      ],
      cta: 'Contact Sales',
      recommended: false,
    },
  ];

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      
      {/* Header */}
      <div className="text-center mb-20 reveal reveal-fade-up">
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-6 tracking-tight">
          Precision Plans
        </h2>
        <p className="text-on-surface-variant font-sans text-lg max-w-2xl mx-auto leading-relaxed">
          Choose the cognitive power that matches your operational scale.
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`reveal reveal-scale-in glass-card p-8 md:p-10 rounded-[2.5rem] flex flex-col h-full hover:scale-105 active:scale-98 transition-all duration-500 relative z-10 ${
              tier.recommended 
                ? 'border-primary/45 bg-primary/[0.03] shadow-[0_0_50px_rgba(239,47,41,0.12)] md:scale-105 md:hover:scale-110 z-20' 
                : 'border-white/10'
            }`}
          >
            {/* Recommended Tag */}
            {tier.recommended && (
              <span className="absolute top-4 right-4 bg-primary text-[#050505] px-3.5 py-1 rounded-full font-mono text-[9px] uppercase font-bold tracking-wider shadow-[0_0_15px_rgba(239,47,41,0.4)]">
                Recommended
              </span>
            )}

            {/* Header info */}
            <div className="mb-8">
              <span className={`font-mono text-xs font-semibold uppercase tracking-widest ${
                tier.recommended ? 'text-primary' : 'text-on-surface-variant'
              }`}>
                {tier.name}
              </span>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="font-display font-extrabold text-5xl text-white tracking-tight">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-on-surface-variant text-sm font-sans">/mo</span>}
              </div>
              <p className="text-on-surface-variant text-sm mt-3 font-sans leading-relaxed">{tier.desc}</p>
            </div>

            {/* Feature List */}
            <ul className="space-y-4 mb-10 text-sm">
              {tier.features.map((feat) => (
                <li key={feat} className="flex gap-3 items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                    tier.recommended 
                      ? 'bg-primary/10 border-primary/20 text-primary' 
                      : 'bg-white/5 border-white/5 text-tertiary'
                  }`}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className={tier.recommended ? 'text-white font-medium' : 'text-on-surface-variant'}>
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button 
              className={`w-full py-4 rounded-xl font-sans font-bold text-sm transition-all duration-300 ${
                tier.recommended 
                  ? 'bg-primary text-[#050505] shadow-xl shadow-primary/15 hover:shadow-primary/30 hover:scale-103' 
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {tier.cta}
            </button>

          </div>
        ))}
      </div>

    </section>
  );
}
