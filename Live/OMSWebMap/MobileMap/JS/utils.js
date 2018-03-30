var app = {};

//function to handle orientation change event handler
function orientationChanged() {
    if (map) {
        var timeout = (isMobileDevice && isiOS) ? 100 : 500;
        setTimeout(function () {
            if (isMobileDevice) {
                map.reposition();
                map.resize();
               // SetHeightAddressResults();
               // SetHeightComments();
               // SetHeightCreateRequest();
                //SetHeightSplashScreen();
                //SetHeightViewDetails();
            }
        }, timeout);
    }
}

//function to handle resize browser event handler
function resizeHandler() {
    if (map) {
        map.reposition();
        map.resize();
    }
}

//function to show progress indicator 
function ShowProgressIndicator(nodeId) {
    var container = dojo.byId(nodeId);
    progressIndicator = dojox.mobile.ProgressIndicator.getInstance();
    container.appendChild(progressIndicator.domNode);
    progressIndicator.start();
}

//function to hide progress indicator
function HideProgressIndicator() {
    progressIndicator.stop();
}

//function to show error message span
function ShowSpanErrorMessage(controlId, message) {
    dojo.byId(controlId).style.display = "block";
    dojo.byId(controlId).innerHTML = message;
}

//Function for refreshing address container div
function RemoveChildren(parentNode) {
    while (parentNode.hasChildNodes()) {
        parentNode.removeChild(parentNode.lastChild);
    }
}

//function to reset service request values
/*function ResetRequestFields() {
    dojo.byId("txtSelectedRequest").value = "";
    dojo.byId('txtDescription').value = "";
    dojo.byId('txtName').value = "";
    dojo.byId('txtPhone').value = "";
    dojo.byId('txtMail').value = "";
    dojo.byId('spanServiceErrorMessage').style.display = "none";
    dojo.byId('divRequestTypes').style.display = "none";
    dojo.byId('txtFileName').value = "";
    dojo.byId('btnSubmit').disabled = false;
}*/

//function to get the extent based on the mappoint 
function GetBrowserMapExtent(mapPoint) {
    var width = map.extent.getWidth();
    var height = map.extent.getHeight();
    var xmin = mapPoint.x - (width / 2);
    var ymin = mapPoint.y - (height / 4);
    var xmax = xmin + width;
    var ymax = ymin + height;
    return new esri.geometry.Extent(xmin, ymin, xmax, ymax, map.spatialReference);
}

//function to show add serive request infowindow
/*function AddServiceRequest(mapPoint) {
    map.getLayer(tempGraphicsLayerId).clear();
    map.infoWindow.hide();
    if (!isMobileDevice) {
        dojo.byId('divCreateRequestContainer').style.display = "none";
        dojo.byId('divServiceRequestContent').style.display = "none";
    }
    if (serviceRequestSymbol) {
        var graphic = new esri.Graphic(mapPoint, serviceRequestSymbol, null, null);
        map.getLayer(tempGraphicsLayerId).add(graphic);
        map.infoWindow.resize(225, 65);
        var screenPoint;
        (isMobileDevice) ? map.centerAt(mapPoint) : map.setExtent(GetBrowserMapExtent(mapPoint));
        setTimeout(function () {
            if (isMobileDevice)
                screenPoint = map.toScreen(mapPoint);
            else {
                screenPoint = map.toScreen(mapPoint);
                screenPoint.y = map.height - screenPoint.y;
            }

            map.infoWindow.show(screenPoint);
            map.infoWindow.setTitle("Submit Details");
            dojo.connect(map.infoWindow.imgDetailsInstance(), "onclick", function () {
                ResetRequestFields();
                if (isMobileDevice) {
                    ShowCreateRequestContainer();
                    map.infoWindow.hide();
                }
                else {
                    map.setExtent(GetBrowserMapExtent(mapPoint));
                    var height = (isTablet) ? 350 : 340;
                    map.infoWindow.resize(300, height);
                    map.infoWindow.reSetLocation(screenPoint);
                    dojo.byId('divCreateRequestContainer').style.display = "block";
                }
            });
            map.infoWindow.setContent("");
        }, 500)
    }
}*/

function roundNumber(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}
//function to show service request deatils infowindow
function ShowServiceRequestDetails(mapPoint, attributes, title) {
    // alert(title);
    map.infoWindow.hide();
    if (!isMobileDevice) {
       // dojo.byId('divCreateRequestContainer').style.display = "none";
       // dojo.byId('divServiceRequestContent').style.display = "none";
    }
    selectedMapPoint = mapPoint;
    //    for (var i in attributes) {
    //        if (!attributes[i]) {
    //            attributes[i] = "";
    //        }
    //    }

    //selectedRequestStatus = attributes.STATUS;
    //map.getLayer(tempGraphicsLayerId).clear();
    map.infoWindow.resize(225, 120);
    //var screenPoint;
    //(isMobileDevice) ? map.centerAt(mapPoint) : map.setExtent(GetBrowserMapExtent(mapPoint));

    setTimeout(function () {
        screenPoint = map.toScreen(mapPoint);
        screenPoint.y = map.height - screenPoint.y;
        //        if (isMobileDevice)
        //            screenPoint = map.toScreen(mapPoint);
        //        else {
        //            screenPoint = map.toScreen(mapPoint);
        //            screenPoint.y = map.height - screenPoint.y;
        //        }
        map.infoWindow.show(screenPoint);
        //alert(title + " new");
        map.infoWindow.setTitle(title);
      //  dojo.connect(map.infoWindow.imgDetailsInstance(), "onclick", function () {
       //     map.infoWindow.hide();
            //                    if (isMobileDevice) {
            //                        selectedMapPoint = null;
            //                        map.infoWindow.hide();
            //                        ShowServiceRequestContainer();
            //                    }
            //                    else {
            //                        map.infoWindow.resize(300, 300);
            //                        screenPoint = map.toScreen(mapPoint);
            //                        screenPoint.y = map.height - screenPoint.y;
            //                        map.infoWindow.reSetLocation(screenPoint);
            //                        dojo.byId('divServiceRequestContent').style.display = "block";
            //                    }
            //                    ServiceRequestDetails(attributes);
      //  });

        // map.infoWindow.resize(225, 120);
        // dojo.byId('divServiceRequestContent').style.display = "block";
        //ServiceRequestDetails(attributes);
        map.infoWindow.setContent(attributes);
    }, 0);
}

