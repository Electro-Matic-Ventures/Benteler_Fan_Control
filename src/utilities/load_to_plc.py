import pyautogui as pag
from pandas import DataFrame
from datetime import datetime as dt
import numpy as np


def load_to_plc():
    
    moves = [
		{'x': 792, 'y': 1062},
		{'x': 682, 'y': 460},
		{'x': 1562, 'y': 672},
		{'x': 945, 'y': 885},
		{'x': 1023, 'y': 562},
		{'x': 676, 'y': 469},
		{'x': 397, 'y': 55},
		{'x': 1312, 'y': 459},
		{'x': 1252, 'y': 488},
		{'x': 1207, 'y': 718},
		{'x': 1112, 'y': 731},
		{'x': 742, 'y': 1052}
    ]

    wait = [
        0.25,
        0.25,
        0.25,
        0.25,
        2.5,
        0.25,
        2.5,
        2.0,
        0.25,
        2.5,
        0.25,
        0.25
    ]

    click_locations = [
        'SWITH APPLICATIONS',
        'PLC', 
        'PROPERTIES', 
        'GENERATE BLOCKS', 
        'CONFIRM WEB DB DELETION', 
        'PLC', 
        'DOWNLOAD BUTTON', 
        'STOP PLC LIST BOX', 
        'STOP PLC SELECTION', 
        'LOAD', 
        'FINISH',
        'RETURN TO VSCODE'
    ]    
    
    for i,move in enumerate(moves): 
        manipulate_mouse(move, wait[i])
        label = write_labels(i, click_locations, move, wait)
        print(label)

    print('Moves list completed at ' + str(dt.now()))
    print('\n')
    return


def manipulate_mouse(move, wait):
    pag.moveTo(move['x'], move['y'], 0.0) 
    pag.click()    
    pag.PAUSE = wait


def write_labels(i, locations, move, wait):
    move_label = write_move_label(i)
    write_label = write_loc_label(locations[i], locations)
    time_label = str(write_time_label(wait[i]))
    label = move_label + write_label + time_label
    return label


def write_move_label(i):
    move_label = 'MOVE: {}'.format(str(i+1))
    if i < 9:
        move_label += '    '
    else:
        move_label += '   '
    return move_label


def write_loc_label(loc, labels):
    longest = get_longest_label(labels)
    _loc_spaces = ''
    for _ in range(longest - len(loc)):
        _loc_spaces += ' ' 
    _loc_spaces += '    '
    label = loc + _loc_spaces
    return label


def get_longest_label(labels):
    longest = 0
    for x in labels:
        if len(x) > longest:
            longest = len(x)
    return longest


def write_time_label(wait):
    return wait


load_to_plc()