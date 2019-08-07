from bs4 import BeautifulSoup
import sys
import traceback
import os
import io
import time
import re
from elasticsearch import Elasticsearch

book_dictionary = {
    "väzba": "cover",
    "počet strán": "pages",
    "jazyk": "language",
    "rok vydania": "year",
    "rozmer": "size",
    "hmotnosť": "weight",
    "naše katalógové číslo": "catalogue_number",
    "isbn": "isbn"
}


def print_information(kwargs):
    for arg in kwargs:
        print(arg + ": " + str(kwargs[arg]))


def check_if_tag_exists(tag, soup):
    try:
        soup.select(tag)[0].get_text()
        return True
    except AttributeError:
        return False
    except IndexError:
        return


def save_to_elastic(book, es):
    try:
        res = es.index(index="martinus_book_index", doc_type="_doc", id=book["catalogue_number"], body=book)
        print(res['result'])
    except:
        print("RIIIP")


def get_book_information(soup, es):
    book = {}
    book["comments"] = []
    book["cover"] = None
    book["pages"] = None
    book["language"] = None
    book["publisher"] = None
    book["year"] = None
    book["size"] = None
    book["weight"] = None
    book["catalogue_number"] = None
    book["isbn"] = None
    book["category"] = None
    book_name_temp = soup.find("h1", class_="product-detail__title")
    book_name = "".join((str(word) + ' ' for word in book_name_temp.get_text().split()))
    additional_book_info = list(soup.select("section#details div div div")[0].children)
    for i in range(1, len(additional_book_info) - 1):
        local_div = list(additional_book_info[i])
        if len(local_div) > 1:
            #print(local_div)
            for ii in range(1, len(local_div) - 1, 2):
                local_dl = local_div[ii].children
                local_counter = 0
                #print(list(local_dl))
                local_name = ''
                for item in local_dl:
                    if item != '\n':
                        if local_counter == 0:
                            #print("Nazov: " + item.get_text(strip=True))
                            local_counter = 1
                            local_name = item.get_text(strip=True).lower()
                        else:
                            if len(local_name) != 0:
                                #print("Hodnota: " + item.get_text(strip=True))
                                if local_name.lower() in book_dictionary:
                                    int_pattern = re.compile("^[0-9]*$")
                                    if (int_pattern.match(item.get_text(strip=True)) is not None) and (local_name.lower() != "isbn"):
                                        book[book_dictionary[local_name.lower()]] = int(item.get_text(strip=True))
                                    else:
                                        book[book_dictionary[local_name.lower()]] = item.get_text(strip=True)
                #print("################")
            #print("*****************")
    book["name"] = book_name
    book["author"] = soup.find("li", class_="no-mrg").get_text()
    book["publisher"] = soup.select("div.bar.mb-medium.show-m div.bar__item")[0].find("a").get_text()
    book["price"] = float(soup.select("div.h1.price-box__price.no-mrg-bottom")[0].get_text().split()[0].replace(',', '.'))
    for ul in soup.select("section#details div.card.card--well.text-medium div.card__content div.row.no-mrg-bottom div.col--12 dl dd dl dd ul"):
        for category in ul.select("li a"):
            text_category = category.get_text(strip=True)
            if book["category"] is None:
                book["category"] = []
            if text_category not in book["category"]:
                book["category"].append(text_category)

    if check_if_tag_exists("section#description div.cms-article", soup):
        desc_text = soup.select("section#description div.cms-article")[0].get_text(strip=True)
        #print(desc_text)
        try:
            char_pos = desc_text.index(';')
            desc_text = "".join(desc_text[char_pos + 1:])
            book["book_description"] = desc_text
        except ValueError:
            book["book_description"] = desc_text
    elif check_if_tag_exists("section#description p", soup):
        book["description"] = soup.select("section#description p")[0].get_text(strip=True)
    else:
        book["description"] = None
    if check_if_tag_exists("section#reviews div.row.align-items-center.align-items-middle.book-rating.mb-large div.rating-text span.text-bold", soup):
        book["rating"] = float(soup.select("section#reviews div.row.align-items-center.align-items-middle.book-rating.mb-large div.rating-text span.text-bold")[0].get_text().replace(',', '.'))
    else:
        book["rating"] = None
    if check_if_tag_exists("section.mb-large div.card--info div.card__content p", soup):
        book["review"] = soup.select("section.mb-large div.card--info div.card__content p")[0].get_text(strip=True).replace(',', '.')
    else:
        book["review"] = None
    if len(soup.select("article.review div.review__body")) == 0:
        book["comments"] = None
    for comment in soup.select("article.review"):
        comment_text = ""
        for part_comment in comment.select("div.review__body div"):
            if len(comment_text) != 0:
                comment_text += " " + part_comment.get_text(strip=True)
            else:
                comment_text += part_comment.get_text(strip=True)
        comment_rating = None
        if len(comment.select("div.review__header-rating-date.bar__item div.rating-star.bar__item svg")):
            comment_rating = len(comment.select("div.review__header-rating-date.bar__item div.rating-star.bar__item svg.icon.icon-star.is-active"))

        book["comments"].append({
            "user_rating": comment_rating,
            "comment_text": comment_text
        })
    print('*' * 60)
    #print(additional_book_info)
    print_information(book)
    save_to_elastic(book, es)
    #print(list(soup.select("ul.list-inline.list-inline--condensed.mb-medium,line-small li")))
    print('*'*60)


def main():
    book_file_names = os.listdir("web_knihy")
    starting_time = time.time()
    es = Elasticsearch()
    for i in range(len(book_file_names)):
        #book_file_name = "299347.html"
        book_file_name = book_file_names[i]
        #print(book_file_name)
        #with io.open(os.path.join("web_knihy\\" + "300000.html"), mode="r", encoding="utf_8") as book_file:
        with io.open(os.path.join("web_knihy\\" + book_file_name), mode="r", encoding="utf_8") as book_file:
            soup = BeautifulSoup(book_file, "html.parser")
            get_book_information(soup, es)
    ending_time = time.time()
    print("It took {}".format(ending_time - starting_time))

if __name__ == "__main__":
    main()

