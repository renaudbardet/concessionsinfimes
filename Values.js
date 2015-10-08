var warned = false;
function loadProp(prop, def){
	if( window.localStorage){
		var cookie = window.localStorage.getItem( "Values_" + prop );
		if (cookie)
			return cookie;
		else 
			return def;
	} else if (!warned) {
		window.alert("Concessions Infimes nécessite pour l'instant un navigateur supportant localStorage, il semblerait que votre navigateur ne rempli pas cette contrainte.\nConcessions Infimes a été développé avec chrome et fonctionnera au mieux sous chrome.");
		warned = true;
	}
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
	
	,tutoriel: Number(loadProp("tutoriel", 0))

	,save: function() {
		localStorage.setItem( "Values_capital", this._capital);
		localStorage.setItem( "Values_clickValue", this.clickValue);
		for ( augId in this.augmenters ) { localStorage.setItem( "Values_augmenter_" + augId, this.augmenters[augId]); }
		for ( itemId in this.items ) { localStorage.setItem( "Values_item_" + itemId, this.items[itemId]); }
		localStorage.setItem( "Values_tuto_intro", this.tuto_intro);
		localStorage.setItem( "Values_tutoriel", this.tutoriel);
	}

	,reset: function() {
		localStorage.setItem( "Values_capital", 0 );
		localStorage.setItem( "Values_clickValue", 1 );
		for ( augId in this.augmenters ) { localStorage.setItem(  "Values_augmenter_" + augId, 0 ); }
		for ( itemId in this.items ) { localStorage.setItem( "Values_item_" + itemId, false ); }
		localStorage.setItem( "Values_tuto_intro", false );
		localStorage.setItem( "Values_tutoriel", 0 );
	}
};