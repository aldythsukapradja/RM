/**
 * RMO WorldCup2026 — Google Apps Script v3 Dynamic KO
 * ------------------------------------------------------------------
 * Changes from v2:
 *   1. Dynamic KO teams: Matches!C labels like "RSA vs CAN" are parsed into
 *      official.matches[id].a / .b so the frontend never needs hardcoded R32 teams.
 *   2. Best-third slots are resolved server-side after all groups complete.
 *
 * Changes from v1:
 *   1. New "Matches" tab — pre-populated with all 104 fixtures on first run.
 *      You edit scores + status directly in this tab. The app reads it on sync.
 *   2. getState() now returns data.matches — a flat array the frontend merges
 *      into official.groupScores (G-prefix) and official.matches (M-prefix).
 *   3. Column spec: A=matchId, B=date, C=teams label, D=homeScore, E=awayScore,
 *      F=status (draft/published), G=winner (KO only), H=ending (KO only:
 *      normal / extra / penalties — needed for penalty bonuses).
 *
 * Workflow to enter a result:
 *   1. Open the Matches tab in your Sheet.
 *   2. Find the row by matchId (G0–G47 for group, M73–M104 for KO).
 *   3. Enter D (home score) and E (away score).
 *   4. For KO matches, enter G (winner team code, e.g. ESP).
 *   5. For KO matches decided by penalties, enter H as penalties.
 *   6. Change F to "published".
 *   7. App picks it up on next sync — no admin login needed.
 *
 * Deploy: Deploy → Manage deployments → Edit → Version: New → Deploy.
 * The /exec URL stays the same across re-deployments.
 * ------------------------------------------------------------------
 */

const SHEET_ID = '1nc78jzC98RG3EjbD8s1vaGNdo-iKMBaxn7k--OthSog';

// ── All 104 fixtures for pre-populating the Matches tab ─────────────────────
// Group fixtures: [matchId, date, homeCode, awayCode]
const GF_SEED = [
  ['G0','11 Jun','MEX','RSA'],['G1','12 Jun','KOR','CZE'],
  ['G2','18 Jun','CZE','RSA'],['G3','19 Jun','MEX','KOR'],
  ['G4','25 Jun','CZE','MEX'],['G5','25 Jun','RSA','KOR'],
  ['G6','12 Jun','CAN','BIH'],['G7','13 Jun','QAT','SUI'],
  ['G8','18 Jun','SUI','BIH'],['G9','19 Jun','CAN','QAT'],
  ['G10','24 Jun','SUI','CAN'],['G11','24 Jun','BIH','QAT'],
  ['G12','14 Jun','BRA','MAR'],['G13','14 Jun','HAI','SCO'],
  ['G14','20 Jun','SCO','MAR'],['G15','20 Jun','BRA','HAI'],
  ['G16','25 Jun','SCO','BRA'],['G17','25 Jun','MAR','HAI'],
  ['G18','13 Jun','USA','PAR'],['G19','13 Jun','AUS','TUR'],
  ['G20','19 Jun','USA','AUS'],['G21','20 Jun','TUR','PAR'],
  ['G22','26 Jun','TUR','USA'],['G23','26 Jun','PAR','AUS'],
  ['G24','14 Jun','GER','CUW'],['G25','15 Jun','CIV','ECU'],
  ['G26','20 Jun','GER','CIV'],['G27','21 Jun','ECU','CUW'],
  ['G28','25 Jun','CUW','CIV'],['G29','25 Jun','ECU','GER'],
  ['G30','14 Jun','NED','JPN'],['G31','15 Jun','SWE','TUN'],
  ['G32','20 Jun','NED','SWE'],['G33','20 Jun','TUN','JPN'],
  ['G34','26 Jun','JPN','SWE'],['G35','26 Jun','TUN','NED'],
  ['G36','15 Jun','BEL','EGY'],['G37','16 Jun','IRN','NZL'],
  ['G38','21 Jun','BEL','IRN'],['G39','22 Jun','NZL','EGY'],
  ['G40','27 Jun','EGY','IRN'],['G41','27 Jun','NZL','BEL'],
  ['G42','15 Jun','ESP','CPV'],['G43','16 Jun','KSA','URU'],
  ['G44','21 Jun','ESP','KSA'],['G45','22 Jun','URU','CPV'],
  ['G46','27 Jun','CPV','KSA'],['G47','27 Jun','URU','ESP'],
  ['G48','16 Jun','FRA','SEN'],['G49','17 Jun','IRQ','NOR'],
  ['G50','23 Jun','FRA','IRQ'],['G51','23 Jun','NOR','SEN'],
  ['G52','26 Jun','NOR','FRA'],['G53','26 Jun','SEN','IRQ'],
  ['G54','17 Jun','ARG','ALG'],['G55','16 Jun','AUT','JOR'],
  ['G56','22 Jun','ARG','AUT'],['G57','23 Jun','JOR','ALG'],
  ['G58','28 Jun','JOR','ARG'],['G59','28 Jun','ALG','AUT'],
  ['G60','17 Jun','POR','COD'],['G61','18 Jun','UZB','COL'],
  ['G62','23 Jun','POR','UZB'],['G63','24 Jun','COL','COD'],
  ['G64','28 Jun','COL','POR'],['G65','28 Jun','COD','UZB'],
  ['G66','17 Jun','ENG','CRO'],['G67','18 Jun','GHA','PAN'],
  ['G68','23 Jun','ENG','GHA'],['G69','24 Jun','PAN','CRO'],
  ['G70','28 Jun','PAN','ENG'],['G71','28 Jun','CRO','GHA']
];

