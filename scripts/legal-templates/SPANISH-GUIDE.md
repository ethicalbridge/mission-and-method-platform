# Spanish versions of the templates: translator's brief

Every English template in `src/<slug>.md` gets a Spanish version in `src-es/<slug>.md` (same slug, same file name).
Build one with `node scripts/legal-templates/build.cjs --lang=es <slug>` (run from the repo root). It writes
`assets/legal-templates/es/<slug>.docx` with a Spanish cover, guide page and labels. Fix any `FAILED` line.

## What to translate

- Everything a reader sees: front-matter values (`title`, `eyebrow`, `summary`, `type`, `applies_to`, `purpose`, `who_asks`,
  `time`, `course`, `related`, `contact` placeholder text), headings, body text, tables, boxes, tick boxes, signature labels.
- Placeholders keep their double brackets and are translated: `[[Organisation name]]` → `[[Nombre de la organización]]`,
  `[[24 hours / 48 hours]]` → `[[24 horas / 48 horas]]`, `[[safeguarding@yourorganisation.org]]` → `[[salvaguarda@tuorganizacion.org]]`.
- Box titles after `::: adapt`, `::: note`, `::: statement` are translated (`::: note Proportionate to our size` → `::: note Proporcional a nuestro tamaño`).

## What NOT to change

- The markup, exactly: `---` front matter, `#`/`##`/`###`/`####`, `::: kind Title` … `:::`, `{widths: …}`, pipe tables, `[ ]`, `---pagebreak---`,
  `**bold**`, list markers and indentation. Same number of sections, tables, rows, columns and boxes as the English file.
- Front-matter KEYS and these values: `slug`, `category` (keep the English value exactly), `control`, `contents`, `history`.
- Names of laws, regulators, standards and acronyms stay as they are officially named (e.g. UK Bribery Act 2010, GDPR, POPIA, LGPD,
  IASC, FATF Recommendation 8, ISO 22301). Where an official Spanish name exists, use it and keep the acronym:
  GDPR → "Reglamento General de Protección de Datos (RGPD)"; FATF → "GAFI"; IASC stays IASC. Never invent or change a legal citation.

## Language and style

- Neutral international Spanish that reads well in Latin America and Spain. Avoid regionalisms (use "computadora/ordenador" → prefer
  "equipo"; "celular/móvil" → prefer "teléfono"). Spell "organización", "financiador", "voluntariado", "personal".
- The organisation speaks as "nosotros". In policies, procedures and forms, address the reader formally as "usted".
  In `::: adapt` boxes (guidance to the person adapting the template) use "tú", like the website.
- Contracts and agreements use standard contractual Spanish ("las Partes", "el Contratista", "la Organización"), third person.
- Inclusive, plain language: prefer "las personas", "el personal", "la persona voluntaria" over "los trabajadores", "el voluntario".
  Do not use "@", "x" or "e" endings.
- Short sentences, active voice, same meaning as the English. Do not add, drop or soften obligations, time limits or numbers.

## Courses (for the `course:` field)

Course names stay in English, as on the website: "Course 4 · Protect" → "Curso 4 · Protect" (Clarify, Organise, Prove & Show, Protect, Sustain & Run).
"Module 10 (Legal, compliance, policies and risk)" → "Módulo 10 (Legal, cumplimiento, políticas y riesgos)"; translate other module names in the same way.

## Template titles (use exactly these in `title:` and in every cross-reference / `related:`)

