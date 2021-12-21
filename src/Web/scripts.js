// #region CONSTANTS
/* 
    these are all vars because declairing them as constants caused
    an error in chrome:
        [error details here]
*/
var APPLICATION = {
    ID: 'application'
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
}
var TIME = {
    ID: 'current_time',
    PAGE_NAME: 'Time.html'
};
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

function getTimeID() {
    return TIME.ID
}


function getTimePageName() {
    return TIME.PAGE_NAME
}
// #endregion

// #endregion


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


// #region UTILITIES
class Utilities {    

    replaceAll(field, target, new_text){
        return field.split(target).join(new_text)
    }

    addClassList(element, class_list) {
        for (var i = 0; i < class_list.length; i++) {
            element.classList.add(class_list[i]);
        }
        return element
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