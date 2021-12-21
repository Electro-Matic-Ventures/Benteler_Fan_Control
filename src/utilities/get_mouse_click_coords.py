from pynput import mouse
from datetime import datetime as dt

class MyException(Exception): pass

NumberOfClicks = 0
LastTime = 0
ClickLimit = 10

def on_click(x, y, button, pressed):
    if not pressed: return
    global NumberOfClicks
    global LastTime
    global ClickLimit
    coords = []
    NumberOfClicks += 1
    time_delta = 0
    if LastTime == 0:
        time_delta = 0
    else:
        time_delta = dt.now() - LastTime
        time_delta = time_delta.total_seconds()
    LastTime = dt.now()
    coords = {'x': x, 'y': y}  #, 's': round(time_delta,1)}
    f = open("coords.txt", "a")
    f.write('\t\t' + str(coords) + ',\n')
    f.close()
    if (NumberOfClicks==ClickLimit):
        raise MyException(button)

f = open("coords.txt", 'w')
f.write ('')
f.close()

with mouse.Listener(on_click=on_click) as listener:
    try:
        listener.join()
    except MyException as e:
        pass