function ShowOutageDetails1(mapPoint, graphic, title, height, width) {
    // alert(title);
   // map.infoWindow.hide();
    if (!isMobileDevice) {
        dojo.byId('divCreateRequestContainer').style.display = "none";
        dojo.byId('divServiceRequestContent').style.display = "none";
    }
    selectedMapPoint = mapPoint;
    
    map.infoWindow.resize(width, height);
    map.infoWindow.setTitle(graphic.getTitle());
    map.infoWindow.setContent(graphic.getContent());
    map.infoWindow.show(mapPoint, map.getInfoWindowAnchor(mapPoint));
   // dojo.connect(map.infoWindow.imgDetailsInstance(), "onclick", function () {
    //    map.infoWindow.hide();

   // });
   /* setTimeout(function () {
        screenPoint = map.toScreen(mapPoint);
        screenPoint.y = map.height - screenPoint.y;
       
       

        map.infoWindow.setTitle(graphic.getTitle());
        dojo.connect(map.infoWindow.imgDetailsInstance(), "onclick", function () {
            map.infoWindow.hide();
            
        });
        
        map.infoWindow.setContent(graphic.getContent());
    }, 0);*/
}
//function to show service request deatils infowindow
function ShowOutageDetails(mapPoint, attributes, title, height, width) {
    // alert(title);
    map.infoWindow.hide();
    if (!isMobileDevice) {
        dojo.byId('divCreateRequestContainer').style.display = "none";
       dojo.byId('divServiceRequestContent').style.display = "none";
    }
    selectedMapPoint = mapPoint;
    //    for (var i in attributes) {
    //        if (!attributes[i]) {
    //            attributes[i] = "";
    //        }
    //    }

    //selectedRequestStatus = attributes.STATUS;
    //map.getLayer(tempGraphicsLayerId).clear();
    map.infoWindow.resize(width, height);
    //var screenPoint;
    //(isMobileDevice) ? map.centerAt(mapPoint) : map.setExtent(GetBrowserMapExtent(mapPoint));

    setTimeout(function () {
        screenPoint = map.toScreen(mapPoint);
        screenPoint.y = map.height - screenPoint.y;
        //        if (isMobileDevice)
        //            screenPoint = map.toScreen(mapPoint);
        //        else {
        //            screenPoint = map.toScreen(mapPoint);
        //            screenPoint.y = map.height - screenPoint.y;
        //        }
        map.infoWindow.show(screenPoint);
        //alert(title + " new");
        map.infoWindow.setTitle(title);
        dojo.connect(map.infoWindow.imgDetailsInstance(), "onclick", function () {
            map.infoWindow.hide();
            //                    if (isMobileDevice) {
            //                        selectedMapPoint = null;
            //                        map.infoWindow.hide();
            //                        ShowServiceRequestContainer();
            //                    }
            //                    else {
            //                        map.infoWindow.resize(300, 300);
            //                        screenPoint = map.toScreen(mapPoint);
            //                        screenPoint.y = map.height - screenPoint.y;
            //                        map.infoWindow.reSetLocation(screenPoint);
            //                        dojo.byId('divServiceRequestContent').style.display = "block";
            //                    }
            //                    ServiceRequestDetails(attributes);
        });

        // map.infoWindow.resize(225, 120);
        // dojo.byId('divServiceRequestContent').style.display = "block";
        //ServiceRequestDetails(attributes);
        map.infoWindow.setContent(attributes);
    }, 0);
}
//function to create service request details view
/*function ServiceRequestDetails(attributes) {
    ShowServiceDetailsView();
    RemoveChildren(dojo.byId('tbServiceRequestDetails'));
    RemoveChildren(dojo.byId('divCommentsContent'));

    dojo.byId('tdInfoHeader').innerHTML = dojo.string.substitute(infoWindowHeader, attributes);
    var tbServiceRequestDetails = dojo.byId('tbServiceRequestDetails');
    var tbody = document.createElement("tbody");
    tbServiceRequestDetails.appendChild(tbody);
    for (var index in infoWindowData) {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);
        switch (infoWindowData[index].dataType) {
            case "string":
                CreateTableRow(tr, infoWindowData[index].DisplayText, dojo.string.substitute(infoWindowData[index].AttributeValue, attributes));
                break;
            case "date":
                var epochDate = Number(dojo.string.substitute(infoWindowData[index].AttributeValue, attributes)) + (new Date().getTimezoneOffset() * 60000);
                CreateTableRow(tr, infoWindowData[index].DisplayText, dojo.date.locale.format(new Date(Number(epochDate, attributes)), { datePattern: infoWindowData[index].dateFormat, selector: "date" }));
                break;
        }
    }
    // FetchRequestComments(attributes.REQUESTID);
    // FetchAttachmentDetails(attributes[map.getLayer(serviceRequestLayerId).objectIdField], tbody);
    SetHeightViewDetails();
}*/

//function to fetch attachment details
/*function FetchAttachmentDetails(objectID, tbody) {
    map.getLayer(serviceRequestLayerId).queryAttachmentInfos(objectID, function (files) {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.vAlign = "top";
        var tdTitle = document.createElement("td");
        tdTitle.innerHTML = "Attachment: ";
        tr.appendChild(tdTitle);

        var tdAttachments = document.createElement("td");
        tr.appendChild(tdAttachments);

        if (files.length == 0) {
            tdAttachments.innerHTML = "No Attachment";
        }
        else {
            if (files[0].contentType.indexOf("image") >= 0) {
                var filePreview = dojo.create("img");
                filePreview.style.height = "110px";
                filePreview.style.cursor = "pointer";
                filePreview.src = files[0].url;
                filePreview.onclick = function () {
                    window.open(files[0].url);
                }
                tdAttachments.appendChild(filePreview);
            }
            else {
                var filespan = document.createElement("span");
                filespan.innerHTML = files[0].name;
                filespan.className = 'spanFileDetails';
                tdAttachments.appendChild(filespan);
                filespan.onclick = function () {
                    window.open(files[0].url);
                }
            }
        }
        CreateScrollbar(dojo.byId("divServiceDetailsDetails"), dojo.byId("divServiceRequestDetailsScroll"));
    });
}*/

//Function for sorting comments according to date
function SortResultFeatures(a, b) {
    var x = a.attributes.SUBMITDT;
    var y = b.attributes.SUBMITDT;
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
}

