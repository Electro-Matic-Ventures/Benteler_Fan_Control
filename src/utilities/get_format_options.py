
colors = [
    '<option value="black">BLACK</option>',
    '<option value="blue">BLUE</option>',
    '<option value="green">GREEN</option>',
    '<option value="mix 1">MIX 1</option>',
    '<option value="mix 2">MIX 2</option>',
    '<option value="mix 3">MIX 3</option>',
    '<option value="mix 4">MIX 4</option>',
    '<option value="red">RED</option>',
    '<option value="white">WHITE</option>',
    '<option value="yellow">YELLOW</option>'
]
size_and_face = [
    '<option value="bold 5">BOLD 5</option>',
    '<option value="bold 11">BOLD 11</option>',
    '<option value="bold 14">BOLD 14</option>',
    '<option value="bold 15">BOLD 15</option>',
    '<option value="bold 16">BOLD 16</option>',
    '<option value="bold 22">BOLD 22</option>',
    '<option value="bold 30">BOLD 30</option>',
    '<option value="bold 32">BOLD 32</option>',
    '<option value="bold 40">BOLD 40</option>',
    '<option value="normal 5">NORMAL 5</option>',
    '<option value="normal 7">NORMAL 7</option>',
    '<option value="normal 9">NORMAL 9</option>',
    '<option value="normal 11">NORMAL 11</option>',
    '<option value="normal 14">NORMAL 14</option>',
    '<option value="normal 15">NORMAL 15</option>',
    '<option value="normal 16">NORMAL 16</option>',
    '<option value="normal 22">NORMAL 22</option>',
    '<option value="normal 24">NORMAL 24</option>',
    '<option value="normal 30">NORMAL 30</option>',
    '<option value="normal 32">NORMAL 32</option>',
    '<option value="normal 40">NORMAL 40</option>'
]
vertical_alignment = [
    '<option value ="bottom hold">BOTTOM HOLD</option>',
    '<option value ="fill hold">FILL HOLD</option>',
    '<option value ="middle hold">MIDDLE HOLD</option>',
    '<option value ="top hold">TOP HOLD</option>',
    '<option value ="bottom scroll">BOTTOM SCROLL</option>',
    '<option value ="fill scroll">FILL SCROLL</option>',
    '<option value ="middle scroll">MIDDLE SCROLL</option>',
    '<option value ="top scroll">TOP SCROLL</option>'
]
scroll_speed = [                        
    '<option value ="slowest">SLOWEST</option>',
    '<option value ="slow">SLOW</option>',
    '<option value ="normal">NORMAL</option>',
    '<option value ="fast">FAST</option>',
    '<option value ="fastest">FASTEST</option>',
]
L = '="'
R = '">'
_options = [colors, size_and_face, vertical_alignment, scroll_speed]
_output = ''

for i,_option in enumerate(_options):
    for j,_text in enumerate(_option):
        _output += _text[_text.find(L)+2:_text.find(R)] + '\n'
    _output += '\n'

_file = open("output.txt", "w")
_file.write(_output)
_file.close