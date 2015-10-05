// Augmenters.diplomate
// Augmenters.luxe
// Augmenters.pharma
// Augmenters.formation
// Augmenters.transport
// Augmenters.aero_civile
// Augmenters.aero_militaire
// Augmenters.nucleaire
// Augmenters.satellites
// Augmenters.culture

var Augmenter = {

	id: "",
	name: "",
	price: 1,
	baseReturn: 0,

	get available() {
		return true;
	},
	get enable() {
		return this.available && augmenterValue(this.id) <= Values.capital;
	}

}

var Augmenters = {};

Augmenters.diplomate = Object.create(Augmenter);
Augmenters.diplomate.id = "diplomate";
Augmenters.diplomate.name = "Diplomate";
Augmenters.diplomate.price = 5;
Augmenters.diplomate.baseReturn = 1;

Augmenters.luxe = Object.create(Augmenter);
Augmenters.luxe.id = "luxe";
Augmenters.luxe.name = "Produits de luxe";
Augmenters.luxe.price = 20;
Augmenters.luxe.baseReturn = 4;
Object.defineProperty( Augmenters.luxe, "available", {
	get: function() { return Values.augmenters[Augmenters.diplomate.id] >= 5; }
} );

Augmenters.pharma = Object.create(Augmenter);
Augmenters.pharma.id = "pharma";
Augmenters.pharma.name = "Produits pharmaceutiques";
Augmenters.pharma.price = 80;
Augmenters.pharma.baseReturn = 8;
Object.defineProperty( Augmenters.pharma, "buyConfirmation", {
	get: function() {
		if ( Values.items[Items.somnifere.id] ) return false;
		else return true;
	}
} );
Object.defineProperty( Augmenters.pharma, "available", {
	get: function() { return Values.augmenters[Augmenters.luxe.id] >= 5; }
} );

Augmenters.formation = Object.create(Augmenter);
Augmenters.formation.id = "formation";
Augmenters.formation.name = "Formation de personnel";
Augmenters.formation.price = 320;
Augmenters.formation.baseReturn = 32;
Object.defineProperty( Augmenters.formation, "buyConfirmation", {
	get: function() { 
		if ( Values.items[Items.somnifere.id] ) return false;
		else return true;
	}
} );
Object.defineProperty( Augmenters.formation, "available", {
	get: function() { return Values.augmenters[Augmenters.pharma.id] >= 5; }
} );

Augmenters.transport = Object.create(Augmenter);
Augmenters.transport.id = "transport";
Augmenters.transport.name = "Transports publics";
Augmenters.transport.price = 2000;
Augmenters.transport.baseReturn = 200;
Object.defineProperty( Augmenters.transport, "buyConfirmation", {
	get: function() { 
		if ( Values.items[Items.masque.id] ) return false;
		else return true;
	}
} );
Object.defineProperty( Augmenters.transport, "available", {
	get: function() { return Values.augmenters[Augmenters.formation.id] >= 5; }
} );

Augmenters.aero_civile = Object.create(Augmenter);
Augmenters.aero_civile.id = "aero_civile";
Augmenters.aero_civile.name = "Aéronautique civile";
Augmenters.aero_civile.price = 8000;
Augmenters.aero_civile.baseReturn = 800;
Object.defineProperty( Augmenters.aero_civile, "buyConfirmation", {
	get: function() { 
		if ( Values.items[Items.coussin.id] ) return false;
		else return true;
	}
} );
Object.defineProperty( Augmenters.aero_civile, "available", {
	get: function() { return Values.augmenters[Augmenters.transport.id] >= 5; }
} );

Augmenters.aero_militaire = Object.create(Augmenter);
Augmenters.aero_militaire.id = "aero_militaire";
Augmenters.aero_militaire.name = "Aéronautique militaire";
Augmenters.aero_militaire.price = 32000;
Augmenters.aero_militaire.baseReturn = 3200;
Object.defineProperty( Augmenters.aero_militaire, "buyConfirmation", {
	get: function() { 
		if ( Values.items[Items.savon.id] ) return false;
		else return true;
	}
} );
Object.defineProperty( Augmenters.aero_militaire, "available", {
	get: function() { return Values.augmenters[Augmenters.aero_civile.id] >= 5; }
} );