//function to create new service request
/*function SubmitIssueDetails() {
    if (!ValicateRequestData()) {
        return;
    }
    dojo.byId('btnSubmit').disabled = true;
    dojo.byId('spanServiceErrorMessage').style.display = "none";
    ShowProgressIndicator('map');
    var mapPoint = map.getLayer(tempGraphicsLayerId).graphics[0].geometry;
    var referenceDate = new Date(1970, 0, 1);
    var today = new Date();
    var serviceRequestAttributes = {
        "REQUESTTYPE": dojo.byId("txtSelectedRequest").value,
        "COMMENTS": dojo.byId('txtDescription').value.trim(),
        "NAME": dojo.byId('txtName').value.trim(),
        "PHONE": dojo.byId('txtPhone').value,
        "EMAIL": dojo.byId('txtMail').value.trim(),
        "STATUS": "Unassigned",
        "REQUESTDATE": today.getTime() - referenceDate.getTime()
    };
    var serviceRequestGraphic = new esri.Graphic(mapPoint, null, serviceRequestAttributes, null);
    map.getLayer(serviceRequestLayerId).applyEdits([serviceRequestGraphic], null, null, function (addResults) {
        if (addResults[0].success) {
            var objectIdField = map.getLayer(serviceRequestLayerId).objectIdField;
            var requestID = { "REQUESTID": String(addResults[0].objectId) };
            requestID[objectIdField] = addResults[0].objectId;
            var requestGraphic = new esri.Graphic(mapPoint, null, requestID, null);
            map.getLayer(serviceRequestLayerId).applyEdits(null, [requestGraphic], null, function () {
                serviceRequestGraphic.attributes["REQUESTID"] = String(addResults[0].objectId);
                if (dojo.byId('txtFileName').value != "") {
                    map.getLayer(serviceRequestLayerId).addAttachment(addResults[0].objectId, dojo.byId('formFileUplaod'), function (sucess) {
                        ShowServiceRequestDetails(mapPoint, serviceRequestGraphic.attributes);
                        HideProgressIndicator();
                        ResetRequestFields();
                        HideCreateRequestContainer();
                    });
                }
                else {
                    ShowServiceRequestDetails(mapPoint, serviceRequestGraphic.attributes);
                    HideProgressIndicator();
                    ResetRequestFields();
                    HideCreateRequestContainer();
                }

                if (isiOS) {
                    if (enablePhotoUploadiOS) {
                        dojo.byId('divUploadDialogContainer').style.display = 'block';
                        var attachmentURL = serviceRequestLayerURL + "/${0}/addAttachment";
                        var postURL = dojo.string.substitute(attachmentURL, [addResults[0].objectId]);

                        var currentParams = {
                            'callbackURL': escape(window.location),
                            'posturl': escape(postURL),
                            'debug': 'true',
                            'referrername': escape('Service request'),
                            'purpose': escape('Upload Photo')
                        };
                        Picup.convertFileInput('btnAddPhoto', currentParams);
                    }
                }

            }, function (err) {
                dojo.byId('btnSubmit').disabled = false;
                HideProgressIndicator();
                ShowSpanErrorMessage("spanServiceErrorMessage", "Unable to create service request.");
            });
        }
    }, function (err) {
        dojo.byId('btnSubmit').disabled = false;
        HideProgressIndicator();
        ShowSpanErrorMessage("spanServiceErrorMessage", "Unable to create service request.");
    });
}*/

//function to hide upload file dialog for iOS devices
function CloseUploadDialog() {
    dojo.byId('divUploadDialogContainer').style.display = 'none';
}

//function to populate filename
function SetFileName(fileUploadCtl) {
    if (fileUploadCtl.value.lastIndexOf("\\") > 0) {
        dojo.byId('txtFileName').value = fileUploadCtl.value.substring(fileUploadCtl.value.lastIndexOf("\\") + 1);
    }
    else {
        dojo.byId('txtFileName').value = fileUploadCtl.value;
    }
}

//function to add comment
/*function AddRequestComment() {
    var text = dojo.byId('txtComments').value.trim();
    if (text == "") {
        dojo.byId('txtComments').focus();
        ShowSpanErrorMessage('spanCommentError', 'Please enter Comments');
        return;
    }
    if (text.length > 250) {
        dojo.byId('txtComments').focus();
        ShowSpanErrorMessage('spanCommentError', 'Comments should not exceed 250 characters');
        return;
    }
    ShowProgressIndicator('divServiceRequestContainer');
    var commentGraphic = new esri.Graphic();
    var referenceDate = new Date(1970, 0, 1);
    var today = new Date();
    var attr = {
        "REQUESTID": selectedRequestID,
        "COMMENTS": text,
        "SUBMITDT": today.getTime() - referenceDate.getTime(),
        "RANK": Number(dojo.byId('commentRating').value)
    };
    commentGraphic.setAttributes(attr);
    dojo.byId('btnAddComments').disabled = true;
    map.getLayer(serviceRequestCommentsLayerId).applyEdits([commentGraphic], null, null, function (msg) {
        if (msg[0].error) {
        }
        else {
            var table = dojo.query('table', dojo.byId("divCommentsContent"));
            if (table.length > 0) {
                var x = dojo.query("tr[noComments = 'true']", table[0]);
                if (x.length > 0) {
                    RemoveChildren(table[0]);
                }
                var tr = table[0].insertRow(0);
                var commentsCell = document.createElement("td");
                commentsCell.className = "bottomborder";
                var index = dojo.query("tr", table[0]).length;
                if (index) {
                    index = 0;
                }
                commentsCell.appendChild(CreateCommentRecord(attr, index));
                tr.appendChild(commentsCell);
                CreateRatingWidget(dojo.byId('commentRating' + index));
                SetRating(dojo.byId('commentRating' + index), attr.RANK);
            }
        }
        dojo.byId('btnAddComments').disabled = false;
        ResetCommentValues();
        HideProgressIndicator();
        SetHeightComments();
    }, function (err) {
        dojo.byId('btnAddComments').disabled = false;
        HideProgressIndicator();
    });
}*/

