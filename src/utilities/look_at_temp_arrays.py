# #in.message_pointers.sign[#i]
destination = '#in.message_pointers.sign[[SIGN]].message[[MESSAGE]]'
source = destination
f = open('output.txt', 'w')
for sign in range(2):
    for message in range(5):
        _destination = destination.replace('[SIGN]', str(sign)).replace('[MESSAGE]', str(message))
        _source = _destination
        f.write('{} := {};\n'.format(_source, _destination))
f.close()