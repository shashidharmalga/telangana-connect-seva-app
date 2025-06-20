
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    title: "DigiPanchayath",
    subtitle: "Digital Governance Platform",
    reportIssue: "Report Issue",
    trackProgress: "Track Progress",
    schemes: "Schemes",
    escalate: "Escalate",
    backToHome: "Back to Home",
    officerLogin: "Officer Login",
    submitReport: "Submit Report",
    trackStatus: "Track Status",
    viewSchemes: "View Schemes",
    escalateIssue: "Escalate Issue"
  },
  te: {
    title: "డిజిపంచాయతి",
    subtitle: "డిజిటల్ పాలన వేదిక",
    reportIssue: "సమస్యను నివేదించండి",
    trackProgress: "పురోగతిని ట్రాక్ చేయండి",
    schemes: "పథకాలు",
    escalate: "ఎస్కలేట్ చేయండి",
    backToHome: "హోమ్‌కు తిరిగి వెళ్లండి",
    officerLogin: "అధికారి లాగిన్",
    submitReport: "నివేదిక సమర్పించండి",
    trackStatus: "స్థితిని ట్రాక్ చేయండి",
    viewSchemes: "పథకాలను చూడండి",
    escalateIssue: "సమస్యను ఎస్కలేట్ చేయండి"
  },
  hi: {
    title: "डिजिपंचायत",
    subtitle: "डिजिटल शासन मंच",
    reportIssue: "समस्या रिपोर्ट करें",
    trackProgress: "प्रगति ट्रैक करें",
    schemes: "योजनाएं",
    escalate: "एस्केलेट करें",
    backToHome: "होम पर वापस जाएं",
    officerLogin: "अधिकारी लॉगिन",
    submitReport: "रिपोर्ट सबमिट करें",
    trackStatus: "स्थिति ट्रैक करें",
    viewSchemes: "योजनाएं देखें",
    escalateIssue: "समस्या एस्केलेट करें"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
