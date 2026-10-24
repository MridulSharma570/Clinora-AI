export interface ArticleGuidance {
  takeaways: string[];
  practice: string;
  reflection: string;
}

export const articleGuidance: Record<string, ArticleGuidance> = {
  "preparing-appointment": {
    takeaways: ["Lead with the one concern you most want to discuss.", "Choose a few priority questions instead of trying to cover everything.", "Before leaving, check that the next step and follow-up route are clear."],
    practice: "Write three lines: what changed, when you noticed it, and what you want to understand. Keep the note in a form you can comfortably bring to the visit.",
    reflection: "If there is time for only one question, which one would help you most?",
  },
  "emergency-warning-signs": {
    takeaways: ["Online preparation is not emergency care.", "A limited keyword list cannot identify every emergency or confirm safety.", "Local emergency services are the appropriate route when immediate help may be needed."],
    practice: "Keep the emergency number for your current location accessible. Clinora AI lets you store a number locally, but it cannot verify that the number is correct for you.",
    reflection: "Do you know how to reach local emergency help without opening an app?",
  },
  "describing-timing": {
    takeaways: ["A rough starting point is still useful.", "Coming and going is different from being constant, and both can be described simply.", "Recent changes can be added without interpreting what they mean."],
    practice: "Try a sentence with three parts: “I first noticed…”, “It tends to…”, and “Recently…”. Use estimates rather than searching for exact records if those are not needed.",
    reflection: "What is the clearest example of something that changed?",
  },
  "health-concern-timeline": {
    takeaways: ["Short notes can be easier to maintain than a detailed diary.", "Timing and everyday context can be recorded without medical labels.", "Privacy matters even in personal notes and online tools."],
    practice: "Use a small note with four optional prompts: when, how long, what else was happening, and what felt different. Stop tracking if it becomes burdensome or a clinician suggests a different approach.",
    reflection: "What is the smallest amount of information that would help you remember the day clearly?",
  },
  "clinician-question-list": {
    takeaways: ["A question list supports a conversation; it does not provide a result.", "Marking priorities can help when appointment time is limited.", "Asking for plain-language clarification is reasonable."],
    practice: "Put a star beside your top two questions. Add a final line: “Can we check that I understand what happens next?”",
    reflection: "Which answer would help you feel more prepared for the next step, without expecting an online tool to decide it?",
  },
  "online-health-privacy": {
    takeaways: ["Check storage, sharing, and deletion behavior before entering sensitive details.", "Leave out direct identifiers whenever they are unnecessary.", "Local storage can still be visible on a shared device."],
    practice: "Review your message before sending. Remove contact details, account numbers, record identifiers, and information about other people. Use local deletion controls when finished on a shared browser.",
    reflection: "Would you be comfortable with this exact text leaving your device? If not, what can you remove?",
  },
  "ai-health-limitations": {
    takeaways: ["Fluent language is not proof of accuracy or individual relevance.", "Generated information can omit context or become outdated.", "A useful role for AI is preparing questions, not settling clinical decisions."],
    practice: "Turn a general answer into questions for a qualified clinician: “Does this general information apply to me?”, “What else should we consider?”, and “What should I do if things change?”",
    reflection: "Are you being asked to make a decision from generated text alone? If so, pause and seek qualified advice.",
  },
  "daily-impact": {
    takeaways: ["Everyday examples can communicate impact without technical vocabulary.", "Specific activities can be easier to describe than a number or score.", "You can share only what you are comfortable discussing."],
    practice: "Describe one activity that feels different: what you used to do, what happens now, and how often the difference is noticeable. Avoid turning the description into a diagnostic conclusion.",
    reflection: "Which everyday example best shows why this concern matters to you?",
  },
};
