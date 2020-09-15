
coor = "N504422 E0032910"


def format_coor (coor):
    data1 = coor[1:7]
    data2 = coor[9:16]
    print(data1)
    return data1+coor[0] + data2 + coor[8]

print(format_coor(coor))