// Knockout fixtures: [matchId, date, label]
const KF_SEED = [
  ['M73','28 Jun','R32 Match 73'],['M74','29 Jun','R32 Match 74'],
  ['M75','30 Jun','R32 Match 75'],['M76','29 Jun','R32 Match 76'],
  ['M77','01 Jul','R32 Match 77'],['M78','30 Jun','R32 Match 78'],
  ['M79','01 Jul','R32 Match 79'],['M80','01 Jul','R32 Match 80'],
  ['M81','02 Jul','R32 Match 81'],['M82','01 Jul','R32 Match 82'],
  ['M83','03 Jul','R32 Match 83'],['M84','02 Jul','R32 Match 84'],
  ['M85','03 Jul','R32 Match 85'],['M86','04 Jul','R32 Match 86'],
  ['M87','04 Jul','R32 Match 87'],['M88','03 Jul','R32 Match 88'],
  ['M89','05 Jul','R16 Match 89'],['M90','04 Jul','R16 Match 90'],
  ['M91','05 Jul','R16 Match 91'],['M92','06 Jul','R16 Match 92'],
  ['M93','06 Jul','R16 Match 93'],['M94','07 Jul','R16 Match 94'],
  ['M95','07 Jul','R16 Match 95'],['M96','07 Jul','R16 Match 96'],
  ['M97','09 Jul','QF Match 97'], ['M98','10 Jul','QF Match 98'],
  ['M99','12 Jul','QF Match 99'], ['M100','12 Jul','QF Match 100'],
  ['M101','14 Jul','SF Match 101'],['M102','15 Jul','SF Match 102'],
  ['M104','19 Jul','THE FINAL']
];

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const action = body.action || '';
    const ss = SpreadsheetApp.openById(SHEET_ID);
    ensureSheets_(ss);

    let result;
    if      (action === 'login')        result = login_(ss, body);
    else if (action === 'savePrediction') result = savePrediction_(ss, body);
    else if (action === 'saveKnockoutPrediction') result = saveKnockoutPrediction_(ss, body);
    else if (action === 'getState')     result = getState_(ss);
    else if (action === 'saveOfficial') result = saveOfficial_(ss, body);
    else if (action === 'logChat')      result = logChat_(ss, body);
    else throw new Error('Unknown action: ' + action);

    return json_({ ok: true, engineVersion: ENGINE_VERSION, ...result });
  } catch (err) {
    return json_({ ok: false, error: err.message || String(err) });
  }
}

/* Version stamp so you can confirm which code is live. After deploying, run
   forceRecompute() (or open the app) and check the Leaderboard 'LastUpdated'
   timestamp changes. The version is also returned in every getState response. */
const ENGINE_VERSION = 'v8-overall-plus-knockout-2026-06-27';

/* ── RUN THIS FROM THE EDITOR to recompute the leaderboard on demand ──
   Select 'forceRecompute' in the function dropdown, click Run. It re-reads
   the Matches tab, resolves groups, scores everyone, and rewrites the
   Leaderboard tab. Use it to verify the engine works without opening the app.
   Check the execution log for a summary. */
function forceRecompute() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  ensureSheets_(ss);
  const state = getState_(ss);
  const o = state.official || {};
  const groupsDone = Object.keys(o.groups || {}).length;
  const published = Object.values(o.groupScores || {}).filter(g => g && g.status === 'published').length;
  Logger.log('Engine ' + ENGINE_VERSION + ' recompute complete.');
  Logger.log('Published group matches: ' + published + ' / 72');
  Logger.log('Groups fully resolved: ' + groupsDone + ' / 12');
  Logger.log('groupsPublished (all 12): ' + (o.groupsPublished === true));
  Logger.log('Thirds auto-selected: ' + JSON.stringify(o.thirds || []));
  Logger.log('Leaderboard tab rewritten with current timestamp.');
  return 'Recompute done — version ' + ENGINE_VERSION;
}

// ── Sheet setup ──────────────────────────────────────────────────────────────

function ensureSheets_(ss) {
  const specs = [
    ['Users',      ['name','password','createdAt','lastLoginAt']],
    ['Predictions',['name','predictionJson','updatedAt']],
    ['KnockoutPredictions',['name','predictionJson','submittedAt','updatedAt']],
    ['State',      ['key','jsonValue','updatedAt']],
    ['ChatLog',    ['timestamp','sessionId','username','role','intent','message']],
    ['Matches',    ['matchId','date','teams','homeScore','awayScore','status','winner','ending']]
  ];
  specs.forEach(([name, headers]) => {
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    if (sh.getLastRow() === 0) sh.appendRow(headers);
  });
  // Pre-populate Matches tab if it only has the header row
  const msh = ss.getSheetByName('Matches');
  if (msh.getLastRow() <= 1) populateMatchesTab_(msh);
  applyMatchesValidation_(msh);
  // Remove legacy mirror tabs — Matches is now the single results source
  cleanupLegacyTabs_(ss);
}

