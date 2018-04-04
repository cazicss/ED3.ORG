//Function for locating address
function LocateAddress() {
    if (dojo.byId("txtAddress").value == '') {
        alert("Enter address to Locate");
        return;
    }
    var add = dojo.byId("txtAddress").value.split(",");
    var address = [];
    if (add.length == 2) {
        address[locatorParams[0]] = add[0];
        address[locatorParams[1]] = '';
        address[locatorParams[2]] = '';
        address[locatorParams[3]] = add[1];
    }
    else if (add.length == 3) {
        address[locatorParams[0]] = add[0];
        address[locatorParams[1]] = add[1];
        address[locatorParams[2]] = add[2];
        address[locatorParams[3]] = '';
    }
    else if (add.length == 4) {
        address[locatorParams[0]] = add[0];
        address[locatorParams[1]] = add[1];
        address[locatorParams[2]] = add[2];
        address[locatorParams[3]] = add[3];
    }
    else {
        alert("Please enter address in [Address, City, State, Zip] or in [Address, Zip] format.");
        return;
    }
    locator.addressToLocations(address, ["Loc_name"]);
}


//function to populate address
function ShowLocatedAddress(candidates) {
    RemoveChildren(dojo.byId('tblAddressResults'));
    CreateScrollbar(dojo.byId("divAddressScrollContainer"), dojo.byId("divAddressScrollContent"));
    if (candidates.length > 0) {
        if (candidates[0].score == 100) {
            HideAddressContainer();
            AddLocatorPointonMap(new esri.geometry.Point(candidates[0].location.x, candidates[0].location.y, map.spatialReference));
            return;
        }
        var table = dojo.byId("tblAddressResults");
        var tBody = document.createElement("tbody");
        table.appendChild(tBody);
        for (var i = 0; i < candidates.length; i++) {

            var candidate = candidates[i];
            var tr = document.createElement("tr");
            tBody.appendChild(tr);
            var td1 = document.createElement("td");
            td1.innerHTML = candidate.address;
            td1.className = 'bottomborder';
            td1.style.cursor = "pointer";
            td1.height = 20;
            td1.onclick = function () {
                HideAddressContainer();
                AddLocatorPointonMap(new esri.geometry.Point(Number(this.getAttribute("x")), Number(this.getAttribute("y")), map.spatialReference));
            }

            td1.setAttribute("x", candidate.location.x);
            td1.setAttribute("y", candidate.location.y);
            td1.setAttribute("address", candidate.address);
            tr.appendChild(td1);

        }
        SetHeightAddressResults();
    }
    else {
        dojo.byId('txtAddress').focus();
        alert('Unable to locate the specified address');
    }
}


//function to set height and create scrollbar for address results
function SetHeightAddressResults() {
    var height = (isMobileDevice) ? map.height : dojo.coords(dojo.byId('divAddressContent')).h;
    dojo.byId('divAddressScrollContent').style.height = (height - 75) + "px";
    //dojo.byId('oDetails').style.height = (height - 75) + "px"

    CreateScrollbar(dojo.byId("divAddressScrollContainer"), dojo.byId("divAddressScrollContent"));
}

function AddLocatorPointonMap(mapPoint) {
    map.getLayer(tempGraphicsLayerId).clear();
    map.infoWindow.hide();
    var graphic = new esri.Graphic(mapPoint, locatorMarkupSymbol, { "Locator": true }, null);
    map.getLayer(tempGraphicsLayerId).add(graphic);
    map.centerAndZoom(mapPoint, zoomLevel);
}