// #region CONSTANTS
/* 
    these are all vars because declairing them as constants caused
    an error in chrome:
        [error details here]
*/
var APPLICATION = {
    ID: 'application',
    PAGE_NAME: 'Application.html'
};
var BANNER ={
    ID: 'banner',
    PAGE_NAME: 'Banner.html'
};
var SIDE_NAV = {
    ID: 'side_nav',
    PAGE_NAME: 'SideNav.html'
};
var SYSTEM_SETTINGS = {
    PAGE_NAME: 'SystemSettings.html'
};
var TIME = {
    ID: 'current_time',
    PAGE_NAME: 'Time.html'
};
var CELL_HEIGHT = {
    NORMAL: 32,
    BLANK: 5
}
var OVERHEAD_VIEW = {
    ID: "overhead_view",
    PAGE_NAME: 'OverheadView.html'
}
// #endregion


// #region CALLED FROM PAGE
function GetSetTimeData(){
	$.ajaxSetup({cache:false});
	setInterval(
        function ()
            {
                fetch("./SetTimeTags.json")
                    .then(function(resp){return resp.json();})
                    .then(function(data){
                        if (document.getElementById(TIME.ID)) {
                            DrawTimeCell(data);
                            return
                        }
                    })
            }            
    ,500);
    }


function validatePercent(event, max=100.0, min=0.0) {
    var validator = new ValidatePercent(event)
    validator.limit_value(max, min);
}


function getOverheadViewData() {
    $.ajaxSetup ({cache:false});
    fetchOverheadViewData();   
    setInterval (
        function () {fetchOverheadViewData();},
        5_000
    );
}


function fetchOverheadViewData() {
    fetch ("./tags/OverheadViewTags.json")
        .then(function (resp) { return resp.json(); })
        .then(function (data) { drawOverheadView(data); });
}


function CollapseDiv(element){
    element.classList.toggle("active");
    var content = element.nextElementSibling;
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        var newHeight = 10 + content.scrollHeight
        content.style.maxHeight = newHeight + "px";
    }
}


function loadPage(id, file_name) {
    var page_id = '#' + id;
    $(page_id).load(file_name);
}


function loadIframe(iframe_id, page) {
    document.getElementById(iframe_id).src = page;
}


function saveStationIndex(element) {
    const id = element.id.split("_")[1];
    getStationIndex(id);
}


function goToOverheadView() {
    $.ajaxSetup(
        {cache:'true'}
    );
    $.get(
        './Index.html',
        {
            '"Web_Meta".selected_station':-1
        }
    );
    location.replace('./Index.html');
}
// #endregion


// #region FUNCTIONS THAT RETRIEVE CONSTANTS
function getBannerID(){
    return BANNER.ID
}


function getBannerPageName(){
    return BANNER.PAGE_NAME
}


function getSideNavID(){
    return SIDE_NAV.ID
}


function getSideNavPageName() {
    return SIDE_NAV.PAGE_NAME
}


function getApplicationID() {
    return APPLICATION.ID
}


function getApplicationPageName() {
    return APPLICATION.PAGE_NAME
}


function getTimeID() {
    return TIME.ID
}


function getTimePageName() {
    return TIME.PAGE_NAME
}

function getOverheadViewPageName() {
    return OVERHEAD_VIEW.PAGE_NAME
}

// #endregion


// #region UTILITIES
class Utilities {    

    replaceAll(field, target, new_text){
        if (field.search(target) != -1) {
            return field.split(target).join(new_text)
        }
        return field
    }

    addClassList(element, class_list) {
        for (var i = 0; i < class_list.length; i++) {
            element.classList.add(class_list[i]);
        }
        return element
    }    

    /**
     * 
     * @param {ControlParameters} parameters 
     * @returns 
     */
    controlObject(parameters) {
        var _field = document.createElement("INPUT");
        if (parameters.id != null) {
            _field.id = parameters.id;
        }
        if (parameters.type != null) {
            _field.type = parameters.type;
        }
        if (parameters.class_list != null) {
            this.addClassList(_field, parameters.class_list);
        }
        if (parameters.name != null) {
            _field.name = parameters.name;
        }
        if (parameters.size != null) {
            _field.size = parameters.size;
        }
        if (parameters.value != null) {
            _field.value = parameters.value;
        }
        if (parameters.checked != null) {
            if (parameters.checked == 1) {
                _field.checked = true;
            } else {
                _field.checked = false;
            }
        }
        return _field;
    }

}

/** ControlParameters jsdoc
 * @class
 * @property {string} id
 * @property {string} type
 * @property {string[]} class_list
 * @property {string} name
 * @property {number} size
 * @property {string} value
 */
class ControlParameters {

    constructor() {
        this.id = null;
        this.type = null;
        this.class_list = null;
        this.name = null;
        this.size = null;
        this.value = null;
        this.check_box_value = null;
    }

}

class FlaggedString{

    constructor(template, flags, new_values){
        this.template = template;
        this.flags = flags;
        this.new_values = new_values;
        this.util = new Utilities();
    }

    process() {
        var _length = this.flags.length;
        var _ret = this.template;
        for (var i = 0; i < _length; i++) {
            _ret = this.util.replaceAll(_ret, this.flags[i], this.new_values[i]);
        }
        return _ret
    }

}


class ClassicTable {

    constructor() {
        this.util = new Utilities();
    }


    createTable(id, class_list) {
        var _ret = document.createElement('table');
        this.#addIDAndClassList(_ret, id, class_list);
        return _ret
    }

    createBody(id, class_list) {
        var _ret = document.createElement('tbody');
        this.#addIDAndClassList(_ret, id, class_list);
        return _ret
    }

    createHeadCell(id, class_list) {
        var _ret = document.createElement('th');
        this.#addIDAndClassList(_ret, id, class_list);
        return _ret
    }

    createRow(id, class_list) {
        var _ret = document.createElement('tr');
        this.#addIDAndClassList(_ret, id, class_list);
        return _ret
    }

