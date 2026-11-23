// Christmas gift budget: pure functions, amounts in cents (integers).
(function(root){
function allocate(totalCents, weights, stepCents){
  // Split totalCents across weights in multiples of stepCents (largest remainder, ties to earlier line).
  // Leftover below one step is returned, never assigned.
  var step = stepCents>0?stepCents:100, n=weights.length, out=new Array(n).fill(0);
  var W=0; for(var i=0;i<n;i++){ if(weights[i]>0) W+=weights[i]; }
  if(W<=0||totalCents<=0) return {amounts:out, leftover:Math.max(0,totalCents)};
  var units=Math.floor(totalCents/step), base=[], rem=[], used=0;
  for(i=0;i<n;i++){ var w=weights[i]>0?weights[i]:0; var q=Math.floor(units*w/W); base.push(q); used+=q; rem.push({i:i,r:units*w-q*W}); }
  rem.sort(function(a,b){return b.r-a.r||a.i-b.i;});
  var extra=units-used; for(i=0;i<extra;i++){ base[rem[i].i]++; }
  for(i=0;i<n;i++) out[i]=base[i]*step;
  return {amounts:out, leftover:totalCents-units*step};
}
function dayNum(iso){ var p=iso.split('-'); return Date.UTC(+p[0],+p[1]-1,+p[2])/86400000; }
function summary(lines, budgetCents, savedCents, todayISO, byISO){
  // lines: [{planned, spent}] in cents.
  var planned=0, spent=0, still=0, over=[], i;
  for(i=0;i<lines.length;i++){ planned+=lines[i].planned; spent+=lines[i].spent; if(lines[i].spent>lines[i].planned) over.push(i); else still+=lines[i].planned-lines[i].spent; }
  var days=dayNum(byISO)-dayNum(todayISO), weeks=days>0?Math.ceil(days/7):0;
  var toFund=Math.max(0, still-savedCents);
  var perWeek=weeks>0?Math.ceil(toFund/weeks):toFund;
  return {planned:planned, spent:spent, leftToSpend:still, unallocated:budgetCents>0?budgetCents-planned:null,
          days:days, weeks:weeks, toFund:toFund, perWeek:perWeek, over:over};
}
var api={allocate:allocate, summary:summary, dayNum:dayNum};
if(typeof module!=='undefined') module.exports=api; else root.XB=api;
})(this);
