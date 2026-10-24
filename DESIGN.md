# Clinora AI — Tide Glass Design System

## Brand principles

1. **Calm before care:** spacious composition, measured motion, and reassuring language without reassurance about health outcomes.
2. **Clarity over clinical theatre:** no fake medical-device chrome, diagnostic meters, hospital imagery, or condition visualizations.
3. **Visible boundaries:** educational and AI limitations sit near actions, not in fine print.
4. **Privacy made tangible:** local-only status and AI data paths are explained where decisions happen.
5. **Original by construction:** abstract water geometry, original Clinora tide mark, CSS gradients, and Lucide interface icons only.

## Tide Glass visual language

Tide Glass uses translucent, rounded surfaces reminiscent of light through sea glass. It is an original CSS system, not a reproduction of any operating system or healthcare brand. Layered radial gradients suggest slow water movement; thin highlights and deep navy anchors preserve legibility.

### Core color tokens

| Token | Dark value | Use |
|---|---|---|
| Ink | `#07141C` | Page base |
| Deep Water | `#102733` | Raised background |
| Surface | `#16323A` | Solid fallback/card |
| Sea Glass | `#8EE0CF` | Primary action/accent |
| Soft Violet | `#B5A6FF` | Secondary accent |
| Main Text | `#F3F7F6` | Primary text |
| Secondary Text | `#C5D4D0` | Supporting text |
| Emergency Background | `#3A1612` | Emergency region |
| Emergency Text | `#FFB4A2` | Emergency text |
| Emergency Solid | `#E7654F` | Solid emergency action |

Light mode uses deep ink text on pale mineral/sea-glass surfaces. High-contrast mode removes translucency and blur, strengthens borders, and avoids subtle text. Exact token values live in `app/globals.css`.

### Typography

- System-only font stack; no third-party font request or tracking dependency.
- Large, compact headline measures with responsive `clamp()` sizing.
- Body line length around 65–75 characters for legal/educational reading.
- Numeric progress and labels use tabular numbers where useful.
- Semantic `h1` → `h2` → `h3`; visual size never substitutes for heading structure.

## Bottom navigation rules

- Fixed, persistent, keyboard-navigable five-item dock: Home, Check, Ask AI, History, More.
- Same model on desktop and mobile; desktop uses a wider centered dock rather than removing routes.
- Minimum 44px targets, text labels always visible, current route communicated with `aria-current="page"`.
- Active tab pill is translucent Sea Glass with an opaque high-contrast alternative.
- Safe-area inset support and sufficient page bottom padding prevent content obstruction.
- Emergency is not buried in More: a solid emergency action remains in the page header.

## Glass component rules

- Use `backdrop-filter: blur()` with a solid Surface fallback before the enhancement.
- Thin low-opacity border, soft shadow, and subtle inset highlight; no glass over busy text backgrounds unless contrast is verified.
- Primary button: Sea Glass tint, dark text, bold label, subtle press scale.
- Secondary button: translucent neutral surface, high-contrast text.
- Emergency button: always solid coral/red; never glass, animated, hidden in a modal, or icon-only.
- Inputs use mostly opaque surfaces for readability and visible labels above fields.
- Motion is limited to small opacity/transform transitions and disabled under `prefers-reduced-motion: reduce`.

## Responsive layout

- Mobile-first single column; page gutter 16–20px and persistent bottom-dock clearance.
- Content shell max width about 1180px; reading shell max width about 760px.
- Two-column hero/cards at wider breakpoints; forms remain focused and never require horizontal scrolling.
- Chat transcript and composer remain usable at 320px width and with browser zoom.
- Print styles remove navigation, decorative backgrounds, and interactive-only controls.

## Component inventory

- `AppHeader`, `BottomNav`, `PageShell`, `TideLogo`, `FirstUseRedirect`.
- `GlassCard`, `GlassButton`, `GlassLink`, `Badge`, `SectionHeading`, `EmptyState`.
- `ConsentGate`, `PrivacyReminder`, `SafetyNotice`, `EmergencyPanel`.
- `GuidedCheckStep`, `ProgressSteps`, `ReviewRow`.
- `VisitSummary`, `QuestionList`, `ExplainabilityPanel`.
- `ChatTranscript`, `ChatComposer`, `ResourceList`, `UnavailableState`.
- `HistoryList`, `DeleteAllControl`, `SettingsField`, `ThemeControls`.
- `LegalDocument`, `KnowledgeCard`, `SourceLink`.

Local components follow shadcn/ui-style ownership and composition patterns but are original implementations; no third-party visual theme was copied.

## Accessibility checklist

- [x] Semantic landmarks and one clear page `h1`.
- [x] 44px minimum touch targets and text labels for navigation.
- [x] Visible `:focus-visible` outline with offset.
- [x] Persistent form labels, descriptions, and accessible error associations.
- [x] Icon-only controls have accessible names; decorative icons are hidden.
- [x] Status/errors use polite live regions; emergency content is immediately visible.
- [x] Keyboard-operable navigation, forms, disclosure panels, and deletion controls.
- [x] Dark/light contrast-safe palettes and explicit high-contrast mode.
- [x] Reduced-motion support and no essential information conveyed by motion.
- [x] Browser zoom/reflow and print output considered.
- [x] Emergency actions are solid, high visibility, and outside modals.

## High-contrast and no-blur fallback

`@supports not (backdrop-filter: blur(1px))` supplies opaque surfaces. `data-contrast="high"` on the root removes transparency/blur, uses solid Ink/Surface backgrounds, doubles border visibility, disables decorative wash layers, and preserves solid coral emergency controls. User preference is a non-sensitive local setting and respects the operating-system contrast preference where available.