//function to fetch comments for a service request
/*function FetchRequestComments(requestID) {
    dojo.byId('btnAddComments').disabled = false;
    selectedRequestID = requestID;
    var query = new esri.tasks.Query();
    query.where = "REQUESTID = '" + requestID + "'";
    query.outFields = ["*"];
    //execute query
    map.getLayer(serviceRequestCommentsLayerId).selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW, function (features) {
        var commentsTable = document.createElement("table");
        commentsTable.style.width = "95%";
        var commentsTBody = document.createElement("tbody");
        commentsTable.appendChild(commentsTBody);
        dojo.byId("divCommentsContent").appendChild(commentsTable);
        if (features.length > 0) {
            features.sort(SortResultFeatures);      //function to sort comments based on submitted date
            for (var i = 0; i < features.length; i++) {
                var trComments = document.createElement("tr");
                var commentsCell = document.createElement("td");
                commentsCell.className = "bottomborder";
                commentsCell.appendChild(CreateCommentRecord(features[i].attributes, i));
                trComments.appendChild(commentsCell);
                commentsTBody.appendChild(trComments);
                CreateRatingWidget(dojo.byId('commentRating' + i));
                SetRating(dojo.byId('commentRating' + i), features[i].attributes.RANK);
            }
            SetHeightComments();
        }
        else {
            var trComments = document.createElement("tr");
            var commentsCell = document.createElement("td");
            commentsCell.appendChild(document.createTextNode("No comments available"));
            trComments.setAttribute("noComments", "true");
            trComments.appendChild(commentsCell);
            commentsTBody.appendChild(trComments);
        }
    }, function (err) {
    });
}*/

//function to create comment record
/*function CreateCommentRecord(attributes, i) {
    var table = document.createElement("table");
    table.style.width = "100%";
    var tbody = document.createElement("tbody");
    var tr = document.createElement("tr");
    tbody.appendChild(tr);

    var td = document.createElement("td");
    var td3 = document.createElement("td");
    td.innerHTML = "Importance: ";
    td.style.width = "80px";
    td3.align = "left";
    td3.appendChild(CreateRatingControl(true, "commentRating" + i, 0, 5));

    var trDate = document.createElement("tr");
    tbody.appendChild(trDate);

    var td1 = document.createElement("td");
    var epochDate = Number(attributes.SUBMITDT) + (new Date().getTimezoneOffset() * 60000);
    td1.innerHTML = "Date: " + dojo.date.locale.format(new Date(epochDate), { datePattern: commentDateFormat, selector: "date" });
    td1.align = "left";
    td1.colSpan = 2;

    tr.appendChild(td);
    tr.appendChild(td3);
    trDate.appendChild(td1);

    var tr1 = document.createElement("tr");
    var td2 = document.createElement("td");
    td2.colSpan = 2;
    if (attributes.COMMENTS) {
        td2.appendChild(document.createTextNode(attributes.COMMENTS));
    }
    else {
        td2.innerHTML = "N/A";
    }
    td2.className = "tdBreakWord";
    tr1.appendChild(td2);
    tbody.appendChild(tr1);

    table.appendChild(tbody);
    return table;
}*/

//function to create table row 
/*function CreateTableRow(tr, displayName, value) {
    var td = document.createElement("td");
    td.innerHTML = displayName;
    td.style.height = "18px";
    td.style.width = "120px";
    td.vAlign = "top";
    td.style.paddingTop = "5px";

    var td1 = document.createElement("td");
    td1.style.width = "180px";
    td1.innerHTML = value;
    tr.appendChild(td);
    tr.appendChild(td1);
}*/

//function to reset comments data
function ResetCommentValues() {
    dojo.byId('txtComments').value = "";
    SetRating(dojo.byId('commentRating'), 0);
    dojo.byId('spanCommentError').style.display = "none";

    dojo.byId('divAddComment').style.display = "none";
    dojo.byId('divCommentsView').style.display = "block";
    dojo.byId('divCommentsList').style.display = "block";
}

function ShowMenu() {
    var menu = $('#tdDropDownMenu');
    dojo.byId('trOptions').style.display = "block";
    menu.animate({ top: '+=36' }, 1000);
}
function HideMenu() {
    var menu = $('#tdDropDownMenu');
    $('#trOptions').hide();
    menu.animate({ top: '-=36' }, 1000);
}

function ShowHideMenu() {
    var menu = $('#tdDropDownMenu');
    if (app.IsMenuShowed) {
        //dojo.byId('trOptions').style.display = "none";
        dojo.byId('divLayerVisibleContainer').className = "hideLayerVisibleHeight";
        dojo.byId('divLayerVisibleContainer').style.height = '0px';
        dojo.byId('divLayerContainer').className = "hideContainerHeight";
        dojo.byId('divLayerContainer').style.height = '0px';
        $('#trOptions').hide();
        menu.animate({ top: '-=36' }, 1000);
    } else {
        dojo.byId('trOptions').style.display = "block";
        menu.animate({ top: '+=36' }, 1000);
        
    }
    app.IsMenuShowed = !app.IsMenuShowed;
    
}
//function to turn County layer on
function changeLayer() {
    var str = $('#queryLayers').val();
    //map.removeLayer(countiesLyr);
    //map.removeLayer(regionsLyr);
    //map.removeLayer(outageLyr);
    //map.removeLayer(customerOutagesLyr);

    countiesLyr.hide();
    regionsLyr.hide();
    outageLyr.hide();
    customerOutagesLyr.hide();

    getOutages();
    if (app.locations) {
        getOutageCustomerLocations(app.locations);
    }
    //if (str == "Region") {
    if ($('#rRegion').is(':checked')){
        getRegions();
//        map.addLayer(regionsLyr);
//        map.addLayer(outageLyr);
        //        map.addLayer(customerOutagesLyr);
        regionsLyr.show();
        outageLyr.show();
        customerOutagesLyr.show();
        $('#rCounty').removeAttr("checked");
        dojo.forEach(regionsLyr.graphics, function (graphic) {
            graphic.setSymbol(defaultRegionsSymbol);
        });
    } else if ($('#rCounty').is(':checked')) {
        getCounties();
//        map.addLayer(countiesLyr);
//        map.addLayer(outageLyr);
        //        map.addLayer(customerOutagesLyr);
        countiesLyr.show();
        outageLyr.show();
        customerOutagesLyr.show();
        dojo.forEach(countiesLyr.graphics, function (graphic) {
            graphic.setSymbol(defaultCountiesSymbol);
        });
    } else {
//        map.addLayer(outageLyr);
        //        map.addLayer(customerOutagesLyr);
        outageLyr.show();
        customerOutagesLyr.show();
    }
}
//function to animate basemap switch
function ShowLayerMaps() {
    //$('.divLayerVisibleContainer').show();
    //dojo.byId('divLayerVisibleContainer').style.display = "block";
    //alert("test layers");
    //var cellHeight = (isMobileDevice) ? 55 : 60;
    if (dojo.byId('divLayerVisibleContainer').className == "showLayerVisibleHeight") {
        dojo.byId('divLayerVisibleContainer').className = "hideLayerVisibleHeight";
        dojo.byId('divLayerVisibleContainer').style.height = '0px';
//        $('.divLayerVisibleContainer').hide();
        //dojo.byId('divLayerVisibleContainer').style.display = "none";
    }
    else {
        dojo.byId('divLayerVisibleContainer').style.height = '120px'; // Math.ceil(baseMapLayerCollection.length / 2) * cellHeight + "px";
        dojo.byId('divLayerVisibleContainer').style.top = '10em';
        dojo.byId('divLayerVisibleContainer').className = "showLayerVisibleHeight";
//        $('.divLayerVisibleContainer').show();
        //dojo.byId('divLayerVisibleContainer').style.display = "block";
    }
}

