import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'

function HanketsuPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  // Read episode from URL query parameter on mount
  useEffect(() => {
    // Smooth scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const episodeParam = searchParams.get('episode');
    if (episodeParam) {
      const episodeId = parseInt(episodeParam, 10);
      if (episodeId >= 1 && episodeId <= 5) {
        setSelectedEpisode(episodeId);
      }
    }
  }, [searchParams]);

  // Define all episodes
  const episodes = [
    {
      id: 1,
      title: "Hanketsu - Episode 1",
      thumbnail: "/han1.webp",
      pdf: "https://drive.google.com/file/d/1AKrl4zMK3gJ6Og9R4ridMaSC4jcoDNGv/preview",
      summary: "In a striking vindication of corporate governance principles, the Supreme Court of India intervened to rescue three senior executives: a Managing Director, a General Manager, and a Senior Manager, from what it deemed an unjust prosecution arising from environmental violations at a Gurugram development site. When 256 trees were uprooted in September 2021, forest authorities bypassed both the company holding the development license and the individuals actually operating the machinery, instead targeting these high-ranking officers with criminal charges under the Punjab Land Preservation Act, 1900. The Supreme Court, cutting through the procedural haze, delivered an unequivocal pronouncement: absent specific statutory provisions creating vicarious liability, corporate directors cannot be held automatically accountable for offenses merely by virtue of their positions. With surgical precision, the Court quashed the complaint and cognizance orders, holding that the forest department had failed to establish any personal involvement or direct culpability of these executives in the tree-felling incident. While leaving open the possibility of proceedings against the company itself for license violations, the judgment reaffirmed a cardinal principle of criminal jurisprudence, that individual liability requires individual culpability, not mere corporate hierarchy."
    },
    {
      id: 2,
      title: "Hanketsu - Episode 2",
      thumbnail: "/han2.webp",
      pdf: "https://drive.google.com/file/d/1tGdOrmTDEkwbSoNZ2oGL52elpAy-kmgV/preview",
      summary: "In a stunning reversal that sent shockwaves through India's insolvency landscape, the Supreme Court dismantled what appeared to be a triumphant ₹19,350 crore resolution of Bhushan Power and Steel Limited, one of the RBI's infamous \"dirty dozen\" defaulters, exposing instead a web of procedural violations, institutional failures, and calculated delays that transformed corporate rescue into corporate theatre. When JSW Steel emerged as the successful bidder in 2018, promising upfront payments and equity infusions that secured it the highest score, the resolution seemed destined for success; yet what followed was an extraordinary saga of non-implementation spanning nearly 900 days, during which the Resolution Professional failed to verify statutory compliances, the Committee of Creditors approved a plan riddled with mandatory violations, and JSW, having secured approval, filed appeals to challenge conditions it disliked while strategically delaying payments worth thousands of crores. The Supreme Court, wielding its powers with surgical precision, found that the entire Corporate Insolvency Resolution Process had been conducted in flagrant violation of the Insolvency and Bankruptcy Code's time-bound mandates, that the approved plan contravened fundamental provisions regarding operational creditor priority, and that JSW's conduct constituted nothing less than a sophisticated misuse of legal process to exploit favourable market conditions. In a dramatic denouement, the Court quashed both tribunal orders, rejected JSW's resolution plan entirely, and, most significantly, directed that Bhushan Power and Steel Limited be sent into liquidation, thereby transforming what the parties claimed as successful implementation into one of the Code's most spectacular failures."
    },
    {
      id: 3,
      title: "Hanketsu - Episode 3",
      thumbnail: "/han3.webp",
      pdf: "https://drive.google.com/file/d/1S_07zdAP955HEoOXNlMGP-jgAE_prqpX/preview",
      summary: "In Mrs. Shailja Krishna v. Satori Global Ltd. (2025), the Supreme Court was confronted with a corporate dispute that unfolded less like routine company litigation and more like a slow-burning boardroom drama, where familial trust, corporate control, and statutory compliance collided. The appellant, once a director and substantial shareholder in a closely held company, alleged that under the guise of affection and internal arrangements, her shareholding was clandestinely divested through a forged gift deed, manipulated share transfer forms, and board meetings convened in defiance of both law and logic, effectively erasing her from the company’s corporate life. While the National Company Law Appellate Tribunal had dismissed her claims on jurisdictional grounds, characterising the controversy as one fit only for a civil court, the Supreme Court took a sterner view of the narrative that emerged from the record, one marked by procedural irregularities, abuse of corporate machinery, and sustained acts of oppression and mismanagement. Reinstating the findings of the National Company Law Tribunal, the Court held that the impugned share transfers and board actions were invalid, affirming that company law remedies cannot be neutered merely because allegations are grave, and underscoring that corporate governance cannot be permitted to become a convenient veil for dispossession cloaked in paperwork and power."
    },
    {
      id: 4,
      title: "Hanketsu - Episode 4",
      thumbnail: "/han4.webp",
      pdf: "https://drive.google.com/file/d/1Rnc2eHkCb6XP3AF_9Hz0bgUHVkKU8PN3/preview",
      summary: "In a landmark ruling that reverberates through India's arbitration landscape, the Supreme Court confronted a fundamental question that had divided benches and troubled litigants for years: can courts modify arbitral awards, or must they only wield the blunt instrument of annulment? The case arose from a constellation of disputes where parties, having chosen arbitration's promised efficiency over courtroom battles, found themselves trapped in a paradox when awards went awry. Some judges had quietly altered interest rates or severed offending portions, while others insisted that the Arbitration and Conciliation Act's conspicuous silence on modification powers meant courts could only set aside awards entirely, forcing parties back to square one. The five-judge Constitution Bench, led by Chief Justice Sanjiv Khanna, delivered a nuanced verdict that charts a middle course: while courts cannot rewrite awards or substitute their judgment for arbitrators', they possess limited scalpel-like powers to correct computational and clerical errors, sever standalone invalid portions, and in exceptional circumstances adjust post-award interest. The judgment ultimately honours the foundational compact of arbitration: that parties who contractually step outside the traditional judicial system must accept its narrower remedies, yet courts retain an essential supervisory role to prevent injustice. This delicate balance preserves arbitration's finality while ensuring that manifest errors need not condemn parties to the Sisyphean ordeal of beginning their dispute resolution journey anew."
    },
    {
      id: 5,
      title: "Hanketsu - Episode 5",
      thumbnail: "/han5.webp",
      pdf: "https://drive.google.com/file/d/1SVD0ufYYouhW84BzNE1OQiHhSk8F121K/preview",
      summary: "In a stunning revelation that sent shockwaves through India's financial corridors, Jane Street, the legendary quantitative trading powerhouse from New York, found itself at the centre of a regulatory maelstrom in November 2024 when the Securities and Exchange Board of India accused the firm of orchestrating a brazen manipulation scheme in the index derivatives market. The allegations painted a portrait of calculated exploitation: Jane Street allegedly took advantage of the closing price settlement mechanism by executing massive, strategically timed option trades in the final moments before market close, artificially moving the settlement price to benefit its own positions while leaving other market participants nursing substantial losses. SEBI's forensic examination uncovered a pattern spanning multiple trading days where the firm's trades, concentrated in the dying seconds of the trading session, appeared designed not for genuine price discovery but for gaming the system itself. The regulator responded with swift severity, barring Jane Street and its key employees from the Indian securities market and demanding disgorgement of alleged ill-gotten gains running into hundreds of crores. What makes this case particularly dramatic is the firm's stature: Jane Street, renowned globally for its sophisticated algorithmic prowess and academic rigor, now stands accused of deploying that very expertise not to enhance market efficiency but to subvert it, raising profound questions about the vulnerabilities in India's derivatives infrastructure and the eternal cat-and-mouse game between market innovation and regulatory oversight."
    }
  ];

  const  currentEpisode = episodes.find(ep => ep.id === selectedEpisode) || episodes[0];

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/hanbg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {/* Main Content */}
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Hanketsu
              </h1>
              <p className="text-lg text-white/70">
                Explore corporate law through pop culture
              </p>
            </div>

            {/* Episode Selection Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {episodes.map((episode) => (
                <button
                  key={episode.id}
                  onClick={() => {
                    setSelectedEpisode(episode.id);
                    // Update URL with the new episode parameter
                    navigate(`/hanketsu?episode=${episode.id}`, { replace: true });
                  }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedEpisode === episode.id
                      ? 'bg-white text-black shadow-xl scale-110'
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                  }`}
                >
                  Episode {episode.id}
                </button>
              ))}
            </div>

            {/* Thumbnail Image - Portrait in Center */}
            <div className="flex justify-center mb-12">
              <div className="relative group">
                <img
                  src={currentEpisode.thumbnail}
                  alt={`${currentEpisode.title} Thumbnail`}
                  className="w-64 h-96 md:w-80 md:h-[30rem] object-cover rounded-2xl shadow-2xl border-4 border-white/20 transition-transform duration-300 group-hover:scale-105"
                />
                {/* Episode Badge */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                  <span className="text-white font-bold">EP {currentEpisode.id}</span>
                </div>
              </div>
            </div>

            {/* Episode Summary */}
            <div className="max-w-3xl lg:max-w-5xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                  {currentEpisode.title}
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-amber-900 via-amber-100 to-amber-900 mx-auto mb-6 rounded-full"></div>
                <p className="text-lg text-white/90 leading-relaxed">
                  {currentEpisode.summary}
                </p>
              </div>
            </div>

            {/* PDF Viewer Section */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 md:p-6 shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                  Full Episode Document
                </h3>
                
                {/* PDF Embed */}
                <div className="bg-white rounded-xl overflow-hidden shadow-2xl" style={{ height: '800px' }}>
                  <iframe
                    src={`${currentEpisode.pdf}#toolbar=0&navpanes=0&scrollbar=1`}
                    className="w-full h-full"
                    title={`${currentEpisode.title} PDF`}
                    style={{ border: 'none' }}
                  >
                    <p className="text-center p-8">
                      Your browser does not support viewing PDFs.
                    </p>
                  </iframe>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
      
    </div>
  )
}

export default HanketsuPage