    createCell(id, class_list) {
        var _ret = document.createElement('td');
        this.#addIDAndClassList(_ret, id, class_list);
        return _ret
    }

    createFoot(id, class_list) {
        var _ret = document.createElement('div');
        this.#addIDAndClassList(_ret, id, class_list);
        return _ret
    }

    createBlankRow(row_number, column_count) {
        var _id = 'blank_row_' + row_number;
        var _class_list = ['blank_row'];
        var _row = this.createRow(_id, _class_list);
        var _cell = this.createBlankCell(row_number, 0);
        _cell.colSpan = column_count;
        _row.appendChild(_cell);
        return _row
    }

    createBlankCell(row_number, column_number) {
        var _id = 'blank_cell_' + row_number + '_' + column_number;
        var _class_list = ['blank_cell'];
        var _cell = this.createCell(_id, _class_list);
        return _cell
    }
    #addIDAndClassList(element, id, class_list) {
        element.id = id;
        this.util.addClassList(element, class_list);
    }

}


class DivTable {

    createTable () {
        var _ret = document.createElement('div');
        _ret.classList.add('rTable');
        return _ret
    }

    createBody () {
        var _ret = document.createElement('div');
        _ret.classList.add('rTableBody');
        return _ret
    }

    createHeadCell () {
        var _ret = document.createElement('div');
        _ret.classList.add('rTableHead');
        return _ret
    }

    createRow () {
        var _ret = document.createElement('div');
        _ret.classList.add('rTableRow');
        return _ret
    }

    createCell () {
        var _ret = document.createElement('div');
        _ret.classList.add('rTableCell');
        return _ret
    }

    createFoot () {
        var _ret = document.createElement('div');
        _ret.classList.add('rTableFoot');
        return _ret
    }

}


class ValidatePercent {

    constructor(data) {
        this.value = data.target.value;
        this.target = data.target.id;
    }

    limit_value(max=100.0, min=0.0) {
        document.getElementById(this.target).value = this.#check_limit(max, min);
    }

    #check_limit(max=100.0, min=0.0) {
        if (this.value > max) {
            window.alert("Must be a positive number between 0.0 and 100.0. \n Your input was truncated to its last valid state.")
            return this.value.slice(0, -1);
        }
        if (this.value < min) {
            window.alert("Must be a positive number between 0.0 and 100.0. \n Your input was deleted.")
            return "";
        }
        return this.value
    }

}


// #region SelectBox
class SelectBox {

    /* NOTES
        
        DESCRIPTION:
        call SelectBox.build(data) to build a select box

        EXAMPLE OUTPUT:
        <select id="[SELECT_ID]" class="[SELECT_CLASS]" name="[SELECT_NAME]"> 
            <option id="[OPTION_ID]" class="[OPTION_CLASS]" value="[OPTION_VALUE]">"[OPTION_BODY]"</option>
            <option id="[OPTION_ID]" class="[OPTION_CLASS]" value="...">...</option> 
            <option id="[OPTION_ID]" class="[OPTION_CLASS]" value="[OPTION_VALUE]">"[OPTION_BODY]"</option> 
        </select> 

    */ 
    
    /**
     * use generate() to create a string for an html select box with options
     * @param {SelectBoxData} data - all data necessary to generate a select box
     */
    constructor(data){
        this.select_data = data.select;
        this.option_data = data.options;
        this.util = new Utilities();
    }

    /**
     * @returns {String} html text box with options ready to be inserted into page 
     */
    generate() {
        var _select = this.#select(this.select_data);
        var _options = this.#buildOptions();
        for (var i = 0; i < _options.length; i++) {
            _select.appendChild(_options[i]);
        }
        return _select;
    }

    #select(){
        var _select = document.createElement('select');
        _select.id = this.select_data.id;
        _select = this.util.addClassList(_select, this.select_data.class_list);
        _select.name = this.select_data.name;
        return _select
    }

    #buildOptions() {
        var _options = [];
        var _option_data = this.option_data;
        for(var i = 0; i < _option_data.length; i++) {
            _options.push(this.#buildOption(_option_data[i]));
        }
        return _options
    }

    #buildOption(option_data) {
        var _option = document.createElement('option');
        _option.id = option_data.id;
        _option.innerHTML = option_data.inner_html;
        _option = this.util.addClassList(_option, option_data.class_list);
        _option.selected = option_data.selected;
        _option.value = option_data.value;
        return _option
    }

}


class SelectBoxData {
    constructor() {
        this.select = new SelectBoxSelectData();
        this.options = []; // array of SelectBoxOptionData
    }
}


class SelectBoxSelectData {
    constructor () {
        this.id = '';
        this.class_list = [];
        this.name = '';
    }
}


class SelectBoxOptionData {
    constructor () {
        this.id = '';
        this.inner_html = '';
        this.class_list = [];
        this.selected = '';
        this.value = '';
    }
}
// #endregion
// #endregion


// #region TIME CELL
function DrawTimeCell(data) {
    var _time = new PLCTime(data);
    document.getElementById(TIME.ID).innerHTML = _time.clear;
    document.getElementById(TIME.ID).innerHTML = _time.write();
}

class PLCTime{
    /**
     * retreives time from plc data using write(data)
     */
    constructor(data){
        this.current_time = data.current_time
    }
    clear(){
        return ''
    }

    write(){
        return this.current_time
    }
}
// #endregion


// #region STATION OVERVIEW

function drawFanOverview(data) {
    var _fan_summary  = new FanSummary(data);
    document.getElementById(FAN_OVERVIEW.ID).innerHTML = _fan_summary.clear();
    document.getElementById(FAN_OVERVIEW.ID).appendChild(_fan_summary.write());
}

class FanSummary {