/* Delete the old Groups / Thirds / Knockouts mirror tabs if they still exist.
   Everything now lives in Matches (input) + Leaderboard (output). */
function cleanupLegacyTabs_(ss) {
  ['Groups', 'Thirds', 'Knockouts'].forEach(name => {
    const sh = ss.getSheetByName(name);
    if (sh) { try { ss.deleteSheet(sh); } catch (e) {} }
  });
}

function populateMatchesTab_(sh) {
  const rows = [];
  // Group matches — home vs away label from codes
  GF_SEED.forEach(f => {
    rows.push([f[0], f[1], f[2]+' vs '+f[3], '', '', 'draft', '', '']);
  });
  // Knockout matches — teams TBD until bracket resolves
  KF_SEED.forEach(f => {
    rows.push([f[0], f[1], f[2], '', '', 'draft', '', '']);
  });
  if (rows.length) sh.getRange(2, 1, rows.length, 8).setValues(rows);
  // Format: freeze header, bold header, set column widths
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, 8).setFontWeight('bold');
  sh.setColumnWidth(1, 80);   // matchId
  sh.setColumnWidth(2, 70);   // date
  sh.setColumnWidth(3, 140);  // teams
  sh.setColumnWidth(4, 90);   // homeScore
  sh.setColumnWidth(5, 90);   // awayScore
  sh.setColumnWidth(6, 100);  // status
  sh.setColumnWidth(7, 80);   // winner
  sh.setColumnWidth(8, 100);  // ending
  // Dropdown validation for status column (F)
  applyMatchesValidation_(sh);
}

function applyMatchesValidation_(sh) {
  const last = sh.getLastRow();
  if (last <= 1) return;
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['draft','published'], true).build();
  sh.getRange(2, 6, last - 1, 1).setDataValidation(statusRule);
  // Dropdown validation for ending column (H) — knockout rows use this for penalty bonuses
  const endingRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['normal','extra','penalties'], true).build();
  sh.getRange(2, 8, last - 1, 1).setDataValidation(endingRule);
}

// ── LOGIN ────────────────────────────────────────────────────────────────────

function login_(ss, body) {
  const name     = String(body.name     || '').trim();
  const password = String(body.password || '');
  if (!name || !password) throw new Error('Name and password are required.');

  const sh     = ss.getSheetByName('Users');
  const values = sh.getDataRange().getValues();
  let foundRow = -1;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]).toLowerCase() === name.toLowerCase()) {
      foundRow = i + 1;
      if (String(values[i][1]) !== password) throw new Error('Wrong password for that name.');
      break;
    }
  }

  const now = new Date().toISOString();
  if (foundRow === -1) {
    sh.appendRow([name, password, now, now]);
  } else {
    sh.getRange(foundRow, 4).setValue(now);
  }

  const state = getState_(ss);
  return {
    prediction: state.preds[name] || null,
    koPrediction: state.koPreds[name] || null,
    preds: state.preds,
    koPreds: state.koPreds,
    official: state.official
  };
}

// ── SAVE PREDICTION ──────────────────────────────────────────────────────────

function savePrediction_(ss, body) {
  const name       = String(body.name     || '').trim();
  const password   = String(body.password || '');
  const prediction = body.prediction;
  if (!name || !password || !prediction) throw new Error('Missing prediction payload.');

  validateUser_(ss, name, password);
  const sh     = ss.getSheetByName('Predictions');
  const values = sh.getDataRange().getValues();
  const now    = new Date().toISOString();
  prediction.submittedAt = now;
  prediction.updatedAt = now;
  const json   = JSON.stringify(prediction);
  let foundRow = -1;

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]).toLowerCase() === name.toLowerCase()) { foundRow = i + 1; break; }
  }

  if (foundRow === -1) sh.appendRow([name, json, now]);
  else sh.getRange(foundRow, 1, 1, 3).setValues([[name, json, now]]);

  const state = getState_(ss);
  return { preds: state.preds, koPreds: state.koPreds, official: state.official };
}

function saveKnockoutPrediction_(ss, body) {
  const name       = String(body.name     || '').trim();
  const password   = String(body.password || '');
  const prediction = body.prediction;
  if (!name || !password || !prediction) throw new Error('Missing knockout prediction payload.');

  validateUser_(ss, name, password);
  const sh     = ss.getSheetByName('KnockoutPredictions');
  const values = sh.getDataRange().getValues();
  const now    = new Date().toISOString();
  prediction.submittedAt = now;
  prediction.updatedAt = now;
  const json   = JSON.stringify(prediction);
  let foundRow = -1;

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]).toLowerCase() === name.toLowerCase()) { foundRow = i + 1; break; }
  }

  if (foundRow === -1) sh.appendRow([name, json, now, now]);
  else sh.getRange(foundRow, 1, 1, 4).setValues([[name, json, now, now]]);

  const state = getState_(ss);
  return { preds: state.preds, koPreds: state.koPreds, official: state.official };
}

