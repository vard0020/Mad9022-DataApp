		document.addEventListener("deviceready", onDeviceReady);
		document.addEventListener("DOMContentLoaded", onDeviceReady);

		function onDeviceReady() {
		    connectToDB();
		    hammerListeners();
		}

		function errFunc(error) {
		    console.info(error.message);
		}

		function successFunc() {
		    console.log("Transaction is successful");
		}


		function connectToDB() {
		    //app start once deviceready occurs
		    db = openDatabase('vard0020_db', '1.0', 'MyDatabase', 1024 * 1024);
		    db.transaction(doTrans, errFunc, successFunc);

		    function doTrans(trans) {
		        trans.executeSql('CREATE TABLE IF NOT EXISTS people(person_id INTEGER PRIMARY KEY AUTOINCREMENT,                                       person_name TEXT)', [],
		            function (transaction, result) {
		                //do something if it works
		                console.info("Table people created");
		            },

		            function (transaction, error) {
		                //failed to run query
		                console.info(error.message);
		            });

		        trans.executeSql('CREATE TABLE IF NOT EXISTS gifts(gift_id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, occ_id integer, gift_idea                                          TEXT, purchased INTEGER)', [],
		            function (transaction, result) {
		                //do something if it works
		                console.info("Table gifts created");
		            },

		            function (transaction, error) {
		                //failed to run query
		                console.info(error.message);
		            });

		        trans.executeSql('CREATE TABLE IF NOT EXISTS occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT,                                       occ_name TEXT)', [],
		            function (transaction, result) {
		                //do something if it works
		                console.info("Table occasions created");
		            },

		            function (transaction, error) {
		                //failed to run query
		                console.info(error.message);
		            });
		    }




		}

		function hammerListeners(ev) {
		    //People->gifts-for-person
		    var peopleList = document.getElementById("addPers");
		    var giftsPerson = document.getElementById("gifts-for-person");
		    var hammerPeopleList = new Hammer.Manager(peopleList);
		    var tap1 = new Hammer.Tap({
		        event: 'singletap'
		    });
		    var doubletap1 = new Hammer.Tap({
		        event: 'doubletap',
		        taps: 2
		    });
		    hammerPeopleList.add([doubletap1, tap1]);
		    doubletap1.recognizeWith(tap1);
		    tap1.requireFailure(doubletap1);
		    hammerPeopleList.on("singletap", openGifts);
		    hammerPeopleList.on("doubletap", removeItem);

		    function openGifts(ev) {
		        peopleList.style.display = "none";
		        giftsPerson.style.display = "block";
		    };

		    function removeItem(ev) {
		        var currentItem = ev.target;
		        currentItem.parentElement.removeChild(currentItem);
		    };

		    //Occasions->gifts-for-occasion
		    var occasionList = document.getElementById("addOcc");
		    var giftsOccasion = document.getElementById("gifts-for-occasion");

		    var hammerOccasion = new Hammer.Manager(occasionList);
		    var tap2 = new Hammer.Tap({
		        event: 'singletap'
		    });
		    var doubletap2 = new Hammer.Tap({
		        event: 'doubletap',
		        taps: 2
		    });
		    hammerOccasion.add([doubletap2, tap2]);
		    doubletap2.recognizeWith(tap2);
		    tap2.requireFailure(doubletap2);
		    hammerOccasion.on("singletap", openOccasion);
		    hammerOccasion.on("doubletap", removeItem);

		    function openOccasion(ev) {
		        occasionList.style.display = "none";
		        giftsOccasion.style.display = "block";
		    };

		    function removeItem(ev) {
		        var currentItem = ev.target;
		        currentItem.parentElement.removeChild(currentItem);
		    };

		    /////////////////////Swipe//////////////////////////////////////////////

		    //Swipe people->occasions
		    var swipeRight = new Hammer.Manager(document.getElementById("people-list"));
		    swipeRight.add(new Hammer.Swipe({
		        event: 'swiperight',
		        direction: Hammer.DIRECTION_RIGHT,
		        threshold: 20,
		        velocity: 0.80
		    }));
		    swipeRight.on("swiperight", handleRight);

		    function handleRight() {
		            document.getElementById("people-list").style.display = "none";
		            document.getElementById("occasion-list").style.display = "block";

		        }
		        //Swipe occasions->people
		    var swipeLeft = new Hammer.Manager(document.getElementById("occasion-list"));
		    swipeLeft.add(new Hammer.Swipe({
		        event: 'swipeleft',
		        direction: Hammer.DIRECTION_LEFT,
		        threshold: 20,
		        velocity: 0.80
		    }));
		    swipeLeft.on("swipeleft", handleLeft);

		    function handleLeft() {
		        document.getElementById("occasion-list").style.display = "none";
		        document.getElementById("people-list").style.display = "block";
		    }


		    ///////////////////////////////////////////////Modals/////////////////////////////////////////////////
		    // People
		    //addPerson
		    var addPeople = document.getElementById("addPeople");
		    var mc = new Hammer(addPeople);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-new-person").style.display = "block";
		        document.querySelector("[data-role=overlay]").style.display = "block";

		    });

		    //cancel-adding-person
		    var cancelPerson = document.querySelector("#cancelPeopleButton");
		    var mc = new Hammer(cancelPerson);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-new-person").style.display = "none";
		        document.querySelector("[data-role=overlay]").style.display = "none";
		    });
		    //save-person
		    var savePerson = document.querySelector("#savePeopleButton");
		    var mc = new Hammer(savePerson);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-new-person").style.display = "none";
		        document.querySelector("[data-role=overlay]").style.display = "none";
		    });

		    // Occasions
		    //addOccasion
		    var addOccasion = document.getElementById("addOccasion");
		    var mc = new Hammer(addOccasion);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-new-occasion").style.display = "block";
		        document.querySelector("[data-role=overlay]").style.display = "block";
		    });

		    //cancel-adding-occasion
		    var cancelOccasion = document.getElementById("cancelOccButton");
		    var mc = new Hammer(cancelOccasion);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-new-occasion").style.display = "none";
		        document.querySelector("[data-role=overlay]").style.display = "none";
		    });

		    //save-occasion
		    var saveOccasion = document.getElementById("saveOccButton");
		    var mc = new Hammer(saveOccasion);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-new-occasion").style.display = "none";
		        document.querySelector("[data-role=overlay]").style.display = "none";
		    });

		    //Gifts for person
		    //Add Gift ideas for person
		    var addGiftPerson = document.getElementById("addGiftPerson");
		    var mc = new Hammer(addGiftPerson);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-gift").style.display = "block";
		        document.querySelector("[data-role=overlay]").style.display = "block";

		    });

		    //cancel gift ideas for person
		    var cancelGiftPerson = document.getElementById("cancelNewGiftButton");
		    var mc = new Hammer(cancelGiftPerson);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-gift").style.display = "none";
		        document.querySelector("[data-role=overlay]").style.display = "none";
		    });

		    //save gift ideas for person
		    var saveGiftPerson = document.getElementById("saveNewGiftButton");
		    var mc = new Hammer(saveGiftPerson);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-gift").style.display = "none";
		        document.querySelector("[data-role=overlay]").style.display = "none";
		    });

		    //back button for gifts for person
		    var backGiftPeople = document.getElementById("backGiftPeople");
		    var mc = new Hammer(backGiftPeople);
		    mc.on("tap", function (ev) {
		        document.getElementById("gifts-for-person").style.display = "none";
		        document.getElementById("addPers").style.display = "block";
		    });
		    //remove gifts for person
		    var removeGiftPerson = document.getElementById("add-gift-pers");
		    var mc = new Hammer(removeGiftPerson);
		    mc.on("doubletap", function (ev) {
		        var currentItem = ev.target;
		        currentItem.parentElement.removeChild(currentItem);
		    });
		    //Gifts for occasion
		    //Add Gift ideas for occasion
		    var addGiftOccasion = document.getElementById("addGiftOccasion");
		    var mc = new Hammer(addGiftOccasion);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-gift-occasion-modal").style.display = "block";
		        document.querySelector("[data-role=overlay]").style.display = "block";

		    });

		    //cancel gift ideas for occasion
		    var cancelGiftOccasion = document.getElementById("cancelNewOccButton");
		    var mc = new Hammer(cancelGiftOccasion);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-gift-occasion-modal").style.display = "none";
		        document.querySelector("[data-role=overlay]").style.display = "none";
		    });

		    //save gift ideas for occasion
		    var saveGiftOccasion = document.getElementById("saveNewOccButton");
		    var mc = new Hammer(saveGiftOccasion);
		    mc.on("tap", function (ev) {
		        document.getElementById("add-gift-occasion-modal").style.display = "none";
		        document.querySelector("[data-role=overlay]").style.display = "none";
		    });

		    //back button for gifts for occasion
		    var backGiftOccasion = document.getElementById("backGiftOccasion");
		    var mc = new Hammer(backGiftOccasion);
		    mc.on("tap", function (ev) {
		        document.getElementById("gifts-for-occasion").style.display = "none";
		        document.getElementById("addOcc").style.display = "block";
		    });

		    //remove gifts for occasion
		    var removeGiftOccasion = document.getElementById("add-gift-occ");
		    var mc = new Hammer(removeGiftOccasion);
		    mc.on("doubletap", function (ev) {
		        var currentItem = ev.target;
		        currentItem.parentElement.removeChild(currentItem);
		    });


