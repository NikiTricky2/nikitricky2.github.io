from turtle import color
from distro import name
import numpy as np
from tqdm import tqdm

graph_file = "followers_github.dot"
edge_users_file = "edge_users_github.tsv"

connections = []
with open(graph_file, "r") as f:
    for line in f:
        if line.startswith("\t"):
            connections.append(line.strip().replace("\"", "").replace(";", "").split(" -> "))
            
edge_users = []
with open(edge_users_file, "r") as f:
    for line in f:
        edge_users.append(line.strip())

f4fs = 0
connections2 = connections.copy()
for connection in tqdm(connections2):
    if list(reversed(connection)) in connections2:
        f4fs += 1
        connections2.remove(connection)

del connections2
print(f4fs)

followers = {}
for connection in tqdm(connections):
    if not connection[1] in followers.keys() and not connection[1] in edge_users:
        followers[connection[1]] = 1
        continue
    if connection[1] in followers.keys():
        followers[connection[1]] += 1
         
followers = dict(sorted(followers.items(), key=lambda x: x[1], reverse=True))
with open("followers_count.txt", "w") as f:
    for follower in followers:
        f.write(follower + "\t" + str(followers[follower]) + "\n")

print("Average followers: " + str(np.mean(list(followers.values()))))

import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.set_title("Number of followers")
ax.set_xlabel("Number of followers")
ax.set_ylabel("Number of users")
ax.set_yscale("log")
ax.hist(list(followers.values()), bins=100, label="Scratch")
plt.show()