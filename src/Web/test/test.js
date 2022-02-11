function drawTemporalTable(data) {
    var _table  = new TemporalTable(data);
    _table.clear(document.getElementById('application'));
    document.getElementById('application').appendChild(_table.drawTable());
}


class TemporalTable {

    constructor(data) {
        this.util = new Utilities();
        this.station_index = 10   // data.station_index;
        this.data = //data 
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
        // _parameters.value = this.#generateValue(index, day, operation);
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


function validatePercent(event, max=100.0, min=0.0) {
    var validator = new ValidatePercent(event)
    validator.limit_value(max, min);
}