//function to animate basemap switch
function ShowBaseMaps() {
    var cellHeight = (isMobileDevice) ? 108 : 115;
    if (dojo.byId('divLayerContainer').className == "showContainerHeight") {
        dojo.byId('divLayerContainer').className = "hideContainerHeight";
        dojo.byId('divLayerContainer').style.height = '0px';
    }
    else {
        dojo.byId('divLayerContainer').style.height = '150px'; // Math.ceil(baseMapLayerCollection.length / 2) * cellHeight + "px";
        dojo.byId('divLayerContainer').className = "showContainerHeight";
    }
}

//function to show comments view 
function ShowCommetsView() {
    ResetCommentValues();
    dojo.byId('divServiceRequestComments').style.display = "block";
    dojo.byId('divServiceDetailsDetails').style.display = "none";
    SetHeightComments();
}

//function to show Service request details view
function ShowServiceDetailsView() {
    dojo.byId('divServiceRequestComments').style.display = "none";
    dojo.byId('divServiceDetailsDetails').style.display = "block";
}

//function to hide service request container
function HideServiceRequestContainer() {
    selectedMapPoint = null;
    if (isMobileDevice) {
        setTimeout(function () {
            dojo.byId('divServiceRequestContainer').style.display = "none";
        }, 500);
        dojo.byId('divServiceRequestContent').className = "hideContainer";
    }
    else {
        map.infoWindow.hide();
        dojo.byId('divServiceRequestContent').style.display = "none";
    }
}

//function to hide splash screen container
function HideSplashScreenMessage() {
    dojo.byId('divSplashScreenContainer').style.display = "none";
    //dojo.byId('divSplashScreenContainer').className = "opacityHideAnimation";
    dojo.byId('divSplashScreenContent').className = "hideContainer";
}

//function to show service request container
function ShowServiceRequestContainer() {
    dojo.byId('divServiceRequestContainer').style.display = "block";
    dojo.byId('divServiceRequestContent').className = "showContainer";
}

//function to showe address container
function ShowLocateContainer() {
    //    if (isMobileDevice) {
    //        dojo.byId('divAddressContainer').style.display = "block";
    //        dojo.byId('divAddressContent').className = "showContainer";
    //    }
    //    else {
    dojo.byId('divAddressContainer').className = "opacityShowAnimation";
    dojo.byId('divAddressContent').className = "showContainer";
    //}
   // RemoveChildren(dojo.byId('tblAddressResults'));
    //SetHeightAddressResults();
}

//function to hide address container
function HideAddressContainer() {
    //    if (isMobileDevice) {
    //        setTimeout(function () {
    //            dojo.byId('divAddressContainer').style.display = "none";
    //        }, 500);
    //        dojo.byId('divAddressContent').className = "hideContainer";
    //    }
    //    else {
    dojo.byId('divAddressContainer').className = "opacityHideAnimation";
    dojo.byId('divAddressContent').className = "hideContainer";
    // }
}

//function to hide create request container
function HideCreateRequestContainer() {
    map.getLayer(tempGraphicsLayerId).clear();
    map.infoWindow.hide();
    if (isMobileDevice) {
        setTimeout(function () {
            dojo.byId('divCreateRequest').style.display = "none";
        }, 500);
        dojo.byId('divCreateRequestContainer').className = "hideContainer";
    }
    else {
        dojo.byId('divCreateRequestContainer').style.display = "none";
    }
}

//function to show create request container
function ShowCreateRequestContainer() {
    dojo.byId('divCreateRequest').style.display = "block";
    dojo.byId('divCreateRequestContainer').className = "showContainer";
}

//function to show toggle request types 
function ToggleRequestTypesList() {
    dojo.byId('divRequestTypes').style.display = (dojo.byId('divRequestTypes').style.display == "block") ? "none" : "block";
    CreateScrollbar(dojo.byId('divScrollBarContainer'), dojo.byId('divScrollBarContent'));
}

//function to show add comments view
/*function ShowAddCommentsView() {
    if (selectedRequestStatus == "Unassigned") {
        dojo.byId('divAddComment').style.display = "block";
        dojo.byId('divCommentsView').style.display = "none";
        dojo.byId('divCommentsList').style.display = "none";
    }
    else {
        alert('Adding comments are only available for Unassigned requests');
    }
}*/

//function to populate request type data
/*function CreateRequestTypesList(serviceRequestLayerFields) {
    var serviceRequestFields;
    for (var i = 0; i < serviceRequestLayerFields.length; i++) {
        if (serviceRequestLayerFields[i].name == "REQUESTTYPE") {
            serviceRequestFields = serviceRequestLayerFields[i].domain.codedValues;
            break;
        }
    }

    var table = document.createElement("table");
    var tBody = document.createElement("tbody");
    table.appendChild(tBody);
    table.cellSpacing = 0;
    table.cellPadding = 0;
    for (var i = 0; i < serviceRequestFields.length; i++) {
        var tr = document.createElement("tr");
        tBody.appendChild(tr);
        var td = document.createElement("td");
        td.style.height = "20px";
        td.style.paddingLeft = "5px";
        td.align = "left";
        td.style.cursor = "pointer";
        td.innerHTML = serviceRequestFields[i].name;
        td.onclick = function () {
            dojo.byId('txtSelectedRequest').value = this.innerHTML;
            dojo.byId('divRequestTypes').style.display = "none";
        }
        tr.appendChild(td);
    }
    var scrollbar_container = document.createElement('div');
    scrollbar_container.id = "divScrollBarContainer";
    scrollbar_container.className = "scrollbar_container";

    var container = document.createElement("div");
    container.id = "divScrollBarContent";
    container.className = 'scrollbar_content';

    container.appendChild(table);

    scrollbar_container.appendChild(container);
    dojo.byId('divRequestTypes').appendChild(scrollbar_container);
}*/