| slug | Spanish title |
|---|---|
| anti-harassment-intimidation-and-bullying-policy-and-procedure | Política y Procedimiento contra el Acoso, la Intimidación y el Hostigamiento |
| board-interest-declaration | Declaración de Intereses del Órgano de Gobierno |
| board-meeting-agenda-and-minutes | Orden del Día y Acta de Reunión del Órgano de Gobierno |
| board-member-role-description | Descripción del Rol de Miembro del Órgano de Gobierno |
| board-skills-matrix | Matriz de Competencias del Órgano de Gobierno |
| business-continuity-and-crisis-plan | Plan de Continuidad y Gestión de Crisis |
| co-founder-agreement | Acuerdo entre Cofundadores |
| code-of-conduct | Código de Conducta |
| complaints-and-feedback-procedure | Procedimiento de Quejas y Retroalimentación |
| conflict-of-interest-policy | Política de Conflictos de Interés |
| cookie-policy | Política de Cookies |
| data-breach-response-procedure | Procedimiento de Respuesta ante Brechas de Datos |
| data-protection-impact-assessment | Evaluación de Impacto en la Protección de Datos |
| data-protection-policy | Política de Protección de Datos |
| data-rights-request-procedure | Procedimiento de Solicitudes de Derechos sobre los Datos |
| data-sharing-agreement | Acuerdo de Intercambio de Datos |
| delegation-of-authority-matrix | Matriz de Delegación de Autoridad |
| disciplinary-and-grievance-procedure | Procedimiento Disciplinario y de Reclamaciones |
| employment-contract | Contrato de Trabajo |
| environmental-policy | Política Ambiental |
| equality-diversity-and-inclusion-policy | Política de Igualdad, Diversidad e Inclusión |
| expenses-and-per-diem-policy | Política de Gastos y Viáticos |
| finance-procedures | Procedimientos Financieros |
| financial-controls-policy | Política de Controles Financieros |
| fraud-bribery-and-corruption-policy-and-procedure | Política y Procedimiento contra el Fraude, el Soborno y la Corrupción |
| fundraising-and-communications-consent-form | Formulario de Consentimiento para Recaudación de Fondos y Comunicaciones |
| gift-acceptance-policy | Política de Aceptación de Regalos y Donaciones |
| governing-body-terms-of-reference | Términos de Referencia del Órgano de Gobierno |
| governing-document-guide | Guía del Documento Constitutivo y Estatuto Modelo |
| health-safety-and-lone-working-policy | Política de Salud, Seguridad y Trabajo en Solitario |
| incident-reporting-procedure | Procedimiento de Notificación de Incidentes |
| independent-contact-role-note | Nota sobre el Rol de Contacto Independiente |
| independent-contractor-agreement | Contrato de Prestación de Servicios Independientes |
| information-sharing-consent-form | Formulario de Consentimiento para Compartir Información |
| it-and-information-security-policy | Política de TI y Seguridad de la Información |
| legal-review-checklist | Lista de Verificación para Revisión Legal |
| mutual-confidentiality-agreement | Acuerdo de Confidencialidad Mutua |
| partner-due-diligence-and-sanctions-screening-policy | Política de Debida Diligencia de Socios y Control de Sanciones |
| partner-due-diligence-questionnaire | Cuestionario de Debida Diligencia para Socios |
| partnership-memorandum-of-understanding | Memorando de Entendimiento de Alianza |
| photo-and-story-consent-form | Formulario de Consentimiento para Fotos e Historias |
| policy-approval-and-review-procedure | Procedimiento de Aprobación y Revisión de Políticas |
| privacy-notice | Aviso de Privacidad |
| procurement-policy | Política de Compras y Contrataciones |
| records-retention-schedule | Calendario de Conservación de Registros |
| research-participation-consent-form | Formulario de Consentimiento para Participar en una Investigación |
| reserves-policy | Política de Reservas |
| risk-register | Registro de Riesgos |
| safeguarding-policy-and-procedure | Política y Procedimiento de Salvaguarda |
| safer-recruitment-procedure | Procedimiento de Contratación Segura |
| services-agreement | Contrato de Servicios |
| social-media-and-communications-policy | Política de Redes Sociales y Comunicaciones |
| sub-grant-agreement | Acuerdo de Subvención a Socios |
| travel-safety-and-duty-of-care-policy | Política de Seguridad en Viajes y Deber de Cuidado |
| volunteer-agreement | Acuerdo de Voluntariado |
| website-terms-of-use | Términos de Uso del Sitio Web |
| whistleblowing-policy-and-procedure | Política y Procedimiento de Denuncia de Irregularidades |

## Before you finish each file

1. `node scripts/legal-templates/build.cjs --lang=es <slug>`: no FAILED line.
2. Check the markup matches: `grep -c '^:::' src/<slug>.md src-es/<slug>.md` and `grep -c '^|' ...` and `grep -c '^#' ...` give the same numbers.
3. No English left except names of laws, standards and organisations: skim the file.
4. `grep -inE "handova|ethical bridge|julieta|castiñeira|wyoming" src-es/<slug>.md` returns nothing.
