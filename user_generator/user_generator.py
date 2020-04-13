# -*- coding: utf-8 -*-
import sys
import random
from mimesis import Generic

region = sys.argv[1].lower()
noteCount = sys.argv[2]
mistakeCount = sys.argv[3]

floatCount = 0

if(region == 'by'):
    region = 'uk'
if(region == 'us'):
    region = 'en'

def mistaker(arr):
    numeral = str('0123456789')
    pData = random.randint(0, len(arr) - 1)
    pPoint = random.randint(0, len(arr[pData]) - 1)
    rPoint = random.randint(0, len(arr[pData]) - 1)
    if[s for s in numeral if s in arr[pData][pPoint]]:
        casino = random.randint(0,1)
        if (casino == 0):
            var = arr[pData][pPoint]
            arr[pData] = arr[pData][:pPoint] + arr[pData][rPoint] + arr[pData][pPoint+1:]
            arr[pData] = arr[pData][:rPoint] + var + arr[pData][rPoint+1:]
        else:
            arr[pData] = arr[pData][:pPoint] + str(random.randint(0,9)) + arr[pData][pPoint+1:]
    else:
        casino = random.randint(0,2)
        if(casino == 0 and len(arr[pData])>1):
            arr[pData] = arr[pData][:pPoint] + arr[pData][pPoint+1:]
        elif(casino == 1):
            arr[pData] = arr[pData][:pPoint] + arr[pData][pPoint] + arr[pData][pPoint:]
        elif(casino == 2):
            arr[pData] = arr[pData][:pPoint] + arr[pData][rPoint] + arr[pData][pPoint:]
    return arr

if(region == 'ru' or region == 'en' or region == 'uk'):
    person = Generic(region)
    i = 0
    while i < int(noteCount):
        name = person.person.full_name()
        country = person.address.country()
        state = person.address.state()
        city = person.address.city()
        address = person.address.address()
        postal = person.address.postal_code()
        phone = person.person.telephone()

        userData = [name, country, state, city, address, postal, phone]

        if(float(mistakeCount) < 0):
            print('количество ошибок не может быть отрицательным, ксооооооооо (о)_(о))')
            break
        elif(float(mistakeCount) == 0):
            print(*userData, sep = ',')
        elif(float(mistakeCount)%1 == 0):
            j = 0
            while j < float(mistakeCount):
                userData = mistaker(userData)
                j += 1
            print(*userData, sep = ',')
        elif(float(mistakeCount)>1 and float(mistakeCount) % 1 != 0):
            wholeCount = int(float(mistakeCount) - (float(mistakeCount) % 1))
            floatCount = float(mistakeCount) % 1
            j = 0
            while j < float(wholeCount):
                userData = mistaker(userData)
                floatCount += floatCount
                if(floatCount >= 1):
                     userData = mistaker(userData)
                     floatCount = float(mistakeCount) % 1
                j += 1
            print(*userData, sep = ',')
        elif(float(mistakeCount) < 1):
            floatCount += float(mistakeCount)
            if(floatCount >+ 1):
                 userData = mistaker(userData)
                 floatCount = float(mistakeCount)
            print(*userData, sep = ',')

        i += 1
else :
    print('неправильный регион, бака (>_<)')