    constructor (data) {
        this.data = data;
        // this.header is how the column headers will be drawn to the screen
        this.header = ['#', 'speed', 'temp', 'in schedule', 'alarm'];
        // this.key_map maps the columns to plc data keys
        // order should match this.header, string should match keys from plc data
        this.key_map = ['station_number', 'speed', 'temperature', 'scheduled', 'alarm'];
        this.tableWriter = new DivTable();
    }

    clear () {
        return ''
    }

    write () {
        var _table = this.tableWriter.createTable();
        var _head = this.createHeader(this.header);
        _table.appendChild(_head);
        var _data = this.data.stations
        var _l = _data.length;
        for (var _i = 0; _i < _l; _i++) {
            var _row = this.createRow(_data[_i], _i);
            _table.appendChild(_row);
        }
        return _table
    }

    createHeader (column_labels) {
        var _header_row = this.tableWriter.createRow();
        var _l = column_labels.length;
        for (var _i = 0; _i < _l; _i++) {
            var _header_cell = this.tableWriter.createHeadCell();
            _header_cell.innerText = column_labels[_i];
            _header_cell.classList.add(this.key_map[_i]);
            _header_cell.id = 'header_' + this.key_map[_i];
            _header_row.appendChild(_header_cell);
        }
        return _header_row
    }

    createRow (data, row_number) {
        var _row = this.tableWriter.createRow();
        var _l_keys = this.key_map.length;
        for (var _i = 0; _i < _l_keys; _i++) {
            var _cell = this.createCell(data[this.key_map[_i]], row_number, this.key_map[_i]);
            _row.appendChild(_cell);
        }
        _row.onclick = function () { loadStationControlIFrame(row_number) };
        return _row
    }

    createCell(data, row, key) {
        var _cell = this.tableWriter.createCell();
        _cell.innerText = data;
        _cell.id = 'row_' + row.toString() + '_' + key;
        _cell.classList.add(key);
        return _cell
    }

}


// #endregion


// #region OVERHEAD VIEW

function drawOverheadView(data) {
    var _util = new Utilities();
    var _data = null;
    var _element = null;
    for (var _i=0; _i<data.colors.length; _i++) {
        _data = data.colors[_i];
        _data.color = _util.replaceAll(_data.color, '&#x27;', '');
        if (_data.id == 0) {
            return;
        }
        _element = document.getElementById('station_' + _data.id + '_button');
        _element.classList.remove('green');
        _element.classList.remove('blue');
        _element.classList.remove('red');
        _element.classList.remove('yellow');
        switch (_data.color) {
            case 'blue':
                _element.classList.add(_data.color);
                _element.style.color = 'white';
                break;
            case "green":
                _element.classList.add(_data.color);
                _element.style.color = 'black';
                break;
            case "yellow":
                _element.classList.add(_data.color);
                _element.style.color = 'black';
                break;
            case "red":
                _element.classList.add(_data.color);
                _element.style.color = 'white';
                break;
        }
    }
}

// #endregion


// #region GO TO STATION FROM OVERHEAD VIEW

function getStationIndex(id) {
    fetch("./tags/StationMap.json")
        .then(function(resp){return resp.json();})
        .then(function(data){
            saveSelectedStationAndLoadControlPage(data.map, id);
            return
        })
}

function saveSelectedStationAndLoadControlPage(data, id) {
    var station_index = data.indexOf(id);
    $.ajaxSetup(
        {cache:'true'}
    );
    $.get(
        './SingleStationControl.html',
        {
            '"Web_Meta".selected_station':station_index
        }
    );
    location.replace('./SingleStationControl.html');
}

function loadStation() {
    fetch('./tags/SelectedStation.json')
        .then(function(resp){return resp.json();})
        .then(function(data){
            fetchStationDataByID(data.selected_station);
            return
        })
}

function fetchStationDataByID(station_index) {
    var json_file_name = "./tags/Station" + station_index + "ControlTags.json";
    fetch(json_file_name)
        .then(function(resp){return resp.json();})
        .then(function(data){
            drawStationControl(data);
            return
        })
}

function drawStationControl (data) {
    var _station_control  = new StationControl(data.station_data);
    _station_control.clear(document.getElementById(APPLICATION.ID));
    _station_control.drawTable( document.getElementById(APPLICATION.ID));
}

class StationControl {

    constructor (data) {
        this.util = new Utilities();
        this.data = this.#validateData(data);
        this.status_table = new StatusTable(this.data);
        this.manual_table = new ManualTable(this.data);
        this.thermal_window_table = new ThermalWindowTable(this.data);
        this.temporal_window_table = new TemporalWindowTable(this.data);
    }

    #validateData(data) {
        var _data = data;
        Object.keys(_data).forEach(_key => {
            if (_data[_key].length == 0) {
                _data[_key] = "NO DATA";
            }
            _data[_key] = this.util.replaceAll(_data[_key], "&#x27;", "");
          });
        return _data
    }

    clear (element) {        
        while (element.firstChild) {
            element.firstChild.remove();
        }
    }

    drawTable (element) {
        var _status_table = this.status_table.drawTable();
        element.appendChild(_status_table);
        var _blank_row = this.#blankRow('below_status');
        element.appendChild(_blank_row);
        var _manual_table = this.manual_table.drawTable();
        element.appendChild(_manual_table);
        var _blank_row = this.#blankRow('below_manual');
        element.appendChild(_blank_row);
        var _thermal_window_table = this.thermal_window_table.drawTable();
        element.appendChild(_thermal_window_table);
        var _blank_row = this.#blankRow('below_thermal');
        element.appendChild(_blank_row);
        var _temporal_window_table = this.temporal_window_table.drawTable();
        element.appendChild(_temporal_window_table);
        var _blank_row = this.#blankRow('below_schedule');
        element.appendChild(_blank_row);
        return
    }

    #blankRow(id) {
        var _ret = document.createElement('div');
        _ret.appendChild(document.createElement('br'));
        _ret.id = id;
        this.util.addClassList(_ret, ['blank', 'table_separator']);
        return _ret
    }

} 
// #endregion


