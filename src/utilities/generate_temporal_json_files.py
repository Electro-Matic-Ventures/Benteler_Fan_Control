import json
import copy

_library_size = 50
_windown_count = 5

# "start": ":="Stations".me[7].schedules.temporal.sunday[0].start:",
# "stop": ":="Stations".me[7].schedules.temporal.sunday[0].stop:",
# "speed": ":="Stations".me[7].schedules.temporal.sunday[0].speed:"
# "station_index": 7

_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

_template = [
    {"start": '":="Web_Meta".temporal_schedule.[DAY][[WINDOW]].start:"'},
    {"stop": '":="Web_Meta".temporal_schedule.[DAY][[WINDOW]].stop:"'},
    {"speed": '":="Web_Meta".temporal_schedule.[DAY][[WINDOW]].speed:"'}
]

def replaceInDict(data, flag, new_value):
    if type(data) is dict:
        for _key in data.keys():
            if type(data[_key]) is dict:
                replaceInDict(data[_key], flag, new_value)
            if type(data[_key]) is not dict:
                data[_key] = data[_key].replace(flag, new_value)

for _i in range(1):
    if _i == 7: next
    _list = {}
    for _day in _days:
        _day_list = []
        for _window in range(_windown_count):
            _window_dict = {}
            _pairs = copy.deepcopy(_template)
            for _pair in _pairs:
                replaceInDict(_pair, '[INDEX]', str(_i))
                replaceInDict(_pair, '[WINDOW]', str(_window))
                replaceInDict(_pair, '[DAY]', _day)
                _window_dict.update(_pair)
            _day_list.append(_window_dict)
        _list[_day] = _day_list
    _list['station_index'] = str(_i)   
    _output = json.dumps(_list, separators=(',', ': '), sort_keys=True, indent=4)
    _output = _output.replace('\\', '')
    _output = _output.replace('""', '"')

    with open(f'./Web/tags/StationTemporalTags.json', 'w') as _f:
        _f.write('<!-- AWP_In_Variable Name = \'"Stations"\' -->\n\n')
        _f.write(_output)