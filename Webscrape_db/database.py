import csv
import os
import json
def sort2arrays(list1,list2):
    list1, list2 = (list(t) for t in zip(*sorted(zip(list1, list2))))
    return list1,list2

def string_cleanup(string):
    data = string
    data = data.split(',')
    data[0] = data[0].replace('[','')
    data[0] = data[0].replace("'",'')
    data[-1] = data[-1].replace(']','')
    data[-1] = data[-1].replace("'",'')

    while '' in data:
        data.remove('')
    while "'" in data:
        data.remove("'")

    return data

def init_database_csv():

    print('Init Database CSV')
    file = 'database.csv'
    with open(file, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter='\t')
        line = list(spamreader)

    VFR_REP_POINTS_name = []
    VFR_REP_POINTS_coor = []
    AD_name = []
    AD_coor = []
    VFR_name_OTHER = []
    VFR_coor_OTHER = []
    VFR_name_VOR = []
    VFR_coor_VOR = []

    for i in range(0,len(line)):
        data = str(line[i])
        line[i] = string_cleanup(data)
    
    index = 0
    for i in range(0,len(line)):
        if line[i] == ['AD']:
            index_ad = i
    AD_name = line[index_ad + 2]
    AD_coor = line[index_ad + 3]

    for i in range(0,len(line)):
        if line[i] == ['REP POINT AD']:
            index_ad_rep = i
    for i in range(0,len(line)):
        if line[i] == ['CUSTOM']:
            index_custom = i
    for i in range(0,len(line)):
        if line[i] == ['VOR']:
            index_vor = i
    for i in range(0,len(line)):
        if line[i] == ['OTHER']:
            index_other = i

    for i in range(index_ad_rep,len(line)):
        data = ''.join(line[i])
        if data in AD_name:
            index = i
            VFR_REP_POINTS_name = VFR_REP_POINTS_name + line[index + 1]
            VFR_REP_POINTS_coor = VFR_REP_POINTS_coor + line[index + 2]

    VFR_name_VOR = line[index_vor + 1]
    VFR_coor_VOR = line[index_vor + 2]
    VFR_REP_POINTS_name = VFR_REP_POINTS_name + VFR_name_VOR
    VFR_REP_POINTS_coor = VFR_REP_POINTS_coor + VFR_coor_VOR

    VFR_name_OTHER = line[index_other + 1] + line[index_custom + 1]
    VFR_coor_OTHER = line[index_other + 2] + line[index_custom + 2]
    VFR_REP_POINTS_name = VFR_REP_POINTS_name + VFR_name_OTHER
    VFR_REP_POINTS_coor = VFR_REP_POINTS_coor + VFR_coor_OTHER

    data = sort2arrays(VFR_REP_POINTS_name,VFR_REP_POINTS_coor)
    VFR_REP_POINTS_name = data[0]
    VFR_REP_POINTS_coor = data[1]

    return AD_name,AD_coor,VFR_REP_POINTS_name,VFR_REP_POINTS_coor,VFR_name_OTHER,VFR_coor_OTHER,VFR_name_VOR,VFR_coor_VOR

data = init_database_csv()
name = data[2]
coor = data[3]
to_ad_icao = ['']*len(name)
country = ['BE']*len(name)
db = {}
db["Waypoints"] = {}

for i in range(0,len(name)):
    db["Waypoints"][name[i]] = {}
for i in range(0,len(name)):
    data = {}
    data['name'] = name[i]
    data['to_ad_icao'] = to_ad_icao[i]
    data['coor'] = coor[i]
    data['country'] = country[i]

    print(data)
    db["Waypoints"][name[i]] = data
print(db)



db_json = json.dumps(db)
print(db_json)

with open('data_WPT.json', 'w') as f:
    json.dump(db, f)