//function to locate using GPS
function ShowMyLocation() {
    if (navigator.geolocation) {
        ShowProgressIndicator('map');
        navigator.geolocation.getCurrentPosition(
		function (position) {
		    var mapPoint = new esri.geometry.Point(position.coords.longitude, position.coords.latitude, new esri.SpatialReference({ wkid: 4326 }));
		    var graphicCollection = new esri.geometry.Multipoint(new esri.SpatialReference({ wkid: 4326 }));
		    graphicCollection.addPoint(mapPoint);
		    geometryService.project([graphicCollection], map.spatialReference, function (newPointCollection) {
		        HideProgressIndicator();
		        if (!map.getLayer(baseMapLayerCollection[0].Key).fullExtent.contains(mapPoint)) {
		            alert('Data not available for the specified address.');
		            return;
		        }
		        mapPoint = newPointCollection[0].getPoint(0);
		        AddServiceRequest(mapPoint);
		    });
		},
		function (error) {
		    HideProgressIndicator();
		    switch (error.code) {
		        case error.TIMEOUT:
		            alert('Timeout');
		            break;
		        case error.POSITION_UNAVAILABLE:
		            alert('Position unavailable');
		            break;
		        case error.PERMISSION_DENIED:
		            alert('Permission denied');
		            break;
		        case error.UNKNOWN_ERROR:
		            alert('Unknown error');
		            break;
		    }
		});
    }
    else {
        alert('Browser donot support GeoLocation');
    }
}

//function to create rating control
function CreateRatingControl(readonly, ctlId, intitalValue, numStars) {
    var ratingCtl = document.createElement("ul");
    ratingCtl.setAttribute("readonly", readonly);
    ratingCtl.id = ctlId;
    ratingCtl.setAttribute("value", intitalValue);
    ratingCtl.setAttribute("numStars", numStars);
    ratingCtl.style.padding = 0;
    ratingCtl.style.margin = 0;
    return ratingCtl;
}

//function to create Rating widget
/*function CreateRatingWidget(rating) {
    var numberStars = Number(rating.getAttribute("numstars"));
    var isReadOnly = String(rating.getAttribute("readonly")).bool();

    for (var i = 0; i < numberStars; i++) {
        var li = document.createElement("li");
        li.value = (i + 1);
        li.className = isReadOnly ? "ratingStar" : "ratingStarBig";
        rating.appendChild(li);

        if (i < rating.value) {
            dojo.addClass(li, isReadOnly ? "ratingStarChecked" : "ratingStarBigChecked");
        }

        li.onmouseover = function () {
            if (!isReadOnly) {
                var ratingValue = Number(this.value);
                var ratingStars = dojo.query(isReadOnly ? ".ratingStar" : ".ratingStarBig", rating);
                for (var i = 0; i < ratingValue; i++) {
                    dojo.addClass(ratingStars[i], isReadOnly ? "ratingStarChecked" : "ratingStarBigChecked");
                }
            }
        }

        li.onmouseout = function () {
            if (!isReadOnly) {
                var ratings = Number(rating.value);
                var ratingStars = dojo.query(isReadOnly ? ".ratingStar" : ".ratingStarBig", rating);
                for (var i = 0; i < ratingStars.length; i++) {
                    if (i < ratings) {
                        dojo.addClass(ratingStars[i], isReadOnly ? "ratingStarChecked" : "ratingStarBigChecked");
                    }
                    else {
                        dojo.removeClass(ratingStars[i], isReadOnly ? "ratingStarChecked" : "ratingStarBigChecked");
                    }
                }
            }
        }

        li.onclick = function () {
            if (!isReadOnly) {
                rating.value = Number(this.value);
                var ratingStars = dojo.query(isReadOnly ? ".ratingStar" : ".ratingStarBig", rating);
                for (var i = 0; i < ratingStars.length; i++) {
                    if (i < this.value) {
                        dojo.addClass(ratingStars[i], isReadOnly ? "ratingStarChecked" : "ratingStarBigChecked");
                    }
                    else {
                        dojo.removeClass(ratingStars[i], isReadOnly ? "ratingStarChecked" : "ratingStarBigChecked");
                    }
                }
            }
        }
    }
}*/

//Set rating for rating control
/*function SetRating(control, rating) {
    control.value = rating;
    var isReadOnly = String(control.getAttribute("readonly")).bool();
    var ratingStars = dojo.query(isReadOnly ? ".ratingStar" : ".ratingStarBig", control);
    for (var i = 0; i < ratingStars.length; i++) {
        if (i < rating) {
            dojo.addClass(ratingStars[i], isReadOnly ? "ratingStarChecked" : "ratingStarBigChecked");
        }
        else {
            dojo.removeClass(ratingStars[i], isReadOnly ? "ratingStarChecked" : "ratingStarBigChecked");
        }
    }
}*/

//function to convert string to bool
String.prototype.bool = function () {
    return (/^true$/i).test(this);
};

//function to trim string
String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ''); }

//Function to append ... for a string
String.prototype.trimString = function (len) {
    return (this.length > len) ? this.substring(0, len) + "..." : this;
}

//Creating dynamic scrollbar within container for target content
var scrolling = false; //flag to detect is touchmove event scrolling div

