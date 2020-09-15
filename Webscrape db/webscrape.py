from selenium import webdriver
import json

icao = []
name  = []
coor  = []
iata  = []
country  = []
type_ad  = []
elev = []
rwy_long  = []


browser = webdriver.Firefox()
#browser.minimize_window()
browser.get('https://www.aviationfanatic.com/ent_list.php?ent=7&pg=1&AP_Country=BE')

for i in range(0,25):
    el_icao = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[1]'
    el_name = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[2]'
    el_iata = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[4]'
    el_country = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[5]'
    el_coor = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[6]'
    el_type = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[8]'
    el_elev = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[9]'

    try:
        info = browser.find_element_by_xpath(el_icao)
        data = info.text
        icao = icao + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_name)
        data = info.text
        name = name + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_iata)
        data = info.text
        iata = iata + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_country)
        data = info.text
        country = country + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_coor)
        data = info.text
        coor = coor + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_type)
        data = info.text
        type_ad = type_ad + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_elev)
        data = info.text
        elev = elev + [data]
    except:
        continue

browser.get('https://www.aviationfanatic.com/ent_list.php?ent=7&pg=2&AP_Country=BE')

for i in range(0,25):
    el_icao = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[1]'
    el_name = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[2]'
    el_iata = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[4]'
    el_country = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[5]'
    el_coor = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[6]'
    el_type = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[8]'
    el_elev = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[9]'

    try:
        info = browser.find_element_by_xpath(el_icao)
        data = info.text
        icao = icao + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_name)
        data = info.text
        name = name + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_iata)
        data = info.text
        iata = iata + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_country)
        data = info.text
        country = country + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_coor)
        data = info.text
        coor = coor + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_type)
        data = info.text
        type_ad = type_ad + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_elev)
        data = info.text
        elev = elev + [data]
    except:
        continue

browser.get('https://www.aviationfanatic.com/ent_list.php?ent=7&pg=3&AP_Country=BE')


for i in range(0,21):
    el_icao = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[1]'
    el_name = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[2]'
    el_iata = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[4]'
    el_country = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[5]'
    el_coor = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[6]'
    el_type = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[8]'
    el_elev = '/html/body/div[3]/table/tbody/tr['+str(i+2)+']/td[9]'

    try:
        info = browser.find_element_by_xpath(el_icao)
        data = info.text
        icao = icao + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_name)
        data = info.text
        name = name + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_iata)
        data = info.text
        iata = iata + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_country)
        data = info.text
        country = country + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_coor)
        data = info.text
        coor = coor + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_type)
        data = info.text
        type_ad = type_ad + [data]
    except:
        continue
    try:
        info = browser.find_element_by_xpath(el_elev)
        data = info.text
        elev = elev + [data]
    except:
        continue


print(icao)
print(name)

browser.quit()

def format_coor (coor):
    try:
        data1 = coor[1:7]
        data2 = coor[9:16]
        print(data1)
        return data1+coor[0] + data2 + coor[8]
    except:
        return 'no coor or error'

Aerodromes = {}
for i in range(0,len(icao)):
    Aerodromes[icao[i]] = {}
for i in range(0,len(icao)):
    data = {}
    data['name'] = name[i]
    data['icao'] = icao[i]
    data['coor'] = format_coor(coor[i])
    data['country'] = country[i]
    data['elevation'] = elev[i]
    data['iata'] = iata[i]
    data['type'] = type_ad[i]

    print(data)
    Aerodromes[icao[i]] = data
print(Aerodromes)



Aerodromes_json = json.dumps(Aerodromes)
print(Aerodromes_json)

with open('data.json', 'w') as f:
    json.dump(Aerodromes, f)

print('done')