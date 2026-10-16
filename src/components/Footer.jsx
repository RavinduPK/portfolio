import { personalData } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="f-logo">{personalData.shortName}</div>
      <div className="f-copy">&copy; {currentYear} {personalData.name} &mdash; Engineered with precision &amp; security</div>
      <div className="f-copy">Available for projects</div>
    </footer>
  );
}