function CreateScrollbar(container, content) {
    var yMax;
    var pxLeft, pxTop, xCoord, yCoord;
    var scrollbar_track;
    var isHandleClicked = false;
    this.container = container;
    this.content = content;
    content.scrollTop = 0;
    if (dojo.byId(container.id + 'scrollbar_track')) {
        RemoveChildren(dojo.byId(container.id + 'scrollbar_track'));
        container.removeChild(dojo.byId(container.id + 'scrollbar_track'));
    }
    if (!dojo.byId(container.id + 'scrollbar_track')) {
        scrollbar_track = document.createElement('div');
        scrollbar_track.id = container.id + "scrollbar_track";
        scrollbar_track.className = "scrollbar_track";
    }
    else {
        scrollbar_track = dojo.byId(container.id + 'scrollbar_track');
    }

    var containerHeight = dojo.coords(container);
    scrollbar_track.style.height = (containerHeight.h - 6) + "px";
    scrollbar_track.style.right = 0 + 'px';

    var scrollbar_handle = document.createElement('div');
    scrollbar_handle.className = 'scrollbar_handle';
    scrollbar_handle.id = container.id + "scrollbar_handle";

    scrollbar_track.appendChild(scrollbar_handle);
    container.appendChild(scrollbar_track);

    if (content.scrollHeight <= content.offsetHeight) {
        scrollbar_handle.style.display = 'none';
        scrollbar_track.style.display = 'none';
        return;
    }
    else {
        scrollbar_handle.style.display = 'block';
        scrollbar_track.style.display = 'block';
        scrollbar_handle.style.height = Math.max(this.content.offsetHeight * (this.content.offsetHeight / this.content.scrollHeight), 25) + 'px';
        yMax = this.content.offsetHeight - scrollbar_handle.offsetHeight;
        yMax = yMax - 5; //for getting rounded bottom of handel
        if (window.addEventListener) {
            content.addEventListener('DOMMouseScroll', ScrollDiv, false);
        }

        content.onmousewheel = function (evt) {
            console.log(content.id);
            ScrollDiv(evt);
        }
    }

    function ScrollDiv(evt) {
        var evt = window.event || evt //equalize event object
        var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta //delta returns +120 when wheel is scrolled up, -120 when scrolled down
        pxTop = scrollbar_handle.offsetTop;

        if (delta <= -120) {
            var y = pxTop + 10;
            if (y > yMax) y = yMax // Limit vertical movement
            if (y < 0) y = 0 // Limit vertical movement
            scrollbar_handle.style.top = y + "px";
            content.scrollTop = Math.round(scrollbar_handle.offsetTop / yMax * (content.scrollHeight - content.offsetHeight));
        }
        else {
            var y = pxTop - 10;
            if (y > yMax) y = yMax // Limit vertical movement
            if (y < 0) y = 0 // Limit vertical movement
            scrollbar_handle.style.top = (y - 2) + "px";
            content.scrollTop = Math.round(scrollbar_handle.offsetTop / yMax * (content.scrollHeight - content.offsetHeight));
        }
    }

    //Attaching events to scrollbar components
    scrollbar_track.onclick = function (evt) {
        if (!isHandleClicked) {
            evt = (evt) ? evt : event;
            pxTop = scrollbar_handle.offsetTop // Sliders vertical position at start of slide.
            var offsetY;
            if (!evt.offsetY) {
                var coords = dojo.coords(evt.target);
                offsetY = evt.layerY - coords.t;
            }
            else
                offsetY = evt.offsetY;
            if (offsetY < scrollbar_handle.offsetTop) {
                scrollbar_handle.style.top = offsetY + "px";
                content.scrollTop = Math.round(scrollbar_handle.offsetTop / yMax * (content.scrollHeight - content.offsetHeight));
            }
            else if (offsetY > (scrollbar_handle.offsetTop + scrollbar_handle.clientHeight)) {
                var y = offsetY - scrollbar_handle.clientHeight;
                if (y > yMax) y = yMax // Limit vertical movement
                if (y < 0) y = 0 // Limit vertical movement
                scrollbar_handle.style.top = y + "px";
                content.scrollTop = Math.round(scrollbar_handle.offsetTop / yMax * (content.scrollHeight - content.offsetHeight));
            }
            else {
                return;
            }
        }
        isHandleClicked = false;
    };

    //Attaching events to scrollbar components
    scrollbar_handle.onmousedown = function (evt) {
        isHandleClicked = true;
        evt = (evt) ? evt : event;
        evt.cancelBubble = true;
        if (evt.stopPropagation) evt.stopPropagation();
        pxTop = scrollbar_handle.offsetTop // Sliders vertical position at start of slide.
        yCoord = evt.screenY // Vertical mouse position at start of slide.
        document.body.style.MozUserSelect = 'none';
        document.body.style.userSelect = 'none';
        document.onselectstart = function () {
            return false;
        }
        document.onmousemove = function (evt) {
            evt = (evt) ? evt : event;
            evt.cancelBubble = true;
            if (evt.stopPropagation) evt.stopPropagation();
            var y = pxTop + evt.screenY - yCoord;
            if (y > yMax) y = yMax // Limit vertical movement
            if (y < 0) y = 0 // Limit vertical movement
            scrollbar_handle.style.top = (y - 2) + "px";
            content.scrollTop = Math.round(scrollbar_handle.offsetTop / yMax * (content.scrollHeight - content.offsetHeight));
        }
    };

    document.onmouseup = function () {
        document.body.onselectstart = null;
        document.onmousemove = null;
    };

    scrollbar_handle.onmouseout = function (evt) {
        document.body.onselectstart = null;
    };

    var startPos;
    var scrollingTimer;

    dojo.connect(container, "touchstart", function (evt) {
        touchStartHandler(evt);
    });

    dojo.connect(container, "touchmove", function (evt) {
        touchMoveHandler(evt);
    });

    dojo.connect(container, "touchend", function (evt) {
        touchEndHandler(evt);
    });

    //Handlers for Touch Events
    function touchStartHandler(e) {
        startPos = e.touches[0].pageY;
    }

    function touchMoveHandler(e) {
        var touch = e.touches[0];
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        e.preventDefault();

        pxTop = scrollbar_handle.offsetTop;
        var y;
        if (startPos > touch.pageY) {
            y = pxTop + 10;
        }
        else {
            y = pxTop - 10;
        }

        //setting scrollbar handel
        if (y > yMax) y = yMax // Limit vertical movement
        if (y < 0) y = 0 // Limit vertical movement
        scrollbar_handle.style.top = y + "px";

        //setting content position
        content.scrollTop = Math.round(scrollbar_handle.offsetTop / yMax * (content.scrollHeight - content.offsetHeight));

        scrolling = true;
        startPos = touch.pageY;
    }

    function touchEndHandler(e) {
        scrollingTimer = setTimeout(function () { clearTimeout(scrollingTimer); scrolling = false; }, 100);
    }
    //touch scrollbar end 
}

