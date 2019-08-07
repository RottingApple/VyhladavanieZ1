from selenium import webdriver
import time
from bs4 import BeautifulSoup
import sys
import traceback
import os
import random
import io


def print_information(kwargs):
    for arg in kwargs:
        print(arg.upper() + ": " + str(kwargs[arg]))


def check_if_tag_exists(tag, soup):
    try:
        soup.select(tag)[0].get_text()
        return True
    except AttributeError:
        return False
    except IndexError:
        return


def get_book_information(soup):
    book = {}
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
                                book[local_name] = item.get_text(strip=True)
                #print("################")
            #print("*****************")
    book["book_name"] = book_name
    book["author_name"] = soup.find("li", class_="no-mrg").get_text()
    book["publisher"] = soup.select("div.bar.mb-medium.show-m div.bar__item")[0].find("a").get_text()
    book["book_price"] = soup.select("div.h1.price-box__price.no-mrg-bottom")[0].get_text().split()[0]
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
        book["book_description"] = soup.select("section#description p")[0].get_text(strip=True)
    else:
        book["book_rating"] = "None"
    if check_if_tag_exists("section#reviews div.row.align-items-center.align-items-middle.book-rating.mb-large div.rating-text span.text-bold", soup):
        book["book_rating"] = soup.select("section#reviews div.row.align-items-center.align-items-middle.book-rating.mb-large div.rating-text span.text-bold")[0].get_text()
    else:
        book["book_rating"] = "None"
    if check_if_tag_exists("section.mb-large div.card--info div.card__content p", soup):
        book["our_review"] = soup.select("section.mb-large div.card--info div.card__content p")[0].get_text(strip=True)
    else:
        book["our_review"] = "None"
    print('*' * 60)
    #print(additional_book_info)
    print_information(book)
    #print(list(soup.select("ul.list-inline.list-inline--condensed.mb-medium,line-small li")))

    print('*'*60)


def no_music_check(soup):
    try:
        if check_if_tag_exists("section#details div div.card__content div.row.no-mrg-bottom", soup):
            if soup.select("section#details div div.card__content div.row.no-mrg-bottom")[1].select("div dl dd dl dd ul li")[0].get_text(strip=True) == "Hudba":
                return False
            else:
                return True
        else:
            return False
    except IndexError:
        return True


def get_recommended_books(soup):
    recomended_books = soup.select("section.section.section--secondary.mj-scarab div.wrapper-main div.carousel div.swiper-container div.swiper-wrapper article.product")
    #print(len(recomended_books))
    book_result = []
    if len(recomended_books) > 0:
        for book in recomended_books:
            #print(book.select("div.product__cover a div img"))
            #print(book.select("div.product__cover a")[0].attrs['href'])
            book_result.append(book.select("div.product__cover a")[0].attrs['href'])
        return book_result
    else:
        return None


def page_visited(page, visiting_pages, visited_pages):
    if page in visited_pages:
        while len(visiting_pages) != 0:
            page = visiting_pages.pop()
            if page not in visited_pages:
                return page
        return None
    else:
        return page


if __name__ == "__main__":
    driver = webdriver.Chrome()
    driver.implicitly_wait(3)
    hit = 0
    non_hit = 0
    cwd = os.getcwd()
    book_locations = os.path.join(cwd, '')
    starting_offset = 300000
    crawling_strategy = 1
    visited_pages = set()
    visiting_pages = ["/?uItem=300000"]
    while hit < 20000:
        try:
            if crawling_strategy == 0:
                url = "https://www.martinus.sk/?uItem=" + str(starting_offset)
                result = driver.get(url)
                soup = BeautifulSoup(driver.page_source, "html.parser")
                check_title = soup.find("h1", class_="product-detail__title")
                check_title = check_title.get_text()
                check_author = soup.find("li", class_="no-mrg").get_text()
                if no_music_check(soup):
                    get_book_information(soup)
                    hit += 1
                    file_location = os.path.join(book_locations, str(starting_offset) + '.html')
                    #with io.open(file_location, mode="w", encoding="utf_8") as file:
                        #file.write(driver.page_source)
            else:
                if len(visiting_pages) != 0:
                    new_page = visiting_pages.pop()
                    page = page_visited(new_page, visiting_pages, visited_pages)
                    if page is not None:
                        visited_pages.add(page)
                        print("*" * 60)
                        print(len(visited_pages))
                        print(len(visiting_pages))
                        print("*" * 60)
                        result = driver.get("https://www.martinus.sk" + page)
                        soup = BeautifulSoup(driver.page_source, "html.parser")
                        new_books = get_recommended_books(soup)
                        if new_books is not None and len(new_books) > 0:
                            visiting_pages.extend(new_books)
                            #print(visiting_pages)
                else:
                    number = random.randint(0, 300000)

        except AttributeError:
            non_hit += 1
            print('Stranka Neexistuje')
            traceback.print_exc(file=sys.stdout)
        except:
            traceback.print_exc(file=sys.stdout)
        finally:
            #print('som na {}'.format(str(i)))
            time.sleep(1)
            starting_offset -= 1

    print("Pocet Hitov na knihy: {}".format(str(hit)))
    print("Pocet Netrafeni na knihy: {}".format(str(non_hit)))
    driver.quit()