// ── SAVE OFFICIAL ────────────────────────────────────────────────────────────

function saveOfficial_(ss, body) {
  const key   = String(body.key || 'official');
  const value = body.value;
  upsertState_(ss, key, value);
  return getState_(ss);
}

// ── GET STATE ────────────────────────────────────────────────────────────────
// Returns: { preds, official, oracle, matches[] }
// matches[] is consumed by the frontend to populate live scores without
// needing the admin to use the in-app UI.

function getState_(ss) {
  // Predictions
  const preds   = {};
  const predSh  = ss.getSheetByName('Predictions');
  const predRows = predSh.getDataRange().getValues();
  for (let i = 1; i < predRows.length; i++) {
    const name = String(predRows[i][0] || '').trim();
    const json = String(predRows[i][1] || '').trim();
    if (!name || !json) continue;
    try { preds[name] = JSON.parse(json); } catch (e) {}
  }

  // Knockout-only predictions
  const koPreds = {};
  const koPredSh = ss.getSheetByName('KnockoutPredictions');
  const koPredRows = koPredSh.getDataRange().getValues();
  for (let i = 1; i < koPredRows.length; i++) {
    const name = String(koPredRows[i][0] || '').trim();
    const json = String(koPredRows[i][1] || '').trim();
    if (!name || !json) continue;
    try { koPreds[name] = JSON.parse(json); } catch (e) {}
  }

  // State blob (official, oracle)
  const stateMap  = {};
  const stateRows = ss.getSheetByName('State').getDataRange().getValues();
  for (let i = 1; i < stateRows.length; i++) {
    const key  = String(stateRows[i][0] || '').trim();
    const json = String(stateRows[i][1] || '').trim();
    if (!key || !json) continue;
    try { stateMap[key] = JSON.parse(json); } catch (e) {}
  }

  // Live matches from the editable Matches tab
  const matches = [];
  const msh     = ss.getSheetByName('Matches');
  if (msh) {
    const mRows = msh.getDataRange().getValues();
    for (let i = 1; i < mRows.length; i++) {
      const [matchId, date, teams, homeScore, awayScore, status, winner, ending] = mRows[i];
      if (!matchId) continue;
      const hasHome = homeScore !== '' && homeScore !== null;
      const hasAway = awayScore !== '' && awayScore !== null;
      const rawStatus = String(status || '').trim();
      // If both scores are entered, treat blank/draft/upcoming rows as published.
      // This makes copy-pasted score tables work without manually editing column F.
      const inferredStatus = (hasHome && hasAway && (!rawStatus || /^draft$/i.test(rawStatus) || /^upcoming$/i.test(rawStatus))) ? 'published' : (rawStatus || 'draft');
      const row = {
        matchId: String(matchId).trim(),
        date:    String(date || ''),
        teams:   String(teams || ''),
        status:  inferredStatus
      };
      if (hasHome) row.homeScore = Number(homeScore);
      if (hasAway) row.awayScore = Number(awayScore);
      if (winner)  row.winner  = String(winner).trim();
      if (ending)  row.ending  = String(ending).trim();
      matches.push(row);
    }
  }

  // ── SERVER-SIDE MERGE: fold Matches tab into the official blob ──
  // This is the source of truth every client receives. Group rows populate
  // official.groupScores, M-rows populate official.matches, M104 the final.
  let official = stateMap.official || {
    groups: {}, thirds: [], matches: {}, final: { a: '', b: '', status: 'draft' },
    locked: false, groupsPublished: false, __v: 4
  };
  if (!official.groupScores) official.groupScores = {};
  if (!official.matches)     official.matches     = {};
  if (!official.final)       official.final       = { a: '', b: '', status: 'draft' };

  matches.forEach(row => {
    const id = row.matchId;
    if (id[0] === 'G') {
      const gs = official.groupScores[id] || {};
      if (row.homeScore != null) gs.hs = row.homeScore;
      if (row.awayScore != null) gs.as = row.awayScore;
      if (row.status)            gs.status = row.status;
      official.groupScores[id] = gs;
    } else if (id[0] === 'M') {
      const mid = id.slice(1);
      const m = official.matches[mid] || { winner: '', status: 'draft' };
      const teams = parseTeamsLabel_(row.teams);
      if (teams) { m.a = teams[0]; m.b = teams[1]; }
      if (row.homeScore != null) m.hs = row.homeScore;
      if (row.awayScore != null) m.as = row.awayScore;
      if (row.status)            m.status = row.status;
      if (row.winner)            m.winner = row.winner;
      if (row.ending)            m.ending = row.ending;
      official.matches[mid] = m;
      if (mid === '104') {
        if (row.winner)            official.final.champion = row.winner;
        if (row.homeScore != null) official.final.scoreA = row.homeScore;
        if (row.awayScore != null) official.final.scoreB = row.awayScore;
        if (row.ending)            official.final.ending = row.ending;
        if (row.status === 'published') official.final.status = 'published';
      }
    }
  });

  // ── Resolve group standings → 1st/2nd/3rd, set groupsPublished ──
  resolveGroupsIntoOfficial_(official);
  // ── Resolve KO teams from the official bracket map + any manually entered Matches labels ──
  resolveKOTeamsIntoOfficial_(official);

  // ── Set final.a / final.b from SF winners (M101, M102) ──
  if (official.matches['101'] && official.matches['101'].winner) official.final.a = official.matches['101'].winner;
  if (official.matches['102'] && official.matches['102'].winner) official.final.b = official.matches['102'].winner;

  // Persist merged official back to State so all clients stay consistent
  upsertState_(ss, 'official', official);
  // Update Matches-tab KO row labels from resolved teams (cosmetic, for scanning)
  try { resolveKOTeams_(ss, official); } catch (e) {}
  // Mirror leaderboard (single computed output tab)
  try { mirrorLeaderboard_(ss, preds, official); } catch (e) {}
  try { mirrorKnockoutLeaderboard_(ss, koPreds, official, preds); } catch (e) {}

  return {
    preds,
    koPreds,
    official,
    oracle:   stateMap.oracle || null,
    matches   // raw rows (frontend can still read them if needed)
  };
}

