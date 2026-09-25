(() => {
  'use strict';

  const STORAGE_KEY = 'mm.donor-mapping.v1';
  const CURRENT_VERSION = 2;
  const TABS = [
    ['matrix', 'Donor matrix'],
    ['guide', 'Assessment guide'],
    ['backup', 'Backup & restore']
  ];

  const GENERAL = [
    ['donor', 'Donor', 'text', 'Name of the donor organisation or fund.'],
    ['fundName', 'Fund name', 'text', 'Specific fund, call or programme when known.'],
    ['goNoGo', 'Go / No-go', 'decision', 'Record the team decision after reviewing the assessment.'],
    ['priority', 'Priority', 'priority', 'Use High, Medium or Low to indicate attention needed.'],
    ['donorType', 'Donor type', 'type', 'For example Trust, Institutional donor or Corporate.'],
    ['interestAreas', 'Interest areas', 'text', 'Relevant themes, populations, geography or SDGs.'],
    ['restrictions', 'Restrictions', 'textarea', 'Eligibility, compliance, geography or other restrictions.'],
    ['fundingAmount', 'Indicative amount', 'text', 'Known or estimated amount and currency.'],
    ['keyDates', 'Key dates', 'text', 'Opening date, closing date, decision date or cycle.'],
    ['fundingLength', 'Funding length', 'text', 'Expected grant period or renewal cycle.'],
    ['contactDetails', 'Contact details', 'textarea', 'Public contact point, relationship holder or engagement note.'],
    ['website', 'Website', 'url', 'Official donor or fund web address.'],
    ['notes', 'Notes', 'textarea', 'Freeform research, context or next-step note.']
  ];

  const GROUPS = [
    {
      id: 'strategy', label: 'Strategy', className: 'group-strategy',
      fields: [
        ['valuesAlignment', 'Values aligned', 'Are values and approach aligned?'],
        ['coreWorkSupport', 'Supports core work', 'Can the donor support the organisation’s core purpose?'],
        ['requirementsGapFit', 'Fits funding gap', 'Would this support an identified funding requirement or gap?'],
        ['innovationFit', 'Fits new work', 'Could it support a relevant new area, innovation or opportunity?'],
        ['coreFundingSupport', 'Supports core funding', 'Could it support unrestricted or core funding?']
      ]
    },
    {
      id: 'likelihood', label: 'Likelihood of success', className: 'group-likelihood',
      fields: [
        ['currentPosition', 'Current position', 'Is there an existing relationship or route in?'],
        ['wellPositioned', 'Well positioned', 'Is the organisation credibly positioned to apply?'],
        ['competitiveLandscape', 'Competition understood', 'Is the competitive landscape sufficiently understood?'],
        ['valueForMoney', 'Value for money', 'Can a compelling value-for-money case be made?'],
        ['connectedPartners', 'Connected partners', 'Are relevant partners or allies connected?']
      ]
    },
    {
      id: 'technical', label: 'Technical', className: 'group-technical',
      fields: [
        ['proposalSummary', 'Proposal outline', 'Is there a clear proposal idea or summary?'],
        ['proposalReadiness', 'Proposal readiness', 'Can the proposal be developed to the required standard?']
      ]
    },
    {
      id: 'capacity', label: 'Capacity', className: 'group-capacity',
      fields: [
        ['timetableStrength', 'Timetable works', 'Can the deadline and timetable realistically be met?'],
        ['deliveryCapacity', 'Delivery capacity', 'Is there enough capacity to deliver a funded project?'],
        ['staffingCapacity', 'Staffing capacity', 'Are the right people available to lead and support it?']
      ]
    },
    {
      id: 'risk', label: 'Risk', className: 'group-risk',
      fields: [
        ['donorReputationalRisk', 'Donor reputation risk', 'Could the donor’s reputation create a concern?'],
        ['ethicalBridgeReputationalRisk', 'Organisation reputation risk', 'Could the work create reputational risk for the organisation?'],
        ['financialRisk', 'Financial risk', 'Could the opportunity create an unacceptable financial risk?'],
        ['newThematicGeographicRisk', 'Thematic / geographic risk', 'Could it take the organisation too far from its focus or geography?'],
        ['governmentPartnerRisk', 'Government / partner risk', 'Could it introduce a government, judiciary or partner risk?'],
        ['teamOverloadRisk', 'Team burden risk', 'Could it overburden the team or distract from priority work?']
      ]
    }
  ];

  const ASSESSMENT_FIELDS = GROUPS.flatMap(group => group.fields);
  const ALL_FIELDS = [...GENERAL, ...ASSESSMENT_FIELDS];
  const SELECT_OPTIONS = {
    decision: ['', 'Go', 'No go'],
    priority: ['', 'High', 'Medium', 'Low'],
    type: ['', 'Trust', 'Institutional donor', 'Corporate', 'Foundation', 'Government', 'Multilateral', 'Network', 'Other'],
    assessment: ['', 'Yes', 'No', "Don't know"]
  };

  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
  const uid = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const blankMeta = () => ({ organisation: '', period: '', preparedBy: '', notes: '' });
  const blankDonor = () => Object.fromEntries([
    ['id', uid()],
    ...ALL_FIELDS.map(([key]) => [key, ''])
  ]);
  const blankState = () => ({ version: CURRENT_VERSION, meta: blankMeta(), donors: [] });

  function exampleDonors() {
    const examples = [
      {
        donor: 'Mama Cash',
        fundName: 'General support grants',
        goNoGo: 'Go',
        priority: 'High',
        donorType: 'Foundation',
        interestAreas: 'Feminist movements and women’s rights',
        restrictions: 'Review current eligibility and grant-call criteria.',
        fundingAmount: 'Illustrative — confirm current call',
        keyDates: 'Review annual grant cycle',
        fundingLength: 'Confirm with current guidance',
        website: 'https://www.mamacash.org',
        notes: 'Example record — replace with your team’s current research.',
        valuesAlignment: 'Yes', coreWorkSupport: 'Yes', requirementsGapFit: 'Yes',
        innovationFit: 'Yes', coreFundingSupport: 'Yes', currentPosition: "Don't know",
        wellPositioned: 'Yes', competitiveLandscape: "Don't know", valueForMoney: 'Yes',
        connectedPartners: "Don't know", proposalSummary: 'Yes', proposalReadiness: "Don't know",
        timetableStrength: 'Yes', deliveryCapacity: 'Yes', staffingCapacity: "Don't know",
        donorReputationalRisk: 'No', ethicalBridgeReputationalRisk: 'No', financialRisk: 'No',
        newThematicGeographicRisk: 'No', governmentPartnerRisk: 'No', teamOverloadRisk: "Don't know"
      },
      {
        donor: 'Black Feminist Fund',
        fundName: 'Movement-building support',
        goNoGo: 'Go',
        priority: 'High',
        donorType: 'Network',
        interestAreas: 'Black feminist movements and organisations',
        restrictions: 'Review current eligibility and route to application.',
        fundingAmount: 'Illustrative — confirm current opportunity',
        keyDates: 'Research current funding windows',
        fundingLength: 'Confirm with current guidance',
        website: 'https://blackfeministfund.org',
        notes: 'Example record — intended to show how the assessment can be used.',
        valuesAlignment: 'Yes', coreWorkSupport: 'Yes', requirementsGapFit: 'Yes',
        innovationFit: 'Yes', coreFundingSupport: 'Yes', currentPosition: "Don't know",
        wellPositioned: "Don't know", competitiveLandscape: "Don't know", valueForMoney: 'Yes',
        connectedPartners: "Don't know", proposalSummary: "Don't know", proposalReadiness: "Don't know",
        timetableStrength: "Don't know", deliveryCapacity: 'Yes', staffingCapacity: "Don't know",
        donorReputationalRisk: 'No', ethicalBridgeReputationalRisk: 'No', financialRisk: 'No',
        newThematicGeographicRisk: 'No', governmentPartnerRisk: 'No', teamOverloadRisk: "Don't know"
      },
      {
        donor: 'Global Fund for Women',
        fundName: 'Gender justice grants',
        goNoGo: 'Go',
        priority: 'High',
        donorType: 'Foundation',
        interestAreas: 'Gender justice, human rights and movement building',
        restrictions: 'Confirm current geographic and organisation requirements.',
        fundingAmount: 'Illustrative — confirm current call',
        keyDates: 'Review current grant cycle',
        fundingLength: 'Confirm with current guidance',
        website: 'https://www.globalfundforwomen.org',
        notes: 'Example record — not a statement of current eligibility or funding availability.',
        valuesAlignment: 'Yes', coreWorkSupport: 'Yes', requirementsGapFit: 'Yes',
        innovationFit: 'Yes', coreFundingSupport: "Don't know", currentPosition: "Don't know",
        wellPositioned: 'Yes', competitiveLandscape: "Don't know", valueForMoney: 'Yes',
        connectedPartners: "Don't know", proposalSummary: 'Yes', proposalReadiness: "Don't know",
        timetableStrength: 'Yes', deliveryCapacity: 'Yes', staffingCapacity: 'Yes',
        donorReputationalRisk: 'No', ethicalBridgeReputationalRisk: 'No', financialRisk: 'No',
        newThematicGeographicRisk: 'No', governmentPartnerRisk: 'No', teamOverloadRisk: 'No'
      },
      {
        donor: 'All We Can',
        fundName: 'Locally led development partnerships',
        goNoGo: '',
        priority: 'Medium',
        donorType: 'Institutional donor',
        interestAreas: 'Locally led development and international partnership',
        restrictions: 'Research partnership model, geography and current priorities.',
        fundingAmount: 'Research needed',
        keyDates: 'Research current opportunities',
        fundingLength: 'Research needed',
        website: 'https://www.allwecan.org.uk',
        notes: 'Example record — deliberately left under review until evidence is complete.',
        valuesAlignment: 'Yes', coreWorkSupport: "Don't know", requirementsGapFit: "Don't know",
        innovationFit: 'Yes', coreFundingSupport: "Don't know", currentPosition: "Don't know",
        wellPositioned: "Don't know", competitiveLandscape: "Don't know", valueForMoney: "Don't know",
        connectedPartners: "Don't know", proposalSummary: "Don't know", proposalReadiness: "Don't know",
        timetableStrength: "Don't know", deliveryCapacity: 'Yes', staffingCapacity: "Don't know",
        donorReputationalRisk: 'No', ethicalBridgeReputationalRisk: 'No', financialRisk: "Don't know",
        newThematicGeographicRisk: "Don't know", governmentPartnerRisk: "Don't know", teamOverloadRisk: "Don't know"
      },
      {
        donor: 'Google.org',
        fundName: 'Social impact grant opportunities',
        goNoGo: '',
        priority: 'Low',
        donorType: 'Corporate',
        interestAreas: 'Technology, social innovation and public benefit',
        restrictions: 'Confirm scope, geography and invitation requirements before pursuing.',
        fundingAmount: 'Research needed',
        keyDates: 'Monitor public opportunities',
        fundingLength: 'Research needed',
        website: 'https://www.google.org',
        notes: 'Example record — illustrative only, with no claim of eligibility or open funding.',
        valuesAlignment: "Don't know", coreWorkSupport: "Don't know", requirementsGapFit: "Don't know",
        innovationFit: 'Yes', coreFundingSupport: 'No', currentPosition: 'No',
        wellPositioned: "Don't know", competitiveLandscape: "Don't know", valueForMoney: "Don't know",
        connectedPartners: "Don't know", proposalSummary: "Don't know", proposalReadiness: "Don't know",
        timetableStrength: "Don't know", deliveryCapacity: 'Yes', staffingCapacity: "Don't know",
        donorReputationalRisk: "Don't know", ethicalBridgeReputationalRisk: "Don't know", financialRisk: 'No',
        newThematicGeographicRisk: "Don't know", governmentPartnerRisk: "Don't know", teamOverloadRisk: 'No'
      }
    ];
    return examples.map(example => Object.assign(blankDonor(), example));
  }

  function normaliseDonor(candidate) {
    const donor = blankDonor();
    if (!candidate || typeof candidate !== 'object') return donor;
    donor.id = String(candidate.id || donor.id);
    for (const [key] of ALL_FIELDS) donor[key] = String(candidate[key] ?? '');
    return donor;
  }

  function normaliseState(candidate) {
    if (!candidate || typeof candidate !== 'object' || !Array.isArray(candidate.donors)) {
      throw new Error('This is not a compatible Donor Mapping backup.');
    }
    const meta = candidate.meta && typeof candidate.meta === 'object' ? candidate.meta : {};
    return {
      version: Number(candidate.version) || 1,
      meta: {
        organisation: String(meta.organisation ?? ''),
        period: String(meta.period ?? ''),
        preparedBy: String(meta.preparedBy ?? ''),
        notes: String(meta.notes ?? '')
      },
      donors: candidate.donors.map(normaliseDonor)
    };
  }

  function initialState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return { ...blankState(), donors: exampleDonors() };
      const restored = normaliseState(saved);
      const hasMeaningfulDonor = restored.donors.some(row => ALL_FIELDS.some(([key]) => String(row[key] || '').trim()));
      if (restored.version < CURRENT_VERSION && !hasMeaningfulDonor) {
        return { ...restored, version: CURRENT_VERSION, donors: exampleDonors() };
      }
      return { ...restored, version: CURRENT_VERSION };
    } catch {
      return { ...blankState(), donors: exampleDonors() };
    }
  }

  let state = initialState();
  let tab = 'matrix';
  let filters = { decision: 'all', priority: 'all', donorType: 'all', assessment: 'all' };

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function safeFileName() {
    return String(state.meta.organisation || 'Donor-mapping')
      .replace(/[^a-z0-9_-]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'Donor-mapping';
  }

  function fieldControl(row, field, isAssessment = false) {
    const [key, label, type] = field;
    const value = row[key] || '';
    const aria = `${label} for ${row.donor || 'new donor'}`;
    if (type === 'decision' || type === 'priority' || type === 'type' || isAssessment) {
      const options = SELECT_OPTIONS[isAssessment ? 'assessment' : type];
      return `<select class="cell-control ${key === 'goNoGo' && value === 'Go' ? 'status-go' : key === 'goNoGo' && value === 'No go' ? 'status-no-go' : ''}" data-row="${esc(row.id)}" data-field="${esc(key)}" aria-label="${esc(aria)}">
        ${options.map(option => `<option value="${esc(option)}" ${value === option ? 'selected' : ''}>${esc(option || 'Select…')}</option>`).join('')}
      </select>`;
    }
    if (type === 'textarea') {
      return `<textarea class="cell-control" data-row="${esc(row.id)}" data-field="${esc(key)}" aria-label="${esc(aria)}">${esc(value)}</textarea>`;
    }
    return `<input class="cell-control" type="${type === 'url' ? 'url' : 'text'}" data-row="${esc(row.id)}" data-field="${esc(key)}" aria-label="${esc(aria)}" value="${esc(value)}"${type === 'url' ? ' placeholder="https://"' : ''}>`;
  }

  function assessmentSummary(row) {
    const { yes, no, unknown, complete, total } = assessmentProgress(row);
    return `<strong>${complete}/${total} assessed</strong><br><span>${yes} yes · ${no} no${unknown ? ` · ${unknown} unsure` : ''}</span>`;
  }

  function assessmentProgress(row) {
    const yes = ASSESSMENT_FIELDS.filter(([key]) => row[key] === 'Yes').length;
    const no = ASSESSMENT_FIELDS.filter(([key]) => row[key] === 'No').length;
    const unknown = ASSESSMENT_FIELDS.filter(([key]) => row[key] === "Don't know").length;
    const total = ASSESSMENT_FIELDS.length;
    return { yes, no, unknown, complete: yes + no + unknown, total };
  }

  function matchesFilters(row) {
    if (filters.decision !== 'all' && row.goNoGo !== filters.decision) return false;
    if (filters.priority !== 'all' && row.priority !== filters.priority) return false;
    if (filters.donorType !== 'all' && row.donorType !== filters.donorType) return false;
    const progress = assessmentProgress(row);
    if (filters.assessment === 'complete' && progress.complete !== progress.total) return false;
    if (filters.assessment === 'needs-research' && !(progress.complete > 0 && progress.complete < progress.total)) return false;
    if (filters.assessment === 'not-started' && progress.complete !== 0) return false;
    return true;
  }

  function filterField(key, label, options) {
    return `<label class="filter-field" for="filter-${esc(key)}"><span>${esc(label)}</span><select id="filter-${esc(key)}" data-filter="${esc(key)}" aria-controls="donor-table">${options.map(([value, optionLabel]) => `<option value="${esc(value)}" ${filters[key] === value ? 'selected' : ''}>${esc(optionLabel)}</option>`).join('')}</select></label>`;
  }

  function filtersHtml() {
    return `<section class="filter-panel" aria-label="Donor filters">
      <div class="filter-title"><p>FILTER DONORS</p><strong>View the right opportunities</strong><span>Use the dropdowns to focus the donor list.</span></div>
      <fieldset><legend>Filter donor list</legend><div class="filter-row">
        ${filterField('decision', 'Decision', [['all', 'All decisions'], ['Go', 'Go'], ['No go', 'No go'], ['', 'Not decided']])}
        ${filterField('priority', 'Priority', [['all', 'All priorities'], ['High', 'High priority'], ['Medium', 'Medium priority'], ['Low', 'Low priority'], ['', 'Not prioritised']])}
        ${filterField('donorType', 'Donor type', [['all', 'All donor types'], ...SELECT_OPTIONS.type.slice(1).map(value => [value, value])] )}
        ${filterField('assessment', 'Assessment', [['all', 'All assessment progress'], ['complete', 'Fully assessed'], ['needs-research', 'Needs research'], ['not-started', 'Not started']])}
        <button type="button" class="clear-filters" data-action="clear-filters">Clear filters</button>
      </div></fieldset>
    </section>`;
  }

  function tabsHtml() {
    return TABS.map(([id, label]) => `<button type="button" data-tab="${id}" class="${tab === id ? 'active' : ''}" aria-current="${tab === id ? 'page' : 'false'}">${label}</button>`).join('');
  }

  function matrix() {
    const goCount = state.donors.filter(row => row.goNoGo === 'Go').length;
    const noGoCount = state.donors.filter(row => row.goNoGo === 'No go').length;
    const highPriority = state.donors.filter(row => row.priority === 'High').length;
    const needsResearch = state.donors.filter(row => assessmentProgress(row).complete < ASSESSMENT_FIELDS.length).length;
    const filteredDonors = state.donors.filter(matchesFilters);
    const columnHeaders = [...GENERAL.map(field => field[1]), ...ASSESSMENT_FIELDS.map(field => field[1])];
    const headers = columnHeaders.map((label, index) => `<th scope="col" class="${index < 4 ? `sticky-${index + 1}` : ''} ${index >= GENERAL.length ? 'assessment-heading' : ''}">${esc(label)}</th>`).join('');
    const rows = filteredDonors.map(row => `
      <tr>
        ${GENERAL.map((field, index) => `<td class="${index < 4 ? `sticky-${index + 1}` : ''}">${fieldControl(row, field)}</td>`).join('')}
        ${ASSESSMENT_FIELDS.map(field => `<td>${fieldControl(row, field, true)}</td>`).join('')}
        <td class="summary-cell">${assessmentSummary(row)}</td>
        <td class="row-actions"><button class="danger" type="button" data-action="delete" data-row="${esc(row.id)}" aria-label="Delete ${esc(row.donor || 'donor row')}">Delete</button></td>
      </tr>`).join('');

    return `
      <section class="workspace-summary">
        <div>
          <p class="eyebrow">Funding workspace</p>
          <h2>Donor Mapping</h2>
          <p>Assess donor fit, keep research visible and make clearer go/no-go decisions.</p>
        </div>
        <span>${state.donors.length} donor${state.donors.length === 1 ? '' : 's'} mapped</span>
      </section>

      <section class="metric-strip" aria-label="Donor mapping summary">
        <div class="card metric"><small>Donors mapped</small><strong>${state.donors.length}</strong></div>
        <div class="card metric"><small>Go</small><strong>${goCount}</strong></div>
        <div class="card metric"><small>No go</small><strong>${noGoCount}</strong></div>
        <div class="card metric"><small>High priority</small><strong>${highPriority}</strong></div>
        <div class="card metric"><small>Needs research</small><strong>${needsResearch}</strong></div>
      </section>

      ${filtersHtml()}

      <details class="mapping-details">
        <summary>Mapping details</summary>
        <p class="muted">These details are included in your browser backup and CSV exports.</p>
        <form id="meta-form" class="form-grid">
          ${metaField('organisation', 'Organisation')}
          ${metaField('period', 'Mapping period / cycle')}
          ${metaField('preparedBy', 'Prepared by')}
          ${metaField('notes', 'Mapping notes', 'textarea')}
        </form>
      </details>

      <section class="list-panel">
        <div class="list-heading">
          <div>
            <p class="eyebrow">Donor list</p>
            <h3>Mapped donors</h3>
            <p class="muted">Scroll horizontally to complete the full Annex 2 strategy, likelihood, technical, capacity and risk assessment.</p>
          </div>
          <div class="list-actions"><span class="results-count" role="status" aria-live="polite">Showing ${filteredDonors.length} of ${state.donors.length}</span><button type="button" data-action="add">Add donor</button></div>
        </div>
        <p class="example-note"><strong>Example records are included.</strong> Edit or delete them, then add your own donor research. The examples contain public, illustrative information only.</p>
        ${state.donors.length && filteredDonors.length ? `<div class="table-wrap">
          <table id="donor-table">
            <caption>Donor assessment matrix — showing ${filteredDonors.length} of ${state.donors.length} mapped donors</caption>
            <thead>
              <tr class="group-row">
                <th scope="colgroup" colspan="${GENERAL.length}" class="group-general">General information</th>
                ${GROUPS.map(group => `<th scope="colgroup" colspan="${group.fields.length}" class="${group.className}">${esc(group.label)}</th>`).join('')}
                <th rowspan="2" class="group-general">Assessment</th>
                <th rowspan="2" class="group-general">Actions</th>
              </tr>
              <tr class="column-row">${headers}</tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>` : state.donors.length ? `<div class="zero-results"><h3>No donors match these filters</h3><p>Clear the filters to see all mapped donors, or add another donor.</p><div class="actions"><button type="button" class="light" data-action="clear-filters">Clear filters</button><button type="button" data-action="add">Add donor</button></div></div>` : `<div class="empty"><h3>Your donor map is ready to start</h3><p>Add a donor to begin the go/no-go assessment.</p><button type="button" data-action="add">Add first donor</button></div>`}
      </section>`;
  }

  function metaField(key, label, type = 'text') {
    const value = state.meta[key] || '';
    return `<label>${esc(label)}${type === 'textarea'
      ? `<textarea name="${key}">${esc(value)}</textarea>`
      : `<input name="${key}" value="${esc(value)}">`
    }</label>`;
  }

  function guide() {
    return `
      <div class="toolbar"><div><h2>Assessment guide</h2><p class="intro">Use the same question structure for every donor so that decisions are consistent and easy to review.</p></div><button type="button" data-action="add">Add donor</button></div>
      <section class="callout"><strong>Keep the decision human.</strong> The matrix records evidence and gaps. It does not calculate a go/no-go decision for you; use team judgement, due diligence and the donor’s published requirements.</section>
      <section class="guide-grid">
        ${GROUPS.map(group => `<article class="card"><h3>${esc(group.label)}</h3><ul>${group.fields.map(([, label, help]) => `<li><strong>${esc(label)}:</strong> ${esc(help)}</li>`).join('')}</ul></article>`).join('')}
      </section>
      <section class="panel assessment-key">
        <div><h4>Yes</h4><p>There is evidence that the condition is met.</p></div>
        <div><h4>No</h4><p>The condition is not met or presents a material issue.</p></div>
        <div><h4>Don't know</h4><p>Research or internal discussion is still needed before a decision.</p></div>
      </section>`;
  }

  function backup() {
    return `
      <div class="toolbar"><div><h2>Backup &amp; restore</h2><p class="intro">Your data is private to this browser. Save a JSON backup before changing browser, device or account.</p></div></div>
      <section class="backup-grid">
        <article class="panel"><h3>Export a full backup</h3><p>Downloads all mapping details and assessments as a JSON file. Use it to restore your working copy later.</p><button type="button" data-action="download-backup">Export data backup</button></article>
        <article class="panel"><h3>Export a spreadsheet view</h3><p>Downloads every donor field as a CSV file that can open in Excel, Google Sheets or another system.</p><button type="button" class="light" data-action="download-csv">Download CSV</button></article>
        <article class="panel"><h3>Restore a backup</h3><p>Choose a Donor Mapping JSON backup. Restoring replaces the current data in this browser.</p><label class="button light">Choose JSON backup<input id="import-file" type="file" accept=".json,application/json" hidden></label></article>
        <article class="panel"><h3>Start a blank donor map</h3><p>Clears all donor rows and mapping details from this browser. Export a backup first if you may need them again.</p><button type="button" class="danger" data-action="clear">Clear this donor map</button></article>
      </section>`;
  }

  function render() {
    $('#tabs').innerHTML = tabsHtml();
    $('#app').innerHTML = tab === 'matrix' ? matrix() : tab === 'guide' ? guide() : backup();
  }

  function updateMeta(form) {
    const values = new FormData(form);
    state.meta = {
      organisation: String(values.get('organisation') || ''),
      period: String(values.get('period') || ''),
      preparedBy: String(values.get('preparedBy') || ''),
      notes: String(values.get('notes') || '')
    };
    save();
  }

  function updateRow(target) {
    const row = state.donors.find(item => item.id === target.dataset.row);
    if (!row || !Object.prototype.hasOwnProperty.call(row, target.dataset.field)) return;
    row[target.dataset.field] = target.value;
    save();
    if (target.dataset.field === 'goNoGo') {
      target.classList.toggle('status-go', target.value === 'Go');
      target.classList.toggle('status-no-go', target.value === 'No go');
    }
    if (ASSESSMENT_FIELDS.some(([key]) => key === target.dataset.field)) {
      const summary = target.closest('tr')?.querySelector('.summary-cell');
      if (summary) summary.innerHTML = assessmentSummary(row);
    }
  }

  function download(name, content, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function exportBackup() {
    download(`${safeFileName()}-donor-mapping-backup.json`, JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2), 'application/json');
  }

  function csvCell(value) {
    let content = String(value ?? '');
    if (/^[=+@\- \t\r]/.test(content)) content = `'${content}`;
    return `"${content.replaceAll('"', '""')}"`;
  }

  function exportCsv() {
    const headers = ALL_FIELDS.map(([, label]) => label);
    const rows = state.donors.map(row => ALL_FIELDS.map(([key]) => row[key] || ''));
    const content = '\ufeff' + [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
    download(`${safeFileName()}-donor-mapping.csv`, content, 'text/csv;charset=utf-8');
  }

  document.addEventListener('click', event => {
    const tabButton = event.target.closest('[data-tab]');
    if (tabButton) {
      tab = tabButton.dataset.tab;
      render();
      return;
    }
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    if (action === 'add') {
      state.donors.push(blankDonor());
      filters = { decision: 'all', priority: 'all', donorType: 'all', assessment: 'all' };
      save();
      tab = 'matrix';
      render();
      const input = $('.table-wrap tbody tr:last-child input, .table-wrap tbody tr:last-child select');
      input?.focus();
    }
    if (action === 'delete') {
      const row = state.donors.find(item => item.id === button.dataset.row);
      if (!confirm(`Delete ${row?.donor || 'this donor row'}?`)) return;
      state.donors = state.donors.filter(item => item.id !== button.dataset.row);
      save();
      render();
    }
    if (action === 'download-backup') exportBackup();
    if (action === 'download-csv') exportCsv();
    if (action === 'clear-filters') {
      filters = { decision: 'all', priority: 'all', donorType: 'all', assessment: 'all' };
      render();
    }
    if (action === 'clear') {
      if (!confirm('Clear every donor row and mapping detail from this browser?')) return;
      state = blankState();
      save();
      tab = 'matrix';
      render();
    }
  });

  document.addEventListener('input', event => {
    const target = event.target;
    if (target.closest('#meta-form')) updateMeta(target.closest('#meta-form'));
    if (target.dataset.row) updateRow(target);
  });

  document.addEventListener('change', async event => {
    const target = event.target;
    if (target.dataset.filter) {
      filters[target.dataset.filter] = target.value;
      render();
      return;
    }
    if (target.dataset.row) {
      updateRow(target);
      if (['goNoGo', 'priority', 'donorType'].includes(target.dataset.field) || ASSESSMENT_FIELDS.some(([key]) => key === target.dataset.field)) render();
    }
    if (target.id !== 'import-file') return;
    const file = target.files?.[0];
    if (!file) return;
    try {
      const imported = normaliseState(JSON.parse(await file.text()));
      if (!confirm('Replace the current Donor Mapping data in this browser?')) return;
      state = { ...imported, version: CURRENT_VERSION };
      save();
      tab = 'matrix';
      render();
    } catch (error) {
      alert(`Import failed: ${error.message}`);
      target.value = '';
    }
  });

  $('#download-csv').addEventListener('click', exportCsv);
  $('#download-backup').addEventListener('click', exportBackup);
  save();
  render();
})();
