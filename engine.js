/* RetireReady engine - pure appliance-age + repair-vs-replace math, shared by app.html and node tests. */
(function(root, factory){
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RetireReadyEngine = factory();
})(typeof self !== 'undefined' ? self : this, function(){

  var YEAR = 365.25 * 86400000;

  var LIFESPANS = {
    'Dishwasher': 10, 'Washer': 11, 'Dryer': 13, 'Fridge': 13,
    'Oven / range': 15, 'HVAC': 15, 'Water heater': 10, 'Microwave': 9
  };

  function ageYears(purchMs, nowMs){
    return Math.max(0, (nowMs - purchMs) / YEAR);
  }

  function lifePct(ageY, lifespanY){
    return ageY / lifespanY;
  }

  /* young (<50% of life) | midlife (50-80) | senior (80-100) | overtime (>100) */
  function status(ageY, lifespanY){
    var p = lifePct(ageY, lifespanY);
    if (p >= 1) return {key:'overtime', label:'living on borrowed time', pct:p};
    if (p >= 0.8) return {key:'senior', label:'senior', pct:p};
    if (p >= 0.5) return {key:'midlife', label:'midlife', pct:p};
    return {key:'young', label:'young', pct:p};
  }

  /* the 50% rule, with age pressure:
     repair when the fix is at most half the replacement AND the unit has life left */
  function verdict(agePct, repairCost, replaceCost){
    if (!(repairCost > 0) || !(replaceCost > 0)) return null;
    var c = repairCost / replaceCost;
    if (c >= 1) return {key:'replace', reason:'the repair costs as much as a new unit'};
    if (c <= 0.5 && agePct <= 0.75) return {key:'repair', reason:'cheap fix on a unit with life left'};
    if (c > 0.5 && agePct > 0.5) return {key:'replace', reason:'expensive fix on an aging unit'};
    if (c <= 0.5) return {key:'replace', reason:'cheap fix, but the unit is nearly done - save it for the replacement fund'};
    return {key:'borderline', reason:'mid-price fix on a midlife unit - get a second quote'};
  }

  function fmtAge(ageY){
    if (ageY < 1) return Math.round(ageY * 12) + ' mo';
    var y = Math.floor(ageY), m = Math.round((ageY - y) * 12);
    return y + 'y' + (m ? ' ' + m + 'm' : '');
  }

  function money(n){
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  return {YEAR:YEAR, LIFESPANS:LIFESPANS, ageYears:ageYears, lifePct:lifePct, status:status, verdict:verdict, fmtAge:fmtAge, money:money};
});