/* ── Group resolution: compute 1st/2nd/3rd from published group scores ──
   Mirrors the client's computeGroupStandings (pts → GD → GF). */
const GS_GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

// Derived group-team map used by the dynamic knockout resolver.
// Important: do not maintain this manually; GF_SEED is the source of truth.
const GS_GROUP_TEAMS = (function () {
  const out = {};
  GS_GROUPS.forEach(g => out[g] = []);
  GF_SEED.forEach((f, i) => {
    const g = GS_GROUPS[Math.floor(i / 6)];
    const home = String(f[2] || '').trim().toUpperCase();
    const away = String(f[3] || '').trim().toUpperCase();
    if (home && out[g].indexOf(home) < 0) out[g].push(home);
    if (away && out[g].indexOf(away) < 0) out[g].push(away);
  });
  return out;
})();

/* Resolve group standings from published Matches scores.
   GF_SEED rows are [matchId, date, home, away] — home=f[2], away=f[3].
   Groups are 6 fixtures each in seed order (A=G0..G5, B=G6..G11, ...).
   Each group resolves INDEPENDENTLY the moment its 6 matches are published,
   so leaderboard points flow as soon as a group completes (not all-12 gated).
   When ALL 12 groups are done, the best-8 third-placed teams are auto-selected. */
function resolveGroupsIntoOfficial_(official) {
  const groupOf = {};
  GF_SEED.forEach((f, i) => { groupOf['G' + i] = GS_GROUPS[Math.floor(i / 6)]; });

  const thirdStandings = {};  // group -> the 3rd-placed team's stats (for best-8 ranking)
  let completedGroups = 0;

  GS_GROUPS.forEach(g => {
    const tbl = {};
    let played = 0, totalInGroup = 0;
    GF_SEED.forEach((f, i) => {
      const key = 'G' + i;
      if (groupOf[key] !== g) return;
      totalInGroup++;
      const home = f[2], away = f[3];
      const gs = official.groupScores[key];
      [home, away].forEach(t => { if (t && !tbl[t]) tbl[t] = { k: t, pts: 0, gf: 0, ga: 0 }; });
      // A group match counts as soon as both scores are entered — the status
      // column is optional/informational, NOT required to be 'published'.
      if (!gs || gs.hs == null || gs.as == null) return;
      const th = tbl[home], ta = tbl[away];
      if (!th || !ta) return;
      played++;
      th.gf += gs.hs; th.ga += gs.as; ta.gf += gs.as; ta.ga += gs.hs;
      if (gs.hs > gs.as) { th.pts += 3; }
      else if (gs.as > gs.hs) { ta.pts += 3; }
      else { th.pts += 1; ta.pts += 1; }
    });

    // PROVISIONAL: set standings from whatever has been played so far. Points
    // accrue after every match and shift as the table changes; they lock when
    // the group's 6 matches are all published (complete=true).
    if (played === 0) {
      if (official.groups) delete official.groups[g];
      return;
    }
    const complete = (played === totalInGroup);
    const ranked = Object.values(tbl).sort((x, y) =>
      y.pts - x.pts || (y.gf - y.ga) - (x.gf - x.ga) || y.gf - x.gf
    );
    if (ranked[0] && ranked[1]) {
      official.groups[g] = {
        first:  ranked[0].k,
        second: ranked[1].k,
        third:  ranked[2] ? ranked[2].k : '',
        complete: complete   // KO bracket display uses this; scoring uses provisional
      };
    }
    if (complete) {
      completedGroups++;
      if (ranked[2]) thirdStandings[g] = { k: ranked[2].k, pts: ranked[2].pts, gd: ranked[2].gf - ranked[2].ga, gf: ranked[2].gf };
    }
  });

  // groupsPublished only when every group is fully complete (needed for thirds + full bracket)
  official.groupsPublished = (completedGroups === 12);

  // Auto-select best-8 third-placed teams once ALL groups are complete.
  if (completedGroups === 12) {
    const best8 = Object.values(thirdStandings)
      .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf)
      .slice(0, 8)
      .map(t => t.k);
    official.thirds = best8;
  } else {
    official.thirds = [];
  }
}