//function to validate service request data
/*function ValicateRequestData() {
    if (dojo.byId("txtSelectedRequest").value.trim() == "") {
        ShowSpanErrorMessage("spanServiceErrorMessage", "Please select request type");
        return false;
    }
    if (dojo.byId('txtDescription').value.trim().length > 0 && dojo.byId('txtDescription').value.trim().length > 255) {
        dojo.byId('txtDescription').focus();
        ShowSpanErrorMessage("spanServiceErrorMessage", "Comment exceeds the maximum length of 255 characters");
        return false;
    }
    if (dojo.byId('txtName').value.length > 0) {
        if (!IsName(dojo.byId('txtName').value.trim())) {
            dojo.byId('txtName').focus();
            ShowSpanErrorMessage("spanServiceErrorMessage", 'Name accepts alphabets, space, ".", "-"');
            return false;
        }
    }
    if (dojo.byId('txtMail').value == '' && dojo.byId('txtPhone').value == '') {
        ShowSpanErrorMessage("spanServiceErrorMessage", "Email or Phone number is required");
        return;
    }
    if (dojo.byId('txtPhone').value == '') {
        if (!CheckMailFormat(dojo.byId('txtMail').value)) {
            dojo.byId('txtMail').focus();
            ShowSpanErrorMessage("spanServiceErrorMessage", "Please enter valid Email ID");
            return false;
        }
    }
    else if (dojo.byId('txtMail').value == '') {
        if (!IsPhoneNumber(dojo.byId('txtPhone').value.trim())) {
            dojo.byId('txtPhone').focus();
            ShowSpanErrorMessage("spanServiceErrorMessage", "Please enter valid Phone number");
            return false;
        }
        if (dojo.byId('txtPhone').value.length != 10) {
            dojo.byId('txtPhone').focus();
            ShowSpanErrorMessage("spanServiceErrorMessage", "Please enter 10 digit phone number");
            return false;
        }
    }
    if (dojo.byId('txtMail').value.length > 0) {
        if (!CheckMailFormat(dojo.byId('txtMail').value)) {
            dojo.byId('txtMail').focus();
            ShowSpanErrorMessage("spanServiceErrorMessage", "Please enter valid Email ID");
            return false;
        }
    }
    if (dojo.byId('txtPhone').value.length > 0) {
        if (!IsPhoneNumber(dojo.byId('txtPhone').value.trim())) {
            dojo.byId('txtPhone').focus();
            ShowSpanErrorMessage("spanServiceErrorMessage", "Please enter valid Phone number");
            return false;
        }
    }
    if (dojo.byId('txtFileName').value.length > 0) {
        if (typeof FileReader !== "undefined") {
            var size = (dojo.byId('fileUploadControl').files[0].size) / 1024;
            if (size >= 5120) {
                ShowSpanErrorMessage("spanServiceErrorMessage", "File size should be less than 5(MB)");
                return false;
            }
        }
    }
    return true;
}*/

//Function for validating Email in comments tab
/*function CheckMailFormat(emailValue) {
    var pattern = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/;
    if (pattern.test(emailValue)) {
        return true;
    } else {
        return false;
    }
}*/

//function to validate name
function IsName(name) {
    var namePattern = /^[A-Za-z\.\- ]{1,150}$/;
    if (namePattern.test(name)) {
        return true;
    } else {
        return false;
    }
}

//function to validate 10 digit number
function IsPhoneNumber(value) {
    var namePattern = /\d{10}/;
    if (namePattern.test(value)) {
        return true;
    } else {
        return false;
    }
}

//function to set height and create scroll bar for comments
function SetHeightComments() {
    var height = (isMobileDevice) ? map.height : dojo.coords(dojo.byId('divServiceRequestContent')).h;
    dojo.byId('divCommentsContent').style.height = (height - 100) + "px";
    CreateScrollbar(dojo.byId("divCommentsContainer"), dojo.byId("divCommentsContent"));
}

//function to set height for create request container
function SetHeightCreateRequest() {
    var height = (isMobileDevice) ? (map.height) : dojo.coords(dojo.byId('divCreateRequestScrollContent')).h;
    dojo.byId('divCreateRequestScrollContent').style.height = (height - 55) + "px";
    dojo.byId('divCreateRequestContainer').style.height = (height) + "px";
    CreateScrollbar(dojo.byId("divCreateRequestContent"), dojo.byId("divCreateRequestScrollContent"));
}

//function to set height for view details
/*function SetHeightViewDetails() {
   // var height = (isMobileDevice) ? map.height : dojo.coords(dojo.byId('divServiceRequestContent')).h;
    //dojo.byId('divServiceRequestDetailsScroll').style.height = (250 - 50) + "px";
    //CreateScrollbar(dojo.byId("divServiceDetailsDetails"), dojo.byId("divServiceRequestDetailsScroll"));
}*/

//function to set height for splash screen
function SetHeightSplashScreen() {
    var height = (isMobileDevice) ? (map.height - 100) : (dojo.coords(dojo.byId('divSplashScreenContent')).h - 50);
    dojo.byId('divSplashContent').style.height = height + "px";
    CreateScrollbar(dojo.byId("divSplashContainer"), dojo.byId("divSplashContent"));
}

//function to reset mapposition
function SetMapTipPosition() {
    alert(tempGraphicsLayerId);
    if (map.getLayer(tempGraphicsLayerId)) {
        if (map.getLayer(tempGraphicsLayerId).graphics.length > 0) {
            if (map.getLayer(tempGraphicsLayerId).graphics[0].attributes) {
                return;
            }
            var mapPoint;
            alert(map.getLayer(tempGraphicsLayerId).graphics[0].geometry.type());
            // if(map.getLayer(tempGraphicsLayerId).graphics[0].geometry is MapPoint)
            var mapPoint = map.getLayer(tempGraphicsLayerId).graphics[0].geometry.center();
            var screenPoint = map.toScreen(mapPoint);
            screenPoint.y = map.height - screenPoint.y;
            map.infoWindow.setLocation(screenPoint);
            return;
        }
        if (selectedMapPoint) {
            var screenPoint = map.toScreen(selectedMapPoint);
            screenPoint.y = map.height - screenPoint.y;
            map.infoWindow.setLocation(screenPoint);
        }
    }
}