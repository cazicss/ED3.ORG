define([
    "dojo/_base/declare",
    "dojo/Evented",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/_base/lang",
    "dojo/on",
    "esri/layers/GraphicsLayer",
    "esri/renderers/UniqueValueRenderer",
    "esri/renderers/ClassBreaksRenderer",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/InfoTemplate",
    "esri/geometry/Point",
    "esri/graphic",
    "esri/SpatialReference",
    "esri/geometry/Extent",
    "esri/geometry/screenUtils",
    "esri/geometry/webMercatorUtils",
    "esri/graphicsUtils",
    "dojo/text!./templates/DataGrid.html"
], function (declare, Evented, _WidgetBase, _TemplatedMixin, lang, on, GraphicsLayer, UniqueValueRenderer,
    ClassBreaksRenderer, SimpleRenderer, SimpleMarkerSymbol, SimpleLineSymbol, InfoTemplate, Point, Graphic,
    SpatialReference, Extent, screenUtils, webMercatorUtils, graphicsUtils, template) {

    var self;

    var DataGrid = declare([_WidgetBase, _TemplatedMixin], {
        //viewModel: {},
        //data: {},
        //resultSender: '',
        templateString: template,
        widgetsInTemplate: true,
        dataTableInitialized: false,
        gridEstablished: false,
        viewName: 'Search Results',
        dataTable: '',
        dataTableID: '',
        map: '',
        config: '',
        graphicsLayer: '',
        graphicItemTemplate: '',
        results: '',
        json: '',
        showTableTools: '',
        tableID: new Date().getTime(),
        constructor: function (options) {

            if (options.viewName)
                this.viewName = options.viewName;
            this.map = options.map;
            this.tableID = options.tableID;
        },

        correctSMSColors: function (configRenderer) {
          
        },
        getClickedFeatures: function (args) {
           
        },
        highlightFeatures: function (json, isAutoRefresh) {
          
        },
        highlightCustomFeatures: function (items) {
         
        },

        customRowSelected: function (nRow, aData, columnIndex) {
            var table = $("#tbl" + this.tableID).dataTable();
            $(table.fnSettings().aoData).each(function () {
                $(this.nTr).removeClass('row_selected');
            });
            $(nRow).addClass('row_selected');

            var item = aData[aData.length - 1];
            this.onIdentifyFeature(this.viewName,item);
            // this.onZoomToCustomSearchFeature(this.viewName, item);
        },

        onClosePanel: function (viewName) { },
        onZoomToFeature: function (item) { },
        onZoomToCustomSearchFeature: function (viewName, item, zoomScale) { },
        onIdentifyFeature:function(viewName,item){},
        onDataTableFiltered: function (viewName) { },
        redrawTable: function () {
            try {
                $($.fn.dataTable.fnTables(true)).dataTable().fnAdjustColumnSizing();
            } catch (e) {
            }
        },
        showCustomResults: function (results) {
           
            this.results = results;
            this._redrawCustomTable(results);
        },
        _redrawCustomTable: function (results) {
           // this.customSearchZoomScale = results.zoomScale
            $(this.divSearchResultsWrapper).html('');
            //this.viewName = this.tableID;
            var table = $('<table id="tbl' + this.tableID + '" style="width: 100%" class="pretty"></table>');

           

            $(this.divSearchResultsWrapper).append(table);
            var context = this;
            var dataTableSettings = {
                "aaData": results.rows,
                "aoColumns": results.columns,
               //"sScrollY": 200,//((navigator.userAgent.match(/iPad/i) != null) ? 100 : 110),
                "bDeferRender": false,                
               // "aaSorting": [[0, "asc"]],
                "bPaginate": false,
                "bJQueryUI": true,
                "bAutoWidth": true,                
                "sScrollX": "100%", //DO NOT SET            
               
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $.each($('td', nRow), function (columnIndex, cell) {
                        $(cell).on('click', lang.hitch(context, context.customRowSelected, nRow, aData, columnIndex));
                    });
                },
            };

//            if (results.aoColumnDefs.length > 0) {
//                dataTableSettings.aoColumnDefs = results.aoColumnDefs;
//            }

            if (true) {
                dataTableSettings.oLanguage = {
                    //"sInfo": "",
                    "sZeroRecords": "Data not available"
                }
                dataTableSettings.sDom = 't';
                // dataTableSettings.sDom = 'ip<"#divClose' + this.tableID + '.divDatGridCloseButtonWrapper">T';
               // dataTableSettings.sDom = 'ip<"clear"><"#divClose' + this.tableID + '.divDatGridCloseButtonWrapper"><"divTableTools"T>t';// '<t>';

            }
//            else {
//                dataTableSettings.sDom = 'ip<"clear"><"#divClose' + this.tableID + '.divDatGridCloseButtonWrapper">t';
//            }

            this.dataTableID = "#tbl" + this.tableID;
            if ((this.viewName == "counties")|| (this.viewName == "regions"))
                dataTableSettings.sScrollY = 200;
                else if (this.viewName == "pastOutages")
                dataTableSettings.sScrollY = 300;
            this.dataTable = $(this.dataTableID).DataTable(dataTableSettings);
           // this.dataTable.on("search.dt", lang.hitch(this, this.customDataTable_filtered));

            

        }
    });

    return DataGrid;

});