/* ── LEADERBOARD MIRROR: server-side scoring, written to Leaderboard tab ── */
const LB_WEIGHTS = { g1: 3, g2: 3, third: 2, R32: 2, R16: 3, QF: 5, SF: 8, finalist: 4, champ: 15, exact: 5, ending: 3 };
const LB_ROUND_OF = (() => {
  const r = {};
  [74,77,73,75,83,84,81,82,76,78,79,80,86,88,85,87].forEach(id => r[id] = 'R32');
  [89,90,93,94,91,92,95,96].forEach(id => r[id] = 'R16');
  [97,98,99,100].forEach(id => r[id] = 'QF');
  [101,102].forEach(id => r[id] = 'SF');
  r[104] = 'F';
  return r;
})();

function predStampMs_(p) {
  const raw = p && (p.submittedAt || p.updatedAt);
  const ms = raw ? Date.parse(raw) : NaN;
  return isNaN(ms) ? Number.MAX_SAFE_INTEGER : ms;
}

function scorePrediction_(p, official) {
  const bd = { Groups: 0, Thirds: 0, R32: 0, R16: 0, QF: 0, SF: 0, Final: 0 };
  if (!p || !official) return { total: 0, bd, champion: '' };
  // Per-group LIVE scoring: official.groups[g] holds the CURRENT PROVISIONAL
  // standings, recomputed after every match. Group points update live as each
  // result lands and may rise or fall as the table shifts, settling when the
  // group completes. (Intentional "live" feel — see build.md §5.)
  GS_GROUPS.forEach(g => {
    if (p.groups && p.groups[g] && official.groups && official.groups[g]) {
      if (p.groups[g].first === official.groups[g].first)   bd.Groups += LB_WEIGHTS.g1;
      if (p.groups[g].second === official.groups[g].second) bd.Groups += LB_WEIGHTS.g2;
    }
  });
  // Thirds: official.thirds is auto-populated only when all 12 groups complete.
  (p.thirds || []).forEach(t => { if ((official.thirds || []).includes(t)) bd.Thirds += LB_WEIGHTS.third; });
  Object.keys(official.matches || {}).forEach(id => {
    const m = official.matches[id];
    // A KO match counts as soon as a winner is entered (status optional).
    if (!m || !m.winner) return;
    if (+id === 104) return;
    const r = LB_ROUND_OF[+id];
    if (!r || r === 'F') return;
    if (p.ko && p.ko[id] === m.winner) bd[r] = (bd[r] || 0) + LB_WEIGHTS[r];
  });
  const fin = official.final;
  if (fin && fin.champion && p.final) {
    if (p.final.a && [fin.a, fin.b].includes(p.final.a)) bd.Final += LB_WEIGHTS.finalist;
    if (p.final.b && [fin.a, fin.b].includes(p.final.b)) bd.Final += LB_WEIGHTS.finalist;
    if (p.final.champion && p.final.champion === fin.champion) bd.Final += LB_WEIGHTS.champ;
    if (p.final.scoreA != null && +p.final.scoreA === +fin.scoreA && +p.final.scoreB === +fin.scoreB) bd.Final += LB_WEIGHTS.exact;
    if (p.final.ending === 'penalties' && fin.ending === 'penalties') bd.Final += LB_WEIGHTS.ending;
  }
  const total = Object.values(bd).reduce((a, b) => a + b, 0);
  return { total, bd, champion: (p.final && p.final.champion) || '' };
}

function mirrorLeaderboard_(ss, preds, official) {
  const headers = ['Rank','Name','Total','Groups','Thirds','R32','R16','QF','SF','Final','Champion','LastUpdated'];
  const sh = getOrClear_(ss, 'Leaderboard', headers);
  const now = new Date().toISOString();
  const rows = Object.keys(preds)
    .filter(n => n !== '__demo')
    .map(n => {
      const s = scorePrediction_(preds[n], official);
      return { name: n, ...s };
    })
    .sort((a, b) => b.total - a.total || predStampMs_(preds[a.name]) - predStampMs_(preds[b.name]) || a.name.localeCompare(b.name));

  const out = rows.map((r, i) => [
    i + 1, r.name, r.total,
    r.bd.Groups, r.bd.Thirds, r.bd.R32, r.bd.R16, r.bd.QF, r.bd.SF, r.bd.Final,
    r.champion, now
  ]);
  if (out.length) {
    sh.getRange(2, 1, out.length, headers.length).setValues(out);
    // Top-3 highlight (gold / silver / bronze) on the Total column
    const colors = ['#FFF3C4', '#ECEFF1', '#F5E0CE'];
    for (let i = 0; i < Math.min(3, out.length); i++) {
      sh.getRange(i + 2, 1, 1, headers.length).setBackground(colors[i]);
    }
  }
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
}

