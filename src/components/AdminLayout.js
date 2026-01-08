// // import React, { useState, useRef, useEffect } from "react";
// // import "./AdminLayout.css";
// // import Dashboard from "./Dashboard";
// // import Orders from "./Orders";
// // import Clients from "./Clients";
// // import Astrologers from "./Astrologers";
// // import Reports from "./Reports";
// // import Remedies from "./Remedies";
// // import ConsultationManagement from "./ConsultationManagement";
// // import FeedbackPage from "./FeedbackPage";
// // import Services from "./Services";
// // import Forms from "./Forms";
// // import Submissions from "./Submissions";
// // import ContentVaultManager from "./ContentVaultManager";
// // import AboutUsAdmin from "./AboutUsAdmin";
// // import CareersAdmin from "./CareersAdmin";
// // import UserManagement from "./UserManagement";
// // import EnergyServicesForm from "./EnergyServicesForm";
// // import ManifestationAdmin from "./ManifestationAdmin";
// // import KnowMoreAdmin from "./KnowMoreAdmin";
// // import FAQ from "./FAQ";
// // import AdminRelationshipPanel from "./AdminRelationshipPanel";
// // import AdminRemedyJourney from "./AdminRemedyJourney";
// // import ExperienceAdmin from "./ExperienceAdmin";
// // import AdminAstroChat from "./AdminAstroChat";

// // // Calculators
// // import KundliCalculator from "./calculators/KundliCalculator";
// // import NumerologyCalculator from "./calculators/NumerologyCalculator";
// // import CompatibilityCalculator from "./calculators/CompatibilityCalculator";
// // import TransitCalculator from "./calculators/TransitCalculator";
// // import DashaCalculator from "./calculators/DashaCalculator";
// // import ZodiacCalculator from "./calculators/ZodiacCalculator";
// // import NakshatraCalculator from "./calculators/NakshatraCalculator";
// // import PlanetaryCalculator from "./calculators/PlanetaryCalculator";
// // import DailyPredictionCalculator from "./calculators/DailyPredictionCalculator";
// // import HoroscopeCalculator from "./calculators/HoroscopeCalculator";
// // import ManglikCalculator from "./calculators/ManglikCalculator";
// // import PanchangCalculator from "./calculators/PanchangCalculator";
// // import GemstoneCalculator from "./calculators/GemstoneCalculator";
// // import TransitRemedyCalculator from "./calculators/TransitRemedyCalculator";
// // import ContactMessages from "./ContactMessages";
// // import OurCilents from "./OurCilents";
// // import AdminWealthManager from "./AdminWealthManager";

// // // Communication
// // import Templates from "./communication/Templates";
// // import SendEmail from "./communication/SendEmail";
// // import SendWhatsApp from "./communication/SendWhatsApp";
// // import TriggerAutomation from "./communication/TriggerAutomation";

// // // Wallet
// // import WalletPage from "./WalletPage";

// // // Modal
// // import Modal from "react-modal";
// // import axios from "axios";

// // Modal.setAppElement("#root");

// // export default function AdminLayout({ user, token, onLogout }) {
// //   const [active, setActive] = useState("dashboard");
// //   const [activeCalculator, setActiveCalculator] = useState("kundli");
// //   const [showCalculatorDropdown, setShowCalculatorDropdown] = useState(false);
// //   const [showBuilderDropdown, setShowBuilderDropdown] = useState(false);
// //   const [showCommDropdown, setShowCommDropdown] = useState(false);
// //   const [showUserDropdown, setShowUserDropdown] = useState(false);
// //   const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);

// //   const [selectedItem, setSelectedItem] = useState(null);
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

// //   const builderRef = useRef(null);
// //   const calculatorRef = useRef(null);
// //   const commRef = useRef(null);
// //   const sidebarRef = useRef(null);