Augmenters.nucleaire = Object.create(Augmenter);
Augmenters.nucleaire.id = "nucleaire";
Augmenters.nucleaire.name = "Nucléaire civil";
Augmenters.nucleaire.price = 200000;
Augmenters.nucleaire.baseReturn = 10000;
Object.defineProperty( Augmenters.nucleaire, "buyConfirmation", {
	get: function() { 
		if ( Values.items[Items.bayon.id] ) return false;
		else return true;
	}
} );
Object.defineProperty( Augmenters.nucleaire, "available", {
	get: function() { return Values.augmenters[Augmenters.aero_militaire.id] >= 5; }
} );

Augmenters.satellites = Object.create(Augmenter);
Augmenters.satellites.id = "satellites";
Augmenters.satellites.name = "Satellites";
Augmenters.satellites.price = 800000;
Augmenters.satellites.baseReturn = 40000;
Object.defineProperty( Augmenters.satellites, "buyConfirmation", {
	get: function() { return true; }
} );
Object.defineProperty( Augmenters.satellites, "available", {
	get: function() { return Values.augmenters[Augmenters.nucleaire.id] >= 5; }
} );

Augmenters.culture = Object.create(Augmenter);
Augmenters.culture.id = "culture";
Augmenters.culture.name = "Justice";
Augmenters.culture.price = 999999999999;
Augmenters.culture.baseReturn = 0;
Augmenters.culture.buyConfirmation = false;
Object.defineProperty( Augmenters.culture, "available", {
	get: function() { return Values.augmenters[Augmenters.satellites.id] >= 5; }
} );




function augmenterValue( augId ) {
	return Math.ceil(expo( Augmenters[augId].price, Values.augmenters[augId] ));
}

function createAugmenterList() {
	var aug_list = $("#augmenters");
	console.log(aug_list);
	console.log("creating augmenter list");
	for ( augId in Augmenters ) {
		var aug = Augmenters[augId];
		var aug_display = $("#augmenter_proto").clone();
		aug_display.attr("id","augmenter_"+augId);
		aug_display.find(".nametag .name").text( aug.name );
		aug_display.find(".nametag .desc").text( "+"+aug.baseReturn+" contrats par seconde" );
		aug_display.click( aug, function(e) {
			console.log("clicked " + e.data.name);
			if ( e.data.enable ) {
				buyAugmenter( e.data );
			}
		});
		aug_display.find(".owned").text(0);
		aug_display.find(".price").text(aug.price);

		// aug_display.mouseenter( augId, function(e){
		// 		var augId = e.data;
		// 		var aug_display = $("#augmenter_"+augId);
		// 		var aug = Augmenters[augId];
		// 		var pos = aug_display.position();
		// 		var width = aug_display.outerWidth(true);
		// 		var tooltip = $("#augmenter-tooltip");
		// 		tooltip.stop();
		// 		tooltip.find(".price").text( augmenterValue( augId ) );
		// 		tooltip.find(".cps").text( aug.baseReturn );
		// 		tooltip.css({
		// 			top:pos.top + "px",
		// 			right:(pos.left + width) + "px"
		// 		});
		// 		tooltip.show(400);
		// 	});
		// aug_display.mouseleave( augId, function(e){
		// 		$("#augmenter-tooltip").hide(400);
		// 	});

		aug_list.append( aug_display );
		aug_display.show();
	}
}

// check next augmenter availability
function checkAugmenters() {
	for ( augId in Augmenters ) {
		var aug = Augmenters[augId];
		var aug_display = $("#augmenter_"+augId);
		if ( !aug.available ) {
			aug_display.find(".nametag .name").text( "???" );
			aug_display.find(".nametag .desc").text( "Nécessite 5 accords sur le produit précédent" );
		} else {
			aug_display.find(".nametag .name").text( aug.name );
			aug_display.find(".nametag .desc").text( "+"+aug.baseReturn+" contrats par seconde" );
		}
		if ( aug.enable && !aug_display.hasClass("enabled")) {
			console.log(augId, "enabled");
			aug_display.toggleClass("enabled", true);
		} else if ( !aug.enable && aug_display.hasClass("enabled") ) {
			console.log(augId, "disabled");
			aug_display.toggleClass("enabled", false);
		}
		aug_display.find(".price").text( augmenterValue(augId) );
	}
}
