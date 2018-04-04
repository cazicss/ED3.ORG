//"use strict";
define([
    "esri/map",
    "esri/dijit/Geocoder",
    "esri/layers/osm",
    "dojo/dom",
    "dojo/domReady!",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/on",
    "dojo/parser",
    "dojo/_base/array",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/TitlePane",
    "dojo/_base/window",
    "dojo/_base/lang",
    "gis/dijit/Growler",
    "gis/dijit/GeoLocation",
    "dojo/text!./templates/mapOverlay.html",
    "esri/tasks/GeometryService",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    "esri/geometry/Polyline",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/SpatialReference",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/geometry/Extent",
    "datagrid/DataGrid",
    "esri/renderers/SimpleRenderer",
    "esri/InfoTemplate",
    "dojo/date",
    "dojo/date/locale",
    "dijit/layout/TabContainer",
    "esri/tasks/ProjectParameters",
    "esri/graphicsUtils",
    "dojo/Evented",
    "dijit/form/Button",
    "esri/dijit/InfoWindow",
    "dojo/_base/connect",
    "esri/dijit/LocateButton",
    "esri/virtualearth/VETiledLayer",
    "dojox/xml/parser",
    "dijit/Dialog",
    "esri/Color",

], function (Map, Geocoder, osm, dom, domReady, domConstruct, Style, domClass, on, parser, array, BorderContainer,
         ContentPane, TitlePane, win, lang, Growler, GeoLocation, mapOverlay, GeometryService, Point, Polygon, Polyline, Graphic, GraphicsLayer, FeatureLayer,
        SpatialReference, SimpleMarkerSymbol, PictureMarkerSymbol, Extent, DataGrid, SimpleRenderer, InfoTemplate, date, locale, TabContainer,
        ProjectParameters, graphicsUtils, Evented, Button, InfoWindow, Connect, LocateButton, VETiledLayer, dojoxParser, Dialog, Color) {

    return {
        // self: '',
        app: {},
        AffectedRegions: '',
        AffectedCounties: '',
        AutoRefreshInterval: '',
        AerialMapServiceLayerURL: '',
        map: '',
        bingToken: '',
        bingMapsKey: '',
        CallBundleInfo: '',
        //Navbar: '',
        CaseNumber: '',
        Cause: '',
        CauseLabelVisible: 'false',
        chkRegions: '',
        chkCounties: '',
        counties: [],
        countiesGrid: '',
        countyFillColor: '',
        countyFillOpacity: '',
        countyBoundaryThickness: '',
        CountyInfo: '',
        countyBoundaryColor: '',
        countyTitle: '',
        countyMaptipHeader: '',
        CountyNameFieldLabel: '',
        countiesLyr: '',
        CustomersAffectedLabelVisible: 'false',
        customerOutagesLyr: '',
        CustomerOutageInfo: '',
        CustomersAffected: '',
        CustomersServedFieldLabel: '',
        callBundleLyr: '',
        detailsPanel: '',
        defaultExtent: '',
        Est_Resto_DateTimeLabelVisible: 'false',
        ElementNameLabel: '',
        EndTime: '',
        esriLogoVisible: '',
        editorLayerInfos: [],
        outerBorderContainer: '',
        innerBorderContainer: '',
        //toolsPanel: '',
        legendLayerInfos: [],
        layersPanel: '',
        dataGridPanel: '',
        // widgetsInitialized: false,
        panelAnimationInterval: 300,
        //        rightSidebarTargetWidth: 330,
        //        leftSidebarTargetWidth: 330,
        dataGridWrapperTargetHeight: ((navigator.userAgent.match(/iPad/i) != null) ? 200 : 325),
        //graphicsLayer: '',
        currentGraphic: '',

        self: this,
        outageLyr: '',

        disableoldestOutage: '',
        disablePercentageInService: '',
        defaultRegionsSymbol: '',
        defaultCountiesSymbol: '',
        ElementNameLabelVisible: 'false',
        locationLyr: '',
        hilightSymbol: '',

        highlightGraphicViewName: '',
        highlightGraphicPoint: '',
        highlightGraphicPolyline: '',
        highlightGraphicPolygon: '',
        isLightsByCustomerSearch: false,
        LegendLabel: '',
        loaded: false,
        LastUpdateTime: '',
        mobileAutoRefreshInterval: '',
        mapExtent: '',
        NextUpdateTime: '',
        oldestOutageTime: '',
        OutageInfo: '',
        OutageStatusFieldLabel: '',
        OutageStatusLabelVisible: 'false',
        OutageDetails: [],
        outageDetailsGrid: '',
        PastOutageOptions: '',
        PastOutage: [],
        pastOutagesGrid: '',
        PercentageOutageVisible: '',
        PercentageOutageFieldLabel: '',
        PoleNumberFieldLabel: '',
        PoleNumberLabelVisible: 'false',
        regionsLyr: '',
        regions: [],
        RegionInfo: '',
        regionsGrid: '',
        regionFillColor: '',
        regionFillOpacity: '',
        RegionNameFieldLabel: '',
        regionBoundaryThickness: '',
        regionBoundaryColor: '',
        regionTitle: '',
        regionMaptipHeader: '',
        RestorationTimeFieldLabel: '',
        RoadMapServiceLayerURL: '',
        tiledMapServiceLayer: '',
        securityEnabled: '',
        showOutages: '',
        showCallBundles: '',
        showPastOutage: '',
        showRegions: '',
        showCounties: '',
        showCallBundles: '',
        StartTime: '',
        totalCustomers: '',
        totalCustAffected: '',
        tokenString: '',
        userConfig: '',
        veTileLayer: null,
        veRoadLayer: '',
        webmapTitle: '',
        webmapType: '',
        webmapMode: '',
        zoomStartLevel: '',
        zoomEndLevel: '',
        //######BOOTSTRAP MODAL VARS########
        webmapModalMessage: '',
        webmapModalType: '',
        webmapModalTimeout: '',
        webmapModalTimeoutDuration: '',
        //######MAX/MIN ZOOM VARS#####
        webmapMaxZoom: '',
        webmapMinZoom: '',
        //######BANNER/LOGO VARS######
        webmapBannerImage: '',
        webmapLogoImage: '',
        webmapTitleColor: '',
        webmapBackgroundColor: '',
        //######OUTAGE REPORTING VARS######
        showOutageReporting: '',
        outageReportingURL: '',
        enableOutageCallbacks: '',
        outageURLuser: '',
        outageURLpass: '',
        outageEventTime: '',
        outageTruckCrewDetails: '',
        enableSSL: '',
        googleAnalytics: '',
        googleID: '',
        enablePulse: '',
 
        startup: function () {
            //alert("hello");
            self = this;
            this.initConfig();
        },
        initConfig: function () {
            //this._showWorkingFeedback(true, "loading...");
            // this.initView();
            this.RegionInfo = "";
            this.CountyInfo = "";
            this.OutageInfo = "";
            this.CustomerOutageInfo = "<b>Customers Affected: </b> ${CustomersAffected} <br/><b>Outage Time: </b>${OutageTime}<br/><b>ETOR: </b>${ETOR} <br/><br/><table width='100%' border='0' style='font-size:10px;'><tr><td rowspan='3' style='font-size:12px;'><b>Weather:</b></td><td>Temp:  ${Temp} </td><td rowspan='2'><img src='${Icon}' width='32' height='32' /></td></tr><tr><td>Wind: ${Wind} </td></tr><tr><td>Rain: ${Precip} </td><td>${Desc} </td></tr></table>";
            this.CallBundleInfo = "<b>Start Time: </b>${startTime} <br/>";
            this.loadConfiguraionFromXml();
            $("#PastOutage").on("click", lang.hitch(this, this.pastOutageButton_Click));
            var tableID3 = new Date().getTime();
            this.pastOutagesGrid = new DataGrid({
                map: this.map,
                viewName: "pastOutages",
                tableID: tableID3
            }, "pastOutagesGridDiv");
            this.pastOutagesGrid.startup();
            $("#but").on("click", lang.hitch(this, this.ShowpastOutageButton_Click));
            $("#linkCounty").on("click", lang.hitch(this, this.CountyTab_Click));
            $("#linkRegion").on("click", lang.hitch(this, this.RegionTab_Click));
            dijit.byId("mycounty").on("Change", lang.hitch(this, this.myCounty_Click));
            dijit.byId("myregion").on("Change", lang.hitch(this, this.myRegion_Click));

            var tableID = new Date().getTime() + 5;

            this.outageDetailsGrid = new DataGrid({
                map: this.map,
                viewName: "outageDetails",
                tableID: tableID
            }, "grid2");
            this.outageDetailsGrid.startup();
            var tableID2 = new Date().getTime() + 10;
            // if(this.showCounties){     
            this.countiesGrid = new DataGrid({
                map: this.map,
                viewName: "counties",
                tableID: tableID2
            }, "Counties");
            this.countiesGrid.startup();

            this.countiesGrid.on("IdentifyFeature", lang.hitch(this, this.IdentifyFeature));


            var tableID1 = new Date().getTime() + 15;

            this.regionsGrid = new DataGrid({
                map: this.map,
                viewName: "regions",
                tableID: tableID1
            }, "Regions");

            this.regionsGrid.startup();

            this.regionsGrid.on("IdentifyFeature", lang.hitch(this, this.IdentifyFeature));



        },
        myCounty_Click: function () {
            var val = dijit.byId("mycounty").checked;
            if (val)
                this.countiesLyr.show();
            else
                this.countiesLyr.hide();
        },
        myRegion_Click: function () {
            var val = dijit.byId("myregion").checked;
            if (val)
                this.regionsLyr.show();
            else
                this.regionsLyr.hide();
        },
        CountyTab_Click: function () {
            // $("#Counties").addClass("active");
            $("#Regions").hide();
            $("#Counties").show();
        },

        RegionTab_Click: function () {
            //  $("#Counties").removeClass("active");
            $("#Regions").show();
            $("#Counties").hide();

        },

        pastOutageButton_Click: function () {
            var str = this.PastOutageOptions;
            dijit.byId("s3").removeOption(dijit.byId("s3").getOptions());
            var arr = str.split(",");
            for (var i = 0; i < arr.length; i++) {
                if (i == 0)
                    dijit.byId("s3").addOption({ disabled: false, label: arr[i], selected: true, value: arr[i] });
                else
                    dijit.byId("s3").addOption({ disabled: false, label: arr[i], value: arr[i] });
            }
            if (arr[0] > 0)
                this.selectPastOutages(arr[0]);
            $("#divWorkingOverlay").show(true);
            myDialog.show();
        },
        _showWorkingFeedback: function (visible, message) {
            if (!message)
                message = "searching...";

            $("#lblWorkingOverlayMessage").text(message);
            if (visible) {
                $("#divWorkingOverlay").show();
                this._repositionWorkingImage();
            }
            else {
                $("#divWorkingOverlay").hide();
            }
        },

        ShowpastOutageButton_Click: function () {
            var value = dijit.byId('s3').get("displayedValue");
            this.selectPastOutages(value);
            $("#divWorkingOverlay").show(true);
        },
        getQuerystring: function (key, default_) {
            if (default_ == null) default_ = "";
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
            var qs = regex.exec(window.location.href);
            if (qs == null)
                return default_;
            else
                return qs[1];
        },
        initView: function () {
            //hook window resize event
            // $(window).on("resize", lang.hitch(this, this._window_resized));

            var context = this;
            dojo.byId('webmapTitle').innerHTML = this.webmapTitle;

            //######################################################################################
            //############################BANNER IMAGE, LOGO IMAGE, TITLE COLOR#####################            
            //Adding in jQuery to change title color
            $('#webmapTitle').attr("style", "color: " + context.webmapTitleColor + ";text-align: center;vertical-align: text-top; font-weight: bold; font-size: xx-large;");

            //Adding in jQuery to swap out logo / banner image source
            if (context.webmapBannerImage != null && context.webmapBannerImage != '' && context.webmapBannerImage.toString().toUpperCase() != 'images/OMSWebMap_Header_bg.jpg') {
                $('#banner-top').attr("style", "width:100%; height: 10%; background-image: url(" + context.webmapBannerImage + "); background-size: 100% !important; background-repeat: no-repeat; overflow:hidden;");
                $('#footerPanel').attr("style", "background: " + context.webmapBackgroundColor + "; color: " + context.webmapTitleColor + "; width: 100%; height: 5%; left: 0px; bottom:0px; position: absolute;");
                //$('.panel-primary').css("border-color", context.webmapBackgroundColor);
                //$('.panel-primary>.panel-heading').css("border-color", context.webmapBackgroundColor);
            }
            if (context.webmapBannerImage.toString().toUpperCase() == "NONE" && context.webmapBannerImage.toString().toUpperCase() != 'images/OMSWebMap_Header_bg.jpg') {
                $('#banner-top').attr("style", "background: " + context.webmapBackgroundColor + "; width:100%; height: 10%; background-repeat: no-repeat; overflow:hidden;");
                $('#footerPanel').attr("style", "background: " + context.webmapBackgroundColor + "; color: " + context.webmapTitleColor + "; width: 100%; height: 5%; left: 0px; bottom:0px; position: absolute;");
                //$('.panel-primary').css("border-color", context.webmapBackgroundColor);
                //$('.panel-primary>.panel-heading').css("border-color", context.webmapBackgroundColor);
            }
            if (context.webmapLogoImage != null && context.webmapLogoImage != '' && context.webmapLogoImage.toString().toUpperCase() != 'images/futura_logo.png') {
                $('#logo-image').attr("style", "height:80px !important;margin-top:5px;");
                $('#logo-image').attr("src", context.webmapLogoImage);
            }
            //############################BANNER IMAGE, LOGO IMAGE, TITLE COLOR#####################
            //######################################################################################

            if (context.securityEnabled.toUpperCase() == "YES") {

                var token = this.getQuerystring('clientKey');


                if ((token == null) || (token === "") || (token != context.tokenString.toString())) {
                    window.location = "../Error.htm";
                    return;
                }

            }

            if (context.enableSSL.toUpperCase() == "YES") {
                //if protocol is http, redirect to https
                if (window.location.protocol == "http:") {
                    window.location.replace("https://" + window.location.host + window.location.pathname);
                    return;
                }
            }

            this.initMap();
            this.geoLocate = new LocateButton({
                map: this.map
            }, "LocateButton");
            this.geoLocate.startup();

            if (context.showRegions.toString().toUpperCase() == "TRUE") {
                // this.regionsLyr.show();
                document.getElementById("linkRegion").innerHTML = this.regionTitle;
            }
            else {
                //this.regionsLyr.hide();
                document.getElementById("displayTabs").children[1].style.display = "none";
                document.getElementById("regiondiv").style.visibility = "hidden";
                //document.getElementById("linkRegion").style.visibility = "hidden";
            }
            if (context.showCounties.toString().toUpperCase() == "TRUE") {
                // this.countiesLyr.show();
                document.getElementById("linkCounty").innerHTML = this.countyTitle;
            }
            else {
                //   this.countiesLyr.hide();
                document.getElementById("displayTabs").children[0].style.display = "none";
                document.getElementById("countydiv").style.visibility = "hidden";
                //document.getElementById("linkCounty").style.visibility = "hidden";
            }
            if ((context.showRegions.toString().toUpperCase() == "TRUE") && (context.showCounties.toString().toUpperCase() == "TRUE")) {
                this.CountyTab_Click();
                
            }

            document.getElementById("leg1").innerHTML = context.LegendLabel;
            document.getElementById("leg2").innerHTML = context.LegendLabel;
            document.getElementById("leg3").innerHTML = context.LegendLabel;
            document.getElementById("leg4").innerHTML = context.LegendLabel;
            document.getElementById("leg5").innerHTML = context.LegendLabel;

            if (context.showPastOutage.toString().toUpperCase() == "FALSE") {
                document.getElementById("PastOutage").style.visibility = "hidden";

            }

            //#########################GOOGLE ANALYTICS HANDLING#######################
            //if Enabled and we have a value for GoogleID, append script to head element
            if (context.googleAnalytics.toString().toUpperCase() == "TRUE" && context.googleID.toString() != null && context.googleID.toString() != "" && context.googleID.toString() != " ") {
                var gas = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', '" + context.googleID + "', 'auto');ga('send', 'pageview');";

                $('<script>')
                    .attr('type', 'text/javascript')
                    .text(gas)
                    .appendTo('head');
            }

            //#########################################################################
            //#############################BOOTSTRAP MODAL#############################
            //#########################################################################
            jQuery(document).ready(function () {
                if (context.webmapModalType.toString().toUpperCase() != "NONE" && context.webmapModalType.toString().toUpperCase() != "") {
                    //Set Modal Message
                    if (context.webmapModalMessage != null && context.webmapModalMessage != "") {
                        var modalText = context.webmapModalMessage.toString();
                        $('.modal-body p').text(modalText);
                    }
                    if (context.webmapModalType != null && context.webmapModalType != "") {
                        //set info modal type
                        if (context.webmapModalType.toString().toUpperCase() == 'INFO') {
                            var modalMessageIcon = "fa fa-info";
                            var modalMessageColor = "modal-info-color";
                            $('.modal-content').addClass('modal-info-color');
                            $('.modal-body i').addClass('modal-icon fa fa-info');
                        }
                            //set success modal type
                        else if (context.webmapModalType.toString().toUpperCase() == 'SUCCESS') {
                            var modalMessageIcon = "fa fa-check";
                            var modalMessageColor = "modal-success-color";
                            $('.modal-content').addClass('modal-success-color');
                            $('.modal-body i').addClass('modal-icon fa fa-check');
                        }
                            //set warning modal type
                        else if (context.webmapModalType.toString().toUpperCase() == 'WARNING') {
                            var modalMessageIcon = "fa fa-exclamation-triangle";
                            var modalMessageColor = "modal-warning-color";
                            $('.modal-content').addClass('modal-warning-color');
                            $('.modal-body i').addClass('modal-icon fa fa-exclamation-triangle');
                        }
                            //set error modal type
                        else if (context.webmapModalType.toString().toUpperCase() == 'ERROR') {
                            var modalMessageIcon = "fa fa-exclamation";
                            var modalMessageColor = "modal-error-color";
                            $('.modal-content').addClass('modal-error-color');
                            $('.modal-body i').addClass('modal-icon fa fa-exclamation');
                        }
                    }
                    //Set modal display behavior (Timeout / Close on window click)
                    if (context.webmapModalTimeout != null && context.webmapModalTimeout != "") {
                        if (context.webmapModalTimeout.toString().toUpperCase() == "TRUE") {
                            $(window).ready(function () {
                                //parse duration from seconds into milliseconds
                                if (context.webmapModalTimeoutDuration != null && context.webmapModalTimeoutDuration != "") {
                                    var timeInSeconds = parseInt(context.webmapModalTimeoutDuration.toString());
                                    var timeInMilliseconds = timeInSeconds * 1000;
                                }
                                //set behavior for timeout modal
                                $('#customModal').modal('show').delay(timeInMilliseconds).fadeOut('slow', function () {
                                    //show message button
                                    $('#modalMessage').addClass(modalMessageColor);
                                    $('.modalMessageIcon').addClass(modalMessageIcon);
                                    $('#modalMessage').removeClass('hide').slideDown('slow');
                                });
                                //re-open modal on modalMessage click
                                $('#modalMessage').click(function () {
                                    $('.modal-header').show();
                                    $('#customModal').modal('show').fadeIn('slow');

                                    //listen to close re-opened modal
                                    $('#modal-close').click(function () {
                                        //hide modal
                                        $('#customModal').modal('hide');
                                    });
                                });
                            });
                        }
                        else if (context.webmapModalTimeout.toString().toUpperCase() == "FALSE") {
                            $(window).ready(function () {
                                //set modal to show with no timeout
                                $('#customModal').modal('show');
                                $('.modal-header').show();

                                //listen for any click event to close modal
                                $('#modal-close').click(function () {
                                    //hide modal
                                    $('#customModal').modal('hide');
                                    //show message button
                                    $('#modalMessage').addClass(modalMessageColor);
                                    $('.modalMessageIcon').addClass(modalMessageIcon);
                                    $('#modalMessage').removeClass('hide').slideDown('slow');
                                });

                                //re-open modal on modalMessage click
                                $('#modalMessage').click(function () {
                                    $('#customModal').modal('show').fadeIn('slow');
                                });
                            });
                        }
                    }
                }
            });
            //#########################################################################
            //#########################END BOOTSTRAP MODAL#############################
            //#########################################################################


            //#########################################################################
            //##########################OUTAGE REPORTING###############################
            //#########################################################################
            if (showOutageReporting.toString().toUpperCase() == "TRUE") {
                //show reporting button
                $('#outage-reporting-button').removeClass('hide');

                //onclick load modal with Outage Reporting Form
                $('#outage-reporting-button').click(function () {
                    //show modal
                    $('#outage-reporting-modal').modal('show').fadeIn('slow');
                    //show callback checkbox if enabled
                    if (enableOutageCallbacks.toString().toUpperCase() == "TRUE") {
                        $('#callback-container').show();
                    }
                    if (enableOutageCallbacks.toString().toUpperCase() == "FALSE") {
                        $('#callback-container').hide();
                    }
                });

                //onclick close modal
                // $('#outage-cancel').click(function(){
                //     $('#outage-reporting-modal').modal('hide');
                // });

                //###############################
                //BEGIN Outage Reporting Handling
                //###############################
                //Field Validation Functions
                //Validate Phone Number
                function isValidNumber(number) {
                    //check not null
                    if (!number) {
                        return false;
                    }
                    //check no parentheses
                    if (number.indexOf(')') != -1) {
                        var hasParentheses = true;
                        return false;
                    }
                    //check all numbers
                    if (number.match(/[a-z]/i)) {
                        return false;
                    }
                    //check is 10 digit number
                    var isTenDigit = number.match(/\d/g).length === 10;
                    if (isTenDigit == false) {
                        return false;
                    }

                    return true;
                }

                //Validate Account Number (Commented out until needed)
                // function isValidAccount(account){
                //     if(!account){
                //         return false;
                //     }
                //     //else if additional validations?
                //     return true;
                // }


                //########################
                //Callback Number Handling
                //########################
                if (enableOutageCallbacks.toString().toUpperCase() == "TRUE") {
                    $('#callback-container').show();
                    //$('#outage-callback-number').parent().hide();
                    $('#callback-number').hide();
                    $('#outage-callback-number').hide();

                    $('#outage-callback').click(function () {
                        $('#phone-error').hide();
                        $('#callback-phone-error').hide();
                        //clear callback input
                        $('#outage-callback-number').attr("value", "");
                        $('#outage-callback-number').show();
                        //show/hide callback input based on callback checkbox
                        callbackcheckVal = $('#outage-callback').val();

                        console.log("Outage Checked: " + callbackcheckVal);

                        if ($('#outage-callback').is(":checked")) {
                            $('#callback-number').show();
                            $('#outage-callback-number').show();
                        }
                        if (!($('#outage-callback').is(":checked"))) {
                            $('#callback-number').hide();
                            $('#outage-callback-number').hide();
                        }
                        //pre-populate callback input value
                        getOutagePhoneNumber = $('#outage-number').val();
                        callbackValid = isValidNumber(getOutagePhoneNumber);
                        if (callbackValid == true) {
                            $('#outage-callback-number').attr("value", getOutagePhoneNumber);
                        }
                        else if (callbackValid == false && getOutagePhoneNumber == null && getOutagePhoneNumber == '') {
                            $('#callback-phone-error').show();
                        }
                    });
                }
                else if (enableOutageCallbacks.toString().toUpperCase() == "FALSE") {
                    $('#callback-container').hide();
                }

                //###########################
                //Check Status Click Handling
                //###########################
                $('#outage-status').click(function () {
                    $('#account-error').hide();
                    $('#status-response-popup').hide();

                    //set form vars
                    var accountNumber = $('#outage-account').val();
                    var OutageAccountVal = accountNumber.replace(/-/g, "");

                    if (OutageAccountVal == null || OutageAccountVal == '') {
                        $('#account-error').show();
                    }
                    if (OutageAccountVal != null && OutageAccountVal != '') {

                        //Show waiting bar
                        $('#outage-waiting').show();

                        //Setup Check Status Request
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.open('POST', outageReportingURL, true);

                        var statusXML =
                        '<?xml version="1.0" encoding="utf-8"?>' +
                        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                          '<soap:Header>' +
                            '<MultiSpeakMsgHeader Version="" UserID="' + outageURLuser + '" Pwd="' + outageURLpass + '" AppName="" AppVersion="" Company="OMSWebMap" CSUnits="feet" CoordinateSystem="" Datum="" SessionID="" PreviousSessionID="" ObjectsRemaining="" LastSent="" xmlns="http://www.multispeak.org/Version_3.0" />' +
                          '</soap:Header>' +
                          '<soap:Body>' +
                            '<GetOutageEventStatusByOutageLocation xmlns="http://www.multispeak.org/Version_3.0">' +
                              '<location>' +
                                '<servLoc></servLoc>' +
                                '<meterNo></meterNo>' +
                                '<areaCode></areaCode>' +
                                '<phone></phone>' +
                                '<accountNumber>' + OutageAccountVal + '</accountNumber>' +
                              '</location>' +
                            '</GetOutageEventStatusByOutageLocation>' +
                          '</soap:Body>' +
                        '</soap:Envelope>';

                        //console.log(statusXML);

                        //Sending Status Request
                        console.log("Sending Status Request to OMS...");
                        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4) {
                                if (xmlhttp.status == 200) {

                                    xmlDoc = xmlhttp.responseXML;

                                    //parse XML nodeValues into vars
                                    var outageStatus = xmlDoc.getElementsByTagName("outageStatus")[0].childNodes[0].nodeValue;
                                    var crewDispatched = xmlDoc.getElementsByTagName("crewDispatched")[0].childNodes[0].nodeValue;
                                    var crewOnSite = xmlDoc.getElementsByTagName("crewOnSite")[0].childNodes[0].nodeValue;
                                    var ErrorString = xmlDoc.getElementsByTagName("customerFound")[0].childNodes[0].nodeValue;

                                    if (ErrorString.toLowerCase() == "true") {
                                        //Parse outage Status Into Text
                                        if (outageStatus.toUpperCase() == "CONFIRMED")
                                            outageStatusText = "You are involved in a known outage."
                                        else if (outageStatus.toUpperCase() == "ASSUMED")
                                            outageStatusText = "Outages Reported in Your Area."
                                        else if (outageStatus.toUpperCase() == "UNKNOWN")
                                            outageStatusText = "No Outages Reported."


                                        crewDispatchedText = '';
                                        crewOnSiteText = '';
                                        if (outageTruckCrewDetails.toUpperCase() == "TRUE") {
                                            //Parse Crews Dispatched
                                            if (crewDispatched.toUpperCase() == "TRUE")
                                                crewDispatchedText = "A crew has been dispatched."
                                            else if (crewDispatched.toUpperCase() == "FALSE")
                                                crewDispatchedText = "A crew has not been dispatched."
                                            //Parse Crews On Site
                                            if (crewOnSite.toUpperCase() == "TRUE")
                                                crewOnSiteText = "A crew is on site."
                                            else if (crewOnSite.toUpperCase() == "FALSE")
                                                crewOnSiteText = "Crew is not yet on site."
                                        }

                                        //load values into popup under check status and show popup.
                                        $('#outage-status-popup').text(outageStatusText);
                                        $('#crew-dispatched-popup').text(crewDispatchedText);
                                        $('#crew-onsite-popup').text(crewOnSiteText);
                                        //show popup
                                        $('#outage-waiting').hide();
                                        $('#status-response-popup').show();
                                        $('#outage-status-popup').show();
                                        $('#crew-dispatched-popup').show();
                                    }
                                    if (ErrorString.toLowerCase() == "false") {
                                        //show account not found
                                        $('#outage-status-popup').text("Account Not Found.");
                                        $('#crew-dispatched-popup').text("Please check your account number.");
                                        $('#crew-onsite-popup').text("");
                                        $('#outage-waiting').hide();
                                        $('#status-response-popup').show();
                                        $('#outage-status-popup').show();
                                        $('#crew-dispatched-popup').show();
                                        $('#account-error').show();
                                    }
                                }
                                if (xmlhttp.status != 200) {
                                    //show error
                                    $('#outage-status-popup').text("Account Not Found.");
                                    $('#crew-dispatched-popup').text("Error Processing Request.");
                                    $('#outage-waiting').hide();
                                    $('#status-response-popup').show();
                                    $('#outage-status-popup').show();
                                    $('#crew-dispatched-popup').show();
                                }
                            }
                        }
                        xmlhttp.ontimeout = function () {
                            $('#outage-status-popup').text("Account Not Found.");
                            $('#crew-dispatched-popup').text("Error Processing Request.");
                            //show popup
                            $('#outage-waiting').hide();
                            $('#status-response-popup').show();
                            $('#outage-status-popup').show();
                            $('#crew-dispatched-popup').show();
                        }
                        xmlhttp.error = function () {
                            $('#outage-status-popup').text("Account Not Found.");
                            $('#crew-dispatched-popup').text("Error Processing Request.");
                            //show popup
                            $('#outage-waiting').hide();
                            $('#status-response-popup').show();
                            $('#outage-status-popup').show();
                            $('#crew-dispatched-popup').show();
                        }
                        xmlhttp.send(statusXML);
                    }
                });

                //#####################
                //Submit Click Handling
                //#####################          
                $('#outage-submit').click(function () {
                    //hide / reset errors
                    $('#phone-error').hide();
                    $('#callback-phone-error').hide();
                    $('#account-error').hide();

                    //set form vars
                    var OutageName = $('#outage-name').val();
                    var OutageAccountVal = $('#outage-account').val();
                    var OutagePhoneNumber = $('#outage-number').val();
                    var OutageComments = $('#outage-comment').val();
                    var OutageCallBackChecked = $('#outage-callback').prop("checked");
                    var OutageCallBackNumber = $('#outage-callback-number').val();

                    //validate account number //Can add back in account validation function
                    if (OutageAccountVal != null && OutageAccountVal != '') {
                        haveAccountNumber = true;
                        havePhoneNumber = true;
                        outageResolvedLevel = "Meter";
                    }

                    //validate outage phone number
                    if (OutageAccountVal == null || OutageAccountVal == '') {
                        havePhoneNumber = isValidNumber(OutagePhoneNumber);
                        if (havePhoneNumber == false) {
                            $('#phone-error').show();
                        }
                        haveAccountNumber = true;
                        outageResolvedLevel = "Unresolved";
                    }

                    //validate callback number if checked
                    if (OutageCallBackChecked == true) {
                        //validate callback number
                        haveCallBackNumber = isValidNumber(OutageCallBackNumber);
                        if (haveCallBackNumber == false && OutageCallBackNumber != null && OutageCallBackNumber != '') {
                            $('#callback-phone-error').show();
                        }
                    }
                    else if (OutageCallBackChecked == false) {
                        //set to true here, there's nothing to check
                        haveCallBackNumber = true;
                    }

                    //make XML request
                    if (haveAccountNumber == true && havePhoneNumber == true && haveCallBackNumber == true) {
                        //split string into array to separate areacode and phone number
                        phonearray = OutagePhoneNumber.split("-");
                        phoneareacode = phonearray[0];
                        phonenumber = phonearray[1] + phonearray[2];

                        //If Callback Number is Checked, Set variables here.
                        if (OutageCallBackChecked == true) {
                            //parse callback number vars
                            phonearray = OutageCallBackNumber.split("-");
                            phoneareacode = phonearray[0];
                            phonenumber = phonearray[1] + phonearray[2];
                        }

                        //parse Comments to send in XML
                        var OutageCommentsXMLsafe = encodeURIComponent(OutageComments);

                        //Generate ObjectID from Client Time
                        currentTime = new Date();
                        date = currentTime.toString().split(' ')[3] + currentTime.toString().split(' ')[2];
                        time = currentTime.toString().split(' ')[4]
                        cleanTime = time.replace(/:/g, '');
                        outageObjectID = date + cleanTime;

                        //Set Event Time based on outageEventTime attribute
                        if (outageEventTime.toString() == "LOCALTIME") {
                            var theyear = currentTime.getFullYear();
                            var therawmonth = parseInt(currentTime.getMonth()) + 1;
                            var therawday = currentTime.getDate();
                            //make sure day is in two digit format
                            if (therawday.toString().length < 2) {
                                var theday = '0' + therawday;
                            }
                            if (therawday.toString().length > 1) {
                                var theday = therawday;
                            }
                            //make sure month is in two digit format
                            if (therawmonth.toString().length < 2) {
                                var themonth = '0' + therawmonth;
                            }
                            if (therawmonth.toString().length > 1) {
                                var themonth = therawmonth;
                            }
                            localtime = theyear + '-' + themonth + '-' + theday + 'T' + currentTime.toString().split(' ')[4];

                            var EventTimeValue = localtime;
                        }
                        if (outageEventTime.toString() == "UTC") {
                            var EventTimeValue = new Date().toISOString();
                        }


                        //hide form after submit
                        $('#outage-popup-form').hide();
                        $('#outage-status').hide();
                        $('#outage-submit').hide();
                        //hide status response if fired
                        $('#status-response-popup').hide();
                        $('#outage-status-popup').hide();
                        $('#crew-dispatched-popup').hide();
                        //show submit confirmation
                        $('#outage-submit-waiting').show();
                        $('#outage-submit-confirm').show();


                        //Setup Outage Report Request
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.open('POST', outageReportingURL, true);

                        outageReportXML =
                        '<?xml version="1.0" encoding="utf-8"?>' +
                        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                          '<soap:Header>' +
                            '<MultiSpeakMsgHeader Version="" UserID="' + outageURLuser + '" Pwd="' + outageURLpass + '" AppName="" AppVersion="" Company="OMSWebMap" CSUnits="feet" CoordinateSystem="" Datum="" SessionID="" PreviousSessionID="" ObjectsRemaining="" LastSent="" xmlns="http://www.multispeak.org/Version_3.0" />' +
                          '</soap:Header>' +
                          '<soap:Body>' +
                            '<ODEventNotification xmlns="http://www.multispeak.org/Version_3.0">' +
                              '<ODEvents>' +
                                  '<outageDetectionEvent objectID="' + outageObjectID + '" verb="New" errorString="" replaceID="" utility="" MyAttribute="">' +
                                    '<comments xmlns="http://www.multispeak.org/Version_3.0">' + OutageCommentsXMLsafe + '</comments>' +
                                    '<extensionsList xmlns="http://www.multispeak.org/Version_3.0">' +
                                      '<extensionsItem>' +
                                        '<extName>takenBy</extName>' +
                                        '<extValue>OMSWebMap</extValue>' +
                                      '</extensionsItem>' +
                                    '</extensionsList>' +
                                    '<eventTime xmlns="http://www.multispeak.org/Version_3.0">' + EventTimeValue + '</eventTime>' +
                                    '<outageEventType xmlns="http://www.multispeak.org/Version_3.0">Outage</outageEventType>' +
                                    '<outageDetectDeviceType xmlns="http://www.multispeak.org/Version_3.0">Call</outageDetectDeviceType>' +
                                    '<outageLocation objectID="' + outageObjectID + '" verb="New" errorString="" replaceID="" utility="" MyAttribute="" xmlns="http://www.multispeak.org/Version_3.0">' +
                                      '<servLoc></servLoc>' +
                                      '<meterNo></meterNo>' +
                                      '<accountNumber>' + OutageAccountVal + '</accountNumber>' +
                                    '</outageLocation>' +
                                    '<outageCustomer xmlns="http://www.multispeak.org/Version_3.0">' +
                                     '<callBackAC>' + phoneareacode + '</callBackAC>' +
                                      '<callBackPhone>' + phonenumber + '</callBackPhone>' +
                                      '<callBackFlag>' + OutageCallBackChecked + '</callBackFlag>' +
                                      '<callBackContactFirstName>' + OutageName + '</callBackContactFirstName>' +
                                      '<callBackContactLastName></callBackContactLastName>' +
                                      '<callBackType>IVR</callBackType>' +
                                    '</outageCustomer>' +
                                      '<priority xmlns="http://www.multispeak.org/Version_3.0">Normal</priority>' +
                                    '<problemCode xmlns="http://www.multispeak.org/Version_3.0"></problemCode>' +
                                    '<resolvedLevel xmlns="http://www.multispeak.org/Version_3.0">' + outageResolvedLevel + '</resolvedLevel>' +
                                  '</outageDetectionEvent>' +
                              '</ODEvents>' +
                              '<transactionId>' + outageObjectID + '</transactionId>' +
                            '</ODEventNotification>' +
                          '</soap:Body>' +
                        '</soap:Envelope>';

                        //console.log(outageReportXML);

                        //Sending Outage Report
                        console.log("Sending Outage Report to OMS...");
                        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4) {
                                if (xmlhttp.status == 200) {
                                    console.log("Outage Report Sent.");

                                    xmlDoc = xmlhttp.responseXML;
                                    //console.log(xmlhttp.responseXML);

                                    //hide submit waiting bar
                                    $('#outage-submit-waiting').hide();
                                    //show success
                                    $('#outage-cancel').text("Close");
                                    $('#outage-report-status-content').text("Your Outage Report was successful.");
                                    $('#outage-report-status').show();
                                    $('#outage-report-status-content').show();
                                }

                                if (xmlhttp.status != 200) {
                                    //show error
                                    $('#outage-submit-waiting').hide();
                                    $('#outage-cancel').text("Close");
                                    $('#outage-report-status-content').text("There was an error with your request.");
                                    $('#outage-report-status').show();
                                    $('#outage-report-status-content').show();
                                }
                            }
                        }
                        xmlhttp.ontimeout = function () {
                            $('#outage-report-status-content').text("There was an error with your request.");
                            $('#outage-cancel').text("Close");
                            $('#outage-report-status').show();
                            $('#outage-report-status-content').show();
                        }
                        xmlhttp.onerror = function () {
                            $('#outage-report-status-content').text("There was an error with your request.");
                            $('#outage-cancel').text("Close");
                            $('#outage-report-status').show();
                            $('#outage-report-status-content').show();
                        }
                        xmlhttp.send(outageReportXML);
                    }
                });

                //########################
                //Cancel Click Reset Popup
                //########################
                $('#outage-cancel').click(function () {
                    $('#account-error').hide();
                    $('#phone-error').hide();
                    $('#outage-popup-form')[0].reset();
                    $('#status-response-popup').hide();
                    $('#outage-reporting-modal').modal('hide');

                    //for submit confirmation close
                    $('#outage-popup-form').show();
                    $('#outage-status').show();
                    $('#outage-submit').show();
                    $('#outage-cancel').find('span').text("Cancel");
                    $('#outage-report-status-content').hide();
                    $('#outage-submit-confirm').hide();

                    //for callback
                    $('#callback-number').hide();
                    $('#outage-callback-number').hide();
                    $('#outage-callback-number').parent().hide();
                });
            }
            //#########################################################################
            //########################END OUTAGE REPORTING#############################
            //#########################################################################

        },
        loadConfiguraionFromXml: function () {
            var context = this;
            dojo.xhrGet({
                url: "ClientBin/Config.xml",
                handleAs: "xml",
                contentType: "application/xml; charset=utf-8",
                load: function (data, args) {

                    for (var i = 0; i < data.childNodes.length; i++) {

                        if (data.childNodes[i].nodeName == "Config") {
                            for (var j = 0; j < data.childNodes[i].childNodes.length; j++) {
                                if (data.childNodes[i].childNodes[j].nodeName == "Attributes") {

                                    for (var x = 0; x < data.childNodes[i].childNodes[j].attributes.length; x++) {
                                        var attr = data.childNodes[i].childNodes[j].attributes[x];
                                        if (attr != null) {
                                            if (attr.name == "AutoRefreshInterval")
                                                context.AutoRefreshInterval = attr.value;
                                            else if (attr.name == "WebMap_Title")
                                                context.webmapTitle = attr.value;
                                            //Adding WebMap Banner / Logo Image / Background Color
                                            else if (attr.name == "WebMap_TitleColor")
                                                context.webmapTitleColor = attr.value;
                                            else if (attr.name == "WebMap_BannerImage" && attr.value.toUpperCase() == "DEFAULT")
                                                context.webmapBannerImage = "images/OMSWebMap_Header_bg.jpg";
                                            else if (attr.name == "WebMap_BannerImage" && attr.value.toUpperCase() != "DEFAULT")
                                                context.webmapBannerImage = attr.value;
                                            else if (attr.name == "WebMap_LogoImage" && attr.value.toUpperCase() == "DEFAULT")
                                                context.webmapLogoImage = "images/futura_logo.png";
                                            else if (attr.name == "WebMap_LogoImage" && attr.value.toUpperCase() != "DEFAULT")
                                                context.webmapLogoImage = attr.value;
                                            else if (attr.name == "WebMap_BackgroundColor")
                                                context.webmapBackgroundColor = attr.value;
                                            //BOOTSTRAP MODAL ATTRIBUTES
                                            else if (attr.name == "WebMap_ModalType")
                                                context.webmapModalType = attr.value;
                                            else if (attr.name == "WebMap_ModalMessage")
                                                context.webmapModalMessage = attr.value;
                                            else if (attr.name == "WebMap_ModalTimeout")
                                                context.webmapModalTimeout = attr.value;
                                            else if (attr.name == "WebMap_ModalTimeoutDuration")
                                                context.webmapModalTimeoutDuration = attr.value;
                                            //ZOOM ATTRIBUTES
                                            else if (attr.name == "WebMap_MaxZoom")
                                                context.webmapMaxZoom = attr.value;
                                            else if (attr.name == "WebMap_MinZoom")
                                                context.webmapMinZoom = attr.value;
                                            //OUTAGE REPORTING
                                            else if (attr.name == "OutageReporting")
                                                showOutageReporting = attr.value;
                                            else if (attr.name == "OutageURL")
                                                outageReportingURL = attr.value;
                                            else if (attr.name == "OutageCallbacks")
                                                enableOutageCallbacks = attr.value;
                                            else if (attr.name == "OutageURL_User")
                                                outageURLuser = attr.value;
                                            else if (attr.name == "OutageURL_Pass")
                                                outageURLpass = attr.value;
                                            else if (attr.name == "OutageEventTime")
                                                outageEventTime = attr.value;
                                            else if (attr.name == "OutageShowTruckCrewDetails")
                                                outageTruckCrewDetails = attr.value;
                                            //ENABLE SSL
                                            else if (attr.name == "EnableSSL")
                                                context.enableSSL = attr.value;
                                            //Enable Google Analytics
                                            else if (attr.name == "GoogleAnalyticsEnabled")
                                                context.googleAnalytics = attr.value;
                                            else if (attr.name == "GoogleAnalyticsID")
                                                context.googleID = attr.value;
                                            else if (attr.name == "EnablePulse")
                                                context.enablePulse = attr.value;
                                            else if (attr.name == "DisableDuration_oldestOutage")
                                                context.disableoldestOutage = attr.value;
                                            else if (attr.name == "Disable_PercentageInService")
                                                context.disablePercentageInService = attr.value;
                                            else if (attr.name == "PercentageOutageVisible")
                                                context.PercentageOutageVisible = attr.value;
                                            else if (attr.name == "LegendLabel")
                                                context.LegendLabel = attr.value;
                                            else if (attr.name == "WebMap_Type")
                                                context.webmapType = attr.value;
                                            else if (attr.name == "WebMap_Mode")
                                                context.webmapMode = attr.value;
                                            else if (attr.name == "Bing_Token")
                                                context.bingToken = attr.value;
                                            else if (attr.name == "ESRI_LogoVisible")
                                                context.esriLogoVisible = attr.value;
                                            else if (attr.name == "ShowOutages")
                                                context.showOutages = attr.value;
                                            else if (attr.name == "ShowPastOutage")
                                                context.showPastOutage = attr.value;
                                            else if (attr.name == "ShowRegions")
                                                context.showRegions = attr.value;
                                            else if (attr.name == "ShowCounties")
                                                context.showCounties = attr.value;
                                            else if (attr.name == "ShowCallBundles")
                                                context.showCallBundles = attr.value;
                                            else if (attr.name == "RegionsFillColor")
                                                context.regionFillColor = attr.value;
                                            else if (attr.name == "RegionsFillOpacity")
                                                context.regionFillOpacity = attr.value;
                                            else if (attr.name == "RegionsBoundaryThickness")
                                                context.regionBoundaryThickness = attr.value;
                                            else if (attr.name == "RegionsBoundaryColor")
                                                context.regionBoundaryColor = attr.value;
                                            else if (attr.name == "RegionsTitle")
                                                context.regionTitle = attr.value;
                                            else if (attr.name == "RegionMapTipHeader")
                                                context.regionMaptipHeader = attr.value;
                                            else if (attr.name == "CountyFillColor")
                                                context.countyFillColor = attr.value;
                                            else if (attr.name == "CountyFillOpacity")
                                                context.countyFillOpacity = attr.value;
                                            else if (attr.name == "CountyBoundaryThickness")
                                                context.countyBoundaryThickness = attr.value;
                                            else if (attr.name == "CountyBoundaryColor")
                                                context.countyBoundaryColor = attr.value;
                                            else if (attr.name == "CountiesTitle")
                                                context.countyTitle = attr.value;
                                            else if (attr.name == "CountyMaptipHeader")
                                                context.countyMaptipHeader = attr.value;
                                            else if (attr.name == "EnableSecurity")
                                                context.securityEnabled = attr.value;
                                            else if (attr.name == "TokenString")
                                                context.tokenString = attr.value;
                                            else if (attr.name == "DefaultExtent")
                                                context.defaultExtent = attr.value;
                                            else if (attr.name == "PastOutageOptions")
                                                context.PastOutageOptions = attr.value;
                                            else if (attr.name == "CaseNoFieldLabel")
                                                context.CaseNumber = attr.value;
                                            else if (attr.name == "CustomersAffectedFieldLabel")
                                                context.CustomersAffected = attr.value;
                                            else if (attr.name == "CauseFieldLabel")
                                                context.Cause = attr.value;
                                            else if (attr.name == "AffectedRegionsLabel")
                                                context.AffectedRegions = attr.value;
                                            else if (attr.name == "AffectedCountiesLabel")
                                                context.AffectedCounties = attr.value;
                                            else if (attr.name == "ElementNameLabel")
                                                context.ElementNameLabel = attr.value;
                                            else if (attr.name == "PastOutageStartTimeLabel")
                                                context.StartTime = attr.value;
                                            else if (attr.name == "PastOutageEndTimeLabel")
                                                context.EndTime = attr.value;
                                            //   else if (attr.name == "OutageStatusFieldLabel")
                                            //      CaseStatus = attr.value;
                                            else if (attr.name == "Est_Restoration_DateTimeFieldLabel") {
                                                context.RestorationTimeFieldLabel = attr.value;

                                            }
                                            else if (attr.name == "CustomersServedFieldLabel")
                                                context.CustomersServedFieldLabel = attr.value;
                                            else if (attr.name == "RegionNameFieldLabel") {
                                                context.RegionNameFieldLabel = attr.value;
                                                //this.RegionInfo += "<b>" + this.RegionNameFieldLabel + ": </b>${RegionName}<br/>";
                                                context.RegionInfo += "<b>".concat(context.RegionNameFieldLabel, ": </b>${RegionName}<br/>");
                                            }
                                            else if (attr.name == "CountyNameFieldLabel") {
                                                context.CountyNameFieldLabel = attr.value;

                                                // this.CountyInfo += "<b>" + this.CountyNameFieldLabel + ": </b>${CountyName}<br/>";
                                                context.CountyInfo += "<b>".concat(context.CountyNameFieldLabel, ": </b>${CountyName}<br/>");
                                            }
                                            else if (attr.name == "PercentageOutageFieldLabel")
                                                context.PercentageOutageFieldLabel = attr.value;
                                            else if (attr.name == "PoleNumberFieldLabel")
                                                context.PoleNumberFieldLabel = attr.value;
                                            else if (attr.name == "OutageStatusFieldLabel")
                                                context.OutageStatusFieldLabel = attr.value;
                                            else if ((attr.name == "CustomersServedVisible")) {
                                                context.CustomersServedVisible = true;
                                                // context.RegionInfo += "<b>".concat(context.CustomersServedFieldLabel,": </b>${CustomersServed}<br/>");
                                                // context.CountyInfo += "<b>".concat(context.CustomersServedFieldLabel,": </b>${CustomersServed}<br/>");
                                            }
                                            else if ((attr.name == "CustomersAffectedVisible")) {
                                                context.CustomersAffectedVisible = attr.value;

                                                // context.RegionInfo += "<b>".concat(context.CustomersAffected,": </b>${CustomersAffected}<br/>");
                                                //context.CountyInfo += "<b>".concat(context.CustomersAffected,": </b>${CustomersAffected}<br/>");
                                            }
                                            else if ((attr.name == " PercentageOutageVisible")) {
                                                context.PercentageOutageVisible = attr.value;

                                                // context.RegionInfo += "<b>".concat(context.PercentageOutageFieldLabel,": </b>${PercentageOutage}<br/>");
                                                //context.CountyInfo += "<b>".concat(context.PercentageOutageFieldLabel,": </b>${PercentageOutage}<br/>");
                                            }
                                            else if ((attr.name == "PoleNumberLabelVisible")) {
                                                context.PoleNumberLabelVisible = attr.value;
                                                //context.OutageInfo += "<b>".concat(context.PoleNumberFieldLabel,": </b>${PoleNumber}<br/> ");
                                            }
                                            else if ((attr.name == "ElementNameLabelVisible")) {
                                                context.ElementNameLabelVisible = attr.value;
                                                // context.OutageInfo += "<b>".concat(context.ElementNameLabel,": </b>${ElementName1}<br/> ");
                                            }
                                            else if ((attr.name == "OutageStatusLabelVisible")) {
                                                context.OutageStatusLabelVisible = attr.value;
                                                // context.OutageInfo += "<b>".concat(context.OutageStatusFieldLabel,": </b>${CaseStatus}<br/>");
                                            }
                                            else if ((attr.name == "CauseLabelVisible")) {
                                                context.CauseLabelVisible = attr.value;
                                                //context.OutageInfo += "<b>".concat(context.Cause,": </b>${Cause}<br/>");
                                            }
                                            else if ((attr.name == "CustomersAffectedLabelVisible")) {
                                                context.CustomersAffectedLabelVisible = attr.value;
                                                //context.OutageInfo += "<b>".concat(context.CustomersAffected,": </b>${CustomersAffected}<br/>");
                                            }
                                            else if ((attr.name == "Est_Resto_DateTimeLabelVisible")) {
                                                context.Est_Resto_DateTimeLabelVisible = attr.value;
                                                // context.OutageInfo += "<b>".concat(context.RestorationTimeFieldLabel,": </b>${RestorationTime:DateFormat}<br/>");

                                            }
                                            else if (attr.name == "DefaultExtent") {
                                                //alert(attr.value);
                                                context.defaultExtent = attr.value;
                                            }

                                        }
                                    }
                                    //
                                    context.prepareInfoTemplates();

                                }
                            }
                        }
                    }
                    context.initView();

                }
            });
        },

        prepareInfoTemplates: function () {
            if (this.CustomersServedVisible.toString().toUpperCase() == "TRUE") {
                this.RegionInfo += "<b>".concat(this.CustomersServedFieldLabel, ": </b>${CustomersServed}<br/>");
                this.CountyInfo += "<b>".concat(this.CustomersServedFieldLabel, ": </b>${CustomersServed}<br/>");
            }
            if (this.CustomersAffectedVisible.toString().toUpperCase() == "TRUE") {
                this.RegionInfo += "<b>".concat(this.CustomersAffected, ": </b>${CustomersAffected}<br/>");
                this.CountyInfo += "<b>".concat(this.CustomersAffected, ": </b>${CustomersAffected}<br/>");

            }
            if (this.PercentageOutageVisible.toString().toUpperCase() == "TRUE") {
                this.RegionInfo += "<b>".concat(this.PercentageOutageFieldLabel, ": </b>${PercentageOutage}<br/>");
                this.CountyInfo += "<b>".concat(this.PercentageOutageFieldLabel, ": </b>${PercentageOutage}<br/>");
            }
            if (this.PoleNumberLabelVisible.toString().toUpperCase() == "TRUE") {
                this.OutageInfo += "<b>".concat(this.PoleNumberFieldLabel, ": </b>${PoleNumber}<br/> ");
            }
            if (this.ElementNameLabelVisible.toString().toUpperCase() == "TRUE") {
                this.OutageInfo += "<b>".concat(this.ElementNameLabel, ": </b>${ElementName1}<br/> ");
            }
            if (this.OutageStatusLabelVisible.toString().toUpperCase() == "TRUE") {
                this.OutageInfo += "<b>".concat(this.OutageStatusFieldLabel, ": </b>${CaseStatus}<br/>");
            }
            if (this.CauseLabelVisible.toString().toUpperCase() == "TRUE") {
                this.OutageInfo += "<b>".concat(this.Cause, ": </b>${Cause}<br/>");
            }
            if (this.CustomersAffectedLabelVisible.toString().toUpperCase() == "TRUE") {
                this.OutageInfo += "<b>".concat(this.CustomersAffected, ": </b>${CustomersAffected}<br/>");
            }
            if (this.Est_Resto_DateTimeLabelVisible.toString().toUpperCase() == "TRUE") {
                this.OutageInfo += "<b>".concat(this.RestorationTimeFieldLabel, ": </b>${RestorationTime:DateFormat}<br/>");
            }


        },



        initMap: function () {
            var esriLogo = false;
           // var zoomLevel;
            if (this.esriLogoVisible == "true") {
                esriLogo = true;
            } else
                esriLogo = false;

            //Handle Zoom Min/Max
            if (this.webmapMaxZoom != null && this.webmapMaxZoom != '' && this.webmapMinZoom != null && this.webmapMaxZoom != '') {
                var maxZoomSetting = parseInt(this.webmapMaxZoom.toString());
                var minZoomSetting = parseInt(this.webmapMinZoom.toString());
            }
            else if (this.webmapMaxZoom == null || this.webmapMaxZoom == '' || this.webmapMinZoom == null || this.webmapMaxZoom == '') {
                var maxZoomSetting = 19;
                var minZoomSetting = 0;
            }

            var initExtent = new esri.geometry.Extent(-127, 21, -65, 48, new esri.SpatialReference({ wkid: 4326 })); //GCS_WGS_1984
            this.map = new Map("map", {
                logo: esriLogo,
                extent: initExtent,
                maxZoom: maxZoomSetting,
                minZoom: minZoomSetting
            });

            //this.map = new Map("map");

            Connect.connect(map, 'onResize', this, function (extent) {
                this.map.resize();
            });

            require(['esri/dijit/Scalebar'], lang.hitch(this, function (Scalebar) {
                this.scalebar = new Scalebar({
                    map: this.map,
                    attachTo: "bottom-left",
                    scalebarStyle: "line",
                    scalebarUnit: "dual"
                });
            }));

            this.initLayers();
            $("#Aerial").on("change", lang.hitch(this, this.changeMapStyleAerial));
            $("#Roads").on("change", lang.hitch(this, this.changeMapStyleRoad));
            $("#Aerialwithlabel").on("change", lang.hitch(this, this.changeMapStyleAerialwithlabel));

        },
        initLayers: function () {
            this.layers = [];
            this.outageLyr = new esri.layers.GraphicsLayer("outageLayer");
            this.countiesLyr = new esri.layers.GraphicsLayer("countiesLayer");
            this.regionsLyr = new esri.layers.GraphicsLayer("regionsLayer");
            this.locationLyr = new esri.layers.GraphicsLayer("locationLayer");
            this.customerOutagesLyr = new esri.layers.GraphicsLayer("customerOutagesLyr");
            this.callBundleLyr = new esri.layers.GraphicsLayer("callBundleLyr");
            //symbols
            //this.hilightSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 255]), 2), new dojo.Color([255, 0, 0, 0.25]));
            var regionColor = new dojo.Color(this.regionFillColor.toLowerCase());
            regionColor.a = this.regionFillOpacity / 100;
            var countyColor = new dojo.Color(this.countyFillColor.toLowerCase());
            countyColor.a = this.countyFillOpacity / 100;
            var rLineColor = new dojo.Color(this.regionBoundaryColor.toLowerCase());
            var cLineColor = new dojo.Color(this.countyBoundaryColor.toLowerCase());
            this.defaultRegionsSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(rLineColor), this.regionBoundaryThickness), regionColor);
            this.defaultCountiesSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(cLineColor), this.countyBoundaryThickness), countyColor);

            this.loaded = false;
            //            var veTileLayer; var veRoadLayer;
            if (this.bingToken != null && this.bingToken != "") {
                if (this.webmapMode.toLowerCase() == "road") {
                    this.veTileLayer = new VETiledLayer({
                        bingMapsKey: this.bingToken,
                        mapStyle: VETiledLayer.MAP_STYLE_ROAD
                    });
                }
                else {
                    this.veTileLayer = new VETiledLayer({
                        bingMapsKey: this.bingToken,
                        mapStyle: VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS

                    });
                }

            }
            this.AerialMapServiceLayerURL = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer";
            this.RoadMapServiceLayerURL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer";

            if (this.webmapType != null && this.webmapType != "" && this.webmapType.toLowerCase() == "bing") {
                var radioOne = "<input type='radio' data-dojo-type='dijit/form/RadioButton' name='MapStyle' id='Aerial' value='Aerial' /> <label for='Aerial'>Aerial</label>";

                if (this.veTileLayer) {

                    if (this.webmapMode.toLowerCase() == "road") {

                        radioOne += " <input type='radio' data-dojo-type='dijit/form/RadioButton' name='MapStyle' id='Roads' checked=true value='Roads' /> <label for='Roads'>Roads</label> " +
                         " <input type='radio' data-dojo-type='dijit/form/RadioButton' name='MapStyle' id='Aerialwithlabel' value='AerialwithLabel' /> <label for='Aerialwithlabel' id='aerialLabel'>Aerial with labels</label>";
                        // dijit.byId("Roads").set('checked', true);
                    }
                    else {
                        radioOne += " <input type='radio' data-dojo-type='dijit/form/RadioButton' name='MapStyle' id='Roads'  value='Roads' /> <label for='Roads'>Roads</label> " +
                         " <input type='radio' data-dojo-type='dijit/form/RadioButton' name='MapStyle' id='Aerialwithlabel' checked=true value='AerialwithLabel' /> <label for='Aerialwithlabel' id='aerialLabel'>Aerial with labels</label>";

                        // dijit.byId("Aerialwithlabel").set('checked', true);
                    }
                    document.getElementById("maptools").innerHTML = radioOne;
                    this.map.addLayer(this.veTileLayer);
                }
            }
            else {
                if (this.webmapMode.toLowerCase() == "road") {
                    var radioOne = "<input type='radio' data-dojo-type='dijit/form/RadioButton' name='MapStyle' id='Aerial' value='Aerial' /> <label for='Aerial'>Aerial</label>" +
         " <input type='radio' data-dojo-type='dijit/form/RadioButton' name='MapStyle' id='Roads' checked=true value='Roads' /> <label for='Roads'>Roads</label> ";
                }
                else {
                    var radioOne = "<input type='radio' data-dojo-type='dijit/form/RadioButton' name='MapStyle' id='Aerial' checked=true value='Aerial' /> <label for='Aerial'>Aerial</label>" +
         " <input type='radio' data-dojo-type='dijit/form/RadioButton' name='MapStyle' id='Roads' value='Roads' /> <label for='Roads'>Roads</label> ";
                }
                //" <input type='radio' data-dojo-type='dijit/form/RadioButton' name='MapStyle' id='Aerialwithlabel' value='AerialwithLabel' /> <label for='Aerialwithlabel' id='aerialLabel'>Aerial with labels</label>";
                document.getElementById("maptools").innerHTML = radioOne;


                if (this.webmapMode != null && this.webmapMode != "" && this.webmapMode.toLowerCase() == "road") {
                    this.tiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(this.RoadMapServiceLayerURL);
                    //tiledMapServiceLayer.url = RoadMapServiceLayerURL;
                    this.map.addLayer(this.tiledMapServiceLayer);
                }
                else {
                    this.tiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(this.AerialMapServiceLayerURL);
                    //tiledMapServiceLayer.url = AerialMapServiceLayerURL;
                    this.map.addLayer(this.tiledMapServiceLayer);
                }
            }



            if (this.loaded == false) {
                //add graphic layers to map
                this.map.addLayer(this.countiesLyr);
                this.map.addLayer(this.regionsLyr);
                this.map.addLayer(this.outageLyr);
                this.map.addLayer(this.callBundleLyr);
                this.map.addLayer(this.locationLyr);
                this.map.addLayer(this.customerOutagesLyr);
                this.MapInitFunction();
                // map.addLayer(locationLyr);
                // map.addLayer(customerOutagesLyr);
            }

            this.LoadData();

        },
        changeMapStyleAerial: function (el) {
            if (this.webmapType.toLowerCase() == "bing") {
                this.veTileLayer.setMapStyle(esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL);
            }
            else {
                this.map.removeLayer(this.tiledMapServiceLayer);
                this.tiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(this.AerialMapServiceLayerURL);
                this.map.addLayer(this.tiledMapServiceLayer);
                this.map.reorderLayer(this.tiledMapServiceLayer, 0);

            }
        },
        changeMapStyleRoad: function (el) {
            if (this.webmapType.toLowerCase() == "bing") {
                this.veTileLayer.setMapStyle(esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD);
            }
            else {
                this.map.removeLayer(this.tiledMapServiceLayer);
                this.tiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(this.RoadMapServiceLayerURL);

                this.map.addLayer(this.tiledMapServiceLayer);
                this.map.reorderLayer(this.tiledMapServiceLayer, 0);
            }
        },
        changeMapStyleAerialwithlabel: function (el) {
            this.veTileLayer.setMapStyle(esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS);
        },

        LoadData: function () {
            if (this.showOutages.toString().toLowerCase() == "true") {
                this.GetStagingInfo();
            }
            if (this.showCounties.toString().toLowerCase() == "true")
                this.getCounties();
            if (this.showRegions.toString().toLowerCase() == "true")
                this.getRegions();
            if (this.showCounties.toString().toLowerCase() == "true" && this.showRegions.toString().toLowerCase() == "true") {
                dijit.byId("myregion").setValue(false);
                dijit.byId("mycounty").setValue(true);
                this.countiesLyr.show();
                this.regionsLyr.hide();
            }
            else if (this.showCounties.toString().toLowerCase() == "true") {
                this.countiesLyr.show();
                dijit.byId("mycounty").setValue(true);
            }
            else if (this.showRegions.toString().toLowerCase() == "true") {
                this.regionsLyr.show();
                dijit.byId("myregion").setValue(true);
            }

        },
        myTimer: function (context) {
            if (context.outageLyr)
                context.map.removeLayer(context.outageLyr);
            if (context.callBundleLyr)
                context.map.removeLayer(context.callBundleLyr);
            //map.removeLayer(customerOutagesLyr);
            // getOutages();
            context.GetStagingInfo();
            // getCallBundles();
            //            if (app.locations) {
            //                getOutageCustomerLocations(app.locations);
            //            }

            context.map.addLayer(context.outageLyr);
            context.map.addLayer(context.callBundleLyr);
            //map.addLayer(customerOutagesLyr);
        },
        //
        getCounties: function () {
            var context = this;
            var counties = [];
            var params = {
                url: "MobileMap/OMSMobileService.asmx/GetAllCounties",
                handleAs: "xml",
                contentType: 'application/xml',
                load: function (data) {
                    var xmin; var xmax; var ymin; var ymax;
                    context.countiesLyr.clear();
                    if (data) {
                        for (var ct = 0; ct < data.childNodes.length; ct++) {

                            for (var i = 0; i < data.childNodes[ct].childNodes.length; i++) {

                                if (data.childNodes[ct].childNodes[i].nodeName == "MobileCounty") {

                                    //got the county objects array
                                    var countyName; var custServed; var custAffected; var percentageAffected; var polygon;
                                    var county = {};
                                    for (var j = 0; j < data.childNodes[ct].childNodes[i].childNodes.length; j++) {

                                        //county object
                                        if (data.childNodes[ct].childNodes[i].childNodes[j].nodeName == "Shape") {
                                            var ring = dojox.xml.parser.textContent(data.childNodes[ct].childNodes[i].childNodes[j]);
                                            var pts = ring.split(';');
                                            var points = new Array();
                                            for (var a = 0; a < pts.length; a++) {
                                                points[a] = new esri.geometry.Point(pts[a].split(',')[0], pts[a].split(',')[1]);
                                                var newPt = esri.geometry.geographicToWebMercator(points[a]);
                                                if (xmin == null) {
                                                    xmin = newPt.x;
                                                    xmax = newPt.x;
                                                    ymin = newPt.y;
                                                    ymax = newPt.y;
                                                }
                                                else {
                                                    if (newPt.x > xmax) {
                                                        xmax = newPt.x;
                                                    }
                                                    if (newPt.x < xmin) {
                                                        xmin = newPt.x;
                                                    }
                                                    if (newPt.y > ymax) {
                                                        ymax = newPt.y;
                                                    }
                                                    if (newPt.y < ymin) {
                                                        ymin = newPt.y;
                                                    }
                                                }
                                            }
                                            //polygon = new esri.geometry.Polygon(map.spatialReference);
                                            sr = new esri.SpatialReference({ wkid: 102100 });
                                            polygon = new esri.geometry.Polygon(sr);

                                            polygon.addRing(points);
                                        }
                                        else {

                                            if (data.childNodes[ct].childNodes[i].childNodes[j].nodeName == "CountyName")
                                                countyName = dojox.xml.parser.textContent(data.childNodes[ct].childNodes[i].childNodes[j]);
                                            if (data.childNodes[ct].childNodes[i].childNodes[j].nodeName == "CustomersServed")
                                                custServed = dojox.xml.parser.textContent(data.childNodes[ct].childNodes[i].childNodes[j]);
                                            if (data.childNodes[ct].childNodes[i].childNodes[j].nodeName == "CustomersAffected")
                                                custAffected = dojox.xml.parser.textContent(data.childNodes[ct].childNodes[i].childNodes[j]);

                                            percentageAffected = 0;
                                            if (custAffected > 0 && custServed > 0)
                                                percentageAffected = (custAffected / custServed) * 100;

                                        }

                                    }
                                    var countiestemplate = new esri.InfoTemplate();
                                    countiestemplate.setTitle("County Details");
                                    // countiestemplate.setContent("<b>County Name:</b> ${CountyName}<br/><b>Customers Served:</b>${CustomersServed}<br/><b>Customers Affected:</b>${CustomersAffected}<br/><b>Percentage Outage:</b>${PercentageOutage}");
                                    countiestemplate.setContent(context.CountyInfo);
                                    var attributes = { "CountyName": countyName, "CustomersServed": custServed, "CustomersAffected": custAffected, "PercentageOutage": percentageAffected };
                                    var countyGraphic = new esri.Graphic(esri.geometry.geographicToWebMercator(polygon), context.defaultCountiesSymbol, attributes, countiestemplate);


                                    context.countiesLyr.add(countyGraphic);
                                    county.countyName = countyName;
                                    county.custServed = custServed;
                                    county.custAffected = custAffected;
                                    county.percentageAffected = percentageAffected;
                                    county.graphic = countyGraphic;
                                    counties.push(county);
                                }
                            }
                        }
                    }
                    if (xmin != null && xmin != 0 && context.loaded == false) {
                        //var extent = new esri.geometry.Extent(xmin, ymin, xmax, ymax, context.map.spatialReference);
                        var sr = new esri.SpatialReference({ wkid: 102100 });
                        var extent = new esri.geometry.Extent(xmin, ymin, xmax, ymax, sr);

                        context.mapExtent = extent;

                        context.map.setExtent(extent.expand(1.5));
                        context.loaded = true;
                        var myVar = setInterval(function () {
                            context.myTimer(context);
                        }, parseInt(context.AutoRefreshInterval) * 1000);
                    }

                    context.FillCountyDetails(counties);
                    //                    if (context.loaded)                    
                    //                    var myVar = setInterval( function() {context.myTimer(context);
                    //                               }, parseInt(context.AutoRefreshInterval) * 1000);

                },
                error: function (err) {
                    // alert(err);
                }
            };
            dojo.xhrPost(params);
        },

        FillCountyDetails: function (countyArr) {
            var isSame = this.CheckIfCountyDetailsSame(this.counties, countyArr);
            if (!isSame) {
                this.counties = countyArr;
                this.BuildCountyDataGrid(this.counties);
            }

        },

        CheckIfCountyDetailsSame: function (oldArray, newArray) {
            var isSame = true;
            for (var p = 0; p < newArray.length; p++) {
                if ((oldArray.length != newArray.length) || (oldArray[p].custServed != newArray[p].custServed) || (oldArray[p].custAffected != newArray[p].custAffected)) {
                    isSame = false;
                    break;
                }
            }
            return isSame;
        },
        CheckIfRegionDetailsSame: function (oldArray, newArray) {
            var isSame = true;
            for (var p = 0; p < newArray.length; p++) {
                if ((oldArray.length != newArray.length) || (oldArray[p].custServed != newArray[p].custServed) || (oldArray[p].custAffected != newArray[p].custAffected)) {
                    isSame = false;
                    break;
                }
            }
            return isSame;
        },




        BuildCountyDataGrid: function (result) {
            var cols = [];
            var rows = [];
            // var aoColumnDefs = [];
            var cols = [];
            var rows = [];

            var col1 = {
                sTitle: this.CountyNameFieldLabel,
                bVisible: true,
                width: 100
            };
            cols.push(col1);
            var col2 = {
                sTitle: this.CustomersServedFieldLabel,
                bVisible: true,
                width: 100
            };
            cols.push(col2);
            var col3 = {
                sTitle: this.CustomersAffected,
                bVisible: true,
                width: 100
            };
            cols.push(col3);
            cols.push({
                "sTitle": "item",
                bSortable: false,
                bVisible: false
            });


            for (var p = 0; p < result.length; p++) {
                var rowcells = [];
                var flabel = result[p].countyName;
                rowcells.push(flabel);
                var fvalue = result[p].custServed;
                rowcells.push(fvalue);
                var fvalue1 = result[p].custAffected;
                rowcells.push(fvalue1);
                rowcells.push(result[p].graphic);
                rows.push(rowcells);
            }

            this.BuildCountyDetailsDataGrid({ title: "County Details", columns: cols, rows: rows })

        },
        BuildCountyDetailsDataGrid: function (datagrid) {
            //         var tableid = dojo.byId('
            //             var tableID2 = new Date().getTime();
            //                
            //            this.countiesGrid = new DataGrid({
            //                    map: this.map,
            //                    viewName: "counties",
            //                    tableID: tableID2
            //                },"Counties");
            //            this.countiesGrid.startup();
            //       this.countiesGrid.on("IdentifyFeature",lang.hitch(this,this.IdentifyFeature));

            this.countiesGrid.showCustomResults(datagrid);
        },

        IdentifyFeature: function (viewName, item) {
            if (item.geometry != null) {
                var pt = item.geometry.getExtent().getCenter();
                //  var screenpoint = pt.screenPoint;
                // this.map.infoWindow.resize(200, 120);
                this.map.infoWindow.setTitle(item.getTitle());
                this.map.infoWindow.setContent(item.getContent());
                this.map.infoWindow.Anchor = pt;
                //this.map.infoWindow.IsOpen = true;
                var extent;

                if (item.infoTemplate.title == "County Details") {
                    dojo.forEach(this.countiesLyr.graphics, function (graphic) {
                        if (graphic.attributes.CountyName == item.attributes.CountyName) {
                            extent = graphic.geometry.getExtent();
                        }
                    });
                }
                else if (item.infoTemplate.title == "Region Details") {
                    dojo.forEach(this.regionsLyr.graphics, function (graphic) {
                        if (graphic.attributes.RegionName == item.attributes.RegionName) {
                            extent = graphic.geometry.getExtent();
                        }
                    });
                }
                this.map.graphics.clear();
                this.map.infoWindow.show(pt, this.map.getInfoWindowAnchor(pt), InfoWindow.ANCHOR_UPPERRIGHT);
                this.map.setExtent(extent.expand(2.0));
                // this.map.infoWindow.show(pt, this.map.getInfoWindowAnchor(pt),InfoWindow.ANCHOR_UPPERRIGHT);
            }
        },

        //get regions
        getRegions: function () {
            var context = this;
            var regions = [];
            var params = {
                url: "MobileMap/OMSMobileService.asmx/GetAllRegions",
                dataType: "xml",
                type: "POST",
                success: function (data) {
                    //  alert('hi');
                    var xmin; var xmax; var ymin; var ymax;
                    context.regionsLyr.clear();
                    if (data) {
                        for (var ct = 0; ct < data.childNodes.length; ct++) {

                            for (var i = 0; i < data.childNodes[ct].childNodes.length; i++) {
                                if (data.childNodes[ct].childNodes[i].nodeName == "MobileRegion") {
                                    var regionName; var custServed; var custAffected; var percentageAffected; var polygon;
                                    var region = {};
                                    for (var j = 0; j < data.childNodes[ct].childNodes[i].childNodes.length; j++) {

                                        if (data.childNodes[ct].childNodes[i].childNodes[j].nodeName == "Shape") {
                                            var ring = dojox.xml.parser.textContent(data.childNodes[ct].childNodes[i].childNodes[j]);
                                            var pts = ring.split(';');
                                            var points = new Array();
                                            for (var a = 0; a < pts.length; a++) {
                                                points[a] = new esri.geometry.Point(pts[a].split(',')[0], pts[a].split(',')[1]);
                                                var newPt = esri.geometry.geographicToWebMercator(points[a]);
                                                if (xmin == null) {
                                                    xmin = newPt.x;
                                                    xmax = newPt.x;
                                                    ymin = newPt.y;
                                                    ymax = newPt.y;
                                                }
                                                else {
                                                    if (newPt.x > xmax) {
                                                        xmax = newPt.x;
                                                    }
                                                    if (newPt.x < xmin) {
                                                        xmin = newPt.x;
                                                    }
                                                    if (newPt.y > ymax) {
                                                        ymax = newPt.y;
                                                    }
                                                    if (newPt.y < ymin) {
                                                        ymin = newPt.y;
                                                    }
                                                }
                                            } //for loop
                                            //polygon = new esri.geometry.Polygon(map.spatialReference);
                                            sr = new esri.SpatialReference({ wkid: 102100 });
                                            polygon = new esri.geometry.Polygon(sr);

                                            polygon.addRing(points);
                                        }
                                        //                                        else if (data.childNodes[ct].childNodes[i].childNodes[j].attributes == null) {
                                        //                                            regionName = "#text";
                                        //                                        }
                                        else {
                                            if (data.childNodes[ct].childNodes[i].childNodes[j].nodeName == "RegionName")
                                                regionName = dojox.xml.parser.textContent(data.childNodes[ct].childNodes[i].childNodes[j]);
                                            if (data.childNodes[ct].childNodes[i].childNodes[j].nodeName == "CustomersServed")
                                                custServed = dojox.xml.parser.textContent(data.childNodes[ct].childNodes[i].childNodes[j]);
                                            if (data.childNodes[ct].childNodes[i].childNodes[j].nodeName == "CustomersAffected")
                                                custAffected = dojox.xml.parser.textContent(data.childNodes[ct].childNodes[i].childNodes[j]);

                                            percentageAffected = 0;
                                            if (custAffected > 0 && custServed > 0)
                                                percentageAffected = (custAffected / custServed) * 100;
                                        }



                                    } //for loop
                                    var regionstemplate = new esri.InfoTemplate();
                                    regionstemplate.setTitle("Region Details");
                                    // regionstemplate.setContent("<b>Region Name:</b> ${RegionName}<br/><b>Customers Served:</b>${CustomersServed}<br/><b>Customers Affected:</b>${CustomersAffected}<br/><b>Percentage Outage:</b>${PercentageOutage}");
                                    regionstemplate.setContent(context.RegionInfo);
                                    // var regionGraphic = new esri.Graphic(esri.geometry.geographicToWebMercator(polygon), defaultRegionsSymbol);
                                    var attributes = { "RegionName": regionName, "CustomersServed": custServed, "CustomersAffected": custAffected, "PercentageOutage": percentageAffected };
                                    var regionGraphic = new esri.Graphic(esri.geometry.geographicToWebMercator(polygon), context.defaultRegionsSymbol, attributes, regionstemplate);
                                    //regionGraphic.setAttributes(attributes);
                                    //if (regionName != "#text") {
                                    context.regionsLyr.add(regionGraphic);
                                    region.regionName = regionName;
                                    region.custServed = custServed;
                                    region.custAffected = custAffected;
                                    region.percentageAffected = percentageAffected;
                                    region.graphic = regionGraphic;
                                    regions.push(region);
                                    //}
                                }
                            }
                        }
                    }
                    if (xmin != null && xmin != 0 && context.loaded == false) {
                        //var extent = new esri.geometry.Extent(xmin, ymin, xmax, ymax, context.map.spatialReference);
                        // var extent = new esri.geometry.Extent(xmax, ymin, xmin, ymax, map.spatialReference);

                        var mapSpatialReference = new esri.SpatialReference({ wkid: 102100 });
                        var extent = new esri.geometry.Extent(xmin, ymin, xmax, ymax, mapSpatialReference);

                        context.mapExtent = extent;
                        context.map.setExtent(extent.expand(1.5));
                        context.loaded = true;
                        var myVar = setInterval(function () {
                            context.myTimer(context);
                        }, parseInt(context.AutoRefreshInterval) * 1000);
                    }
                    context.FillRegionDetails(regions);

                },
                error: function (err) {
                    // alert(err);
                }
            };
            //dojo.xhrPost(params);
            $.ajax(params);
        },

        FillRegionDetails: function (regionArr) {
            var isSame = this.CheckIfRegionDetailsSame(this.regions, regionArr);
            if (!isSame) {
                this.regions = regionArr;
                this.BuildRegionDataGrid(this.regions);
            }


        },
        BuildRegionDataGrid: function (result) {
            var cols = [];
            var rows = [];
            // var aoColumnDefs = [];
            var cols = [];
            var rows = [];

            var col1 = {
                sTitle: this.RegionNameFieldLabel,
                bVisible: true,
                width: 100
            };
            cols.push(col1);
            var col2 = {
                sTitle: this.CustomersServedFieldLabel,
                bVisible: true,
                width: 100
            };
            cols.push(col2);
            var col3 = {
                sTitle: this.CustomersAffected,
                bVisible: true,
                width: 100
            };
            cols.push(col3);
//            cols.push({
//                "sTitle": "item",
//                bSortable: false,
//                bVisible: false
//            });


            for (var p = 0; p < result.length; p++) {
                var rowcells = [];
                var flabel = result[p].regionName;
                rowcells.push(flabel);
                var fvalue = result[p].custServed;
                rowcells.push(fvalue);
                var fvalue1 = result[p].custAffected;
                rowcells.push(fvalue1);
                rowcells.push(result[p].graphic);
                rows.push(rowcells);
            }

            this.BuildRegionDetailsDataGrid({ title: "Region Details", columns: cols, rows: rows })

        },
        BuildRegionDetailsDataGrid: function (datagrid) {
            this.regionsGrid.on("IdentifyFeature", lang.hitch(this, this.IdentifyFeature));
            this.regionsGrid.showCustomResults(datagrid);
        },
        //
        GetStagingInfo: function () {
            var context = this;
            var params = {
                url: "MobileMap/OMSMobileService.asmx/GetStagingInfo",
                dataType: "xml",
                type: "POST",
                success: function (data) {
                    if (data) {

                        for (var ct = 0; ct < data.childNodes.length; ct++) {
                            if (data.childNodes[ct].nodeName == "MobileStagingInfo") {
                                for (var i = 0; i < data.childNodes[ct].childNodes.length; i++) {

                                    if (data.childNodes[ct].childNodes[i].nodeName == "LastUpdateTime") {
                                        context.LastUpdateTime = dojox.xml.parser.textContent(data.childNodes[ct].childNodes[i]);
                                        if (context.LastUpdateTime != null) {
                                            context.getOutages();

                                            //refresh by county / region data
                                            if (context.showCounties.toString().toLowerCase() == "true")
                                                context.getCounties();
                                            if (context.showRegions.toString().toLowerCase() == "true")
                                                context.getRegions();

                                            if (context.showCallBundles.toString().toLowerCase() == "true") {
                                                context.getCallBundles();
                                            }
                                        }
                                        else {
                                            //outageLyr.clear();
                                            //callBundleLyr.clear();
                                        }

                                    }
                                    else if (data.childNodes[ct].childNodes[i].nodeName == "NextUpdateTime") {
                                        context.NextUpdateTime = dojox.xml.parser.textContent(data.childNodes[ct].childNodes[i]);
                                        dojo.byId('LastRefresh').innerHTML = "Last Refresh:" + context.LastUpdateTime;
                                        dojo.byId('NextRefresh').innerHTML = "Next Refresh:" + context.NextUpdateTime;

                                    }


                                } //for loop
                            }

                        } //for loop                     
                        if (data.childNodes[0].childNodes.length == 0)
                            dojo.byId('NextRefresh').innerHTML = "Next Refresh:Update in Progress";

                    }
                },
                error: function (err) {
                    //alert(err);
                }
            }
            $.ajax(params);

        },
        //get Outages
        getOutages: function () {
            var context = this;
            var params = {
                url: "MobileMap/OMSMobileService.asmx/GetAllOutages",
                handleAs: "xml",
                contentType: 'application/xml',
                load: function (result) {
                    context.outageLyr.clear();
                    context.outageLyr.suspend();
                    if (result) {

                        for (var ct = 0; ct < result.childNodes.length; ct++) {
                            if (result.childNodes[ct].nodeName == "MobileOutageInfo") {
                                for (var i = 0; i < result.childNodes[ct].childNodes.length; i++) {
                                    if (result.childNodes[ct].childNodes[i].nodeName == "TotalCustAffected") {
                                        context.totalCustAffected = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i]);
                                    }
                                    else if (result.childNodes[ct].childNodes[i].nodeName == "TotalCustomers") {
                                        context.totalCustomers = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i]);
                                    }
                                    else if (result.childNodes[ct].childNodes[i].nodeName == "OldestOutageTime") {
                                        context.oldestOutageTime = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i]);
                                    }
                                    else if (result.childNodes[ct].childNodes[i].nodeName == "Outages") {
                                        for (var j = 0; j < result.childNodes[ct].childNodes[i].childNodes.length; j++) {
                                            if (result.childNodes[ct].childNodes[i].childNodes[j].nodeName == "MobileOutage") {
                                                var x1;
                                                var y1;
                                                var outCustCount; var outageTime; var outPoleNumber; var outCaseStatus; var outCause; var outRestorationTime; var elementName1;
                                                for (var k = 0; k < result.childNodes[ct].childNodes[i].childNodes[j].childNodes.length; k++) {
                                                    if (result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k].nodeName == "X") {
                                                        x1 = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k]);
                                                    }
                                                    else if (result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k].nodeName == "Y") {
                                                        y1 = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k]);
                                                    }
                                                    else if (result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k].nodeName == "CutomersAffected") {
                                                        outCustCount = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k]);
                                                    }
                                                    else if (result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k].nodeName == "OutageTime") {
                                                        outageTime = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k]);
                                                    }
                                                    else if (result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k].nodeName == "PoleNumber") {
                                                        outPoleNumber = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k]);
                                                    }
                                                    else if (result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k].nodeName == "CaseStatus") {
                                                        outCaseStatus = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k]);
                                                    }
                                                    else if (result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k].nodeName == "Cause") {
                                                        outCause = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k]);
                                                    }
                                                    else if (result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k].nodeName == "RestorationTime") {
                                                        outRestorationTime = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k]);
                                                    }
                                                    else if (result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k].nodeName == "ElementName") {
                                                        elementName1 = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j].childNodes[k]);

                                                    }
                                                }
                                                var imgPath = "";
                                                var symbol;
                                                if (context.enablePulse.toString().toUpperCase() == "TRUE") {
                                                    if ((outCustCount == 1) || (outCustCount == 0)) {
                                                        imgPath = "Images/BlueCirclePulse.gif";
                                                        symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 22, 22);
                                                    }
                                                    else if (outCustCount > 1 && outCustCount < 11) {
                                                        imgPath = "Images/GreenCirclePulse.gif";
                                                        symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 28, 28);
                                                    }
                                                    else if (outCustCount > 10 && outCustCount < 101) {
                                                        imgPath = "Images/YellowCirclePulse.gif";
                                                        symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 32, 32);
                                                    }
                                                    else if (outCustCount > 100 && outCustCount < 501) {
                                                        imgPath = "Images/OrangeCirclePulse.gif";
                                                        symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 42, 42);
                                                    }
                                                    else if (outCustCount > 500) {
                                                        imgPath = "Images/RedCirclePulse.gif";
                                                        symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 54, 54);
                                                    }
                                                }
                                                else {
                                                    if ((outCustCount == 1) || (outCustCount == 0)) {
                                                        imgPath = "Images/Circle_Blue.png";
                                                        symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 12, 12);
                                                    }
                                                    else if (outCustCount > 1 && outCustCount < 11) {
                                                        imgPath = "Images/Circle_Green.png";
                                                        symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 14, 14);
                                                    }
                                                    else if (outCustCount > 10 && outCustCount < 101) {
                                                        imgPath = "Images/Circle_Yellow.png";
                                                        symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 18, 18);
                                                    }
                                                    else if (outCustCount > 100 && outCustCount < 501) {
                                                        imgPath = "Images/Circle_Orange.png";
                                                        symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 22, 22);
                                                    }
                                                    else if (outCustCount > 500) {
                                                        imgPath = "Images/Circle_Red.png";
                                                        symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 27, 27);
                                                    }
                                                }
                                                //var symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 32, 32);
                                                if (outCustCount > 0) {
                                                    var outagetemplate = new esri.InfoTemplate();
                                                    outagetemplate.setTitle("Outage Details");
                                                    outagetemplate.setContent(context.OutageInfo);
                                                    // outagetemplate.setContent("<b>Customers Affected:</b>${CustomersAffected}<br/><b>Outage Time:</b>${OutageTime:DateFormat}<br/><b>PoleNumber:</b>${PoleNumber}<br/><b>CaseStatus:</b>${CaseStatus}<br/><b>Cause:</b>${Cause}<br/><b>Restoration Time:</b>${RestorationTime:DateFormat}");

                                                    var attributes = { "CustomersAffected": outCustCount, "OutageTime": outageTime, "PoleNumber": outPoleNumber, "CaseStatus": outCaseStatus, "Cause": outCause, "RestorationTime": outRestorationTime, "ElementName1": elementName1 };
                                                    var gra = new esri.Graphic(esri.geometry.geographicToWebMercator(new esri.geometry.Point(x1, y1)), symbol, attributes, outagetemplate);
                                                    //var attributes = { "CustomersAffected": outCustCount, "OutageTime": outageTime, "PoleNumber": outPoleNumber, "CaseStatus": outCaseStatus, "Cause": outCause, "RestorationTime": outRestorationTime };

                                                    // gra.setAttributes(attributes);
                                                    context.outageLyr.add(gra);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    context.outageLyr.resume();
                    context.outageLyr.redraw();
                    context.FillOutageDetails();
                    _outagedownloaded = true;

                },
                error: function (err) {
                    alert(err);
                }
            };
            dojo.xhrPost(params);
        },

        createRecord: function (name, fieldValue) {
            var obj = {
                label: name,
                Value: fieldValue

            };
            return obj;
        },
        roundNumber: function (number, precision) {
            precision = Math.abs(parseInt(precision)) || 0;
            var multiplier = Math.pow(10, precision);
            return (Math.round(number * multiplier) / multiplier);
        },

        FillOutageDetails: function () {
            var OutageDetailsArr = [];
            var outageRecord = {};
            var perInService = 100;
            if (this.totalCustAffected > 0 && this.totalCustomers > 0) {
                perInService = ((this.totalCustomers - this.totalCustAffected) / this.totalCustomers) * 100;
                perInService = this.roundNumber(perInService, 2);
            }
            else if (this.totalCustomers > 0)
                perInService = "100";
            else
                perInService = "";

            if (this.disableoldestOutage.toUpperCase() == "TRUE") {
                if (!this.oldestOutageTime || this.totalCustAffected == 0)
                    this.oldestOutageTime = "";
            }
            else
                this.oldestOutageTime = "";

            var entry = this.createRecord(this.CustomersServedFieldLabel, this.totalCustomers);
            OutageDetailsArr.push(entry);

            var entry1 = this.createRecord(this.CustomersAffected, this.totalCustAffected);
            OutageDetailsArr.push(entry1);

            //dojo.byId('totalCustomers').innerHTML = totalCustomers;
            //dojo.byId('affectedCustomers').innerHTML = totalCustAffected;
            if (this.disablePercentageInService.toUpperCase() == "TRUE") {
                var entry2 = this.createRecord("% in Service", perInService);
                OutageDetailsArr.push(entry2);
            }

            //dojo.byId('inService').innerHTML = perInService;
            if (this.disableoldestOutage.toUpperCase() == "TRUE") {
                var entry3 = this.createRecord("Oldest Outage", this.oldestOutageTime);
                OutageDetailsArr.push(entry3);
            }
            var isSame = this.CheckIfOutageDetailsSame(this.OutageDetails, OutageDetailsArr);
            if (!isSame) {

                this.OutageDetails = OutageDetailsArr;
                this.BuildOutageDataGrid(this.OutageDetails);
            }

            //isOutageDetailsLoaded = true;
        },
        CheckIfOutageDetailsSame: function (oldArray, newArray) {
            var isSame = true;
            for (var p = 0; p < newArray.length; p++) {
                if ((oldArray.length == 0) || (oldArray[p].Value != newArray[p].Value)) {
                    isSame = false;
                    break;
                }
            }
            return isSame;
        },
        BuildOutageDataGrid: function (result) {
            var cols = [];
            var rows = [];
            var aoColumnDefs = [];
            var col1 = {
                sTitle: "Name",
                bVisible: true,
                width: null
            }
            cols.push(col1);
            var col2 = {
                sTitle: "Value",
                bVisible: true,
                width: null
            }
            cols.push(col2);
            for (var p = 0; p < result.length; p++) {
                rowcells = [];
                var flabel = result[p].label;
                rowcells.push(flabel);
                var fvalue = result[p].Value;
                rowcells.push(fvalue);
                rows.push(rowcells);
            }
            this.BuildOutageDetailsDataGrid({ title: "Outage Details", columns: cols, rows: rows })

        },

        BuildOutageDetailsDataGrid: function (datagrid) {
            var tableID = new Date().getTime();
            this.outageDetailsGrid.showCustomResults(datagrid);
        },


        ReloadOutages: function () {
            ShowProgressIndicator('map');
            this.loaded = false;

            map.setExtent(mapExtent.expand(1.5));

            HideProgressIndicator();
        },


        //get callBundles

        getCallBundles: function () {
            var context = this;
            var params = {
                url: "MobileMap/OMSMobileService.asmx/GetCallBundles",
                handleAs: "xml",
                contentType: 'application/xml',
                load: function (result) {
                    context.callBundleLyr.clear();

                    if (result) {
                        // alert("hi" + (result.childNodes[0].childNodes[1].childNodes[3].nodeName));--Y
                        //alert("hi" + (result.childNodes[0].nodeName));
                        for (var ct = 0; ct < result.childNodes.length; ct++) {
                            if (result.childNodes[ct].nodeName == "ArrayOfCallBundleInfo")
                            // alert("hi" + (result.childNodes[ct].childNodes[1].nodeName));
                                for (var i = 0; i < result.childNodes[ct].childNodes.length; i++) {
                                    if (result.childNodes[ct].childNodes[i].nodeName == "CallBundleInfo") {
                                        //alert("hi");
                                        for (var j = 0; j < result.childNodes[ct].childNodes[i].childNodes.length; j++) {
                                            var x1;
                                            var y1;
                                            var startTime;
                                            var CustomersAffected;
                                            //alert("node" + result.childNodes[ct].childNodes[i].childNodes[j].nodeName);
                                            if (result.childNodes[ct].childNodes[i].childNodes[j].nodeName == "X") {
                                                x1 = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j]);
                                                // alert("x1" + x1);
                                            }
                                            else if (result.childNodes[ct].childNodes[i].childNodes[j].nodeName == "Y") {
                                                y1 = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j]);
                                                // alert("y1" + y1);
                                            }
                                            else if (result.childNodes[ct].childNodes[i].childNodes[j].nodeName == "StartTime") {
                                                startTime = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j]);
                                            }
                                            else if (result.childNodes[ct].childNodes[i].childNodes[j].nodeName == "CustomersAffected") {
                                                CustomersAffected = dojox.xml.parser.textContent(result.childNodes[ct].childNodes[i].childNodes[j]);
                                            }

                                            var imgPath = "";
                                            var symbol;
                                            if (context.enablePulse.toString().toUpperCase() == "TRUE") {
                                                if ((outCustCount == 1) || (outCustCount == 0)) {
                                                    imgPath = "Images/BlueCirclePulse.gif";
                                                    symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 22, 22);
                                                }
                                                else if (outCustCount > 1 && outCustCount < 11) {
                                                    imgPath = "Images/GreenCirclePulse.gif";
                                                    symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 28, 28);
                                                }
                                                else if (outCustCount > 10 && outCustCount < 101) {
                                                    imgPath = "Images/YellowCirclePulse.gif";
                                                    symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 32, 32);
                                                }
                                                else if (outCustCount > 100 && outCustCount < 501) {
                                                    imgPath = "Images/OrangeCirclePulse.gif";
                                                    symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 42, 42);
                                                }
                                                else if (outCustCount > 500) {
                                                    imgPath = "Images/RedCirclePulse.gif";
                                                    symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 54, 54);
                                                }
                                            }
                                            else {
                                                if ((outCustCount == 1) || (outCustCount == 0)) {
                                                    imgPath = "Images/Circle_Blue.png";
                                                    symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 12, 12);
                                                }
                                                else if (outCustCount > 1 && outCustCount < 11) {
                                                    imgPath = "Images/Circle_Green.png";
                                                    symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 14, 14);
                                                }
                                                else if (outCustCount > 10 && outCustCount < 101) {
                                                    imgPath = "Images/Circle_Yellow.png";
                                                    symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 18, 18);
                                                }
                                                else if (outCustCount > 100 && outCustCount < 501) {
                                                    imgPath = "Images/Circle_Orange.png";
                                                    symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 22, 22);
                                                }
                                                else if (outCustCount > 500) {
                                                    imgPath = "Images/Circle_Red.png";
                                                    symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 27, 27);
                                                }
                                            }
                                            // imgPath = "../Images/GreenPin32.png";
                                            // symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 8, 8);


                                            //var symbol = new esri.symbol.PictureMarkerSymbol(imgPath, 32, 32);

                                            var callBundletemplate = new esri.InfoTemplate();
                                            callBundletemplate.setTitle("Outage Details");
                                            callBundletemplate.setContent(this.CallBundleInfo);

                                            //  outagetemplate.setContent("<b>Start Time:</b>${startTime:DateFormat}");
                                            var attributes = { "startTime": startTime };
                                            var gra = new esri.Graphic(esri.geometry.geographicToWebMercator(new esri.geometry.Point(x1, y1)), symbol, attributes, callBundletemplate);
                                            //var attributes = { "CustomersAffected": outCustCount, "OutageTime": outageTime, "PoleNumber": outPoleNumber, "CaseStatus": outCaseStatus, "Cause": outCause, "RestorationTime": outRestorationTime };

                                            gra.setAttributes(attributes);
                                            context.callBundleLyr.add(gra);



                                        } // end of for loop
                                    } //end of if
                                } // end of for loop

                        }
                        // end of if result
                    }

                }, //load
                error: function (err) {
                    // alert(err);
                }
            };         // end of params
            dojo.xhrPost(params);
            // $.ajax(params);
        },

        //get past outages
        selectPastOutages: function (hrs) {
            var context = this;
            var params = {

                url: "MobileMap/OMSMobileService.asmx/GetPastOutages",
                data: "{'hrs':'" + hrs + "'}",
                // data:$.stringify(hrs),
                dataType: "json",
                handleAs: "json",
                cache: false,
                contentType: "application/json; charset=utf-8",
                type: "POST",
                success: function (result) {
                    //alert('hi1'+ result.d[1].toString());
                    context.PastOutage = [];
                    if (result.d.length > 0) {
                        var data = eval(result.d);
                        for (var event in data) {
                            var t = data[event];
                            var o = {};

                            // eval("o." + CaseNumber + "='" + t.CaseNumber + "'");
                            o.CaseNumber = t.CaseNumber;

                            var cust = t.CutomersAffected;
                            // eval("o." + CustomersAffected + "='" + cust.toString() + "'");
                            o.CustomersAffected = cust.toString();
                            var str = (t.StartTime).replace(/\D/g, "");
                            var d = new Date(parseInt(str));
                            var year = d.getFullYear();
                            var month = (d.getMonth() + 1);
                            var day = d.getUTCDate();
                            var hour = d.getHours();
                            var minutes = d.getMinutes();

                            var finalDate = year + "-" + month + "-" + day + "\n " + hour + ":" + minutes;
                            o.StartTime = finalDate;
                            // alert("tst" + StartTime);
                            //  eval("o." + StartTime +"='" + finalDate + "'");

                            // eval("o." + StartTime + "='" + finalDate + "'");
                            var str1 = (t.EndTime).replace(/\D/g, "");
                            var d1 = new Date(parseInt(str1));
                            var year1 = d1.getFullYear();
                            var month1 = d1.getMonth() + 1;
                            var day1 = d1.getUTCDate();
                            var hour1 = d1.getHours();
                            var minutes1 = d1.getMinutes();

                            var finalDate1 = year1 + "-" + month1 + "-" + day1 + "\n " + hour1 + ":" + minutes1;
                            o.EndTime = finalDate1;
                            // eval("o." + EndTime + "='" + finalDate1 + "'");
                            // eval("o." + Cause + "='" + t.Cause + "'");
                            o.Cause = t.Cause;
                            //eval("o." + AffectedRegions + "='" + t.AffectedRegions + "'");
                            var regions1 = t.AffectedRegions.toString();
                            //alert("string :" + regions1);
                            o.AffectedRegions = regions1;
                            var counties = t.AffectedCounties.toString();
                            o.AffectedCounties = counties;
                            o.ElementName = t.ElementName;
                            o.CaseStatus = t.CaseStatus;
                            context.PastOutage.push(o);
                        }

                    }
                    context.BuildPastOutageDataGrid(context.PastOutage);

                },
                error: function (err) {

                }
            };
            // dojo.xhrPost(params);
            $.ajax(params);
        },

        insertNewLine: function (regions) {
            var newregions = regions.split(",");
            var newstring = "";
            for (var i = 0; i < newregions.length; i++) {

                if (i != 0)
                    newstring += ",\n" + newregions[i];
                else
                    newstring += newregions[i];


            }

            return newstring;
        },

        BuildPastOutageDataGrid: function (result) {
            var cols = [];
            var rows = [];
            var aoColumnDefs = [];
            var col1 = {
                sTitle: this.OutageStatusFieldLabel,
                bVisible: true,
                width: "200px"
            }
            cols.push(col1);
            var col2 = {
                sTitle: this.CustomersAffected,
                bVisible: true,
                width: "200px"
            }
            cols.push(col2);
            var col3 = {
                sTitle: this.StartTime,
                bVisible: true,
                width: "200px"
            }
            cols.push(col3);
            var col4 = {
                sTitle: this.EndTime,
                bVisible: true,
                width: "200px"
            }
            cols.push(col4);
            var col5 = {
                sTitle: this.Cause,
                bVisible: true,
                width: "200px"
            }
            cols.push(col5);
            var col6 = {
                sTitle: this.AffectedRegions,
                bVisible: true,
                width: "200px"
            }
            cols.push(col6);
            var col7 = {
                sTitle: this.AffectedCounties,
                bVisible: true,
                width: "200px"
            }
            cols.push(col7);
            var col8 = {
                sTitle: this.ElementNameLabel,
                bVisible: true,
                width: "200px"
            }
            cols.push(col8);
            for (var p = 0; p < result.length; p++) {
                var rowcells = [];
                var flabel;
                //           flabel = result[p].CaseNumber;
                //           rowcells.push(flabel);
                flabel = result[p].CaseStatus;
                rowcells.push(flabel);
                flabel = result[p].CustomersAffected;
                rowcells.push(flabel);
                flabel = result[p].StartTime;
                rowcells.push(flabel);
                flabel = result[p].EndTime;
                rowcells.push(flabel);
                flabel = result[p].Cause;
                rowcells.push(flabel);
                flabel = result[p].AffectedRegions;
                rowcells.push(flabel);
                flabel = result[p].AffectedCounties;
                rowcells.push(flabel);
                flabel = result[p].ElementName;
                rowcells.push(flabel);

                rows.push(rowcells);
            }
            this.BuildPastOutageDetailsDataGrid({ title: "Past Outage Details", columns: cols, rows: rows })

        },
        BuildPastOutageDetailsDataGrid: function (datagrid) {
            var tableID = new Date().getTime();
            this.pastOutagesGrid.showCustomResults(datagrid);
            this._showWorkingFeedback(false);
        },

        //load staging

        MapInitFunction: function () {
            var context = this;
            dojo.forEach(this.countiesLyr.graphics, function (graphic) {
                graphic.setSymbol(defaultCountiesSymbol);
            });
            dojo.forEach(this.regionsLyr.graphics, function (graphic) {
                graphic.setSymbol(defaultRegionsSymbol);
            });

            Connect.connect(this.map, "onZoomStart", this, function (extent, zoomFactor, anchor, level) {
              
                context.zoomStartLevel = level;
            });
            Connect.connect(this.map, "onZoomEnd", this, function (extent, zoomFactor, anchor, level) {
                if (this.zoomStartLevel == level) {
                    this.map.removeLayer(this.countiesLyr);
                    this.map.removeLayer(this.regionsLyr);
                    this.map.removeLayer(this.outageLyr);
                    this.map.removeLayer(this.customerOutagesLyr);
                    this.map.removeLayer(this.callBundleLyr);
                    this.map.addLayer(this.countiesLyr);
                    this.map.addLayer(this.regionsLyr);
                    this.map.addLayer(this.outageLyr);
                    this.map.addLayer(this.customerOutagesLyr);
                    this.map.addLayer(this.callBundleLyr);
                }

            });

            Connect.connect(this.map, "onExtentChange", function (extent) {
                context.map.infoWindow.hide();
                if (context.maxZoomSetting != null && context.maxZoomSetting != "" && context.map.getLevel() > context.maxZoomSetting) {
                    context.map.setLevel(context.maxZoomSetting);
                }
            });



        }
    };
});