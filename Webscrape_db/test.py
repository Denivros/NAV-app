import json

icao = ['EBBR','EBAW']
name = ['Brussels','Antwerp']
db = {}
db["Aerodromes"] = {}
for i in range(0,len(icao)):
    db["Aerodromes"][icao[i]] = {}
for i in range(0,len(icao)):
    data = {}
    data['name'] = name[i]
    data['icao'] = icao[i]

    db[icao[i]] = data
print(db)



Aerodromes_json = json.dumps(db)

print('done')