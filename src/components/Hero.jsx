import { motion } from 'framer-motion';

export default function Hero({ profile }) {
  const nameParts = profile.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <section id="home" className="hero">
      <div className="wrap hero-grid">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Badge */}
          <div className="hero-badge">
            <span className="dot" />
            <span>AVAILABLE FOR FREELANCE &amp; FULL-TIME ROLES</span>
          </div>

          {/* Heading */}
          <h1>
            Hi, I&apos;m <span className="accent">{firstName}</span>
            <br />
            <span>{lastName}</span>
          </h1>

          {/* Subtitle / Role */}
          <div className="hero-role" id="heroRole">
            Full Stack Developer &middot; C++ &middot; Django &middot; MERN Stack
          </div>

          {/* Description */}
          <p className="hero-desc" id="heroDesc">
            {profile.introduction}
          </p>

          {/* Actions */}
          <div className="hero-actions">
            <a className="btn btn-primary" id="heroCtaPrimary" href="#projects">
              View Projects &rarr;
            </a>
            <a className="btn btn-secondary" id="heroCtaSecondary" href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>

          {/* Bottom Chips */}
          <div className="chip-row hero-tags" id="heroTags">
            {['C++ & Python', 'React + Node.js', 'MongoDB & MySQL', 'Problem Solving'].map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Snapshot Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="panel snapshot"
          id="snapshotPanel"
        >
          <div className="snapshot-head">
            <span className="snapshot-title" id="snapshotTitle">SYSTEM // developer.snapshot</span>
            <div className="snapshot-dots">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="snapshot-body" id="snapshotBody">
            <p>
              <span className="k">const</span> developer = <span className="punct">{'{'}</span>
            </p>
            <p className="pl-6">
              name: <span className="v">&quot;Rishabh Kumar Tiwari&quot;</span>,
            </p>
            <p className="pl-6">
              role: <span className="v">&quot;Full Stack Developer&quot;</span>,
            </p>
            <p className="pl-6">
              focus: <span className="v">&quot;Scalable web products&quot;</span>,
            </p>
            <p className="pl-6">
              stack: <span className="punct">[</span>
              <span className="v">&quot;React&quot;</span>,{' '}
              <span className="v">&quot;Node.js&quot;</span>,{' '}
              <span className="v">&quot;MongoDB&quot;</span>,{' '}
              <span className="v">&quot;Django&quot;</span>
              <span className="punct">]</span>,
            </p>
            <p className="pl-6">
              coffee: <span className="k">true</span>
            </p>
            <p><span className="punct">{'};'}</span></p>
          </div>

          <div className="snapshot-footer">
            <div className="led-row" id="snapshotLeds">
              <div className="led">
                <span className="led-dot on" />
                BUILD
              </div>
              <div className="led">
                <span className="led-dot on" />
                TESTS
              </div>
              <div className="led">
                <span className="led-dot idle" />
                DEPLOY
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
