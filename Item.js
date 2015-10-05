var Item = {

	id:"",
	name:"",
	gimmick:"",
	description:"",
	price:1

	,get available() {
		return true;
	}
	,get enable() {
		return this.available && Values.capital >= this.price;
	}
	,get bought() {
		return Values.items[this.id];
	}

	,onBuy:function() {}

}

var Items = {}

Items.somnifere = Object.create( Item );
Items.somnifere.id = "somnifere";
Items.somnifere.name = "Somnifère";
Items.somnifere.price = 300;
Items.somnifere.gimmick = "pour bien dormir la nuit.";
Items.somnifere.description = "Supprime la confirmation pour les ventes de Produits pharmaceutiques et Formation de personnel.";
Object.defineProperty( Items.somnifere, "available", {
	get: function() { return Values.augmenters.pharma > 2; }
} );
Items.somnifere.onBuy = function() {};

Items.masque = Object.create( Item );
Items.masque.id = "masque";
Items.masque.name = "Masque";
Items.masque.price = 3000;
Items.masque.gimmick = "pour mieux fermer les yeux.";
Items.masque.description = "Supprime la confirmation pour les ventes de Transports publics.";
Object.defineProperty( Items.masque, "available", {
	get: function() { return Values.augmenters.transport > 2; }
} );
Items.masque.onBuy = function() {};

Items.coussin = Object.create( Item );
Items.coussin.id = "coussin";
Items.coussin.name = "Coussin";
Items.coussin.price = 30000;
Items.coussin.gimmick = "pour s'asseoir sur les droits de l'homme.";
Items.coussin.description = "Supprime la confirmation pour les ventes d'Aéronautique civile.";
Object.defineProperty( Items.coussin, "available", {
	get: function() { return Values.augmenters.aero_civile > 2; }
} );
Items.coussin.onBuy = function() {};

Items.savon = Object.create( Item );
Items.savon.id = "savon";
Items.savon.name = "Savon";
Items.savon.price = 300000;
Items.savon.gimmick = "pour s'en laver les mains.";
Items.savon.description = "Supprime la confirmation pour les ventes d'Aéronautique militaire.";
Object.defineProperty( Items.savon, "available", {
	get: function() { return Values.augmenters.aero_militaire > 2; }
} );
Items.savon.onBuy = function() {};

Items.bayon = Object.create( Item );
Items.bayon.id = "bayon";
Items.bayon.name = "Baillon";
Items.bayon.price = 3000000;
Items.bayon.gimmick = "pour faire taire sa conscience.";
Items.bayon.description = "Supprime la confirmation pour les ventes de Nucléaire civil.";
Object.defineProperty( Items.bayon, "available", {
	get: function() { return Values.augmenters.nucleaire > 2; }
} );
Items.bayon.onBuy = function() {};

function createShop() {
	var shop = $("#shop");
	console.log("creating shop");
	for ( itemId in Items ) {
		var item = Items[itemId];
		var item_display = $('<li class="unavailable"><div class="icon"></div></li>');
		item_display.attr("id","item_"+itemId);
		item_display.addClass("item");
		//item_display.append( item.name );
		item_display.click( item, function(e) {
			console.log("clicked " + e.data.name);
			if ( e.data.enable ) {
				buyItem( e.data );
			}
		});
		//item_display.append( $('<div class="price">'+item.price+'</div>') );
		item_display.mouseenter( itemId, function(e){
				var itemId = e.data;
				var item_display = $("#item_"+itemId);
				var item = Items[itemId];
				var pos = item_display.offset();
				
				var tooltip = $("#augmenter-tooltip");
				tooltip.stop();
				if ( !item_display.hasClass("unavailable") )
				{
					tooltip.find(".name").text( item.name );
					tooltip.find(".gimmick").text( item.gimmick );
					tooltip.find(".desc").text( item.description );
					tooltip.find(".price").text( "coût: "+item.price+" contrats" );
					/*tooltip.css({
						width:400px
					});*/
				}
				else
				{
					tooltip.find(".name").text( "???" );
					tooltip.find(".gimmick").text( "???" );
					tooltip.find(".desc").text( "???" );
					tooltip.find(".price").text( "???" );
					/*tooltip.css({
						width:100px
					});*/
				}
				tooltip.css({
					top:(pos.top-152) + "px",
					left:pos.left + "px"
				});
				tooltip.show(0);
				
				if(itemId != "somnifere" && Values.tutoriel != 5) return;
				Values.tutoriel = 100;
				Values.save();
				$("#tuto05").hide();
			});
		item_display.mouseleave( augId, function(e){
				$("#augmenter-tooltip").hide(0);
			});

		shop.append( item_display );
	}
}

// check item availability
function checkItems() {
	for ( itemId in Items ) {
		var item = Items[itemId];
		var item_display = $("#item_"+itemId);
		if ( !item.available ) {
			if ( !item_display.hasClass("unavailable") )
				item_display.toggleClass("unavailable", true);
		} else {
			if ( item_display.hasClass("unavailable") )
				item_display.toggleClass("unavailable", false);

			if ( item.bought && !item_display.hasClass("bought") ) {
				item_display.toggleClass("bought", true);
			} else if ( item.enable && !item_display.hasClass("enabled")) {
				console.log(itemId, "enabled");
				item_display.toggleClass("enabled", true);
			} else if ( !item.enable && item_display.hasClass("enabled") ) {
				console.log(itemId, "disabled");
				item_display.toggleClass("enabled", false);
			}
		}
		item_display.find(".price").text( item.price );
	}
	if (Values.tutoriel != 10) return;
	if(Items["somnifere"].available && document.getElementById("tuto03").style.display!="block")
	{
		Values.tutoriel = 5;
		Values.save();
		showTutoItem();
	}
}

function showTutoItem()
{
	var item_display = $("#item_somnifere");
	var pos = item_display.offset();
	$("#tuto05").css({
		top:pos.top - 120,
		left:pos.left + 5
	})
	$("#tuto05").show();
}