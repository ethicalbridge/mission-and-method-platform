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
LABEL_OVERRIDE = {'it-and-information-security-policy': 'Policy with procedure steps',
                  'social-media-and-communications-policy': 'Policy with procedure steps',
                  'code-of-conduct': 'Code of conduct'}
def card_text(s):
    s = s.replace("the [[Organisation name]] website", "your website")
    s = s.replace("[[Organisation name]]'s", "your organisation's").replace("[[Organisation name]]", "your organisation")
    s = re.sub(r'\[\[([^\]]+)\]\]', lambda m: m.group(1).split(' / ')[0], s)
    for a, b in [(r'\bWe\b', 'You'), (r'\bwe\b', 'you'), (r'\bour\b', 'your'), (r'\bus\b', 'you'), (r'\bOur\b', 'Your')]:
        s = re.sub(a, b, s)
    s = s.replace('your organisation the organisation', 'your organisation')
    return s

CATS = [
 {'id': 'policies', 'name': 'Policies & procedures', 'file': 'legal-templates-policies.html',
  'lead': 'Policies set out the rules and commitments your organisation follows. Procedures set out the steps people take to put them into practice: who does what, by when, and what is recorded.',
  'intro': 'Each card says what you get. A policy gives the rules. A policy and procedure gives the rules and the steps in one document. A procedure gives the steps for a policy, or for a situation that keeps coming up, with forms, logs and letters in the annexes.',
  'legend': [['Policy', 'The rules and commitments, with roles and what happens if they are broken.'],
             ['Policy with procedure steps', 'A policy that also includes the key steps to follow.'],
             ['Policy and procedure', 'The rules and the full step-by-step procedure in one document.'],
             ['Procedure', 'The steps, owners, timescales and records, with templates in the annexes.'],
             ['Notice', 'Information you publish for the people whose data you hold or who visit your website.']],
  'groups': [
   {'id': 'conduct-safeguarding', 'name': 'Conduct and safeguarding', 'slugs': ['code-of-conduct','safeguarding-policy-and-procedure','anti-harassment-intimidation-and-bullying-policy-and-procedure','whistleblowing-policy-and-procedure','incident-reporting-procedure','complaints-and-feedback-procedure']},
   {'id': 'people', 'name': 'People', 'slugs': ['safer-recruitment-procedure','disciplinary-and-grievance-procedure','equality-diversity-and-inclusion-policy','health-safety-and-lone-working-policy']},
   {'id': 'integrity-money', 'name': 'Integrity and money', 'slugs': ['fraud-bribery-and-corruption-policy-and-procedure','conflict-of-interest-policy','gift-acceptance-policy','financial-controls-policy','finance-procedures','reserves-policy','procurement-policy','expenses-and-per-diem-policy']},
   {'id': 'partners-operations', 'name': 'Partners and operations', 'slugs': ['partner-due-diligence-and-sanctions-screening-policy','travel-safety-and-duty-of-care-policy','environmental-policy']},
   {'id': 'data-digital', 'name': 'Data and digital', 'slugs': ['data-protection-policy','privacy-notice','cookie-policy','data-rights-request-procedure','data-breach-response-procedure','it-and-information-security-policy','social-media-and-communications-policy']},
   {'id': 'managing-policies', 'name': 'Managing your policies', 'slugs': ['policy-approval-and-review-procedure']},
  ]},
 {'id': 'contracts', 'name': 'Contracts & agreements', 'file': 'legal-templates-contracts-and-agreements.html',
  'lead': 'Contracts and agreements record what parties expect from one another, including work, payment, information, rights and ways to end or resolve a relationship.',
  'intro': 'Each agreement has full clause wording, schedules and signature blocks, with guidance on the clauses that change most from country to country. Have the final version checked locally before anyone signs.',
  'groups': [
   {'id': 'people', 'name': 'People', 'slugs': ['employment-contract','co-founder-agreement','volunteer-agreement','independent-contractor-agreement']},
   {'id': 'organisations', 'name': 'Organisations, partners and the public', 'slugs': ['services-agreement','mutual-confidentiality-agreement','partnership-memorandum-of-understanding','sub-grant-agreement','gift-and-donation-agreement','data-sharing-agreement','website-terms-of-use']},
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
        cat_name = 'Policies & procedures' if g('category') in ('Policies', 'Procedures') else g('category')
        typ = g('type'); tl = typ.lower()
        if 'policy' in tl and 'procedure' in tl: label = 'Policy and procedure'
        elif tl == 'procedure': label = 'Procedure'
        elif tl == 'policy' and re.search(r'^# Procedure', s, re.M): label = 'Policy with procedure steps'
        else: label = typ
        label = LABEL_OVERRIDE.get(slug, label)
        temps.append({'slug': slug, 'title': g('title'), 'category': cat_name, 'type': typ, 'label': label,
                      'description': OVERRIDE.get(slug) or card_text(g('summary')), 'pages': pages,
                      'status': 'updated' if slug in OLD else 'new'})
    cat = {'redirects': [{'file': 'legal-templates-procedures.html', 'to': 'legal-templates-policies.html', 'title': 'Procedures'}], 'lead': 'Editable Word templates for policies, procedures, contracts, consent forms and governance. Each one has model wording, highlighted fields to fill in and guidance boxes to help you adapt it to your organisation and country.',
           'categories': CATS, 'templates': temps}
    json.dump(cat, sys.stdout, ensure_ascii=False, indent=1)

main(sys.argv[1])