function scoreKnockoutPrediction_(p, official) {
  const bd = { R32: 0, R16: 0, QF: 0, SF: 0, Final: 0, Exact: 0, Penalty: 0 };
  if (!p || !official) return { total: 0, bd, champion: '' };
  const pm = p.matches || {};

  Object.keys(official.matches || {}).forEach(id => {
    const om = official.matches[id];
    const m = pm[id];
    if (!om || !om.winner || !m) return;
    const n = +id;
    if (n !== 104) {
      const r = LB_ROUND_OF[n];
      if (r && r !== 'F' && m.winner === om.winner) bd[r] += LB_WEIGHTS[r];
    }
    if (m.scoreA != null && m.scoreB != null && om.hs != null && om.as != null &&
        +m.scoreA === +om.hs && +m.scoreB === +om.as) {
      bd.Exact += LB_WEIGHTS.exact;
    }
    if (m.ending === 'penalties' && om.ending === 'penalties') {
      bd.Penalty += LB_WEIGHTS.ending;
    }
  });

  const fin = official.final || {};
  const fm = pm['104'];
  const realChamp = fin.champion || (official.matches && official.matches['104'] && official.matches['104'].winner) || '';
  if (fm && realChamp) {
    const realFinalists = [fin.a, fin.b].filter(Boolean);
    if (fm.a && realFinalists.indexOf(fm.a) !== -1) bd.Final += LB_WEIGHTS.finalist;
    if (fm.b && realFinalists.indexOf(fm.b) !== -1) bd.Final += LB_WEIGHTS.finalist;
    if (fm.winner === realChamp) bd.Final += LB_WEIGHTS.champ;
  }

  const total = Object.values(bd).reduce((a, b) => a + b, 0);
  return { total, bd, champion: (fm && fm.winner) || '' };
}

function mirrorKnockoutLeaderboard_(ss, koPreds, official, preds) {
  const headers = ['Rank','Name','Status','Total','R32','R16','QF','SF','Final','Exact','Penalty','Champion','SubmittedAt','LastUpdated'];
  const sh = getOrClear_(ss, 'KnockoutLeaderboard', headers);
  const now = new Date().toISOString();
  const names = {};
  Object.keys(preds || {}).forEach(n => { if (n !== '__demo') names[n] = true; });
  Object.keys(koPreds || {}).forEach(n => { if (n !== '__demo') names[n] = true; });
  const rows = Object.keys(names)
    .map(n => {
      const p = koPreds[n];
      const s = p ? scoreKnockoutPrediction_(p, official) : { total: 0, bd: { R32: 0, R16: 0, QF: 0, SF: 0, Final: 0, Exact: 0, Penalty: 0 }, champion: '' };
      return { name: n, submitted: !!p, submittedAt: p && p.submittedAt || '', ...s };
    })
    .sort((a, b) => b.total - a.total || (b.submitted ? 1 : 0) - (a.submitted ? 1 : 0) || predStampMs_(koPreds[a.name]) - predStampMs_(koPreds[b.name]) || a.name.localeCompare(b.name));

  const out = rows.map((r, i) => [
    i + 1, r.name, r.submitted ? 'Submitted' : 'Not submitted', r.total,
    r.bd.R32, r.bd.R16, r.bd.QF, r.bd.SF, r.bd.Final, r.bd.Exact, r.bd.Penalty,
    r.champion, r.submittedAt, now
  ]);
  if (out.length) {
    sh.getRange(2, 1, out.length, headers.length).setValues(out);
    const colors = ['#FFF3C4', '#ECEFF1', '#F5E0CE'];
    for (let i = 0; i < Math.min(3, out.length); i++) {
      sh.getRange(i + 2, 1, 1, headers.length).setBackground(colors[i]);
    }
  }
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
}

// ── CHAT LOG ─────────────────────────────────────────────────────────────────

function logChat_(ss, body) {
  const sh = ss.getSheetByName('ChatLog');
  sh.appendRow([
    new Date().toISOString(),
    String(body.sessionId || ''),
    String(body.username  || 'guest'),
    String(body.role      || ''),
    String(body.intent    || ''),
    String(body.message   || '').slice(0, 500)
  ]);
  return { logged: true };
}

// ── MIRROR (Groups / Thirds / Knockouts) ─────────────────────────────────────

/* KO bracket structure (mirrors the client KO map). Each match references its
   two feeder slots: 'NX' = position N (1st/2nd) of group X; {t:'Mxx'} = a best-3rd
   slot; {w:NN} = winner of match NN. Used to label Matches-tab KO rows once
   groups/results resolve, purely for human scanning in the Sheet. */
const KO_MAP = {
  73:['2A','2B'],74:['1E',{t:'M74'}],75:['1F','2C'],76:['1C','2F'],77:['1I',{t:'M77'}],78:['2E','2I'],
  79:['1A',{t:'M79'}],80:['1L',{t:'M80'}],81:['1D',{t:'M81'}],82:['1G',{t:'M82'}],83:['2K','2L'],84:['1H','2J'],
  85:['1B',{t:'M85'}],86:['1J','2H'],87:['1K',{t:'M87'}],88:['2D','2G'],
  89:[{w:74},{w:77}],90:[{w:73},{w:75}],91:[{w:76},{w:78}],92:[{w:79},{w:80}],93:[{w:83},{w:84}],94:[{w:81},{w:82}],95:[{w:86},{w:88}],96:[{w:85},{w:87}],
  97:[{w:89},{w:90}],98:[{w:93},{w:94}],99:[{w:91},{w:92}],100:[{w:95},{w:96}],101:[{w:97},{w:98}],102:[{w:99},{w:100}],104:[{w:101},{w:102}]
};