// //   // Global Search
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchResults, setSearchResults] = useState({
// //     clients: [],
// //     orders: [],
// //     reports: [],
// //     remedies: [],
// //   });
// //   const [showSearchModal, setShowSearchModal] = useState(false);
// //   const API_URL = "https://astrobackend-5sr6.onrender.com/api";

// //   const calculatorOptions = [
// //     { key: "kundli", name: "Kundli", component: KundliCalculator },
// //     { key: "numerology", name: "Numerology", component: NumerologyCalculator },
// //     { key: "compatibility", name: "Compatibility", component: CompatibilityCalculator },
// //     { key: "transit", name: "Transit Calculator", component: TransitCalculator },
// //     { key: "dasha", name: "Dasha Calculator", component: DashaCalculator },
// //     { key: "zodiac", name: "Zodiac Calculator", component: ZodiacCalculator },
// //     { key: "nakshatra", name: "Nakshatra Calculator", component: NakshatraCalculator },
// //     { key: "planetary", name: "Planetary Calculator", component: PlanetaryCalculator },
// //     { key: "daily-prediction", name: "Daily Predictions", component: DailyPredictionCalculator },
// //     { key: "horoscope", name: "Horoscope Calculator", component: HoroscopeCalculator },
// //     { key: "manglik", name: "Manglik", component: ManglikCalculator },
// //     { key: "panchang", name: "Panchang", component: PanchangCalculator },
// //     { key: "gemstone", name: "Gemstone", component: GemstoneCalculator },
// //     { key: "transit-remedy", name: "Transit Remedies", component: TransitRemedyCalculator },
// //   ];

// //   const handleGlobalSearch = async (e) => {
// //     e.preventDefault();
// //     if (!searchQuery.trim()) return;
// //     try {
// //       const res = await axios.get(`${API_URL}/search?query=${encodeURIComponent(searchQuery)}`);
// //       if (res.data.success && res.data.data) {
// //         setSearchResults(res.data.data);
// //         setShowSearchModal(true);
// //       } else {
// //         setSearchResults({ clients: [], orders: [], reports: [], remedies: [] });
// //         setShowSearchModal(true);
// //       }
// //     } catch (err) {
// //       console.error("Search error:", err);
// //     }
// //   };

// //   const closeModal = () => {
// //     setShowSearchModal(false);
// //     setSearchQuery("");
// //   };

// //   const renderCalculator = () => {
// //     const calc = calculatorOptions.find((c) => c.key === activeCalculator);
// //     if (!calc) return <p>No calculator selected.</p>;
// //     const Component = calc.component;
// //     return <Component token={token} />;
// //   };

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!sidebarOpen);
// //   };

// //   const handleNavigation = (page) => {
// //     setActive(page);
// //     if (isMobile) {
// //       setSidebarOpen(false);
// //     }
// //   };

// //   const handleCalculatorSelect = (calcKey) => {
// //     setActiveCalculator(calcKey);
// //     setActive("calculators");
// //     setShowCalculatorDropdown(false);
// //     if (isMobile) {
// //       setSidebarOpen(false);
// //     }
// //   };

// //   const handleOverlayClick = () => {
// //     if (isMobile) {
// //       setSidebarOpen(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (builderRef.current && !builderRef.current.contains(e.target)) {
// //         setShowBuilderDropdown(false);
// //       }
// //       if (calculatorRef.current && !calculatorRef.current.contains(e.target)) {
// //         setShowCalculatorDropdown(false);
// //       }
// //       if (commRef.current && !commRef.current.contains(e.target)) {
// //         setShowCommDropdown(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       const mobile = window.innerWidth <= 768;
// //       setIsMobile(mobile);
// //       if (!mobile) {
// //         setSidebarOpen(false);
// //       }
// //     };
// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const getPageTitle = () => {
// //     if (active === "calculators") {
// //       return calculatorOptions.find((c) => c.key === activeCalculator)?.name || "Calculator";
// //     }
// //     return active
// //       .split(" ")
// //       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
// //       .join(" ");
// //   };

// //   return (
// //     <div className="admin-root">

// //       <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={handleOverlayClick} />

// //       <aside ref={sidebarRef} className={`sidebar ${sidebarOpen ? "open" : ""}`}>
// //         <div className="brand" onClick={() => handleNavigation("dashboard")}>
// //           <span>AstroAdmin</span>
// //         </div>

// //         <nav>
// //           <button className={active === "dashboard" ? "active" : ""} onClick={() => handleNavigation("dashboard")}>
// //             <span>Dashboard</span>
// //           </button>

// //           <button className={active === "client management" ? "active" : ""} onClick={() => handleNavigation("client management")}>
// //             <span>Client Management</span>
// //           </button>

// //           <button className={active === "energy-services" ? "active" : ""} onClick={() => handleNavigation("energy-services")}>
// //             <span>Energy Services Form</span>
// //           </button>
// //           <button className={active === "manifestation-admin" ? "active" : ""} onClick={() => handleNavigation("manifestation-admin")}>
// //             <span>Manifestation Admin</span>
// //           </button>
// //           <button className={active === "know-more" ? "active" : ""} onClick={() => handleNavigation("know-more")}>
// //             <span>Know More PDFs</span>
// //           </button>
// //           <button className={active === "experience-admin" ? "active" : ""} onClick={() => handleNavigation("experience-admin")}>
// //             <span>Experience PDFs</span>
// //           </button>

// //           <div className="builder-dropdown-container">
// //           <button className={showUserDropdown ? "active" : ""} onClick={() => setShowUserDropdown(!showUserDropdown)}>
// //             <span>User</span>
// //           </button>
// //             {showUserDropdown && (
// //               <div className="builder-dropdown">
// //                 {/* <button className={active === "user-dashboard" ? "active" : ""} onClick={() => handleNavigation("user-dashboard")}>
// //                   <span>User Dashboard</span>
// //                 </button> */}
// //                 <button className={active === "user management" ? "active" : ""} onClick={() => handleNavigation("user management")}>
// //                   <span>User Management</span>
// //                 </button>
// //                 {/* <button className={active === "user history" ? "active" : ""} onClick={() => handleNavigation("user history")}>
// //                   <span>User History</span>
// //                 </button> */}
// //               </div>
// //             )}
// //           </div>

// //           <button className={active === "astrologer management" ? "active" : ""} onClick={() => handleNavigation("astrologer management")}>
// //             <span>Astrologer Management</span>
// //           </button>

// //           <div className="builder-dropdown-container">
// //           <button className={showOrdersDropdown ? "active" : ""} onClick={() => setShowOrdersDropdown(!showOrdersDropdown)}>
// //             <span>Orders</span>
// //           </button>
// //             {showOrdersDropdown && (
// //               <div className="builder-dropdown">
// //                 <button className={active === "orders" ? "active" : ""} onClick={() => handleNavigation("orders")}>
// //                   <span>Orders List</span>
// //                 </button>
// //                 <button className={active === "relationship-intelligence" ? "active" : ""} onClick={() => handleNavigation("relationship-intelligence")}>
// //                   <span>Relationship Intelligence</span>
// //                 </button>
// //                 <button className={active === "remedy-journey" ? "active" : ""} onClick={() => handleNavigation("remedy-journey")}>
// //                   <span>Remedy Journey</span>
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           <button className={active === "reports" ? "active" : ""} onClick={() => handleNavigation("reports")}>
// //             <span>Analytics</span>
// //           </button>
// //           <button className={active === "remedies" ? "active" : ""} onClick={() => handleNavigation("remedies")}>
// //             <span>Remedies</span>
// //           </button>
// //           <button className={active === "consultation management" ? "active" : ""} onClick={() => handleNavigation("consultation management")}>
// //             <span>Consultation Management</span>
// //           </button>

// //         <div className="builder-dropdown-container" ref={builderRef}>
// //           <button className="builder-btn" onClick={() => setShowBuilderDropdown(!showBuilderDropdown)}>
// //             <span> Forms & Service Builder</span>
// //           </button>
// //           {showBuilderDropdown && (
// //             <div className="builder-dropdown">
// //               <button onClick={() => handleNavigation("forms")}>
// //                 <span>Forms</span>
// //               </button>
// //               <button onClick={() => handleNavigation("services")}>
// //                 <span>Services</span>
// //               </button>
// //               <button onClick={() => handleNavigation("submissions")}>
// //                 <span>Submissions</span>
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         <div className="builder-dropdown-container" ref={commRef}>
// //           <button className="calculator-btn" onClick={() => setShowCommDropdown(!showCommDropdown)}>
// //             <span> Communication Center</span>
// //           </button>
// //           {showCommDropdown && (
// //             <div className="calculator-dropdown">
// //               <button onClick={() => handleNavigation("templates")}>
// //                 <span>Templates</span>
// //               </button>
// //               <button onClick={() => handleNavigation("send-email")}>
// //                 <span>Send Email</span>
// //               </button>
// //               <button onClick={() => handleNavigation("send-whatsapp")}>
// //                 <span>Send WhatsApp</span>
// //               </button>
// //               <button onClick={() => handleNavigation("trigger-automation")}>
// //                 <span>Trigger Automation</span>
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         <div className="calculator-dropdown-container" ref={calculatorRef}>
// //           <button className="calculator-btn" onClick={() => setShowCalculatorDropdown(!showCalculatorDropdown)}>
// //             <span> Calculators</span>
// //           </button>
// //           {showCalculatorDropdown && (
// //             <div className="calculator-dropdown">
// //               {calculatorOptions.map((calc) => (
// //                 <button key={calc.key} className={activeCalculator === calc.key ? "active" : ""} onClick={() => handleCalculatorSelect(calc.key)}>
// //                   <span>{calc.name}</span>
// //                 </button>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //           <button className={active === "about-us" ? "active" : ""} onClick={() => handleNavigation("about-us")}>
// //             <span>About Us</span>
// //           </button>
// //           <button className={active === "our-cilents" ? "active" : ""} onClick={() => handleNavigation("our-cilents")}>
// //             <span>Our Clients</span>
// //           </button>
// //           <button className={active === "astro-chat" ? "active" : ""} onClick={() => handleNavigation("astro-chat")}>
// //             <span>Astro Chat Leads</span>
// //           </button>
// //           <button className={active === "careers" ? "active" : ""} onClick={() => handleNavigation("careers")}>
// //             <span>Careers</span>
// //           </button>
// //           <button className={active === "wallet & payment" ? "active" : ""} onClick={() => handleNavigation("wallet & payment")}>
// //             <span>Wallet & Payment</span>
// //           </button>
// //           <button className={active === "faq" ? "active" : ""} onClick={() => handleNavigation("faq")}>
// //             <span>FAQs</span>
// //           </button>
// //           <button className={active === "feedback" ? "active" : ""} onClick={() => handleNavigation("feedback")}>
// //             <span>Feedback</span>
// //           </button>
// //           <button className={active === "contact-messages" ? "active" : ""} onClick={() => handleNavigation("contact-messages")}>
// //             <span>Contact Messages</span>
// //           </button>
// //           <button className={active === "content-vault" ? "active" : ""} onClick={() => handleNavigation("content-vault")}>
// //             <span>Content & Learning Vault</span>
// //           </button>
// //           <button className={active === "wealth-tools" ? "active" : ""} onClick={() => handleNavigation("wealth-tools")}>
// //             <span>Wealth Tools</span>
// //           </button>
// //           <button className="logout" onClick={onLogout}>
// //             <span className="text-white">Logout</span>
// //           </button>
// //         </nav>
// //       </aside>

// //       <main className="main-content">
// //         <header>
// //           <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle Menu">
// //             Menu
// //           </button>
// //           <h1>{getPageTitle()}</h1>
// //           <form onSubmit={handleGlobalSearch}>
// //             <input
// //               type="text"
// //               placeholder="Search clients, orders, reports, remedies..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //           </form>
// //           <div className="user-box">{user?.email || "Admin"}</div>
// //         </header>

// //         <Modal
// //           isOpen={showSearchModal}
// //           onRequestClose={closeModal}
// //           style={{
// //             content: {
// //               width: "90%",
// //               maxWidth: "800px",
// //               margin: "auto",
// //               maxHeight: "80vh",
// //               overflowY: "auto",
// //             },
// //           }}
// //         >
// //           <button onClick={closeModal}>Close</button>
// //           <h2>Search Results for "{searchQuery}"</h2>
// //           {["clients", "orders", "reports", "remedies"].map((section) => (
// //             <div key={section}>
// //               <h3>{section.toUpperCase()}</h3>
// //               {searchResults[section]?.length > 0 ? (
// //                 <ul>
// //                   {searchResults[section].map((item) => (
// //                     <li
// //                       key={item._id}
// //                       onClick={() => {
// //                         setSelectedItem(item);
// //                         if (section === "clients") handleNavigation("client management");
// //                         if (section === "orders") handleNavigation("orders");
// //                         if (section === "reports") handleNavigation("reports");
// //                         if (section === "remedies") handleNavigation("remedies");
// //                         closeModal();
// //                       }}
// //                     >
// //                       {section === "clients" && `${item.name} - ${item.email} (${item.phone})`}
// //                       {section === "orders" && `${item.clientName || "N/A"} - ₹${item.amount || 0}`}
// //                       {section === "reports" && `${item.title || item.reportType || "Report"}`}
// //                       {section === "remedies" && `${item.name || item.remedyType || "Remedy"}`}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <p>No results found in {section}</p>
// //               )}
// //             </div>
// //           ))}
// //         </Modal>

// //         <section className="content-area">
// //           {active === "dashboard" && <Dashboard token={token} />}
// //           {active === "client management" && <Clients token={token} selectedItem={selectedItem} />}
// //           {active === "orders" && <Orders token={token} selectedItem={selectedItem} />}
// //           {active === "relationship-intelligence" && <AdminRelationshipPanel />}
// //           {active === "remedy-journey" && <AdminRemedyJourney />}
// //           {active === "astrologer management" && <Astrologers token={token} />}
// //           {active === "reports" && <Reports token={token} selectedItem={selectedItem} />}
// //           {active === "remedies" && <Remedies token={token} selectedItem={selectedItem} />}
// //           {active === "consultation management" && <ConsultationManagement token={token} />}
// //           {active === "feedback" && <FeedbackPage token={token} />}
// //           {active === "forms" && <Forms token={token} />}
// //           {active === "services" && <Services token={token} />}
// //           {active === "submissions" && <Submissions token={token} />}
// //           {active === "calculators" && renderCalculator()}
// //           {active === "content-vault" && <ContentVaultManager token={token} />}
// //           {active === "wallet & payment" && <WalletPage user={user} />}
// //           {active === "templates" && <Templates token={token} />}
// //           {active === "send-email" && <SendEmail token={token} />}
// //           {active === "send-whatsapp" && <SendWhatsApp token={token} />}
// //           {active === "trigger-automation" && <TriggerAutomation token={token} />}
// //           {active === "about-us" && <AboutUsAdmin token={token} />}
// //           {active === "careers" && <CareersAdmin token={token} />}
// //           {active === "contact-messages" && <ContactMessages />}
// //           {active === "our-cilents" && <OurCilents token={token} />}
// //           {active === "user management" && <UserManagement token={token} />}
// //           {active === "energy-services" && <EnergyServicesForm token={token} />}
// //           {active === "manifestation-admin" && <ManifestationAdmin />}
// //           {active === "know-more" && <KnowMoreAdmin />}
// //           {active === "experience-admin" && <ExperienceAdmin />}
// //           {active === "faq" && <FAQ />}
// //           {active === "astro-chat" && <AdminAstroChat />}
// //           {active === "wealth-tools" && <AdminWealthManager token={token} />}
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }






















