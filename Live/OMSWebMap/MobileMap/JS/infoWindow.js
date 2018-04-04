dojo.provide("mobile.InfoWindow");
dojo.require("esri.InfoWindowBase");

dojo.declare("mobile.InfoWindow", [esri.InfoWindowBase], {

    constructor: function (parameters) {
        dojo.mixin(this, parameters);

        this.infoWindowWidth;
        this.infoWindowHeight;

        dojo.addClass(this.domNode, "divInfoWindowContainer");

        this._container = dojo.create("div", { "class": "" }, this.domNode);
        this._title = dojo.create("div", { "class": "title" }, this._container);
        this._content = dojo.create("div", { "class": "content" }, this._container);
        this._anchor = dojo.create("div", { "class": "divTriangle" }, this.domNode);
        this._imgDetails;

        if (!isMobileDevice) {
           // this._content.appendChild(dojo.byId('divCreateRequestContainer'));
           // this._content.appendChild(dojo.byId('divServiceRequestContent'));
            //dojo.byId('divCreateRequestContainer').style.display = "none";
           // dojo.byId('divCreateRequestContainer').className = "";
           // dojo.byId('divServiceRequestContent').style.display = "none";
           // dojo.byId('divServiceRequestContent').className = "";
        }

        this._spanContent = dojo.create("span", { "class": "spanContentText" }, this._content);

        // Hidden initially
        esri.hide(this.domNode);
        this.isShowing = false;
        this._eventConnections = [];
    },

    setMap: function (map) {
        this.inherited(arguments);

        //  hide the info window when the user is focusing elsewhere.
        if (isMobileDevice) {
            this._eventConnections.push(dojo.connect(map, "onPanStart", this, this.hide));
            this._eventConnections.push(dojo.connect(map, "onZoomStart", this, this.hide));
        }
    },

    setTitle: function (title, callbackHandler) {
        RemoveChildren(this._title);
        var titleNode = document.createTextNode(title);
        this._title.appendChild(titleNode);
        this._imgDetails = dojo.create("img", { "class": "imgArrow", "src": "../images/cancel.png" }, this._title);
    },

    imgDetailsInstance: function () {
        return this._imgDetails;
    },

    setContent: function (content) {
        this._spanContent.style.display = "block";
        this._spanContent.innerHTML = content;
    },

    show: function (location) {
        this._title.style.display = "block";
        if (this._imgDetails)
            this._imgDetails.style.display = "block";

        if (!isMobileDevice) {
          //  dojo.byId('divCreateRequestContainer').style.display = "none";
           // dojo.byId('divServiceRequestContent').style.display = "none"
        }

        this.setLocation(location);
    },

    reSetLocation: function (location) {
        this._title.style.display = "none";
        this._imgDetails.style.display = "none";
        this._spanContent.style.display = "none";

        this.setLocation(location);
    },

    setLocation: function (location) {
        if (location.spatialReference) {
            location = this.map.toScreen(location);
        }

        dojo.style(this.domNode, {
            left: (location.x - (this.infoWindowWidth)/2) + "px",
            top: (location.y - this.infoWindowHeight - 15) + "px"

            //left: (location.x - (this.infoWindowWidth / 2)) + "px",
            //bottom: (location.y + 28) + "px"
        });
        esri.show(this.domNode);
        this.isShowing = true;
    },

    hide: function () {
        esri.hide(this.domNode);
        this.isShowing = false;
        this.onHide();

        if (!isMobileDevice) {
           // dojo.byId('divCreateRequestContainer').style.display = "none";
           // dojo.byId('divServiceRequestContent').style.display = "none"
        }
    },

    resize: function (width, height) {
        this.infoWindowWidth = width;
        this.infoWindowHeight = height;
        dojo.style(this._content, {
            width: width + "px"
        });

        dojo.style(this._container, {
            width: width + "px",
            height: height + "px"
        });
        dojo.style(this.domNode, {
            width: width + "px",
            height: height + "px"
        });
        dojo.style(this._title, {
            width: (width - 10) + "px"
        });
    },

    destroy: function () {
        dojo.forEach(this._eventConnections, dojo.disconnect);
        dojo.destroy(this.domNode);
        this._title = this._content = this._eventConnections = this._imgDetails = null;
    }

});