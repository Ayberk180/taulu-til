import random
data = list(range(1, 13000))
random.shuffle(data)

f = open("list.txt", "a")
f.write(str(data))
f.close()
print(data)