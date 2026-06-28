import {D,a as nE,m as mo,O as Ov,N as Nt,V as Vo,H as Ho,T as Ta,A as Aa,t as tI,c as nI,L as Lv,X as Xc,d as Te,e as pn,S,I as IP,f as er,g as pP,w as we,h as gt$1,i as Tt,j as jn,J as J$1,P,k as wt$1,R as Re,l as we$1,o as de,q as hr,r as Ae,Q as Qs,Y as Yp,s as DP,u as gI,v as Af,U as Uo,x as mI,y as Ja,z as cy,K as KI,C as Lf,E as Of,F as Sf,G as RI,M as Uf,W as jf,Z as vI,_ as II,$ as Ff,a0 as Er,a1 as Ao,a2 as uh,a3 as dh,a4 as Et,a5 as fh,a6 as Xa,a7 as ec,a8 as wP,a9 as WI,aa as uI,ab as oI,ac as pI,ad as iI,ae as xf,af as tc,ag as Vv,ah as Qf,ai as kg,aj as Tf,ak as rI,al as bl,am as _l,an as yd}from'./main-HOVUO22W.js';import {w as wt,x as xr}from'./chunk-DM08f1J5.js';import {F,I,_}from'./chunk-B5uuohSP.js';var Ki=["*",[["mat-chip-avatar"],["","matChipAvatar",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],Wi=["*","mat-chip-avatar, [matChipAvatar]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function $i(e,o){e&1&&(Uo(0,"span",3),mI(1,1),Ja());}function Ui(e,o){e&1&&(Uo(0,"span",6),mI(1,2),Ja());}var Zi=["*"];var Xi=new S("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),Pi=new S("MatChipAvatar"),Oi=new S("MatChipTrailingIcon"),Li=new S("MatChipEdit"),zi=new S("MatChipRemove"),Hi=new S("MatChip"),Gi=(()=>{class e{_elementRef=D(er);_parentChip=D(Hi);_isPrimary=true;_isLeading=false;get disabled(){return this._disabled||this._parentChip?.disabled||false}set disabled(i){this._disabled=i;}_disabled=false;tabIndex=-1;_allowFocusWhenDisabled=false;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){D(hr).load(Ae),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button");}focus(){this._elementRef.nativeElement.focus();}static \u0275fac=function(t){return new(t||e)};static \u0275dir=Vv({type:e,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(t,n){t&2&&(Sf("disabled",n._getDisabledAttribute())("aria-disabled",n.disabled),Uf("mdc-evolution-chip__action--primary",n._isPrimary)("mdc-evolution-chip__action--secondary",!n._isPrimary)("mdc-evolution-chip__action--trailing",!n._isPrimary&&!n._isLeading));},inputs:{disabled:[2,"disabled","disabled",DP],tabIndex:[2,"tabIndex","tabIndex",i=>i==null?-1:wP(i)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return e})(),Ji=(()=>{class e extends Gi{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(i){!this.disabled&&this._isPrimary&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}_handleKeydown(i){(i.keyCode===13||i.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction());}static \u0275fac=(()=>{let i;return function(n){return (i||(i=kg(e)))(n||e)}})();static \u0275dir=Vv({type:e,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(t,n){t&1&&Lf("click",function(l){return n._handleClick(l)})("keydown",function(l){return n._handleKeydown(l)}),t&2&&(Sf("tabindex",n._getTabindex()),Uf("mdc-evolution-chip__action--presentational",false));},features:[Tf]})}return e})();var J=(()=>{class e{_changeDetectorRef=D(IP);_elementRef=D(er);_tagName=D(pP);_ngZone=D(we);_focusMonitor=D(gt$1);_globalRippleOptions=D(Tt,{optional:true});_document=D(jn);_onFocus=new J$1;_onBlur=new J$1;_isBasicChip=false;role=null;_hasFocusInternal=false;_pendingFocus=false;_actionChanges;_animationsDisabled=P();_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=D(wt$1).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=false;_hadFocusOnRemove=false;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(i){this._value=i;}_value;color;removable=true;highlighted=false;disableRipple=false;get disabled(){return this._disabled||this._chipListDisabled}set disabled(i){this._disabled=i;}_disabled=false;removed=new Re;destroyed=new Re;basicChipAttrName="mat-basic-chip";leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=D(we$1);_injector=D(de);constructor(){let i=D(hr);i.load(Ae),i.load(Qs),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()});}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName;}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=false,this.focus());}ngAfterContentInit(){this._actionChanges=Yp(this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck());}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled());}ngOnDestroy(){this.destroyed.emit({chip:this}),this.destroyed.complete(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe();}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}));}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasTrailingIcon(){return !!(this.trailingIcon||this.removeIcon)}_handleKeydown(i){(i.keyCode===8&&!i.repeat||i.keyCode===46)&&(i.preventDefault(),this.remove());}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=true);}_getSourceAction(i){return this._getActions().find(t=>{let n=t._elementRef.nativeElement;return n===i||n.contains(i)})}_getActions(){let i=[];return this.editIcon&&i.push(this.editIcon),this.primaryAction&&i.push(this.primaryAction),this.removeIcon&&i.push(this.removeIcon),i}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(i){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,true).subscribe(i=>{let t=i!==null;t!==this._hasFocusInternal&&(this._hasFocusInternal=t,t?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))));});}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=Ov({type:e,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(t,n,s){if(t&1&&Ff(s,Pi,5)(s,Li,5)(s,Oi,5)(s,zi,5)(s,Pi,5)(s,Oi,5)(s,Li,5)(s,zi,5),t&2){let l;vI(l=II())&&(n.leadingIcon=l.first),vI(l=II())&&(n.editIcon=l.first),vI(l=II())&&(n.trailingIcon=l.first),vI(l=II())&&(n.removeIcon=l.first),vI(l=II())&&(n._allLeadingIcons=l),vI(l=II())&&(n._allTrailingIcons=l),vI(l=II())&&(n._allEditIcons=l),vI(l=II())&&(n._allRemoveIcons=l);}},viewQuery:function(t,n){if(t&1&&jf(Ji,5),t&2){let s;vI(s=II())&&(n.primaryAction=s.first);}},hostAttrs:[1,"mat-mdc-chip"],hostVars:31,hostBindings:function(t,n){t&1&&Lf("keydown",function(l){return n._handleKeydown(l)}),t&2&&(Of("id",n.id),Sf("role",n.role)("aria-label",n.ariaLabel),RI("mat-"+(n.color||"primary")),Uf("mdc-evolution-chip",!n._isBasicChip)("mdc-evolution-chip--disabled",n.disabled)("mdc-evolution-chip--with-trailing-action",n._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",n.leadingIcon)("mdc-evolution-chip--with-primary-icon",n.leadingIcon)("mdc-evolution-chip--with-avatar",n.leadingIcon)("mat-mdc-chip-with-avatar",n.leadingIcon)("mat-mdc-chip-highlighted",n.highlighted)("mat-mdc-chip-disabled",n.disabled)("mat-mdc-basic-chip",n._isBasicChip)("mat-mdc-standard-chip",!n._isBasicChip)("mat-mdc-chip-with-trailing-icon",n._hasTrailingIcon())("_mat-animation-noopable",n._animationsDisabled));},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",DP],highlighted:[2,"highlighted","highlighted",DP],disableRipple:[2,"disableRipple","disableRipple",DP],disabled:[2,"disabled","disabled",DP]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[KI([{provide:Hi,useExisting:e}])],ngContentSelectors:Wi,decls:8,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(t,n){t&1&&(gI(Ki),Af(0,"span",0),Uo(1,"span",1)(2,"span",2),tI(3,$i,2,0,"span",3),Uo(4,"span",4),mI(5),Af(6,"span",5),Ja()()(),tI(7,Ui,2,0,"span",6)),t&2&&(cy(3),nI(n.leadingIcon?3:-1),cy(4),nI(n._hasTrailingIcon()?7:-1));},dependencies:[Gi],styles:[`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-outline-width, 1px);
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-outline-color, var(--mat-sys-outline));
}
.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before {
  border-color: var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before {
  border-width: var(--mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, [dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--mat-chip-with-avatar-avatar-size, 24px);
  height: var(--mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--mat-chip-trailing-action-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--mat-chip-trailing-action-focus-opacity, 1) * var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--mat-chip-container-shape-radius, 8px);
  height: var(--mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  border-radius: var(--mat-chip-with-avatar-avatar-shape-radius, 24px);
  width: var(--mat-chip-with-icon-icon-size, 18px);
  height: var(--mat-chip-with-icon-icon-size, 18px);
  font-size: var(--mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));
  --mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));
  --mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));
  --mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));
  opacity: var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));
  opacity: var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity)) + var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--mat-chip-with-icon-icon-color, currentColor);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`],encapsulation:2})}return e})();var Ni=(()=>{class e{_elementRef=D(er);_changeDetectorRef=D(IP);_dir=D(Er,{optional:true});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new J$1;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(i=>i._onFocus)}get chipDestroyedChanges(){return this._getChipStream(i=>i.destroyed)}get chipRemovedChanges(){return this._getChipStream(i=>i.removed)}get disabled(){return this._disabled}set disabled(i){this._disabled=i,this._syncChipsState();}_disabled=false;get empty(){return !this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(i){this._explicitRole=i;}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new Ao;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip();}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete();}_hasFocusedChip(){return this._chips&&this._chips.some(i=>i._hasFocus())}_syncChipsState(){this._chips?.forEach(i=>{i._chipListDisabled=this._disabled,i._changeDetectorRef.markForCheck();});}focus(){}_handleKeydown(i){this._originatesFromChip(i)&&this._keyManager.onKeydown(i);}_isValidIndex(i){return i>=0&&i<this._chips.length}_allowFocusEscape(){let i=this._elementRef.nativeElement.tabIndex;i!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=i));}_getChipStream(i){return this._chips.changes.pipe(uh(null),dh(()=>Yp(...this._chips.map(i))))}_originatesFromChip(i){let t=i.target;for(;t&&t!==this._elementRef.nativeElement;){if(t.classList.contains("mat-mdc-chip"))return  true;t=t.parentElement;}return  false}_setUpFocusManagement(){this._chips.changes.pipe(uh(this._chips)).subscribe(i=>{let t=[];i.forEach(n=>n._getActions().forEach(s=>t.push(s))),this._chipActions.reset(t),this._chipActions.notifyOnChanges();}),this._keyManager=new Et(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(i=>this._skipPredicate(i)),this.chipFocusChanges.pipe(fh(this._destroyed)).subscribe(({chip:i})=>{let t=i._getSourceAction(document.activeElement);t&&this._keyManager.updateActiveItem(t);}),this._dir?.change.pipe(fh(this._destroyed)).subscribe(i=>this._keyManager.withHorizontalOrientation(i));}_skipPredicate(i){return i.disabled}_trackChipSetChanges(){this._chips.changes.pipe(uh(null),fh(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus();});}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(fh(this._destroyed)).subscribe(i=>{let n=this._chips.toArray().indexOf(i.chip),s=i.chip._hasFocus(),l=i.chip._hadFocusOnRemove&&this._keyManager.activeItem&&i.chip._getActions().includes(this._keyManager.activeItem),V=s||l;this._isValidIndex(n)&&V&&(this._lastDestroyedFocusedChipIndex=n);});}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let i=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),t=this._chips.toArray()[i];t.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():t.focus();}else this.focus();this._lastDestroyedFocusedChipIndex=null;}}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=Ov({type:e,selectors:[["mat-chip-set"]],contentQueries:function(t,n,s){if(t&1&&Ff(s,J,5),t&2){let l;vI(l=II())&&(n._chips=l);}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(t,n){t&1&&Lf("keydown",function(l){return n._handleKeydown(l)}),t&2&&Sf("role",n.role);},inputs:{disabled:[2,"disabled","disabled",DP],role:"role",tabIndex:[2,"tabIndex","tabIndex",i=>i==null?0:wP(i)]},ngContentSelectors:Zi,decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(t,n){t&1&&(gI(),Xa(0,"div",0),mI(1),ec());},styles:[`.mat-mdc-chip-set {
  display: flex;
}
.mat-mdc-chip-set:focus {
  outline: none;
}
.mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  min-width: 100%;
  margin-left: -8px;
  margin-right: 0;
}
.mat-mdc-chip-set .mdc-evolution-chip {
  margin: 4px 0 4px 8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  margin-left: 0;
  margin-right: -8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {
  margin-left: 0;
  margin-right: 8px;
}

.mdc-evolution-chip-set__chips {
  display: flex;
  flex-flow: wrap;
  min-width: 0;
}

.mat-mdc-chip-set-stacked {
  flex-direction: column;
  align-items: flex-start;
}
.mat-mdc-chip-set-stacked .mat-mdc-chip {
  width: 100%;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {
  flex-grow: 0;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {
  flex-basis: 100%;
  justify-content: start;
}

input.mat-mdc-chip-input {
  flex: 1 0 150px;
  margin-left: 8px;
}
[dir=rtl] input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 8px;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {
  opacity: 1;
}
.mat-mdc-chip-set + input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 0;
}
`],encapsulation:2})}return e})();var ji=(()=>{class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=Lv({type:e});static \u0275inj=Xc({providers:[xr,{provide:Xi,useValue:{separatorKeyCodes:[13]}}],imports:[Te,pn]})}return e})();var it=(e,o)=>o.id;function tt(e,o){e&1&&(Uo(0,"mat-card",0)(1,"mat-card-content")(2,"mat-icon",1),WI(3,"restaurant_menu"),Ja(),Uo(4,"p"),WI(5,"\u307E\u3060\u304A\u5E97\u304C\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002"),Ja(),Uo(6,"p",2),WI(7," Google Map \u306E\u30EA\u30B9\u30C8\u3092 Takeout \u3067\u66F8\u304D\u51FA\u3057\u305F CSV \u3092\u53D6\u308A\u8FBC\u307F\u307E\u3057\u3087\u3046\u3002 "),Ja(),Uo(8,"a",3)(9,"mat-icon"),WI(10,"upload_file"),Ja(),WI(11," \u53D6\u308A\u8FBC\u307F\u753B\u9762\u3078 "),Ja()()());}function et(e,o){e&1&&(Uo(0,"span",2),WI(1,"\uFF08\u30A8\u30EA\u30A2\u306A\u3057\uFF09"),Ja());}function nt(e,o){if(e&1){let i=uI();Uo(0,"mat-chip",14),Lf("click",function(){let n=bl(i).$implicit,s=pI(2);return _l(s.toggle(s.selectedAreas,n))}),WI(1),Ja();}if(e&2){let i=o.$implicit,t=pI(2);xf("highlighted",t.isSelected(t.selectedAreas,i)),cy(),tc(" ",i," ");}}function at(e,o){e&1&&(Uo(0,"span",2),WI(1,"\uFF08\u672A\u30BF\u30B0\u3002\u53D6\u308A\u8FBC\u307F\u753B\u9762\u3067\u30B8\u30E3\u30F3\u30EB\u3092\u4ED8\u3051\u3089\u308C\u307E\u3059\uFF09"),Ja());}function ot(e,o){if(e&1){let i=uI();Uo(0,"mat-chip",14),Lf("click",function(){let n=bl(i).$implicit,s=pI(2);return _l(s.toggle(s.selectedGenres,n))}),WI(1),Ja();}if(e&2){let i=o.$implicit,t=pI(2);xf("highlighted",t.isSelected(t.selectedGenres,i)),cy(),tc(" ",i," ");}}function ct(e,o){e&1&&(Uo(0,"span",2),WI(1,"\uFF08\u672A\u30BF\u30B0\uFF09"),Ja());}function rt(e,o){if(e&1){let i=uI();Uo(0,"mat-chip",14),Lf("click",function(){let n=bl(i).$implicit,s=pI(2);return _l(s.toggle(s.selectedMoods,n))}),WI(1),Ja();}if(e&2){let i=o.$implicit,t=pI(2);xf("highlighted",t.isSelected(t.selectedMoods,i)),cy(),tc(" ",i," ");}}function dt(e,o){if(e&1){let i=uI();Uo(0,"button",15),Lf("click",function(){bl(i);let n=pI(2);return _l(n.clearFilters())}),Uo(1,"mat-icon"),WI(2,"clear"),Ja(),WI(3," \u6761\u4EF6\u30AF\u30EA\u30A2 "),Ja();}}function st(e,o){if(e&1&&(Uo(0,"span",20),WI(1),Ja()),e&2){let i=o.$implicit;cy(),Qf(i);}}function lt(e,o){if(e&1&&(Uo(0,"span",21),WI(1),Ja()),e&2){let i=o.$implicit;cy(),Qf(i);}}function ht(e,o){if(e&1&&(Uo(0,"p",22),WI(1),Ja()),e&2){let i=pI();cy(),Qf(i.note);}}function pt(e,o){if(e&1&&(Uo(0,"a",23)(1,"mat-icon"),WI(2,"map"),Ja(),WI(3," Google Map \u3067\u958B\u304F "),Ja()),e&2){let i=pI();xf("href",i.url,yd);}}function mt(e,o){if(e&1&&(Uo(0,"mat-card",10)(1,"mat-card-content")(2,"div",16)(3,"mat-icon"),WI(4,"star"),Ja(),WI(5," \u4ECA\u65E5\u306F\u3053\u3053\uFF01 "),Ja(),Uo(6,"h2",17),WI(7),Ja(),Uo(8,"div",18)(9,"span",19),WI(10),Ja(),oI(11,st,2,1,"span",20,rI),oI(13,lt,2,1,"span",21,rI),Ja(),tI(15,ht,2,1,"p",22),tI(16,pt,4,1,"a",23),Ja()()),e&2){let i=o;cy(7),Qf(i.name),cy(3),Qf(i.area),cy(),iI(i.genres),cy(2),iI(i.moods),cy(2),nI(i.note?15:-1),cy(),nI(i.url?16:-1);}}function ut(e,o){e&1&&(Uo(0,"p",2),WI(1,"\u6761\u4EF6\u306B\u5408\u3046\u304A\u5E97\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u6761\u4EF6\u3092\u3086\u308B\u3081\u3066\u307F\u3066\u304F\u3060\u3055\u3044\u3002"),Ja());}function _t(e,o){if(e&1&&(Uo(0,"span",20),WI(1),Ja()),e&2){let i=o.$implicit;cy(),Qf(i);}}function vt(e,o){if(e&1&&(Uo(0,"span",21),WI(1),Ja()),e&2){let i=o.$implicit;cy(),Qf(i);}}function gt(e,o){if(e&1&&(Uo(0,"p",22),WI(1),Ja()),e&2){let i=pI().$implicit;cy(),Qf(i.note);}}function ft(e,o){if(e&1&&(Uo(0,"a",25)(1,"mat-icon"),WI(2,"map"),Ja(),WI(3," \u5730\u56F3 "),Ja()),e&2){let i=pI().$implicit;xf("href",i.url,yd);}}function yt(e,o){if(e&1&&(Uo(0,"mat-card",13)(1,"mat-card-content")(2,"div",24),WI(3),Ja(),Uo(4,"div",18)(5,"span",19),WI(6),Ja(),oI(7,_t,2,1,"span",20,rI),oI(9,vt,2,1,"span",21,rI),Ja(),tI(11,gt,2,1,"p",22),tI(12,ft,4,1,"a",25),Ja()()),e&2){let i=o.$implicit;cy(3),Qf(i.name),cy(3),Qf(i.area),cy(),iI(i.genres),cy(2),iI(i.moods),cy(2),nI(i.note?11:-1),cy(),nI(i.url?12:-1);}}function bt(e,o){if(e&1){let i=uI();Uo(0,"section",4)(1,"div",5)(2,"h3"),WI(3,"\u30A8\u30EA\u30A2"),Ja(),tI(4,et,2,0,"span",2),Uo(5,"mat-chip-set"),oI(6,nt,2,2,"mat-chip",6,rI),Ja()(),Uo(8,"div",5)(9,"h3"),WI(10,"\u30B8\u30E3\u30F3\u30EB"),Ja(),tI(11,at,2,0,"span",2),Uo(12,"mat-chip-set"),oI(13,ot,2,2,"mat-chip",6,rI),Ja()(),Uo(15,"div",5)(16,"h3"),WI(17,"\u6C17\u5206\u30FB\u305D\u306E\u4ED6"),Ja(),tI(18,ct,2,0,"span",2),Uo(19,"mat-chip-set"),oI(20,rt,2,2,"mat-chip",6,rI),Ja()()(),Uo(22,"div",7)(23,"button",8),Lf("click",function(){bl(i);let n=pI();return _l(n.pickRandom())}),Uo(24,"mat-icon"),WI(25,"casino"),Ja(),WI(26),Ja(),tI(27,dt,4,0,"button",9),Ja(),tI(28,mt,17,4,"mat-card",10),Uo(29,"h3",11),WI(30),Ja(),tI(31,ut,2,0,"p",2),Uo(32,"div",12),oI(33,yt,13,4,"mat-card",13,it),Ja();}if(e&2){let i,t=pI();cy(4),nI(t.areas().length===0?4:-1),cy(2),iI(t.areas()),cy(5),nI(t.genres().length===0?11:-1),cy(2),iI(t.genres()),cy(5),nI(t.moods().length===0?18:-1),cy(2),iI(t.moods()),cy(3),xf("disabled",t.filtered().length===0),cy(3),tc(" \u30E9\u30F3\u30C0\u30E0\u3067\u6C7A\u3081\u3066\uFF08",t.filtered().length,"\u4EF6\u304B\u3089\uFF09 "),cy(),nI(t.hasFilter()?27:-1),cy(),nI((i=t.picked())?28:-1,i),cy(2),tc("\u8A72\u5F53\u3059\u308B\u304A\u5E97\uFF08",t.filtered().length,"\u4EF6\uFF09"),cy(),nI(t.filtered().length===0?31:-1),cy(2),iI(t.filtered());}}var qi=class e{store=D(wt);areas=this.store.areas;genres=this.store.genres;moods=this.store.moods;total=nE(()=>this.store.restaurants().length);selectedAreas=mo([]);selectedGenres=mo([]);selectedMoods=mo([]);picked=mo(null);filtered=nE(()=>{let o=this.selectedAreas(),i=this.selectedGenres(),t=this.selectedMoods();return this.store.restaurants().filter(n=>{let s=o.length===0||o.includes(n.area),l=i.length===0||n.genres.some(H=>i.includes(H)),V=t.length===0||n.moods.some(H=>t.includes(H));return s&&l&&V})});hasFilter=nE(()=>this.selectedAreas().length>0||this.selectedGenres().length>0||this.selectedMoods().length>0);toggle(o,i){o.update(t=>t.includes(i)?t.filter(n=>n!==i):[...t,i]),this.picked.set(null);}isSelected(o,i){return o().includes(i)}clearFilters(){this.selectedAreas.set([]),this.selectedGenres.set([]),this.selectedMoods.set([]),this.picked.set(null);}pickRandom(){let o=this.filtered();if(o.length===0){this.picked.set(null);return}let i=Math.floor(Math.random()*o.length);this.picked.set(o[i]);}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=Ov({type:e,selectors:[["app-recommend"]],decls:2,vars:1,consts:[[1,"empty"],[1,"empty-icon"],[1,"muted"],["mat-flat-button","","color","primary","routerLink","/data"],[1,"filters"],[1,"filter-group"],[1,"chip",3,"highlighted"],[1,"actions"],["mat-flat-button","","color","primary",3,"click","disabled"],["mat-stroked-button",""],["appearance","outlined",1,"pick-card"],[1,"list-heading"],[1,"grid"],["appearance","outlined",1,"item"],[1,"chip",3,"click","highlighted"],["mat-stroked-button","",3,"click"],[1,"pick-label"],[1,"pick-name"],[1,"tags"],[1,"area-tag"],[1,"tag"],[1,"tag","mood"],[1,"note"],["mat-stroked-button","","target","_blank","rel","noopener",3,"href"],[1,"item-name"],["target","_blank","rel","noopener",1,"map-link",3,"href"]],template:function(i,t){i&1&&tI(0,tt,12,0,"mat-card",0)(1,bt,35,9),i&2&&nI(t.total()===0?0:1);},dependencies:[Nt,ji,J,Ni,F,I,_,Vo,Ho,Ta,Aa],styles:["[_nghost-%COMP%]{display:block}.filters[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;margin-bottom:16px}.filter-group[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 8px;font-size:.95rem;font-weight:600}.chip[_ngcontent-%COMP%]{cursor:pointer}.actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 20px}.muted[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant);font-size:.9rem}.empty[_ngcontent-%COMP%]{text-align:center;margin-top:32px}.empty[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:8px;padding:24px}.empty[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%]{font-size:48px;width:48px;height:48px;color:var(--mat-sys-primary)}.pick-card[_ngcontent-%COMP%]{margin-bottom:24px;border-color:var(--mat-sys-primary);border-width:2px}.pick-label[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;color:var(--mat-sys-primary);font-weight:700}.pick-name[_ngcontent-%COMP%]{margin:8px 0}.list-heading[_ngcontent-%COMP%]{margin:16px 0 8px;font-size:1rem}.grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}.item-name[_ngcontent-%COMP%]{font-weight:600;margin-bottom:6px}.tags[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.area-tag[_ngcontent-%COMP%], .tag[_ngcontent-%COMP%]{font-size:.75rem;padding:2px 8px;border-radius:12px;background:var(--mat-sys-secondary-container);color:var(--mat-sys-on-secondary-container)}.area-tag[_ngcontent-%COMP%]{background:var(--mat-sys-primary-container);color:var(--mat-sys-on-primary-container)}.tag.mood[_ngcontent-%COMP%]{background:var(--mat-sys-tertiary-container);color:var(--mat-sys-on-tertiary-container)}.note[_ngcontent-%COMP%]{font-size:.85rem;color:var(--mat-sys-on-surface-variant);margin:6px 0;white-space:pre-wrap}.map-link[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:2px;font-size:.85rem}"]})};export{qi as Recommend};