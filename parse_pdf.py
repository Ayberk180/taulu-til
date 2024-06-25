import pdfplumber
import re
import csv
demo = []
definitions=[]
text=[]
with pdfplumber.open('karacay_malkar_turkce_sozluk.pdf') as pdf: 
    for i in range(4,685):
        # try:
        page = pdf.pages[i]
        left = page.crop((0, 0, 0.5 * page.width, page.height))
        right = page.crop((0.5 * page.width, 0, page.width, page.height))
        # lines= page.extract_text_lines(layout=False, strip=True, return_chars=True)
        
        text.extend(left.extract_text_lines()+ right.extract_text_lines())
        # r_text = right.extract_text_lines()
    
   
    defcount=[]
    for j in range(len(text)):
        # if text[j]['chars'][0]['text']=='A':
        if "Bold" in text[j]['chars'][0]['fontname']:
            defcount.append(j)
    print(len(defcount), defcount)
    k=0
    while k<=(len(defcount)-1):
        temp=''
        if defcount[k]==defcount[-1]:
            for line in text[defcount[k]:-1]:
                temp+=line['text']
                definitions.append(temp)
            break
        for line in text[defcount[k]:defcount[k+1]]:
            temp+=line['text']
        definitions.append(temp)
        
        # print(l_text[defcount[k]:defcount[k+1]][0]['text'])
        k+=1
            

            # print(defcount)
            # demo.append(left.extract_text())
            # demo.append(left.extract_text_lines())

            # for i in demo:
            #     print(demo)
            # for i in range(len(lines)):
            #     print(lines[i])

            # clean_text = text.filter(lambda obj: obj["object_type"] == "char" and "Bold" in obj["fontname"])
            # print(clean_text)
            
            # demo.append(str(re.findall(r'(\d+\.\s.*\n?)+', clean_text.extract_text())).replace('[]', ' '))
        


        # except IndexError:
        #     print("errror")
        #     break


# print(demo)

# for i in range(len(demo[0])):
#     if demo[0][i].isupper() and demo[0][i-1]=='n':
#         print(demo[0][i-5:i+5])
            # demo[0][i+1:i+2].replace(demo[0][i+1:i+2],'$$')

# print(definitions)

dic={}
for i in definitions:
    t1=''
    temp=i.split()
    dic[temp[0]]=" ".join(temp[1:])


# list=re.split(r'(?=[a-z]\.\n[A-Z])', demo[0])
# dic={}
# for s in list[1:]:
#     print(s) 
#     if s != ' ':
#         temp=s.split(" ", 1)
#         print(temp)
#         dic[temp[0]]=temp[1]

with open('dict.csv', 'w', encoding='utf-8') as csv_file:  
    writer = csv.writer(csv_file)
    for key, value in dic.items():
       writer.writerow([key, value])

# for word in demo[0].split(" "):
#     list.append(word)

# print(dic)
exit()

for i in range(len(demo[0][0]['chars'])):
    print(demo[0][0]['chars'][i])
# for i in range(len(demo[0][0]['chars'])):
#     if "Bold" in demo[0][0]['chars'][i]['fontname'] and ("Bold" in demo[0][0]['chars'][i+1]['fontname'] or demo[0][0]['chars'][i]['text'] == ' '):
#         print(demo[0][0]['chars'][i]['text'])
# print(demo)