////////saving data to People table///////////////////////////////////////////////////////////
		    var savePeople = document.getElementById("savePeopleButton");
		    var mc = new Hammer(savePeople);
		    mc.on("tap", function (ev) {
		        db.transaction(insertIntoPeople, errFunc, successFunc);
		    });

		    function insertIntoPeople(trans) {
		        trans.executeSql('INSERT INTO people(person_name) VALUES(?)', [document.getElementById("new-person-name").value], insertSucc, inserterrFunc);

		        function insertSucc(errors, results) {
		            trans.executeSql('SELECT * FROM people', [], selectPeopleSucc, selectPeopleErr);


		            function selectPeopleSucc(errors, selectResults) {
		                for (var i = 0; i < selectResults.rows.length; i++) {
		                    var entry = document.createElement('li');
		                    var ul = document.getElementById("addPers");
		                    entry.id = selectResults.rows.item(i).person_id;
		                    entry.innerHTML = selectResults.rows.item(i).person_name;
		                    ul.appendChild(entry);
		                }
		            }

		            function selectPeopleErr(tx, err) {
		                console.info(err.message);
		            };
		        };

		        function inserterrFunc(tx, err) {
		            console.info(err.message);
		        };
		    }
            
            
////////saving data to Occasions table///////////////////////////////////////////////////////////
		    var saveOccasions = document.getElementById("saveOccButton");
		    var mc = new Hammer(saveOccasion);
		    mc.on("tap", function (ev) {
		        db.transaction(insertIntoOccasions, errFunc, successFunc);
		    });

		    function insertIntoOccasions(trans) {
		        trans.executeSql('INSERT INTO occasions(occ_name) VALUES(?)', [document.getElementById("new-occ-name").value], insertSucc, inserterrFunc);

		        function insertSucc(errors, results) {
		            trans.executeSql('SELECT * FROM occasions', [], selectOccSucc, selectOccErr);


		            function selectOccSucc(errors, selectResults) {
		                for (var i = 0; i < selectResults.rows.length; i++) {
		                    var entry = document.createElement('li');
		                    var ul = document.getElementById("addOcc");
		                    entry.id = selectResults.rows.item(i).occ_id ;
		                    entry.innerHTML = selectResults.rows.item(i).occ_name;
		                    ul.appendChild(entry);
		                }
		            }

		            function selectOccErr(tx, err) {
		                console.info(err.message);
		            };
		        };

		        function inserterrFunc(tx, err) {
		            console.info(err.message);
		        };
		    }





            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
		    }







		