// #region STATUS
function refreshStatusData() {
    $.ajaxSetup ({cache:false});
    loadStatusTable();   
    setInterval (
        function () {loadStatusTable();},
        500
    );
}


function loadStatusTable() {
    fetch('./tags/SelectedStation.json')
        .then(function(resp){return resp.json();})
        .then(function(data){
            fetchStatusData(data.selected_station);
            return
        })
}


function fetchStatusData(selected_station) {
    var json_file_name = "./tags/StationStatusTags.json";
    fetch (json_file_name) 
        .then(function(resp) {return resp.json();})
        .then(function(data){
            drawStatusTable(data);
            return
        })
}


function drawStatusTable(data) {
        var _table  = new StatusTable(data);
        _table.clear(document.getElementById('status_application_host'));
        document.getElementById('status_application_host').appendChild(_table.drawTable());
}


class StatusTable {

    constructor(data) {
        this.util = new Utilities();
        this.station_index = data.station_index;
        this.data = data.station_data;
        this.table_writer = new ClassicTable();
        this.COLUMN_NAMES = [
            'station id',  'state', 'speed', 'commanded', 'current', 'temperature', 'faults'
        ];
        this.COLUMN_COUNT = this.COLUMN_NAMES.length * 2 - 1;
    }

    clear (element) {        
        while (element.firstChild) {
            element.firstChild.remove();
        }
    }

    drawTable() {
        var _status_table = this.table_writer.createTable('status_table', ['status']);
        var _title = this.#drawTitleRow();
        _status_table.appendChild(_title);
        var _blank_row = this.#drawBlankRow();
        _status_table.appendChild(_blank_row);
        var _header = this.#drawHeaderRow(this.COLUMN_NAMES.STATUS);
        _status_table.appendChild(_header);
        var _status_row = this.#drawRow();
        _status_table.appendChild(_status_row);
        return _status_table
    }

    #validateData(data) {
        var _data = data;
        Object.keys(_data).forEach(_key => {
            if (_data[_key].length == 0) {
                _data[_key] = "NO DATA";
            }
            _data[_key] = this.util.replaceAll(_data[_key], "&#x27;", "");
          });
        return _data
    }

    #drawTitleRow() {
        var _id = 'title_row';
        var _class_list = ['status', 'title'];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _cell = this.#drawTitleCell();
        _row.appendChild(_cell);
        return _row
    }

    #drawTitleCell() {
        var _id = 'title_cell';
        var _class_list = ['status', 'title'];
        var _cell = this.table_writer.createHeadCell(_id, _class_list);
        _cell.colSpan = this.COLUMN_COUNT;
        _cell.innerHTML = 'STATUS';
        return _cell
    }

    #drawBlankRow() {
        var _row = this.table_writer.createBlankRow(1, this.COLUMN_COUNT);
        return _row
    }

    #drawHeaderRow() {
        var _id = 'status_header_row';
        var _class_list = ['status', 'header'];
        var _header_row = this.table_writer.createRow(_id, _class_list);
        var _cell;
        for (var _i=0; _i<this.COLUMN_NAMES.length; _i++) {
            _cell = this.#drawHeaderCell(this.COLUMN_NAMES[_i]);
            _header_row.appendChild(_cell);
            if (_i<this.COLUMN_NAMES.length-1) {
                _cell = this.table_writer.createBlankCell(2, _i*2+1);
                _header_row.appendChild(_cell);
            }
        }
        return _header_row
    }

    #drawHeaderCell(data) {
        var _cell_type = this.util.replaceAll(data, ' ', '_');
        var _id = 'header_' + _cell_type;
        var _class_list = ['status', 'header', _cell_type];
        var _cell = this.table_writer.createHeadCell(_id, _class_list);
        _cell.innerHTML = data;
        return _cell
    }

    #drawRow() {
        var _id = 'status_output_row';
        var _class_list = ['status', 'output'];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _cell;
        var _column_title;
        for (var _i=0; _i<this.COLUMN_NAMES.length; _i++) {
            _column_title = this.COLUMN_NAMES[_i];
            _column_title = this.util.replaceAll(_column_title, ' ', '_');
            _cell = this.#drawCell(_column_title);
            _row.appendChild(_cell);
            if (_i<this.COLUMN_NAMES.length-1) {
                _cell = this.table_writer.createBlankCell(2, _i*2+1);
                _row.appendChild(_cell);
            }
        }
        return _row
    }

    #drawCell(column_title) {
        var _data = this.data[column_title];
        switch (column_title) {
            case 'station_id':
                _data = 'RTU-00' + _data;
                _data = this.util.replaceAll(_data, "&#x27;",'');
                break;
            case 'state':
                _data = this.util.replaceAll(_data, "&#x27;",'');
                break;
            case 'speed':
                _data = parseFloat(_data).toFixed(2);
                break;
            case 'commanded':
                _data = parseFloat(_data).toFixed(2);
                break;
            case 'current':
                _data = parseFloat(_data).toFixed(2);
                break;
            case 'temperature':
                _data = parseFloat(_data).toFixed(2);
                break;
            case 'faults':
                _data = this.util.replaceAll(_data, "&#x27;",'');
            default:
                break;
        }
        _data = this.util.replaceAll(_data, ' ', '_');
        var _id = 'row_0_' + _data;
        var _class_list = ['status', 'output', _data];
        var _cell = this.table_writer.createCell(_id, _class_list);
        _cell.innerHTML = _data;
        return _cell
    }

}
// #endregion


// #region MANUAL
function getManualData() {
    fetch('./tags/SelectedStation.json')
        .then(function(resp){return resp.json();})
        .then(function(data){
            fetchManualData(data.selected_station);
            return
        })
}


function fetchManualData(station_index) {
    var json_file_name = "./tags/StationManualTags.json";
    fetch (json_file_name) 
        .then(function(resp) {return resp.json();})
        .then(function(data){
            drawManualTable(data);
            return
        })
}


