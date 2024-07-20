import csv
import re
dictFinal=[]
id=0
with open('dict.csv', 'r', encoding='utf-8') as csv_file:  
    reader = csv.reader(csv_file)\

    dict1={}

    for line in reader:
        id+=1
        word=line[0]
        definition=[]
        example=[]
        keywords=[]

        tmp=re.split(r'\([0-9]\)', line[1].replace("bk.", "(bk)").replace("(a.s.)", "(a-s)").replace("Malk.", "Malkar").replace(".)", ")").replace("1.", "(1)").replace("2.", "(2)").replace("3.", "(3)").replace("4.", "(4)").replace("5.", "(5)"))
        # .replace("(malk.)","(malk)").replace("(d.)","(d)").replace("(med.)","(med)").replace("(folk.)","(folk)").replace("(zoo.)","(zoo)").replace("(mec.)","(mec)").replace("(mec.)","(mec)")
        for i in tmp:
            definition.append(i.split('.')[0])
            if len(i.split('.'))>1:
                tmpEx=i.split('.')[1].split(',')
                tmpLst=[]
                for x in tmpEx:
                    tmpLst.append(x.split(':'))
                example.append(tmpLst)

        
        for i in definition:
            tmpKwd=i.split(',')
            for d in tmpKwd:
                if len(d.split())== 1:
                    keywords.append(d)

        dictFinal.append({'id':id,'word':word,'definition':definition,'example':example,'keywords':keywords})

fields=['id','word','definition','example','keywords']
with open('DictF.csv', 'w', encoding='utf-8') as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=fields)
    # writing headers (field names)
    writer.writeheader()

    # writing data rows
    writer.writerows(dictFinal)
#         # to replace ~ with word
#         lst=re.split(r'\. [0-9]', line[1])
#         print(lst)
#         # for d in lst:
#         #     templst.append(d.replace("~", f"~ {line[0]}").split('~'))

#         # for i in templst:
#         #     if i[0] != '':
#         #         for j in i:
#         #             j.split(':')
#         # Split example sentence from translation
#         # for item in line:
#         #      for i in item:
#         #           print(i)
#         #      print(item)
#             # templst.append(item.split(':'))
#         # print(templst)
#         exit()
    
#         dictFinal[line[0]]=lst

#     # print(dictFinal)
# exit()

# with open('dictENG.csv', 'w', encoding='utf-8') as csv_file:
#         writer = csv.writer(csv_file)

#         for key,value in dictFinal.items():
#             writer.writerow([key,value])

# exit()

dic=["aba","1. Dairevi, kavisli (enderkullanılır). ~ sakal: çevre sakallı. 2.Kürk üzerine kaplanan kalınkumaş. ~ ton: aba kürklü, ~çepken: aba cepkenli, ~la cabhanala kiyiz: abalarla örtülmüş alakeçe, (bilmece) bulutlar, gök veyıldızlar."]
lst=re.split(r'[0-9].', dic[1])
fin=[]
for defi in lst:
    # print(defi)
    tempdef=defi.replace("~", f"~ {dic[0]} ")
    # print(tempdef)
    fin.append(tempdef.split('~'))
print(fin)