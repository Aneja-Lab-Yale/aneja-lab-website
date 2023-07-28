# from git import Repo
# import os

# path = '/mdew192837/aneja-lab-website'
# if not os.path.exists(path):
#     os.makedirs(path)

# os.chdir(path)

# repo = Repo.init(path).git

# index = Repo.init(path).index

import requests
from bs4 import BeautifulSoup


URL = "https://www.ncbi.nlm.nih.gov/myncbi/sanjay.aneja.2/bibliography/public/robots.txt"
page = requests.get(URL)

soup = BeautifulSoup(page.text, "html.parser")

publicationsTitles = soup.find_all("a")

pubTitlesList = []

for title in publicationsTitles:
    if title.parent.has_attr("class") and title.parent["class"][0] == "ncbi-docsum":
        pubTitlesList.append(str(title.string).replace("\n", "").strip("                "))


publicationAuthors = soup.find_all("span", class_="authors")

pubAuthorsList = []


for authorList in publicationAuthors:
    if ", " in str(authorList.string):
        realAuthorList = [authorList.string.replace("\n", "").strip("            ").strip("        ")]
        pubAuthorsList.append(realAuthorList)

publicationDates = soup.find_all("span", class_="pubdate")

pubDatesList = []

test = 0

for pubDate in publicationDates:
    pubDatesList.append(str(pubDate.string).strip(";"))
    test += 1

dataF = open("publicationsListData.txt", "w")

for i in range(test):
    dataF.write(f"{pubTitlesList[i]} | {str(pubAuthorsList[i])} | {pubDatesList[i]}\n")

# index.pull()
# repo.commit("-m", "auto publications update", author="NMakin-TCAM <neevmakin@gmail.com>")
# index.push()

# repo.add(update=True)
# index.commit("auto publications update")
# origin = repo.remote(name="dev")
# origin.push()


dataF.close()