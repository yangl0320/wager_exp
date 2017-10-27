from pymongo import MongoClient

client = MongoClient('127.0.0.1', 3001)
db = client['meteor']
tasks = db['realTasks']

f = open('../public/text/answers.txt', 'r')

tasks.delete_many({})
for line in f:
    args = line.split('\t')
    tasks.insert_one({"pairNum":args[0][:-1],
                        "left":args[1], 
                        "right":args[2],
                        "answer":int(args[3])})

f.close()