function drawManualTable(data) {
    var _table  = new ManualTable(data);
    _table.clear(document.getElementById('manual_application_host'));
    document.getElementById('manual_application_host').appendChild(_table.drawTable());
}


class ManualTable {

    constructor(data) {
        this.util = new Utilities();
        this.station_index = data.station_index;
        this.speed = data.command_speed;
        this.mode = this.util.replaceAll(data.mode, '&#x27;', '');
        this.toggle = data.toggle;
        this.override = data.override;
        this.acknowledge = data.acknowledge;
        this.table_writer = new ClassicTable();
        this.COLUMN_NAMES = [
            'command speed', 'override', 'acknowledge faults', 'mode', 'toggle mode'
        ];
        this.COLUMN_COUNT = this.COLUMN_NAMES.length * 2 - 1;
    }

    clear (element) {        
        while (element.firstChild) {
            element.firstChild.remove();
        }
    }

    drawTable() {
        var _table = this.table_writer.createTable('manual_control_table', ['manual_control']);
        var _title = this.#drawTitleRow();
        _table.appendChild(_title);
        var _blank_row = this.#drawBlankRow();
        _table.appendChild(_blank_row);
        var _header = this.#drawHeaderRow(this.COLUMN_NAMES.STATUS);
        _table.appendChild(_header);
        var _status_row = this.#drawRow();
        _table.appendChild(_status_row);
        var _form = this.#drawForm();
        _form.appendChild(_table);
        return _form
    }

    #validateData(data) {
        var _data = data;
        Object.keys(_data).forEach(_key => {
            if (_data[_key].length == 0) {
                _data[_key] = "NO DATA";
            }
            _data[_key] = this.util.replaceAll(_data[_key], "&#x27;", "");
          });
        return _data
    }

    #drawForm() {
        var _form = document.createElement('form');
        _form.id = 'manual_host_form';
        this.util.addClassList(_form, ['manual', 'host']);
        return _form
    }

    #drawTitleRow() {
        var _id = 'manual_control_title_row';
        var _class_list = ['manual_control', 'title'];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _cell = this.#drawTitleCell();
        _row.appendChild(_cell);
        _cell = this.table_writer.createBlankCell(0, 5);
        _row.appendChild(_cell);
        _cell = this.#drawSubmitCell();
        _row.appendChild(_cell);
        return _row
    }

    #drawTitleCell() {
        var _id = 'manual_control_title_cell';
        var _class_list = ['manual_control', 'title'];
        var _cell = this.table_writer.createHeadCell(_id, _class_list);
        _cell.colSpan = this.COLUMN_COUNT;
        _cell.innerHTML = 'MANUAL CONTROL';
        return _cell
    }

    #drawSubmitCell() {
        var _id = 'manual_control_submit_host';
        var _class_list = ['manual_control', 'submit'];
        var _cell = this.table_writer.createCell(_id, _class_list);
        _cell.rowSpan = 4;
        _cell.style.height = CELL_HEIGHT.NORMAL * 3 + CELL_HEIGHT.BLANK + 'px';
        _cell.appendChild(this.#drawSubmitButton());
        var _hidden = document.createElement('input');
        _hidden.type = 'hidden';
        _hidden.value = 1;
        _hidden.name = '"Web_Meta".manual.submit';
        _cell.appendChild(_hidden);
        return _cell
    }


    #drawSubmitButton() {
        var _button = document.createElement('input');
        _button.id = 'manual_control_submit';
        this.util.addClassList(_button, ['manual', 'submit']);
        _button.type = 'submit';
        _button.value = 'SUBMIT';
        return _button
    }

    #drawBlankRow() {
        var _row = this.table_writer.createBlankRow(1, this.COLUMN_COUNT + 1);
        return _row
    }

    #drawHeaderRow() {
        var _id = 'manual_control_header_row';
        var _class_list = ['manual_control', 'header'];
        var _header_row = this.table_writer.createRow(_id, _class_list);
        var _cell;
        for (var _i=0; _i<this.COLUMN_NAMES.length; _i++) {
            _cell = this.#drawHeaderCell(this.COLUMN_NAMES[_i]);
            _header_row.appendChild(_cell);
            _cell = this.table_writer.createBlankCell(2, _i*2+1);
            _header_row.appendChild(_cell);
        }
        return _header_row
    }

    #drawHeaderCell(data) {
        var _cell_type = this.util.replaceAll(data, ' ', '_');
        var _id = 'manual_control_header_' + _cell_type;
        var _class_list = ['manual_control', 'header', _cell_type];
        var _cell = this.table_writer.createHeadCell(_id, _class_list);
        _cell.innerHTML = data;
        return _cell
    }

    #drawRow() {
        var _id = 'manual_control_input_row';
        var _class_list = ['manual_control', 'input'];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _cell;
        var _column_title;
        for (var _i=0; _i<this.COLUMN_NAMES.length; _i++) {
            _column_title = this.COLUMN_NAMES[_i];
            _column_title = this.util.replaceAll(_column_title, ' ', '_');
            _cell = this.#drawCell(_column_title);
            _row.appendChild(_cell);
            _cell = this.table_writer.createBlankCell(2, _i*2+1);
            _row.appendChild(_cell);
        }
        return _row
    }

    #drawCell(type) {
        var _type = this.util.replaceAll(type, ' ', '_');
        var _id = 'row_3_' + _type;
        var _class_list = ['manual_control', 'input', _type, 'host'];
        var _cell = this.table_writer.createCell(_id, _class_list);
        var _control;
        switch(type) {
            case 'command_speed':
                _control = this.#controlByType(_type);
                _control.addEventListener('input', validatePercent);
                _cell.appendChild(_control);
                break;
            case 'mode':
                _cell.innerHTML = this.mode;
                break;
            case 'override':
                _control = this.#controlByType('hidden');
                _cell.appendChild(_control);
                _control = this.#controlByType(_type);
                _cell.appendChild(_control);
                break;
            default:
                _control = this.#controlByType(_type);
                _cell.appendChild(_control);
                break;
        }
        return _cell
    }

    #controlByType(type) {
        var _ret;
        var _parameters;
        switch(type) {
            case 'command_speed':
                _parameters = {
                    type: 'text',
                    id: 'command_speed_input_field',
                    class_list: ['manual_contorl', 'command_speed'],
                    name: '"Web_Meta".manual.command_speed',
                    size: 8,
                    value: this.speed
                }
                break;
            case 'toggle_mode':
                _parameters = {
                    type: 'checkbox',
                    id: 'toggle_input_field',
                    class_list: ['manual_contorl', 'toggle'],
                    name: '"Web_Meta".manual.toggle'
                }
                break;
            case 'override':
                _parameters = {
                    type: 'checkbox',
                    id: 'override_on_input_field',
                    class_list: ['manual_contorl', 'override'],
                    name: '"Web_Meta".manual.override',
                    checked: this.override
                }
                break;
            case 'acknowledge_faults':
                _parameters = {
                    type: 'checkbox',
                    id: 'acknowledge_input_field',
                    class_list: ['manual_contorl', 'acknowledge'],
                    name: '"Web_Meta".manual.acknowledge'
                }
                break;
            case 'hidden':
                _parameters = {
                    type: 'hidden',
                    id: 'override_hidden_input_field',
                    class_list: ['manual_contorl', 'override', 'hidden'],
                    name: '"Web_Meta".manual.override',
                    value: 0
                }
                break;
        }
        _ret = this.util.controlObject(_parameters);
        return _ret
    }

}
// #endregion


