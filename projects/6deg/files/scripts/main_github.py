# Import libraries
from selenium import webdriver
import time
from sympy import true
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

# Initialize variables
start_username = "NikiTricky2"
outfile = "followers_github.dot"
degrees = 7

start = time.time()

# Start writing to file
with open(outfile, "w") as f:
    f.write("digraph G {\n")

# Install Driver
driver = webdriver.Chrome(ChromeDriverManager().install())

def get_followers(username):
    # Make Github URL
    url = "https://github.com/" + username + "?tab=followers"
    driver.get(url)

    # Get all followers
    follower_els = driver.find_elements(by=By.CSS_SELECTOR, value="span.pl-1")
    followers = []

    for follower_el in follower_els:
        followers.append(follower_el.text.strip())
        
    # If there is padgination go to next page
    try:
        driver.find_element(by=By.CSS_SELECTOR, value="div.pagination")
    except Exception as e:
        return followers
    
    # Get next page until there is no next page
    while True:
        next_page_link = driver.find_elements(by=By.CSS_SELECTOR, value="div.pagination a")[-1]
        

        # Check if there is a next page, if not break
        if next_page_link.text != "Next":
            break
        next_page_link.click()
        
        # Get all followers
        follower_els = driver.find_elements(by=By.CSS_SELECTOR, value="span.pl-1")
        
        for follower_el in follower_els:
            followers.append(follower_el.text.strip())
    
    return followers


user_connections = []
visited_users = [start_username]

def follower_tree(username, degrees):
    # Get followers recursively until degree is reached
    
    if degrees == 0:
        # Add an edge user to data
        with open("edge_users_gh2.txt", "a") as f:
            f.write(username + "\n")
        return
    
    followers = get_followers(username)
    
    for follower in followers:
        # Write connection to file
        with open(outfile, "a") as f:
            f.write("\t\"" + follower + "\" -> \"" + username + "\";\n")
            
        if follower not in visited_users:
            # Visit follower if not in previous followers
            visited_users.append(follower)
            follower_tree(follower, degrees - 1)
    
# Get user connections
follower_tree(start_username, degrees)

# Quit driver
driver.quit()

# Finish writing to file
with open(outfile, "a") as f:
    f.write("}")

print("Found " + str(len(visited_users)) + " users in", time.time() - start, "seconds")