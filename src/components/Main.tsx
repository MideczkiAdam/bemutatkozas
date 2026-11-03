const skills = [
  ['01', 'HTML', 'Struktúra és hozzáférhetőség'],
  ['02', 'CSS', 'Design és animáció'],
  ['03', 'JavaScript', 'Interakció és logika'],
  ['04', 'C#', 'Alkalmazásfejlesztés'],
  ['05', 'Flutter', 'Mobil és cross-platform'],
  ['06', 'Git', 'Verziókezelés'],
]

const projects = [
  {
    category: 'Webshop',
    title: 'Finom falatok',
    description: 'Modern webáruház helyi termelők finomságaihoz.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85',
  },
  {
    category: 'Arculat',
    title: 'Forma stúdió',
    description: 'Digitális arculat egy budapesti kreatív stúdiónak.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=85',
  },
  {
    category: 'Mobil app',
    title: 'Focus',
    description: 'Fókuszt és nyugalmat segítő mobilalkalmazás.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=85',
  },
]

const Arrow = () => <span aria-hidden="true">↗</span>

const Main = () => {
  return (
    <>
      <header className="site-header">
        <nav className="container navigation" aria-label="Fő navigáció">
          <a className="brand" href="#fooldal" aria-label="Mideczki Ádám kezdőlap">
            <span className="brand-mark">M</span>
            <span>Mideczki Ádám</span>
          </a>
          <div className="nav-links">
            <a href="#rolam">Rólam</a>
            <a href="#keszsegek">Készségek</a>
            <a href="#projektek">Projektek</a>
            <a href="#kapcsolat">Kapcsolat</a>
          </div>
          <a className="nav-cta" href="#kapcsolat">Dolgozzunk együtt <Arrow /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="fooldal">
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow fade-in">Helló, örülök, hogy itt vagy <span>✦</span></p>
              <h1 className="fade-in">Ötletekből<br /><em>digitális élmények.</em></h1>
              <p className="hero-intro fade-in">Fejlesztő vagyok, aki letisztult, gyors és emberközpontú webes megoldásokat épít.</p>
              <div className="hero-actions fade-in">
                <a className="button button-primary" href="#projektek">Munkáim megtekintése <Arrow /></a>
                <a className="text-link" href="#rolam">Tudj meg többet <span>↓</span></a>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="hero-card"><span className="status-dot" />Elérhető új projektekhez</div>
              <div className="hero-monogram">M<span>.</span></div>
              <div className="floating-shape shape-square" />
              <div className="floating-shape shape-dot" />
            </div>
          </div>
          <div className="hero-footer container">
            <span>Budapest, Magyarország</span>
            <span className="scroll-hint"><span className="scroll-line" /> Görgess a folytatáshoz</span>
          </div>
        </section>

        <section className="section about" id="rolam">
          <div className="container about-grid">
            <div className="section-label"><span>01</span> Rólam</div>
            <div className="about-content">
              <div className="about-photo-wrap">
                <img className="about-photo" src="public/batiz.jpg" alt="Mideczki Ádám profilképe" />
                <span className="photo-badge">Építsünk<br />valami jót!</span>
              </div>
              <div className="about-copy">
                <h2>Hiszek a jó design és a jól működő kód találkozásában.</h2>
                <p>Több éve foglalkozom webfejlesztéssel és digitális termékek készítésével. A munkám során a technikai pontosságot kreatív gondolkodással ötvözöm, hogy minden projekt egyszerre legyen hasznos és emlékezetes.</p>
                <p>Amikor nem kódolok, új helyeket fedezek fel, fényképezek vagy egy jó könyvvel töltöm az időt.</p>
                <a className="text-link" href="#kapcsolat">Ismerjük meg egymást <Arrow /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="section skills-section" id="keszsegek">
          <div className="container">
            <div className="section-heading">
              <div className="section-label"><span>02</span> Készségek</div>
              <p>Eszközök és technológiák,<br />amelyekkel otthonosan dolgozom.</p>
            </div>
            <div className="skills-grid">
              {skills.map(([number, name, detail]) => (
                <div className="skill-card" key={name}>
                  <span className="skill-number">{number}</span>
                  <strong>{name}</strong>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projektek">
          <div className="container">
            <div className="section-heading">
              <div className="section-label"><span>03</span> Projektek</div>
              <p>Néhány munka, amelyre<br />különösen büszke vagyok.</p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={project.title}>
                  <div className="project-image">
                    <img src={project.image} alt={`${project.title} projekt előnézete`} />
                    <span className="project-tag">{project.category}</span>
                  </div>
                  <div className="project-info">
                    <span className="project-index">0{index + 1} / 03</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <a className="project-link" href="#kapcsolat">Megnézem <Arrow /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="kapcsolat">
          <div className="container contact-grid">
            <div className="contact-copy">
              <div className="section-label"><span>04</span> Kapcsolat</div>
              <h2>Van egy ötleted?<br /><em>Beszéljünk róla.</em></h2>
              <p>Írj pár sort a projektedről, és hamarosan jelentkezem.</p>
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
                <a href="https://github.com" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
                <a href="mailto:hello@example.com">E-mail <Arrow /></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="name">Név <span>*</span></label>
              <input id="name" name="name" type="text" placeholder="Hogy szólíthatlak?" required />
              <label htmlFor="email">E-mail <span>*</span></label>
              <input id="email" name="email" type="email" placeholder="te@email.hu" required />
              <label htmlFor="message">Üzenet <span>*</span></label>
              <textarea id="message" name="message" rows={4} placeholder="Mesélj a projektedről..." required />
              <button className="button button-primary" type="submit">Üzenet küldése <Arrow /></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <span>© 2026 Mideczki Ádám. Minden jog fenntartva.</span>
          <a href="#fooldal">Vissza a tetejére ↑</a>
        </div>
      </footer>
    </>
  )
}

export default Main