// #region THERMAL
function getThermalData() {
    fetch('./tags/SelectedStation.json')
        .then(function(resp){return resp.json();})
        .then(function(data){
            fetchThermalData(data.selected_station);
            return
        })
}


function fetchThermalData(station_index) {
    var json_file_name = "./tags/StationThermalTags.json";
    fetch (json_file_name) 
        .then(function(resp) {return resp.json();})
        .then(function(data){
            drawThermalTable(data);
            return
        })
}


function drawThermalTable(data) {
    var _table  = new ThermalTable(data);
    _table.clear(document.getElementById('thermal_application_host'));
    document.getElementById('thermal_application_host').appendChild(_table.drawTable());
}


class ThermalTable {

    constructor(data) {
        this.util = new Utilities();
        this.station_index = data.station_index;
        this.start = data.start;
        this.max = data.max;
        this.table_writer = new ClassicTable();
    }

    clear (element) {        
        while (element.firstChild) {
            element.firstChild.remove();
        }
    }

    drawTable() {
        var _table = this.table_writer.createTable('manual_control_table', ['manual_control']);
        var _title = this.#drawTitleRow();
        _table.appendChild(_title);
        var _blank_row = this.#drawBlankRow();
        _table.appendChild(_blank_row);
        var _header = this.#drawHeaderRow();
        _table.appendChild(_header);
        var _temperature_row = this.#drawRow('temperature');
        _table.appendChild(_temperature_row);
        var _speed_row = this.#drawRow('speed');
        _table.appendChild(_speed_row);
        var _form = this.#drawForm();
        _form.appendChild(_table);
        return _form
    }

    #drawForm() {
        var _form = document.createElement('form');
        _form.id = 'thermal_host_form';
        this.util.addClassList(_form, ['thermal', 'host']);
        return _form
    }

    #validateData(data) {
        var _data = data;
        Object.keys(_data).forEach(_key => {
            if (_data[_key].length == 0) {
                _data[_key] = "NO DATA";
            }
            _data[_key] = this.util.replaceAll(_data[_key], "&#x27;", "");
          });
        return _data
    }

    #drawTitleRow() {
        var _id = 'thermal_ramp_title_row';
        var _class_list = ['thermal_ramp', 'title'];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _cell = this.#drawTitleCell();
        _row.appendChild(_cell);
        _cell = this.table_writer.createBlankCell(0, 5);
        _row.appendChild(_cell);
        _cell = this.#drawSubmitCell();
        _row.appendChild(_cell);
        return _row
    }

    #drawTitleCell() {
        var _id = 'thermal_ramp_title_cell';
        var _class_list = ['thermal_ramp', 'title'];
        var _cell = this.table_writer.createHeadCell(_id, _class_list);
        _cell.colSpan = 5;
        _cell.innerHTML = 'THERMAL RAMP';
        return _cell
    }

    #drawSubmitCell() {
        var _id = 'thermal_ramp_submit_cell';
        var _class_list = ['thermal_ramp', 'submit'];
        var _cell = this.table_writer.createCell(_id, _class_list);
        _cell.rowSpan = 5;
        _cell.style.height = CELL_HEIGHT.NORMAL * 4 + CELL_HEIGHT.BLANK + 'px';
        _cell.appendChild(this.#drawSubmitButton());
        return _cell
    }

    #drawSubmitButton() {
        var _button = document.createElement('input');
        _button.id = 'thermal_ramp_submit';
        this.util.addClassList(_button, ['thermal_ramp']);
        _button.type = 'submit';
        _button.value = 'SUBMIT';
        return _button
    }

    #drawBlankRow() {
        var _row = this.table_writer.createBlankRow(1, 6);
        return _row
    }

    #drawHeaderRow() {
        var _id = 'thermal_ramp_header_row';
        var _class_list = ['thermal_ramp', 'header'];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _cell = this.#drawHeaderCell('START');
        _cell.colSpan = 2;
        _row.appendChild(_cell);
        _cell = this.table_writer.createBlankCell(2, 2);
        _row.appendChild(_cell);
        _cell = this.#drawHeaderCell('MAX');
        _row.appendChild(_cell);
        _cell = this.table_writer.createBlankCell(2, 5);
        _row.appendChild(_cell);
        return _row
    }

    #drawHeaderCell(label) {
        var _id = 'thermal_ramp_header_' + label;
        var _class_list = ['thermal_ramp', 'header', label];
        var _cell = this.table_writer.createHeadCell(_id, _class_list);
        _cell.colSpan = 2;
        _cell.innerHTML = label;
        return _cell
    }

    #drawRow(label) {
        var _id = 'thermal_ramp_' + label + '_input_row';
        var _class_list = ['thermal_ramp', label];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _label = this.#drawLabelCell(label, 'start');
        _row.appendChild(_label);
        var _input = this.#drawInputCell(label, 'start');
        _row.appendChild(_input);
        _row.appendChild(this.table_writer.createBlankCell(3, 2));
        _label = this.#drawLabelCell(label, 'max');
        _row.appendChild(_label);
        _input = this.#drawInputCell(label, 'max');
        _row.appendChild(_input);
        _row.appendChild(this.table_writer.createBlankCell(3, 5))
        return _row
    }

    #drawLabelCell(label, category) {
        var _id = 'row_3_label_' + category;
        var _class_list = ['thermal_ramp', 'label', label, category];
        var _cell = this.table_writer.createCell(_id, _class_list);
        _cell.innerHTML = label;
        return _cell
    }

    #drawInputCell(label, category) {
        var _id = category + '_' + label + '_intput_host';
        var _class_list = ['thermal_ramp', label, category, 'host'];
        var _ret = this.table_writer.createCell(_id, _class_list);
        var _parameters = new ControlParameters();
        _parameters.id = category + '_' + label + '_input_field';
        _parameters.name = '"Stations".me[' + this.station_index + '].schedules.thermal.' + category + '.' + label + '';
        _parameters.type = "text";
        _parameters.class_list = ['thermal_ramp', label, category];
        _parameters.size = 8; 
        _parameters.value = this.#getValue(label, category);       
        var _input = this.util.controlObject(_parameters);
        if (label == 'speed') {
            _input.addEventListener('input', validatePercent);
        }
        _ret.appendChild(_input);
        return _ret
    }

    #getValue(label, category) {
        if (label == 'temperature' && category == 'start') {
            return this.start.temperature;
        }
        if (label == 'temperature' && category == 'max') {
            return this.max.temperature;
        }
        if (label == 'speed' && category == 'start') {
            return this.start.speed;
        }
        if (label == 'speed' && category == 'max') {
            return this.max.speed;
        }
        
    }

}
// #endregion


