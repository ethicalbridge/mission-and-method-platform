import re, glob, json, os, subprocess, sys
ROOT = os.path.dirname(os.path.abspath(__file__))
OLD = {'privacy-notice','safeguarding-policy-and-procedure','conflict-of-interest-policy','incident-reporting-procedure',
       'complaints-and-feedback-procedure','data-rights-request-procedure','services-agreement','independent-contractor-agreement',
       'mutual-confidentiality-agreement','partnership-memorandum-of-understanding','photo-and-story-consent-form',
       'research-participation-consent-form','information-sharing-consent-form','board-interest-declaration',
       'records-retention-schedule','legal-review-checklist'}
OVERRIDE = {
 'governing-body-terms-of-reference': 'How your board of trustees, directors or management committee works: what it decides, who sits on it, how it meets, and how it oversees the people who run the organisation day to day.',
 'website-terms-of-use': 'The terms that apply when people use your website, with optional sections for accounts, user content, online donations and a simple shop.',
 'cookie-policy': 'Explains to visitors which cookies and similar technologies your website uses, why, and how to accept, refuse or change them.',
}
def card_text(s):
    s = s.replace("the [[Organisation name]] website", "your website")
    s = s.replace("[[Organisation name]]'s", "your organisation's").replace("[[Organisation name]]", "your organisation")
    s = re.sub(r'\[\[([^\]]+)\]\]', lambda m: m.group(1).split(' / ')[0], s)
    for a, b in [(r'\bWe\b', 'You'), (r'\bwe\b', 'you'), (r'\bour\b', 'your'), (r'\bus\b', 'you'), (r'\bOur\b', 'Your')]:
        s = re.sub(a, b, s)
    s = s.replace('your organisation the organisation', 'your organisation')
    return s

CATS = [
 {'id': 'policies', 'name': 'Policies', 'file': 'legal-templates-policies.html',
  'lead': 'Policies state the principles and rules your organisation follows. They set expectations for decisions, behaviour and accountability across a topic.',
  'intro': 'Each policy comes with model wording, the commitments funders and partners look for, and clear steps for reporting and responding. Adapt it, have it approved, and review it every year.',
  'groups': [
   {'id': 'conduct-safeguarding', 'name': 'Conduct and safeguarding', 'slugs': ['code-of-conduct','safeguarding-policy-and-procedure','anti-harassment-intimidation-and-bullying-policy-and-procedure','whistleblowing-policy-and-procedure','equality-diversity-and-inclusion-policy']},
   {'id': 'integrity-money', 'name': 'Integrity and money', 'slugs': ['fraud-bribery-and-corruption-policy-and-procedure','conflict-of-interest-policy','gift-acceptance-policy','financial-controls-policy','reserves-policy','procurement-policy','expenses-and-per-diem-policy']},
   {'id': 'partners-operations', 'name': 'Partners and operations', 'slugs': ['partner-due-diligence-and-sanctions-screening-policy','travel-safety-and-duty-of-care-policy','environmental-policy']},
   {'id': 'data-digital', 'name': 'Data and digital', 'slugs': ['data-protection-policy','privacy-notice','cookie-policy','it-and-information-security-policy','social-media-and-communications-policy']},
  ]},
 {'id': 'procedures', 'name': 'Procedures', 'file': 'legal-templates-procedures.html',
  'lead': 'Procedures explain the steps people take to carry out a policy or handle a recurring situation. They make responsibilities, handoffs and records clear.',
  'intro': 'Each procedure sets out who does what and by when, with logs, forms and letter wording in the annexes, so your team can act quickly when it matters.'},
 {'id': 'contracts', 'name': 'Contracts & agreements', 'file': 'legal-templates-contracts-and-agreements.html',
  'lead': 'Contracts and agreements record what parties expect from one another, including work, payment, information, rights and ways to end or resolve a relationship.',
  'intro': 'Each agreement has full clause wording, schedules and signature blocks, with guidance on the clauses that change most from country to country. Have the final version checked locally before anyone signs.',
  'groups': [
   {'id': 'people', 'name': 'People', 'slugs': ['employment-contract','co-founder-agreement','volunteer-agreement','independent-contractor-agreement']},
   {'id': 'organisations', 'name': 'Organisations, partners and the public', 'slugs': ['services-agreement','mutual-confidentiality-agreement','partnership-memorandum-of-understanding','sub-grant-agreement','data-sharing-agreement','website-terms-of-use']},
  ]},
 {'id': 'consent', 'name': 'Consent forms', 'file': 'legal-templates-consent-forms.html',
  'lead': 'Consent forms help people understand a specific activity or use of their information and record a clear choice where consent is appropriate.',
  'intro': 'Each form uses plain language, separate choices for each use, verbal and thumbprint options, and guidance for the person taking consent, including for children.'},
 {'id': 'governance', 'name': 'Governance & compliance', 'file': 'legal-templates-governance-and-compliance.html',
  'lead': 'Governance and compliance documents help leaders oversee decisions, keep records and check that required duties are being met.',
  'intro': 'Registers, checklists, terms of reference and assessments with worked examples, so your board and team can see who decides what and whether duties are being met.'},
]

def main(pdf_dir):
    temps = []
    for f in sorted(glob.glob(os.path.join(ROOT, 'src', '*.md'))):
        s = open(f, encoding='utf8').read()
        g = lambda k: (re.search(rf'^{k}:\s*(.*)$', s, re.M) or [None, ''])[1].strip()
        slug = os.path.basename(f)[:-3]
        pages = None
        p = os.path.join(pdf_dir, slug + '.pdf')
        if os.path.exists(p):
            out = subprocess.run(['pdfinfo', p], capture_output=True, text=True).stdout
            pages = int(re.search(r'Pages:\s+(\d+)', out).group(1))
        temps.append({'slug': slug, 'title': g('title'), 'category': g('category'), 'type': g('type'),
                      'description': OVERRIDE.get(slug) or card_text(g('summary')), 'pages': pages,
                      'status': 'updated' if slug in OLD else 'new'})
    cat = {'lead': 'Editable Word templates for policies, procedures, contracts, consent forms and governance. Each one has model wording, highlighted fields to fill in and guidance boxes to help you adapt it to your organisation and country.',
           'categories': CATS, 'templates': temps}
    json.dump(cat, sys.stdout, ensure_ascii=False, indent=1)

main(sys.argv[1])
