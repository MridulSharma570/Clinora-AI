import { Info } from "lucide-react";

interface ExplainabilityPanelProps {
  signals?: string[];
  safetyRule: string;
  knowledgeCards?: { id: string; title: string }[];
  localData: string;
  openRouterContacted: boolean;
  providerNote?: string;
}

export function ExplainabilityPanel({
  signals = [],
  safetyRule,
  knowledgeCards = [],
  localData,
  openRouterContacted,
  providerNote,
}: ExplainabilityPanelProps) {
  return (
    <details className="explain-panel">
      <summary>
        <span><Info size={18} aria-hidden="true" /> Why am I seeing this?</span>
        <span className="disclosure-hint">Details</span>
      </summary>
      <div className="explain-content">
        <dl>
          <div>
            <dt>Signals used</dt>
            <dd>{signals.length ? signals.join("; ") : "No emergency rule-category signals are currently reported."}</dd>
          </div>
          <div>
            <dt>General safety rule</dt>
            <dd>{safetyRule}</dd>
          </div>
          <div>
            <dt>Local knowledge cards</dt>
            <dd>{knowledgeCards.length ? knowledgeCards.map((card) => card.title).join("; ") : "No local knowledge cards were retrieved for this view."}</dd>
          </div>
          <div>
            <dt>What remains local</dt>
            <dd>{localData}</dd>
          </div>
          <div>
            <dt>OpenRouter contacted?</dt>
            <dd>{openRouterContacted ? "Yes, for the current validated chat request." : providerNote ?? "No. This view is generated locally."}</dd>
          </div>
          <div>
            <dt>Known limitations</dt>
            <dd>Rules and retrieval are incomplete. AI output can be wrong or outdated. No prompts, hidden reasoning, internal logs, or secrets are shown.</dd>
          </div>
        </dl>
      </div>
    </details>
  );
}