// import React, { useState, useRef, useEffect } from "react";
// import "./AdminLayout.css";
// import Dashboard from "./Dashboard";
// import Orders from "./Orders";
// import Clients from "./Clients";
// import Astrologers from "./Astrologers";
// import Reports from "./Reports";
// import Remedies from "./Remedies";
// import ConsultationManagement from "./ConsultationManagement";
// import FeedbackPage from "./FeedbackPage";
// import Services from "./Services";
// import Forms from "./Forms";
// import Submissions from "./Submissions";
// import ContentVaultManager from "./ContentVaultManager";
// import AboutUsAdmin from "./AboutUsAdmin";
// import CareersAdmin from "./CareersAdmin";
// import UserManagement from "./UserManagement";
// import EnergyServicesForm from "./EnergyServicesForm";
// import ManifestationAdmin from "./ManifestationAdmin";
// import KnowMoreAdmin from "./KnowMoreAdmin";
// import FAQ from "./FAQ";
// import AdminRelationshipPanel from "./AdminRelationshipPanel";
// import AdminRemedyJourney from "./AdminRemedyJourney";
// import ExperienceAdmin from "./ExperienceAdmin";
// import AdminAstroChat from "./AdminAstroChat";

// // Calculators
// import KundliCalculator from "./calculators/KundliCalculator";
// import NumerologyCalculator from "./calculators/NumerologyCalculator";
// import CompatibilityCalculator from "./calculators/CompatibilityCalculator";
// import TransitCalculator from "./calculators/TransitCalculator";
// import DashaCalculator from "./calculators/DashaCalculator";
// import ZodiacCalculator from "./calculators/ZodiacCalculator";
// import NakshatraCalculator from "./calculators/NakshatraCalculator";
// import PlanetaryCalculator from "./calculators/PlanetaryCalculator";
// import DailyPredictionCalculator from "./calculators/DailyPredictionCalculator";
// import HoroscopeCalculator from "./calculators/HoroscopeCalculator";
// import ManglikCalculator from "./calculators/ManglikCalculator";
// import PanchangCalculator from "./calculators/PanchangCalculator";
// import GemstoneCalculator from "./calculators/GemstoneCalculator";
// import TransitRemedyCalculator from "./calculators/TransitRemedyCalculator";
// import ContactMessages from "./ContactMessages";
// import OurCilents from "./OurCilents";
// import AdminWealthManager from "./AdminWealthManager";
// import AdminAstrologyServices from "./AdminAstrologyServices";


// // Communication
// import Templates from "./communication/Templates";
// import SendEmail from "./communication/SendEmail";
// import SendWhatsApp from "./communication/SendWhatsApp";
// import TriggerAutomation from "./communication/TriggerAutomation";

// // Wallet
// import WalletPage from "./WalletPage";

// // Modal
// import Modal from "react-modal";
// import axios from "axios";

// Modal.setAppElement("#root");

// export default function AdminLayout({ user, token, onLogout }) {
//   const [active, setActive] = useState("dashboard");
//   const [activeCalculator, setActiveCalculator] = useState("kundli");
//   const [showCalculatorDropdown, setShowCalculatorDropdown] = useState(false);
//   const [showBuilderDropdown, setShowBuilderDropdown] = useState(false);
//   const [showCommDropdown, setShowCommDropdown] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);

