import scrapy
import json
import re

class BooksSpider(scrapy.Spider):
    
    name = 'scholastic'
    
    def start_requests(self):
        
        urls = []
        for i in range(1, 676):
            url = 'https://www.scholastic.com/bin/scholastic/teachers/tchsearch?filters=(((englishLexileLevel_f:(%5B10+TO+90%5D+OR+%5B100+TO+190%5D+OR+%5B200+TO+290%5D+OR+%5B300+TO+390%5D+OR+%5B400+TO+490%5D+OR+%5B500+TO+590%5D+OR+%5B600+TO+690%5D+OR+%5B700+TO+790%5D+OR+%5B800+TO+890%5D+OR+%5B900+TO+990%5D+OR+%5B1000+TO+1090%5D+OR+%5B1100+TO+1190%5D+OR+%5B1200+TO+1290%5D+OR+%5B1300+TO+1390%5D+OR+%5B1400+TO+1490%5D+OR+%5B1500+TO+1590%5D+OR+%5B1600+TO+1690%5D))))&isBookWizard=true&pagePath=%2Fteachers%2Fbookwizard%2F&prefilter=books&rows=72&start='+str((i-1)*72)
            urls.append(url)
            
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        
        data = json.loads(response.body_as_unicode())
        books = data['solrDocumentList']
        
        match = match = re.search(r'start=([0-9]+)', response.url, re.M|re.I)
        page_no = match.group(1)
        page_no = int(page_no)/72
        file_name = 'books_'+str(page_no)+'.txt'
        
        with open(file_name, 'w') as f:
            f.write(json.dumps(books))
            
        self.log('Saved file %s' % file_name)
        