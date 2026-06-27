// RMO WC 2026 Score Seeder
// Paste into browser console while logged in as admin.
// Seeds all group results through June 27; publishes complete groups.
(function seedRMO(){
  if(!window.S||!S.user||!S.user.admin){alert('Log in as admin first!');return}
  if(!S.official.groupScores)S.official.groupScores={};

  const NEW={
    // Group A (complete)
    G2:{hs:1,as:1},G3:{hs:1,as:0},G4:{hs:0,as:3},G5:{hs:1,as:0},
    // Group B (complete)
    G8:{hs:4,as:1},G9:{hs:6,as:0},G10:{hs:2,as:1},G11:{hs:3,as:1},
    // Group C (complete)
    G14:{hs:0,as:1},G15:{hs:3,as:0},G16:{hs:0,as:3},G17:{hs:4,as:2},
    // Group D (complete)
    G20:{hs:2,as:0},G21:{hs:0,as:1},G22:{hs:3,as:2},G23:{hs:0,as:0},
    // Group E (complete)
    G26:{hs:2,as:1},G27:{hs:0,as:0},G28:{hs:0,as:2},G29:{hs:2,as:1},
    // Group F (complete)
    G32:{hs:5,as:1},G33:{hs:0,as:4},G34:{hs:1,as:1},G35:{hs:1,as:3},
    // Group G (complete)
    G38:{hs:0,as:0},G39:{hs:1,as:3},G40:{hs:1,as:1},G41:{hs:1,as:5},
    // Group H (complete — URU 2-2 CPV Jun 22)
    G44:{hs:4,as:0},G45:{hs:2,as:2},G46:{hs:0,as:0},G47:{hs:0,as:1},
    // Group I (complete)
    G50:{hs:3,as:0},G51:{hs:4,as:1},G52:{hs:1,as:4},G53:{hs:5,as:0},
    // Group J (partial — G58,G59 play Jun 28)
    G56:{hs:3,as:0},G57:{hs:1,as:2},
    // Group K (partial — G64,G65 play Jun 28)
    G60:{hs:1,as:1},G61:{hs:1,as:3},G62:{hs:5,as:0},G63:{hs:1,as:0},
    // Group L (partial — G70,G71 play Jun 28)
    G66:{hs:4,as:2},G67:{hs:1,as:0},G68:{hs:0,as:0},G69:{hs:0,as:1},
  };

  Object.keys(NEW).forEach(k=>{
    S.official.groupScores[k]=Object.assign(S.official.groupScores[k]||{},{...NEW[k],status:'published'});
  });

  // Publish all complete groups (all 6 matches scored)
  const toPublish=['A','B','C','D','E','F','G','H','I'];
  toPublish.forEach(g=>{
    if(groupComplete(g)){
      const st=computeGroupStandings(g);
      S.official.groups[g]={first:st[0].k,second:st[1].k,third:st[2].k,complete:true};
      gfIndexFor(g).forEach(i=>{const gs=S.official.groupScores['G'+i];if(gs)gs.status='published'});
      console.log(`Group ${g}: 1st=${st[0].k}  2nd=${st[1].k}  3rd=${st[2].k}`);
    } else {
      console.warn(`Group ${g} not yet complete — scores entered but not published`);
    }
  });

  S.official.groupsPublished=GROUPS.every(x=>S.official.groups[x]&&S.official.groups[x].first);
  LS.set('official',S.official);
  saveOfficialCloud();
  render();
  console.log('✅ Seeded! groupsPublished='+S.official.groupsPublished);
  console.log('Tip: Groups J/K/L finish Jun 28 — run publishGroup("J") etc. after entering those scores in the admin panel.');
})();