// #region TEMPORAL
function loadTemporalControl() {
    fetch('./tags/SelectedStation.json')
        .then(function(resp){return resp.json();})
        .then(function(data){
            fetchTemporalData(data.selected_station);
            return
        })
}


function fetchTemporalData(station_index) {
    var json_file_name = "./tags/StationTemporalTags.json";
    fetch (json_file_name) 
        .then(function(resp) {return resp.json();})
        .then(function(data){
            drawTemporalTable(data);
            return
        })
}


function drawTemporalTable(data) {
    var _table  = new TemporalTable(data);
    _table.clear(document.getElementById('temporal_application_host'));
    document.getElementById('temporal_application_host').appendChild(_table.drawTable());
}

class TemporalTable {

    constructor(data) {
        this.util = new Utilities();
        this.station_index = data.station_index;
        this.data = data // this.#validateData(data);
        this.table_writer = new ClassicTable();
        this.DAYS_OF_WEEK = [
            'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
        ];
        this.WINDOW_COUNT = 4;
    }

    clear (element) {        
        while (element.firstChild) {
            element.firstChild.remove();
        }
    }

    drawTable() {
        var _id = 'schedule_table';
        var _class_list = ['schedule'];
        var _table = this.table_writer.createTable(_id, _class_list);
        var _title = this.#titleRow();
        _table.appendChild(_title);
        var _blank = this.#blankRow();
        _table.appendChild(_blank);
        var _days_of_week = this.#drawDayOfWeekRow();
        _table.appendChild(_days_of_week);
        _blank = this.#blankRow();
        _table.appendChild(_blank);
        var _row;
        for (var _i=0; _i<this.WINDOW_COUNT; _i++) {
            _row = this.#drawWindowRow(_i);
            _table.appendChild(_row);
            _row = this.#drawWindowStopSubRow(_i);
            _table.appendChild(_row);
            _row = this.#drawWindowSpeedSubRow(_i);
            _table.appendChild(_row);
            if (_i < this.WINDOW_COUNT - 1) {
                _row = this.#blankRow();
                _table.appendChild(_row);
            }
        }
        var _form = this.#drawForm();
        _form.appendChild(_table);
        return _form
    }