function teamCodeSet_() {
  const out = {};
  Object.keys(GS_GROUP_TEAMS).forEach(g => GS_GROUP_TEAMS[g].forEach(k => out[k] = true));
  return out;
}
const TEAM_CODE_SET = teamCodeSet_();

function parseTeamsLabel_(label) {
  const s = String(label || '').trim().toUpperCase();
  const m = s.match(/^([A-Z0-9]{2,4})\s+VS\s+([A-Z0-9]{2,4})$/);
  if (!m) return null;
  return (TEAM_CODE_SET[m[1]] && TEAM_CODE_SET[m[2]]) ? [m[1], m[2]] : null;
}

function groupOfTeam_(team) {
  for (const g in GS_GROUP_TEAMS) if (GS_GROUP_TEAMS[g].indexOf(team) >= 0) return g;
  return '';
}

function assignThirds_(thirdTeams) {
  const advGroups = thirdTeams.map(groupOfTeam_).filter(Boolean);
  const byGroup = {};
  thirdTeams.forEach(t => { const g = groupOfTeam_(t); if (g) byGroup[g] = t; });
  const slots = Object.keys(THIRD_MAP || {}), used = {}, assign = {};
  function bt(i) {
    if (i === slots.length) return true;
    const slot = slots[i];
    const options = THIRD_MAP[slot] || [];
    for (let j = 0; j < options.length; j++) {
      const g = options[j];
      if (advGroups.indexOf(g) >= 0 && !used[g]) {
        used[g] = true; assign[slot] = g;
        if (bt(i + 1)) return true;
        used[g] = false; delete assign[slot];
      }
    }
    return false;
  }
  bt(0);
  const out = {};
  Object.keys(assign).forEach(slot => out[slot] = byGroup[assign[slot]] || '');
  return out;
}

/* Resolve a KO feeder slot to an actual team code from official state. */
function resolveKOSlot_(ref, official) {
  if (typeof ref === 'string') {
    const pos = ref[0], g = ref[1];
    // KO bracket display uses FINAL group results only (complete groups),
    // so the bracket doesn't churn on provisional standings.
    if (official.groups && official.groups[g] && official.groups[g].complete) {
      return pos === '1' ? official.groups[g].first : official.groups[g].second;
    }
    return '';
  }
  if (ref && ref.t) {
    const thirds = (official.thirds || []).filter(Boolean);
    if (thirds.length === 8) return assignThirds_(thirds)[ref.t] || '';
    return '';
  }
  if (ref && ref.w) {
    const m = official.matches[String(ref.w)];
    return (m && m.winner) || '';
  }
  return '';
}


function resolveKOTeamsIntoOfficial_(official) {
  if (!official.matches) official.matches = {};
  Object.keys(KO_MAP).forEach(id => {
    const slots = KO_MAP[id];
    const m = official.matches[String(id)] || { winner: '', status: 'draft' };
    const a = m.a || resolveKOSlot_(slots[0], official);
    const b = m.b || resolveKOSlot_(slots[1], official);
    if (a && b) { m.a = a; m.b = b; }
    official.matches[String(id)] = m;
  });
}

/* Update Matches-tab Col C (teams label) for KO rows based on resolved teams.
   Only overwrites when both teams are known; otherwise leaves the placeholder. */
function resolveKOTeams_(ss, official) {
  const msh = ss.getSheetByName('Matches');
  if (!msh) return;
  const data = msh.getDataRange().getValues();
  const updates = [];
  for (let i = 1; i < data.length; i++) {
    const id = String(data[i][0] || '');
    if (id[0] !== 'M') continue;
    const num = +id.slice(1);
    const slots = KO_MAP[num];
    if (!slots) continue;
    const m = official.matches && official.matches[String(num)];
    const a = (m && m.a) || resolveKOSlot_(slots[0], official);
    const b = (m && m.b) || resolveKOSlot_(slots[1], official);
    const seed = KF_SEED.find(f => f[0] === id);
    const label = (a && b) ? a + ' vs ' + b : (seed ? seed[2] : 'Match ' + id);
    if (data[i][2] !== label) updates.push({ row: i + 1, label: label });
  }
  updates.forEach(u => msh.getRange(u.row, 3).setValue(u.label));
}

function getOrClear_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  sh.clearContents();
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  return sh;
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

function upsertState_(ss, key, value) {
  const sh     = ss.getSheetByName('State');
  const values = sh.getDataRange().getValues();
  const now    = new Date().toISOString();
  const json   = JSON.stringify(value);
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === key) {
      sh.getRange(i + 1, 1, 1, 3).setValues([[key, json, now]]);
      return;
    }
  }
  sh.appendRow([key, json, now]);
}

function validateUser_(ss, name, password) {
  const rows = ss.getSheetByName('Users').getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]).toLowerCase() === name.toLowerCase() && String(rows[i][1]) === password) return;
  }
  throw new Error('Authentication failed.');
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
