---
layout: post
title: Introducing Blyton
---
<div class="message">
Blyton is a unique book recommender system to generate recommendations for readers based on their guided reading levels.
</div>
# [<center>See it in action</center>]()
## <a name="bg"></a> Background 

### [Guided Reading & Leveled Reading Systems](http://www.scholastic.com/parents/resources/article/book-selection-tips/parents-guide-to-guided-readin) 
It is a practice designed to allow students to develop reading proficiency by providing differentiated teaching and is usually in small-group settings. Guided reading is used in classrooms, in small-sized reading clubs and for independent reading. When a child enters a new grade, he is assigned a guided reading level based on his word-knowledge, comprehension skills and fluency allowing the teacher to work closely with each student and help them become better readers by suggesting new challenging books. 
In a similar way, books are assigned guided reading levels too. These levels indicate the complexity of a book taking into account book characteristics such as genre, text structure, content, ideas, sentence complexity, words, vocabulary, print features etc.    
Following is a list of [leveled reading systems](https://www.scholastic.com/teachers/articles/teaching-content/leveled-reading-systems-explained/) that are commonly used depending on the students, curriculum (reading methods and materials), colleagues (of the teacher) and parents (comparison with other children).

- **[Grade Level Equivalent](http://www.fountasandpinnell.com/textlevelgradient/)** 
- **[Guided Reading Level](http://teacher.scholastic.com/products/guidedreading/leveling_chart.htm)**
- **[Lexile Measure](https://lexile.com/)**
- **[Developmental Reading Assessment (DRA)](http://4cameron.weebly.com/uploads/1/3/7/4/13748160/dra-summary_1.pdf)**
- Interest Level
- Grade Level
- Reading Recovery

**Blyton uses a combination of the [Lexile](http://www.scholastic.com/parents/resources/article/book-selection-tips/lexile-levels-made-easy) reading score, book ratings and user preference to generate book recommendations for the readers.**

## Motivation for Blyton
Currently, only teachers and parents who are familiar with the workings of reading levels suggest new books to a child taking his or her guided reading level into consideration. This has several caveats like human error, bias, lack of empirical evidence behind suggestions etc. There is no commercially available automatic recommender system grounded in theory suggesting books to children on the basis of their reading levels. Blyton attacks this problem, being a simple web-based tool that generates accurate recommendations for students and thereby, offload the teacher and/or parent of this task.

### Who would use Blyton?
Blyton would be used in schools and reading clubs to get better recommendations for individual readers. Both teachers and students (of different reading abilities) can use the tool to get recommendations on new books according to the student’s Lexile scores(or other guided system scores), interest and other factors. 

## Related Work
The following systems are similar to Blyton:

### Commercial Systems
**[Goodreads](https://www.goodreads.com/)(social network for book lovers)**

- **System Overview**: Uses a hybrid approach - recommendations on the basis of books rated by the user in the past and books that people with similar taste have liked.
- **Cons**: 
Requires the user to rate at-least 20 books before it can give recommendations
Does not take into account the reading ability of the users

**[Amazon’s Recommender System for Books](https://www.amazon.com/s/ref=lp_4_nr_p_n_feature_thirteen_0?fst=as%3Aoff&rh=n%3A283155%2Cn%3A%211000%2Cn%3A4%2Cp_n_feature_thirteen_browse-bin%3A6938732011&bbn=4&ie=UTF8&qid=1524235898&rnid=6938731011)**

- **System Overview**: Amazon’s recommender system has evolved over the years incorporating several factors/techniques but the base algorithm still uses the widely successful simple item-based collaborative filtering introduced in 2003.   
- **Cons**:
Geared more towards the general e-commerce products
Only has Lexile measures for the books (does not take into account other reading systems)
Not focused on enhancing user’s reading ability but selling products

**[Scholastic Book Wizard](https://www.scholastic.com/teachers/bookwizard/)**

- **System Overview**: Provides list of books categorized by guided reading systems, genre, subject, grade etc.  
- **Cons**: 
Lacks a good recommender system

**Other book recommender systems**: bookbub.com, librarything.com, whichbook.net, whatshouldireadnext.com, Booklamp (acquired by Apple), lazylibrary.com.

### Research Papers
The following are few research papers highlighting concepts similar to Blyton:

- [M. S. Pera and Y. K. Ng, "How Can We Help Our K-12 Teachers?: Using a Recommender to Make Personalized Book Suggestions," 2014 IEEE/WIC/ACM International Joint Conferences on Web Intelligence (WI) and Intelligent Agent Technologies (IAT), Warsaw, 2014, pp. 335-342](https://ieeexplore.ieee.org/abstract/document/6927643/).

- [Petrović, Iva, Paolo Perković, and Ivan Štajduhar. "A profile-and community-driven book recommender system." In Information and Communication Technology, Electronics and Microelectronics (MIPRO), 2015 38th International Convention on, pp. 631-635. IEEE, 2015.](https://ieeexplore.ieee.org/abstract/document/7160349/)

- [Y. Zhu, "A book recommendation algorithm based on collaborative filtering," 2016 5th International Conference on Computer Science and Network Technology (ICCSNT), Changchun, 2016, pp. 286-289.](https://ieeexplore.ieee.org/document/8070165/)

- [Rendle, Steffen, Christoph Freudenthaler, Zeno Gantner, and Lars Schmidt-Thieme. "BPR: Bayesian personalized ranking from implicit feedback." In Proceedings of the twenty-fifth conference on uncertainty in artificial intelligence, pp. 452-461. AUAI Press, 2009.](https://dl.acm.org/citation.cfm?id=1795167)

### How Blyton is different?

Since Blyton aims to create a curated reading list of book recommendations for an individual reader keeping in mind his or her reading ability it differs from the previous systems in the following ways:

- Focused on enhancing the reading ability of the student by suggesting books that help in developing a higher leveled reading score if the student is improving in his or her performance or suggesting books that help the student in creating a solid foundation on his current reading level before moving higher.
Suggesting books that are of student’s interest taking into account the genre of books he is reading, interest in the topic and student’s reading ability.
- A narrow user base (focusing primarily on children and beginner readers) and narrow book dataset (focused on books with Leveled Reading Scores).
- Reducing the effort of teachers in finding and suggesting books to students taking into account their abilities and interest.

## Proposed Solution

### Overview of the tool
Currently, Blyton runs on a **[Jupyter Notebook](http://jupyter.org/)** using **[IPython](https://ipython.org/)**. We have converted the notebook into a RESTful API. The front-end of the web app is built using **[Angular](https://angular.io/)**. 

### Dataset
#### Creating the Dataset
**[Amazon Book Dataset](http://jmcauley.ucsd.edu/data/amazon/)**  
This dataset contains the ratings of ~22 million book ratings. We enriched this dataset by filtering out the items which do not have a 'lexile rating’. We do this by scraping the Scholastic Book Wizard (below) by filtering for 'books by lexile rating’ (https://goo.gl/2BepYw). We then compute the intersection of the scraped dataset with the Amazon Book Dataset. Thus, we obtain a dataset with each row as: user_id, item_id, rating, lexile_rating.
#### Website Scraping
Scraped **[Scholastic Book Wizard](https://www.scholastic.com/teachers/bookwizard)**

**Tool Used**

**[Scrapy](https://scrapy.org/)** 


### Algorithm
Collaborative Filtering based Hybrid Recommendation using Matrix Factorization
We plan on using a collaborative filtering technique with implicit data in terms of the user's reading ability. We plan to employ algorithms like Bayesian Personalised Ranking or Alternating Least Squares for matrix factorization.
In our case, the number of books will be our features & each user would be a data point. Since the number of books is very high, we also plan to use dimensionality reduction techniques, such as SVD. This would enable better representation and fasten the computation.
Another avenue to pursue is the use of sequence modelling. Our dataset contains users’ book ratings with their purchase timestamps. Thus, the problem of prediction could be reduced to a sequence prediction problem. Neural methods employed in sequence prediction involves the use of RNNs, more specifically we could use Gated Recurrent Units (GRUs).

## Evaluation of Results

## Conclusion

### Our Learnings

### Challenges We Faced

### Future Work