    #drawForm() {
        var _form = document.createElement('form');
        _form.id = 'temporal_host_form';
        this.util.addClassList(_form, ['temporal', 'host']);
        return _form
    }

    #validateData(data) {
    }

    #titleRow() {
        var _id = 'schedule_title_row';
        var _class_list = ['schedule', 'title'];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _cell = this.#drawTitleCell();
        _row.appendChild(_cell);
        _cell = this.table_writer.createBlankCell(0, 17);
        _row.appendChild(_cell);
        _cell = this.#drawSubmitCell();
        _row.appendChild(_cell);
        return _row
    }

    #drawTitleCell() {
        var _id = 'schedule_title';
        var _class_list = ['schedule', 'title'];
        var _cell = this.table_writer.createHeadCell(_id, _class_list);
        _cell.colSpan = 16;
        _cell.innerHTML = 'SCHEDULE';
        return _cell
    }

    #blankRow() {
        var _row = this.table_writer.createBlankRow(1, 17);
        return _row
   }

    #drawSubmitCell() {
        var _id = 'schedule_submit_host';
        var _class_list = ['schedule', 'submit', 'host'];
        var _cell = this.table_writer.createCell(_id, _class_list);
        _cell.rowSpan = 23;
        var _submit_button = this.#drawSubmitButton();
        _cell.appendChild(_submit_button);
        return _cell
    }

    #drawSubmitButton() {
        var _parameters = new ControlParameters();
        _parameters.id = 'schedule_submit_button';
        _parameters.class_list = ['schedule', 'submit'];
        _parameters.type = 'submit';
        _parameters.value = 'SUBMIT';
        var _button = this.util.controlObject(_parameters);
        return _button
    }

    #drawDayOfWeekRow() {
        var _id = '';
        var _class_list = ['label'];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _blank = this.table_writer.createBlankCell(2, 0);
        _blank.colSpan = 3;
        _row.appendChild(_blank);
        var _label;
        for (var _i=0; _i<this.DAYS_OF_WEEK.length; _i++) {
            _label = this.#dayOfWeekLabel(this.DAYS_OF_WEEK[_i]);
            _row.appendChild(_label);
            _blank = this.table_writer.createBlankCell(5, 5);
            _row.appendChild(_blank);
        }
        return _row
    }

    #dayOfWeekLabel(day) {
        var _id = day + '_label';
        var _class_list = ['label'];
        var _cell = this.table_writer.createCell(_id, _class_list);
        _cell.innerHTML = day;
        return _cell
    }

    #drawWindowRow(index) {
        var _id = 'schedule_window_' + index + '_row';
        var _shade = this.#getShade(index);
        var _class_list = ['schedule', 'window', _shade];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _window_label = this.#drawWindowLabel(index);
         _row.appendChild(_window_label);
        var _start_label = this.#drawWindowSubLabel(index, 'start');
        _row.appendChild(_start_label);
        var _cell = this.table_writer.createBlankCell(index * 2 + 3, 2);
        _row.appendChild(_cell);
        var _day;
        for (var _i=0; _i<this.DAYS_OF_WEEK.length; _i++) {
            _day = this.DAYS_OF_WEEK[_i];
            _cell = this.#drawInputCell(index, 'start', 'datetime-local', _day);
            _row.appendChild(_cell);
            _cell = this.table_writer.createBlankCell(index + 3, _i + 4);
            _row.appendChild(_cell);
        }
        return _row
    }

    #drawWindowStopSubRow(index) {
        var _id = '';
        var _shade = this.#getShade(index);
        var _class_list = [_shade];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _stop_label = this.#drawWindowSubLabel(index, 'stop');
        _row.appendChild(_stop_label);
        var _cell = this.table_writer.createBlankCell(index * 2 + 4, 2);
        _row.appendChild(_cell);
        var _day;
        for (var _i=0; _i<this.DAYS_OF_WEEK.length; _i++) {
            _day = this.DAYS_OF_WEEK[_i];
            _cell = this.#drawInputCell(index, 'stop', 'datetime-local', _day);
            _row.appendChild(_cell);
            _cell = this.table_writer.createBlankCell(index + 4, _i + 2);
            _row.appendChild(_cell);
        }
        return _row
    }

    #drawWindowSpeedSubRow(index) {
        var _id = '';
        var _shade = this.#getShade(index);
        var _class_list = [_shade];
        var _row = this.table_writer.createRow(_id, _class_list);
        var _speed_label = this.#drawWindowSubLabel(index, 'speed');
        _row.appendChild(_speed_label);
        var _cell = this.table_writer.createBlankCell(index *2 + 5, 2);
        _row.appendChild(_cell);
        var _day;
        for (var _i=0; _i<this.DAYS_OF_WEEK.length; _i++) {
            _day = this.DAYS_OF_WEEK[_i];
            _cell = this.#drawInputCell(index, 'speed', 'text', _day);
            _cell.firstChild.addEventListener('input', validatePercent);
            _row.appendChild(_cell);
            _cell = this.table_writer.createBlankCell(index * 2 + 5, _i + 2);
            _row.appendChild(_cell);
        }
        return _row
    }

    #drawWindowLabel(index) {
        var _id = 'window_' + index + '_label';
        var _shade = this.#getShade(index);
        var _class_list = [_shade, 'label'];
        var _cell = this.table_writer.createCell(_id, _class_list);
        _cell.innerHTML = 'window ' + index;
        _cell.rowSpan = 3;
        return _cell;
    }

    #drawWindowSubLabel(index, type) {
        var _id = '';
        var _shade = this.#getShade(index);
        var _class_list = [_shade, 'label'];
        var _cell = this.table_writer.createCell(_id, _class_list);
        _cell.innerHTML = type;
        return _cell
    }

    #drawInputCell(index, type, input_type, day) {
        var _id = '';
        var _shade = this.#getShade(index);
        var _class_list = [_shade, 'host'];
        var _cell = this.table_writer.createCell(_id, _class_list);
        var _input = this.#createInput(index, input_type, day, type);
        _cell.appendChild(_input);
        return _cell
    }

    #createInput(index, input_type, day, operation) {
        var _parameters = new ControlParameters();
        _parameters.id = '';
        _parameters.name = this.#generateName(index, day, operation);
        var _shade = this.#getShade(index);
        _parameters.class_list = [_shade];
        _parameters.type = input_type;
        _parameters.size = 8;
        _parameters.value = this.#generateValue(index, day, operation);
        var _input = this.util.controlObject(_parameters);
        return _input
    }

    #generateName(window_index, day, operation) {
        var _name = '"Web_Meta".temporal_schedule.' + day +'[' + window_index + '].' + operation;
        return _name
    }

    #generateValue(window_index, day, operation) {
        var _plc = this.data[day][window_index][operation]
        var _value = this.util.replaceAll(_plc, '&#x27;', '');
        _value = this.util.replaceAll(_value, '&#x3a;', ':');
        _value = this.util.replaceAll(_value, '&#x2d;', '-');
        return _value
    }

    #getShade(index) {
        var _shade = 'light';
        if (index % 2 == 1) {
            _shade = 'dark';
        }
        return _shade
    }



}

// #endregion