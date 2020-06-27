import json
import random

with open('dist\data (1).json') as json_file:
    data = json.load(json_file)

data["nodes"][0]["x"] = random.random()
data["nodes"][0]["y"] = random.random()
print(data["nodes"][0])
print(len(data["nodes"]))

for i in data["nodes"]:
    i["x"]= random.random()
    i["y"]= random.random()
    print(i)
with open('dist\mediumData.json','a+') as f:
    f.write(json.dumps(data))