//   const [selectedItem, setSelectedItem] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   const builderRef = useRef(null);
//   const calculatorRef = useRef(null);
//   const commRef = useRef(null);
//   const sidebarRef = useRef(null);

//   // Global Search
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState({
//     clients: [],
//     orders: [],
//     reports: [],
//     remedies: [],
//   });
//   const [showSearchModal, setShowSearchModal] = useState(false);
//   const API_URL = "https://astrobackend-5sr6.onrender.com/api";

//   const calculatorOptions = [
//     { key: "kundli", name: "Kundli", component: KundliCalculator },
//     { key: "numerology", name: "Numerology", component: NumerologyCalculator },
//     { key: "compatibility", name: "Compatibility", component: CompatibilityCalculator },
//     { key: "transit", name: "Transit Calculator", component: TransitCalculator },
//     { key: "dasha", name: "Dasha Calculator", component: DashaCalculator },
//     { key: "zodiac", name: "Zodiac Calculator", component: ZodiacCalculator },
//     { key: "nakshatra", name: "Nakshatra Calculator", component: NakshatraCalculator },
//     { key: "planetary", name: "Planetary Calculator", component: PlanetaryCalculator },
//     { key: "daily-prediction", name: "Daily Predictions", component: DailyPredictionCalculator },
//     { key: "horoscope", name: "Horoscope Calculator", component: HoroscopeCalculator },
//     { key: "manglik", name: "Manglik", component: ManglikCalculator },
//     { key: "panchang", name: "Panchang", component: PanchangCalculator },
//     { key: "gemstone", name: "Gemstone", component: GemstoneCalculator },
//     { key: "transit-remedy", name: "Transit Remedies", component: TransitRemedyCalculator },
//   ];

//   const handleGlobalSearch = async (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;
//     try {
//       const res = await axios.get(`${API_URL}/search?query=${encodeURIComponent(searchQuery)}`);
//       if (res.data.success && res.data.data) {
//         setSearchResults(res.data.data);
//         setShowSearchModal(true);
//       } else {
//         setSearchResults({ clients: [], orders: [], reports: [], remedies: [] });
//         setShowSearchModal(true);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//     }
//   };

//   const closeModal = () => {
//     setShowSearchModal(false);
//     setSearchQuery("");
//   };

//   const renderCalculator = () => {
//     const calc = calculatorOptions.find((c) => c.key === activeCalculator);
//     if (!calc) return <p>No calculator selected.</p>;
//     const Component = calc.component;
//     return <Component token={token} />;
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleNavigation = (page) => {
//     setActive(page);
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   };

//   const handleCalculatorSelect = (calcKey) => {
//     setActiveCalculator(calcKey);
//     setActive("calculators");
//     setShowCalculatorDropdown(false);
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   };

//   const handleOverlayClick = () => {
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (builderRef.current && !builderRef.current.contains(e.target)) {
//         setShowBuilderDropdown(false);
//       }
//       if (calculatorRef.current && !calculatorRef.current.contains(e.target)) {
//         setShowCalculatorDropdown(false);
//       }
//       if (commRef.current && !commRef.current.contains(e.target)) {
//         setShowCommDropdown(false);
//       }
//       if (sidebarRef.current && !sidebarRef.current.contains(e.target) && sidebarOpen) {
//         setShowUserDropdown(false);
//         setShowOrdersDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [sidebarOpen]);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setSidebarOpen(false);
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const getPageTitle = () => {
//     if (active === "calculators") {
//       return calculatorOptions.find((c) => c.key === activeCalculator)?.name || "Calculator";
//     }
//     return active
//       .split(" ")
//       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//       .join(" ");
//   };

//   return (
//     <div className="admin-root">
//       <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={handleOverlayClick} />

//       <aside ref={sidebarRef} className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//         <div className="brand" onClick={() => handleNavigation("dashboard")}>
//           <span>AstroAdmin</span>
//         </div>

//         <nav className="sidebar-nav">
//           <button 
//             className={`nav-btn ${active === "dashboard" ? "active" : ""}`} 
//             onClick={() => handleNavigation("dashboard")}
//           >
//             <div className="nav-btn-content">Dashboard</div>
//           </button>

//           <button 
//             className={`nav-btn ${active === "client management" ? "active" : ""}`} 
//             onClick={() => handleNavigation("client management")}
//           >
//             <div className="nav-btn-content">Client Management</div>
//           </button>

//           <button 
//             className={`nav-btn ${active === "energy-services" ? "active" : ""}`} 
//             onClick={() => handleNavigation("energy-services")}
//           >
//             <div className="nav-btn-content">Energy Services Form</div>
//           </button>
//           <button 
//   className={`nav-btn ${active === "astrology-services" ? "active" : ""}`} 
//   onClick={() => handleNavigation("astrology-services")}
// >
//   <div className="nav-btn-content">Astrology Services</div>
// </button>
          
//           <button 
//             className={`nav-btn ${active === "manifestation-admin" ? "active" : ""}`} 
//             onClick={() => handleNavigation("manifestation-admin")}
//           >
//             <div className="nav-btn-content">Manifestation Admin</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "know-more" ? "active" : ""}`} 
//             onClick={() => handleNavigation("know-more")}
//           >
//             <div className="nav-btn-content">Know More PDFs</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "experience-admin" ? "active" : ""}`} 
//             onClick={() => handleNavigation("experience-admin")}
//           >
//             <div className="nav-btn-content">Experience PDFs</div>
//           </button>

//           <div className="dropdown-container" ref={sidebarRef}>
//             <button 
//               className={`nav-btn dropdown-toggle ${showUserDropdown ? "active" : ""}`} 
//               onClick={() => setShowUserDropdown(!showUserDropdown)}
//             >
//               <div className="nav-btn-content">
//                 User Management
//                 <span className="dropdown-arrow">{showUserDropdown ? "▲" : "▼"}</span>
//               </div>
//             </button>
//             {showUserDropdown && (
//               <div className="dropdown-menu">
//                 <button 
//                   className={`dropdown-item ${active === "user management" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("user management")}
//                 >
//                   <div className="dropdown-item-content">User Management</div>
//                 </button>
//               </div>
//             )}
//           </div>

//           <button 
//             className={`nav-btn ${active === "astrologer management" ? "active" : ""}`} 
//             onClick={() => handleNavigation("astrologer management")}
//           >
//             <div className="nav-btn-content">Astrologer Management</div>
//           </button>

//           <div className="dropdown-container">
//             <button 
//               className={`nav-btn dropdown-toggle ${showOrdersDropdown ? "active" : ""}`} 
//               onClick={() => setShowOrdersDropdown(!showOrdersDropdown)}
//             >
//               <div className="nav-btn-content">
//                 Orders
//                 <span className="dropdown-arrow">{showOrdersDropdown ? "▲" : "▼"}</span>
//               </div>
//             </button>
//             {showOrdersDropdown && (
//               <div className="dropdown-menu">
//                 <button 
//                   className={`dropdown-item ${active === "orders" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("orders")}
//                 >
//                   <div className="dropdown-item-content">Orders List</div>
//                 </button>
//                 <button 
//                   className={`dropdown-item ${active === "relationship-intelligence" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("relationship-intelligence")}
//                 >
//                   <div className="dropdown-item-content">Relationship Intelligence</div>
//                 </button>
//                 <button 
//                   className={`dropdown-item ${active === "remedy-journey" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("remedy-journey")}
//                 >
//                   <div className="dropdown-item-content">Remedy Journey</div>
//                 </button>
//               </div>
//             )}
//           </div>

//           <button 
//             className={`nav-btn ${active === "reports" ? "active" : ""}`} 
//             onClick={() => handleNavigation("reports")}
//           >
//             <div className="nav-btn-content">Analytics</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "remedies" ? "active" : ""}`} 
//             onClick={() => handleNavigation("remedies")}
//           >
//             <div className="nav-btn-content">Remedies</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "consultation management" ? "active" : ""}`} 
//             onClick={() => handleNavigation("consultation management")}
//           >
//             <div className="nav-btn-content">Consultation Management</div>
//           </button>

//           <div className="dropdown-container" ref={builderRef}>
//             <button 
//               className={`nav-btn dropdown-toggle ${showBuilderDropdown ? "active" : ""}`} 
//               onClick={() => setShowBuilderDropdown(!showBuilderDropdown)}
//             >
//               <div className="nav-btn-content">
//                 Forms & Service Builder
//                 <span className="dropdown-arrow">{showBuilderDropdown ? "▲" : "▼"}</span>
//               </div>
//             </button>
//             {showBuilderDropdown && (
//               <div className="dropdown-menu">
//                 <button 
//                   className={`dropdown-item ${active === "forms" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("forms")}
//                 >
//                   <div className="dropdown-item-content">Forms</div>
//                 </button>
//                 <button 
//                   className={`dropdown-item ${active === "services" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("services")}
//                 >
//                   <div className="dropdown-item-content">Services</div>
//                 </button>
//                 <button 
//                   className={`dropdown-item ${active === "submissions" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("submissions")}
//                 >
//                   <div className="dropdown-item-content">Submissions</div>
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="dropdown-container" ref={commRef}>
//             <button 
//               className={`nav-btn dropdown-toggle ${showCommDropdown ? "active" : ""}`} 
//               onClick={() => setShowCommDropdown(!showCommDropdown)}
//             >
//               <div className="nav-btn-content">
//                 Communication Center
//                 <span className="dropdown-arrow">{showCommDropdown ? "▲" : "▼"}</span>
//               </div>
//             </button>
//             {showCommDropdown && (
//               <div className="dropdown-menu">
//                 <button 
//                   className={`dropdown-item ${active === "templates" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("templates")}
//                 >
//                   <div className="dropdown-item-content">Templates</div>
//                 </button>
//                 <button 
//                   className={`dropdown-item ${active === "send-email" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("send-email")}
//                 >
//                   <div className="dropdown-item-content">Send Email</div>
//                 </button>
//                 <button 
//                   className={`dropdown-item ${active === "send-whatsapp" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("send-whatsapp")}
//                 >
//                   <div className="dropdown-item-content">Send WhatsApp</div>
//                 </button>
//                 <button 
//                   className={`dropdown-item ${active === "trigger-automation" ? "active" : ""}`} 
//                   onClick={() => handleNavigation("trigger-automation")}
//                 >
//                   <div className="dropdown-item-content">Trigger Automation</div>
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="dropdown-container" ref={calculatorRef}>
//             <button 
//               className={`nav-btn dropdown-toggle ${showCalculatorDropdown ? "active" : ""}`} 
//               onClick={() => setShowCalculatorDropdown(!showCalculatorDropdown)}
//             >
//               <div className="nav-btn-content">
//                 Calculators
//                 <span className="dropdown-arrow">{showCalculatorDropdown ? "▲" : "▼"}</span>
//               </div>
//             </button>
//             {showCalculatorDropdown && (
//               <div className="dropdown-menu calculator-dropdown">
//                 {calculatorOptions.map((calc) => (
//                   <button 
//                     key={calc.key} 
//                     className={`dropdown-item ${activeCalculator === calc.key && active === "calculators" ? "active" : ""}`} 
//                     onClick={() => handleCalculatorSelect(calc.key)}
//                   >
//                     <div className="dropdown-item-content">{calc.name}</div>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button 
//             className={`nav-btn ${active === "about-us" ? "active" : ""}`} 
//             onClick={() => handleNavigation("about-us")}
//           >
//             <div className="nav-btn-content">About Us</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "our-cilents" ? "active" : ""}`} 
//             onClick={() => handleNavigation("our-cilents")}
//           >
//             <div className="nav-btn-content">Our Clients</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "astro-chat" ? "active" : ""}`} 
//             onClick={() => handleNavigation("astro-chat")}
//           >
//             <div className="nav-btn-content">Astro Chat Leads</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "careers" ? "active" : ""}`} 
//             onClick={() => handleNavigation("careers")}
//           >
//             <div className="nav-btn-content">Careers</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "wallet & payment" ? "active" : ""}`} 
//             onClick={() => handleNavigation("wallet & payment")}
//           >
//             <div className="nav-btn-content">Wallet & Payment</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "faq" ? "active" : ""}`} 
//             onClick={() => handleNavigation("faq")}
//           >
//             <div className="nav-btn-content">FAQs</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "feedback" ? "active" : ""}`} 
//             onClick={() => handleNavigation("feedback")}
//           >
//             <div className="nav-btn-content">Feedback</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "contact-messages" ? "active" : ""}`} 
//             onClick={() => handleNavigation("contact-messages")}
//           >
//             <div className="nav-btn-content">Contact Messages</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "content-vault" ? "active" : ""}`} 
//             onClick={() => handleNavigation("content-vault")}
//           >
//             <div className="nav-btn-content">Content & Learning Vault</div>
//           </button>
          
//           <button 
//             className={`nav-btn ${active === "wealth-tools" ? "active" : ""}`} 
//             onClick={() => handleNavigation("wealth-tools")}
//           >
//             <div className="nav-btn-content">Wealth Tools</div>
//           </button>
          
//           <button 
//             className="nav-btn logout-btn" 
//             onClick={onLogout}
//           >
//             <div className="nav-btn-content">Logout</div>
//           </button>
//         </nav>
//       </aside>

//       <main className="main-content">
//         <header className="main-header">
//           <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle Menu">
//             ☰
//           </button>
//           <h1 className="page-title">{getPageTitle()}</h1>
//           <form className="search-form" onSubmit={handleGlobalSearch}>
//             <input
//               type="text"
//               placeholder="Search clients, orders, reports, remedies..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input"
//             />
//           </form>
//           <div className="user-box">{user?.email || "Admin"}</div>
//         </header>

//         <Modal
//           isOpen={showSearchModal}
//           onRequestClose={closeModal}
//           style={{
//             content: {
//               width: "90%",
//               maxWidth: "800px",
//               margin: "auto",
//               maxHeight: "80vh",
//               overflowY: "auto",
//               borderRadius: "8px",
//               padding: "20px",
//               border: "1px solid #e0e0e0",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//             },
//             overlay: {
//               backgroundColor: "rgba(0, 0, 0, 0.5)"
//             }
//           }}
//         >
//           <div className="search-modal">
//             <button className="modal-close-btn" onClick={closeModal}>×</button>
//             <h2 className="modal-title">Search Results for "{searchQuery}"</h2>
//             <div className="search-results">
//               {["clients", "orders", "reports", "remedies"].map((section) => (
//                 <div key={section} className="result-section">
//                   <h3 className="section-title">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
//                   {searchResults[section]?.length > 0 ? (
//                     <ul className="result-list">
//                       {searchResults[section].map((item) => (
//                         <li
//                           key={item._id}
//                           className="result-item"
//                           onClick={() => {
//                             setSelectedItem(item);
//                             if (section === "clients") handleNavigation("client management");
//                             if (section === "orders") handleNavigation("orders");
//                             if (section === "reports") handleNavigation("reports");
//                             if (section === "remedies") handleNavigation("remedies");
//                             closeModal();
//                           }}
//                         >
//                           {section === "clients" && `${item.name} - ${item.email} (${item.phone})`}
//                           {section === "orders" && `${item.clientName || "N/A"} - ₹${item.amount || 0}`}
//                           {section === "reports" && `${item.title || item.reportType || "Report"}`}
//                           {section === "remedies" && `${item.name || item.remedyType || "Remedy"}`}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="no-results">No results found in {section}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Modal>

//         <section className="content-area">
//           {active === "dashboard" && <Dashboard token={token} />}
//           {active === "client management" && <Clients token={token} selectedItem={selectedItem} />}
//           {active === "orders" && <Orders token={token} selectedItem={selectedItem} />}
//           {active === "relationship-intelligence" && <AdminRelationshipPanel />}
//           {active === "remedy-journey" && <AdminRemedyJourney />}
//           {active === "astrologer management" && <Astrologers token={token} />}
//           {active === "reports" && <Reports token={token} selectedItem={selectedItem} />}
//           {active === "remedies" && <Remedies token={token} selectedItem={selectedItem} />}
//           {active === "consultation management" && <ConsultationManagement token={token} />}
//           {active === "feedback" && <FeedbackPage token={token} />}
//           {active === "forms" && <Forms token={token} />}
//           {active === "services" && <Services token={token} />}
//           {active === "submissions" && <Submissions token={token} />}
//           {active === "calculators" && renderCalculator()}
//           {active === "content-vault" && <ContentVaultManager token={token} />}
//           {active === "wallet & payment" && <WalletPage user={user} />}
//           {active === "templates" && <Templates token={token} />}
//           {active === "send-email" && <SendEmail token={token} />}
//           {active === "send-whatsapp" && <SendWhatsApp token={token} />}
//           {active === "trigger-automation" && <TriggerAutomation token={token} />}
//           {active === "about-us" && <AboutUsAdmin token={token} />}
//           {active === "careers" && <CareersAdmin token={token} />}
//           {active === "contact-messages" && <ContactMessages />}
//           {active === "our-cilents" && <OurCilents token={token} />}
//           {active === "user management" && <UserManagement token={token} />}
//           {active === "energy-services" && <EnergyServicesForm token={token} />}
//           {active === "manifestation-admin" && <ManifestationAdmin />}
//           {active === "know-more" && <KnowMoreAdmin />}
//           {active === "experience-admin" && <ExperienceAdmin />}
//           {active === "faq" && <FAQ />}
//           {active === "astro-chat" && <AdminAstroChat />}
//           {active === "wealth-tools" && <AdminWealthManager token={token} />}
//           {active === "astrology-services" && <AdminAstrologyServices token={token} />}
//         </section>
//       </main>
//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from "react";
import "./AdminLayout.css";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Clients from "./Clients";
import Astrologers from "./Astrologers";
import Reports from "./Reports";
import Remedies from "./Remedies";
import ConsultationManagement from "./ConsultationManagement";
import FeedbackPage from "./FeedbackPage";
import Services from "./Services";
import Forms from "./Forms";
import Submissions from "./Submissions";
import ContentVaultManager from "./ContentVaultManager";
import AboutUsAdmin from "./AboutUsAdmin";
import CareersAdmin from "./CareersAdmin";
import UserManagement from "./UserManagement";
import EnergyServicesForm from "./EnergyServicesForm";
import ManifestationAdmin from "./ManifestationAdmin";
import KnowMoreAdmin from "./KnowMoreAdmin";
import FAQ from "./FAQ";
import AdminRelationshipPanel from "./AdminRelationshipPanel";
import AdminRemedyJourney from "./AdminRemedyJourney";
import ExperienceAdmin from "./ExperienceAdmin";
import AdminAstroChat from "./AdminAstroChat";

// Calculators
import KundliCalculator from "./calculators/KundliCalculator";
import NumerologyCalculator from "./calculators/NumerologyCalculator";
import CompatibilityCalculator from "./calculators/CompatibilityCalculator";
import TransitCalculator from "./calculators/TransitCalculator";
import DashaCalculator from "./calculators/DashaCalculator";
import ZodiacCalculator from "./calculators/ZodiacCalculator";
import NakshatraCalculator from "./calculators/NakshatraCalculator";
import PlanetaryCalculator from "./calculators/PlanetaryCalculator";
import DailyPredictionCalculator from "./calculators/DailyPredictionCalculator";
import HoroscopeCalculator from "./calculators/HoroscopeCalculator";
import ManglikCalculator from "./calculators/ManglikCalculator";
import PanchangCalculator from "./calculators/PanchangCalculator";
import GemstoneCalculator from "./calculators/GemstoneCalculator";
import TransitRemedyCalculator from "./calculators/TransitRemedyCalculator";
import ContactMessages from "./ContactMessages";
import OurCilents from "./OurCilents";
import AdminWealthManager from "./AdminWealthManager";
import AdminAstrologyServices from "./AdminAstrologyServices";
import AdminAffirmations from "./AdminAffirmations";

// Communication
import Templates from "./communication/Templates";
import SendEmail from "./communication/SendEmail";
import SendWhatsApp from "./communication/SendWhatsApp";
import TriggerAutomation from "./communication/TriggerAutomation";

// Wallet
import WalletPage from "./WalletPage";

// Modal
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

export default function AdminLayout({ user, token, onLogout }) {
  const [active, setActive] = useState("dashboard");
  const [activeCalculator, setActiveCalculator] = useState("kundli");
  const [showCalculatorDropdown, setShowCalculatorDropdown] = useState(false);
  const [showBuilderDropdown, setShowBuilderDropdown] = useState(false);
  const [showCommDropdown, setShowCommDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const builderRef = useRef(null);
  const calculatorRef = useRef(null);
  const commRef = useRef(null);
  const sidebarRef = useRef(null);

  // Global Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    clients: [],
    orders: [],
    reports: [],
    remedies: [],
  });
  const [showSearchModal, setShowSearchModal] = useState(false);
  const API_URL = "https://astrobackend-5sr6.onrender.com/api";

  const calculatorOptions = [
    { key: "kundli", name: "Kundli", component: KundliCalculator },
    { key: "numerology", name: "Numerology", component: NumerologyCalculator },
    { key: "compatibility", name: "Compatibility", component: CompatibilityCalculator },
    { key: "transit", name: "Transit Calculator", component: TransitCalculator },
    { key: "dasha", name: "Dasha Calculator", component: DashaCalculator },
    { key: "zodiac", name: "Zodiac Calculator", component: ZodiacCalculator },
    { key: "nakshatra", name: "Nakshatra Calculator", component: NakshatraCalculator },
    { key: "planetary", name: "Planetary Calculator", component: PlanetaryCalculator },
    { key: "daily-prediction", name: "Daily Predictions", component: DailyPredictionCalculator },
    { key: "horoscope", name: "Horoscope Calculator", component: HoroscopeCalculator },
    { key: "manglik", name: "Manglik", component: ManglikCalculator },
    { key: "panchang", name: "Panchang", component: PanchangCalculator },
    { key: "gemstone", name: "Gemstone", component: GemstoneCalculator },
    { key: "transit-remedy", name: "Transit Remedies", component: TransitRemedyCalculator },
  ];

  const handleGlobalSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const res = await axios.get(`${API_URL}/search?query=${encodeURIComponent(searchQuery)}`);
      if (res.data.success && res.data.data) {
        setSearchResults(res.data.data);
        setShowSearchModal(true);
      } else {
        setSearchResults({ clients: [], orders: [], reports: [], remedies: [] });
        setShowSearchModal(true);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const closeModal = () => {
    setShowSearchModal(false);
    setSearchQuery("");
  };

  const renderCalculator = () => {
    const calc = calculatorOptions.find((c) => c.key === activeCalculator);
    if (!calc) return <p>No calculator selected.</p>;
    const Component = calc.component;
    return <Component token={token} />;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (page) => {
    setActive(page);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleCalculatorSelect = (calcKey) => {
    setActiveCalculator(calcKey);
    setActive("calculators");
    setShowCalculatorDropdown(false);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (builderRef.current && !builderRef.current.contains(e.target)) {
        setShowBuilderDropdown(false);
      }
      if (calculatorRef.current && !calculatorRef.current.contains(e.target)) {
        setShowCalculatorDropdown(false);
      }
      if (commRef.current && !commRef.current.contains(e.target)) {
        setShowCommDropdown(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && sidebarOpen) {
        setShowUserDropdown(false);
        setShowOrdersDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPageTitle = () => {
    if (active === "calculators") {
      return calculatorOptions.find((c) => c.key === activeCalculator)?.name || "Calculator";
    }
    return active
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <div className="admin-root">
      <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={handleOverlayClick} />

      <aside ref={sidebarRef} className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand" onClick={() => handleNavigation("dashboard")}>
          <span>AstroAdmin</span>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-btn ${active === "dashboard" ? "active" : ""}`} 
            onClick={() => handleNavigation("dashboard")}
          >
            <div className="nav-btn-content">Dashboard</div>
          </button>

          <button 
            className={`nav-btn ${active === "client management" ? "active" : ""}`} 
            onClick={() => handleNavigation("client management")}
          >
            <div className="nav-btn-content">Client Management</div>
          </button>

          <button 
            className={`nav-btn ${active === "energy-services" ? "active" : ""}`} 
            onClick={() => handleNavigation("energy-services")}
          >
            <div className="nav-btn-content">Energy Services Form</div>
          </button>
          <button 
  className={`nav-btn ${active === "astrology-services" ? "active" : ""}`} 
  onClick={() => handleNavigation("astrology-services")}
>
  <div className="nav-btn-content">Astrology Services</div>
</button>
          
          <button 
            className={`nav-btn ${active === "manifestation-admin" ? "active" : ""}`} 
            onClick={() => handleNavigation("manifestation-admin")}
          >
            <div className="nav-btn-content">Manifestation Admin</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "know-more" ? "active" : ""}`} 
            onClick={() => handleNavigation("know-more")}
          >
            <div className="nav-btn-content">Know More PDFs</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "experience-admin" ? "active" : ""}`} 
            onClick={() => handleNavigation("experience-admin")}
          >
            <div className="nav-btn-content">Experience PDFs</div>
          </button>

          <div className="dropdown-container" ref={sidebarRef}>
            <button 
              className={`nav-btn dropdown-toggle ${showUserDropdown ? "active" : ""}`} 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <div className="nav-btn-content">
                User Management
                <span className="dropdown-arrow">{showUserDropdown ? "▲" : "▼"}</span>
              </div>
            </button>
            {showUserDropdown && (
              <div className="dropdown-menu">
                <button 
                  className={`dropdown-item ${active === "user management" ? "active" : ""}`} 
                  onClick={() => handleNavigation("user management")}
                >
                  <div className="dropdown-item-content">User Management</div>
                </button>
              </div>
            )}
          </div>

          <button 
            className={`nav-btn ${active === "astrologer management" ? "active" : ""}`} 
            onClick={() => handleNavigation("astrologer management")}
          >
            <div className="nav-btn-content">Astrologer Management</div>
          </button>

          <div className="dropdown-container">
            <button 
              className={`nav-btn dropdown-toggle ${showOrdersDropdown ? "active" : ""}`} 
              onClick={() => setShowOrdersDropdown(!showOrdersDropdown)}
            >
              <div className="nav-btn-content">
                Orders
                <span className="dropdown-arrow">{showOrdersDropdown ? "▲" : "▼"}</span>
              </div>
            </button>
            {showOrdersDropdown && (
              <div className="dropdown-menu">
                <button 
                  className={`dropdown-item ${active === "orders" ? "active" : ""}`} 
                  onClick={() => handleNavigation("orders")}
                >
                  <div className="dropdown-item-content">Orders List</div>
                </button>
                <button 
                  className={`dropdown-item ${active === "relationship-intelligence" ? "active" : ""}`} 
                  onClick={() => handleNavigation("relationship-intelligence")}
                >
                  <div className="dropdown-item-content">Relationship Intelligence</div>
                </button>
                <button 
                  className={`dropdown-item ${active === "remedy-journey" ? "active" : ""}`} 
                  onClick={() => handleNavigation("remedy-journey")}
                >
                  <div className="dropdown-item-content">Remedy Journey</div>
                </button>
              </div>
            )}
          </div>

          <button 
            className={`nav-btn ${active === "reports" ? "active" : ""}`} 
            onClick={() => handleNavigation("reports")}
          >
            <div className="nav-btn-content">Analytics</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "remedies" ? "active" : ""}`} 
            onClick={() => handleNavigation("remedies")}
          >
            <div className="nav-btn-content">Remedies</div>
          </button>
          
          <button
  className={`nav-btn ${active === "affirmations" ? "active" : ""}`}
  onClick={() => handleNavigation("affirmations")}
>
  <div className="nav-btn-content">Affirmations</div>
</button>

          <button 
            className={`nav-btn ${active === "consultation management" ? "active" : ""}`} 
            onClick={() => handleNavigation("consultation management")}
          >
            <div className="nav-btn-content">Consultation Management</div>
          </button>

          <div className="dropdown-container" ref={builderRef}>
            <button 
              className={`nav-btn dropdown-toggle ${showBuilderDropdown ? "active" : ""}`} 
              onClick={() => setShowBuilderDropdown(!showBuilderDropdown)}
            >
              <div className="nav-btn-content">
                Forms & Service Builder
                <span className="dropdown-arrow">{showBuilderDropdown ? "▲" : "▼"}</span>
              </div>
            </button>
            {showBuilderDropdown && (
              <div className="dropdown-menu">
                <button 
                  className={`dropdown-item ${active === "forms" ? "active" : ""}`} 
                  onClick={() => handleNavigation("forms")}
                >
                  <div className="dropdown-item-content">Forms</div>
                </button>
                <button 
                  className={`dropdown-item ${active === "services" ? "active" : ""}`} 
                  onClick={() => handleNavigation("services")}
                >
                  <div className="dropdown-item-content">Services</div>
                </button>
                <button 
                  className={`dropdown-item ${active === "submissions" ? "active" : ""}`} 
                  onClick={() => handleNavigation("submissions")}
                >
                  <div className="dropdown-item-content">Submissions</div>
                </button>
              </div>
            )}
          </div>

          <div className="dropdown-container" ref={commRef}>
            <button 
              className={`nav-btn dropdown-toggle ${showCommDropdown ? "active" : ""}`} 
              onClick={() => setShowCommDropdown(!showCommDropdown)}
            >
              <div className="nav-btn-content">
                Communication Center
                <span className="dropdown-arrow">{showCommDropdown ? "▲" : "▼"}</span>
              </div>
            </button>
            {showCommDropdown && (
              <div className="dropdown-menu">
                <button 
                  className={`dropdown-item ${active === "templates" ? "active" : ""}`} 
                  onClick={() => handleNavigation("templates")}
                >
                  <div className="dropdown-item-content">Templates</div>
                </button>
                <button 
                  className={`dropdown-item ${active === "send-email" ? "active" : ""}`} 
                  onClick={() => handleNavigation("send-email")}
                >
                  <div className="dropdown-item-content">Send Email</div>
                </button>
                <button 
                  className={`dropdown-item ${active === "send-whatsapp" ? "active" : ""}`} 
                  onClick={() => handleNavigation("send-whatsapp")}
                >
                  <div className="dropdown-item-content">Send WhatsApp</div>
                </button>
                <button 
                  className={`dropdown-item ${active === "trigger-automation" ? "active" : ""}`} 
                  onClick={() => handleNavigation("trigger-automation")}
                >
                  <div className="dropdown-item-content">Trigger Automation</div>
                </button>
              </div>
            )}
          </div>

          <div className="dropdown-container" ref={calculatorRef}>
            <button 
              className={`nav-btn dropdown-toggle ${showCalculatorDropdown ? "active" : ""}`} 
              onClick={() => setShowCalculatorDropdown(!showCalculatorDropdown)}
            >
              <div className="nav-btn-content">
                Calculators
                <span className="dropdown-arrow">{showCalculatorDropdown ? "▲" : "▼"}</span>
              </div>
            </button>
            {showCalculatorDropdown && (
              <div className="dropdown-menu calculator-dropdown">
                {calculatorOptions.map((calc) => (
                  <button 
                    key={calc.key} 
                    className={`dropdown-item ${activeCalculator === calc.key && active === "calculators" ? "active" : ""}`} 
                    onClick={() => handleCalculatorSelect(calc.key)}
                  >
                    <div className="dropdown-item-content">{calc.name}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className={`nav-btn ${active === "about-us" ? "active" : ""}`} 
            onClick={() => handleNavigation("about-us")}
          >
            <div className="nav-btn-content">About Us</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "our-cilents" ? "active" : ""}`} 
            onClick={() => handleNavigation("our-cilents")}
          >
            <div className="nav-btn-content">Our Clients</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "astro-chat" ? "active" : ""}`} 
            onClick={() => handleNavigation("astro-chat")}
          >
            <div className="nav-btn-content"> Chatbox</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "careers" ? "active" : ""}`} 
            onClick={() => handleNavigation("careers")}
          >
            <div className="nav-btn-content">Careers</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "wallet & payment" ? "active" : ""}`} 
            onClick={() => handleNavigation("wallet & payment")}
          >
            <div className="nav-btn-content">Wallet & Payment</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "faq" ? "active" : ""}`} 
            onClick={() => handleNavigation("faq")}
          >
            <div className="nav-btn-content">FAQs</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "feedback" ? "active" : ""}`} 
            onClick={() => handleNavigation("feedback")}
          >
            <div className="nav-btn-content">Feedback</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "contact-messages" ? "active" : ""}`} 
            onClick={() => handleNavigation("contact-messages")}
          >
            <div className="nav-btn-content">Contact Messages</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "content-vault" ? "active" : ""}`} 
            onClick={() => handleNavigation("content-vault")}
          >
            <div className="nav-btn-content">Content & Learning Vault</div>
          </button>
          
          <button 
            className={`nav-btn ${active === "wealth-tools" ? "active" : ""}`} 
            onClick={() => handleNavigation("wealth-tools")}
          >
            <div className="nav-btn-content">Wealth Tools</div>
          </button>
          
          <button 
            className="nav-btn logout-btn" 
            onClick={onLogout}
          >
            <div className="nav-btn-content">Logout</div>
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle Menu">
            ☰
          </button>
          <h1 className="page-title">{getPageTitle()}</h1>
          <form className="search-form" onSubmit={handleGlobalSearch}>
            <input
              type="text"
              placeholder="Search clients, orders, reports, remedies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>
          <div className="user-box">{user?.email || "Admin"}</div>
        </header>

        <Modal
          isOpen={showSearchModal}
          onRequestClose={closeModal}
          style={{
            content: {
              width: "90%",
              maxWidth: "800px",
              margin: "auto",
              maxHeight: "80vh",
              overflowY: "auto",
              borderRadius: "8px",
              padding: "20px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }
          }}
        >
          <div className="search-modal">
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <h2 className="modal-title">Search Results for "{searchQuery}"</h2>
            <div className="search-results">
              {["clients", "orders", "reports", "remedies"].map((section) => (
                <div key={section} className="result-section">
                  <h3 className="section-title">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
                  {searchResults[section]?.length > 0 ? (
                    <ul className="result-list">
                      {searchResults[section].map((item) => (
                        <li
                          key={item._id}
                          className="result-item"
                          onClick={() => {
                            setSelectedItem(item);
                            if (section === "clients") handleNavigation("client management");
                            if (section === "orders") handleNavigation("orders");
                            if (section === "reports") handleNavigation("reports");
                            if (section === "remedies") handleNavigation("remedies");
                            closeModal();
                          }}
                        >
                          {section === "clients" && `${item.name} - ${item.email} (${item.phone})`}
                          {section === "orders" && `${item.clientName || "N/A"} - ₹${item.amount || 0}`}
                          {section === "reports" && `${item.title || item.reportType || "Report"}`}
                          {section === "remedies" && `${item.name || item.remedyType || "Remedy"}`}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-results">No results found in {section}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Modal>

        <section className="content-area">
          {active === "dashboard" && <Dashboard token={token} />}
          {active === "client management" && <Clients token={token} selectedItem={selectedItem} />}
          {active === "orders" && <Orders token={token} selectedItem={selectedItem} />}
          {active === "relationship-intelligence" && <AdminRelationshipPanel />}
          {active === "remedy-journey" && <AdminRemedyJourney />}
          {active === "astrologer management" && <Astrologers token={token} />}
          {active === "reports" && <Reports token={token} selectedItem={selectedItem} />}
          {active === "remedies" && <Remedies token={token} selectedItem={selectedItem} />}
          {active === "consultation management" && <ConsultationManagement token={token} />}
          {active === "feedback" && <FeedbackPage token={token} />}
          {active === "forms" && <Forms token={token} />}
          {active === "services" && <Services token={token} />}
          {active === "submissions" && <Submissions token={token} />}
          {active === "calculators" && renderCalculator()}
          {active === "content-vault" && <ContentVaultManager token={token} />}
          {active === "wallet & payment" && <WalletPage user={user} />}
          {active === "templates" && <Templates token={token} />}
          {active === "send-email" && <SendEmail token={token} />}
          {active === "send-whatsapp" && <SendWhatsApp token={token} />}
          {active === "trigger-automation" && <TriggerAutomation token={token} />}
          {active === "about-us" && <AboutUsAdmin token={token} />}
          {active === "careers" && <CareersAdmin token={token} />}
          {active === "contact-messages" && <ContactMessages />}
          {active === "our-cilents" && <OurCilents token={token} />}
          {active === "user management" && <UserManagement token={token} />}
          {active === "energy-services" && <EnergyServicesForm token={token} />}
          {active === "manifestation-admin" && <ManifestationAdmin />}
          {active === "know-more" && <KnowMoreAdmin />}
          {active === "experience-admin" && <ExperienceAdmin />}
          {active === "faq" && <FAQ />}
          {active === "astro-chat" && <AdminAstroChat />}
          {active === "wealth-tools" && <AdminWealthManager token={token} />}
          {active === "astrology-services" && <AdminAstrologyServices token={token} />}

          {active === "affirmations" && <AdminAffirmations />}
        </section>
      </main>
    </div>
  );
}
