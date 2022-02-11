import json

_station_count = 50

_list = []
for _i in range(_station_count):
    _line = f'":="Stations".me[{_i}].id:"'
    _list.append(_line)
_map = {"map": _list}
_output = json.dumps(_map, separators=(',', ': '), sort_keys=True, indent=4)
_output = _output.replace('\\', '')
_output = _output.replace('""', '"')

with open(f'./Web/tags/StationMap.json', 'w') as _f:
    _f.write('<!-- AWP_In_Variable Name = \'"Stations"\' -->\n\n')
    _f.write(_output)
