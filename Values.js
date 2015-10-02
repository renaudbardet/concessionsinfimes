function loadProp(prop, def){
	var cookie = localStorage[ "Values_" + prop ];
	if (cookie)
		return cookie;
	else 
		return def;
}

var Values = {
	_capital: Number(loadProp("capital", 0))
	,get capital() { return this._capital; }
	,set capital(x) {
		this._capital = x; 
		///////////// trigger events
		checkAugmenters();
		checkItems();

		// display
		$("#capital").text( this.capital );
	}

	,augmenters: (function() {
		var _augmenters = {};
		for ( augId in Augmenters ) {
			_augmenters[augId] = Number(loadProp( "augmenter_" + augId, 0 ));
		}
		return _augmenters;
	}())

	,items: (function() {
		var _items = {};
		for ( itemId in Items ) {
			_items[itemId] = loadProp( "item_" + itemId, "false" ) != "false";
		}
		return _items;
	}())

	,get cps() {
		var _cps = 0;
		for ( augId in this.augmenters ) {
			_cps += Augmenters[augId].baseReturn * this.augmenters[augId];
		}
		return _cps;
	}

	,clickValue: Number(loadProp("clickValue", 1))

	,tuto_intro: loadProp("tuto_intro", "false") != "false"

	,save() {
		localStorage[ "Values_capital" ] = this._capital;
		localStorage[ "Values_clickValue" ] = this.clickValue;
		for ( augId in this.augmenters ) { localStorage[ "Values_augmenter_" + augId] = this.augmenters[augId]; }
		for ( itemId in this.items ) { localStorage[ "Values_item_" + itemId] = this.items[itemId]; }
		localStorage[ "Values_tuto_intro" ] = this.tuto_intro;
	}

	,reset() {
		localStorage[ "Values_capital" ] = 0;
		localStorage[ "Values_clickValue" ] = 1;
		for ( augId in this.augmenters ) { localStorage[ "Values_augmenter_" + augId ] = 0; }
		for ( itemId in this.items ) { localStorage[ "Values_item_" + itemId] = false; }
		localStorage[ "Values_tuto_intro" ] = false;
	}
};